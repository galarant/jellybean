class BootState extends Phaser.State {

  preload() {
    this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    this.game.scale.pageAlignVertically = true;
    this.game.scale.pageAlignHorizontally = true;
    this.load.image('preloader', 'static/assets/preloader.gif');
  }

  create() {
    this.game.state.start('preload');
  }

}

export { BootState };
