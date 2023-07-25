import { useRef, useState } from 'react';
import './Controller.scss';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
const COLORS = [
  '#ff0000',
  '#ff8c00',
  '#ffff00',
  '#008000',
  '#0000ff',
  '#4b0082',
  '#800080',
  '#ffffff',
  '#000000',
];

const Controller = ({ ctx, canvasRef }) => {
  const [isFilling, setisFilling] = useState(false);
  const colorRef = useRef();
  const fileRef = useRef();

  const handleChangeLineWidth = (event) => {
    ctx.lineWidth = event.target.value;
  };

  const handleChangeColor = (event) => {
    ctx.strokeStyle = event.target.value || event.target.id;
    if (isFilling) {
      ctx.fillStyle = event.target.value || event.target.id;
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
    if (!event.target.value) colorRef.current.value = event.target.id;
  };

  const handleButtonMode = () => {
    setisFilling((prevMode) => !prevMode);
  };

  const handleButtonClear = () => {
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#000000';
    colorRef.current.value = '#000000';
    fileRef.current.value = null;
    isFilling && setisFilling((prev) => !prev);
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  };

  const handleButtonErase = () => {
    const canvasColor = ctx.fillStyle;
    ctx.strokeStyle = canvasColor;
    colorRef.current.value = canvasColor;
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
        <input type="color" ref={colorRef} onChange={handleChangeColor} />
        <button onClick={handleButtonMode}>{isFilling ? '배경' : '펜'}</button>
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
          <a href={canvasRef.current.toDataURL()} download="myDrawing.jpg">
            <button>이미지 저장</button>
          </a>
        )}
      </div>
      <ul className="color-container">
        {COLORS.map((color) => (
          <li
            className="color-option"
            key={color}
            id={color}
            style={{ backgroundColor: color }}
            onClick={handleChangeColor}
          ></li>
        ))}
      </ul>
    </div>
  );
};

export default Controller;
