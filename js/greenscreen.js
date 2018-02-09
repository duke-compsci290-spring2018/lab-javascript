/*
 * Add code here to create a composite of two images by replacing the green pixels in the foreground image.
 *
 * Author: YOUR NAME HERE
 */
// useful function to clear the contents of a given canvas
function clearCanvas(canvas) {
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
}

// load foreground and background images using an file chooser input element and draw it using SimpleImage class
function loadForeground() {
    var file = document.getElementById('fgInput');
    fgImage = new SimpleImage(file);
    fgImage.drawTo(fgCanvas);
}
function loadBackground() {
    var file = document.getElementById('bgInput');
    bgImage = new SimpleImage(file);
    bgImage.drawTo(bgCanvas);
}

// verify that both images are ready and are the same size before calling the main function
function greenScreen() {
    // check that the images are loaded
    if (fgImage == null  || ! fgImage.complete() || bgImage == null || ! bgImage.complete()) {
        alert('Image not loaded');
    }
    else {
        // ensure both images are the same size
        fgImage.setSize(fgCanvas.width, fgCanvas.height);
        bgImage.setSize(fgCanvas.width, fgCanvas.height);
        // choose the threshold dynamically
        var threshold = document.getElementById('threshold').value;
        greenScreenImage(threshold).drawTo(fgCanvas);
    }
}
function greenScreenImage(threshold) {
    var result = new SimpleImage(fgCanvas.width, fgCanvas.height);
    result.pixels().forEach(function(pixel) {
        var fgPixel = fgImage.getPixel(pixel.getX(), pixel.getY());
        var bgPixel = bgImage.getPixel(pixel.getX(), pixel.getY());
        if (fgPixel.getGreen() >= threshold) {
            pixel.setAllFrom(bgPixel);
        }
        else{
            pixel.setAllFrom(fgPixel);
        }
    });
    return result;
}


// global variables
var fgImage = null;
var bgImage = null;
var fgCanvas = document.getElementById('fgCanvas');
var bgCanvas = document.getElementById('bgCanvas');

// connect specific events to functions that will respond
document.getElementById('fgInput').addEventListener('change', loadForeground, false);
document.getElementById('bgInput').addEventListener('change', loadBackground, false);
document.getElementById('threshold').addEventListener('input', greenScreen, false);
document.getElementById('create').addEventListener('click', () => {
    greenScreen();
    clearCanvas(bgCanvas);
}, false);
document.getElementById('clear').addEventListener('click', () => {
    clearCanvas(fgCanvas);
    clearCanvas(bgCanvas);
}, false);
