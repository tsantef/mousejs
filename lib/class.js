var Class = function() {
  var locals = {};
  this.Property = function(propertyName, getter, setter) {
    this.__defineGetter__(propertyName, getter || function(){return locals[propertyName]});
    this.__defineSetter__(propertyName, setter || function(val){locals[propertyName] = val});
  }
};

// Static Methods
Class.extend = function(subClass) {
  if (subClass === undefined) subClass = function(){};
    var F = function() {};
    F.prototype = this.prototype;
    subClass.prototype = new F();
    subClass.prototype.constructor = subClass;
    
    subClass.baseclass = this.prototype;
    if (this.prototype.constructor === Object.prototype.constructor) {
        this.prototype.constructor = this;
    }

    subClass.extend = this.extend;
    subClass.base = this.prototype.constructor;

    return subClass;
};