# Architecture

## Intended Direction

The application should evolve toward three clearly separated layers:

```text
UI
↓
Business Logic
↓
Storage
```

PWA and service-worker functionality forms infrastructure around these application layers, providing offline and installation behavior.

The current implementation does **not** fully enforce this separation. Most UI behavior, workout logic, calculations, and LocalStorage access currently live together in `assets/js/app.js`. The diagram describes the intended architecture and a direction for incremental refactoring, not the present module structure.

## Responsibilities

### UI

- Render screens and application state.
- Handle navigation between views.
- Accept and respond to user interaction.

### Business Logic

- Process workouts and split rotation.
- Validate workout data.
- Perform calculations.
- Produce statistics and personal-record results.

### Storage

- Read from and write to LocalStorage.
- Save and load workout records.
- Support future data migrations as stored data evolves.

### PWA Infrastructure

- Register and run the service worker.
- Provide offline support.
- Support installation through the web manifest and service worker.
- Manage application-shell caches and update behavior.

## Guiding Principle

UI, business logic, and storage should gradually become clearly separated as the project evolves. Refactoring should be incremental and should preserve working behavior.

