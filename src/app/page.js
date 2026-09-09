"use client";
import { useRef, useState, useEffect } from "react"; 

let isDragging = false;
let selectedShape = null; 
let dragOffsetX = 0;
let dragOffsetY = 0;

export default function Home() {
  const canvasRef = useRef(null);
  const buttonRef = useRef(null);

  const [shapes, setShapes] = useState([
    { id: 101, x: 100, y: 100, width: 200, height: 150, color: "blue", name: "Blue Box" },
    { id: 202, x: 500, y: 100, width: 200, height: 150, color: "red", name: "Red Box" }
  ]);
  const [selectedId, setSelectedId] = useState(null);

  const activeShape = shapes.find((s) => s.id === selectedId);

  // ALL HANDLERS AND LOGIC LIVE INSIDE HOME()
  const handleColorChange = (newColor) => {
      if (!selectedId) return;

      setShapes((prevShapes) => {
          return prevShapes.map((shape) => {
              if (shape.id === selectedId) {
                  return { ...shape, color: newColor };
              }
              return shape;
          });
      });
  };

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

    const handleMouseDown = (event) => {
        let mouseX = event.offsetX;
        let mouseY = event.offsetY;

        setShapes((prevShapes) => {
            let targetShape = null;

            for (let i = 0; i < prevShapes.length; i++) {
                let currentShape = prevShapes[i];
                if (mouseX > currentShape.x && mouseX < currentShape.x + currentShape.width && mouseY > currentShape.y && mouseY < currentShape.y + currentShape.height) {
                    targetShape = currentShape;
                }
            }

            if (targetShape) {
                isDragging = true;
                selectedShape = targetShape; 
                dragOffsetX = mouseX - targetShape.x;
                dragOffsetY = mouseY - targetShape.y;
                
                setSelectedId(targetShape.id);

                let filtered = prevShapes.filter((s) => s.id !== targetShape.id);
                return [...filtered, targetShape];
            }

            return prevShapes;
        });
    };

    const handleMouseMove = (event) => {
        if (isDragging === true && selectedShape) {
            let mouseX = event.offsetX;
            let mouseY = event.offsetY;
            selectedShape.x = mouseX - dragOffsetX;
            selectedShape.y = mouseY - dragOffsetY;
            draw(); 
        }
    };

    const handleMouseUp = () => {
        if (isDragging) {
            setShapes([...shapes]);
        }
        isDragging = false;
        selectedShape = null; 
    };

    const handleAddClick = () => {
        let newBox = {
            id: Date.now(),
            x: Math.random() * 600,
            y: Math.random() * 450,
            width: 200,
            height: 150,
            color: "grey",
            name: "Green Box"
        };
        setShapes((prevShapes) => {
            return [...prevShapes, newBox];
        });
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    addBtn.addEventListener("click", handleAddClick);

    return () => {
        canvas.removeEventListener("mousedown", handleMouseDown);
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseup", handleMouseUp);
        addBtn.removeEventListener("click", handleAddClick);
    };

  }, [shapes]); 

  return (
    <main className="w-screen h-screen flex flex-col bg-gray-100 overflow-hidden select-none">
      
      {/* 1. TOP TOOLBAR */}
      <header className="h-14 bg-white border-b border-gray-300 flex items-center justify-between px-4 z-10">
        <div className="flex items-center gap-3">
          <span className="font-bold text-blue-600 tracking-wider">FIGMA CLONE</span>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Project Phase 2 Complete</span>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            ref={buttonRef} 
            className="px-4 py-1.5 bg-blue-600 text-white text-sm font-semibold rounded shadow-sm hover:bg-blue-700 active:scale-95 transition-all"
          >
            + Add Box
          </button>
        </div>
      </header>

      {/* 2. MIDDLE CONTENT AREA */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT SIDEBAR: Layers Panel */}
        <aside className="w-64 bg-white border-r border-gray-300 flex flex-col">
          <div className="p-3 border-b border-gray-200 font-semibold text-xs text-gray-500 uppercase tracking-wider">
            Layers
          </div>
          <div className="p-3 text-sm text-gray-600 space-y-1">
            {shapes.map((shape, index) => (
              <div key={shape.id || index} className="py-1 px-2 rounded hover:bg-gray-100 flex items-center gap-2 cursor-pointer font-medium">
                <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: shape.color }}></span>
                <span>{shape.name || `Box ${index + 1}`}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* CENTER WORKSPACE: The Canvas */}
        <div className="flex-1 bg-gray-100 flex items-center justify-center p-6 overflow-auto">
          <canvas 
            ref={canvasRef} 
            width={800} 
            height={600} 
            className="bg-white shadow-xl rounded border border-gray-300"
          ></canvas>
        </div>

        {/* RIGHT SIDEBAR: Properties Panel */}
        <aside className="w-64 bg-white border-l border-gray-300 flex flex-col">
          <div className="p-3 border-b border-gray-200 font-semibold text-xs text-gray-500 uppercase tracking-wider">
            Properties
          </div>
          <div className="p-4 text-sm text-gray-500 space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Position X & Y</label>
              <div className="grid grid-cols-2 gap-2">
                <input 
                  type="text" 
                  disabled 
                  value={activeShape ? `X: ${Math.round(activeShape.x)}` : "X: --"} 
                  className="bg-gray-50 border border-gray-200 p-1.5 rounded text-xs text-center font-mono" 
                />
                <input 
                  type="text" 
                  disabled 
                  value={activeShape ? `Y: ${Math.round(activeShape.y)}` : "Y: --"} 
                  className="bg-gray-50 border border-gray-200 p-1.5 rounded text-xs text-center font-mono" 
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Color Theme</label>
              <div className="flex gap-2">
                <div onClick={() => handleColorChange("blue")} className="w-6 h-6 rounded-full bg-blue-500 cursor-pointer border-2 border-transparent hover:border-black"></div>
                <div onClick={() => handleColorChange("red")} className="w-6 h-6 rounded-full bg-red-500 cursor-pointer border-2 border-transparent hover:border-black"></div>
                <div onClick={() => handleColorChange("green")} className="w-6 h-6 rounded-full bg-green-500 cursor-pointer border-2 border-transparent hover:border-black"></div>
                <div onClick={() => handleColorChange("pink")} className="w-6 h-6 rounded-full bg-pink-300 cursor-pointer border-2 border-transparent hover:border-black"></div>
              </div>
            </div>
          </div>
        </aside>

      </div>
    </main>
  );
}