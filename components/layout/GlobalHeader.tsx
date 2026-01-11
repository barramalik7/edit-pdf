"use client";

import Link from "next/link";
import { useEditorStore } from "@/stores/editor-store";
import {
    ChevronLeft,
    Minus,
    Plus,
    Download,
    MousePointer2,
    Type,
    Image as ImageIcon,
    PenTool,
    Square,
} from "lucide-react";
import { ToolType } from "@/lib/types";

const tools: { id: ToolType; icon: React.ReactNode; label: string }[] = [
    { id: "SELECT", icon: <MousePointer2 className="w-5 h-5" />, label: "Select" },
    { id: "TEXT", icon: <Type className="w-5 h-5" />, label: "Text" },
    { id: "IMAGE", icon: <ImageIcon className="w-5 h-5" />, label: "Image" },
    { id: "DRAW", icon: <PenTool className="w-5 h-5" />, label: "Draw" },
    { id: "SHAPE", icon: <Square className="w-5 h-5" />, label: "Shape" },
];

export function GlobalHeader() {
    const { document, editor, updateViewport, setTool } = useEditorStore();
    const scale = editor.viewport.scale;
    const activeTool = editor.activeTool;
    const hasFile = document.file !== null;

    const handleZoomIn = () => {
        updateViewport({ scale: Math.min(scale + 0.25, 3) });
    };

    const handleZoomOut = () => {
        updateViewport({ scale: Math.max(scale - 0.25, 0.5) });
    };

    const handleExport = () => {
        alert(
            "Export functionality would compile the canvas layers and PDF background into a new PDF."
        );
    };

    return (
        <header
            className={`h-16 flex items-center justify-between px-4 z-50 relative shrink-0 transition-colors duration-300 ${hasFile
                    ? "bg-editor-header border-b border-editor-border"
                    : "bg-surface border-b border-gray-200"
                }`}
        >
            {/* Left: Exit & Document Name */}
            <div className="flex items-center gap-3">
                <Link
                    href="/"
                    className={`flex items-center transition-colors ${hasFile
                            ? "text-gray-400 hover:text-white"
                            : "text-gray-500 hover:text-gray-900"
                        }`}
                >
                    <ChevronLeft className="w-5 h-5 mr-1" />
                    <span className="text-sm font-medium">Exit</span>
                </Link>
                {hasFile && (
                    <>
                        <div className="h-5 w-px bg-gray-600 mx-1"></div>
                        <span className="text-sm font-medium text-white truncate max-w-[200px]">
                            {document.fileName || "Untitled Document"}
                        </span>
                    </>
                )}
            </div>

            {/* Center: Toolbar (Only when file loaded) */}
            {hasFile && (
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center bg-editor-sidebar rounded-lg p-1 space-x-1">
                    {tools.map((tool) => (
                        <button
                            key={tool.id}
                            onClick={() => setTool(tool.id)}
                            className={`p-2 rounded-md transition-all ${activeTool === tool.id
                                    ? "bg-primary text-white shadow-md"
                                    : "text-gray-300 hover:bg-gray-600 hover:text-white"
                                }`}
                            title={tool.label}
                        >
                            {tool.icon}
                        </button>
                    ))}
                </div>
            )}

            {/* Right: Zoom & Download (Only when file loaded) */}
            <div className="flex items-center gap-3">
                {hasFile && (
                    <>
                        <div className="flex items-center bg-editor-sidebar rounded-md p-1">
                            <button
                                onClick={handleZoomOut}
                                className="p-1.5 text-gray-400 hover:text-white transition-colors"
                                title="Zoom Out"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-12 text-center text-xs font-mono text-white">
                                {Math.round(scale * 100)}%
                            </span>
                            <button
                                onClick={handleZoomIn}
                                className="p-1.5 text-gray-400 hover:text-white transition-colors"
                                title="Zoom In"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>

                        <button
                            onClick={handleExport}
                            className="bg-primary hover:bg-red-600 text-white px-5 py-2 rounded-md text-sm font-bold transition-all shadow-lg hover:scale-105 flex items-center gap-2"
                        >
                            <Download className="w-4 h-4" />
                            Download PDF
                        </button>
                    </>
                )}
            </div>
        </header>
    );
}
