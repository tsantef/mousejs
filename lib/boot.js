function Loader() {

  if ( arguments.callee._singletonInstance )
  return arguments.callee._singletonInstance;
  arguments.callee._singletonInstance = this;

  this.loadedObjects = 0;
  this.objectCount = 0;
  this.libs = [];
  this.readyCallbacks = [];

  this.onloaded = function (src) {
    this.loadedObjects += 1;

    lib = this.libs[src];
    lib.isLoaded = true;

    // Load Dependents
    for (d in lib.dependents) {
      this.tryLoad(lib.dependents[d]);
    }

    // Execute Callbacks
    if (lib.callbacks.length > 0) {
      for (var c in lib.callbacks) {
        lib.callbacks[c](lib);
      }
    }

    if (this.ready()) {
      for (var i = 0; i < this.readyCallbacks.length; i++) {
        this.readyCallbacks[i]();
      }
      this.readyCallbacks = [];
    }
  }
} 

Loader.prototype = {

  load: function (src, callback, dependencies) {
    var loader = this;
    if (loader.libs[src]) {
      if (loader.libs[src].isLoaded) {
        // Execute Libaray Callback
        if (callback) {
          callback(loader.libs[src].obj);
          return;
        }
      } else {
        loader.libs[src].callbacks.push(callback) 
      }
    }
    
    loader.objectCount += 1;

    var lib = { src: src, isLoaded:false, dependencies: dependencies, dependents: [], callbacks: [] };
    loader.libs[src] = lib;

    if (callback) { lib.callbacks.push(callback) }

    for (d in lib.dependencies) {
      var parent = loader.libs[lib.dependencies[d]];
      parent.dependents.push(lib);

    }

    this.tryLoad(lib);

  },

  tryLoad: function (lib) {
    if (this.canLoad(lib)) {
      // Build script dom object
      var obj;
      var ext = lib.src.substr(lib.src.lastIndexOf('.') + 1);
      switch (ext) {
        case 'js':
          obj = document.createElement('script');
          obj.type = 'text/javascript';
          obj.name = lib.src;
          document.body.appendChild(obj);
          obj.src = lib.src;
        break;
        case 'json':
          var cb = '_' + +new Date;
          window[cb] = function(data) {
            document.body.removeChild(obj);
            lib.data = data;
          };
          obj = document.createElement('script');
          obj.type = 'text/javascript';
          obj.name = lib.src
          obj.src = lib.src + '?callback=' + cb;
          document.body.appendChild(obj);
        break;
        default:
          obj = new Image();
          obj.src = lib.src;
        break;
      }

      lib.obj = obj;

      obj.onload = function () {
        loader.onloaded(lib.src);
      };
      obj.onerror = function () {
        alert("Loader Error");
      };
    }
  },

  canLoad: function (lib) {
    // Determine if all dependencies have loaded
    for (d in lib.dependencies) {
      if (this.libs[lib.dependencies[d]].isLoaded === false) { 
        return false;
      }
    }
    return true;
  },

  ready: function () {
    return this.loadedObjects === this.objectCount;
  },

  progress: function () {
    return this.loadedObjects / this.objectCount;
  },

  wait: function(callback) {
    if (!this.ready()) {
      this.readyCallbacks.push(callback);
    } else {
      callback();
    }
  }

};