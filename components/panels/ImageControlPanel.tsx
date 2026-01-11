"use client";

import { useEditorStore } from "@/stores/editor-store";
import { Lock, Unlock, Image as ImageIcon } from "lucide-react";

export function ImageControlPanel() {
    const { editor, updateAnnotation, document } = useEditorStore();

    const selectedId = editor.selectedIds[0];
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

    if (!selectedObject || selectedObject.type !== 'image') return null;

    const updateImg = (changes: any) => {
        if (selectedPage !== -1 && selectedId) {
            updateAnnotation(selectedPage, selectedId, changes);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
                <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                    <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                    <h4 className="text-sm font-medium">Image Properties</h4>
                </div>
            </div>

            {/* Opacity */}
            <div className="space-y-2">
                <div className="flex justify-between">
                    <label className="text-xs font-semibold text-text-secondary uppercase">Opacity</label>
                    <span className="text-xs text-gray-500">{Math.round((selectedObject.opacity || 1) * 100)}%</span>
                </div>
                <input
                    type="range"
                    min="0" max="1" step="0.1"
                    className="w-full accent-primary"
                    value={selectedObject.opacity || 1}
                    onChange={(e) => updateImg({ opacity: parseFloat(e.target.value) })}
                />
            </div>

            {/* Aspect Ratio */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                <label className="text-sm font-medium text-text-primary">Lock Aspect Ratio</label>
                <button
                    onClick={() => updateImg({ lockAspectRatio: !selectedObject.lockAspectRatio })}
                    className={`p-2 rounded-md transition-colors ${selectedObject.lockAspectRatio ? 'text-primary bg-white shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    {selectedObject.lockAspectRatio ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                </button>
            </div>
        </div>
    );
}
