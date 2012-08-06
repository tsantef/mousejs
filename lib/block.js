var Block = GameObject.extend(function(board, opts) {
  Block.base.call(this, opts);
  this.board = board;
  opts = opts || {}
  this.width = opts.width || 10;
  this.height = opts.height || 10;
  this.x = opts.x || 0;
  this.y = opts.y || 0;
  this.clip = true;
  this.friction = opts.friction || 1200;

  this.setBackgroundImage = function(url) {
    var img = new Image;
    img.src = url;
    this.backgroundImage = img;
  }

  if (opts.background) { this.setBackgroundImage(opts.background) }
});

Block.prototype.collide = function(obj, info){

  var top = info[0];
  var right = info[1];
  var bottom = info[2];
  var left = info[3];

  // Collided with obj
  if (bottom < left && bottom < right && bottom < top) {
    obj.onGround = true;
    obj.yVel = 0;
    obj.y = this.y - obj.height;

    // Friction
    if (obj.xVel > 0) { obj.xVel -= this.board.delta * this.friction; obj.xVel = Math.max(obj.xVel, 0) } 
    if (obj.xVel < 0) { obj.xVel += this.board.delta * this.friction; obj.xVel = Math.min(obj.xVel, 0) }               
  } else if (left < top && left < bottom && left < right) {
    if (obj.canFall) {
      this.xVel = obj.xVel
    }
    obj.xVel = 0;
    obj.x = this.x + this.width;
  } else if (top < left && top < right && top < bottom) { // Bottom
    obj.yVel = 0;
    obj.y = this.y + this.height;
  } else {
    if (obj.canFall) {
      this.xVel = obj.xVel
    }
    obj.xVel = 0;
    obj.x = this.x - obj.width;
  }
};

Block.prototype.draw = function(context) {
  var left = this.x + 0.5 - this.board.viewport.x;
  var top = this.y + 0.5 - this.board.viewport.y;
  var right = this.x + this.width - 0.5 - this.board.viewport.x;
  var bottom = this.y + this.height - 0.5 - this.board.viewport.y;

  if (((left >= 0 && left <= this.board.viewport.width) || (right >= 0 && right <= this.board.viewport.width)) || (left < 0 && right > this.board.viewport.width)) {
    if (this.backgroundImage) { 
      context.fillStyle = context.createPattern(this.backgroundImage, 'repeat');
      context.fillRect(this.x - this.board.viewport.x, this.y - this.board.viewport.y, this.width, this.height);  
    }

    context.strokeStyle = "rgb(0, 0, 0)";
    context.lineWidth = 1;

    context.beginPath();
    context.moveTo(left, top);
    context.lineTo(right, top);
    context.moveTo(right, top-0.5);
    context.lineTo(right, bottom);
    context.lineTo(left, bottom);
    context.lineTo(left, top);
    context.stroke();
  }
}