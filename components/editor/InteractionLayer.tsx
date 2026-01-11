"use client";

import { useEffect, useRef } from "react";
// import * as fabric from "fabric"; // REMOVED top-level import to fix SSR
import { useEditorStore } from "@/stores/editor-store";
import type { Canvas, Object as FabricObject, IText } from "fabric"; // Import TYPES only

interface InteractionLayerProps {
    pageIndex: number;
}

export function InteractionLayer({ pageIndex }: InteractionLayerProps) {
    const canvasEl = useRef<HTMLCanvasElement>(null);
    const canvasInstance = useRef<Canvas | null>(null);
    const { document, editor, selectObjects, addAnnotation, setTool } = useEditorStore();

    // Get dimension for this page from store
    const dimensions = document.pageDimensions[pageIndex];
    const annotations = document.annotations[pageIndex] || [];
    const activeTool = editor.activeTool;

    // Use a ref to track if we are currently syncing to avoid loops
    const isSyncing = useRef(false);

    // Initialize Canvas
    useEffect(() => {
        if (!canvasEl.current || !dimensions) return;

        let fabricModule: any;

        const initCanvas = async () => {
            // Dynamic import to prevent SSR crash (DOMMatrix error)
            const fabric = await import("fabric");
            fabricModule = fabric;

            if (canvasInstance.current) {
                canvasInstance.current.dispose();
            }

            const canvas = new fabric.Canvas(canvasEl.current!, {
                height: dimensions.height,
                width: dimensions.width,
                selection: true,
                preserveObjectStacking: true,
            });

            canvasInstance.current = canvas;

            // Event Listeners
            canvas.on('selection:created', (e) => {
                if (isSyncing.current) return;
                const selected = e.selected || [];
                selectObjects(selected.map((obj) => (obj as any).id).filter(Boolean));
            });

            canvas.on('selection:cleared', () => {
                if (isSyncing.current) return;
                selectObjects([]);
            });

            canvas.on('mouse:down', (e) => {
                if (!canvas || activeTool === 'SELECT') return;

                // Fabric v6 provides scenePoint directly in the event
                const pointer = e.scenePoint;
                const id = crypto.randomUUID();

                if (activeTool === 'TEXT') {
                    addAnnotation(pageIndex, {
                        id,
                        type: 'text',
                        x: pointer.x,
                        y: pointer.y,
                        width: 100,
                        height: 20,
                        rotation: 0,
                        pageIndex,
                        content: 'Double click to edit',
                        style: {
                            fontFamily: 'Inter',
                            fontSize: 16,
                            fontWeight: 'normal',
                            fontStyle: 'normal',
                            color: '#000000',
                            textAlign: 'left',
                        }
                    });
                    setTool('SELECT'); // Switch back to select after adding
                }
            });
        };

        initCanvas();

        // Cleanup
        return () => {
            if (canvasInstance.current) {
                canvasInstance.current.dispose();
                canvasInstance.current = null;
            }
        };
    }, [dimensions]); // Re-init only if dimensions change (not on tool change)

    // Sync Annotations -> Canvas
    useEffect(() => {
        const canvas = canvasInstance.current;
        if (!canvas) return;

        const syncAnnotations = async () => {
            // We need fabric module for creating objects (new fabric.IText)
            // Since we can't easily access the scope from previous useEffect, we might need to rely on
            // the fact that fabric classes are available on the instance or re-import?
            // Re-importing is cached so perfectly fine.
            const fabric = await import("fabric");

            isSyncing.current = true;

            // Remove objects that are no longer in store
            const existingIds = new Set(annotations.map(a => a.id));
            const objectsToRemove: FabricObject[] = [];
            canvas.forEachObject((obj) => {
                if ((obj as any).id && !existingIds.has((obj as any).id)) {
                    objectsToRemove.push(obj);
                }
            });
            objectsToRemove.forEach(obj => canvas.remove(obj));

            // Add/Update objects
            annotations.forEach(annotation => {
                let obj = canvas.getObjects().find((o) => (o as any).id === annotation.id);

                if (!obj) {
                    // Create new object
                    if (annotation.type === 'text') {
                        obj = new fabric.IText(annotation.content, {
                            left: annotation.x,
                            top: annotation.y,
                            width: annotation.width,
                            fontSize: annotation.style.fontSize,
                            fontFamily: annotation.style.fontFamily,
                            fill: annotation.style.color,
                            // ... other props
                        });
                    }
                    // ... Image logic

                    if (obj) {
                        (obj as any).id = annotation.id;
                        canvas.add(obj);
                    }
                } else {
                    // Update existing (simplified)
                    if (annotation.type === 'text' && obj instanceof fabric.IText) {
                        if (obj.text !== annotation.content) obj.set('text', annotation.content);
                        if (obj.fill !== annotation.style.color) obj.set('fill', annotation.style.color);
                        // ... etc
                        obj.setCoords();
                    }
                }
            });

            canvas.requestRenderAll();
            isSyncing.current = false;
        };

        syncAnnotations();
    }, [annotations]);


    // React to Tool Changes (Cursor & Selection)
    useEffect(() => {
        const canvas = canvasInstance.current;
        if (!canvas) return;

        if (activeTool === 'SELECT') {
            canvas.selection = true;
            canvas.defaultCursor = 'default';
            canvas.forEachObject((obj) => {
                obj.selectable = true;
            });
        } else {
            canvas.selection = false;
            canvas.defaultCursor = 'crosshair';
            canvas.discardActiveObject();
            canvas.forEachObject((obj) => {
                obj.selectable = false;
            });
            canvas.requestRenderAll();
        }
    }, [activeTool]);

    if (!dimensions) return null;

    return (
        <canvas ref={canvasEl} />
    );
}
