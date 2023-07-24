import { useRef, useState } from 'react';
import './Controller.scss';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

const Controller = ({ ctx, canvasRef }) => {
    const [isFilling, setisFilling] = useState(false);
    const colorRef = useRef();
    const fileRef = useRef();

    const handleChangeLineWidth = (event) => {
        ctx.lineWidth = event.target.value;
    };

    const handleChangeColor = (event) => {
        ctx.strokeStyle = event.target.value || event.target.id;
        ctx.fillStyle = event.target.value || event.target.id;
        isFilling && ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        if (!event.target.value) colorRef.current.value = event.target.id;
    };

    const handleButtonMode = () => {
        setisFilling((prevMode) => !prevMode);
    };

    const handleButtonClear = () => {
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        colorRef.current.value = 'black';
        fileRef.current.value = null;
        !isFilling && setisFilling((prev) => !prev);
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    };

    const handleButtonErase = () => {
        ctx.strokeStyle = 'white';
        colorRef.current.value = 'white';
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        const image = new Image();
        image.src = url;
        image.onload = () => {
            ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        };
    };

    return (
        <div className="controller-container">
            <div className="controller-items">
                <input
                    type="range"
                    min={0}
                    max={10}
                    step={0.1}
                    defaultValue={5}
                    onChange={handleChangeLineWidth}
                />
                <input
                    type="color"
                    ref={colorRef}
                    onChange={handleChangeColor}
                />
                <button onClick={handleButtonMode}>
                    {isFilling ? '배경' : '펜'}
                </button>
                <button onClick={handleButtonClear}>초기화</button>
                <button onClick={handleButtonErase}>지우개</button>
                <label htmlFor="file" id="file">
                    이미지 선택
                    <input
                        id="file"
                        type="file"
                        accept="image/*"
                        ref={fileRef}
                        onChange={handleFileChange}
                    />
                </label>
                {canvasRef.current && (
                    <a
                        href={canvasRef.current.toDataURL()}
                        download="myDrawing.jpg"
                    >
                        <button>이미지 저장</button>
                    </a>
                )}
            </div>
            <div className="color-container">
                <div
                    className="color-option"
                    id="#ff0000"
                    style={{ backgroundColor: '#ff0000' }}
                    onClick={handleChangeColor}
                ></div>
                <div
                    className="color-option"
                    id="#ff8c00"
                    style={{ backgroundColor: '#ff8c00' }}
                    onClick={handleChangeColor}
                ></div>
                <div
                    className="color-option"
                    id="#ffff00"
                    style={{ backgroundColor: '#ffff00' }}
                    onClick={handleChangeColor}
                ></div>
                <div
                    className="color-option"
                    id="#008000"
                    style={{ backgroundColor: '#008000' }}
                    onClick={handleChangeColor}
                ></div>
                <div
                    className="color-option"
                    id="#0000ff"
                    style={{ backgroundColor: '#0000ff' }}
                    onClick={handleChangeColor}
                ></div>
                <div
                    className="color-option"
                    id="#4b0082"
                    style={{ backgroundColor: '#4b0082' }}
                    onClick={handleChangeColor}
                ></div>
                <div
                    className="color-option"
                    id="#800080"
                    style={{ backgroundColor: '#800080' }}
                    onClick={handleChangeColor}
                ></div>
                <div
                    className="color-option"
                    id="#ffffff"
                    style={{ backgroundColor: '#ffffff' }}
                    onClick={handleChangeColor}
                ></div>
                <div
                    className="color-option"
                    id="#000000"
                    style={{ backgroundColor: '#000000' }}
                    onClick={handleChangeColor}
                ></div>
            </div>
        </div>
    );
};

export default Controller;
