"use client";

import { useEditorStore } from "@/stores/editor-store";
import { Type, Bold, Italic, AlignLeft, AlignCenter, AlignRight } from "lucide-react";

export function TextFormatPanel() {
    const { editor, updateAnnotation, document } = useEditorStore();

    // Get the first selected item for now
    const selectedId = editor.selectedIds[0];

    // Ideally, we'd find the object and its page index. 
    // Since our store structure requires pageIndex for updates, we need to find it.
    // This is an expensive lookup in a real app, but fine for MVP.
    let selectedPage = -1;
    let selectedObject: any = null;

    if (selectedId) {
        for (const [pageIndex, annotations] of Object.entries(document.annotations)) {
            const found = annotations.find(a => a.id === selectedId);
            if (found) {
                selectedPage = parseInt(pageIndex);
                selectedObject = found;
                break;
            }
        }
    }

    if (!selectedObject || selectedObject.type !== 'text') return null;

    const style = selectedObject.style;

    const updateStyle = (changes: any) => {
        if (selectedPage !== -1 && selectedId) {
            updateAnnotation(selectedPage, selectedId, {
                style: { ...style, ...changes }
            });
        }
    };

    return (
        <div className="space-y-6">
            {/* Font Family (Mock) */}
            <div className="space-y-2">
                <label className="text-xs font-semibold text-text-secondary uppercase">Font</label>
                <select
                    className="w-full p-2 border border-gray-200 rounded-md text-sm bg-white"
                    value={style.fontFamily}
                    onChange={(e) => updateStyle({ fontFamily: e.target.value })}
                >
                    <option value="Inter">Inter</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Courier New">Courier New</option>
                </select>
            </div>

            {/* Size & Weight */}
            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-text-secondary uppercase">Size</label>
                    <input
                        type="number"
                        className="w-full p-2 border border-gray-200 rounded-md text-sm"
                        value={style.fontSize}
                        onChange={(e) => updateStyle({ fontSize: parseInt(e.target.value) })}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-text-secondary uppercase">Color</label>
                    <div className="flex items-center gap-2">
                        <input
                            type="color"
                            className="w-8 h-8 rounded cursor-pointer border-none"
                            value={style.color}
                            onChange={(e) => updateStyle({ color: e.target.value })}
                        />
                        <span className="text-xs text-gray-500">{style.color}</span>
                    </div>
                </div>
            </div>

            {/* Style Buttons */}
            <div className="space-y-2">
                <label className="text-xs font-semibold text-text-secondary uppercase">Style</label>
                <div className="flex bg-gray-100 rounded-md p-1 gap-1">
                    <button
                        onClick={() => updateStyle({ fontWeight: style.fontWeight === 'bold' ? 'normal' : 'bold' })}
                        className={`flex-1 p-1.5 rounded flex justify-center ${style.fontWeight === 'bold' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                    >
                        <Bold className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => updateStyle({ fontStyle: style.fontStyle === 'italic' ? 'normal' : 'italic' })}
                        className={`flex-1 p-1.5 rounded flex justify-center ${style.fontStyle === 'italic' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                    >
                        <Italic className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Alignment */}
            <div className="space-y-2">
                <label className="text-xs font-semibold text-text-secondary uppercase">Align</label>
                <div className="flex bg-gray-100 rounded-md p-1 gap-1">
                    <button
                        onClick={() => updateStyle({ textAlign: 'left' })}
                        className={`flex-1 p-1.5 rounded flex justify-center ${style.textAlign === 'left' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                    >
                        <AlignLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => updateStyle({ textAlign: 'center' })}
                        className={`flex-1 p-1.5 rounded flex justify-center ${style.textAlign === 'center' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                    >
                        <AlignCenter className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => updateStyle({ textAlign: 'right' })}
                        className={`flex-1 p-1.5 rounded flex justify-center ${style.textAlign === 'right' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                    >
                        <AlignRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
