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
    this.preloader.alpha = 0; //preloader is ugly as shit for some reason so we're hiding it for now
    this.preloader.anchor.setTo(0.5, 0.5);
    this.load.setPreloadSprite(this.preloader);

    //load our assets/halloween
    this.load.image("bg", "static/assets/halloween/bg.jpg");
    this.load.image("jar", "static/assets/halloween/jar.png");
    this.load.image("orange_bean", "static/assets/halloween/orange_bean.png");
    this.load.image("black_bean", "static/assets/halloween/black_bean.png");
    this.load.image("guin_1", "static/assets/halloween/guin_1.png");
    this.load.image("guin_2", "static/assets/halloween/guin_2.png");
    this.load.image("guin_3", "static/assets/halloween/guin_3.png");
    this.load.image("cat_1", "static/assets/halloween/cat_1.png");
    this.load.image("cat_2", "static/assets/halloween/cat_2.png");
    this.load.image("cat_3", "static/assets/halloween/cat_3.png");
    this.load.image("note_ball", "static/assets/halloween/note_ball.png");
    this.load.image("note", "static/assets/halloween/note.png");

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
