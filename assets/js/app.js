// --- State ---

let cfg = null;
let log = JSON.parse(localStorage.getItem("yonasLog") || "[]");
let currentSplit = localStorage.getItem("yonasSplit") || "Split A";

const APP_VERSION = "0.3.2";
const VIEWS = ["home", "workout", "history", "progress", "settings"];

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

// --- Config ---

async function loadCfg() {
  try {
    cfg = await fetch("data/config.json").then((r) => r.json());
  } catch (e) {
    cfg = JSON.parse(document.getElementById("fallbackConfig").textContent);
  }
  init();
}

// --- Storage ---

function save() {
  localStorage.setItem("yonasLog", JSON.stringify(log));
}

// --- Split rotation ---

function splitNames() {
  return Object.keys(cfg.splits);
}

function nextSplit() {
  if (!log.length) return splitNames()[0];
  const last = log[log.length - 1].split;
  return splitNames()[(splitNames().indexOf(last) + 1) % splitNames().length];
}

// --- Navigation ---

function show(id) {
  VIEWS.forEach((v) => $("#" + v).classList.toggle("hidden", v !== id));
  $$("nav button").forEach((b) => b.classList.toggle("active", b.dataset.view === id));
  if (id === "home") renderHome();
  if (id === "history") renderHistory();
  if (id === "progress") renderProgress();
}

// --- Home ---

function renderHome() {
  $("#title").textContent = cfg.client + " Workout Tracker";
  $("#next").textContent = nextSplit();
  $("#done").textContent = log.length;
  $("#last").textContent = log.length ? log[log.length - 1].split : "—";
  $("#prCount").textContent = Object.keys(getPRs()).length;
}

// --- Workout ---

function renderTabs() {
  $("#tabs").innerHTML = splitNames()
    .map((s) => `<button class="tab ${s === currentSplit ? "active" : ""}" data-s="${s}">${s}</button>`)
    .join("");
  $$("#tabs button").forEach((b) => {
    b.onclick = () => {
      currentSplit = b.dataset.s;
      localStorage.setItem("yonasSplit", currentSplit);
      renderWorkout();
    };
  });
}

function renderWorkout() {
  renderTabs();
  $("#splitHead").textContent = currentSplit;

  let html = "";
  let lastBlock = "";

  cfg.splits[currentSplit].forEach((e, i) => {
    if (e.block.startsWith("Superset") && e.block !== lastBlock) {
      html += `<div class="superset">${e.block}</div>`;
    }
    const cls = e.block === "Main Lift" ? "main" : e.block === "Finisher" ? "finisher" : "";
    html += `<div class="exercise ${cls}" data-i="${i}">
      <h3>${e.name}</h3>
      <div class="meta">${e.block}${e.type ? " · " + e.type : ""} · ${e.focus} · ${e.target}</div>
      <div class="gridInputs">
        <div><label>Weight (${cfg.units})<input data-f="weight" inputmode="decimal"></label></div>
        <div><label>Set 1<input data-f="set1" inputmode="numeric"></label></div>
        <div><label>Set 2<input data-f="set2" inputmode="numeric"></label></div>
        <div><label>Set 3<input data-f="set3" inputmode="numeric"></label></div>
      </div>
    </div>`;
    lastBlock = e.block;
  });

  $("#exerciseList").innerHTML = html;
}

function saveWorkout() {
  const entries = [];
  $$(".exercise").forEach((c, i) => {
    const e = cfg.splits[currentSplit][i];
    const v = (f) => c.querySelector(`[data-f="${f}"]`).value.trim();
    entries.push({ ...e, weight: v("weight"), set1: v("set1"), set2: v("set2"), set3: v("set3") });
  });

  log.push({ date: new Date().toISOString(), split: currentSplit, entries });
  save();
  $("#msg").textContent = "Workout saved";
  setTimeout(() => ($("#msg").textContent = ""), 1500);

  currentSplit = nextSplit();
  localStorage.setItem("yonasSplit", currentSplit);
  renderWorkout();
}

// --- History ---

function renderHistory() {
  if (!log.length) {
    $("#historyList").innerHTML = '<div class="note" style="padding:20px 0">No workouts saved yet.</div>';
    return;
  }
  $("#historyList").innerHTML =
    '<div class="list">' +
    [...log]
      .reverse()
      .map(
        (w) => `<div class="historyItem">
          <div class="row"><b>${w.split}</b><span>${new Date(w.date).toLocaleDateString()}</span></div>
          <div class="note">${w.entries.filter((e) => e.weight).length}/${w.entries.length} exercises logged</div>
        </div>`
      )
      .join("") +
    "</div>";
}

// --- Progress ---

function names() {
  return [...new Set(Object.values(cfg.splits).flat().map((x) => x.name))];
}

function getPRs() {
  const p = {};
  log.forEach((w) =>
    w.entries.forEach((e) => {
      const n = parseFloat(e.weight);
      if (n && (p[e.name] == null || n > p[e.name])) p[e.name] = n;
    })
  );
  return p;
}

function renderProgress() {
  if (!$("#exerciseSelect").options.length) {
    $("#exerciseSelect").innerHTML = names().map((n) => `<option>${n}</option>`).join("");
  }
  draw($("#exerciseSelect").value || names()[0]);

  const p = getPRs();
  $("#prs").innerHTML = Object.keys(p).length
    ? `<table>
        <thead><tr><th>Exercise</th><th>Best</th></tr></thead>
        <tbody>${Object.entries(p)
          .map(([n, v]) => `<tr><td>${n}</td><td>${v} ${cfg.units}</td></tr>`)
          .join("")}</tbody>
      </table>`
    : '<div class="note">No records yet.</div>';
}

function draw(name) {
  const c = $("#chart");
  const x = c.getContext("2d");
  const pts = [];

  log.forEach((w, i) =>
    w.entries.forEach((e) => {
      const v = parseFloat(e.weight);
      if (e.name === name && v) pts.push({ x: i + 1, y: v });
    })
  );

  x.clearRect(0, 0, c.width, c.height);
  x.fillStyle = "#0e1728";
  x.fillRect(0, 0, c.width, c.height);
  x.strokeStyle = "#263650";
  for (let i = 0; i < 5; i++) {
    const y = 35 + i * 48;
    x.beginPath();
    x.moveTo(40, y);
    x.lineTo(c.width - 20, y);
    x.stroke();
  }

  if (!pts.length) {
    x.fillStyle = "#9fb0c8";
    x.font = "16px system-ui";
    x.fillText("No data yet", 45, 145);
    return;
  }

  const max = Math.max(...pts.map((p) => p.y)) * 1.1;
  const min = Math.min(...pts.map((p) => p.y)) * 0.9;
  const xx = (i) => 45 + (i / Math.max(pts.length - 1, 1)) * (c.width - 70);
  const yy = (v) => 240 - ((v - min) / (max - min || 1)) * 185;

  x.strokeStyle = "#4f8cff";
  x.lineWidth = 4;
  x.beginPath();
  pts.forEach((p, i) => (i ? x.lineTo(xx(i), yy(p.y)) : x.moveTo(xx(i), yy(p.y))));
  x.stroke();

  pts.forEach((p, i) => {
    x.fillStyle = "#4f8cff";
    x.beginPath();
    x.arc(xx(i), yy(p.y), 5, 0, Math.PI * 2);
    x.fill();
    x.fillStyle = "#f7f9fc";
    x.font = "12px system-ui";
    x.fillText(p.y, xx(i) - 8, yy(p.y) - 10);
  });
}

// --- Export / import ---

function exportCSV() {
  const rows = [["date", "split", "exercise", "weight", "set1", "set2", "set3"]];
  log.forEach((w) =>
    w.entries.forEach((e) => rows.push([w.date, w.split, e.name, e.weight, e.set1, e.set2, e.set3]))
  );
  download(
    "yonas-workout-log.csv",
    rows.map((r) => r.map((v) => `"${String(v ?? "").replaceAll('"', '""')}"`).join(",")).join("\n"),
    "text/csv"
  );
}

function download(name, data, type) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([data], { type }));
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

// --- Init ---

function init() {
  renderHome();
  renderWorkout();
  $("#unitSelect").value = cfg.units;
}

$$("nav button").forEach((b) => (b.onclick = () => show(b.dataset.view)));

$("#startBtn").onclick = () => {
  currentSplit = nextSplit();
  renderWorkout();
  show("workout");
};

$("#saveBtn").onclick = saveWorkout;
$("#csvBtn").onclick = exportCSV;
$("#exerciseSelect").onchange = () => draw($("#exerciseSelect").value);

$("#exportJson").onclick = () =>
  download("yonas-backup.json", JSON.stringify({ log, currentSplit, cfg }, null, 2), "application/json");

$("#importJson").onchange = (e) => {
  const f = e.target.files[0];
  if (!f) return;
  const r = new FileReader();
  r.onload = () => {
    try {
      const d = JSON.parse(r.result);
      log = d.log || [];
      currentSplit = d.currentSplit || "Split A";
      save();
      localStorage.setItem("yonasSplit", currentSplit);
      alert("Backup imported");
    } catch {
      alert("Invalid backup file");
    }
  };
  r.readAsText(f);
};

$("#unitSelect").onchange = (e) => {
  cfg.units = e.target.value;
  renderWorkout();
};

$("#clearBtn").onclick = () => {
  if (confirm("Delete all local workout data?")) {
    log = [];
    save();
    renderHome();
    alert("Data cleared");
  }
};

// --- Service worker & version ---

let newWorker = null;

async function registerServiceWorker() {
  if (!("serviceWorker" in navigator) || location.protocol === "file:") return;

  try {
    const registration = await navigator.serviceWorker.register("service-worker.js", {
      updateViaCache: "none",
    });

    registration.update();

    if (registration.waiting) {
      showUpdateBanner(registration.waiting);
    }

    registration.addEventListener("updatefound", () => {
      const worker = registration.installing;
      if (!worker) return;

      worker.addEventListener("statechange", () => {
        if (worker.state === "installed" && navigator.serviceWorker.controller) {
          showUpdateBanner(worker);
        }
      });
    });

    navigator.serviceWorker.addEventListener("controllerchange", () => {
      window.location.reload();
    });
  } catch (error) {
    console.warn("Service worker registration failed:", error);
  }
}

function showUpdateBanner(worker) {
  newWorker = worker;
  const banner = document.getElementById("updateBanner");
  const text = document.getElementById("updateVersionText");
  if (text) text.textContent = "Een nieuwe alpha staat klaar.";
  if (banner) banner.classList.add("show");
}

document.getElementById("updateNowBtn").addEventListener("click", () => {
  if (newWorker) {
    newWorker.postMessage({ type: "SKIP_WAITING" });
  } else {
    window.location.reload();
  }
});

async function checkVersion() {
  try {
    const response = await fetch("version.json?ts=" + Date.now(), { cache: "no-store" });
    const data = await response.json();
    const current = document.getElementById("appVersion");
    if (current) current.textContent = data.version || APP_VERSION;
  } catch (error) {
    console.warn("Version check failed:", error);
  }
}

registerServiceWorker();
checkVersion();
loadCfg();
