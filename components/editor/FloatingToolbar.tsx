"use client";

import { useEditorStore } from "@/stores/editor-store";
import { MousePointer2, Type, ImageIcon, PenTool } from "lucide-react";
import { ToolType } from "@/lib/types";

export function FloatingToolbar() {
    const { editor, setTool } = useEditorStore();
    const activeTool = editor.activeTool;

    const tools: { id: ToolType; icon: React.ReactNode; label: string }[] = [
        { id: 'SELECT', icon: <MousePointer2 className="w-5 h-5" />, label: 'Select' },
        { id: 'TEXT', icon: <Type className="w-5 h-5" />, label: 'Text' },
        { id: 'DRAW', icon: <PenTool className="w-5 h-5" />, label: 'Draw' },
        { id: 'IMAGE', icon: <ImageIcon className="w-5 h-5" />, label: 'Image' },
    ];

    return (
        <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 bg-surface rounded-xl shadow-floating border border-gray-100 p-2 flex flex-col gap-2">
            {tools.map((tool) => (
                <button
                    key={tool.id}
                    onClick={() => setTool(tool.id)}
                    className={`p-3 rounded-lg transition-all group relative flex items-center justify-center
                        ${activeTool === tool.id
                            ? 'bg-primary text-white shadow-md'
                            : 'text-text-secondary hover:bg-gray-50 hover:text-primary'
                        }`}
                    title={tool.label}
                >
                    {tool.icon}

                    {/* Tooltip */}
                    <span className="absolute left-full ml-3 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        {tool.label}
                    </span>
                </button>
            ))}
        </div>
    );
}
