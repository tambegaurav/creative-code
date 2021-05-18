const canvasSketch = require("canvas-sketch");
const { lerp } = require("canvas-sketch-util/math");
//lerp is fn for linear interpolation
// lerp(min,max,t)
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes");

const settings = {
  dimensions: [2048, 2048],
};
//UV space --> between 0 and 1
const sketch = () => {
  const colorCount = random.rangeFloor(1, 6);
  const palette = random.pick(palettes).slice(0, colorCount);

  console.log(palette);
  const createGrid = () => {
    const points = [];
    const count = 20;

    for (var x = 0; x < count; x++) {
      for (var y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1); // count-1 --> u,v starts from 0 but not go till 1, but 0.8
        const v = count <= 1 ? 0.5 : y / (count - 1);
        points.push({
          radius: Math.abs(0.015 + random.gaussian() * 0.015),
          positions: [u, v],
          color: random.pick(palette),
        });
      }
    }
    return points;
  };

  random.setSeed(72);

  const points = createGrid().filter(() => random.value() > 0.55);
  console.log(points);
  const margin = 250;

  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    points.forEach((data) => {
      //   const x = u * width;
      //   const y = v * height;
      const { radius, positions, color } = data;

      const [u, v] = positions;

      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.beginPath();
      context.arc(x, y, radius * width, 0, 2 * Math.PI, false);
      context.fillStyle = color;
      context.fill();
    });
  };
};

canvasSketch(sketch, settings);
