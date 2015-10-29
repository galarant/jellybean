class PlayState extends Phaser.State {

  preload() {}

  create() {

    //define input

    //config game world
    this.stage.backgroundColor = "#000000";
    this.game.world.setBounds(0, 0, this.game.width, this.game.height);

    //config physics
    this.game.physics.startSystem(Phaser.Physics.BOX2D);
    this.game.physics.box2d.setBoundsToWorld();

    //config game debug
    this.game.physics.box2d.debugDraw.shapes = true;
    this.game.physics.box2d.debugDraw.joints = true;
    //this.game.physics.box2d.debugDraw.aabbs = true;
    this.game.physics.box2d.debugDraw.pairs = true;
    this.game.physics.box2d.debugDraw.centerOfMass = true;

    //add game objects

  }

  update() {
    //debug info
    this.game.debug.box2dWorld();
    this.game.debug.cameraInfo(this.game.camera, 32, 32);
    this.game.debug.text('Hello World', 32, 150);
  }

}

export { PlayState };
