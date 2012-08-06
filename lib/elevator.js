var Elevator = Block.extend(function(board, opts) {
  Elevator.base.call(this, board, opts);
  this.board = board;
  this.x1 = opts.x1;
  this.y1 = opts.y1;
  this.x2 = opts.x2;
  this.y2 = opts.y2;
  this.interval = opts.interval || 3000;
  this.lastPos = [0,0];
  this.delta = [0,0];
});
Elevator.prototype = {
  collide: function(obj, info) {
    obj.x += this.delta[0];
    obj.y += this.delta[1];

    Elevator.baseclass.collide.call(this, obj, info);
  },
  react: function() {
    var ydist = this.y2 - this.y1;
    var xdist = this.x2 - this.x1;

    var p = (Math.sin(Math.PI * (this.board.time_now/this.interval*2)) + 1) / 2;

    this.yOffset = p * ydist;
    this.xOffset = p * xdist;

    this.y = this.y1 + this.yOffset;
    this.x = this.x1 + this.xOffset;

    this.delta = [this.x - this.lastPos[0], this.y - this.lastPos[1]];
    this.lastPos = [this.x, this.y];
  },
  draw: function(context) {
    Elevator.baseclass.draw.call(this, this.board.context);
  }
}