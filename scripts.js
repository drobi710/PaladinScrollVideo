const html = document.documentElement;
const canvas = document.getElementById("paladinMovie"); // initializing canvas ad the canvas element with the id of paladinMovie in index.html
const context = canvas.getContext("2d"); // getContext() method returns a drawing context on the canvas ("2d", leading to the creation of a CanvasRenderingContext2D object representing a two-dimensional rendering context.)

const frameCount = 220; // frameCount is a system variable used to hold the number of frames which are displayed since the program started
const currentFrame = (index) => `dist/img/paladinJump${index.toString().padStart(4, "0")}.jpg`; // initializing the currentFrame a function that returns the file path with the number of the image file we want Since the image number is an integer, we’ll need to turn it in to a string and use padStart(4, '0') to prepend zeros in front of our index until we reach four digits to match our file names That gives us a way to handle image paths

// preloading the images that way, each frame is already downloaded, making the transitions much faster, and the animation smoother
const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

const img = new Image();
img.src = currentFrame(1);
canvas.width = 720;
canvas.height = 936;
img.onload = function () {
  context.drawImage(img, 0, 0);
};

const updateImage = (index) => {
  img.src = currentFrame(index);
  context.drawImage(img, 0, 0);
}; // update the image, pass the frameIndex into the function. That sets the image source with the next image in the sequence, which is drawn on the <canvas> element


// To know which number we need to pass (and thus which image to load)  in the sequence, we need to calculate the user’s scroll progress, make an event listener to track that and handle some math to calculate which image to load
window.addEventListener("scroll", () => {
  const scrollTop = html.scrollTop; // use scrollTop to get the vertical scroll position of the element (top of the document) that serves as the starting point value
  const maxScrollTop = html.scrollHeight - window.innerHeight; // get the end (or maximum) value by subtracting the window height from the document scroll height
  const scrollFraction = scrollTop / maxScrollTop; //  divide the scrollTop value by the maximum value the user can scroll down, which gives us the user’s scroll progress
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );

  requestAnimationFrame(() => updateImage(frameIndex)); // swap images as the user scrolls up or down the page
});

preloadImages();
