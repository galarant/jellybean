class Ground extends Phaser.Physics.Box2D.Body{

  constructor(game) {
    //sprite attributes
    super(game,
          null,
          0,
          game.bg.height - game.bg.height / 3);
    this.addEdge(0, 0, this.game.width, 0);
    this.static = true;
  }

}

export { Ground };
