'use strict';

var Player = function(game, x, y, frame) {

  Phaser.Sprite.call(this, game, x, y, 'player', frame);
  this.anchor.setTo(0.5, 0.5);
  this.animations.add('warpright', [1, 2, 3, 4], 5, true);
  this.animations.play('warpright');

  this.game.physics.arcade.enableBody(this);
  this.body.setSize(35, 40, 5, 5);
  this.body.collideWorldBounds = true;
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {

  // write your prefab's specific update code here

};

module.exports = Player;
