import _ from "lodash";

import { Bg } from "tday/sprites/bg";
import { Ground } from "tday/sprites/ground";
import { SlingShot } from "tday/sprites/slingshot";
import { Pellet } from "tday/sprites/pellet";
import { Plate } from "tday/sprites/plate";
import { Cat } from "tday/sprites/cat";

class PlayState extends Phaser.State {

  preload() {}

  create() {

    //config game world
    this.stage.backgroundColor = "#000000";
    this.game.world.setBounds(0, 0, this.game.width * 1.5, this.game.height);

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
    this.game.plate = new Plate(this.game);
    this.game.pellets = [];
    this.game.plate.fill();
    this.game.cat = new Cat(this.game);

    //set up input handlers
    this.game.input.onDown.add(this.mouseDragStart, this);
    this.game.input.addMoveCallback(this.mouseDragMove, this);
    this.game.input.onUp.add(this.mouseUp, this);
  }
  mouseDragStart() {
    //not dragging the loaded pellet
    if (this.game.slingshot.pellet === null)
      return;

    let bodies_under_pointer = this.game.physics.box2d.getBodiesAtPoint(
      this.game.input.mousePointer.x, this.game.input.mousePointer.y);

    //dragging the loaded pellet
    if (_.includes(bodies_under_pointer, this.game.slingshot.pellet.body)) {
      this.game.slingshot.firing = true;
      this.game.physics.box2d.mouseDragStart(this.game.input.mousePointer);
    }
  }

  mouseDragMove() {
    //not dragging the loaded pellet
    if (!this.game.slingshot.firing)
      return;

    //dragging the loaded pellet
    this.game.physics.box2d.mouseDragMove(this.game.input.mousePointer);
  }

  mouseUp() {
    let bodies_under_pointer = this.game.physics.box2d.getBodiesAtPoint(
      this.game.input.mousePointer.x, this.game.input.mousePointer.y);

    let sprites_under_pointer = _.map(bodies_under_pointer, function(x) { return x.sprite; });
    let pellets_under_pointer = _.intersection(sprites_under_pointer, this.game.pellets);

    //nothing important under pointer
    if (pellets_under_pointer.length === 0) {
      return;

    //finished dragging the loaded pellet
    } else if (this.game.slingshot.firing) {
      this.game.physics.box2d.mouseDragEnd(this.game.input.mousePointer);
      this.game.slingshot.fire();

    //clicked on pellet and the slingshot is empty
    } else if (this.game.slingshot.pellet === null) {
      let this_pellet = pellets_under_pointer[0];

      //if pellet is unused then load it into the slingshot
      if (!this_pellet.catapulted) {
        this.game.slingshot.load_pellet(this_pellet);
      }

    //anything else
    } else return;

  }

  update() {
    //debug info
    //this.game.debug.box2dWorld();
  }

}

export { PlayState };
