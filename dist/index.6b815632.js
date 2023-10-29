// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
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
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"gmymv":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "0cf78e626b815632";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws;
    try {
        ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === "undefined" ? typeof chrome === "undefined" ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        if (e.message) console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"kuM8f":[function(require,module,exports) {
var _graphTypes = require("./scripts/graph_types");
var _mazeGenerator = require("./scripts/maze_generator");
var _runBFS = require("./scripts/runBFS");
var _runDjikstra = require("./scripts/runDjikstra");
var _visualizer = require("./scripts/visualizer");
const appElement = document.getElementById("app");
const graph = (0, _visualizer.createGridGraph)(new (0, _graphTypes.Graph)("grid", false, false));
appElement.appendChild(graph.element);
const mazeGenButton = document.getElementById("maze-gen-button");
const sourceInput = document.getElementById("sourceInput");
const targetInput = document.getElementById("targetInput");
const bfsForm = document.getElementById("bfsForm");
const BfsButton = document.getElementById("bfs-button");
const DjikstraButton = document.getElementById("djiksta-button");
const randomCostsButton = document.getElementById("random-costs-button");
mazeGenButton.addEventListener("click", (event)=>{
    (0, _mazeGenerator.maze_generator)(graph);
});
randomCostsButton.addEventListener("click", (event)=>{
    graph.setRandomCosts(100);
});
bfsForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    if (graph.running) return;
    if (document.activeElement == BfsButton) (0, _runBFS.runBFS)(graph, sourceInput.valueAsNumber, targetInput.valueAsNumber);
    if (document.activeElement == DjikstraButton) (0, _runDjikstra.runDjikstra)(graph, sourceInput.valueAsNumber, targetInput.valueAsNumber);
});

},{"./scripts/graph_types":"dZefn","./scripts/maze_generator":"eHAKW","./scripts/runBFS":"fMMZy","./scripts/runDjikstra":"aGzBc","./scripts/visualizer":"fQQhX"}],"dZefn":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "retrivePath", ()=>retrivePath);
parcelHelpers.export(exports, "Node", ()=>Node);
//EVERYTHING WORKS WITH 0 INDEXATION;
parcelHelpers.export(exports, "Graph", ()=>Graph);
var _visualizer = require("./visualizer");
var _constants = require("./constants");
var _utils = require("./utils");
function retrivePath(par, sourceId, targetId) {
    const path = [];
    let curr = targetId;
    path.push(curr);
    while(curr != sourceId){
        curr = par[curr];
        path.push(curr);
    }
    path.reverse();
    return path;
}
class Edge {
    constructor(to, weight = 1){
        this.to = to;
        this.weight = weight;
    }
}
class Node {
    constructor(id){
        //this.element = document.createElement("span");
        //this.element.id = id.toString();
        //this.element.textContent = id.toString();
        this.adjList = [];
        this.inDegree = 0;
        this.outDegree = 0;
        this.id = id;
        this.wall = false;
        this.visited = false;
        this.distance = (0, _constants.INF);
    }
}
class Graph {
    constructor(type = "grid", directed = false, weighted = false){
        this.id_node = [];
        this.weighted = weighted;
        this.directed = directed;
        this.size = 0;
        this.type = type;
        this._clicked = null;
        this.running = false;
        this.status = "not-wall";
        const element = document.createElement("div");
        element.classList.add("graph");
        this.element = element;
        this.clean();
    }
    addNode(id) {
        this.id_node[id] = new Node(id);
        this.size++;
    }
    addEdge(nodeA, nodeB, w = 1) {
        //Adds a node to the graph;
        if (this.weighted === false) w = 1;
        this.id_node[nodeA].adjList.push(new Edge(nodeB, w));
        this.id_node[nodeA].outDegree++;
        this.id_node[nodeB].inDegree++;
        if (!this.directed) {
            this.id_node[nodeB].adjList.push(new Edge(nodeA, w));
            this.id_node[nodeB].outDegree++;
            this.id_node[nodeA].inDegree++;
        }
    }
    clean() {
        //Resets the every node of the graph to 0 distance and not visited;
        //sets clean to true;
        for(let i = 0; i < this.size; ++i){
            this.id_node[i].visited = false;
            this.id_node[i].distance = (0, _constants.INF);
            (0, _visualizer.printNode)(this.id_node[i], "reset");
        }
    }
    setRandomCosts(max) {
        //if(this.weighted === false)return;
        let maxSum = 0;
        for(let stringNodeIndex in this.id_node){
            const index = parseInt(stringNodeIndex);
            let average = 0;
            if (this.id_node[index].wall) continue;
            for(let stringEdgeIndex in this.id_node[index].adjList){
                const edgeIndex = parseInt(stringEdgeIndex);
                const number = (0, _utils.random)(1, max);
                average += number;
                this.id_node[index].adjList[edgeIndex].weight = number;
            //const quotient = number/max;
            //const maxColor = 240;//CHANGE;
            //const tonality = quotient * maxColor;
            //PAINT THE VERTEX IN THIS TONALITY;
            }
            maxSum = Math.max(maxSum, average);
        }
        console.log(maxSum);
        for (let node of this.id_node){
            for (let edge of node.adjList)continue;
        }
        return;
    }
    set clicked(bool) {
        this._clicked = bool;
    }
    get clicked() {
        return this._clicked;
    }
}

},{"./visualizer":"fQQhX","./constants":"fHAxD","./utils":"isRWn","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fQQhX":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
//20
//columnas
// 7
//row 2
/*
window.document
createElement("tag");
div.classList.classList
div.id;
div.style

<div class=""  id="" style="color:red;" ></div>
<p></p>
*/ parcelHelpers.export(exports, "printNode", ()=>printNode);
parcelHelpers.export(exports, "printPath", ()=>printPath);
parcelHelpers.export(exports, "paintWall", ()=>paintWall);
parcelHelpers.export(exports, "createGridGraph", ()=>createGridGraph);
// GRID_Y, GRID_Y //
parcelHelpers.export(exports, "makeGrid", ()=>makeGrid);
var _utils = require("./utils");
var _constants = require("./constants");
function printNode(vertex, type) {
    let newClass = "";
    if (type === "source") newClass = "bg-path";
    else if (type === "target") newClass = "bg-path";
    else if (type === "path") newClass = "bg-path";
    else if (type === "normal") newClass = "bg-normal";
    else {
        vertex.element.classList.remove("bg-path", "bg-normal", "bg-green");
        newClass = "bg-white-500";
    }
    vertex.element.classList.add(newClass);
    return;
}
async function printPath(graph, path) {
    let counter = 0;
    for (let id of path){
        if (counter === 0 || counter === path.length - 1) {
            counter++;
            continue;
        }
        counter++;
        printNode(graph.id_node[id], "path");
        await (0, _utils.sleep)((0, _constants.EXPANSION_SLEEP_TIME));
    }
}
function paintWall(node, alternativeColor = false, color = "white") {
    if (alternativeColor) {
        node.element.style.background = color;
        return;
    }
    if (node.wall) // true
    node.element.style.background = "black";
    else node.element.style.background = "white";
}
function createGridGraph(graph, weighted = false) {
    graph.element.style.width = (0, _constants.GRID_Y) * (0, _constants.NODE_SIZE) + "px";
    graph.element.style.height = (0, _constants.GRID_Y) * (0, _constants.NODE_SIZE) + "px";
    graph.element.style.gridTemplateColumns = `repeat(${0, _constants.GRID_Y}, 1fr)`;
    graph.element.classList.add(...`bg-black grid`.split(" "));
    for(let X = 0; X < (0, _constants.GRID_Y); ++X)for(let Y = 0; Y < (0, _constants.GRID_Y); ++Y){
        const id = (0, _utils.getId)(X, Y);
        graph.addNode(id);
        graph.id_node[id].element = (0, _utils.createNode)(id);
        graph.id_node[id].element.setAttribute("ondragstart", "return false;");
        graph.id_node[id].element.draggable = false;
        /*  graph.id_node[id].element.textContent = id.toString(); */ /*  graph.id_node[id].element.addEventListener(
                "mouseenter",
                (event) => {
                    if (graph.clicked !== null) {
                        graph.clicked = id;
                        graph.id_node[id].wall =
                            graph.status === "wall" ? true : false;
                        paintWall(graph.id_node[id]);
                    }
                }
            ); */ graph.element.appendChild(graph.id_node[id].element);
    }
    graph.element.addEventListener("mousedown", (event)=>{
        const target = event.target;
        const id = parseInt(target.id);
        if (target !== graph.element) {
            graph.clicked = id;
            graph.status = graph.id_node[id].wall ? "not-wall" : "wall";
            graph.id_node[id].wall = !graph.id_node[id].wall;
            paintWall(graph.id_node[id]);
        }
    });
    graph.element.addEventListener("mousemove", (event)=>{
        if (graph.clicked !== null) {
            const target = (0, _utils.getGridItemByPosition)(event.x, event.y);
            console.log("true");
            if (target) {
                const id = parseInt(target.id);
                if (id !== graph.clicked) {
                    //last clicked
                    graph.id_node[id].wall = graph.status === "wall" ? true : false;
                    paintWall(graph.id_node[id]);
                    graph.clicked = id;
                }
            }
        }
    });
    graph.element.addEventListener("mouseup", (event)=>{
        graph.clicked = null;
    });
    const adder = [
        [
            1,
            0
        ],
        [
            0,
            1
        ],
        [
            -1,
            0
        ],
        [
            0,
            -1
        ]
    ];
    for(let X = 0; X < (0, _constants.GRID_Y); ++X)for(let Y = 0; Y < (0, _constants.GRID_Y); ++Y){
        const id = (0, _utils.getId)(X, Y);
        for (let add of adder){
            if (!(0, _utils.inGrid)(X + add[0], Y + add[1])) continue;
            const newId = (0, _utils.getId)(X + add[0], Y + add[1]);
            if (weighted) {
                const w = 1; //GENERATE RANDOM NUMBER;
                graph.addEdge(id, newId);
            } else graph.addEdge(id, newId);
        }
    }
    return graph;
}
let i = 0;
function makeGrid(graph) {
    if (i === 0) {
        document.body.appendChild(graph.element);
        i = 1;
    }
}

},{"./utils":"isRWn","./constants":"fHAxD","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"isRWn":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "createElement", ()=>createElement);
parcelHelpers.export(exports, "getCoords", ()=>getCoords);
parcelHelpers.export(exports, "getId", ()=>getId);
parcelHelpers.export(exports, "inGrid", ()=>inGrid);
parcelHelpers.export(exports, "createNode", ()=>createNode);
parcelHelpers.export(exports, "sleep", ()=>sleep);
parcelHelpers.export(exports, "getGridItemByPosition", ()=>getGridItemByPosition);
parcelHelpers.export(exports, "random", ()=>random);
parcelHelpers.export(exports, "valid", ()=>valid);
//might be buggy
parcelHelpers.export(exports, "randomGraphGenerator", ()=>randomGraphGenerator);
var _constants = require("./constants");
var _graphTypes = require("./graph_types");
function createElement(tag, { className, id = null }) {
    const element = document.createElement(tag);
    element.classList.add(...className.split(" "));
    if (id) element.id = id;
    return element;
}
function getCoords(id) {
    return [
        Math.floor(id / (0, _constants.GRID_Y)),
        id % (0, _constants.GRID_Y)
    ];
}
function getId(x, y) {
    return y + x * (0, _constants.GRID_Y);
}
function inGrid(x, y) {
    if (x >= 0 && x < (0, _constants.GRID_Y) && y >= 0 && y < (0, _constants.GRID_Y)) return true;
    return false;
}
function createNode(id) {
    const element = createElement("div", {
        className: "border-2 border-black pointer bg-white",
        id: id
    });
    element.style.width = (0, _constants.NODE_SIZE) + "px";
    element.style.height = (0, _constants.NODE_SIZE) + "px";
    return element;
}
function sleep(ms) {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve("resolved");
        }, ms);
    });
}
function getGridItemByPosition(x, y) {
    /*     const { x: graphX, y: graphY } = graph.element.getBoundingClientRect();
    const [x, y] = getCoords(id); */ const element = document.elementFromPoint(x, y);
    return element;
}
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function valid(x, y) {
    if (0 <= x && x < (0, _constants.GRID_X) && 0 <= y && y < (0, _constants.GRID_Y)) return true;
    else return false;
}
function randomGraphGenerator(size, numberOfEdges, directed = true, weighted = false, maxNodeDegree = 5) {
    const graph = new (0, _graphTypes.Graph)("graph", directed, weighted);
    for(let id = 0; id < size; ++id){
        graph.addNode(id);
        graph.id_node[id].element = createNode(id);
        graph.id_node[id].element.setAttribute("ondragstart", "return false;");
        graph.id_node[id].element.draggable = false;
        graph.element.appendChild(graph.id_node[id].element);
    }
    let iterations = 10000;
    for(let i = 0; i < numberOfEdges && iterations > 0; ++i){
        iterations--;
        const sId = random(0, size - 1);
        let tId = sId;
        while(tId === sId)tId = random(0, size - 1);
        if (graph.id_node[tId].inDegree >= maxNodeDegree || graph.id_node[sId].outDegree >= maxNodeDegree) {
            i--;
            continue;
        } else {
            let w = 1;
            if (weighted) w = random(1, 50);
            graph.addEdge(sId, tId, w);
        }
    }
    return graph;
}

},{"./constants":"fHAxD","./graph_types":"dZefn","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fHAxD":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "GRID_X", ()=>GRID_X);
parcelHelpers.export(exports, "GRID_Y", ()=>GRID_Y);
parcelHelpers.export(exports, "NODE_SIZE", ()=>NODE_SIZE);
parcelHelpers.export(exports, "EXPANSION_SLEEP_TIME", ()=>EXPANSION_SLEEP_TIME);
parcelHelpers.export(exports, "INF", ()=>INF);
parcelHelpers.export(exports, "MAZE_GEN_TIME", ()=>MAZE_GEN_TIME);
const GRID_X = 50;
const GRID_Y = 50;
const NODE_SIZE = 10;
const EXPANSION_SLEEP_TIME = 100;
const INF = 8007199254740991; //normal intmax
const MAZE_GEN_TIME = 10;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"eHAKW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "maze_generator", ()=>maze_generator);
var _utils = require("./utils");
var _visualizer = require("./visualizer");
var _constants = require("./constants");
function generate(x, y) {
    const adder = [
        [
            2,
            0
        ],
        [
            0,
            2
        ],
        [
            -2,
            0
        ],
        [
            0,
            -2
        ]
    ];
    let res = [];
    const checker = [
        false,
        false,
        false,
        false
    ];
    let randomPer = [];
    let counter = 0;
    while(counter != 4){
        let a = (0, _utils.random)(0, 3);
        if (!checker[a]) {
            checker[a] = true;
            counter++;
            randomPer.push(a);
        }
    }
    for (let index of randomPer)if ((0, _utils.valid)(x + adder[index][0], y + adder[index][1])) res.push([
        adder[index][0],
        adder[index][1]
    ]);
    return res;
}
function delWall(graph, x, y, alternative = false, color = "blue") {
    if (!alternative) graph.id_node[(0, _utils.getId)(x, y)].wall = false;
    (0, _visualizer.paintWall)(graph.id_node[(0, _utils.getId)(x, y)], alternative, color);
}
async function dfs(graph, x, y, cool = false) {
    graph.id_node[(0, _utils.getId)(x, y)].visited = true;
    if (!cool) {
        await (0, _utils.sleep)((0, _constants.MAZE_GEN_TIME));
        delWall(graph, x, y, true, "blue");
    }
    for (let add of generate(x, y))if (!graph.id_node[(0, _utils.getId)(x + add[0], y + add[1])].visited) {
        if (!cool) {
            await (0, _utils.sleep)((0, _constants.MAZE_GEN_TIME));
            delWall(graph, x + add[0] / 2, y + add[1] / 2, true, "blue");
        }
        await dfs(graph, x + add[0], y + add[1]);
        await (0, _utils.sleep)((0, _constants.MAZE_GEN_TIME));
        delWall(graph, x + add[0] / 2, y + add[1] / 2);
    }
    await (0, _utils.sleep)((0, _constants.MAZE_GEN_TIME));
    delWall(graph, x, y);
}
async function maze_generator(graph) {
    graph.clean();
    let wall = [];
    for(let i = 0; i < (0, _constants.GRID_X); ++i){
        let row = new Array();
        for(let j = 0; j < (0, _constants.GRID_Y); ++j){
            graph.id_node[(0, _utils.getId)(i, j)].wall = true;
            (0, _visualizer.paintWall)(graph.id_node[(0, _utils.getId)(i, j)]);
            if (j % 2 == 1 || i % 2 == 1) row.push(true);
            else row.push(false);
        }
        wall.push(row);
    }
    let sX = 1;
    let sY = 1;
    while(wall[sX][sY]){
        sX = (0, _utils.random)(0, (0, _constants.GRID_X) - 1);
        sY = (0, _utils.random)(0, (0, _constants.GRID_Y) - 1);
    }
    dfs(graph, sX, sY);
}

},{"./utils":"isRWn","./visualizer":"fQQhX","./constants":"fHAxD","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fMMZy":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "runBFS", ()=>runBFS);
var _datastructures = require("./datastructures");
var _graphTypes = require("./graph_types");
var _utils = require("./utils");
var _visualizer = require("./visualizer");
var _constants = require("./constants");
async function runBFS(graph, sourceId, targetId) {
    graph.clean();
    graph.running = true;
    const q = new (0, _datastructures.Queue)();
    const q2 = new (0, _datastructures.Queue)();
    q.push(sourceId);
    q2.push(0);
    graph.id_node[sourceId].distance = 0;
    graph.id_node[sourceId].visited = true;
    let found = false;
    let par = [];
    for (let node of graph.id_node)par[node.id] = node.id;
    (0, _visualizer.printNode)(graph.id_node[sourceId], "source");
    (0, _visualizer.printNode)(graph.id_node[targetId], "target");
    let currentDist = 0;
    while(!q.empty()){
        let curr = q.front();
        q.pop();
        let dist = q2.front();
        q2.pop();
        if (graph.id_node[curr].wall === true) continue;
        if (currentDist != dist) {
            if (found) break;
            await (0, _utils.sleep)((0, _constants.EXPANSION_SLEEP_TIME));
            currentDist = dist;
        }
        if (curr != sourceId) (0, _visualizer.printNode)(graph.id_node[curr], "normal");
        //await sleep(100);
        for (let edge of graph.id_node[curr].adjList){
            if (graph.id_node[edge.to].visited === true || graph.id_node[edge.to].wall === true) continue;
            else {
                par[edge.to] = curr;
                graph.id_node[edge.to].distance = graph.id_node[curr].distance + 1;
                graph.id_node[edge.to].visited = true;
                q.push(edge.to);
                q2.push(graph.id_node[edge.to].distance);
                if (edge.to === targetId) found = true;
            }
        }
    }
    if (graph.id_node[targetId].distance === (0, _constants.INF)) return;
    const path = (0, _graphTypes.retrivePath)(par, sourceId, targetId);
    await (0, _visualizer.printPath)(graph, path);
    graph.running = false;
}

},{"./datastructures":"iIFDU","./graph_types":"dZefn","./utils":"isRWn","./visualizer":"fQQhX","./constants":"fHAxD","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iIFDU":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "random", ()=>random);
parcelHelpers.export(exports, "INF", ()=>INF);
parcelHelpers.export(exports, "Queue", ()=>Queue);
parcelHelpers.export(exports, "PriorityQueue", ()=>PriorityQueue);
parcelHelpers.export(exports, "Stack", ()=>Stack);
parcelHelpers.export(exports, "DSU", ()=>DSU) /*
PRIORITY QUEUE TESTER
const q = new PriorityQueue();

q.push(-1,26);
q.push(-2,34);
q.push(-6,62);
q.push(-4, 1);
for(let i=0; i<100;++i){
    q.push(-random(1,500),random(1,10000));
}

let prev = 100;
let exit = true;
while(!q.empty()){
    console.log(q.front());
    if(prev < q.front()[0]){
        exit = false;
    }
    prev = q.front()[0];
    q.pop();

}
if(exit)
console.log("EXIT");
else    
console.log("CACA");

*/ ;
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const INF = 8007199254740991; //normal intmax
class QueueItem {
    constructor(value){
        this.value = value;
        this.nextItem = undefined;
    }
}
class Queue {
    constructor(){
        this.lastItem = undefined;
        this.firstItem = undefined;
        this._size = 0;
    }
    push(value) {
        let newItem = new QueueItem(value);
        if (this._size === 0) {
            this.firstItem = newItem;
            this.lastItem = newItem;
        } else {
            this.lastItem.nextItem = newItem;
            this.lastItem = newItem;
        }
        this._size++;
    }
    front() {
        if (this._size === 0) return undefined;
        return this.firstItem.value;
    }
    pop() {
        if (this._size === 0) return undefined;
        if (this._size === 1) {
            this.firstItem = undefined;
            this.lastItem = undefined;
            this._size = 0;
        } else {
            this.firstItem = this.firstItem.nextItem;
            this._size--;
        }
    }
    size() {
        return this._size;
    }
    delete() {
        this._size = 0;
    }
    empty() {
        if (this._size === 0) return true;
        else return false;
    }
}
class HeapItem {
    constructor(value, secondValue){
        this.secondValue = secondValue;
        this.value = value;
    }
}
function swap(a, b) {
    return [
        b,
        a
    ];
}
class BinaryHeap {
    constructor(){
        this.tree = [];
        this._rootIndex = 1;
        this._lastIndex = 0;
        this._indexToAdd = 1;
    }
    getParent(index) {
        return Math.floor(index / 2);
    }
    mount(index) {
        let parentIndex = this.getParent(index);
        if (index === this._rootIndex) return;
        if (this.tree[index].value <= this.tree[parentIndex].value) return;
        else {
            [this.tree[index].secondValue, this.tree[parentIndex].secondValue] = swap(this.tree[index].secondValue, this.tree[parentIndex].secondValue);
            this.tree[index].value = this.tree[parentIndex].value ^ this.tree[index].value;
            this.tree[parentIndex].value = this.tree[parentIndex].value ^ this.tree[index].value;
            this.tree[index].value = this.tree[parentIndex].value ^ this.tree[index].value;
            this.mount(parentIndex);
        }
        return;
    }
    unmount(index) {
        if (this.tree[index * 2] === undefined && this.tree[index * 2 + 1] === undefined) return;
        if (this.tree[index * 2 + 1] === undefined) {
            if (this.tree[index].value < this.tree[index * 2].value) {
                [this.tree[index * 2].secondValue, this.tree[index].secondValue] = swap(this.tree[index * 2].secondValue, this.tree[index].secondValue);
                this.tree[index * 2].value = this.tree[index].value ^ this.tree[index * 2].value;
                this.tree[index].value = this.tree[index].value ^ this.tree[index * 2].value;
                this.tree[index * 2].value = this.tree[index].value ^ this.tree[index * 2].value;
            }
            return;
        }
        if (this.tree[index].value > Math.max(this.tree[index * 2].value, this.tree[index * 2 + 1].value)) return;
        if (this.tree[index * 2].value > this.tree[index * 2 + 1].value) {
            [this.tree[index * 2].secondValue, this.tree[index].secondValue] = swap(this.tree[index * 2].secondValue, this.tree[index].secondValue);
            this.tree[index * 2].value = this.tree[index].value ^ this.tree[index * 2].value;
            this.tree[index].value = this.tree[index].value ^ this.tree[index * 2].value;
            this.tree[index * 2].value = this.tree[index].value ^ this.tree[index * 2].value;
            this.unmount(index * 2);
        } else {
            [this.tree[index * 2 + 1].secondValue, this.tree[index].secondValue] = swap(this.tree[index * 2 + 1].secondValue, this.tree[index].secondValue);
            this.tree[index * 2 + 1].value = this.tree[index].value ^ this.tree[index * 2 + 1].value;
            this.tree[index].value = this.tree[index].value ^ this.tree[index * 2 + 1].value;
            this.tree[index * 2 + 1].value = this.tree[index].value ^ this.tree[index * 2 + 1].value;
            this.unmount(index * 2 + 1);
        }
        return;
    }
    remove(index) {
        if (this._lastIndex === 0) return;
        if (this._lastIndex === 1) {
            delete this.tree[this._lastIndex];
            this._lastIndex--;
            this._indexToAdd--;
            return;
        }
        [this.tree[index].secondValue, this.tree[this._lastIndex].secondValue] = swap(this.tree[index].secondValue, this.tree[this._lastIndex].secondValue);
        this.tree[index].value = this.tree[index].value ^ this.tree[this._lastIndex].value;
        this.tree[this._lastIndex].value = this.tree[index].value ^ this.tree[this._lastIndex].value;
        this.tree[index].value = this.tree[index].value ^ this.tree[this._lastIndex].value;
        delete this.tree[this._lastIndex];
        this._lastIndex--;
        this._indexToAdd--;
        this.unmount(index);
    }
    insert(value, secondValue) {
        this.tree[this._indexToAdd] = new HeapItem(value, secondValue);
        this.mount(this._indexToAdd);
        this._indexToAdd++;
        this._lastIndex++;
    }
    rootIndex() {
        return this._rootIndex;
    }
    rootValue() {
        return this.tree[this._rootIndex].value;
    }
    rootSecondValue() {
        return this.tree[this._rootIndex].secondValue;
    }
    lastIndex() {
        return this._lastIndex;
    }
}
class PriorityQueue {
    constructor(){
        this.Heap = new BinaryHeap();
        this._size = 0;
    }
    push(value, secondValue) {
        this.Heap.insert(value, secondValue);
        this._size++;
    }
    pop() {
        if (this._size === 0) return;
        this.Heap.remove(this.Heap.rootIndex());
        this._size--;
    }
    front() {
        if (this._size === 0) return undefined;
        return [
            this.Heap.rootValue(),
            this.Heap.rootSecondValue()
        ];
    }
    empty() {
        if (this._size === 0) return true;
        else return false;
    }
    size() {
        return this._size;
    }
}
class StackItem {
    constructor(item){
        this.items = [];
        this.value = item;
    }
}
class Stack {
    constructor(){
        this.array = [];
        this._size = 0;
    }
    push(item, ...values) {
        this.array.push(new StackItem(item));
        this.array[this._size].items = values;
        this._size++;
    }
    pop() {
        if (this._size === 0) return;
        this.array.pop();
        this._size--;
    }
    top() {
        if (this._size === 0) return undefined;
        return this.array[this._size - 1];
    }
    empty() {
        if (this._size === 0) return false;
        else return true;
    }
    size() {
        return this._size;
    }
}
class DSU {
    constructor(n){
        for(let i = 0; i < n + 10; ++i)this.par[i] = i;
    }
    find(i) {
        if (this.par[i] === i) return i;
        else return this.par[i] = this.find(this.par[i]);
    }
    add(i, j) {
        this.par[this.find(j)] = this.find(i);
    }
    checkSame(i, j) {
        if (this.find(i) === this.find(j)) return true;
        else return false;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aGzBc":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "runDjikstra", ()=>runDjikstra);
var _datastructures = require("./datastructures");
var _graphTypes = require("./graph_types");
var _constants = require("./constants");
var _visualizer = require("./visualizer");
var _utils = require("./utils");
async function runDjikstra(graph, sourceId, targetId) {
    graph.clean();
    graph.running = true;
    //graph.setRandomCosts(100);
    /*if(!graph.weighted){
        runBFS(graph, sourceId, targetId);
        return;
    }
    */ (0, _visualizer.printNode)(graph.id_node[sourceId], "source");
    (0, _visualizer.printNode)(graph.id_node[targetId], "target");
    const q = new (0, _datastructures.PriorityQueue)();
    q.push(0, sourceId);
    graph.id_node[sourceId].distance = 0;
    let par = [];
    for (let node of graph.id_node)par[node.id] = node.id;
    while(!q.empty()){
        let curr, cost;
        [cost, curr] = q.front();
        if (curr === targetId) break;
        await (0, _utils.sleep)((0, _constants.EXPANSION_SLEEP_TIME) / 10);
        if (curr != sourceId || curr != targetId) (0, _visualizer.printNode)(graph.id_node[curr], "normal");
        cost = Math.abs(cost);
        q.pop();
        if (graph.id_node[curr].distance != cost || graph.id_node[curr].wall) continue;
        for (let edge of graph.id_node[curr].adjList){
            if (graph.id_node[edge.to].wall === true) continue;
            if (cost + edge.weight < graph.id_node[edge.to].distance) {
                graph.id_node[edge.to].distance = cost + edge.weight;
                par[edge.to] = curr;
                q.push(-graph.id_node[edge.to].distance, edge.to);
            }
        }
    }
    if (graph.id_node[targetId].distance === (0, _constants.INF)) return;
    const path = (0, _graphTypes.retrivePath)(par, sourceId, targetId);
    await (0, _visualizer.printPath)(graph, path);
    graph.running = false;
}

},{"./datastructures":"iIFDU","./graph_types":"dZefn","./constants":"fHAxD","./visualizer":"fQQhX","./utils":"isRWn","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["gmymv","kuM8f"], "kuM8f", "parcelRequire7212")

//# sourceMappingURL=index.6b815632.js.map
