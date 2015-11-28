class Modal extends Phaser.Group {

  constructor(game, message_text="Paused", can_close=true) {
    //group attributes
    super(game, game.world);

    //define children
    this.darken = new Phaser.Sprite(game, 0, 0, "darken");
    this.darken.width = game.camera.width;
    this.darken.height = game.camera.height;
    this.darken.alpha = 0;
    this.darken.fade_in = game.add.tween(this.darken).to({alpha: 0.5}, Phaser.Timer.SECOND * 0.5, "Linear", true);
    this.darken.fade_in.onComplete.add(this.show_message, this);

    this.message = new Phaser.BitmapText(game,
                                         game.camera.x + game.camera.width / 2,
                                         game.camera.y + game.camera.height / 3,
                                         "tday", message_text, 60, "center");
    this.message.maxWidth = game.camera.width / 1.5;
    this.message.anchor = new Phaser.Point(0.5, 0.5);
    this.message.alpha = 0;

    //add children
    this.addChild(this.darken);
    this.addChild(this.message);

    //custom attributes
    if (can_close) {
      game.input.onDown.add(this.close, this);
    }
  }

  show_message() {
    this.message.alpha = 1;
    this.game.paused = true;
  }

  close() {
    this.game.paused = false;
    this.destroy();
  }

}

export { Modal };
