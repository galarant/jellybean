class Bg extends Phaser.Sprite {

  constructor(game) {
    //sprite attributes
    super(game,
          0,
          0,
          "bg");
    this.width = game.camera.width;
    this.height = game.camera.height * 1.2;

    //world stuff
    game.world.add(this);

  }

}

export { Bg };
