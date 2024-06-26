/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

// Properti
const cellSize = 10;
const rowCells = 150;
const colCells = 150;

// Size canvas
canvas.width = colCells * cellSize;
canvas.height = rowCells * cellSize;

// Clear canvas
const clearCanvas = function() { ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.drawImage(image, 0, 0) }

// Background
var image = new Image();
image.src = "assets/background.png";
function setBackground() { image.onload = function() { ctx.drawImage(image, 0, 0); } }

// Event handler button
// tombol -> download data
function setLink() {
    var link = document.getElementById("btn-link");
    link.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
    link.setAttribute('download', 'data.png');
}

// tombol -> generate random map
function setRandomGenerate() {
    var randGen = document.getElementById("btn-generate");
    randGen.onclick = function() {
        console.clear();
        console.log("Generate");
        clearCanvas();
        algorithm();
        setLink();
    }
}

// Panggil fungsi
setBackground();
window.onload = () => {
    setRandomGenerate();
    algorithm();
    setLink();
}

