// 1. Tell JavaScript to find the canvas element in our HTML
const canvas = document.getElementById("myCanvas");

// 2. Tell JavaScript we want to draw in 2D
const ctx = canvas.getContext("2d");
let shapes = [
    {
        bx : 100,
        by : 100,
        bwidth : 200,
        bheight : 150,
        bcolor : "blue"
    },
    {
        rx : 500,
        ry : 100,
        rwidth : 200,
        rheight : 150,
        rcolor : "red"
    }
]

// THE RENDER LOOP
function draw() {
    // 1. Erase the entire canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. Draw Blue Box
    ctx.fillStyle = "blue";
    ctx.fillRect(bluex, bluey, bluewidth, blueheight);

    // 3. Draw Red Box
    ctx.fillStyle = "red";
    ctx.fillRect(redx, redy, redwidth, redheight);
}
// Call it once so the boxes appear when the page loads
draw();


let isDragging = false;
let selectedShape = ""; // This will hold "blue" or "red"
let dragOffsetX = 0;
let dragOffsetY = 0;


//click movement by event listner

canvas.addEventListener("mousedown", function(event) {
    let mouseX = event.offsetX;
    let mouseY = event.offsetY;

    if (mouseX > bluex && mouseX < bluex + bluewidth && mouseY > bluey && mouseY < bluey + blueheight) {
        isDragging = true;
        selectedShape = "blue";
        // Calculate where inside the box we clicked
        dragOffsetX = mouseX - bluex; 
        dragOffsetY = mouseY - bluey;
    } 
    else if (mouseX > redx && mouseX < redx + redwidth && mouseY > redy && mouseY < redy + redheight) {
        isDragging = true;
        selectedShape = "red";
        dragOffsetX = mouseX - redx;
        dragOffsetY = mouseY - redy;
    }
});

// 1. MOUSE MOVE: Update coordinates if we are dragging
canvas.addEventListener("mousemove", function(event) {
    // Only do the math if we are actually holding the mouse button down
    if (isDragging === true) {
        
        let mouseX = event.offsetX;
        let mouseY = event.offsetY;

        // If the blue box is selected, update its variables
        if (selectedShape === "blue") {
            bluex = mouseX - dragOffsetX;
            bluey = mouseY - dragOffsetY;
        } 
        // If the red box is selected, update its variables
        else if (selectedShape === "red") {
            redx = mouseX - dragOffsetX;
            redy = mouseY - dragOffsetY;
        }

        // Instantly trigger the flipbook to erase and redraw at the new position
        draw(); 
    }
});

// 2. MOUSE UP: Stop the drag action
canvas.addEventListener("mouseup", function(event) {
    isDragging = false;
    selectedShape = ""; // Clear the memory of which shape was held
});