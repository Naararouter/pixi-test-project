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

// Generate all the Textures asynchronously
const res = await spritesheet.parse();
// spritesheet is ready to use!
//

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
anim.filters = [new ColorReplaceFilter(0x0428a0, 0xa00404, 0.25)];
window.anim = anim;
//anim.play();
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
app.ticker.add(delta => {
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

  //anim.y -= forward ? 1 : -1;
});
