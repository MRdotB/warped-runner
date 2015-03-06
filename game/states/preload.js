'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function () {
    this.asset = this.add.sprite(this.width / 2, this.height / 2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
    this.load.image('warped', 'assets/logo-warped-large.png');
    this.load.image('background','assets/background.png');
    this.load.spritesheet('player', 'assets/img/warp.png', 54, 54);
    this.load.spritesheet('pique', 'assets/img/pique.png', 50, 300);
  },
  create: function () {
    this.asset.cropEnabled = false;
  },
  update: function () {
    if (!!this.ready) {
      this.game.state.start('gameover');
    }
  },
  onLoadComplete: function () {
    this.ready = true;
  }
};

module.exports = Preload;
