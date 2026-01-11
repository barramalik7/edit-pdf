"use client";

import { useMergeStore } from "@/stores/merge-store";
import { UploadView } from "../layout/UploadView";
import { MergeReorderView } from "./MergeReorderView";

export function MergeLayout() {
    const { files, addFiles } = useMergeStore();

    const handleFilesSelected = (newFiles: File[]) => {
        addFiles(newFiles);
    };

    if (files.length === 0) {
        return (
            <div className="min-h-screen pt-20 bg-background flex flex-col">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-text-primary mb-4">Merge PDF Files</h1>
                    <p className="text-text-secondary text-lg">
                        Combine multiple PDFs into one unified document.
                    </p>
                </div>
                <UploadView
                    allowMultiple={true}
                    onFilesSelected={handleFilesSelected}
                />
            </div>
        );
    }

    return <MergeReorderView />;
}
