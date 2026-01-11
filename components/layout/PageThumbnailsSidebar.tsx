"use client";

import { useEditorStore } from "@/stores/editor-store";
import { LayoutGrid } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import { useState, useEffect, useCallback } from "react";

// Configure worker (ensure it matches the version used in other parts of the app)
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export function PageThumbnailsSidebar() {
    const { editor, document, setCurrentPage } = useEditorStore();
    const currentPage = editor.currentPage ?? 1;
    const file = document.file;
    const [numPages, setNumPages] = useState<number>(0);

    // Sync local numPages with store if available
    useEffect(() => {
        if (document.pageCount > 0) {
            setNumPages(document.pageCount);
        }
    }, [document.pageCount]);

    const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    }, []);

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
                {file ? (
                    <Document
                        file={file}
                        onLoadSuccess={onDocumentLoadSuccess}
                        className="flex flex-col gap-3"
                        loading={
                            <div className="text-xs text-gray-500 text-center py-4">Loading...</div>
                        }
                        error={
                            <div className="text-xs text-red-400 text-center py-4">Error loading PDF</div>
                        }
                    >
                        {Array.from(new Array(numPages), (el, index) => {
                            const pageNum = index + 1;
                            const isCurrent = currentPage === pageNum;

                            return (
                                <div
                                    key={pageNum}
                                    onClick={() => setCurrentPage(pageNum)}
                                    className="group cursor-pointer flex flex-col items-center"
                                >
                                    <div
                                        className={`relative w-full bg-white transition-all duration-200 overflow-hidden rounded-sm ${isCurrent
                                                ? "ring-2 ring-primary shadow-lg"
                                                : "opacity-70 group-hover:opacity-100"
                                            }`}
                                    >
                                        <Page
                                            pageNumber={pageNum}
                                            width={134} // Sidebar width (160px) - padding (24px) - border adjustment
                                            renderTextLayer={false}
                                            renderAnnotationLayer={false}
                                            className="pointer-events-none" // Let the parent div handle clicks
                                        />

                                        {/* Page number badge */}
                                        <div className="absolute bottom-1 right-1 bg-black/50 text-white text-[10px] px-1 rounded z-10">
                                            {pageNum}
                                        </div>
                                    </div>
                                    <span
                                        className={`mt-1.5 text-xs ${isCurrent
                                                ? "text-primary font-bold"
                                                : "text-gray-500"
                                            }`}
                                    >
                                        Page {pageNum}
                                    </span>
                                </div>
                            );
                        })}
                    </Document>
                ) : (
                    <div className="text-xs text-gray-500 text-center mt-10">
                        No PDF uploaded
                    </div>
                )}
            </div>
        </aside>
    );
}
