class SlingShot extends Phaser.Sprite {

  constructor(game) {
    //sprite attributes
    let height = game.height / 3;
    let width = height * 0.402;
    super(game,
          game.width / 5,
          game.ground.y - height / 2,
          "slingshot");
    this.anchor.setTo(0.5);
    this.width = width;
    this.height = height;
    game.world.add(this);

  }

}

export { SlingShot };
