import * as fabric from 'fabric';

export const addDemoRect = (canvas: fabric.Canvas) => {
    const rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: 'rgba(229, 50, 45, 0.5)', // Brand Red partial opacity
        width: 60,
        height: 60,
        stroke: '#E5322D',
        strokeWidth: 2,
        rx: 4,
        ry: 4,
    });
    canvas.add(rect);
};
