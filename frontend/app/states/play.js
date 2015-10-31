import _ from 'lodash';

import { Bg } from 'lib/sprites/bg';
import { Ground } from 'lib/sprites/ground';
import { Jar } from 'lib/sprites/jar';
import { Bean } from 'lib/sprites/bean';

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
    this.game.jar = new Jar(this.game);
    _.times(150, this.make_bean, this);

    //register input handler
    this.game.input.onDown.add(this.handle_input, this);

    //jar_state 0: initialized
    //jar_state 1: floating up
    //jar_state 2: finished floating
    this.jar_state = 0;
  }

  make_bean() {
    let bean = new Bean(this.game);
  }

  handle_input() {
    if (this.jar_state === 0) {
      this.jar_state += 1;
      this.game.jar.body.static = false;
      let jar_float_tween = this.game.add.tween(this.game.jar.body.velocity).to( {y: -this.game.height / 3.5}, 800, "Linear", true, 50, 0, true);
      jar_float_tween.onComplete.add(this.jar_float_finished, this);
    }
    if (this.jar_state === 2) {
      this.jar_state += 1;
      let jar_tilt_tween = this.game.add.tween(this.game.jar.body).to( {angle: '-180'}, 3000, "Cubic.easeInOut", true, 50);
    }
  }

  jar_float_finished() {
    this.jar_state += 1;
    this.game.jar.body.velocity.y = 0;
    this.game.jar.body.static = true;
  }

  update() {
    //debug info
    //this.game.debug.box2dWorld();
  }

}

export { PlayState };
