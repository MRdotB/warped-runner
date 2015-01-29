'use strict';
var Pique = require('./pique');
var PiqueGroup = function (game, parent) {
  Phaser.Group.call(this, game, parent);

  this.topPique = new Pique(this.game, 0, 0, 0);
  this.bottomPique = new Pique(this.game, 0, 440, 1);
  this.add(this.topPique);
  this.add(this.bottomPique);
  this.hasScored = false;

  this.setAll('body.velocity.x', -200);

};

PiqueGroup.prototype = Object.create(Phaser.Group.prototype);
PiqueGroup.prototype.constructor = PiqueGroup;


PiqueGroup.prototype.update = function () {
  this.checkWorldBounds();
};

PiqueGroup.prototype.checkWorldBounds = function () {
  if (!this.topPique.inWorld) {
    this.exists = false;
  }
};
PiqueGroup.prototype.reset = function (x, y) {
  this.topPique.reset(0, 0);
  this.bottomPique.reset(0, 440);
  this.x = x;
  this.y = y;
  this.setAll('body.velocity.x', -200);
  this.hasScored = false;
  this.exists = true;
};
module.exports = PiqueGroup;
