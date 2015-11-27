class PreloadState extends Phaser.State {

  constructor() {
    super();
    this.ready = false;
  }

  preload() {
    //show the preloader while assets are loading
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.preloader = this.add.sprite(this.game.world.centerX,
                                     this.game.world.centerY,
                                     "preloader");
    this.preloader.anchor.setTo(0.5, 0.5);
    this.load.setPreloadSprite(this.preloader);

    //load our assets
    this.load.image("bg", "static/assets/tday/bg.jpg");
    this.load.image("slingshot", "static/assets/tday/slingshot.png");
    this.load.image("pellet_1", "static/assets/tday/pellet_1.png");
    this.load.image("pellet_2", "static/assets/tday/pellet_2.png");
    this.load.image("pellet_3", "static/assets/tday/pellet_3.png");
    this.load.image("pellet_4", "static/assets/tday/pellet_4.png");
    this.load.image("pellet_5", "static/assets/tday/pellet_5.png");
    this.load.image("pellet_6", "static/assets/tday/pellet_6.png");
    this.load.image("pellet_7", "static/assets/tday/pellet_7.png");
    this.load.image("band", "static/assets/tday/band.png");
    this.load.image("plate", "static/assets/tday/plate.png");
    this.load.atlasXML("cat", "static/assets/tday/cat.png", "static/assets/tday/cat.xml");
    this.load.spritesheet("smoke_puff", "static/assets/tday/smoke_puff.png", 128, 128, 10);
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
