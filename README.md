# Image and Color Palette Manager

<!-- TODO: Danger zone para paleta de cores -->

An app to manage images and colors for your marketing or design projects, saving references in a easy and organized way.

<!-- Tell more about the app -->

## Design de Sistema

### 1. Arquitetura Geral

#### Diagrama de Componentes da Aplicação

- **App:** The root component that manages state and renders all other components.
- **Images**

```mermaid
graph TD
  A[Header] --> B[Home Page]
  A --> C[Images Module]
  A --> D[Color Palettes Module]
  C --> E[Image List]
  C --> F[Image Form]
  D --> G[Color Palette List]
  D --> H[Color Palette Form]
  E --> I[Image Card]
  G --> J[Color Palette Card]
```

#### Fluxo de Dados entre Componentes

```mermaid
sequenceDiagram
  participant User
  participant UI
  participant Storage
  User->>UI: Interacts with UI
  UI->>Storage: Fetches data
  Storage-->>UI: Returns data
  UI-->>User: Displays data
  User->>UI: Submits form
  UI->>Storage: Saves data
  Storage-->>UI: Confirms save
  UI-->>User: Shows confirmation
```

#### Modelo de Estado da Aplicação

```mermaid
stateDiagram-v2
  [*] --> Idle
  Idle --> Loading
  Loading --> Loaded
  Loaded --> Editing
  Editing --> Saving
  Saving --> Idle
  Loaded --> Deleting
  Deleting --> Idle

```
