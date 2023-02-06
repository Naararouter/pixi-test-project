import * as PIXI from "pixi.js";

function frameUpscale(multiplier: number) {
  return ({ x, y, w, h }: any) => {
    return {
      x: x * multiplier,
      y: y * multiplier,
      w: w * multiplier,
      h: h * multiplier,
    };
  };
}
const frameUpscale4 = frameUpscale(2);

const data = {
  frames: {
    // move-forward
    "footman-move-forward-stand": {
      frame: frameUpscale4({ x: 20, y: 9, w: 35, h: 45 }),
    },
    "footman-move-forward-1": {
      frame: frameUpscale4({ x: 20, y: 69, w: 35, h: 45 }),
    },
    "footman-move-forward-2": {
      frame: frameUpscale4({ x: 20, y: 129, w: 35, h: 45 }),
    },
    "footman-move-forward-3": {
      frame: frameUpscale4({ x: 20, y: 179, w: 35, h: 45 }),
    },
    "footman-move-forward-4": {
      frame: frameUpscale4({ x: 20, y: 229, w: 35, h: 45 }),
    },
    // move-backward
    "footman-move-backward-stand": {
      frame: frameUpscale4({ x: 315, y: 9, w: 35, h: 50 }),
    },
    "footman-move-backward-1": {
      frame: frameUpscale4({ x: 315, y: 69, w: 35, h: 50 }),
    },
    "footman-move-backward-2": {
      frame: frameUpscale4({ x: 315, y: 125, w: 35, h: 50 }),
    },
    "footman-move-backward-3": {
      frame: frameUpscale4({ x: 315, y: 175, w: 35, h: 50 }),
    },
    "footman-move-backward-4": {
      frame: frameUpscale4({ x: 315, y: 225, w: 35, h: 50 }),
    },
  },
  meta: {
    image: "./assets/upscaled/footman.x2.png",
    format: "RGBA8888",
    scale: "1",
  },
  animations: {
    "footman-move-forward": [
      "footman-move-forward-stand",
      "footman-move-forward-1",
      "footman-move-forward-2",
      "footman-move-forward-stand",
      "footman-move-forward-3",
      "footman-move-forward-4",
    ],
    "footman-move-backward": [
      "footman-move-backward-stand",
      "footman-move-backward-1",
      "footman-move-backward-2",
      "footman-move-backward-stand",
      "footman-move-backward-3",
      "footman-move-backward-4",
    ],
    footmanDebug: ["footman-move-backward-stand"],
  },
};
// Create the SpriteSheet from data and image
export const footmanSpritesheet = new PIXI.Spritesheet(
  PIXI.BaseTexture.from(data.meta.image),
  data
);
