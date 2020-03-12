// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/main.js":[function(require,module,exports) {
var base_url = 'http://localhost:3000';
var app = new Vue({
  el: '#app',
  data: {
    task: [],
    page: 'login',
    login_email: '',
    login_password: '',
    register_email: '',
    register_password: '',
    register_password_confirm: '',
    task_title: '',
    task_description: '',
    task_category: 'Back-Log',
    edit_title: '',
    edit_description: '',
    edit_category: '',
    edit_id: ''
  },
  created: function created() {
    if (localStorage.getItem('token')) {
      this.page = 'main';
      this.getAllTask();
    }
  },
  computed: {
    backlogData: function backlogData() {
      var data = this.task.filter(function (x) {
        return x.category === 'Back-Log';
      });
      return data;
    },
    todoData: function todoData() {
      var data = this.task.filter(function (x) {
        return x.category === 'To-Do';
      });
      return data;
    },
    doneData: function doneData() {
      var data = this.task.filter(function (x) {
        return x.category === 'Done';
      });
      return data;
    },
    completedData: function completedData() {
      var data = this.task.filter(function (x) {
        return x.category === 'Completed';
      });
      return data;
    }
  },
  methods: {
    signUpForm: function signUpForm() {
      this.reset();
      this.page = 'register';
    },
    loginForm: function loginForm() {
      this.reset();
      this.page = 'login';
    },
    addTaskForm: function addTaskForm() {
      this.page = 'create-task';
    },
    reset: function reset() {
      this.login_email = '';
      this.login_password = '';
      this.register_email = '';
      this.register_password = '';
      this.register_password_confirm = '';
      this.task_title = '';
      this.task_description = '';
      this.task_category = 'Back-Log';
      this.edit_title = '';
      this.edit_description = '';
      this.edit_category = '';
      this.edit_id = '';
    },
    mainPage: function mainPage() {
      this.getAllTask();
      this.page = 'main';
    },
    loginUser: function loginUser() {
      var _this = this;

      var obj = {
        email: this.login_email,
        password: this.login_password
      };
      axios({
        method: 'POST',
        url: base_url + '/login',
        data: obj
      }).then(function (_ref) {
        var data = _ref.data;
        localStorage.setItem('token', data.token);

        _this.reset();

        _this.mainPage();

        var Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          onOpen: function onOpen(toast) {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          }
        });
        Toast.fire({
          icon: 'success',
          title: 'Signed in successfully'
        });
      }).catch(function (err) {
        showError(err);
      });
    },
    registerUser: function registerUser() {
      var _this2 = this;

      if (this.register_password !== this.register_password_confirm) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Make sure you input the same password'
        });
      } else {
        var obj = {
          email: this.register_email,
          password: this.register_password
        };
        axios({
          method: 'POST',
          url: base_url + '/register',
          data: obj
        }).then(function () {
          _this2.reset();

          _this2.page = 'login';
        }).catch(function (err) {
          showError(err);
        });
      }
    },
    logOutUser: function logOutUser() {
      localStorage.removeItem('token');
      this.reset();
      this.page = 'login';
      var Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: function onOpen(toast) {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
      });
      Toast.fire({
        icon: 'success',
        title: 'Log out successfully'
      });
    },
    getAllTask: function getAllTask() {
      var _this3 = this;

      axios({
        method: 'GET',
        url: base_url + '/tasks',
        headers: {
          token: localStorage.getItem('token')
        }
      }).then(function (_ref2) {
        var data = _ref2.data;
        _this3.task = [];
        data.forEach(function (x) {
          _this3.task.push(x);
        });
      }).catch(function (err) {
        showError(err);
      });
    },
    deleteData: function deleteData(id) {
      var _this4 = this;

      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(function (result) {
        if (result.value) {
          axios({
            method: 'DELETE',
            url: base_url + "/tasks/".concat(id),
            headers: {
              token: localStorage.getItem('token')
            }
          }).then(function () {
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');

            _this4.reset();

            _this4.mainPage();
          }).catch(function (err) {
            showError(err);
          });
        }
      });
    },
    createTask: function createTask() {
      var _this5 = this;

      var obj = {
        title: this.task_title,
        description: this.task_description,
        category: this.task_category
      };
      axios({
        method: 'POST',
        url: base_url + '/tasks',
        headers: {
          token: localStorage.getItem('token')
        },
        data: obj
      }).then(function () {
        _this5.reset();

        _this5.mainPage();
      }).catch(function (err) {
        showError(err);
      });
    },
    editDataForm: function editDataForm(id) {
      var _this6 = this;

      axios({
        method: 'GET',
        url: base_url + "/tasks/".concat(id),
        headers: {
          token: localStorage.getItem('token')
        }
      }).then(function (_ref3) {
        var data = _ref3.data;
        _this6.edit_title = data.title;
        _this6.edit_description = data.description;
        _this6.edit_category = data.category;
        _this6.edit_id = data.id;
        _this6.page = 'edit-task';
      }).catch(function (err) {
        showError(err);
      });
    },
    editData: function editData() {
      var _this7 = this;

      var obj = {
        title: this.edit_title,
        description: this.edit_description,
        category: this.edit_category
      };
      axios({
        method: 'PUT',
        url: base_url + "/tasks/".concat(this.edit_id),
        headers: {
          token: localStorage.getItem('token')
        },
        data: obj
      }).then(function () {
        _this7.reset();

        _this7.mainPage();
      }).catch(function (err) {
        showError(err);
      });
    }
  }
});
},{}],"../../../../../../usr/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "37565" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../usr/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.js.map