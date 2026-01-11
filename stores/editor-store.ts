import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Annotation, EditorAction, ToolType, ViewportTransform } from '@/lib/types';

// --- Slice Interfaces ---

interface DocumentSlice {
    document: {
        file: File | null;
        fileName: string | null;
        pageCount: number;
        pages: any[]; // PDFPageProxy objects from PDF.js
        pageDimensions: Record<number, { width: number; height: number }>;
        annotations: Record<number, Annotation[]>; // key: pageIndex
    };
    setDocument: (file: File | null, pageCount: number, pages?: any[]) => void;
    setFileName: (name: string | null) => void;
    updatePageDimensions: (pageIndex: number, width: number, height: number) => void;
    addAnnotation: (pageIndex: number, annotation: Annotation) => void;
    updateAnnotation: (pageIndex: number, id: string, changes: Partial<Annotation>) => void;
    removeAnnotation: (pageIndex: number, id: string) => void;
}

interface EditorSlice {
    editor: {
        activeTool: ToolType;
        selectedIds: string[];
        viewport: ViewportTransform;
        activeColor: string;
        activeFontSize: number;
        isProcessing: boolean;
    };
    setTool: (tool: ToolType) => void;
    selectObjects: (ids: string[]) => void;
    updateViewport: (transform: Partial<ViewportTransform>) => void;
    setColor: (color: string) => void;
    setFontSize: (size: number) => void;
    setProcessing: (isProcessing: boolean) => void;
}

interface HistorySlice {
    history: {
        past: EditorAction[][];
        future: EditorAction[][];
    };
    pushAction: (actions: EditorAction[]) => void;
    undo: () => void;
    redo: () => void;
}

// --- Combined Store Type ---

type AppState = DocumentSlice & EditorSlice & HistorySlice;

// --- Store Implementation ---

const MAX_HISTORY = 50;

export const useEditorStore = create<AppState>()(
    immer((set, get) => ({
        // Document Slice
        document: {
            file: null,
            fileName: null,
            pageCount: 0,
            pages: [],
            pageDimensions: {},
            annotations: {},
        },
        setDocument: (file, pageCount, pages = []) =>
            set((state) => {
                state.document.file = file;
                state.document.fileName = file?.name || null;
                state.document.pageCount = pageCount;
                state.document.pages = pages;
                state.document.annotations = {};
                // Initialize arrays for pages
                for (let i = 0; i < pageCount; i++) {
                    state.document.annotations[i] = [];
                }
            }),
        setFileName: (name) =>
            set((state) => {
                state.document.fileName = name;
            }),
        updatePageDimensions: (pageIndex, width, height) =>
            set((state) => {
                state.document.pageDimensions[pageIndex] = { width, height };
            }),
        addAnnotation: (pageIndex, annotation) =>
            set((state) => {
                if (!state.document.annotations[pageIndex]) {
                    state.document.annotations[pageIndex] = [];
                }
                state.document.annotations[pageIndex].push(annotation);
            }),
        updateAnnotation: (pageIndex, id, changes) =>
            set((state) => {
                const page = state.document.annotations[pageIndex];
                if (!page) return;
                const index = page.findIndex((a) => a.id === id);
                if (index !== -1) {
                    // Merge changes
                    Object.assign(page[index], changes);
                }
            }),
        removeAnnotation: (pageIndex, id) =>
            set((state) => {
                const page = state.document.annotations[pageIndex];
                if (!page) return;
                const index = page.findIndex((a) => a.id === id);
                if (index !== -1) {
                    page.splice(index, 1);
                }
            }),

        // Editor Slice
        editor: {
            activeTool: 'SELECT',
            selectedIds: [],
            viewport: { scale: 1, offsetX: 0, offsetY: 0, rotation: 0 },
            activeColor: '#E5322D',
            activeFontSize: 20,
            isProcessing: false,
        },
        setTool: (tool) =>
            set((state) => {
                state.editor.activeTool = tool;
                // Auto-deselect when switching tools
                if (tool !== 'SELECT') {
                    state.editor.selectedIds = [];
                }
            }),
        selectObjects: (ids) =>
            set((state) => {
                state.editor.selectedIds = ids;
            }),
        updateViewport: (transform) =>
            set((state) => {
                Object.assign(state.editor.viewport, transform);
            }),
        setColor: (color) =>
            set((state) => {
                state.editor.activeColor = color;
            }),
        setFontSize: (size) =>
            set((state) => {
                state.editor.activeFontSize = size;
            }),
        setProcessing: (isProcessing) =>
            set((state) => {
                state.editor.isProcessing = isProcessing;
            }),

        // History Slice (Basic Implementation)
        history: {
            past: [],
            future: [],
        },
        pushAction: (actions) =>
            set((state) => {
                // Clear future history when new action occurs
                state.history.future = [];
                state.history.past.push(actions);
                if (state.history.past.length > MAX_HISTORY) {
                    state.history.past.shift();
                }
            }),
        undo: () =>
            set((state) => {
                const last = state.history.past.pop();
                if (last) {
                    state.history.future.push(last);
                    // In a real app, we'd apply the inverse action here.
                    // For this shell, we just manage the stack.
                    // Actual undo logic requires storing inverse ops.
                }
            }),
        redo: () =>
            set((state) => {
                const next = state.history.future.pop();
                if (next) {
                    state.history.past.push(next);
                    // Re-apply logic would go here.
                }
            }),
    }))
);
