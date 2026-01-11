"use client";

import { useEditorStore } from "@/stores/editor-store";
import { PageContainer } from "../pdf/PageContainer";

export function Workspace() {
    const { document, editor } = useEditorStore();
    const { pages } = document;
    const { scale, isProcessing } = {
        scale: editor.viewport.scale,
        isProcessing: editor.isProcessing,
    };

    return (
        <main className="flex-1 bg-editor-bg overflow-auto relative p-8 flex flex-col items-center editor-scrollbar">
            {/* Processing Overlay */}
            {isProcessing && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                    <div className="bg-editor-sidebar p-6 rounded-xl shadow-floating flex flex-col items-center gap-3">
                        <div className="w-6 h-6 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <span className="font-medium text-white">
                            Processing PDF...
                        </span>
                    </div>
                </div>
            )}

            {/* Render PDF Pages */}
            <div className="mt-4 mb-24">
                {pages.map((page, index) => (
                    <PageContainer
                        key={index}
                        page={page}
                        pageIndex={index}
                        scale={scale}
                    />
                ))}
            </div>
        </main>
    );
}
