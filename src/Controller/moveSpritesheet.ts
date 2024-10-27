import {
  Spritesheet,
  Texture,
  Assets,
  AnimatedSprite,
  Container,
  Ticker,
} from "pixi.js";

const basicSize = { w: 200, h: 200 };

const data = {
  frames: {
    "frame-0": {
      frame: { ...basicSize, x: 0, y: 0 },
    },
    "frame-1": {
      frame: { ...basicSize, x: 200, y: 0 },
    },
    "frame-2": {
      frame: { ...basicSize, x: 400, y: 0 },
    },
  },
  meta: {
    image: `./assets/cursor/move.png`,
    format: "RGBA8888",
    scale: "1",
  },
  animations: {
    moveIn: ["frame-0", "frame-1", "frame-2"],
    moveOut: ["frame-2", "frame-1", "frame-0"],
  },
};

export let moveSpritesheet: Spritesheet;

export const loadMoveSpritesheet = async (stage: Container) => {
  await Assets.load(data.meta.image);
  const texture = Texture.from(data.meta.image);

  moveSpritesheet = new Spritesheet(texture, data);
  moveSpritesheet.parse();

  const moveInAnimation = new AnimatedSprite(
    moveSpritesheet.animations["moveIn"]
  );
  const moveOutAnimation = new AnimatedSprite(
    moveSpritesheet.animations["moveOut"]
  );

  moveOutAnimation.onComplete = () => {
    console.log("complete");
    moveOutAnimation.visible = false;
  };

  [moveInAnimation, moveOutAnimation].forEach(anim => {
    anim.anchor.set(0.5, 0.4);
    anim.scale.set(0.3);
    anim.animationSpeed = 0.5;
    anim.zIndex = 3;
    anim.loop = false;
    anim.visible = false;
    stage.addChild(anim);
  });

  function runMoveAnimation(x: number, y: number) {
    moveInAnimation.position.set(x, y);
    moveInAnimation.visible = true;
    moveInAnimation.gotoAndPlay(0);

    // Используем Ticker для анимации по оси Y
    const ticker = new Ticker();
    //ticker.maxFPS = 16;
    let elapsedTime = 0;

    ticker.add(delta => {
      elapsedTime += delta.deltaTime;
      const offset = Math.sin(elapsedTime * 0.1) * 3;
      if (moveInAnimation.visible) {
        moveInAnimation.y = y - offset;
      } else if (moveOutAnimation.visible) {
        moveOutAnimation.y = y - offset;
      } else {
        ticker.destroy();
      }
    });

    ticker.start();

    setTimeout(() => {
      moveInAnimation.stop();
      moveInAnimation.visible = false;
      moveOutAnimation.position.set(x, y);
      moveOutAnimation.visible = true;
      moveOutAnimation.gotoAndPlay(0);
    }, 400);
  }

  return { runMoveAnimation };
};
