const canvasSketch = require("canvas-sketch");
const { lerp } = require("canvas-sketch-util/math");
//lerp is fn for linear interpolation
// lerp(min,max,t)
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [2048, 2048],
};
//UV space --> between 0 and 1
const sketch = () => {
  const createGrid = () => {
    const points = [];
    const count = 40;

    for (var x = 0; x < count; x++) {
      for (var y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1); // count-1 --> u,v starts from 0 but not go till 1, but 0.8
        const v = count <= 1 ? 0.5 : y / (count - 1);
        points.push([u, v]);
      }
    }
    return points;
  };

  random.setSeed(777);

  const points = createGrid().filter(() => random.value() > 0.5);
  console.log(points);
  const margin = 250;

  return ({ context, width, height }) => {
    context.fillStyle = "yellow";
    context.fillRect(0, 0, width, height);

    points.forEach(([u, v]) => {
      //   const x = u * width;
      //   const y = v * height;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.beginPath();
      context.arc(x, y, 15, 0, 2 * Math.PI, false);
      context.fillStyle = "blue";
      context.strokeStyle = "purple";
      context.lineWidth = 25;
      context.stroke();
    });
  };
};

canvasSketch(sketch, settings);
