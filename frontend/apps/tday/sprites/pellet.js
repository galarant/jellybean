class Pellet extends Phaser.Sprite {

  constructor(game) {
    //spite attributes
    super(game,
          game.slingshot.x + game.slingshot.width / 2,
          game.slingshot.y + game.slingshot.height / 6,
          "pellet");
    this.anchor.setTo(0.5);
    this.width = game.width / 36;
    this.height = game.width / 36;
    game.world.add(this);

    //physics attributes
    game.physics.box2d.enable(this);
    this.body.setCircle(this.width / 2);
    this.body.restitution = 0.3;
    this.body.gravityScale = 0;
    this.body.fixedRotation = true;

    //need to remember start position and drag status
    this.start_position = new Phaser.Point(this.x, this.y);
  }

  catapult() {
    let dx = this.game.input.mousePointer.position.x - this.start_position.x;
    let dy = this.game.input.mousePointer.position.y - this.start_position.y;

    this.body.gravityScale = 1;
    this.body.fixedRotation = false;
    this.body.velocity.x = -dx * 10;
    this.body.velocity.y = -dy * 10;
  }

}

export { Pellet };
