function GameBoard(context) {
  this.context = context;
  this.objects = [];
}

GameBoard.prototype.addObject = function(obj) {
  obj.board = this;
  this.objects.push(obj);
};

GameBoard.prototype.react = function() {
  for (var i = 0; i < this.objects.length; i++) {
    this.objects[i].react();
  }
};

GameBoard.prototype.draw = function() {
  // Draw Backgrounds
  for (var i = 0; i < this.map.backgrounds.length; i++) {
    var b = this.map.backgrounds[i];
    var mapCoverage = ((this.viewport.x / (b.distance) * -1) % b.image.width) - b.image.width;
    while (mapCoverage < this.viewport.width) {
      this.context.drawImage(b.image, mapCoverage, this.viewport.height - b.image.height + (this.viewport.y / (b.distance) * -1));
      mapCoverage += b.image.width;
    }
  }
  
  // Draw Objects
  for (var i = 0; i < this.objects.length; i++) {
    this.objects[i].draw(this.context);
  }

  // Draw border
//  this.drawBox(0, this.map.width, this.map.height, 0);
}

GameBoard.prototype.drawBox = function(top, right, bottom, left) {
  this.context.strokeStyle = "rgb(0, 0, 0)";
  this.context.lineWidth = 1;

  this.context.beginPath();
  this.context.moveTo(left - this.viewport.x, top - this.viewport.y);
  this.context.lineTo(right - this.viewport.x, top - this.viewport.y);
  this.context.moveTo(right - this.viewport.x, top-0.5 - this.viewport.y);
  this.context.lineTo(right - this.viewport.x, bottom - this.viewport.y);
  this.context.lineTo(left - this.viewport.x, bottom - this.viewport.y);
  this.context.lineTo(left - this.viewport.x, top - this.viewport.y);
  this.context.stroke();
}