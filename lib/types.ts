export type ToolType = 'SELECT' | 'TEXT' | 'IMAGE' | 'DRAW';

export interface ViewportTransform {
    scale: number;
    offsetX: number;
    offsetY: number;
    rotation: 0 | 90 | 180 | 270;
}

export interface TextStyle {
    fontFamily: string;
    fontSize: number;
    fontWeight: string | number;
    fontStyle: 'normal' | 'italic';
    color: string;
    textAlign: 'left' | 'center' | 'right';
    textDecoration?: 'underline' | 'line-through' | 'none';
}

export interface BaseAnnotation {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    rotation: number;
    pageIndex: number;
}

export interface TextAnnotation extends BaseAnnotation {
    type: 'text';
    content: string;
    style: TextStyle;
}

export interface ImageAnnotation extends BaseAnnotation {
    type: 'image';
    src: string; // Base64 or Blob URL
    opacity: number;
    lockAspectRatio: boolean;
}

export type Annotation = TextAnnotation | ImageAnnotation;

export type EditorAction =
    | { type: 'ADD_OBJECT'; payload: Annotation; pageIndex: number }
    | { type: 'UPDATE_OBJECT'; payload: { id: string; changes: Partial<Annotation> }; pageIndex: number }
    | { type: 'DELETE_OBJECT'; payload: { id: string }; pageIndex: number }
    | { type: 'SET_PAGE_DIMENSIONS'; payload: { pageIndex: number; width: number; height: number } }
    | { type: 'SET_VIEWPORT'; payload: Partial<ViewportTransform> };
