"use client";
// We must import the tools we want to use from the React library
import { useRef, useEffect } from "react"; 

export default function Home() {
  
  // 1. THE STICKY NOTE (useRef)
  // We create an empty sticky note called 'canvasRef'. It starts as "null" (empty).
  const canvasRef = useRef(null);

  // 2. THE TIMING ENGINE (useEffect)
  // React builds the HTML first. We cannot draw on the canvas until it exists on the screen.
  // useEffect tells React: "Wait until the screen is fully painted. THEN run this code inside."
  useEffect(() => {
    // We grab the actual HTML canvas using our sticky note (.current means "the current thing attached")
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Let's draw a simple test rectangle to prove the connection works
    ctx.fillStyle = "black";
    ctx.fillRect(50, 50, 100, 100);

  }, []); // <-- These empty brackets are crucial. They tell React: "Only run this code exactly ONCE when the page first loads."

  // 3. THE HTML UI
  return (
    <main className="w-screen h-screen bg-gray-200 flex items-center justify-center">
      {/* We create the canvas, and use ref={canvasRef} to slap our sticky note onto it */}
      <canvas 
        ref={canvasRef} 
        width={800} 
        height={600} 
        className="bg-white shadow-lg"
      ></canvas>
    </main>
  );
}