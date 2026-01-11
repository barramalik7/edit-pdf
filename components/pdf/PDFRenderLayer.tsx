"use client";

import { useEditorStore } from "@/stores/editor-store";
import { Document, pdfjs } from "react-pdf";
import { VirtualScroller } from "@/components/pdf/VirtualScroller";
import { useState, useCallback, useEffect } from "react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export function PDFRenderLayer() {
    const { document, setDocument } = useEditorStore();
    const [numPages, setNumPages] = useState<number>(0);

    // Handle file loading success
    const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
        // Determine a dummy file object if coming from URL (not strict for this phase)
        if (!document.file && !document.pageCount) {
            // Just update page count in store if not present
            // In a real flow, 'setDocument' should have been called on upload
            useEditorStore.getState().setDocument(null as any, numPages);
        }
    }, [document.file, document.pageCount]);

    // When NumPages updates, ensure store knows (important for virt scroller)
    useEffect(() => {
        if (numPages > 0) {
            useEditorStore.getState().setDocument(document.file || ({} as File), numPages);
        }
    }, [numPages, document.file]);


    return (
        <div className="flex-1 overflow-hidden relative flex flex-col items-center">
            {document.file ? (
                <Document
                    file={document.file}
                    onLoadSuccess={onDocumentLoadSuccess}
                    className="flex flex-col items-center bg-gray-100/50 min-h-full"
                    loading={
                        <div className="mt-20 flex flex-col items-center gap-2 text-gray-400">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                            <span className="text-sm">Loading PDF...</span>
                        </div>
                    }
                    error={
                        <div className="mt-20 text-red-500 font-medium">
                            Failed to load PDF document.
                        </div>
                    }
                >
                    <VirtualScroller numPages={numPages} />
                </Document>
            ) : (
                <div className="mt-20 text-gray-400">No PDF Loaded</div>
            )}
        </div>
    );
}
