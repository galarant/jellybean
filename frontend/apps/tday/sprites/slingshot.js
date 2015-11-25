import { Band } from './band';
import { Pellet } from './pellet';

class SlingShot extends Phaser.Sprite {

  constructor(game) {
    //sprite attributes
    let width = game.width / 12;
    let height = width / 0.402;
    super(game,
          game.width / 7,
          game.ground.y - height,
          "slingshot");
    this.width = width;
    this.height = height;
    game.world.add(this);

    //initialize state
    this.pellet = null;
    this.front_band = null;
    this.back_band = null;
    this.firing = false;
  }

  load_pellet(pellet) {

    if (this.front_band !== null)
      this.front_band.destroy();
    if (this.back_band !== null)
      this.back_band.destroy();

    pellet.load_into_slingshot();
    this.front_band = new Band(this.game, true);
    this.back_band = new Band(this.game, false);
    this.pellet.bringToTop();
    this.front_band.bringToTop();
    this.bringToTop();
    this.firing = false;
  }

  fire() {
    if (this.pellet === null)
      return;

    this.pellet.catapult();
    this.front_band.destroy();
    this.back_band.destroy();
    this.pellet = null;
    this.firing = false;
  }

  update() {
    if (this.firing) {
      this.front_band.stretch(this.pellet);
      this.back_band.stretch(this.pellet);
    }
  }

}

export { SlingShot };
