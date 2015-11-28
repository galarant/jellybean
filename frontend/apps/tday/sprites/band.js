class Band extends Phaser.Sprite {

  constructor(game, is_front) {
    //sprite attributes
    if (is_front) {
      let x = game.slingshot.x + game.slingshot.width / 6;
      let y = game.slingshot.y + game.slingshot.height / 9;
      super(game, x, y, "band");
    } else {
      let x = game.slingshot.x + game.slingshot.width / 1.35;
      let y = game.slingshot.y + game.slingshot.height / 14;
      super(game, x, y, "band");
    }
    this.width = game.width / 64;
    this.height = game.width / 64;
    game.world.add(this);

    //need to remember original location
    this.start_pos = new Phaser.Point(this.x, this.y);
  }

  stretch(pellet) {
    let pellet_distance = this.start_pos.distance(pellet);
    let pellet_angle = this.start_pos.angle(pellet);

    this.width = pellet_distance + pellet.width / 2 + this.game.camera.height / 40;
    this.rotation = pellet_angle + 0.10;
    this.y = this.start_pos.y + this.game.camera.height / 45;
    this.x = this.start_pos.x + this.game.camera.height / 45;
  }

}

export { Band };
