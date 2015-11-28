class Cat extends Phaser.Sprite {

  constructor(game) {
    //sprite attributes
    let width = game.width / 3;
    let height = width;
    super(game,
          game.world.width - width,
          game.ground.y - height + height / 20,
          "cat");
    this.width = width;
    this.height = height;
    game.world.add(this);

    //animations
    this.animations.add("stand_mouth_closed",
                        Phaser.Animation.generateFrameNames("stand_mouth_closed_", 1, 1),
                        1, true);
    this.animations.add("stand_mouth_open",
                        Phaser.Animation.generateFrameNames("stand_mouth_open_", 1, 1),
                        1, true);
    this.animations.add("walking_forwards",
                        Phaser.Animation.generateFrameNames("walking_forwards_", 1, 4),
                        4, true);
    this.animations.add("walking_backwards",
                        Phaser.Animation.generateFrameNames("walking_backwards_", 1, 4),
                        4, true);
    this.animations.add("celebrating",
                        Phaser.Animation.generateFrameNames("celebrating_", 1, 2),
                        2, true);


    //custom attributes
    this.surface = null;
    this.mouth_open = false;
    this.celebrating = false;
    this.fullness = 0;
    this.set_surface();
    this.walk_forwards();
  }

  set_surface() {
    if (this.surface !== null) {
      this.surface.destroy();
    }

    if (!this.mouth_open) {
      this.surface = new Phaser.Physics.Box2D.Body(this.game, null, this.x - this.width / 3, this.y + this.height / 6);
      this.surface.addEdge(0, 0, 0, this.height - this.height / 4);
      this.surface.static = true;
    } else {
      this.surface = new Phaser.Physics.Box2D.Body(this.game, null, this.x - this.width / 3, this.y + this.height / 6);
      this.surface.addEdge(0, 0, 0, this.height / 20);
      this.surface.addEdge(0, this.height - this.height / 1.5, 0, this.height - this.height / 4);
      this.surface.static = true;
    }
  }

  walk_forwards() {
    let finished_walking_forwards = function() {
      this.walking_forwards = false;
      this.game.time.events.add(Phaser.Timer.SECOND * 1, this.open_mouth, this);
    };

    let this_tween = this.game.add.tween(this).to({x: this.game.plate.x + this.game.plate.width + this.game.camera.width / 8.0}, Phaser.Timer.SECOND * 2, "Linear", true);
    this_tween.onComplete.add(finished_walking_forwards, this);
    this.walking_forwards = true;
  }

  walk_backwards() {
    let finished_walking_backwards = function() {
      this.walking_backwards = false;
      this.game.time.events.add(0, this.walk_forwards, this);
    };

    let this_tween = this.game.add.tween(this).to({x: this.game.world.width - this.width}, Phaser.Timer.SECOND * 2, "Linear", true);
    this_tween.onComplete.add(finished_walking_backwards, this);
    this.walking_backwards = true;
  }

  close_mouth() {
    this.game.time.events.add(Phaser.Timer.SECOND * 1, this.walk_backwards, this);
    this.mouth_open = false;
    this.set_surface();
  }

  open_mouth() {
    this.game.time.events.add(Phaser.Timer.SECOND * 3, this.close_mouth, this);
    this.mouth_open = true;
    this.set_surface();
  }

  celebrate() {
    let finished_celebrating = function() {
      this.celebrating = false;
      this.open_mouth();
    };

    this.game.time.events.removeAll();
    this.game.time.events.add(Phaser.Timer.SECOND * 2, finished_celebrating, this);
    this.celebrating = true;
  }

  update() {
    //set the animation state
    if (this.walking_forwards) {
      this.animations.play("walking_forwards");
    } else if (this.walking_backwards) {
      this.animations.play("walking_backwards");
    } else if (this.celebrating) {
      this.animations.play("celebrating");
    } else if (this.mouth_open) {
      this.animations.play("stand_mouth_open");
    } else {
      this.animations.play("stand_mouth_closed");
    }
    this.surface.x = this.x + this.width / 3;
  }

}

export { Cat };
