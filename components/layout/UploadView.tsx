"use client";

import { useRef } from "react";
import { useEditorStore } from "@/stores/editor-store";
import { UploadCloud } from "lucide-react";

export function UploadView() {
    const { setDocument, setProcessing } = useEditorStore();
    const inputRef = useRef<HTMLInputElement>(null);

    const processFile = async (file: File) => {
        if (file.type !== 'application/pdf') {
            alert("Please upload a PDF file.");
            return;
        }

        setProcessing(true);

        try {
            // Dynamically import PDF.js to avoid SSR issues (DOMMatrix error)
            const pdfjs = await import("pdfjs-dist");

            // Configure worker (use a publicly available worker or local one)
            // Using unpkg for simplicity in this demo, matching previous configuration
            if (!pdfjs.GlobalWorkerOptions.workerSrc) {
                pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
            }

            // Load PDF with native PDF.js
            const arrayBuffer = await file.arrayBuffer();
            const loadingTask = pdfjs.getDocument(arrayBuffer);
            const pdf = await loadingTask.promise;

            // Extract all page proxies
            const pages: any[] = [];
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                pages.push(page);
            }

            // Store in Zustand
            setDocument(file, pdf.numPages, pages);

        } catch (error) {
            console.error("Error loading PDF:", error);
            alert("Failed to load PDF. Please try a different file.");
        } finally {
            setProcessing(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            processFile(file);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            processFile(file);
        }
    };

    return (
        <div
            className="flex-1 flex flex-col items-center justify-center bg-background p-6"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
        >
            <div className="bg-surface p-12 rounded-2xl shadow-floating max-w-lg w-full text-center border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <UploadCloud className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold text-text-primary mb-3">Upload your PDF</h2>
                <p className="text-text-secondary mb-8 leading-relaxed">
                    Drag and drop your document here, or click to browse files.
                    <br />
                    We process everything locally in your browser.
                </p>

                <input
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    ref={inputRef}
                    onChange={handleFileChange}
                />

                <button
                    onClick={() => inputRef.current?.click()}
                    className="bg-primary hover:bg-red-600 text-white px-8 py-3 rounded-xl font-semibold transition-transform active:scale-95 shadow-lg shadow-primary/20"
                >
                    Select Document
                </button>
            </div>
        </div>
    );
}
