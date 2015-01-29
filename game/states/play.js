'use strict';
var Player = require('../prefabs/player');
var PiqueGroup = require('../prefabs/piqueGroup');
function Play() {
}
Play.prototype = {
  create: function () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 1200;

    this.game.stage.backgroundColor = '#3F7CAC';

    this.player = new Player(this.game, this.game.width / 2, this.game.height / 2);
    this.game.add.existing(this.player);

    // add keyboard controls
    this.gravityKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.gravityKey.onDown.add(this.reverseGravity, this);

    // add mouse/touch controls
    this.game.input.onDown.add(this.reverseGravity, this);
    this.orientation = 'down';

    //create a group for pique
    this.piques = this.game.add.group();

    // add a timer
    this.piqueGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 0.25, this.generatePiques, this);
    this.piqueGenerator.timer.start();

  },
  update: function () {
    this.piques.forEach(function (piqueGroup) {
      this.game.physics.arcade.collide(this.player, piqueGroup, this.deathHandler, null, this);
    }, this);
  },
  reverseGravity: function () {
    if (this.orientation === 'down') {
      this.game.physics.arcade.gravity.y *= -1;
      this.game.add.tween(this.player).to({angle: 180}, 100).start();
      this.player.scale.x = -1;
      this.orientation = 'up';
    } else if (this.orientation === 'up') {
      this.game.physics.arcade.gravity.y *= -1;
      this.game.add.tween(this.player).to({angle: 0}, 100).start();
      this.player.scale.x = 1;
      this.orientation = 'down';
    }
  },
  deathHandler: function () {
    this.game.state.start('gameover');
  },
  generatePiques: function () {
    var piqueY = this.game.rnd.integerInRange(-25, 25);
    var piqueGroup = this.piques.getFirstExists(false);
    if (!piqueGroup) {
      piqueGroup = new PiqueGroup(this.game, this.piques);
    }
    piqueGroup.reset(this.game.width, piqueY);
  },
  clickListener: function () {
    this.game.state.start('gameover');
  },
  render: function () {
    // this.game.debug.bodyInfo(this.player, 16, 24);
    this.game.debug.body(this.player);
    function renderGroup(member) {
      game.debug.body(member);
    }
  }
};

module.exports = Play;
