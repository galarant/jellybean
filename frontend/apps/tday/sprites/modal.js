class Modal extends Phaser.Group {

  constructor(game, message_text="Paused", can_close=true, additional_message_text=false, darken_alpha=0.6) {
    //group attributes
    super(game, game.world);

    //define children
    this.darken = new Phaser.Sprite(game, 0, 0, "darken");
    this.darken.width = game.camera.width;
    this.darken.height = game.camera.height;
    this.darken.alpha = 0;
    this.darken.fade_in = game.add.tween(this.darken).to({alpha: darken_alpha}, Phaser.Timer.SECOND * 0.5, "Linear", true);
    this.darken.fade_in.onComplete.add(this.show_message, this);

    this.message = new Phaser.BitmapText(game,
                                         game.camera.x + game.camera.width / 2,
                                         game.camera.y + game.camera.height / 3,
                                         "tday", message_text, this.game.camera.height / 16, "center");
    this.message.maxWidth = game.camera.width / 1.5;
    this.message.anchor = new Phaser.Point(0.5, 0.5);
    this.message.alpha = 0;

    //add children
    this.addChild(this.darken);
    this.addChild(this.message);

    //custom attributes
    if (can_close) {
      game.input.onTap.addOnce(this.close, this);
    }
    this.additional_message_text = additional_message_text;
  }

  show_message() {
    let show_additional_message = function() {
      this.message.text = this.additional_message_text;
      this.message.alpha = 1;
    };

    this.message.alpha = 1;
    if (this.additional_message_text) {
      let fade_tween = this.game.add.tween(this.message).to({alpha: 0},
                                                            Phaser.Timer.SECOND * 0.5,
                                                            "Linear", true,
                                                            Phaser.Timer.SECOND * 4.0);
      fade_tween.onComplete.add(show_additional_message, this);
    } else {
      this.game.paused = true;
    }
  }

  close() {
    this.game.paused = false;
    this.destroy();
  }

}

export { Modal };
