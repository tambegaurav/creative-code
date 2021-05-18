const canvasSketch = require("canvas-sketch");

const settings = {
  //prefer square dimension to create gen art ; also good for instagram size
  // dimensions: [2048, 2048],
  // dimensions: "A4",
  units: "cm",
  // units: "in", "cm", "m", "ft", "px"
  pixelsPerInch: 300,
  orientation: "landscape",
  dimensions: [16, 10],
  // orientation: "potrait",
};

const sketch = () => {
  return ({ context, width, height }) => {
    // console.log(width, height);
    context.fillStyle = "#c4a4db";
    context.fillRect(0, 0, width, height);

    // context.fillStyle = "#a4d4bb";
    // context.fillRect(512, 512, width / 2, height / 2);

    context.beginPath();
    context.arc(width / 2, height * 0.5, width * 0.3, 0, 2 * Math.PI, false);
    context.fillStyle = "white";
    context.fill();
    context.lineWidth = width * 0.02;
    context.stroke();

    context.beginPath();

    context.arc(width / 2, height * 1, width * 0.3, 0, 2 * Math.PI, false);
    context.fillStyle = "white";
    context.fill();
    context.lineWidth = width * 0.02;
    context.stroke();
  };
};

canvasSketch(sketch, settings);
