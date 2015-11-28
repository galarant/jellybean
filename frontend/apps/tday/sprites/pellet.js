import _ from "lodash";

class Pellet extends Phaser.Sprite {

  constructor(game, x, y) {
    //spite attributes
    let pellet_choice = "pellet_" + _.random(1,7);
    super(game, x, y, pellet_choice);
    this.anchor.setTo(0.5);
    this.width = game.width / 24;
    this.height = this.width * 0.75;
    game.world.add(this);

    //physics attributes
    game.physics.box2d.enable(this);
    this.body.setCircle(this.width / 3);
    this.body.friction = 4.0;
    this.body.angularDamping = 5.0;

    //custom attributes
    this.original_size = {width: this.width, height: this.height};
    this.loaded_into_slingshot = false;
    this.catapulted = false;
    this.loaded_position = new Phaser.Point(
      this.game.slingshot.x + this.game.slingshot.width / 2,
      this.game.slingshot.y + this.game.slingshot.height / 6);

  }

  load_into_slingshot() {
    //body attributes
    this.alpha = 1;
    this.width = this.original_size.width;
    this.height = this.original_size.height;
    this.body.x = this.loaded_position.x;
    this.body.y = this.loaded_position.y;
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    this.body.gravityScale = 0;
    this.body.fixedRotation = true;

    //custom attributes
    this.loaded_into_slingshot = true;
    this.game.slingshot.pellet = this;
  }

  catapult() {
    //physics attributes
    let dx = this.game.input.mousePointer.position.x - this.loaded_position.x;
    let dy = this.game.input.mousePointer.position.y - this.loaded_position.y;
    this.body.gravityScale = 1;
    this.body.fixedRotation = false;
    this.body.velocity.x = -dx * 10;
    this.body.velocity.y = -dy * 10;

    //custom attributes
    this.loaded_into_slingshot = false;
    this.catapulted = true;
  }

  update() {
    if (this.catapulted &&
        this.x > this.game.cat.surface.x + 10 &&
        this.x < this.game.cat.surface.x + this.game.cat.width &&
        this.y > this.game.cat.surface.y) {
      this.game.add.tween(this.game.cat).to({fullness: "+15"}, Phaser.Timer.SECOND / 2, "Linear", true);
      this.game.cat.celebrate();
      this.destroy();
    }
  }

  destroy() {
    this.game.num_pellets -= 1;
    return super.destroy();
  }

}

export { Pellet };
