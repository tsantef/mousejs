var Player = GameObject.extend(function(board){
  Player.base.call(this);
  this.board = board;

  var name;
  var captionMetrics;

  this.Property("name", function(){return name}, function(val){
    name = val;
    this.board.context.font = '10px monospace';
    this.captionMetrics = board.context.measureText(val);
  });
});

Player.prototype.jump = function() {
  if (this.onGround) {
    this.jumpStart = Date.now();
    this.onGround = false;
    this.yVel -= this.board.jumpVel;
  }
};

Player.prototype.draw = function(context) {
  context.drawImage(this.image, this.x + (this.width) / 2 - (this.image.width / 2) - this.board.viewport.x, this.y - (this.image.height - this.height) - this.board.viewport.y);

  context.fillStyle    = '#00f';
  context.font         = '10px monospace';
  context.textBaseline = 'top';
  context.fillText(this.name, this.x + (this.width) / 2 - this.captionMetrics.width / 2 - this.board.viewport.x, this.y - (this.image.height - this.height) - 13 - this.board.viewport.y);
}

Player.prototype.moveRight = function () {
  if (this.xVel < this.board.maxMoveVelocity) {
    this.xVel = Math.min(this.xVel + this.board.delta * this.board.moveAccel, this.board.maxMoveVelocity);
  }
};

Player.prototype.moveLeft = function () {
  if (this.xVel > this.board.maxMoveVelocity * -1) {
    this.xVel = Math.max(this.xVel - this.board.delta * this.board.moveAccel, this.board.maxMoveVelocity * -1);
  }
};