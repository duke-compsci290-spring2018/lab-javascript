/*
 * A simple example of transforming an uploaded image pixel by pixel.
 *
 * Author: Robert C. Duvall
 */

// load an image using an file chooser input element and draw it using SimpleImage class
function loadImage() {
    var file = document.getElementById('input');
    originalImage = new SimpleImage(file);
    originalImage.drawTo(canvas);
}


// verify that the image is ready to be solarized before calling the main function
function solarize() {
    // check that the image is loaded
    if (originalImage == null  || ! originalImage.complete()) {
        alert('Image not loaded');
    }
    else {
        // make sure that the image size matches the canvas size
        originalImage.setSize(canvas.width, canvas.height);
        // choose the threshold dynamically
        var threshold = document.getElementById('threshold').value;
        solarizeImage(threshold).drawTo(canvas);
    }
}

// solarize an entire image by solarizing each pixel
// this function creates a new image that is always based on the original image
// so that changing the threshold does not have a cumultive effect
function solarizeImage(threshold) {
    var result = new SimpleImage(canvas.width, canvas.height);
    result.pixels().forEach(function(pixel) {
        var originalPixel = originalImage.getPixel(pixel.getX(), pixel.getY());
        pixel.setRed(solarizeValue(originalPixel.getRed(), threshold));
        pixel.setGreen(solarizeValue(originalPixel.getGreen(), threshold));
        pixel.setBlue(solarizeValue(originalPixel.getBlue(), threshold));
    });
    return result;
}

// solarize a single value (red, green, or blue)
function solarizeValue(value, threshold) {
    if (value < threshold) {
        return 255 - value;
    }
    else {
        return value;
    }
}


// set global variables to be used in this script
var originalImage = null;
var canvas = document.getElementById('canvas');

// connect specific events to functions that will respond
document.getElementById('input').addEventListener('change', loadImage, false);
document.getElementById('threshold').addEventListener('input', solarize, false);
