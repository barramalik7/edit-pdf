import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface MergeState {
    files: File[];
    isMerging: boolean;

    // Actions
    addFiles: (newFiles: File[]) => void;
    removeFile: (index: number) => void;
    setFiles: (files: File[]) => void;
    reset: () => void;
}

export const useMergeStore = create<MergeState>()(
    immer((set) => ({
        files: [],
        isMerging: false,

        addFiles: (newFiles) =>
            set((state) => {
                // Prevent duplicates if needed, or allow them. 
                // For now, straightforward append.
                state.files.push(...newFiles);
            }),

        removeFile: (index) =>
            set((state) => {
                state.files.splice(index, 1);
            }),

        setFiles: (files) =>
            set((state) => {
                state.files = files;
            }),

        reset: () =>
            set((state) => {
                state.files = [];
                state.isMerging = false;
            }),
    }))
);
