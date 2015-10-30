import { Bg } from 'lib/sprites/bg';
import { Ground } from 'lib/sprites/ground';
import { Jar } from 'lib/sprites/jar';

class PlayState extends Phaser.State {

  preload() {}

  create() {

    //define input

    //config game world
    this.stage.backgroundColor = "#000000";
    this.game.world.setBounds(0, 0, this.game.width, this.game.height);

    //config physics
    this.game.physics.startSystem(Phaser.Physics.BOX2D);
    this.game.physics.box2d.setBoundsToWorld();
    this.game.physics.box2d.gravity.y = 300;

    //config game debug
    this.game.physics.box2d.debugDraw.shapes = true;
    this.game.physics.box2d.debugDraw.joints = true;
    //this.game.physics.box2d.debugDraw.aabbs = true;
    this.game.physics.box2d.debugDraw.pairs = true;
    this.game.physics.box2d.debugDraw.centerOfMass = true;

    //add game objects
    this.game.bg = new Bg(this.game);
    this.game.ground = new Ground(this.game);
    this.game.jar = new Jar(this.game);
  }

  update() {
    //debug info
    this.game.debug.box2dWorld();
  }

}

export { PlayState };
