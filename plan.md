# FluxDoc: Project Plan & Workflow

## 1. Project Overview
FluxDoc is a "thick-client" web-based PDF editor that performs all processing in the browser. It combines a static PDF rendering layer (PDF.js) with a dynamic interaction layer (Fabric.js) to allow users to annotate, edit, and manipulate PDF documents without server-side processing.

---

## 2. Technical Stack
-   **Core Framework**: Next.js 16.1.1 (App Router)
-   **Language**: TypeScript v5+
-   **Styling**: Tailwind CSS v4 (using CSS-based configuration)
-   **State Management**: Zustand + Immer
-   **Rendering Engine**:
    -   `react-pdf` (v10.3.0) for PDF rendering
    -   `fabric` (v7.1.0) for interactive canvas layer
-   **Icons**: `lucide-react`

---

## 3. Architecture & Routing

### Routing Structure
-   `/` (Homepage): Landing page with tool grid and feature showcase.
-   `/edit-pdf` (Editor): The core PDF editing workspace.

### Core Architecture Layers
1.  **View Layer**: Next.js App Router components.
2.  **State Layer**: Global Zustand store managing document data, editor viewport, and history.
3.  **Canvas Stack**:
    -   **Base**: Static PDF render.
    -   **Interaction**: Fabric.js canvas overlay synced with the PDF coordinate system.

---

## 4. Implementation Workflow (Recreation Guide)

### Step 1: Foundation & Setup
1.  Initialize Next.js project with TypeScript.
2.  Configure Tailwind CSS v4 with custom color tokens (`primary: #E5322D`).
3.  Install core dependencies: `fabric`, `react-pdf`, `zustand`, `lucide-react`, `immer`.

### Step 2: The Core PDF Viewer
1.  **PDFRenderLayer**: Create a wrapper for `react-pdf`'s `Document` component.
2.  **VirtualScroller**: Implement a virtualized list to efficiently render large documents.
3.  **PageContainer**: Create a component to stack the PDF page and the Canvas layer.
    -   *Key Logic*: Sync PDF DOM element dimensions with the Fabric canvas.

### Step 3: Interactive Editor Engine
1.  **Fabric Integration**: Initialize a Fabric canvas overlaying each PDF page.
2.  **Tooling Logic**: Implement a "Tool Manager" in Zustand to switch between Select, Text, Draw, and Image modes.
3.  **Synchronization**: Create a one-way sync bridge (`useCanvasSync`) to propagate state changes from Zustand to the Fabric canvas without causing render loops.

### Step 4: UI Components & Panels
1.  **Editor Layout**: Build a 3-pane layout (Header, Sidebar, Workspace).
2.  **Property Panels**: Create context-aware sidebars (e.g., `TextFormatPanel`) that appear when objects are selected.
3.  **Floating Toolbar**: Implement a floating action bar for quick tool access on the canvas.

### Step 5: Homepage & Routing
1.  **Components**: Build modular homepage sections (`Hero`, `ToolsGrid`, `Navbar`).
2.  **Data**: Define available tools configuration (icons, routes, descriptions).
3.  **Routing**:
    -   Move `EditorLayout` to `app/edit-pdf/page.tsx`.
    -   Create `app/page.tsx` composing the homepage components.

---

## 5. Directory Structure
```text
edit-pdf/
├── app/
│   ├── (root)
│   │   ├── layout.tsx            # Global layout (fonts)
│   │   └── page.tsx              # Homepage (Tools Grid)
│   └── edit-pdf/
│       └── page.tsx              # Editor Route
│
├── components/
│   ├── home/                     # Homepage Components
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   ├── ToolsGrid.tsx
│   │   └── ToolCard.tsx
│   │
│   ├── layout/                   # Editor Layouts
│   │   ├── EditorLayout.tsx
│   │   └── PropertySidebar.tsx
│   │
│   ├── editor/                   # Fabric.js Logic
│   │   └── InteractionLayer.tsx
│   │
│   └── pdf/                      # PDF.js Logic
│       ├── VirtualScroller.tsx
│       └── PageContainer.tsx
│
├── stores/
│   └── editor-store.ts           # Global State
│
└── lib/
    ├── tools-data.ts             # Homepage Configuration
    └── utils.ts
```

---

## 6. Current Status & Roadmap

### Completed Features
- [x] **Project Setup**: Next.js 16 + Tailwind v4.
- [x] **PDF Viewing**: Virtualized rendering with `react-pdf`.
- [x] **Interactive Canvas**: Fabric.js integration for object manipulation.
- [x] **Editor UI**: Professional 3-pane layout with property panels.
- [x] **Homepage**: Responsive landing page with "FluxDoc" branding.
- [x] **Routing**: Split between Landing and Editor apps.

### Future Improvements
- [ ] **Export**: Client-side PDF generation (merging Canvas edits into PDF).
- [ ] **Authentication**: User accounts for saving projects.
- [ ] **WASM Optimization**: Rust modules for heavy PDF processing.
