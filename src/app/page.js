"use client";
import { useRef, useEffect } from "react"; 

let shapes = [
    { x: 100, y: 100, width: 200, height: 150, color: "blue" },
    { x: 500, y: 100, width: 200, height: 150, color: "red" }
];
let isDragging = false;
let selectedShape = null; 
let dragOffsetX = 0;
let dragOffsetY = 0;

export default function Home() {
  
  const canvasRef = useRef(null);
  const buttonRef = useRef(null); 

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const addBtn = buttonRef.current; 

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < shapes.length; i++) {
            let currentShape = shapes[i]; 
            ctx.fillStyle = currentShape.color; 
            ctx.fillRect(currentShape.x, currentShape.y, currentShape.width, currentShape.height);
        }
    }
    draw();

    // 1. Save our logic into named functions
    const handleMouseDown = (event) => {
        let mouseX = event.offsetX;
        let mouseY = event.offsetY;
        for (let i = 0; i < shapes.length; i++) {
            let currentShape = shapes[i];
            if (mouseX > currentShape.x && mouseX < currentShape.x + currentShape.width && mouseY > currentShape.y && mouseY < currentShape.y + currentShape.height) {
                isDragging = true;
                selectedShape = currentShape; 
                dragOffsetX = mouseX - currentShape.x;
                dragOffsetY = mouseY - currentShape.y;
                shapes.splice(i, 1); 
                shapes.push(currentShape);
            }
        }
    };

    const handleMouseMove = (event) => {
        if (isDragging === true) {
            let mouseX = event.offsetX;
            let mouseY = event.offsetY;
            selectedShape.x = mouseX - dragOffsetX;
            selectedShape.y = mouseY - dragOffsetY;
            draw(); 
        }
    };

    const handleMouseUp = () => {
        isDragging = false;
        selectedShape = null; 
    };

    const handleAddClick = () => {
        let newBox = {
            x: Math.random() * 600,
            y: Math.random() * 450,
            width: 200,
            height: 150,
            color: "green"
        };
        shapes.push(newBox);
        draw();
    };

    // 2. Attach the listeners
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    addBtn.addEventListener("click", handleAddClick);

    // 3. THE FIX: The Cleanup Function
    // React runs this to sweep up old listeners so they don't double-stack!
    return () => {
        canvas.removeEventListener("mousedown", handleMouseDown);
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseup", handleMouseUp);
        addBtn.removeEventListener("click", handleAddClick);
    };

  }, []); 

  return (
    <main className="w-screen h-screen bg-gray-200 flex flex-col items-center justify-center gap-4">
      <button 
        ref={buttonRef} 
        className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 active:scale-95 transition-all"
      >
        Add Box
      </button>
      <canvas 
        ref={canvasRef} 
        width={800} 
        height={600} 
        className="bg-white shadow-lg rounded-md"
      ></canvas>
    </main>
  );
}
