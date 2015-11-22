class PreloadState extends Phaser.State {

  constructor() {
    super();
    this.ready = false;
  }

  preload() {
    //show the preloader while assets/halloween are loading
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.preloader = this.add.sprite(this.game.world.centerX,
                                     this.game.world.centerY,
                                     "preloader");
    this.preloader.anchor.setTo(0.5, 0.5);
    this.load.setPreloadSprite(this.preloader);

    //load our assets/halloween
    this.load.image("bg", "static/assets/halloween/bg.jpg");
    this.load.bitmapFont('guin',
      'static/assets/fonts/guin.png',
      'static/assets/fonts/guin.fnt');
  }

  create() {
    this.preloader.cropEnabled = false;
  }

  update() {
    if(!!this.ready) {
      this.game.state.start('play');
    }
  }

  onLoadComplete() {
    this.ready = true;
  }

}

export { PreloadState };
