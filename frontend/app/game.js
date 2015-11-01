import { BootState } from 'states/boot';
import { PreloadState } from 'states/preload';
import { PlayState } from 'states/play';

class GuinGame extends Phaser.Game {

  constructor() {
    super('100%', '100%', Phaser.AUTO, '');

    //add states
    this.state.add('boot', BootState);
    this.state.add('preload', PreloadState);
    this.state.add('play', PlayState);

    this.state.start('boot');
  }

}

export { GuinGame };
