"use client";

import { useEditorStore } from "@/stores/editor-store";
import { PageContainer } from "../pdf/PageContainer";

export function Workspace() {
    const { document, editor } = useEditorStore();
    const { pages } = document;
    const { scale, isProcessing } = { scale: editor.viewport.scale, isProcessing: editor.isProcessing };

    return (
        <main className="flex-1 bg-background overflow-auto relative p-12 flex flex-col items-center">
            {/* Processing Overlay */}
            {isProcessing && (
                <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-xl shadow-floating flex flex-col items-center gap-3">
                        <div className="w-6 h-6 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <span className="font-medium text-gray-600">Processing PDF...</span>
                    </div>
                </div>
            )}

            {/* Render PDF Pages */}
            {pages.map((page, index) => (
                <PageContainer
                    key={index}
                    page={page}
                    pageIndex={index}
                    scale={scale}
                />
            ))}

            <div className="h-20"></div> {/* Bottom spacer */}
        </main>
    );
}
