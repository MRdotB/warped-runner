'use strict';
function GameOver() {
}

GameOver.prototype = {
  preload: function () {
    this.load.image('hearths', 'assets/img/hearts.png');
    this.load.image('club', 'assets/img/club.png');
  },
  create: function () {
    this.game.add.tileSprite(0, 0, 4176, 2112, 'background');

    this.emitterHearth = this.game.add.emitter(this.game.world.centerX + 100, 200, 400);
    this.emitterHearth.makeParticles('hearths');
    this.emitterHearth.setRotation(100, 0);
    this.emitterHearth.gravity = -200;
    this.emitterHearth.start(false, 5000, 10);
    this.emitterHearth.emitX = 0;
    this.game.add.tween(this.emitterHearth).to({emitX: 800}, 2000, Phaser.Easing.Linear.None, true, 0, Number.MAX_VALUE, true);

    this.emitterClub = this.game.add.emitter(this.game.world.centerX - 100, 200, 400);
    this.emitterClub.makeParticles('club');
    this.emitterClub.setRotation(100, 0);
    this.emitterClub.gravity = 200;
    this.emitterClub.start(false, 5000, 10);
    this.emitterClub.emitX = 0;
    this.game.add.tween(this.emitterClub).to({emitX: 800}, 2000, Phaser.Easing.Linear.None, true, 0, Number.MAX_VALUE, true);

    var style = {font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX, 100, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You Win!', {
      font: '32px Arial',
      fill: '#ffffff',
      align: 'center'
    });
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', {
      font: '16px Arial',
      fill: '#ffffff',
      align: 'center'
    });
    this.instructionText.anchor.setTo(0.5, 0.5);
  },
  update: function () {
    if (this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;
