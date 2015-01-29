'use strict';

var Pique = function (game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'pique', frame);

  this.anchor.setTo(0.5, 0.5);
  this.game.physics.arcade.enableBody(this);

  this.body.allowGravity = false;
  this.body.immovable = true;

};

Pique.prototype = Object.create(Phaser.Sprite.prototype);
Pique.prototype.constructor = Pique;

Pique.prototype.update = function () {



};

module.exports = Pique;
