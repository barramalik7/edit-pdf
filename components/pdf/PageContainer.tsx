"use client";

import { useEffect, useRef } from "react";
import { useEditorStore } from "@/stores/editor-store";
import type { PDFPageProxy } from "pdfjs-dist";
import dynamic from "next/dynamic";

const InteractionLayer = dynamic(
    () => import("@/components/editor/InteractionLayer").then((mod) => mod.InteractionLayer),
    { ssr: false }
);

interface PageContainerProps {
    page: PDFPageProxy;
    pageIndex: number;
    scale: number;
}

export function PageContainer({ page, pageIndex, scale }: PageContainerProps) {
    const { updatePageDimensions } = useEditorStore();
    const containerRef = useRef<HTMLDivElement>(null);
    const pdfCanvasRef = useRef<HTMLCanvasElement>(null);

    const renderTaskRef = useRef<any>(null);

    // Render PDF to canvas
    useEffect(() => {
        const renderPdf = async () => {
            if (!page || !pdfCanvasRef.current) return;

            // Cancel active render task if exists
            if (renderTaskRef.current) {
                try {
                    renderTaskRef.current.cancel();
                } catch (e) {
                    // Ignore cancellation errors
                }
            }

            const viewport = page.getViewport({ scale });
            const canvas = pdfCanvasRef.current;
            const context = canvas.getContext('2d');

            if (!context) return;

            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // Store dimensions in Zustand
            updatePageDimensions(pageIndex, viewport.width, viewport.height);

            const renderContext = {
                canvasContext: context,
                viewport: viewport,
                canvas: canvas
            };

            const renderTask = page.render(renderContext as any);
            renderTaskRef.current = renderTask;

            try {
                await renderTask.promise;
            } catch (error: any) {
                if (error.name === 'RenderingCancelledException') {
                    // Ignore cancelled renders
                    return;
                }
                console.error("Page render error:", error);
            }
        };

        renderPdf();

        return () => {
            if (renderTaskRef.current) {
                try {
                    renderTaskRef.current.cancel();
                } catch (e) {
                    // Ignore
                }
            }
        };
    }, [page, scale, pageIndex, updatePageDimensions]);

    // Calculate dimensions for container
    const viewport = page.getViewport({ scale });

    return (
        <div
            ref={containerRef}
            className="relative bg-white shadow-card mb-8 mx-auto"
            style={{
                width: viewport.width,
                height: viewport.height
            }}
        >
            {/* Layer 1: PDF Static Render */}
            <canvas
                ref={pdfCanvasRef}
                className="absolute top-0 left-0 z-0 pointer-events-none"
            />

            {/* Layer 2: Fabric.js Interactive Layer */}
            <div className="absolute inset-0 z-10">
                <InteractionLayer pageIndex={pageIndex} />
            </div>
        </div>
    );
}
