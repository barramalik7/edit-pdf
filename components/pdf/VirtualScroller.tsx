"use client";

import { useEditorStore } from "@/stores/editor-store";
import { PageContainer } from "./PageContainer";

interface VirtualScrollerProps {
    numPages: number;
}

export function VirtualScroller({ numPages }: VirtualScrollerProps) {
    const { document, editor } = useEditorStore();
    const { pages } = document;
    const scale = editor.viewport.scale;

    // In a real production app, we would use 'react-window' or 'react-virtualized' here
    // to only render pages currently in the viewport. 
    // For this MVP, we map all pages but they are lightweight until loaded.

    return (
        <div className="flex flex-col items-center py-8 bg-gray-100/50 w-full min-h-full overflow-y-auto">
            {pages.slice(0, numPages).map((page, index) => (
                <PageContainer
                    key={index}
                    page={page}
                    pageIndex={index}
                    scale={scale}
                />
            ))}
        </div>
    );
}
