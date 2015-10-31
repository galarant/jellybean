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
    this.preloader.alpha = 0; //preloader is ugly as shit for some reason so we're hiding it for now
    this.preloader.anchor.setTo(0.5, 0.5);
    this.load.setPreloadSprite(this.preloader);

    //load our assets
    this.load.image("bg", "static/assets/bg.jpg");
    this.load.image("jar", "static/assets/jar.png");
    this.load.image("orange_bean", "static/assets/orange_bean.png");
    this.load.image("black_bean", "static/assets/black_bean.png");
    this.load.image("guin_1", "static/assets/guin_1.png");
    this.load.image("guin_2", "static/assets/guin_2.png");
    this.load.image("guin_3", "static/assets/guin_3.png");
    this.load.image("cat_1", "static/assets/cat_1.png");
    this.load.image("cat_2", "static/assets/cat_2.png");
    this.load.image("cat_3", "static/assets/cat_3.png");
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
