import { useEffect, useRef, useState } from 'react';
import './Canvas.scss';
import Controller from './Controller';

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;

const Canvas = () => {
    const canvasRef = useRef();
    const [ctx, setCtx] = useState();
    const [isPainting, setIsPainting] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
        const ctx = canvas.getContext('2d');
        ctx.lineCap = 'round';
        ctx.save();
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.restore();
        setCtx(ctx);
    }, []);

    const handleMouseMove = (event) => {
        const x = event.clientX - event.target.offsetLeft;
        const y = event.clientY - event.target.offsetTop;
        if (isPainting) {
            ctx.lineTo(x, y);
            ctx.stroke();
            return;
        }
        ctx.moveTo(x, y);
    };

    const handleMouseDown = () => {
        setIsPainting(true);
    };

    const handleMouseUpOrLeave = () => {
        setIsPainting(false);
        ctx.beginPath();
    };

    const handleDoubleClick = (event) => {
        const x = event.clientX - event.target.offsetLeft;
        const y = event.clientY - event.target.offsetTop;
        ctx.save();
        ctx.font = '20pt serif';
        ctx.strokeText('😛', x, y);
        ctx.restore();
    };

    return (
        <div className="canvas-container">
            <canvas
                ref={canvasRef}
                onMouseMove={handleMouseMove}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}
                onDoubleClick={handleDoubleClick}
            ></canvas>
            <Controller ctx={ctx} canvasRef={canvasRef} />
        </div>
    );
};

export default Canvas;
