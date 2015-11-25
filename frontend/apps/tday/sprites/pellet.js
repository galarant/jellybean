class Pellet extends Phaser.Sprite {

  constructor(game, x, y) {
    //spite attributes
    super(game, x, y, "pellet");
    this.anchor.setTo(0.5);
    this.width = game.width / 36;
    this.height = game.width / 36;
    game.world.add(this);

    //physics attributes
    game.physics.box2d.enable(this);
    this.body.setCircle(this.width / 2);
    this.body.friction = 4.0;
    this.body.angularDamping = 5.0;

    //custom attributes
    this.loaded_into_slingshot = false;
    this.catapulted = false;
    this.loaded_position = new Phaser.Point(
      this.game.slingshot.x + this.game.slingshot.width / 2,
      this.game.slingshot.y + this.game.slingshot.height / 6);

  }

  load_into_slingshot() {
    //body attributes
    this.body.x = this.loaded_position.x;
    this.body.y = this.loaded_position.y;
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    this.body.gravityScale = 0;
    this.body.fixedRotation = true;

    //custom attributes
    this.loaded_into_slingshot = true;
    this.game.slingshot.pellet = this;
    console.log("loaded into slingshot:", this);
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

}

export { Pellet };
