import _ from 'lodash';

import { Bg } from 'lib/sprites/bg';
import { Ground } from 'lib/sprites/ground';
import { Jar } from 'lib/sprites/jar';
import { Bean } from 'lib/sprites/bean';
import { NoteBall } from 'lib/sprites/note_ball';
import { Note } from 'lib/sprites/note';
import { Message } from 'lib/sprites/message';

class PlayState extends Phaser.State {

  preload() {
    this.game.load.bitmapFont('guin',
      'static/assets/fonts/guin.png',
      'static/assets/fonts/guin.fnt');
    this.timer = new Phaser.Time(this.game);
    this.timer.advancedTiming = true;
  }

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
    this.game.note_ball = new NoteBall(this.game);
    this.game.nb_joint = this.game.physics.box2d.distanceJoint(this.game.jar,
                                                          this.game.note_ball,
                                                          10, 0, 100, 0, -10,
                                                          3, 2.0);
    this.game.note = new Note(this.game);
    /*
    this.message = new Phaser.BitmapText(this.game, 32, 64, 'guin',
      "Happy Halloween\nJellybean!", 64, 'center');
    this.game.world.add(this.message);
    */

    _.times(40, this.make_bean, this);
    this.game.jar.bringToTop();

    //register input handler
    this.game.input.onDown.add(this.handle_input, this);

    //jar_state 0: initialized
    //jar_state 1: floating up
    //jar_state 2: finished floating
    //jar_state 3: tilting
    //jar_state 4: finished tilting
    //jar_state 5: shaking_1
    //jar_state 6: finished shaking_1
    //jar_state 7: shaking_2
    //jar_state 8: finished shaking_2
    this.jar_state = 0;
  }

  make_bean() {
    new Bean(this.game);
  }

  handle_input() {
    if (this.jar_state === 0) {
      this.jar_state += 1;
      this.game.jar.body.static = false;
      let jar_float_tween = this.game.add.tween(this.game.jar.body.velocity).to(
        {y: -this.game.height / 3.5}, 800, "Linear", true, 50, 0, true);
      jar_float_tween.onComplete.add(this.jar_float_finished, this);
    }
    if (this.jar_state === 2) {
      this.jar_state += 1;
      let jar_tilt_tween = this.game.add.tween(this.game.jar.body).to(
        {angle: '-180'}, 3000, "Cubic.easeInOut", true, 50);
      jar_tilt_tween.onComplete.add(this.jar_tilt_finished, this);
    }
    if (this.jar_state === 4) {
      this.jar_state += 1;
      this.game.jar_shake_tween = this.game.add.tween(this.game.jar.body);
      this.game.jar_shake_tween.to({angle: '-15'}, 250, "Linear");
      this.game.jar_shake_tween.to({angle: '+15'}, 250, "Linear");
      this.game.jar_shake_tween.to({angle: '+15'}, 250, "Linear");
      this.game.jar_shake_tween.to({angle: '-15'}, 250, "Linear");
      this.game.jar_shake_tween.onComplete.add(this.jar_shake_finished, this);
      this.game.jar_shake_tween.start();
      this.game.add.tween(this.game.nb_joint).to(
        {m_length: '+4'}, 500, "Linear", true, 500);
    }
    if (this.jar_state === 6) {
      this.jar_state += 1;
      this.game.jar_shake_tween.start();
    }
    if (this.jar_state === 8) {
      this.game.note.alpha = 1;
      let note_expand_tween = this.game.add.tween(this.game.note.scale).to(
        {x: 0.7, y: 0.7}, 750, "Back.easeOut", true, 50);
      note_expand_tween.onComplete.add(this.note_expand_finished, this);
    }
  }

  jar_float_finished() {
    this.jar_state += 1;
    this.game.jar.body.velocity.y = 0;
    this.game.jar.body.static = true;
  }

  jar_tilt_finished() {
    this.jar_state += 1;
  }

  jar_shake_finished() {
    this.jar_state += 1;
    if (this.jar_state === 8) {
      this.game.note_ball.bringToTop();
      this.game.jar.bringToTop();
      this.game.note.bringToTop();
      this.game.physics.box2d.world.DestroyJoint(this.game.nb_joint);
    }
  }

  note_expand_finished() {
    new Message(this.game);
  }

  update() {
    //debug info
    //this.game.debug.box2dWorld();
  }

}

export { PlayState };
