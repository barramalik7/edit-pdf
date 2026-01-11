"use client";

import { useEditorStore } from "@/stores/editor-store";
import { LayoutGrid, Plus } from "lucide-react";

interface PageThumbnailsSidebarProps {
    pageCount?: number;
}

export function PageThumbnailsSidebar({ pageCount = 5 }: PageThumbnailsSidebarProps) {
    const { editor, setCurrentPage } = useEditorStore();
    const currentPage = editor.currentPage ?? 1;
    const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

    return (
        <aside className="w-40 bg-editor-sidebar border-r border-editor-border flex flex-col shrink-0">
            {/* Header */}
            <div className="p-3 border-b border-editor-border flex justify-between items-center">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Pages
                </span>
                <button className="text-gray-400 hover:text-white transition-colors">
                    <LayoutGrid className="w-4 h-4" />
                </button>
            </div>

            {/* Page Thumbnails */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 editor-scrollbar">
                {pages.map((page) => (
                    <div
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className="group cursor-pointer flex flex-col items-center"
                    >
                        <div
                            className={`relative w-full aspect-[1/1.414] bg-white transition-all duration-200 ${currentPage === page
                                    ? "ring-2 ring-primary shadow-lg"
                                    : "opacity-70 group-hover:opacity-100"
                                }`}
                        >
                            {/* Mock content lines for thumbnail */}
                            <div className="absolute top-3 left-3 right-3 h-1.5 bg-gray-200 rounded-sm"></div>
                            <div className="absolute top-6 left-3 right-6 h-1.5 bg-gray-200 rounded-sm"></div>
                            <div className="absolute top-9 left-3 right-8 h-1.5 bg-gray-200 rounded-sm"></div>

                            {/* Page number badge */}
                            <div className="absolute bottom-1 right-1 bg-black/50 text-white text-[10px] px-1 rounded">
                                {page}
                            </div>
                        </div>
                        <span
                            className={`mt-1.5 text-xs ${currentPage === page
                                    ? "text-primary font-bold"
                                    : "text-gray-500"
                                }`}
                        >
                            Page {page}
                        </span>
                    </div>
                ))}

                {/* Add Page Button */}
                <button className="w-full border border-dashed border-gray-600 rounded-lg p-3 flex flex-col items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition-colors">
                    <Plus className="w-5 h-5 mb-1" />
                    <span className="text-xs font-medium">Add Page</span>
                </button>
            </div>
        </aside>
    );
}
