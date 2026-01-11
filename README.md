# FluxDoc - Intelligent PDF Editor

FluxDoc is a powerful, client-heavy PDF editor built with Next.js, Fabric.js, and PDF.js. It features a modern, polished UI and high-performance rendering for a seamless document editing experience.

---

## 🚀 Key Features

- **High-Performance Rendering**: Powered by `PDF.js` for accurate document viewing.
- **Interactive Layer**: Built with `Fabric.js` for object selection, text editing, and drawing.
- **Polished UI/UX**: Modern design system using **Tailwind CSS v4** with custom design tokens.
- **Local Processing**: Documents are processed entirely in the browser for maximum privacy.
- **Responsive Workspace**: Flexible canvas scaling and zoom controls.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) (CSS-based `@theme` configuration)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) + [Immer](https://immerjs.github.io/immer/)
- **PDF Engine**: [PDF.js](https://mozilla.github.io/pdf.js/)
- **Canvas Engine**: [Fabric.js](http://fabricjs.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🔒 Security & Privacy

We take document privacy and security seriously:
- **Local-Only**: PDF processing and modification happen locally on the client side.
- **Security Audit**: Completed a comprehensive security audit of project ignore rules.
- **No Leaks**: Pre-configured `.gitignore` prevents accidental leaks of sensitive files, environment variables, or API keys.

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the result.

### 3. Build for Production
```bash
npm run build
```

---

## 📄 Project Structure

- `/app`: Next.js App Router and global styles.
- `/components/layout`: Structural UI components (Header, Sidebar, Workspace).
- `/components/pdf`: PDF rendering and page container logic.
- `/components/editor`: Fabric.js interaction layer and UI tools.
- `/stores`: Global state management with Zustand.
- `/lib`: Shared TypeScript types and utilities.

---

## 📈 Recent Updates

- ✅ **Tailwind v4 Migration**: Fully migrated design system to the new CSS-based configuration.
- ✅ **UI Redesign**: Polished shadows, borders, and background to match premium design specifications.
- ✅ **Stability Fixes**: Resolved critical TypeScript mismatches in virtual scrolling and page rendering.
- ✅ **Comprehesive GitIgnore**: Enhanced security with detailed file exclusion rules.
