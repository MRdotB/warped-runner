
'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    this.game.add.tileSprite(0, 0, 4176, 2112, 'background');
    var style = { font: '30px Arial', fill: '#ffffff', align: 'center'};
    this.sprite = this.game.add.sprite(this.game.world.centerX, 138, 'warped');
    this.sprite.anchor.setTo(0.5);

    this.instructionsText = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 100, 'Click anywhere to play !', style);
    this.instructionsText.anchor.setTo(0.5);

    this.sprite.angle = -20;
    this.game.add.tween(this.sprite).to({angle: 20}, 1000, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};

module.exports = Menu;
