// 1. Tell JavaScript to find the canvas element in our HTML
const canvas = document.getElementById("myCanvas");

// 2. Tell JavaScript we want to draw in 2D
const ctx = canvas.getContext("2d");
//defines array so that we can put unlimited box
let shapes = [
    {
        x : 100,
        y : 100,
        width : 200,
        height : 150,
        color : "blue"
    },
    {
        x : 500,
        y : 100,
        width : 200,
        height : 150,
        color : "red"
    }
]

function draw() {
    // 1. Erase the canvas ONCE before we start drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. Loop through the array
    for (let i = 0; i < shapes.length; i++) {
        
        // Grab the current object we are looking at in the list
        let currentShape = shapes[i]; 

        ctx.fillStyle = currentShape.color; 
        ctx.fillRect(currentShape.x, currentShape.y, currentShape.width, currentShape.height);
    }
}
// Call it once so the boxes appear when the page loads
draw();


let isDragging = false;
let selectedShape = ""; // This will hold "blue" or "red"
let dragOffsetX = 0;
let dragOffsetY = 0;


//click movement by event listner

selectedShape = null; 

canvas.addEventListener("mousedown", function(event) {
    let mouseX = event.offsetX;
    let mouseY = event.offsetY;

    // Loop through our database of shapes to see if we clicked any of them
    for (let i = 0; i < shapes.length; i++) {
        let currentShape = shapes[i];

        // Inside your mousedown event's for-loop...
if (mouseX > currentShape.x && mouseX < currentShape.x + currentShape.width && mouseY > currentShape.y && mouseY < currentShape.y + currentShape.height) {
    
    isDragging = true;
    selectedShape = currentShape; 
    
    dragOffsetX = mouseX - currentShape.x;
    dragOffsetY = mouseY - currentShape.y;

    shapes.splice(i, 1); 

    shapes.push(currentShape);
}
    }
});

// mouse drag
canvas.addEventListener("mousemove", function(event) {
    if (isDragging === true) {
        
        let mouseX = event.offsetX;
        let mouseY = event.offsetY;

        selectedShape.x = mouseX - dragOffsetX;
        selectedShape.y = mouseY - dragOffsetY;

        // Instantly trigger the flipbook to redraw
        draw(); 
    }
});

// 2. MOUSE UP: Stop the drag action
canvas.addEventListener("mouseup", function(event) {
    isDragging = false;
    selectedShape = ""; // Clear the memory of which shape was held
});



// button for box
const addBtn = document.getElementById("addBoxBtn");
addBtn.addEventListener("click",function(){
    let newBox = {
        x: Math.random() * 600,
        y: Math.random() * 600,
        width: 200,
        height: 150,
        color: "green"
    };
    shapes.push(newBox);
    draw();
}
)