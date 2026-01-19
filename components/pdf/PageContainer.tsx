"use client";

import { useEffect, useRef, useState } from "react";
import { useEditorStore } from "@/stores/editor-store";
import type { PDFPageProxy } from "pdfjs-dist";
import dynamic from "next/dynamic";
import { useIntersectionObserver } from "@/lib/hooks/useIntersectionObserver";

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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderTaskRef = useRef<any>(null);

    // Bolt Optimization: Lazy Load Pages
    // We use a large rootMargin to start rendering pages before they come into view
    // so scrolling remains smooth.
    const isVisible = useIntersectionObserver(containerRef, {
        rootMargin: "200px"
    });

    const [hasLoaded, setHasLoaded] = useState(false);

    // Once visible, keep loaded
    useEffect(() => {
        if (isVisible && !hasLoaded) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setHasLoaded(true);
        }
    }, [isVisible, hasLoaded]);

    // Ensure dimensions are updated even if not rendered (fast operation)
    useEffect(() => {
        if (!page) return;
        const viewport = page.getViewport({ scale });
        updatePageDimensions(pageIndex, viewport.width, viewport.height);
    }, [page, scale, pageIndex, updatePageDimensions]);

    // Render PDF to canvas (Expensive)
    useEffect(() => {
        // Only render if we have decided to load this page
        if (!hasLoaded) return;

        const renderPdf = async () => {
            if (!page || !pdfCanvasRef.current) return;

            // Cancel active render task if exists
            if (renderTaskRef.current) {
                try {
                    renderTaskRef.current.cancel();
                } catch (_e) {
                    // Ignore cancellation errors
                }
            }

            const viewport = page.getViewport({ scale });
            const canvas = pdfCanvasRef.current;
            const context = canvas.getContext('2d');

            if (!context) return;

            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // Note: dimensions are also updated in the separate effect above,
            // but keeping it here doesn't hurt.
            // updatePageDimensions(pageIndex, viewport.width, viewport.height);

            const renderContext = {
                canvasContext: context,
                viewport: viewport,
                canvas: canvas
            };

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const renderTask = page.render(renderContext as any);
            renderTaskRef.current = renderTask;

            try {
                await renderTask.promise;
            } catch (error: unknown) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                if ((error as any).name === 'RenderingCancelledException') {
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
                } catch (_e) {
                    // Ignore
                }
            }
        };
    }, [page, scale, pageIndex, updatePageDimensions, hasLoaded]);

    // Calculate dimensions for container (always needed for scrollbar)
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
            {hasLoaded && (
                <>
                    {/* Layer 1: PDF Static Render */}
                    <canvas
                        ref={pdfCanvasRef}
                        className="absolute top-0 left-0 z-0 pointer-events-none"
                    />

                    {/* Layer 2: Fabric.js Interactive Layer */}
                    <div className="absolute inset-0 z-10">
                        <InteractionLayer pageIndex={pageIndex} />
                    </div>
                </>
            )}
        </div>
    );
}
