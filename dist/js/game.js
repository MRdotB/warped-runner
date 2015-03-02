(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(600, 400, Phaser.AUTO, 'warped-runner');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":5,"./states/gameover":6,"./states/menu":7,"./states/play":8,"./states/preload":9}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{"./pique":2}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){

'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }
};

module.exports = Boot;

},{}],6:[function(require,module,exports){

'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX,100, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You Win!', { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;

},{}],7:[function(require,module,exports){

'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    this.game.stage.backgroundColor = '#3F7CAC';
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

},{}],8:[function(require,module,exports){
'use strict';
var Player = require('../prefabs/player');
var PiqueGroup = require('../prefabs/piqueGroup');
function Play() {
}
Play.prototype = {
  create: function () {
    this.game.add.tileSprite(0, 0, 4176, 2112, 'background');
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 1200;

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
    this.piqueGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 1, this.generatePiques, this);
    this.piqueGenerator.timer.start();

    //scoring
    this.score = 0;

    var style = { font: '30px Arial', fill: '#ffffff', align: 'center'};
    this.scoreText = this.game.add.text(this.game.width/2, 30, this.score.toString(), style);
    this.scoreText.anchor.setTo(0.5);
  },
  update: function () {
    this.piques.forEach(function (piqueGroup) {
      this.checkScore(piqueGroup);
      this.game.physics.arcade.collide(this.player, piqueGroup, this.deathHandler, null, this);
    }, this);
  },
  checkScore: function(piqueGroup) {
    if(piqueGroup.exists && !piqueGroup.hasScored && piqueGroup.topPique.world.x <= this.player.world.x) {
      piqueGroup.hasScored = true;
      this.score++;
      this.scoreText.setText(this.score.toString());
    }
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
    //this.game.debug.body(this.player);
    function renderGroup(member) {
      game.debug.body(member);
    }
  }
};

module.exports = Play;

},{"../prefabs/piqueGroup":3,"../prefabs/player":4}],9:[function(require,module,exports){
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
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function () {
    this.ready = true;
  }
};

module.exports = Preload;

},{}]},{},[1])