import _ from "lodash";

import { Bg } from "tday/sprites/bg";
import { Ground } from "tday/sprites/ground";
import { SlingShot } from "tday/sprites/slingshot";
import { Pellet } from "tday/sprites/pellet";

class PlayState extends Phaser.State {

  preload() {}

  create() {

    //config game world
    this.stage.backgroundColor = "#000000";
    this.game.world.setBounds(0, 0, this.game.width, this.game.height);

    //config physics
    this.game.physics.startSystem(Phaser.Physics.BOX2D);
    this.game.physics.box2d.setBoundsToWorld();
    this.game.physics.box2d.gravity.y = 900;

    //config game debug
    this.game.physics.box2d.debugDraw.shapes = true;
    this.game.physics.box2d.debugDraw.joints = true;
    //this.game.physics.box2d.debugDraw.aabbs = true;
    this.game.physics.box2d.debugDraw.pairs = true;
    this.game.physics.box2d.debugDraw.centerOfMass = true;

    //add game objects
    this.game.bg = new Bg(this.game);
    this.game.ground = new Ground(this.game);
    this.game.slingshot = new SlingShot(this.game);
    this.game.slingshot.load_pellet();

    //set up input handlers
    this.game.input.onDown.add(this.mouseDragStart, this);
    this.game.input.addMoveCallback(this.mouseDragMove, this);
    this.game.input.onUp.add(this.mouseDragEnd, this);
  }
  mouseDragStart() {
    if (this.game.slingshot.pellet === null)
      return;

    let bodies_under_pointer = this.game.physics.box2d.getBodiesAtPoint(
      this.game.input.mousePointer.x, this.game.input.mousePointer.y);
    if (_.includes(bodies_under_pointer, this.game.slingshot.pellet.body)) {
      this.game.slingshot.firing = true;
      this.game.physics.box2d.mouseDragStart(this.game.input.mousePointer);
    }
  }

  mouseDragMove() {
    if (!this.game.slingshot.firing)
      return;

    if (this.game.input.mousePointer.x < this.game.slingshot.pellet.start_position.x + 50 &&
        this.game.input.mousePointer.y > this.game.slingshot.pellet.start_position.y - 100) {
      this.game.physics.box2d.mouseDragMove(this.game.input.mousePointer);
    } else {
      this.game.slingshot.load_pellet();
    }
  }

  mouseDragEnd() {
    if (!this.game.slingshot.firing)
      return;

    this.game.physics.box2d.mouseDragEnd(this.game.input.mousePointer);
    this.game.slingshot.fire();
  }

  update() {
    //debug info
    //this.game.debug.box2dWorld();
  }

}

export { PlayState };
