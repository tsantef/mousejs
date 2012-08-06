var GameObject = Class.extend(function() {
  GameObject.base.call(this);
  
  this.height = 0;
  this.width = 0;

  this.xVel = 0;
  this.yVel = 0;

  this.x = 0;
  this.y = 0;
  this.yVel = 0;
  this.onGround = false;
  this.canFall = false;
});

GameObject.prototype.collide = function(){};

GameObject.prototype.react = function(){
  if (this.canFall) {
    // Gravity
    this.yVel += this.board.gravity * this.board.delta;
    // Move
    this.y += this.yVel * this.board.delta;
    this.x += this.xVel * this.board.delta;
  }
};

GameObject.prototype.draw = function(context){};