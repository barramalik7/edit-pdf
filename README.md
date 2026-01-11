# FluxDoc - Intelligent PDF Editor

FluxDoc is a powerful, client-heavy PDF editor built with Next.js 16, Fabric.js, and PDF.js. It features a modern, polished UI inspired by industry leaders, offering a seamless document editing experience entirely in the browser.

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/77b64701-3481-4adc-9565-a4614cbba3ce" />


---

## 🚀 Key Features

-   **High-Performance Rendering**: Powered by `PDF.js` (via `react-pdf`) for accurate, virtualized document viewing.
-   **Interactive Canvas**: Built with `Fabric.js` for robust object selection, text editing, drawing, and image manipulation.
-   **Adaptive Editor States**: Clear separation between a **Light Upload state** and a **Dark Gemini-style Edit state** for zero-distraction editing.
-   **Page Navigation Sidebar**: Integrated thumbnail browser for quick navigation through multi-page documents.
-   **Modern Design System**: Polished UI using **Tailwind CSS v4** with custom design tokens and smooth animations.
-   **Local Processing**: Documents are processed entirely in the browser for maximum privacy—files never leave your device.
-   **Split Architecture**: Dedicated routing for the Marketing site (`/`) and the Editor application (`/edit-pdf`).

---

## 🛠️ Tech Stack

-   **Framework**: [Next.js 16.1](https://nextjs.org) (App Router, Turbopack)
-   **Language**: TypeScript v5+
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com) (CSS-based `@theme` configuration)
-   **State Management**: [Zustand](https://github.com/pmndrs/zustand) + [Immer](https://immerjs.github.io/immer/)
-   **PDF Engine**: [PDF.js](https://mozilla.github.io/pdf.js/) (v4+)
-   **Canvas Engine**: [Fabric.js](http://fabricjs.com/) (v6+)
-   **Icons**: [Lucide React](https://lucide.dev/)

---

## �️ Getting Started

### 1. Prerequisites
-   Node.js 18+ installed on your machine.

### 2. Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/barramalik7/edit-pdf.git
cd edit-pdf
npm install
```

### 3. Run Development Server
Start the local development server:

```bash
npm run dev
```

-   **Homepage**: Open [http://localhost:3000](http://localhost:3000)
-   **PDF Editor**: Open [http://localhost:3000/edit-pdf](http://localhost:3000/edit-pdf)

### 4. Running the App (Windows)
For convenience, you can also use the included batch file:
- Simply double-click **`run.bat`** in the root directory.

### 5. Build for Production
Create an optimized production build:

```bash
npm run build
npm start
```

---

## � Project Structure

```text
edit-pdf/
├── app/                  # Next.js App Router
│   ├── (root)            # Homepage route
│   └── edit-pdf/         # Editor application route
│
├── components/
│   ├── home/             # Homepage sections (Hero, Navbar, ToolsGrid)
│   ├── editor/           # Fabric.js interactive layer & tools
│   ├── pdf/              # PDF.js rendering & virtualization
│   ├── layout/           # Shared layouts
│   │   ├── EditorLayout.tsx
│   │   ├── GlobalHeader.tsx      # Adaptive Header (Light/Dark)
│   │   ├── PageThumbnailsSidebar.tsx # Page browser
│   │   ├── UploadView.tsx        # Upload interface
│   │   └── Workspace.tsx         # Dark canvas area
│   └── panels/           # Property control panels
│
├── lib/
│   └── tools-data.ts     # Configuration for available PDF tools
│
├── stores/               # Global Zustand state management
├── public/               # Static assets
└── run.bat               # Windows startup utility
```

---

## � Security & Privacy

-   **Local-Only**: All PDF processing happens client-side. No files are uploaded to any external server.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the repository
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request
