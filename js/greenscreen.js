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

function greenScreen(threshold) {
    // given foreground and background images, make a new image of the canvas size

    // For each pixel in foreground image

        // if current pixel is green enough,

            // set output image's corresponding pixel to bgImage's pixel at same position

        // Otherwise,

            // set output image's corresponding pixel to current pixel

    // return resulting image
}
