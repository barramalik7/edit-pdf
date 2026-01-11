"use client";

import { useMergeStore } from "@/stores/merge-store";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FileText, X, Plus, GripVertical } from "lucide-react";
import { useRef } from "react";

// Sortable Item Component
function SortableFileItem({ file, id, onRemove }: { file: File, id: string, onRemove: () => void }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`group relative bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-center gap-3 select-none hover:shadow-md transition-shadow ${isDragging ? 'opacity-50' : ''}`}
        >
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={(e) => { e.stopPropagation(); onRemove(); }}
                    className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            {/* Drag Handle */}
            <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-2 hover:bg-gray-50 rounded-lg text-gray-300 hover:text-gray-500 transition-colors">
                <GripVertical className="w-6 h-6" />
            </div>

            <div className="w-16 h-16 bg-red-50 rounded-lg flex items-center justify-center text-red-500 mb-2">
                <FileText className="w-8 h-8" />
            </div>

            <div className="text-center w-full px-2">
                <p className="text-sm font-medium text-gray-700 truncate w-full" title={file.name}>
                    {file.name}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
            </div>
        </div>
    );
}

export function MergeReorderView() {
    const { files, setFiles, removeFile, addFiles } = useMergeStore();
    const inputRef = useRef<HTMLInputElement>(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = files.findIndex((_, i) => `file-${i}` === active.id);
            const newIndex = files.findIndex((_, i) => `file-${i}` === over.id);
            setFiles(arrayMove(files, oldIndex, newIndex));
        }
    };

    const handleAddMore = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            addFiles(Array.from(e.target.files));
        }
    };

    const handleMerge = () => {
        alert("Merge functionality coming next!");
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-20 px-6 flex flex-col items-center">
            <div className="w-full max-w-6xl">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Arrange Files</h2>
                        <p className="text-gray-500 mt-1">Drag and drop to reorder your PDFs</p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => inputRef.current?.click()}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Add Files
                        </button>
                        <input
                            type="file"
                            multiple
                            accept="application/pdf"
                            className="hidden"
                            ref={inputRef}
                            onChange={handleAddMore}
                        />
                    </div>
                </div>

                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={files.map((_, i) => `file-${i}`)}
                        strategy={rectSortingStrategy}
                    >
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {files.map((file, index) => (
                                <SortableFileItem
                                    key={`file-${index}`} // Note: using index as key is risky for dnd if items change, but okay for MVP if immutable
                                    id={`file-${index}`}
                                    file={file}
                                    onRemove={() => removeFile(index)}
                                />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            </div>

            {/* Bottom Floating Bar */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white p-4 rounded-2xl shadow-floating border border-gray-100 flex items-center gap-6 z-50">
                <div className="flex items-center gap-2 px-4 border-r border-gray-200">
                    <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold">
                        {files.length}
                    </div>
                    <span className="text-sm font-medium text-gray-600">PDFs selected</span>
                </div>

                <button
                    onClick={handleMerge}
                    className="bg-primary hover:bg-red-600 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg shadow-red-200 transition-all hover:scale-105 active:scale-95"
                >
                    Merge PDF
                </button>
            </div>
        </div>
    );
}
