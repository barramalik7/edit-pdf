"use client";

import { useEditorStore } from "@/stores/editor-store";
import { GlobalHeader } from "./GlobalHeader";
import { PropertySidebar } from "./PropertySidebar";
import { FloatingToolbar } from "../editor/FloatingToolbar";
import { UploadView } from "./UploadView";
import dynamic from "next/dynamic";

const Workspace = dynamic(() => import("./Workspace").then(mod => mod.Workspace), { ssr: false });

export function EditorLayout() {
    const { document, editor } = useEditorStore();
    const hasFile = document.file !== null;

    return (
        <div className="h-screen w-screen flex flex-col bg-background overflow-hidden text-text-primary">
            <GlobalHeader />

            <div className="flex-1 flex overflow-hidden">
                {!hasFile ? (
                    <UploadView />
                ) : (
                    <>
                        <FloatingToolbar />
                        <Workspace />
                        <PropertySidebar />
                    </>
                )}
            </div>
        </div>
    );
}
