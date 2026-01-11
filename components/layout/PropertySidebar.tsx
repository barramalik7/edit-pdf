"use client";

import { useEditorStore } from "@/stores/editor-store";
import { MousePointer2, Type, PenTool, ImageIcon, Info } from "lucide-react";

export function PropertySidebar() {
    const { editor, setColor, setFontSize } = useEditorStore();
    const { activeTool, selectedIds, activeColor, activeFontSize } = editor;

    const hasSelection = selectedIds.length > 0;
    const headerText = hasSelection ? 'Selection Properties' : 'Tool Properties';

    // Color palette
    const colors = ['#000000', '#E5322D', '#2563EB', '#16A34A', '#F59E0B', '#9333EA'];

    // Get icon for current tool
    const getToolIcon = () => {
        switch (activeTool) {
            case 'SELECT': return <MousePointer2 className="w-4 h-4 text-primary" />;
            case 'TEXT': return <Type className="w-4 h-4 text-primary" />;
            case 'DRAW': return <PenTool className="w-4 h-4 text-primary" />;
            case 'IMAGE': return <ImageIcon className="w-4 h-4 text-primary" />;
            default: return null;
        }
    };

    return (
        <aside className="w-72 bg-surface border-l border-gray-200 h-full flex flex-col z-40 shadow-sm">
            <div className="p-5 border-b border-gray-100">
                <h2 className="font-semibold text-text-primary text-sm uppercase tracking-wide">{headerText}</h2>
            </div>

            <div className="p-5 flex flex-col gap-6 overflow-y-auto">
                {/* Active Mode Indicator */}
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-text-secondary">Active Mode</label>
                    <div className="bg-gray-50 px-3 py-2 rounded-md text-sm font-medium text-text-primary flex items-center gap-2 border border-gray-100">
                        {getToolIcon()}
                        {activeTool}
                    </div>
                </div>

                {/* Formatting Controls - Only show if relevant */}
                {(activeTool === 'TEXT' || activeTool === 'DRAW' || (hasSelection && activeTool === 'SELECT')) && (
                    <>
                        {/* Color Picker */}
                        <div className="flex flex-col gap-3">
                            <label className="text-xs font-medium text-text-secondary">Color</label>
                            <div className="grid grid-cols-6 gap-2">
                                {colors.map(color => (
                                    <button
                                        key={color}
                                        onClick={() => setColor(color)}
                                        className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${activeColor === color ? 'border-gray-400 ring-2 ring-primary ring-offset-2' : 'border-transparent'}`}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                            <input
                                type="color"
                                value={activeColor}
                                onChange={(e) => setColor(e.target.value)}
                                className="w-full h-8 cursor-pointer rounded-md border border-gray-200"
                            />
                        </div>

                        {/* Font Size Slider */}
                        {(activeTool === 'TEXT' || hasSelection) && (
                            <div className="flex flex-col gap-3">
                                <label className="text-xs font-medium text-text-secondary">Font Size</label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="range"
                                        min="8"
                                        max="72"
                                        value={activeFontSize}
                                        onChange={(e) => setFontSize(parseInt(e.target.value))}
                                        className="flex-1 accent-primary h-2 bg-gray-200 rounded-lg appearance-none"
                                    />
                                    <span className="w-8 text-right text-sm font-medium text-text-primary">{activeFontSize}</span>
                                </div>
                            </div>
                        )}
                    </>
                )}

                {/* Empty State Hint */}
                {!hasSelection && activeTool === 'SELECT' && (
                    <div className="p-4 bg-blue-50 text-blue-700 text-xs rounded-lg leading-relaxed flex items-start gap-2">
                        <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>Select an object on the canvas to edit its properties, or choose a tool from the toolbar to start editing.</span>
                    </div>
                )}
            </div>
        </aside>
    );
}
