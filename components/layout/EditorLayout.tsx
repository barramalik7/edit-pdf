"use client";

import { useEditorStore } from "@/stores/editor-store";
import { GlobalHeader } from "./GlobalHeader";
import { UploadView } from "./UploadView";
import dynamic from "next/dynamic";

const Workspace = dynamic(
    () => import("./Workspace").then((mod) => mod.Workspace),
    { ssr: false }
);

const PageThumbnailsSidebar = dynamic(
    () => import("./PageThumbnailsSidebar").then((mod) => mod.PageThumbnailsSidebar),
    { ssr: false }
);

export function EditorLayout() {
    const { document } = useEditorStore();
    const hasFile = document.file !== null;

    return (
        <div className="h-screen w-screen flex flex-col bg-editor-bg overflow-hidden">
            <GlobalHeader />

            <div className="flex-1 flex overflow-hidden">
                {!hasFile ? (
                    <UploadView />
                ) : (
                    <>
                        <PageThumbnailsSidebar />
                        <Workspace />
                    </>
                )}
            </div>
        </div>
    );
}
