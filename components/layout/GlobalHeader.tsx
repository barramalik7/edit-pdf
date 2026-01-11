"use client";

import { useEditorStore } from "@/stores/editor-store";
import { Minus, Plus, Download, Layers } from "lucide-react";

export function GlobalHeader() {
    const { document, editor, updateViewport } = useEditorStore();
    const scale = editor.viewport.scale;

    const handleZoomIn = () => {
        updateViewport({ scale: Math.min(scale + 0.1, 3) });
    };

    const handleZoomOut = () => {
        updateViewport({ scale: Math.max(scale - 0.1, 0.5) });
    };

    const handleExport = () => {
        alert("Export functionality would compile the canvas layers and PDF background into a new PDF.");
    };

    return (
        <header className="h-16 bg-surface border-b border-gray-200 flex items-center justify-between px-6 z-50 relative">
            {/* Left: Branding & Document Name */}
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    <Layers className="w-5 h-5" />
                </div>
                <h1 className="font-bold text-lg text-text-primary">FluxDoc</h1>
                {document.fileName && (
                    <span className="text-sm text-text-secondary px-2 border-l border-gray-300 ml-2 truncate max-w-[200px]">
                        {document.fileName}
                    </span>
                )}
            </div>

            {/* Center: Zoom Controls (Pill Style) */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                    onClick={handleZoomOut}
                    className="p-1.5 hover:bg-white rounded-md transition-colors text-text-secondary"
                    title="Zoom Out"
                >
                    <Minus className="w-4 h-4" />
                </button>
                <span className="w-16 text-center text-sm font-medium text-text-primary">
                    {Math.round(scale * 100)}%
                </span>
                <button
                    onClick={handleZoomIn}
                    className="p-1.5 hover:bg-white rounded-md transition-colors text-text-secondary"
                    title="Zoom In"
                >
                    <Plus className="w-4 h-4" />
                </button>
            </div>

            {/* Right: Export Button */}
            <div className="flex items-center gap-3">
                <button
                    onClick={handleExport}
                    className="bg-primary hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                >
                    <Download className="w-4 h-4" />
                    Export
                </button>
            </div>
        </header>
    );
}
