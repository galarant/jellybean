import _ from "lodash";
import { Pellet } from "./pellet";

class Plate extends Phaser.Sprite {

  constructor(game) {
    //sprite attributes
    let width = game.width / 3;
    let height = width / 3.16;
    super(game,
          (game.width - game.width / 2.25) - width / 2,
          game.ground.y - height * 0.75,
          "plate");
    this.width = width;
    this.height = height;
    game.world.add(this);

    this.surface = new Phaser.Physics.Box2D.Body(game, null, this.x, this.y);
    this.surface.addEdge(0, this.height / 2, this.width / 3, 3 * this.height / 4);
    this.surface.addEdge(2 * this.width / 3, 3 * this.height / 4, this.width, this.height / 2);
    this.surface.static = true;
  }

  fill(num_pellets=15) {
    let create_pellet = function() {
      let pellet = new Pellet(this.game,
                              this.x + this.width / 2 + _.random(50),
                              this.y + _.random(50));
      this.game.pellets.push(pellet);
    };
    _.times(num_pellets, create_pellet, this);
  }

}

export { Plate };
