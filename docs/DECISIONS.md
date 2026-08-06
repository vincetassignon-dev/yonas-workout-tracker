# Architecture Decision Log

This log records current architectural decisions. Add future entries using the same Decision, Reason, and Status fields.

## ADR-001: Use Vanilla JavaScript for now

**Decision:** Continue using Vanilla JavaScript for the current application.

**Reason:** The application is small and can remain simple without framework overhead or an additional dependency and build-tool chain.

**Status:** Accepted

## ADR-002: Deploy with GitHub Pages

**Decision:** Use GitHub Pages for deployment.

**Reason:** It works with the static application stack and the existing GitHub source-control workflow.

**Status:** Accepted

## ADR-003: Keep the application installable as a PWA

**Decision:** Preserve the web manifest and service-worker infrastructure required for a Progressive Web App.

**Reason:** Installability and offline use support the mobile-first workout-tracking experience.

**Status:** Accepted

## ADR-004: Gradually separate application layers

**Decision:** Gradually separate UI, business logic, and storage responsibilities.

**Reason:** Clear boundaries will improve maintainability and make future changes safer. The current application has not yet completed this separation.

**Status:** Accepted; incremental implementation

## ADR-005: Prefer incremental refactors

**Decision:** Prefer small incremental refactors over large rewrites.

**Reason:** Small changes are easier to review and reduce the risk of regressions.

**Status:** Accepted

## ADR-006: Use branches for significant work

**Decision:** Use Git branches for significant features and refactors.

**Reason:** Branches isolate substantial changes and support review and testing before integration.

**Status:** Accepted

## ADR-007: Preserve working functionality

**Decision:** Preserve working behavior during refactoring.

**Reason:** Structural improvement should not disrupt users or remove verified capabilities.

**Status:** Accepted

## Template for Future Decisions

## ADR-XXX: Title

**Decision:** What was decided.

**Reason:** Why it was decided.

**Status:** Proposed, accepted, superseded, or rejected.

