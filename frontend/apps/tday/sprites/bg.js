class Bg extends Phaser.Sprite {

  constructor(game) {
    //sprite attributes
    super(game,
          0,
          0,
          "bg");
    this.width = game.width;
    this.height = game.height + 200;

    //world stuff
    game.world.add(this);

  }

}

export { Bg };
