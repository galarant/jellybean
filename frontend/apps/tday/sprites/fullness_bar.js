import _ from 'lodash';

class FullnessBar extends Phaser.Group {

  constructor(game) {
    //group attributes
    super(game, game.world);
    this.x = 10;
    this.y = 10;

    //define children
    this.label = new Phaser.BitmapText(game, 0, 0, "tday", "Fullness", this.game.camera.height / 25);

    this.outline = new Phaser.Sprite(game, 0, this.label.bottom + game.camera.height / 32, "fullness_bar_outline");
    this.outline.width = this.game.camera.width / 5;
    this.outline.height = this.outline.width / 6;

    this.bar = new Phaser.Sprite(game, this.outline.x + game.camera.height / 64, this.outline.y + game.camera.height / 64, "fullness_bar");
    this.bar.width = 0;
    this.bar.height = this.outline.height - game.camera.height / 32;
    this.bar.blink_tween = game.add.tween(this.bar).to({alpha: 0}, Phaser.Timer.SECOND * 0.5, "Linear", false, 0, -1, true);

    //add children
    this.addChild(this.label);
    this.addChild(this.outline);
    this.addChild(this.bar);
  }

  update() {
    let percent_full = _.min([1.0, this.game.cat.fullness / 100]);
    this.bar.width = (this.outline.width - 16) * percent_full;
    if (percent_full > 0.75) {
      this.bar.blink_tween.start();
    } else {
      this.bar.blink_tween.stop();
      this.bar.alpha = 1;
    }
    let rgb = Phaser.Color.HSLtoRGB(0.5 * (1 - percent_full), 1, 0.5);
    this.bar.tint = rgb.color;
  }

}

export { FullnessBar };
