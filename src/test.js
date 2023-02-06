// Create the application helper and add its render target to the page
let app = new PIXI.Application({
  width: 640,
  height: 560,
  backgroundColor: "white",
});
document.body.appendChild(app.view);
window.app = app;

// Create the sprite and add it to the stage
// let sprite = PIXI.Sprite.from('sample.png');
// app.stage.addChild(sprite);
//
// // Add a ticker callback to move the sprite back and forth
// let elapsed = 0.0;
// app.ticker.add((delta) => {
//   elapsed += delta;
//   sprite.x = 100.0 + Math.cos(elapsed/50.0) * 100.0;
// });
// Create object to store sprite sheet data
function frameUpscale(multiplier) {
  return ({ x, y, w, h }) => {
    return {
      x: x * multiplier,
      y: y * multiplier,
      w: w * multiplier,
      h: h * multiplier,
    };
  };
}
const frameUpscale4 = frameUpscale(4);

const atlasData = {
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
    //"app": "https://www.codeandweb.com/texturepacker",
    //"version": "1.0",
    image: "./assets/upscaled/footman.png",
    format: "RGBA8888",
    //"size": {"w":370,"h":624},
    scale: "1",
    //"smartupdate": "$TexturePacker:SmartUpdate:96b21bdd82ef49dc55d175396ee28179:5fcc442c4ebbdc51c09fd66d850381c3:e72d2f628da928f74a19bbb2c6a00ca9$"
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
    footmanDebug: ["footman-move-backward-4"],
  },
};
// Create the SpriteSheet from data and image
const spritesheet = new PIXI.Spritesheet(
  PIXI.BaseTexture.from(atlasData.meta.image),
  atlasData
);

// Generate all the Textures asynchronously
const res = await spritesheet.parse();
// spritesheet is ready to use!
//const sprite = new PIXI.Sprite(spritesheet.textures["footman-stand"]);

// Set the position and size of the sprite
//sprite.x = 100;
//sprite.y = 100;
//sprite.width = 100;
//sprite.height = 100;

// Add the sprite to the stage
//app.stage.addChild(sprite);
const anim = new PIXI.AnimatedSprite(
  spritesheet.animations["footman-move-forward"]
);
anim.play();
//const anim = new PIXI.AnimatedSprite(spritesheet.animations.footmanDebug);
anim.y = 400;
anim.height = 50 * 1.7;
anim.width = 35 * 1.7;
anim.x = 100;

// set the animation speed
anim.animationSpeed = 0.16666;

// play the animation on a loop

// add it to the stage to render
app.stage.addChild(anim);

let forward = true;
app.ticker.add((delta) => {
  if (anim.y <= 0) {
    anim.textures = spritesheet.animations["footman-move-backward"];
    anim.play();
    forward = false;
  }
  if (anim.y >= 500) {
    anim.textures = spritesheet.animations["footman-move-forward"];
    anim.play();
    forward = true;
  }

  anim.y -= forward ? 1 : -1;
});
