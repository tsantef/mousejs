var KEY_UP = 38;
var KEY_DOWN = 40;
var KEY_RIGHT = 39;
var KEY_LEFT = 37;
var KEY_SPACE = 32;

var Input = Class.extend(function(){
  Input.base.call(this);

  var self = this;
  this.keyState = {};

  // Event listeners
  window.addEventListener("keydown", onKeydown, false);
  window.addEventListener("keyup", onKeyup, false);
  //window.addEventListener("keypress", onKeypress, false);

  function onKeydown(e) { 
    //console.log(e.keyCode);
    self.keyState[e.keyCode] = true;
  }
  function onKeyup(e) {
    self.keyState[e.keyCode] = false;
  }
});
Input.prototype = {
  reset: function () {
    this.keyState = {};
  },
  pressed: function (keyCode) {
    return (keyCode in this.keyState && this.keyState[keyCode]);
  },
};