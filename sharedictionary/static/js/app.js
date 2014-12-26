var requirejs, require, define;
(function(global) {
    function isFunction(e) {
        return ostring.call(e) === "[object Function]"
    }

    function isArray(e) {
        return ostring.call(e) === "[object Array]"
    }

    function each(e, t) {
        if (e) {
            var n;
            for (n = 0; n < e.length; n += 1)
                if (e[n] && t(e[n], n, e)) break
        }
    }

    function eachReverse(e, t) {
        if (e) {
            var n;
            for (n = e.length - 1; n > -1; n -= 1)
                if (e[n] && t(e[n], n, e)) break
        }
    }

    function hasProp(e, t) {
        return hasOwn.call(e, t)
    }

    function getOwn(e, t) {
        return hasProp(e, t) && e[t]
    }

    function eachProp(e, t) {
        var n;
        for (n in e)
            if (hasProp(e, n) && t(e[n], n)) break
    }

    function mixin(e, t, n, r) {
        return t && eachProp(t, function(t, i) {
            if (n || !hasProp(e, i)) r && typeof t == "object" && t && !isArray(t) && !isFunction(t) && !(t instanceof RegExp) ? (e[i] || (e[i] = {}), mixin(e[i], t, n, r)) : e[i] = t
        }), e
    }

    function bind(e, t) {
        return function() {
            return t.apply(e, arguments)
        }
    }

    function scripts() {
        return document.getElementsByTagName("script")
    }

    function defaultOnError(e) {
        throw e
    }

    function getGlobal(e) {
        if (!e) return e;
        var t = global;
        return each(e.split("."), function(e) {
            t = t[e]
        }), t
    }

    function makeError(e, t, n, r) {
        var i = new Error(t + "\nhttp://requirejs.org/docs/errors.html#" + e);
        return i.requireType = e, i.requireModules = r, n && (i.originalError = n), i
    }

    function newContext(e) {
        function m(e) {
            var t, n, r = e.length;
            for (t = 0; t < r; t++) {
                n = e[t];
                if (n === ".") e.splice(t, 1), t -= 1;
                else if (n === "..") {
                    if (t === 1 && (e[2] === ".." || e[0] === "..")) break;
                    t > 0 && (e.splice(t - 1, 2), t -= 2)
                }
            }
        }

        function g(e, t, n) {
            var r, i, s, u, a, f, l, c, h, p, d, v = t && t.split("/"),
                g = v,
                y = o.map,
                b = y && y["*"];
            e && e.charAt(0) === "." && (t ? (g = v.slice(0, v.length - 1), e = e.split("/"), l = e.length - 1, o.nodeIdCompat && jsSuffixRegExp.test(e[l]) && (e[l] = e[l].replace(jsSuffixRegExp, "")), e = g.concat(e), m(e), e = e.join("/")) : e.indexOf("./") === 0 && (e = e.substring(2)));
            if (n && y && (v || b)) {
                s = e.split("/");
                e: for (u = s.length; u > 0; u -= 1) {
                    f = s.slice(0, u).join("/");
                    if (v)
                        for (a = v.length; a > 0; a -= 1) {
                            i = getOwn(y, v.slice(0, a).join("/"));
                            if (i) {
                                i = getOwn(i, f);
                                if (i) {
                                    c = i, h = u;
                                    break e
                                }
                            }
                        }!p && b && getOwn(b, f) && (p = getOwn(b, f), d = u)
                }!c && p && (c = p, h = d), c && (s.splice(0, h, c), e = s.join("/"))
            }
            return r = getOwn(o.pkgs, e), r ? r : e
        }

        function y(e) {
            isBrowser && each(scripts(), function(t) {
                if (t.getAttribute("data-requiremodule") === e && t.getAttribute("data-requirecontext") === r.contextName) return t.parentNode.removeChild(t), !0
            })
        }

        function b(e) {
            var t = getOwn(o.paths, e);
            if (t && isArray(t) && t.length > 1) return t.shift(), r.require.undef(e), r.require([e]), !0
        }

        function w(e) {
            var t, n = e ? e.indexOf("!") : -1;
            return n > -1 && (t = e.substring(0, n), e = e.substring(n + 1, e.length)), [t, e]
        }

        function E(e, t, n, i) {
            var s, o, u, a, f = null,
                l = t ? t.name : null,
                h = e,
                p = !0,
                m = "";
            return e || (p = !1, e = "_@r" + (d += 1)), a = w(e), f = a[0], e = a[1], f && (f = g(f, l, i), o = getOwn(c, f)), e && (f ? o && o.normalize ? m = o.normalize(e, function(e) {
                return g(e, l, i)
            }) : m = g(e, l, i) : (m = g(e, l, i), a = w(m), f = a[0], m = a[1], n = !0, s = r.nameToUrl(m))), u = f && !o && !n ? "_unnormalized" + (v += 1) : "", {
                prefix: f,
                name: m,
                parentMap: t,
                unnormalized: !!u,
                url: s,
                originalName: h,
                isDefine: p,
                id: (f ? f + "!" + m : m) + u
            }
        }

        function S(e) {
            var t = e.id,
                n = getOwn(u, t);
            return n || (n = u[t] = new r.Module(e)), n
        }

        function x(e, t, n) {
            var r = e.id,
                i = getOwn(u, r);
            hasProp(c, r) && (!i || i.defineEmitComplete) ? t === "defined" && n(c[r]) : (i = S(e), i.error && t === "error" ? n(i.error) : i.on(t, n))
        }

        function T(e, t) {
            var n = e.requireModules,
                r = !1;
            t ? t(e) : (each(n, function(t) {
                var n = getOwn(u, t);
                n && (n.error = e, n.events.error && (r = !0, n.emit("error", e)))
            }), r || req.onError(e))
        }

        function N() {
            globalDefQueue.length && (apsp.apply(l, [l.length, 0].concat(globalDefQueue)), globalDefQueue = [])
        }

        function C(e) {
            delete u[e], delete a[e]
        }

        function k(e, t, n) {
            var r = e.map.id;
            e.error ? e.emit("error", e.error) : (t[r] = !0, each(e.depMaps, function(r, i) {
                var s = r.id,
                    o = getOwn(u, s);
                o && !e.depMatched[i] && !n[s] && (getOwn(t, s) ? (e.defineDep(i, c[s]), e.check()) : k(o, t, n))
            }), n[r] = !0)
        }

        function L() {
            var e, n, i = o.waitSeconds * 1e3,
                u = i && r.startTime + i < (new Date).getTime(),
                f = [],
                l = [],
                c = !1,
                h = !0;
            if (t) return;
            t = !0, eachProp(a, function(e) {
                var t = e.map,
                    r = t.id;
                if (!e.enabled) return;
                t.isDefine || l.push(e);
                if (!e.error)
                    if (!e.inited && u) b(r) ? (n = !0, c = !0) : (f.push(r), y(r));
                    else if (!e.inited && e.fetched && t.isDefine) {
                    c = !0;
                    if (!t.prefix) return h = !1
                }
            });
            if (u && f.length) return e = makeError("timeout", "Load timeout for modules: " + f, null, f), e.contextName = r.contextName, T(e);
            h && each(l, function(e) {
                k(e, {}, {})
            }), (!u || n) && c && (isBrowser || isWebWorker) && !s && (s = setTimeout(function() {
                s = 0, L()
            }, 50)), t = !1
        }

        function A(e) {
            hasProp(c, e[0]) || S(E(e[0], null, !0)).init(e[1], e[2])
        }

        function O(e, t, n, r) {
            e.detachEvent && !isOpera ? r && e.detachEvent(r, t) : e.removeEventListener(n, t, !1)
        }

        function M(e) {
            var t = e.currentTarget || e.srcElement;
            return O(t, r.onScriptLoad, "load", "onreadystatechange"), O(t, r.onScriptError, "error"), {
                node: t,
                id: t && t.getAttribute("data-requiremodule")
            }
        }

        function _() {
            var e;
            N();
            while (l.length) {
                e = l.shift();
                if (e[0] === null) return T(makeError("mismatch", "Mismatched anonymous define() module: " + e[e.length - 1]));
                A(e)
            }
        }
        var t, n, r, i, s, o = {
                waitSeconds: 7,
                baseUrl: "./",
                paths: {},
                bundles: {},
                pkgs: {},
                shim: {},
                config: {}
            },
            u = {},
            a = {},
            f = {},
            l = [],
            c = {},
            h = {},
            p = {},
            d = 1,
            v = 1;
        return i = {
            require: function(e) {
                return e.require ? e.require : e.require = r.makeRequire(e.map)
            },
            exports: function(e) {
                e.usingExports = !0;
                if (e.map.isDefine) return e.exports ? c[e.map.id] = e.exports : e.exports = c[e.map.id] = {}
            },
            module: function(e) {
                return e.module ? e.module : e.module = {
                    id: e.map.id,
                    uri: e.map.url,
                    config: function() {
                        return getOwn(o.config, e.map.id) || {}
                    },
                    exports: e.exports || (e.exports = {})
                }
            }
        }, n = function(e) {
            this.events = getOwn(f, e.id) || {}, this.map = e, this.shim = getOwn(o.shim, e.id), this.depExports = [], this.depMaps = [], this.depMatched = [], this.pluginMaps = {}, this.depCount = 0
        }, n.prototype = {
            init: function(e, t, n, r) {
                r = r || {};
                if (this.inited) return;
                this.factory = t, n ? this.on("error", n) : this.events.error && (n = bind(this, function(e) {
                    this.emit("error", e)
                })), this.depMaps = e && e.slice(0), this.errback = n, this.inited = !0, this.ignore = r.ignore, r.enabled || this.enabled ? this.enable() : this.check()
            },
            defineDep: function(e, t) {
                this.depMatched[e] || (this.depMatched[e] = !0, this.depCount -= 1, this.depExports[e] = t)
            },
            fetch: function() {
                if (this.fetched) return;
                this.fetched = !0, r.startTime = (new Date).getTime();
                var e = this.map;
                if (!this.shim) return e.prefix ? this.callPlugin() : this.load();
                r.makeRequire(this.map, {
                    enableBuildCallback: !0
                })(this.shim.deps || [], bind(this, function() {
                    return e.prefix ? this.callPlugin() : this.load()
                }))
            },
            load: function() {
                var e = this.map.url;
                h[e] || (h[e] = !0, r.load(this.map.id, e))
            },
            check: function() {
                if (!this.enabled || this.enabling) return;
                var e, t, n = this.map.id,
                    i = this.depExports,
                    s = this.exports,
                    o = this.factory;
                if (!this.inited) this.fetch();
                else if (this.error) this.emit("error", this.error);
                else if (!this.defining) {
                    this.defining = !0;
                    if (this.depCount < 1 && !this.defined) {
                        if (isFunction(o)) {
                            if (this.events.error && this.map.isDefine || req.onError !== defaultOnError) try {
                                s = r.execCb(n, o, i, s)
                            } catch (u) {
                                e = u
                            } else s = r.execCb(n, o, i, s);
                            this.map.isDefine && s === undefined && (t = this.module, t ? s = t.exports : this.usingExports && (s = this.exports));
                            if (e) return e.requireMap = this.map, e.requireModules = this.map.isDefine ? [this.map.id] : null, e.requireType = this.map.isDefine ? "define" : "require", T(this.error = e)
                        } else s = o;
                        this.exports = s, this.map.isDefine && !this.ignore && (c[n] = s, req.onResourceLoad && req.onResourceLoad(r, this.map, this.depMaps)), C(n), this.defined = !0
                    }
                    this.defining = !1, this.defined && !this.defineEmitted && (this.defineEmitted = !0, this.emit("defined", this.exports), this.defineEmitComplete = !0)
                }
            },
            callPlugin: function() {
                var e = this.map,
                    t = e.id,
                    n = E(e.prefix);
                this.depMaps.push(n), x(n, "defined", bind(this, function(n) {
                    var i, s, a, f = getOwn(p, this.map.id),
                        l = this.map.name,
                        c = this.map.parentMap ? this.map.parentMap.name : null,
                        h = r.makeRequire(e.parentMap, {
                            enableBuildCallback: !0
                        });
                    if (this.map.unnormalized) {
                        n.normalize && (l = n.normalize(l, function(e) {
                            return g(e, c, !0)
                        }) || ""), s = E(e.prefix + "!" + l, this.map.parentMap), x(s, "defined", bind(this, function(e) {
                            this.init([], function() {
                                return e
                            }, null, {
                                enabled: !0,
                                ignore: !0
                            })
                        })), a = getOwn(u, s.id), a && (this.depMaps.push(s), this.events.error && a.on("error", bind(this, function(e) {
                            this.emit("error", e)
                        })), a.enable());
                        return
                    }
                    if (f) {
                        this.map.url = r.nameToUrl(f), this.load();
                        return
                    }
                    i = bind(this, function(e) {
                        this.init([], function() {
                            return e
                        }, null, {
                            enabled: !0
                        })
                    }), i.error = bind(this, function(e) {
                        this.inited = !0, this.error = e, e.requireModules = [t], eachProp(u, function(e) {
                            e.map.id.indexOf(t + "_unnormalized") === 0 && C(e.map.id)
                        }), T(e)
                    }), i.fromText = bind(this, function(n, s) {
                        var u = e.name,
                            a = E(u),
                            f = useInteractive;
                        s && (n = s), f && (useInteractive = !1), S(a), hasProp(o.config, t) && (o.config[u] = o.config[t]);
                        try {
                            req.exec(n)
                        } catch (l) {
                            return T(makeError("fromtexteval", "fromText eval for " + t + " failed: " + l, l, [t]))
                        }
                        f && (useInteractive = !0), this.depMaps.push(a), r.completeLoad(u), h([u], i)
                    }), n.load(e.name, h, i, o)
                })), r.enable(n, this), this.pluginMaps[n.id] = n
            },
            enable: function() {
                a[this.map.id] = this, this.enabled = !0, this.enabling = !0, each(this.depMaps, bind(this, function(e, t) {
                    var n, s, o;
                    if (typeof e == "string") {
                        e = E(e, this.map.isDefine ? this.map : this.map.parentMap, !1, !this.skipMap), this.depMaps[t] = e, o = getOwn(i, e.id);
                        if (o) {
                            this.depExports[t] = o(this);
                            return
                        }
                        this.depCount += 1, x(e, "defined", bind(this, function(e) {
                            this.defineDep(t, e), this.check()
                        })), this.errback && x(e, "error", bind(this, this.errback))
                    }
                    n = e.id, s = u[n], !hasProp(i, n) && s && !s.enabled && r.enable(e, this)
                })), eachProp(this.pluginMaps, bind(this, function(e) {
                    var t = getOwn(u, e.id);
                    t && !t.enabled && r.enable(e, this)
                })), this.enabling = !1, this.check()
            },
            on: function(e, t) {
                var n = this.events[e];
                n || (n = this.events[e] = []), n.push(t)
            },
            emit: function(e, t) {
                each(this.events[e], function(e) {
                    e(t)
                }), e === "error" && delete this.events[e]
            }
        }, r = {
            config: o,
            contextName: e,
            registry: u,
            defined: c,
            urlFetched: h,
            defQueue: l,
            Module: n,
            makeModuleMap: E,
            nextTick: req.nextTick,
            onError: T,
            configure: function(e) {
                e.baseUrl && e.baseUrl.charAt(e.baseUrl.length - 1) !== "/" && (e.baseUrl += "/");
                var t = o.shim,
                    n = {
                        paths: !0,
                        bundles: !0,
                        config: !0,
                        map: !0
                    };
                eachProp(e, function(e, t) {
                    n[t] ? (o[t] || (o[t] = {}), mixin(o[t], e, !0, !0)) : o[t] = e
                }), e.bundles && eachProp(e.bundles, function(e, t) {
                    each(e, function(e) {
                        e !== t && (p[e] = t)
                    })
                }), e.shim && (eachProp(e.shim, function(e, n) {
                    isArray(e) && (e = {
                        deps: e
                    }), (e.exports || e.init) && !e.exportsFn && (e.exportsFn = r.makeShimExports(e)), t[n] = e
                }), o.shim = t), e.packages && each(e.packages, function(e) {
                    var t, n;
                    e = typeof e == "string" ? {
                        name: e
                    } : e, n = e.name, t = e.location, t && (o.paths[n] = e.location), o.pkgs[n] = e.name + "/" + (e.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, "")
                }), eachProp(u, function(e, t) {
                    !e.inited && !e.map.unnormalized && (e.map = E(t))
                }), (e.deps || e.callback) && r.require(e.deps || [], e.callback)
            },
            makeShimExports: function(e) {
                function t() {
                    var t;
                    return e.init && (t = e.init.apply(global, arguments)), t || e.exports && getGlobal(e.exports)
                }
                return t
            },
            makeRequire: function(t, n) {
                function s(o, a, f) {
                    var l, h, p;
                    return n.enableBuildCallback && a && isFunction(a) && (a.__requireJsBuild = !0), typeof o == "string" ? isFunction(a) ? T(makeError("requireargs", "Invalid require call"), f) : t && hasProp(i, o) ? i[o](u[t.id]) : req.get ? req.get(r, o, t, s) : (h = E(o, t, !1, !0), l = h.id, hasProp(c, l) ? c[l] : T(makeError("notloaded", 'Module name "' + l + '" has not been loaded yet for context: ' + e + (t ? "" : ". Use require([])")))) : (_(), r.nextTick(function() {
                        _(), p = S(E(null, t)), p.skipMap = n.skipMap, p.init(o, a, f, {
                            enabled: !0
                        }), L()
                    }), s)
                }
                return n = n || {}, mixin(s, {
                    isBrowser: isBrowser,
                    toUrl: function(e) {
                        var n, i = e.lastIndexOf("."),
                            s = e.split("/")[0],
                            o = s === "." || s === "..";
                        return i !== -1 && (!o || i > 1) && (n = e.substring(i, e.length), e = e.substring(0, i)), r.nameToUrl(g(e, t && t.id, !0), n, !0)
                    },
                    defined: function(e) {
                        return hasProp(c, E(e, t, !1, !0).id)
                    },
                    specified: function(e) {
                        return e = E(e, t, !1, !0).id, hasProp(c, e) || hasProp(u, e)
                    }
                }), t || (s.undef = function(e) {
                    N();
                    var n = E(e, t, !0),
                        r = getOwn(u, e);
                    y(e), delete c[e], delete h[n.url], delete f[e], eachReverse(l, function(t, n) {
                        t[0] === e && l.splice(n, 1)
                    }), r && (r.events.defined && (f[e] = r.events), C(e))
                }), s
            },
            enable: function(e) {
                var t = getOwn(u, e.id);
                t && S(e).enable()
            },
            completeLoad: function(e) {
                var t, n, r, i = getOwn(o.shim, e) || {},
                    s = i.exports;
                N();
                while (l.length) {
                    n = l.shift();
                    if (n[0] === null) {
                        n[0] = e;
                        if (t) break;
                        t = !0
                    } else n[0] === e && (t = !0);
                    A(n)
                }
                r = getOwn(u, e);
                if (!t && !hasProp(c, e) && r && !r.inited) {
                    if (o.enforceDefine && (!s || !getGlobal(s))) {
                        if (b(e)) return;
                        return T(makeError("nodefine", "No define call for " + e, null, [e]))
                    }
                    A([e, i.deps || [], i.exportsFn])
                }
                L()
            },
            nameToUrl: function(e, t, n) {
                var i, s, u, a, f, l, c, h = getOwn(o.pkgs, e);
                h && (e = h), c = getOwn(p, e);
                if (c) return r.nameToUrl(c, t, n);
                if (req.jsExtRegExp.test(e)) f = e + (t || "");
                else {
                    i = o.paths, s = e.split("/");
                    for (u = s.length; u > 0; u -= 1) {
                        a = s.slice(0, u).join("/"), l = getOwn(i, a);
                        if (l) {
                            isArray(l) && (l = l[0]), s.splice(0, u, l);
                            break
                        }
                    }
                    f = s.join("/"), f += t || (/^data\:|\?/.test(f) || n ? "" : ".js"), f = (f.charAt(0) === "/" || f.match(/^[\w\+\.\-]+:/) ? "" : o.baseUrl) + f
                }
                return o.urlArgs ? f + ((f.indexOf("?") === -1 ? "?" : "&") + o.urlArgs) : f
            },
            load: function(e, t) {
                req.load(r, e, t)
            },
            execCb: function(e, t, n, r) {
                return t.apply(r, n)
            },
            onScriptLoad: function(e) {
                if (e.type === "load" || readyRegExp.test((e.currentTarget || e.srcElement).readyState)) {
                    interactiveScript = null;
                    var t = M(e);
                    r.completeLoad(t.id)
                }
            },
            onScriptError: function(e) {
                var t = M(e);
                if (!b(t.id)) return T(makeError("scripterror", "Script error for: " + t.id, e, [t.id]))
            }
        }, r.require = r.makeRequire(), r
    }

    function getInteractiveScript() {
        return interactiveScript && interactiveScript.readyState === "interactive" ? interactiveScript : (eachReverse(scripts(), function(e) {
            if (e.readyState === "interactive") return interactiveScript = e
        }), interactiveScript)
    }
    var req, s, head, baseElement, dataMain, src, interactiveScript, currentlyAddingScript, mainScript, subPath, version = "2.1.11",
        commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,
        cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
        jsSuffixRegExp = /\.js$/,
        currDirRegExp = /^\.\//,
        op = Object.prototype,
        ostring = op.toString,
        hasOwn = op.hasOwnProperty,
        ap = Array.prototype,
        apsp = ap.splice,
        isBrowser = typeof window != "undefined" && typeof navigator != "undefined" && !!window.document,
        isWebWorker = !isBrowser && typeof importScripts != "undefined",
        readyRegExp = isBrowser && navigator.platform === "PLAYSTATION 3" ? /^complete$/ : /^(complete|loaded)$/,
        defContextName = "_",
        isOpera = typeof opera != "undefined" && opera.toString() === "[object Opera]",
        contexts = {},
        cfg = {},
        globalDefQueue = [],
        useInteractive = !1;
    if (typeof define != "undefined") return;
    if (typeof requirejs != "undefined") {
        if (isFunction(requirejs)) return;
        cfg = requirejs, requirejs = undefined
    }
    typeof require != "undefined" && !isFunction(require) && (cfg = require, require = undefined), req = requirejs = function(e, t, n, r) {
        var i, s, o = defContextName;
        return !isArray(e) && typeof e != "string" && (s = e, isArray(t) ? (e = t, t = n, n = r) : e = []), s && s.context && (o = s.context), i = getOwn(contexts, o), i || (i = contexts[o] = req.s.newContext(o)), s && i.configure(s), i.require(e, t, n)
    }, req.config = function(e) {
        return req(e)
    }, req.nextTick = typeof setTimeout != "undefined" ? function(e) {
        setTimeout(e, 4)
    } : function(e) {
        e()
    }, require || (require = req), req.version = version, req.jsExtRegExp = /^\/|:|\?|\.js$/, req.isBrowser = isBrowser, s = req.s = {
        contexts: contexts,
        newContext: newContext
    }, req({}), each(["toUrl", "undef", "defined", "specified"], function(e) {
        req[e] = function() {
            var t = contexts[defContextName];
            return t.require[e].apply(t, arguments)
        }
    }), isBrowser && (head = s.head = document.getElementsByTagName("head")[0], baseElement = document.getElementsByTagName("base")[0], baseElement && (head = s.head = baseElement.parentNode)), req.onError = defaultOnError, req.createNode = function(e, t, n) {
        var r = e.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script");
        return r.type = e.scriptType || "text/javascript", r.charset = "utf-8", r.async = !0, r
    }, req.load = function(e, t, n) {
        var r = e && e.config || {},
            i;
        if (isBrowser) return i = req.createNode(r, t, n), i.setAttribute("data-requirecontext", e.contextName), i.setAttribute("data-requiremodule", t), i.attachEvent && !(i.attachEvent.toString && i.attachEvent.toString().indexOf("[native code") < 0) && !isOpera ? (useInteractive = !0, i.attachEvent("onreadystatechange", e.onScriptLoad)) : (i.addEventListener("load", e.onScriptLoad, !1), i.addEventListener("error", e.onScriptError, !1)), i.src = n, currentlyAddingScript = i, baseElement ? head.insertBefore(i, baseElement) : head.appendChild(i), currentlyAddingScript = null, i;
        if (isWebWorker) try {
            importScripts(n), e.completeLoad(t)
        } catch (s) {
            e.onError(makeError("importscripts", "importScripts failed for " + t + " at " + n, s, [t]))
        }
    }, isBrowser && !cfg.skipDataMain && eachReverse(scripts(), function(e) {
        head || (head = e.parentNode), dataMain = e.getAttribute("data-main");
        if (dataMain) return mainScript = dataMain, cfg.baseUrl || (src = mainScript.split("/"), mainScript = src.pop(), subPath = src.length ? src.join("/") + "/" : "./", cfg.baseUrl = subPath), mainScript = mainScript.replace(jsSuffixRegExp, ""), req.jsExtRegExp.test(mainScript) && (mainScript = dataMain), cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript], !0
    }), define = function(e, t, n) {
        var r, i;
        typeof e != "string" && (n = t, t = e, e = null), isArray(t) || (n = t, t = null), !t && isFunction(n) && (t = [], n.length && (n.toString().replace(commentRegExp, "").replace(cjsRequireRegExp, function(e, n) {
            t.push(n)
        }), t = (n.length === 1 ? ["require"] : ["require", "exports", "module"]).concat(t))), useInteractive && (r = currentlyAddingScript || getInteractiveScript(), r && (e || (e = r.getAttribute("data-requiremodule")), i = contexts[r.getAttribute("data-requirecontext")])), (i ? i.defQueue : globalDefQueue).push([e, t, n])
    }, define.amd = {
        jQuery: !0
    }, req.exec = function(text) {
        return eval(text)
    }, req(cfg)
})(this), define("requireLib", function() {}),
    function(e, t) {
        typeof module == "object" && typeof module.exports == "object" ? module.exports = e.document ? t(e, !0) : function(e) {
            if (!e.document) throw new Error("jQuery requires a window with a document");
            return t(e)
        } : t(e)
    }(typeof window != "undefined" ? window : this, function(window, noGlobal) {
        function isArraylike(e) {
            var t = e.length,
                n = jQuery.type(e);
            return n === "function" || jQuery.isWindow(e) ? !1 : e.nodeType === 1 && t ? !0 : n === "array" || t === 0 || typeof t == "number" && t > 0 && t - 1 in e
        }

        function winnow(e, t, n) {
            if (jQuery.isFunction(t)) return jQuery.grep(e, function(e, r) {
                return !!t.call(e, r, e) !== n
            });
            if (t.nodeType) return jQuery.grep(e, function(e) {
                return e === t !== n
            });
            if (typeof t == "string") {
                if (risSimple.test(t)) return jQuery.filter(t, e, n);
                t = jQuery.filter(t, e)
            }
            return jQuery.grep(e, function(e) {
                return indexOf.call(t, e) >= 0 !== n
            })
        }

        function sibling(e, t) {
            while ((e = e[t]) && e.nodeType !== 1);
            return e
        }

        function createOptions(e) {
            var t = optionsCache[e] = {};
            return jQuery.each(e.match(rnotwhite) || [], function(e, n) {
                t[n] = !0
            }), t
        }

        function completed() {
            document.removeEventListener("DOMContentLoaded", completed, !1), window.removeEventListener("load", completed, !1), jQuery.ready()
        }

        function Data() {
            Object.defineProperty(this.cache = {}, 0, {
                get: function() {
                    return {}
                }
            }), this.expando = jQuery.expando + Math.random()
        }

        function dataAttr(e, t, n) {
            var r;
            if (n === undefined && e.nodeType === 1) {
                r = "data-" + t.replace(rmultiDash, "-$1").toLowerCase(), n = e.getAttribute(r);
                if (typeof n == "string") {
                    try {
                        n = n === "true" ? !0 : n === "false" ? !1 : n === "null" ? null : +n + "" === n ? +n : rbrace.test(n) ? jQuery.parseJSON(n) : n
                    } catch (i) {}
                    data_user.set(e, t, n)
                } else n = undefined
            }
            return n
        }

        function returnTrue() {
            return !0
        }

        function returnFalse() {
            return !1
        }

        function safeActiveElement() {
            try {
                return document.activeElement
            } catch (e) {}
        }

        function manipulationTarget(e, t) {
            return jQuery.nodeName(e, "table") && jQuery.nodeName(t.nodeType !== 11 ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
        }

        function disableScript(e) {
            return e.type = (e.getAttribute("type") !== null) + "/" + e.type, e
        }

        function restoreScript(e) {
            var t = rscriptTypeMasked.exec(e.type);
            return t ? e.type = t[1] : e.removeAttribute("type"), e
        }

        function setGlobalEval(e, t) {
            var n = 0,
                r = e.length;
            for (; n < r; n++) data_priv.set(e[n], "globalEval", !t || data_priv.get(t[n], "globalEval"))
        }

        function cloneCopyEvent(e, t) {
            var n, r, i, s, o, u, a, f;
            if (t.nodeType !== 1) return;
            if (data_priv.hasData(e)) {
                s = data_priv.access(e), o = data_priv.set(t, s), f = s.events;
                if (f) {
                    delete o.handle, o.events = {};
                    for (i in f)
                        for (n = 0, r = f[i].length; n < r; n++) jQuery.event.add(t, i, f[i][n])
                }
            }
            data_user.hasData(e) && (u = data_user.access(e), a = jQuery.extend({}, u), data_user.set(t, a))
        }

        function getAll(e, t) {
            var n = e.getElementsByTagName ? e.getElementsByTagName(t || "*") : e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
            return t === undefined || t && jQuery.nodeName(e, t) ? jQuery.merge([e], n) : n
        }

        function fixInput(e, t) {
            var n = t.nodeName.toLowerCase();
            if (n === "input" && rcheckableType.test(e.type)) t.checked = e.checked;
            else if (n === "input" || n === "textarea") t.defaultValue = e.defaultValue
        }

        function actualDisplay(e, t) {
            var n, r = jQuery(t.createElement(e)).appendTo(t.body),
                i = window.getDefaultComputedStyle && (n = window.getDefaultComputedStyle(r[0])) ? n.display : jQuery.css(r[0], "display");
            return r.detach(), i
        }

        function defaultDisplay(e) {
            var t = document,
                n = elemdisplay[e];
            if (!n) {
                n = actualDisplay(e, t);
                if (n === "none" || !n) iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = iframe[0].contentDocument, t.write(), t.close(), n = actualDisplay(e, t), iframe.detach();
                elemdisplay[e] = n
            }
            return n
        }

        function curCSS(e, t, n) {
            var r, i, s, o, u = e.style;
            return n = n || getStyles(e), n && (o = n.getPropertyValue(t) || n[t]), n && (o === "" && !jQuery.contains(e.ownerDocument, e) && (o = jQuery.style(e, t)), rnumnonpx.test(o) && rmargin.test(t) && (r = u.width, i = u.minWidth, s = u.maxWidth, u.minWidth = u.maxWidth = u.width = o, o = n.width, u.width = r, u.minWidth = i, u.maxWidth = s)), o !== undefined ? o + "" : o
        }

        function addGetHookIf(e, t) {
            return {
                get: function() {
                    if (e()) {
                        delete this.get;
                        return
                    }
                    return (this.get = t).apply(this, arguments)
                }
            }
        }

        function vendorPropName(e, t) {
            if (t in e) return t;
            var n = t[0].toUpperCase() + t.slice(1),
                r = t,
                i = cssPrefixes.length;
            while (i--) {
                t = cssPrefixes[i] + n;
                if (t in e) return t
            }
            return r
        }

        function setPositiveNumber(e, t, n) {
            var r = rnumsplit.exec(t);
            return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
        }

        function augmentWidthOrHeight(e, t, n, r, i) {
            var s = n === (r ? "border" : "content") ? 4 : t === "width" ? 1 : 0,
                o = 0;
            for (; s < 4; s += 2) n === "margin" && (o += jQuery.css(e, n + cssExpand[s], !0, i)), r ? (n === "content" && (o -= jQuery.css(e, "padding" + cssExpand[s], !0, i)), n !== "margin" && (o -= jQuery.css(e, "border" + cssExpand[s] + "Width", !0, i))) : (o += jQuery.css(e, "padding" + cssExpand[s], !0, i), n !== "padding" && (o += jQuery.css(e, "border" + cssExpand[s] + "Width", !0, i)));
            return o
        }

        function getWidthOrHeight(e, t, n) {
            var r = !0,
                i = t === "width" ? e.offsetWidth : e.offsetHeight,
                s = getStyles(e),
                o = jQuery.css(e, "boxSizing", !1, s) === "border-box";
            if (i <= 0 || i == null) {
                i = curCSS(e, t, s);
                if (i < 0 || i == null) i = e.style[t];
                if (rnumnonpx.test(i)) return i;
                r = o && (support.boxSizingReliable() || i === e.style[t]), i = parseFloat(i) || 0
            }
            return i + augmentWidthOrHeight(e, t, n || (o ? "border" : "content"), r, s) + "px"
        }

        function showHide(e, t) {
            var n, r, i, s = [],
                o = 0,
                u = e.length;
            for (; o < u; o++) {
                r = e[o];
                if (!r.style) continue;
                s[o] = data_priv.get(r, "olddisplay"), n = r.style.display, t ? (!s[o] && n === "none" && (r.style.display = ""), r.style.display === "" && isHidden(r) && (s[o] = data_priv.access(r, "olddisplay", defaultDisplay(r.nodeName)))) : (i = isHidden(r), (n !== "none" || !i) && data_priv.set(r, "olddisplay", i ? n : jQuery.css(r, "display")))
            }
            for (o = 0; o < u; o++) {
                r = e[o];
                if (!r.style) continue;
                if (!t || r.style.display === "none" || r.style.display === "") r.style.display = t ? s[o] || "" : "none"
            }
            return e
        }

        function Tween(e, t, n, r, i) {
            return new Tween.prototype.init(e, t, n, r, i)
        }

        function createFxNow() {
            return setTimeout(function() {
                fxNow = undefined
            }), fxNow = jQuery.now()
        }

        function genFx(e, t) {
            var n, r = 0,
                i = {
                    height: e
                };
            t = t ? 1 : 0;
            for (; r < 4; r += 2 - t) n = cssExpand[r], i["margin" + n] = i["padding" + n] = e;
            return t && (i.opacity = i.width = e), i
        }

        function createTween(e, t, n) {
            var r, i = (tweeners[t] || []).concat(tweeners["*"]),
                s = 0,
                o = i.length;
            for (; s < o; s++)
                if (r = i[s].call(n, t, e)) return r
        }

        function defaultPrefilter(e, t, n) {
            var r, i, s, o, u, a, f, l, c = this,
                h = {},
                p = e.style,
                d = e.nodeType && isHidden(e),
                v = data_priv.get(e, "fxshow");
            n.queue || (u = jQuery._queueHooks(e, "fx"), u.unqueued == null && (u.unqueued = 0, a = u.empty.fire, u.empty.fire = function() {
                u.unqueued || a()
            }), u.unqueued++, c.always(function() {
                c.always(function() {
                    u.unqueued--, jQuery.queue(e, "fx").length || u.empty.fire()
                })
            })), e.nodeType === 1 && ("height" in t || "width" in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], f = jQuery.css(e, "display"), l = f === "none" ? data_priv.get(e, "olddisplay") || defaultDisplay(e.nodeName) : f, l === "inline" && jQuery.css(e, "float") === "none" && (p.display = "inline-block")), n.overflow && (p.overflow = "hidden", c.always(function() {
                p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2]
            }));
            for (r in t) {
                i = t[r];
                if (rfxtypes.exec(i)) {
                    delete t[r], s = s || i === "toggle";
                    if (i === (d ? "hide" : "show")) {
                        if (i !== "show" || !v || v[r] === undefined) continue;
                        d = !0
                    }
                    h[r] = v && v[r] || jQuery.style(e, r)
                } else f = undefined
            }
            if (!jQuery.isEmptyObject(h)) {
                v ? "hidden" in v && (d = v.hidden) : v = data_priv.access(e, "fxshow", {}), s && (v.hidden = !d), d ? jQuery(e).show() : c.done(function() {
                    jQuery(e).hide()
                }), c.done(function() {
                    var t;
                    data_priv.remove(e, "fxshow");
                    for (t in h) jQuery.style(e, t, h[t])
                });
                for (r in h) o = createTween(d ? v[r] : 0, r, c), r in v || (v[r] = o.start, d && (o.end = o.start, o.start = r === "width" || r === "height" ? 1 : 0))
            } else(f === "none" ? defaultDisplay(e.nodeName) : f) === "inline" && (p.display = f)
        }

        function propFilter(e, t) {
            var n, r, i, s, o;
            for (n in e) {
                r = jQuery.camelCase(n), i = t[r], s = e[n], jQuery.isArray(s) && (i = s[1], s = e[n] = s[0]), n !== r && (e[r] = s, delete e[n]), o = jQuery.cssHooks[r];
                if (o && "expand" in o) {
                    s = o.expand(s), delete e[r];
                    for (n in s) n in e || (e[n] = s[n], t[n] = i)
                } else t[r] = i
            }
        }

        function Animation(e, t, n) {
            var r, i, s = 0,
                o = animationPrefilters.length,
                u = jQuery.Deferred().always(function() {
                    delete a.elem
                }),
                a = function() {
                    if (i) return !1;
                    var t = fxNow || createFxNow(),
                        n = Math.max(0, f.startTime + f.duration - t),
                        r = n / f.duration || 0,
                        s = 1 - r,
                        o = 0,
                        a = f.tweens.length;
                    for (; o < a; o++) f.tweens[o].run(s);
                    return u.notifyWith(e, [f, s, n]), s < 1 && a ? n : (u.resolveWith(e, [f]), !1)
                },
                f = u.promise({
                    elem: e,
                    props: jQuery.extend({}, t),
                    opts: jQuery.extend(!0, {
                        specialEasing: {}
                    }, n),
                    originalProperties: t,
                    originalOptions: n,
                    startTime: fxNow || createFxNow(),
                    duration: n.duration,
                    tweens: [],
                    createTween: function(t, n) {
                        var r = jQuery.Tween(e, f.opts, t, n, f.opts.specialEasing[t] || f.opts.easing);
                        return f.tweens.push(r), r
                    },
                    stop: function(t) {
                        var n = 0,
                            r = t ? f.tweens.length : 0;
                        if (i) return this;
                        i = !0;
                        for (; n < r; n++) f.tweens[n].run(1);
                        return t ? u.resolveWith(e, [f, t]) : u.rejectWith(e, [f, t]), this
                    }
                }),
                l = f.props;
            propFilter(l, f.opts.specialEasing);
            for (; s < o; s++) {
                r = animationPrefilters[s].call(f, e, l, f.opts);
                if (r) return r
            }
            return jQuery.map(l, createTween, f), jQuery.isFunction(f.opts.start) && f.opts.start.call(e, f), jQuery.fx.timer(jQuery.extend(a, {
                elem: e,
                anim: f,
                queue: f.opts.queue
            })), f.progress(f.opts.progress).done(f.opts.done, f.opts.complete).fail(f.opts.fail).always(f.opts.always)
        }

        function addToPrefiltersOrTransports(e) {
            return function(t, n) {
                typeof t != "string" && (n = t, t = "*");
                var r, i = 0,
                    s = t.toLowerCase().match(rnotwhite) || [];
                if (jQuery.isFunction(n))
                    while (r = s[i++]) r[0] === "+" ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
            }
        }

        function inspectPrefiltersOrTransports(e, t, n, r) {
            function o(u) {
                var a;
                return i[u] = !0, jQuery.each(e[u] || [], function(e, u) {
                    var f = u(t, n, r);
                    if (typeof f == "string" && !s && !i[f]) return t.dataTypes.unshift(f), o(f), !1;
                    if (s) return !(a = f)
                }), a
            }
            var i = {},
                s = e === transports;
            return o(t.dataTypes[0]) || !i["*"] && o("*")
        }

        function ajaxExtend(e, t) {
            var n, r, i = jQuery.ajaxSettings.flatOptions || {};
            for (n in t) t[n] !== undefined && ((i[n] ? e : r || (r = {}))[n] = t[n]);
            return r && jQuery.extend(!0, e, r), e
        }

        function ajaxHandleResponses(e, t, n) {
            var r, i, s, o, u = e.contents,
                a = e.dataTypes;
            while (a[0] === "*") a.shift(), r === undefined && (r = e.mimeType || t.getResponseHeader("Content-Type"));
            if (r)
                for (i in u)
                    if (u[i] && u[i].test(r)) {
                        a.unshift(i);
                        break
                    }
            if (a[0] in n) s = a[0];
            else {
                for (i in n) {
                    if (!a[0] || e.converters[i + " " + a[0]]) {
                        s = i;
                        break
                    }
                    o || (o = i)
                }
                s = s || o
            }
            if (s) return s !== a[0] && a.unshift(s), n[s]
        }

        function ajaxConvert(e, t, n, r) {
            var i, s, o, u, a, f = {},
                l = e.dataTypes.slice();
            if (l[1])
                for (o in e.converters) f[o.toLowerCase()] = e.converters[o];
            s = l.shift();
            while (s) {
                e.responseFields[s] && (n[e.responseFields[s]] = t), !a && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), a = s, s = l.shift();
                if (s)
                    if (s === "*") s = a;
                    else if (a !== "*" && a !== s) {
                    o = f[a + " " + s] || f["* " + s];
                    if (!o)
                        for (i in f) {
                            u = i.split(" ");
                            if (u[1] === s) {
                                o = f[a + " " + u[0]] || f["* " + u[0]];
                                if (o) {
                                    o === !0 ? o = f[i] : f[i] !== !0 && (s = u[0], l.unshift(u[1]));
                                    break
                                }
                            }
                        }
                    if (o !== !0)
                        if (o && e["throws"]) t = o(t);
                        else try {
                            t = o(t)
                        } catch (c) {
                            return {
                                state: "parsererror",
                                error: o ? c : "No conversion from " + a + " to " + s
                            }
                        }
                }
            }
            return {
                state: "success",
                data: t
            }
        }

        function buildParams(e, t, n, r) {
            var i;
            if (jQuery.isArray(t)) jQuery.each(t, function(t, i) {
                n || rbracket.test(e) ? r(e, i) : buildParams(e + "[" + (typeof i == "object" ? t : "") + "]", i, n, r)
            });
            else if (!n && jQuery.type(t) === "object")
                for (i in t) buildParams(e + "[" + i + "]", t[i], n, r);
            else r(e, t)
        }

        function getWindow(e) {
            return jQuery.isWindow(e) ? e : e.nodeType === 9 && e.defaultView
        }
        var arr = [],
            slice = arr.slice,
            concat = arr.concat,
            push = arr.push,
            indexOf = arr.indexOf,
            class2type = {},
            toString = class2type.toString,
            hasOwn = class2type.hasOwnProperty,
            support = {},
            document = window.document,
            version = "2.1.1",
            jQuery = function(e, t) {
                return new jQuery.fn.init(e, t)
            },
            rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            rmsPrefix = /^-ms-/,
            rdashAlpha = /-([\da-z])/gi,
            fcamelCase = function(e, t) {
                return t.toUpperCase()
            };
        jQuery.fn = jQuery.prototype = {
            jquery: version,
            constructor: jQuery,
            selector: "",
            length: 0,
            toArray: function() {
                return slice.call(this)
            },
            get: function(e) {
                return e != null ? e < 0 ? this[e + this.length] : this[e] : slice.call(this)
            },
            pushStack: function(e) {
                var t = jQuery.merge(this.constructor(), e);
                return t.prevObject = this, t.context = this.context, t
            },
            each: function(e, t) {
                return jQuery.each(this, e, t)
            },
            map: function(e) {
                return this.pushStack(jQuery.map(this, function(t, n) {
                    return e.call(t, n, t)
                }))
            },
            slice: function() {
                return this.pushStack(slice.apply(this, arguments))
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            eq: function(e) {
                var t = this.length,
                    n = +e + (e < 0 ? t : 0);
                return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
            },
            end: function() {
                return this.prevObject || this.constructor(null)
            },
            push: push,
            sort: arr.sort,
            splice: arr.splice
        }, jQuery.extend = jQuery.fn.extend = function() {
            var e, t, n, r, i, s, o = arguments[0] || {},
                u = 1,
                a = arguments.length,
                f = !1;
            typeof o == "boolean" && (f = o, o = arguments[u] || {}, u++), typeof o != "object" && !jQuery.isFunction(o) && (o = {}), u === a && (o = this, u--);
            for (; u < a; u++)
                if ((e = arguments[u]) != null)
                    for (t in e) {
                        n = o[t], r = e[t];
                        if (o === r) continue;
                        f && r && (jQuery.isPlainObject(r) || (i = jQuery.isArray(r))) ? (i ? (i = !1, s = n && jQuery.isArray(n) ? n : []) : s = n && jQuery.isPlainObject(n) ? n : {}, o[t] = jQuery.extend(f, s, r)) : r !== undefined && (o[t] = r)
                    }
                return o
        }, jQuery.extend({
            expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function(e) {
                throw new Error(e)
            },
            noop: function() {},
            isFunction: function(e) {
                return jQuery.type(e) === "function"
            },
            isArray: Array.isArray,
            isWindow: function(e) {
                return e != null && e === e.window
            },
            isNumeric: function(e) {
                return !jQuery.isArray(e) && e - parseFloat(e) >= 0
            },
            isPlainObject: function(e) {
                return jQuery.type(e) !== "object" || e.nodeType || jQuery.isWindow(e) ? !1 : e.constructor && !hasOwn.call(e.constructor.prototype, "isPrototypeOf") ? !1 : !0
            },
            isEmptyObject: function(e) {
                var t;
                for (t in e) return !1;
                return !0
            },
            type: function(e) {
                return e == null ? e + "" : typeof e == "object" || typeof e == "function" ? class2type[toString.call(e)] || "object" : typeof e
            },
            globalEval: function(code) {
                var script, indirect = eval;
                code = jQuery.trim(code), code && (code.indexOf("use strict") === 1 ? (script = document.createElement("script"), script.text = code, document.head.appendChild(script).parentNode.removeChild(script)) : indirect(code))
            },
            camelCase: function(e) {
                return e.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase)
            },
            nodeName: function(e, t) {
                return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
            },
            each: function(e, t, n) {
                var r, i = 0,
                    s = e.length,
                    o = isArraylike(e);
                if (n)
                    if (o)
                        for (; i < s; i++) {
                            r = t.apply(e[i], n);
                            if (r === !1) break
                        } else
                            for (i in e) {
                                r = t.apply(e[i], n);
                                if (r === !1) break
                            } else if (o)
                                for (; i < s; i++) {
                                    r = t.call(e[i], i, e[i]);
                                    if (r === !1) break
                                } else
                                    for (i in e) {
                                        r = t.call(e[i], i, e[i]);
                                        if (r === !1) break
                                    }
                            return e
            },
            trim: function(e) {
                return e == null ? "" : (e + "").replace(rtrim, "")
            },
            makeArray: function(e, t) {
                var n = t || [];
                return e != null && (isArraylike(Object(e)) ? jQuery.merge(n, typeof e == "string" ? [e] : e) : push.call(n, e)), n
            },
            inArray: function(e, t, n) {
                return t == null ? -1 : indexOf.call(t, e, n)
            },
            merge: function(e, t) {
                var n = +t.length,
                    r = 0,
                    i = e.length;
                for (; r < n; r++) e[i++] = t[r];
                return e.length = i, e
            },
            grep: function(e, t, n) {
                var r, i = [],
                    s = 0,
                    o = e.length,
                    u = !n;
                for (; s < o; s++) r = !t(e[s], s), r !== u && i.push(e[s]);
                return i
            },
            map: function(e, t, n) {
                var r, i = 0,
                    s = e.length,
                    o = isArraylike(e),
                    u = [];
                if (o)
                    for (; i < s; i++) r = t(e[i], i, n), r != null && u.push(r);
                else
                    for (i in e) r = t(e[i], i, n), r != null && u.push(r);
                return concat.apply([], u)
            },
            guid: 1,
            proxy: function(e, t) {
                var n, r, i;
                return typeof t == "string" && (n = e[t], t = e, e = n), jQuery.isFunction(e) ? (r = slice.call(arguments, 2), i = function() {
                    return e.apply(t || this, r.concat(slice.call(arguments)))
                }, i.guid = e.guid = e.guid || jQuery.guid++, i) : undefined
            },
            now: Date.now,
            support: support
        }), jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
            class2type["[object " + t + "]"] = t.toLowerCase()
        });
        var Sizzle = function(e) {
            function st(e, t, r, i) {
                var s, u, f, l, c, d, g, y, S, x;
                (t ? t.ownerDocument || t : E) !== p && h(t), t = t || p, r = r || [];
                if (!e || typeof e != "string") return r;
                if ((l = t.nodeType) !== 1 && l !== 9) return [];
                if (v && !i) {
                    if (s = Z.exec(e))
                        if (f = s[1]) {
                            if (l === 9) {
                                u = t.getElementById(f);
                                if (!u || !u.parentNode) return r;
                                if (u.id === f) return r.push(u), r
                            } else if (t.ownerDocument && (u = t.ownerDocument.getElementById(f)) && b(t, u) && u.id === f) return r.push(u), r
                        } else {
                            if (s[2]) return P.apply(r, t.getElementsByTagName(e)), r;
                            if ((f = s[3]) && n.getElementsByClassName && t.getElementsByClassName) return P.apply(r, t.getElementsByClassName(f)), r
                        }
                    if (n.qsa && (!m || !m.test(e))) {
                        y = g = w, S = t, x = l === 9 && e;
                        if (l === 1 && t.nodeName.toLowerCase() !== "object") {
                            d = o(e), (g = t.getAttribute("id")) ? y = g.replace(tt, "\\$&") : t.setAttribute("id", y), y = "[id='" + y + "'] ", c = d.length;
                            while (c--) d[c] = y + mt(d[c]);
                            S = et.test(e) && dt(t.parentNode) || t, x = d.join(",")
                        }
                        if (x) try {
                            return P.apply(r, S.querySelectorAll(x)), r
                        } catch (T) {} finally {
                            g || t.removeAttribute("id")
                        }
                    }
                }
                return a(e.replace(z, "$1"), t, r, i)
            }

            function ot() {
                function t(n, i) {
                    return e.push(n + " ") > r.cacheLength && delete t[e.shift()], t[n + " "] = i
                }
                var e = [];
                return t
            }

            function ut(e) {
                return e[w] = !0, e
            }

            function at(e) {
                var t = p.createElement("div");
                try {
                    return !!e(t)
                } catch (n) {
                    return !1
                } finally {
                    t.parentNode && t.parentNode.removeChild(t), t = null
                }
            }

            function ft(e, t) {
                var n = e.split("|"),
                    i = e.length;
                while (i--) r.attrHandle[n[i]] = t
            }

            function lt(e, t) {
                var n = t && e,
                    r = n && e.nodeType === 1 && t.nodeType === 1 && (~t.sourceIndex || A) - (~e.sourceIndex || A);
                if (r) return r;
                if (n)
                    while (n = n.nextSibling)
                        if (n === t) return -1;
                return e ? 1 : -1
            }

            function ct(e) {
                return function(t) {
                    var n = t.nodeName.toLowerCase();
                    return n === "input" && t.type === e
                }
            }

            function ht(e) {
                return function(t) {
                    var n = t.nodeName.toLowerCase();
                    return (n === "input" || n === "button") && t.type === e
                }
            }

            function pt(e) {
                return ut(function(t) {
                    return t = +t, ut(function(n, r) {
                        var i, s = e([], n.length, t),
                            o = s.length;
                        while (o--) n[i = s[o]] && (n[i] = !(r[i] = n[i]))
                    })
                })
            }

            function dt(e) {
                return e && typeof e.getElementsByTagName !== L && e
            }

            function vt() {}

            function mt(e) {
                var t = 0,
                    n = e.length,
                    r = "";
                for (; t < n; t++) r += e[t].value;
                return r
            }

            function gt(e, t, n) {
                var r = t.dir,
                    i = n && r === "parentNode",
                    s = x++;
                return t.first ? function(t, n, s) {
                    while (t = t[r])
                        if (t.nodeType === 1 || i) return e(t, n, s)
                } : function(t, n, o) {
                    var u, a, f = [S, s];
                    if (o) {
                        while (t = t[r])
                            if (t.nodeType === 1 || i)
                                if (e(t, n, o)) return !0
                    } else
                        while (t = t[r])
                            if (t.nodeType === 1 || i) {
                                a = t[w] || (t[w] = {});
                                if ((u = a[r]) && u[0] === S && u[1] === s) return f[2] = u[2];
                                a[r] = f;
                                if (f[2] = e(t, n, o)) return !0
                            }
                }
            }

            function yt(e) {
                return e.length > 1 ? function(t, n, r) {
                    var i = e.length;
                    while (i--)
                        if (!e[i](t, n, r)) return !1;
                    return !0
                } : e[0]
            }

            function bt(e, t, n) {
                var r = 0,
                    i = t.length;
                for (; r < i; r++) st(e, t[r], n);
                return n
            }

            function wt(e, t, n, r, i) {
                var s, o = [],
                    u = 0,
                    a = e.length,
                    f = t != null;
                for (; u < a; u++)
                    if (s = e[u])
                        if (!n || n(s, r, i)) o.push(s), f && t.push(u);
                return o
            }

            function Et(e, t, n, r, i, s) {
                return r && !r[w] && (r = Et(r)), i && !i[w] && (i = Et(i, s)), ut(function(s, o, u, a) {
                    var f, l, c, h = [],
                        p = [],
                        d = o.length,
                        v = s || bt(t || "*", u.nodeType ? [u] : u, []),
                        m = e && (s || !t) ? wt(v, h, e, u, a) : v,
                        g = n ? i || (s ? e : d || r) ? [] : o : m;
                    n && n(m, g, u, a);
                    if (r) {
                        f = wt(g, p), r(f, [], u, a), l = f.length;
                        while (l--)
                            if (c = f[l]) g[p[l]] = !(m[p[l]] = c)
                    }
                    if (s) {
                        if (i || e) {
                            if (i) {
                                f = [], l = g.length;
                                while (l--)(c = g[l]) && f.push(m[l] = c);
                                i(null, g = [], f, a)
                            }
                            l = g.length;
                            while (l--)(c = g[l]) && (f = i ? B.call(s, c) : h[l]) > -1 && (s[f] = !(o[f] = c))
                        }
                    } else g = wt(g === o ? g.splice(d, g.length) : g), i ? i(null, o, g, a) : P.apply(o, g)
                })
            }

            function St(e) {
                var t, n, i, s = e.length,
                    o = r.relative[e[0].type],
                    u = o || r.relative[" "],
                    a = o ? 1 : 0,
                    l = gt(function(e) {
                        return e === t
                    }, u, !0),
                    c = gt(function(e) {
                        return B.call(t, e) > -1
                    }, u, !0),
                    h = [function(e, n, r) {
                        return !o && (r || n !== f) || ((t = n).nodeType ? l(e, n, r) : c(e, n, r))
                    }];
                for (; a < s; a++)
                    if (n = r.relative[e[a].type]) h = [gt(yt(h), n)];
                    else {
                        n = r.filter[e[a].type].apply(null, e[a].matches);
                        if (n[w]) {
                            i = ++a;
                            for (; i < s; i++)
                                if (r.relative[e[i].type]) break;
                            return Et(a > 1 && yt(h), a > 1 && mt(e.slice(0, a - 1).concat({
                                value: e[a - 2].type === " " ? "*" : ""
                            })).replace(z, "$1"), n, a < i && St(e.slice(a, i)), i < s && St(e = e.slice(i)), i < s && mt(e))
                        }
                        h.push(n)
                    }
                return yt(h)
            }

            function xt(e, t) {
                var n = t.length > 0,
                    i = e.length > 0,
                    s = function(s, o, u, a, l) {
                        var c, h, d, v = 0,
                            m = "0",
                            g = s && [],
                            y = [],
                            b = f,
                            w = s || i && r.find.TAG("*", l),
                            E = S += b == null ? 1 : Math.random() || .1,
                            x = w.length;
                        l && (f = o !== p && o);
                        for (; m !== x && (c = w[m]) != null; m++) {
                            if (i && c) {
                                h = 0;
                                while (d = e[h++])
                                    if (d(c, o, u)) {
                                        a.push(c);
                                        break
                                    }
                                l && (S = E)
                            }
                            n && ((c = !d && c) && v--, s && g.push(c))
                        }
                        v += m;
                        if (n && m !== v) {
                            h = 0;
                            while (d = t[h++]) d(g, y, o, u);
                            if (s) {
                                if (v > 0)
                                    while (m--) !g[m] && !y[m] && (y[m] = _.call(a));
                                y = wt(y)
                            }
                            P.apply(a, y), l && !s && y.length > 0 && v + t.length > 1 && st.uniqueSort(a)
                        }
                        return l && (S = E, f = b), g
                    };
                return n ? ut(s) : s
            }
            var t, n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b, w = "sizzle" + -(new Date),
                E = e.document,
                S = 0,
                x = 0,
                T = ot(),
                N = ot(),
                C = ot(),
                k = function(e, t) {
                    return e === t && (c = !0), 0
                },
                L = typeof undefined,
                A = 1 << 31,
                O = {}.hasOwnProperty,
                M = [],
                _ = M.pop,
                D = M.push,
                P = M.push,
                H = M.slice,
                B = M.indexOf || function(e) {
                    var t = 0,
                        n = this.length;
                    for (; t < n; t++)
                        if (this[t] === e) return t;
                    return -1
                },
                j = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                F = "[\\x20\\t\\r\\n\\f]",
                I = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                q = I.replace("w", "w#"),
                R = "\\[" + F + "*(" + I + ")(?:" + F + "*([*^$|!~]?=)" + F + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + q + "))|)" + F + "*\\]",
                U = ":(" + I + ")(?:\\((" + "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" + "((?:\\\\.|[^\\\\()[\\]]|" + R + ")*)|" + ".*" + ")\\)|)",
                z = new RegExp("^" + F + "+|((?:^|[^\\\\])(?:\\\\.)*)" + F + "+$", "g"),
                W = new RegExp("^" + F + "*," + F + "*"),
                X = new RegExp("^" + F + "*([>+~]|" + F + ")" + F + "*"),
                V = new RegExp("=" + F + "*([^\\]'\"]*?)" + F + "*\\]", "g"),
                $ = new RegExp(U),
                J = new RegExp("^" + q + "$"),
                K = {
                    ID: new RegExp("^#(" + I + ")"),
                    CLASS: new RegExp("^\\.(" + I + ")"),
                    TAG: new RegExp("^(" + I.replace("w", "w*") + ")"),
                    ATTR: new RegExp("^" + R),
                    PSEUDO: new RegExp("^" + U),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + F + "*(even|odd|(([+-]|)(\\d*)n|)" + F + "*(?:([+-]|)" + F + "*(\\d+)|))" + F + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + j + ")$", "i"),
                    needsContext: new RegExp("^" + F + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + F + "*((?:-\\d)?\\d*)" + F + "*\\)|)(?=[^-]|$)", "i")
                },
                Q = /^(?:input|select|textarea|button)$/i,
                G = /^h\d$/i,
                Y = /^[^{]+\{\s*\[native \w/,
                Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                et = /[+~]/,
                tt = /'|\\/g,
                nt = new RegExp("\\\\([\\da-f]{1,6}" + F + "?|(" + F + ")|.)", "ig"),
                rt = function(e, t, n) {
                    var r = "0x" + t - 65536;
                    return r !== r || n ? t : r < 0 ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, r & 1023 | 56320)
                };
            try {
                P.apply(M = H.call(E.childNodes), E.childNodes), M[E.childNodes.length].nodeType
            } catch (it) {
                P = {
                    apply: M.length ? function(e, t) {
                        D.apply(e, H.call(t))
                    } : function(e, t) {
                        var n = e.length,
                            r = 0;
                        while (e[n++] = t[r++]);
                        e.length = n - 1
                    }
                }
            }
            n = st.support = {}, s = st.isXML = function(e) {
                var t = e && (e.ownerDocument || e).documentElement;
                return t ? t.nodeName !== "HTML" : !1
            }, h = st.setDocument = function(e) {
                var t, i = e ? e.ownerDocument || e : E,
                    o = i.defaultView;
                if (i === p || i.nodeType !== 9 || !i.documentElement) return p;
                p = i, d = i.documentElement, v = !s(i), o && o !== o.top && (o.addEventListener ? o.addEventListener("unload", function() {
                    h()
                }, !1) : o.attachEvent && o.attachEvent("onunload", function() {
                    h()
                })), n.attributes = at(function(e) {
                    return e.className = "i", !e.getAttribute("className")
                }), n.getElementsByTagName = at(function(e) {
                    return e.appendChild(i.createComment("")), !e.getElementsByTagName("*").length
                }), n.getElementsByClassName = Y.test(i.getElementsByClassName) && at(function(e) {
                    return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", e.getElementsByClassName("i").length === 2
                }), n.getById = at(function(e) {
                    return d.appendChild(e).id = w, !i.getElementsByName || !i.getElementsByName(w).length
                }), n.getById ? (r.find.ID = function(e, t) {
                    if (typeof t.getElementById !== L && v) {
                        var n = t.getElementById(e);
                        return n && n.parentNode ? [n] : []
                    }
                }, r.filter.ID = function(e) {
                    var t = e.replace(nt, rt);
                    return function(e) {
                        return e.getAttribute("id") === t
                    }
                }) : (delete r.find.ID, r.filter.ID = function(e) {
                    var t = e.replace(nt, rt);
                    return function(e) {
                        var n = typeof e.getAttributeNode !== L && e.getAttributeNode("id");
                        return n && n.value === t
                    }
                }), r.find.TAG = n.getElementsByTagName ? function(e, t) {
                    if (typeof t.getElementsByTagName !== L) return t.getElementsByTagName(e)
                } : function(e, t) {
                    var n, r = [],
                        i = 0,
                        s = t.getElementsByTagName(e);
                    if (e === "*") {
                        while (n = s[i++]) n.nodeType === 1 && r.push(n);
                        return r
                    }
                    return s
                }, r.find.CLASS = n.getElementsByClassName && function(e, t) {
                    if (typeof t.getElementsByClassName !== L && v) return t.getElementsByClassName(e)
                }, g = [], m = [];
                if (n.qsa = Y.test(i.querySelectorAll)) at(function(e) {
                    e.innerHTML = "<select msallowclip=''><option selected=''></option></select>", e.querySelectorAll("[msallowclip^='']").length && m.push("[*^$]=" + F + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || m.push("\\[" + F + "*(?:value|" + j + ")"), e.querySelectorAll(":checked").length || m.push(":checked")
                }), at(function(e) {
                    var t = i.createElement("input");
                    t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && m.push("name" + F + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || m.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), m.push(",.*:")
                });
                return (n.matchesSelector = Y.test(y = d.matches || d.webkitMatchesSelector || d.mozMatchesSelector || d.oMatchesSelector || d.msMatchesSelector)) && at(function(e) {
                    n.disconnectedMatch = y.call(e, "div"), y.call(e, "[s!='']:x"), g.push("!=", U)
                }), m = m.length && new RegExp(m.join("|")), g = g.length && new RegExp(g.join("|")), t = Y.test(d.compareDocumentPosition), b = t || Y.test(d.contains) ? function(e, t) {
                    var n = e.nodeType === 9 ? e.documentElement : e,
                        r = t && t.parentNode;
                    return e === r || !!r && r.nodeType === 1 && !!(n.contains ? n.contains(r) : e.compareDocumentPosition && e.compareDocumentPosition(r) & 16)
                } : function(e, t) {
                    if (t)
                        while (t = t.parentNode)
                            if (t === e) return !0;
                    return !1
                }, k = t ? function(e, t) {
                    if (e === t) return c = !0, 0;
                    var r = !e.compareDocumentPosition - !t.compareDocumentPosition;
                    return r ? r : (r = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, r & 1 || !n.sortDetached && t.compareDocumentPosition(e) === r ? e === i || e.ownerDocument === E && b(E, e) ? -1 : t === i || t.ownerDocument === E && b(E, t) ? 1 : l ? B.call(l, e) - B.call(l, t) : 0 : r & 4 ? -1 : 1)
                } : function(e, t) {
                    if (e === t) return c = !0, 0;
                    var n, r = 0,
                        s = e.parentNode,
                        o = t.parentNode,
                        u = [e],
                        a = [t];
                    if (!s || !o) return e === i ? -1 : t === i ? 1 : s ? -1 : o ? 1 : l ? B.call(l, e) - B.call(l, t) : 0;
                    if (s === o) return lt(e, t);
                    n = e;
                    while (n = n.parentNode) u.unshift(n);
                    n = t;
                    while (n = n.parentNode) a.unshift(n);
                    while (u[r] === a[r]) r++;
                    return r ? lt(u[r], a[r]) : u[r] === E ? -1 : a[r] === E ? 1 : 0
                }, i
            }, st.matches = function(e, t) {
                return st(e, null, null, t)
            }, st.matchesSelector = function(e, t) {
                (e.ownerDocument || e) !== p && h(e), t = t.replace(V, "='$1']");
                if (n.matchesSelector && v && (!g || !g.test(t)) && (!m || !m.test(t))) try {
                    var r = y.call(e, t);
                    if (r || n.disconnectedMatch || e.document && e.document.nodeType !== 11) return r
                } catch (i) {}
                return st(t, p, null, [e]).length > 0
            }, st.contains = function(e, t) {
                return (e.ownerDocument || e) !== p && h(e), b(e, t)
            }, st.attr = function(e, t) {
                (e.ownerDocument || e) !== p && h(e);
                var i = r.attrHandle[t.toLowerCase()],
                    s = i && O.call(r.attrHandle, t.toLowerCase()) ? i(e, t, !v) : undefined;
                return s !== undefined ? s : n.attributes || !v ? e.getAttribute(t) : (s = e.getAttributeNode(t)) && s.specified ? s.value : null
            }, st.error = function(e) {
                throw new Error("Syntax error, unrecognized expression: " + e)
            }, st.uniqueSort = function(e) {
                var t, r = [],
                    i = 0,
                    s = 0;
                c = !n.detectDuplicates, l = !n.sortStable && e.slice(0), e.sort(k);
                if (c) {
                    while (t = e[s++]) t === e[s] && (i = r.push(s));
                    while (i--) e.splice(r[i], 1)
                }
                return l = null, e
            }, i = st.getText = function(e) {
                var t, n = "",
                    r = 0,
                    s = e.nodeType;
                if (!s)
                    while (t = e[r++]) n += i(t);
                else if (s === 1 || s === 9 || s === 11) {
                    if (typeof e.textContent == "string") return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling) n += i(e)
                } else if (s === 3 || s === 4) return e.nodeValue;
                return n
            }, r = st.selectors = {
                cacheLength: 50,
                createPseudo: ut,
                match: K,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(e) {
                        return e[1] = e[1].replace(nt, rt), e[3] = (e[3] || e[4] || e[5] || "").replace(nt, rt), e[2] === "~=" && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                    },
                    CHILD: function(e) {
                        return e[1] = e[1].toLowerCase(), e[1].slice(0, 3) === "nth" ? (e[3] || st.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * (e[3] === "even" || e[3] === "odd")), e[5] = +(e[7] + e[8] || e[3] === "odd")) : e[3] && st.error(e[0]), e
                    },
                    PSEUDO: function(e) {
                        var t, n = !e[6] && e[2];
                        return K.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && $.test(n) && (t = o(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function(e) {
                        var t = e.replace(nt, rt).toLowerCase();
                        return e === "*" ? function() {
                            return !0
                        } : function(e) {
                            return e.nodeName && e.nodeName.toLowerCase() === t
                        }
                    },
                    CLASS: function(e) {
                        var t = T[e + " "];
                        return t || (t = new RegExp("(^|" + F + ")" + e + "(" + F + "|$)")) && T(e, function(e) {
                            return t.test(typeof e.className == "string" && e.className || typeof e.getAttribute !== L && e.getAttribute("class") || "")
                        })
                    },
                    ATTR: function(e, t, n) {
                        return function(r) {
                            var i = st.attr(r, e);
                            return i == null ? t === "!=" : t ? (i += "", t === "=" ? i === n : t === "!=" ? i !== n : t === "^=" ? n && i.indexOf(n) === 0 : t === "*=" ? n && i.indexOf(n) > -1 : t === "$=" ? n && i.slice(-n.length) === n : t === "~=" ? (" " + i + " ").indexOf(n) > -1 : t === "|=" ? i === n || i.slice(0, n.length + 1) === n + "-" : !1) : !0
                        }
                    },
                    CHILD: function(e, t, n, r, i) {
                        var s = e.slice(0, 3) !== "nth",
                            o = e.slice(-4) !== "last",
                            u = t === "of-type";
                        return r === 1 && i === 0 ? function(e) {
                            return !!e.parentNode
                        } : function(t, n, a) {
                            var f, l, c, h, p, d, v = s !== o ? "nextSibling" : "previousSibling",
                                m = t.parentNode,
                                g = u && t.nodeName.toLowerCase(),
                                y = !a && !u;
                            if (m) {
                                if (s) {
                                    while (v) {
                                        c = t;
                                        while (c = c[v])
                                            if (u ? c.nodeName.toLowerCase() === g : c.nodeType === 1) return !1;
                                        d = v = e === "only" && !d && "nextSibling"
                                    }
                                    return !0
                                }
                                d = [o ? m.firstChild : m.lastChild];
                                if (o && y) {
                                    l = m[w] || (m[w] = {}), f = l[e] || [], p = f[0] === S && f[1], h = f[0] === S && f[2], c = p && m.childNodes[p];
                                    while (c = ++p && c && c[v] || (h = p = 0) || d.pop())
                                        if (c.nodeType === 1 && ++h && c === t) {
                                            l[e] = [S, p, h];
                                            break
                                        }
                                } else if (y && (f = (t[w] || (t[w] = {}))[e]) && f[0] === S) h = f[1];
                                else
                                    while (c = ++p && c && c[v] || (h = p = 0) || d.pop())
                                        if ((u ? c.nodeName.toLowerCase() === g : c.nodeType === 1) && ++h) {
                                            y && ((c[w] || (c[w] = {}))[e] = [S, h]);
                                            if (c === t) break
                                        } return h -= i, h === r || h % r === 0 && h / r >= 0
                            }
                        }
                    },
                    PSEUDO: function(e, t) {
                        var n, i = r.pseudos[e] || r.setFilters[e.toLowerCase()] || st.error("unsupported pseudo: " + e);
                        return i[w] ? i(t) : i.length > 1 ? (n = [e, e, "", t], r.setFilters.hasOwnProperty(e.toLowerCase()) ? ut(function(e, n) {
                            var r, s = i(e, t),
                                o = s.length;
                            while (o--) r = B.call(e, s[o]), e[r] = !(n[r] = s[o])
                        }) : function(e) {
                            return i(e, 0, n)
                        }) : i
                    }
                },
                pseudos: {
                    not: ut(function(e) {
                        var t = [],
                            n = [],
                            r = u(e.replace(z, "$1"));
                        return r[w] ? ut(function(e, t, n, i) {
                            var s, o = r(e, null, i, []),
                                u = e.length;
                            while (u--)
                                if (s = o[u]) e[u] = !(t[u] = s)
                        }) : function(e, i, s) {
                            return t[0] = e, r(t, null, s, n), !n.pop()
                        }
                    }),
                    has: ut(function(e) {
                        return function(t) {
                            return st(e, t).length > 0
                        }
                    }),
                    contains: ut(function(e) {
                        return function(t) {
                            return (t.textContent || t.innerText || i(t)).indexOf(e) > -1
                        }
                    }),
                    lang: ut(function(e) {
                        return J.test(e || "") || st.error("unsupported lang: " + e), e = e.replace(nt, rt).toLowerCase(),
                            function(t) {
                                var n;
                                do
                                    if (n = v ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || n.indexOf(e + "-") === 0;
                                while ((t = t.parentNode) && t.nodeType === 1);
                                return !1
                            }
                    }),
                    target: function(t) {
                        var n = e.location && e.location.hash;
                        return n && n.slice(1) === t.id
                    },
                    root: function(e) {
                        return e === d
                    },
                    focus: function(e) {
                        return e === p.activeElement && (!p.hasFocus || p.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                    },
                    enabled: function(e) {
                        return e.disabled === !1
                    },
                    disabled: function(e) {
                        return e.disabled === !0
                    },
                    checked: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return t === "input" && !!e.checked || t === "option" && !!e.selected
                    },
                    selected: function(e) {
                        return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                    },
                    empty: function(e) {
                        for (e = e.firstChild; e; e = e.nextSibling)
                            if (e.nodeType < 6) return !1;
                        return !0
                    },
                    parent: function(e) {
                        return !r.pseudos.empty(e)
                    },
                    header: function(e) {
                        return G.test(e.nodeName)
                    },
                    input: function(e) {
                        return Q.test(e.nodeName)
                    },
                    button: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return t === "input" && e.type === "button" || t === "button"
                    },
                    text: function(e) {
                        var t;
                        return e.nodeName.toLowerCase() === "input" && e.type === "text" && ((t = e.getAttribute("type")) == null || t.toLowerCase() === "text")
                    },
                    first: pt(function() {
                        return [0]
                    }),
                    last: pt(function(e, t) {
                        return [t - 1]
                    }),
                    eq: pt(function(e, t, n) {
                        return [n < 0 ? n + t : n]
                    }),
                    even: pt(function(e, t) {
                        var n = 0;
                        for (; n < t; n += 2) e.push(n);
                        return e
                    }),
                    odd: pt(function(e, t) {
                        var n = 1;
                        for (; n < t; n += 2) e.push(n);
                        return e
                    }),
                    lt: pt(function(e, t, n) {
                        var r = n < 0 ? n + t : n;
                        for (; --r >= 0;) e.push(r);
                        return e
                    }),
                    gt: pt(function(e, t, n) {
                        var r = n < 0 ? n + t : n;
                        for (; ++r < t;) e.push(r);
                        return e
                    })
                }
            }, r.pseudos.nth = r.pseudos.eq;
            for (t in {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                }) r.pseudos[t] = ct(t);
            for (t in {
                    submit: !0,
                    reset: !0
                }) r.pseudos[t] = ht(t);
            return vt.prototype = r.filters = r.pseudos, r.setFilters = new vt, o = st.tokenize = function(e, t) {
                var n, i, s, o, u, a, f, l = N[e + " "];
                if (l) return t ? 0 : l.slice(0);
                u = e, a = [], f = r.preFilter;
                while (u) {
                    if (!n || (i = W.exec(u))) i && (u = u.slice(i[0].length) || u), a.push(s = []);
                    n = !1;
                    if (i = X.exec(u)) n = i.shift(), s.push({
                        value: n,
                        type: i[0].replace(z, " ")
                    }), u = u.slice(n.length);
                    for (o in r.filter)(i = K[o].exec(u)) && (!f[o] || (i = f[o](i))) && (n = i.shift(), s.push({
                        value: n,
                        type: o,
                        matches: i
                    }), u = u.slice(n.length));
                    if (!n) break
                }
                return t ? u.length : u ? st.error(e) : N(e, a).slice(0)
            }, u = st.compile = function(e, t) {
                var n, r = [],
                    i = [],
                    s = C[e + " "];
                if (!s) {
                    t || (t = o(e)), n = t.length;
                    while (n--) s = St(t[n]), s[w] ? r.push(s) : i.push(s);
                    s = C(e, xt(i, r)), s.selector = e
                }
                return s
            }, a = st.select = function(e, t, i, s) {
                var a, f, l, c, h, p = typeof e == "function" && e,
                    d = !s && o(e = p.selector || e);
                i = i || [];
                if (d.length === 1) {
                    f = d[0] = d[0].slice(0);
                    if (f.length > 2 && (l = f[0]).type === "ID" && n.getById && t.nodeType === 9 && v && r.relative[f[1].type]) {
                        t = (r.find.ID(l.matches[0].replace(nt, rt), t) || [])[0];
                        if (!t) return i;
                        p && (t = t.parentNode), e = e.slice(f.shift().value.length)
                    }
                    a = K.needsContext.test(e) ? 0 : f.length;
                    while (a--) {
                        l = f[a];
                        if (r.relative[c = l.type]) break;
                        if (h = r.find[c])
                            if (s = h(l.matches[0].replace(nt, rt), et.test(f[0].type) && dt(t.parentNode) || t)) {
                                f.splice(a, 1), e = s.length && mt(f);
                                if (!e) return P.apply(i, s), i;
                                break
                            }
                    }
                }
                return (p || u(e, d))(s, t, !v, i, et.test(e) && dt(t.parentNode) || t), i
            }, n.sortStable = w.split("").sort(k).join("") === w, n.detectDuplicates = !!c, h(), n.sortDetached = at(function(e) {
                return e.compareDocumentPosition(p.createElement("div")) & 1
            }), at(function(e) {
                return e.innerHTML = "<a href='#'></a>", e.firstChild.getAttribute("href") === "#"
            }) || ft("type|href|height|width", function(e, t, n) {
                if (!n) return e.getAttribute(t, t.toLowerCase() === "type" ? 1 : 2)
            }), (!n.attributes || !at(function(e) {
                return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), e.firstChild.getAttribute("value") === ""
            })) && ft("value", function(e, t, n) {
                if (!n && e.nodeName.toLowerCase() === "input") return e.defaultValue
            }), at(function(e) {
                return e.getAttribute("disabled") == null
            }) || ft(j, function(e, t, n) {
                var r;
                if (!n) return e[t] === !0 ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
            }), st
        }(window);
        jQuery.find = Sizzle, jQuery.expr = Sizzle.selectors, jQuery.expr[":"] = jQuery.expr.pseudos, jQuery.unique = Sizzle.uniqueSort, jQuery.text = Sizzle.getText, jQuery.isXMLDoc = Sizzle.isXML, jQuery.contains = Sizzle.contains;
        var rneedsContext = jQuery.expr.match.needsContext,
            rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
            risSimple = /^.[^:#\[\.,]*$/;
        jQuery.filter = function(e, t, n) {
            var r = t[0];
            return n && (e = ":not(" + e + ")"), t.length === 1 && r.nodeType === 1 ? jQuery.find.matchesSelector(r, e) ? [r] : [] : jQuery.find.matches(e, jQuery.grep(t, function(e) {
                return e.nodeType === 1
            }))
        }, jQuery.fn.extend({
            find: function(e) {
                var t, n = this.length,
                    r = [],
                    i = this;
                if (typeof e != "string") return this.pushStack(jQuery(e).filter(function() {
                    for (t = 0; t < n; t++)
                        if (jQuery.contains(i[t], this)) return !0
                }));
                for (t = 0; t < n; t++) jQuery.find(e, i[t], r);
                return r = this.pushStack(n > 1 ? jQuery.unique(r) : r), r.selector = this.selector ? this.selector + " " + e : e, r
            },
            filter: function(e) {
                return this.pushStack(winnow(this, e || [], !1))
            },
            not: function(e) {
                return this.pushStack(winnow(this, e || [], !0))
            },
            is: function(e) {
                return !!winnow(this, typeof e == "string" && rneedsContext.test(e) ? jQuery(e) : e || [], !1).length
            }
        });
        var rootjQuery, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
            init = jQuery.fn.init = function(e, t) {
                var n, r;
                if (!e) return this;
                if (typeof e == "string") {
                    e[0] === "<" && e[e.length - 1] === ">" && e.length >= 3 ? n = [null, e, null] : n = rquickExpr.exec(e);
                    if (n && (n[1] || !t)) {
                        if (n[1]) {
                            t = t instanceof jQuery ? t[0] : t, jQuery.merge(this, jQuery.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : document, !0));
                            if (rsingleTag.test(n[1]) && jQuery.isPlainObject(t))
                                for (n in t) jQuery.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
                            return this
                        }
                        return r = document.getElementById(n[2]), r && r.parentNode && (this.length = 1, this[0] = r), this.context = document, this.selector = e, this
                    }
                    return !t || t.jquery ? (t || rootjQuery).find(e) : this.constructor(t).find(e)
                }
                return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : jQuery.isFunction(e) ? typeof rootjQuery.ready != "undefined" ? rootjQuery.ready(e) : e(jQuery) : (e.selector !== undefined && (this.selector = e.selector, this.context = e.context), jQuery.makeArray(e, this))
            };
        init.prototype = jQuery.fn, rootjQuery = jQuery(document);
        var rparentsprev = /^(?:parents|prev(?:Until|All))/,
            guaranteedUnique = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
        jQuery.extend({
            dir: function(e, t, n) {
                var r = [],
                    i = n !== undefined;
                while ((e = e[t]) && e.nodeType !== 9)
                    if (e.nodeType === 1) {
                        if (i && jQuery(e).is(n)) break;
                        r.push(e)
                    }
                return r
            },
            sibling: function(e, t) {
                var n = [];
                for (; e; e = e.nextSibling) e.nodeType === 1 && e !== t && n.push(e);
                return n
            }
        }), jQuery.fn.extend({
            has: function(e) {
                var t = jQuery(e, this),
                    n = t.length;
                return this.filter(function() {
                    var e = 0;
                    for (; e < n; e++)
                        if (jQuery.contains(this, t[e])) return !0
                })
            },
            closest: function(e, t) {
                var n, r = 0,
                    i = this.length,
                    s = [],
                    o = rneedsContext.test(e) || typeof e != "string" ? jQuery(e, t || this.context) : 0;
                for (; r < i; r++)
                    for (n = this[r]; n && n !== t; n = n.parentNode)
                        if (n.nodeType < 11 && (o ? o.index(n) > -1 : n.nodeType === 1 && jQuery.find.matchesSelector(n, e))) {
                            s.push(n);
                            break
                        }
                return this.pushStack(s.length > 1 ? jQuery.unique(s) : s)
            },
            index: function(e) {
                return e ? typeof e == "string" ? indexOf.call(jQuery(e), this[0]) : indexOf.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            },
            add: function(e, t) {
                return this.pushStack(jQuery.unique(jQuery.merge(this.get(), jQuery(e, t))))
            },
            addBack: function(e) {
                return this.add(e == null ? this.prevObject : this.prevObject.filter(e))
            }
        }), jQuery.each({
            parent: function(e) {
                var t = e.parentNode;
                return t && t.nodeType !== 11 ? t : null
            },
            parents: function(e) {
                return jQuery.dir(e, "parentNode")
            },
            parentsUntil: function(e, t, n) {
                return jQuery.dir(e, "parentNode", n)
            },
            next: function(e) {
                return sibling(e, "nextSibling")
            },
            prev: function(e) {
                return sibling(e, "previousSibling")
            },
            nextAll: function(e) {
                return jQuery.dir(e, "nextSibling")
            },
            prevAll: function(e) {
                return jQuery.dir(e, "previousSibling")
            },
            nextUntil: function(e, t, n) {
                return jQuery.dir(e, "nextSibling", n)
            },
            prevUntil: function(e, t, n) {
                return jQuery.dir(e, "previousSibling", n)
            },
            siblings: function(e) {
                return jQuery.sibling((e.parentNode || {}).firstChild, e)
            },
            children: function(e) {
                return jQuery.sibling(e.firstChild)
            },
            contents: function(e) {
                return e.contentDocument || jQuery.merge([], e.childNodes)
            }
        }, function(e, t) {
            jQuery.fn[e] = function(n, r) {
                var i = jQuery.map(this, t, n);
                return e.slice(-5) !== "Until" && (r = n), r && typeof r == "string" && (i = jQuery.filter(r, i)), this.length > 1 && (guaranteedUnique[e] || jQuery.unique(i), rparentsprev.test(e) && i.reverse()), this.pushStack(i)
            }
        });
        var rnotwhite = /\S+/g,
            optionsCache = {};
        jQuery.Callbacks = function(e) {
            e = typeof e == "string" ? optionsCache[e] || createOptions(e) : jQuery.extend({}, e);
            var t, n, r, i, s, o, u = [],
                a = !e.once && [],
                f = function(c) {
                    t = e.memory && c, n = !0, o = i || 0, i = 0, s = u.length, r = !0;
                    for (; u && o < s; o++)
                        if (u[o].apply(c[0], c[1]) === !1 && e.stopOnFalse) {
                            t = !1;
                            break
                        }
                    r = !1, u && (a ? a.length && f(a.shift()) : t ? u = [] : l.disable())
                },
                l = {
                    add: function() {
                        if (u) {
                            var n = u.length;
                            (function o(t) {
                                jQuery.each(t, function(t, n) {
                                    var r = jQuery.type(n);
                                    r === "function" ? (!e.unique || !l.has(n)) && u.push(n) : n && n.length && r !== "string" && o(n)
                                })
                            })(arguments), r ? s = u.length : t && (i = n, f(t))
                        }
                        return this
                    },
                    remove: function() {
                        return u && jQuery.each(arguments, function(e, t) {
                            var n;
                            while ((n = jQuery.inArray(t, u, n)) > -1) u.splice(n, 1), r && (n <= s && s--, n <= o && o--)
                        }), this
                    },
                    has: function(e) {
                        return e ? jQuery.inArray(e, u) > -1 : !!u && !!u.length
                    },
                    empty: function() {
                        return u = [], s = 0, this
                    },
                    disable: function() {
                        return u = a = t = undefined, this
                    },
                    disabled: function() {
                        return !u
                    },
                    lock: function() {
                        return a = undefined, t || l.disable(), this
                    },
                    locked: function() {
                        return !a
                    },
                    fireWith: function(e, t) {
                        return u && (!n || a) && (t = t || [], t = [e, t.slice ? t.slice() : t], r ? a.push(t) : f(t)), this
                    },
                    fire: function() {
                        return l.fireWith(this, arguments), this
                    },
                    fired: function() {
                        return !!n
                    }
                };
            return l
        }, jQuery.extend({
            Deferred: function(e) {
                var t = [
                        ["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
                        ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
                        ["notify", "progress", jQuery.Callbacks("memory")]
                    ],
                    n = "pending",
                    r = {
                        state: function() {
                            return n
                        },
                        always: function() {
                            return i.done(arguments).fail(arguments), this
                        },
                        then: function() {
                            var e = arguments;
                            return jQuery.Deferred(function(n) {
                                jQuery.each(t, function(t, s) {
                                    var o = jQuery.isFunction(e[t]) && e[t];
                                    i[s[1]](function() {
                                        var e = o && o.apply(this, arguments);
                                        e && jQuery.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[s[0] + "With"](this === r ? n.promise() : this, o ? [e] : arguments)
                                    })
                                }), e = null
                            }).promise()
                        },
                        promise: function(e) {
                            return e != null ? jQuery.extend(e, r) : r
                        }
                    },
                    i = {};
                return r.pipe = r.then, jQuery.each(t, function(e, s) {
                    var o = s[2],
                        u = s[3];
                    r[s[1]] = o.add, u && o.add(function() {
                        n = u
                    }, t[e ^ 1][2].disable, t[2][2].lock), i[s[0]] = function() {
                        return i[s[0] + "With"](this === i ? r : this, arguments), this
                    }, i[s[0] + "With"] = o.fireWith
                }), r.promise(i), e && e.call(i, i), i
            },
            when: function(e) {
                var t = 0,
                    n = slice.call(arguments),
                    r = n.length,
                    i = r !== 1 || e && jQuery.isFunction(e.promise) ? r : 0,
                    s = i === 1 ? e : jQuery.Deferred(),
                    o = function(e, t, n) {
                        return function(r) {
                            t[e] = this, n[e] = arguments.length > 1 ? slice.call(arguments) : r, n === u ? s.notifyWith(t, n) : --i || s.resolveWith(t, n)
                        }
                    },
                    u, a, f;
                if (r > 1) {
                    u = new Array(r), a = new Array(r), f = new Array(r);
                    for (; t < r; t++) n[t] && jQuery.isFunction(n[t].promise) ? n[t].promise().done(o(t, f, n)).fail(s.reject).progress(o(t, a, u)) : --i
                }
                return i || s.resolveWith(f, n), s.promise()
            }
        });
        var readyList;
        jQuery.fn.ready = function(e) {
            return jQuery.ready.promise().done(e), this
        }, jQuery.extend({
            isReady: !1,
            readyWait: 1,
            holdReady: function(e) {
                e ? jQuery.readyWait++ : jQuery.ready(!0)
            },
            ready: function(e) {
                if (e === !0 ? --jQuery.readyWait : jQuery.isReady) return;
                jQuery.isReady = !0;
                if (e !== !0 && --jQuery.readyWait > 0) return;
                readyList.resolveWith(document, [jQuery]), jQuery.fn.triggerHandler && (jQuery(document).triggerHandler("ready"), jQuery(document).off("ready"))
            }
        }), jQuery.ready.promise = function(e) {
            return readyList || (readyList = jQuery.Deferred(), document.readyState === "complete" ? setTimeout(jQuery.ready) : (document.addEventListener("DOMContentLoaded", completed, !1), window.addEventListener("load", completed, !1))), readyList.promise(e)
        }, jQuery.ready.promise();
        var access = jQuery.access = function(e, t, n, r, i, s, o) {
            var u = 0,
                a = e.length,
                f = n == null;
            if (jQuery.type(n) === "object") {
                i = !0;
                for (u in n) jQuery.access(e, t, u, n[u], !0, s, o)
            } else if (r !== undefined) {
                i = !0, jQuery.isFunction(r) || (o = !0), f && (o ? (t.call(e, r), t = null) : (f = t, t = function(e, t, n) {
                    return f.call(jQuery(e), n)
                }));
                if (t)
                    for (; u < a; u++) t(e[u], n, o ? r : r.call(e[u], u, t(e[u], n)))
            }
            return i ? e : f ? t.call(e) : a ? t(e[0], n) : s
        };
        jQuery.acceptData = function(e) {
            return e.nodeType === 1 || e.nodeType === 9 || !+e.nodeType
        }, Data.uid = 1, Data.accepts = jQuery.acceptData, Data.prototype = {
            key: function(e) {
                if (!Data.accepts(e)) return 0;
                var t = {},
                    n = e[this.expando];
                if (!n) {
                    n = Data.uid++;
                    try {
                        t[this.expando] = {
                            value: n
                        }, Object.defineProperties(e, t)
                    } catch (r) {
                        t[this.expando] = n, jQuery.extend(e, t)
                    }
                }
                return this.cache[n] || (this.cache[n] = {}), n
            },
            set: function(e, t, n) {
                var r, i = this.key(e),
                    s = this.cache[i];
                if (typeof t == "string") s[t] = n;
                else if (jQuery.isEmptyObject(s)) jQuery.extend(this.cache[i], t);
                else
                    for (r in t) s[r] = t[r];
                return s
            },
            get: function(e, t) {
                var n = this.cache[this.key(e)];
                return t === undefined ? n : n[t]
            },
            access: function(e, t, n) {
                var r;
                return t === undefined || t && typeof t == "string" && n === undefined ? (r = this.get(e, t), r !== undefined ? r : this.get(e, jQuery.camelCase(t))) : (this.set(e, t, n), n !== undefined ? n : t)
            },
            remove: function(e, t) {
                var n, r, i, s = this.key(e),
                    o = this.cache[s];
                if (t === undefined) this.cache[s] = {};
                else {
                    jQuery.isArray(t) ? r = t.concat(t.map(jQuery.camelCase)) : (i = jQuery.camelCase(t), t in o ? r = [t, i] : (r = i, r = r in o ? [r] : r.match(rnotwhite) || [])), n = r.length;
                    while (n--) delete o[r[n]]
                }
            },
            hasData: function(e) {
                return !jQuery.isEmptyObject(this.cache[e[this.expando]] || {})
            },
            discard: function(e) {
                e[this.expando] && delete this.cache[e[this.expando]]
            }
        };
        var data_priv = new Data,
            data_user = new Data,
            rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            rmultiDash = /([A-Z])/g;
        jQuery.extend({
            hasData: function(e) {
                return data_user.hasData(e) || data_priv.hasData(e)
            },
            data: function(e, t, n) {
                return data_user.access(e, t, n)
            },
            removeData: function(e, t) {
                data_user.remove(e, t)
            },
            _data: function(e, t, n) {
                return data_priv.access(e, t, n)
            },
            _removeData: function(e, t) {
                data_priv.remove(e, t)
            }
        }), jQuery.fn.extend({
            data: function(e, t) {
                var n, r, i, s = this[0],
                    o = s && s.attributes;
                if (e === undefined) {
                    if (this.length) {
                        i = data_user.get(s);
                        if (s.nodeType === 1 && !data_priv.get(s, "hasDataAttrs")) {
                            n = o.length;
                            while (n--) o[n] && (r = o[n].name, r.indexOf("data-") === 0 && (r = jQuery.camelCase(r.slice(5)), dataAttr(s, r, i[r])));
                            data_priv.set(s, "hasDataAttrs", !0)
                        }
                    }
                    return i
                }
                return typeof e == "object" ? this.each(function() {
                    data_user.set(this, e)
                }) : access(this, function(t) {
                    var n, r = jQuery.camelCase(e);
                    if (s && t === undefined) {
                        n = data_user.get(s, e);
                        if (n !== undefined) return n;
                        n = data_user.get(s, r);
                        if (n !== undefined) return n;
                        n = dataAttr(s, r, undefined);
                        if (n !== undefined) return n;
                        return
                    }
                    this.each(function() {
                        var n = data_user.get(this, r);
                        data_user.set(this, r, t), e.indexOf("-") !== -1 && n !== undefined && data_user.set(this, e, t)
                    })
                }, null, t, arguments.length > 1, null, !0)
            },
            removeData: function(e) {
                return this.each(function() {
                    data_user.remove(this, e)
                })
            }
        }), jQuery.extend({
            queue: function(e, t, n) {
                var r;
                if (e) return t = (t || "fx") + "queue", r = data_priv.get(e, t), n && (!r || jQuery.isArray(n) ? r = data_priv.access(e, t, jQuery.makeArray(n)) : r.push(n)), r || []
            },
            dequeue: function(e, t) {
                t = t || "fx";
                var n = jQuery.queue(e, t),
                    r = n.length,
                    i = n.shift(),
                    s = jQuery._queueHooks(e, t),
                    o = function() {
                        jQuery.dequeue(e, t)
                    };
                i === "inprogress" && (i = n.shift(), r--), i && (t === "fx" && n.unshift("inprogress"), delete s.stop, i.call(e, o, s)), !r && s && s.empty.fire()
            },
            _queueHooks: function(e, t) {
                var n = t + "queueHooks";
                return data_priv.get(e, n) || data_priv.access(e, n, {
                    empty: jQuery.Callbacks("once memory").add(function() {
                        data_priv.remove(e, [t + "queue", n])
                    })
                })
            }
        }), jQuery.fn.extend({
            queue: function(e, t) {
                var n = 2;
                return typeof e != "string" && (t = e, e = "fx", n--), arguments.length < n ? jQuery.queue(this[0], e) : t === undefined ? this : this.each(function() {
                    var n = jQuery.queue(this, e, t);
                    jQuery._queueHooks(this, e), e === "fx" && n[0] !== "inprogress" && jQuery.dequeue(this, e)
                })
            },
            dequeue: function(e) {
                return this.each(function() {
                    jQuery.dequeue(this, e)
                })
            },
            clearQueue: function(e) {
                return this.queue(e || "fx", [])
            },
            promise: function(e, t) {
                var n, r = 1,
                    i = jQuery.Deferred(),
                    s = this,
                    o = this.length,
                    u = function() {
                        --r || i.resolveWith(s, [s])
                    };
                typeof e != "string" && (t = e, e = undefined), e = e || "fx";
                while (o--) n = data_priv.get(s[o], e + "queueHooks"), n && n.empty && (r++, n.empty.add(u));
                return u(), i.promise(t)
            }
        });
        var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            cssExpand = ["Top", "Right", "Bottom", "Left"],
            isHidden = function(e, t) {
                return e = t || e, jQuery.css(e, "display") === "none" || !jQuery.contains(e.ownerDocument, e)
            },
            rcheckableType = /^(?:checkbox|radio)$/i;
        (function() {
            var e = document.createDocumentFragment(),
                t = e.appendChild(document.createElement("div")),
                n = document.createElement("input");
            n.setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), t.appendChild(n), support.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, t.innerHTML = "<textarea>x</textarea>", support.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue
        })();
        var strundefined = typeof undefined;
        support.focusinBubbles = "onfocusin" in window;
        var rkeyEvent = /^key/,
            rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
            rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
            rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
        jQuery.event = {
            global: {},
            add: function(e, t, n, r, i) {
                var s, o, u, a, f, l, c, h, p, d, v, m = data_priv.get(e);
                if (!m) return;
                n.handler && (s = n, n = s.handler, i = s.selector), n.guid || (n.guid = jQuery.guid++), (a = m.events) || (a = m.events = {}), (o = m.handle) || (o = m.handle = function(t) {
                    return typeof jQuery !== strundefined && jQuery.event.triggered !== t.type ? jQuery.event.dispatch.apply(e, arguments) : undefined
                }), t = (t || "").match(rnotwhite) || [""], f = t.length;
                while (f--) {
                    u = rtypenamespace.exec(t[f]) || [], p = v = u[1], d = (u[2] || "").split(".").sort();
                    if (!p) continue;
                    c = jQuery.event.special[p] || {}, p = (i ? c.delegateType : c.bindType) || p, c = jQuery.event.special[p] || {}, l = jQuery.extend({
                        type: p,
                        origType: v,
                        data: r,
                        handler: n,
                        guid: n.guid,
                        selector: i,
                        needsContext: i && jQuery.expr.match.needsContext.test(i),
                        namespace: d.join(".")
                    }, s), (h = a[p]) || (h = a[p] = [], h.delegateCount = 0, (!c.setup || c.setup.call(e, r, d, o) === !1) && e.addEventListener && e.addEventListener(p, o, !1)), c.add && (c.add.call(e, l), l.handler.guid || (l.handler.guid = n.guid)), i ? h.splice(h.delegateCount++, 0, l) : h.push(l), jQuery.event.global[p] = !0
                }
            },
            remove: function(e, t, n, r, i) {
                var s, o, u, a, f, l, c, h, p, d, v, m = data_priv.hasData(e) && data_priv.get(e);
                if (!m || !(a = m.events)) return;
                t = (t || "").match(rnotwhite) || [""], f = t.length;
                while (f--) {
                    u = rtypenamespace.exec(t[f]) || [], p = v = u[1], d = (u[2] || "").split(".").sort();
                    if (!p) {
                        for (p in a) jQuery.event.remove(e, p + t[f], n, r, !0);
                        continue
                    }
                    c = jQuery.event.special[p] || {}, p = (r ? c.delegateType : c.bindType) || p, h = a[p] || [], u = u[2] && new RegExp("(^|\\.)" + d.join("\\.(?:.*\\.|)") + "(\\.|$)"), o = s = h.length;
                    while (s--) l = h[s], (i || v === l.origType) && (!n || n.guid === l.guid) && (!u || u.test(l.namespace)) && (!r || r === l.selector || r === "**" && l.selector) && (h.splice(s, 1), l.selector && h.delegateCount--, c.remove && c.remove.call(e, l));
                    o && !h.length && ((!c.teardown || c.teardown.call(e, d, m.handle) === !1) && jQuery.removeEvent(e, p, m.handle), delete a[p])
                }
                jQuery.isEmptyObject(a) && (delete m.handle, data_priv.remove(e, "events"))
            },
            trigger: function(e, t, n, r) {
                var i, s, o, u, a, f, l, c = [n || document],
                    h = hasOwn.call(e, "type") ? e.type : e,
                    p = hasOwn.call(e, "namespace") ? e.namespace.split(".") : [];
                s = o = n = n || document;
                if (n.nodeType === 3 || n.nodeType === 8) return;
                if (rfocusMorph.test(h + jQuery.event.triggered)) return;
                h.indexOf(".") >= 0 && (p = h.split("."), h = p.shift(), p.sort()), a = h.indexOf(":") < 0 && "on" + h, e = e[jQuery.expando] ? e : new jQuery.Event(h, typeof e == "object" && e), e.isTrigger = r ? 2 : 3, e.namespace = p.join("."), e.namespace_re = e.namespace ? new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = undefined, e.target || (e.target = n), t = t == null ? [e] : jQuery.makeArray(t, [e]), l = jQuery.event.special[h] || {};
                if (!r && l.trigger && l.trigger.apply(n, t) === !1) return;
                if (!r && !l.noBubble && !jQuery.isWindow(n)) {
                    u = l.delegateType || h, rfocusMorph.test(u + h) || (s = s.parentNode);
                    for (; s; s = s.parentNode) c.push(s), o = s;
                    o === (n.ownerDocument || document) && c.push(o.defaultView || o.parentWindow || window)
                }
                i = 0;
                while ((s = c[i++]) && !e.isPropagationStopped()) e.type = i > 1 ? u : l.bindType || h, f = (data_priv.get(s, "events") || {})[e.type] && data_priv.get(s, "handle"), f && f.apply(s, t), f = a && s[a], f && f.apply && jQuery.acceptData(s) && (e.result = f.apply(s, t), e.result === !1 && e.preventDefault());
                return e.type = h, !r && !e.isDefaultPrevented() && (!l._default || l._default.apply(c.pop(), t) === !1) && jQuery.acceptData(n) && a && jQuery.isFunction(n[h]) && !jQuery.isWindow(n) && (o = n[a], o && (n[a] = null), jQuery.event.triggered = h, n[h](), jQuery.event.triggered = undefined, o && (n[a] = o)), e.result
            },
            dispatch: function(e) {
                e = jQuery.event.fix(e);
                var t, n, r, i, s, o = [],
                    u = slice.call(arguments),
                    a = (data_priv.get(this, "events") || {})[e.type] || [],
                    f = jQuery.event.special[e.type] || {};
                u[0] = e, e.delegateTarget = this;
                if (f.preDispatch && f.preDispatch.call(this, e) === !1) return;
                o = jQuery.event.handlers.call(this, e, a), t = 0;
                while ((i = o[t++]) && !e.isPropagationStopped()) {
                    e.currentTarget = i.elem, n = 0;
                    while ((s = i.handlers[n++]) && !e.isImmediatePropagationStopped())
                        if (!e.namespace_re || e.namespace_re.test(s.namespace)) e.handleObj = s, e.data = s.data, r = ((jQuery.event.special[s.origType] || {}).handle || s.handler).apply(i.elem, u), r !== undefined && (e.result = r) === !1 && (e.preventDefault(), e.stopPropagation())
                }
                return f.postDispatch && f.postDispatch.call(this, e), e.result
            },
            handlers: function(e, t) {
                var n, r, i, s, o = [],
                    u = t.delegateCount,
                    a = e.target;
                if (u && a.nodeType && (!e.button || e.type !== "click"))
                    for (; a !== this; a = a.parentNode || this)
                        if (a.disabled !== !0 || e.type !== "click") {
                            r = [];
                            for (n = 0; n < u; n++) s = t[n], i = s.selector + " ", r[i] === undefined && (r[i] = s.needsContext ? jQuery(i, this).index(a) >= 0 : jQuery.find(i, this, null, [a]).length), r[i] && r.push(s);
                            r.length && o.push({
                                elem: a,
                                handlers: r
                            })
                        }
                return u < t.length && o.push({
                    elem: this,
                    handlers: t.slice(u)
                }), o
            },
            props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
            fixHooks: {},
            keyHooks: {
                props: "char charCode key keyCode".split(" "),
                filter: function(e, t) {
                    return e.which == null && (e.which = t.charCode != null ? t.charCode : t.keyCode), e
                }
            },
            mouseHooks: {
                props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                filter: function(e, t) {
                    var n, r, i, s = t.button;
                    return e.pageX == null && t.clientX != null && (n = e.target.ownerDocument || document, r = n.documentElement, i = n.body, e.pageX = t.clientX + (r && r.scrollLeft || i && i.scrollLeft || 0) - (r && r.clientLeft || i && i.clientLeft || 0), e.pageY = t.clientY + (r && r.scrollTop || i && i.scrollTop || 0) - (r && r.clientTop || i && i.clientTop || 0)), !e.which && s !== undefined && (e.which = s & 1 ? 1 : s & 2 ? 3 : s & 4 ? 2 : 0), e
                }
            },
            fix: function(e) {
                if (e[jQuery.expando]) return e;
                var t, n, r, i = e.type,
                    s = e,
                    o = this.fixHooks[i];
                o || (this.fixHooks[i] = o = rmouseEvent.test(i) ? this.mouseHooks : rkeyEvent.test(i) ? this.keyHooks : {}), r = o.props ? this.props.concat(o.props) : this.props, e = new jQuery.Event(s), t = r.length;
                while (t--) n = r[t], e[n] = s[n];
                return e.target || (e.target = document), e.target.nodeType === 3 && (e.target = e.target.parentNode), o.filter ? o.filter(e, s) : e
            },
            special: {
                load: {
                    noBubble: !0
                },
                focus: {
                    trigger: function() {
                        if (this !== safeActiveElement() && this.focus) return this.focus(), !1
                    },
                    delegateType: "focusin"
                },
                blur: {
                    trigger: function() {
                        if (this === safeActiveElement() && this.blur) return this.blur(), !1
                    },
                    delegateType: "focusout"
                },
                click: {
                    trigger: function() {
                        if (this.type === "checkbox" && this.click && jQuery.nodeName(this, "input")) return this.click(), !1
                    },
                    _default: function(e) {
                        return jQuery.nodeName(e.target, "a")
                    }
                },
                beforeunload: {
                    postDispatch: function(e) {
                        e.result !== undefined && e.originalEvent && (e.originalEvent.returnValue = e.result)
                    }
                }
            },
            simulate: function(e, t, n, r) {
                var i = jQuery.extend(new jQuery.Event, n, {
                    type: e,
                    isSimulated: !0,
                    originalEvent: {}
                });
                r ? jQuery.event.trigger(i, null, t) : jQuery.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
            }
        }, jQuery.removeEvent = function(e, t, n) {
            e.removeEventListener && e.removeEventListener(t, n, !1)
        }, jQuery.Event = function(e, t) {
            if (!(this instanceof jQuery.Event)) return new jQuery.Event(e, t);
            e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.defaultPrevented === undefined && e.returnValue === !1 ? returnTrue : returnFalse) : this.type = e, t && jQuery.extend(this, t), this.timeStamp = e && e.timeStamp || jQuery.now(), this[jQuery.expando] = !0
        }, jQuery.Event.prototype = {
            isDefaultPrevented: returnFalse,
            isPropagationStopped: returnFalse,
            isImmediatePropagationStopped: returnFalse,
            preventDefault: function() {
                var e = this.originalEvent;
                this.isDefaultPrevented = returnTrue, e && e.preventDefault && e.preventDefault()
            },
            stopPropagation: function() {
                var e = this.originalEvent;
                this.isPropagationStopped = returnTrue, e && e.stopPropagation && e.stopPropagation()
            },
            stopImmediatePropagation: function() {
                var e = this.originalEvent;
                this.isImmediatePropagationStopped = returnTrue, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation()
            }
        }, jQuery.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function(e, t) {
            jQuery.event.special[e] = {
                delegateType: t,
                bindType: t,
                handle: function(e) {
                    var n, r = this,
                        i = e.relatedTarget,
                        s = e.handleObj;
                    if (!i || i !== r && !jQuery.contains(r, i)) e.type = s.origType, n = s.handler.apply(this, arguments), e.type = t;
                    return n
                }
            }
        }), support.focusinBubbles || jQuery.each({
            focus: "focusin",
            blur: "focusout"
        }, function(e, t) {
            var n = function(e) {
                jQuery.event.simulate(t, e.target, jQuery.event.fix(e), !0)
            };
            jQuery.event.special[t] = {
                setup: function() {
                    var r = this.ownerDocument || this,
                        i = data_priv.access(r, t);
                    i || r.addEventListener(e, n, !0), data_priv.access(r, t, (i || 0) + 1)
                },
                teardown: function() {
                    var r = this.ownerDocument || this,
                        i = data_priv.access(r, t) - 1;
                    i ? data_priv.access(r, t, i) : (r.removeEventListener(e, n, !0), data_priv.remove(r, t))
                }
            }
        }), jQuery.fn.extend({
            on: function(e, t, n, r, i) {
                var s, o;
                if (typeof e == "object") {
                    typeof t != "string" && (n = n || t, t = undefined);
                    for (o in e) this.on(o, t, n, e[o], i);
                    return this
                }
                n == null && r == null ? (r = t, n = t = undefined) : r == null && (typeof t == "string" ? (r = n, n = undefined) : (r = n, n = t, t = undefined));
                if (r === !1) r = returnFalse;
                else if (!r) return this;
                return i === 1 && (s = r, r = function(e) {
                    return jQuery().off(e), s.apply(this, arguments)
                }, r.guid = s.guid || (s.guid = jQuery.guid++)), this.each(function() {
                    jQuery.event.add(this, e, r, n, t)
                })
            },
            one: function(e, t, n, r) {
                return this.on(e, t, n, r, 1)
            },
            off: function(e, t, n) {
                var r, i;
                if (e && e.preventDefault && e.handleObj) return r = e.handleObj, jQuery(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
                if (typeof e == "object") {
                    for (i in e) this.off(i, t, e[i]);
                    return this
                }
                if (t === !1 || typeof t == "function") n = t, t = undefined;
                return n === !1 && (n = returnFalse), this.each(function() {
                    jQuery.event.remove(this, e, n, t)
                })
            },
            trigger: function(e, t) {
                return this.each(function() {
                    jQuery.event.trigger(e, t, this)
                })
            },
            triggerHandler: function(e, t) {
                var n = this[0];
                if (n) return jQuery.event.trigger(e, t, n, !0)
            }
        });
        var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
            rtagName = /<([\w:]+)/,
            rhtml = /<|&#?\w+;/,
            rnoInnerhtml = /<(?:script|style|link)/i,
            rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
            rscriptType = /^$|\/(?:java|ecma)script/i,
            rscriptTypeMasked = /^true\/(.*)/,
            rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
            wrapMap = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                thead: [1, "<table>", "</table>"],
                col: [2, "<table><colgroup>", "</colgroup></table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: [0, "", ""]
            };
        wrapMap.optgroup = wrapMap.option, wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead, wrapMap.th = wrapMap.td, jQuery.extend({
            clone: function(e, t, n) {
                var r, i, s, o, u = e.cloneNode(!0),
                    a = jQuery.contains(e.ownerDocument, e);
                if (!support.noCloneChecked && (e.nodeType === 1 || e.nodeType === 11) && !jQuery.isXMLDoc(e)) {
                    o = getAll(u), s = getAll(e);
                    for (r = 0, i = s.length; r < i; r++) fixInput(s[r], o[r])
                }
                if (t)
                    if (n) {
                        s = s || getAll(e), o = o || getAll(u);
                        for (r = 0, i = s.length; r < i; r++) cloneCopyEvent(s[r], o[r])
                    } else cloneCopyEvent(e, u);
                return o = getAll(u, "script"), o.length > 0 && setGlobalEval(o, !a && getAll(e, "script")), u
            },
            buildFragment: function(e, t, n, r) {
                var i, s, o, u, a, f, l = t.createDocumentFragment(),
                    c = [],
                    h = 0,
                    p = e.length;
                for (; h < p; h++) {
                    i = e[h];
                    if (i || i === 0)
                        if (jQuery.type(i) === "object") jQuery.merge(c, i.nodeType ? [i] : i);
                        else if (!rhtml.test(i)) c.push(t.createTextNode(i));
                    else {
                        s = s || l.appendChild(t.createElement("div")), o = (rtagName.exec(i) || ["", ""])[1].toLowerCase(), u = wrapMap[o] || wrapMap._default, s.innerHTML = u[1] + i.replace(rxhtmlTag, "<$1></$2>") + u[2], f = u[0];
                        while (f--) s = s.lastChild;
                        jQuery.merge(c, s.childNodes), s = l.firstChild, s.textContent = ""
                    }
                }
                l.textContent = "", h = 0;
                while (i = c[h++]) {
                    if (r && jQuery.inArray(i, r) !== -1) continue;
                    a = jQuery.contains(i.ownerDocument, i), s = getAll(l.appendChild(i), "script"), a && setGlobalEval(s);
                    if (n) {
                        f = 0;
                        while (i = s[f++]) rscriptType.test(i.type || "") && n.push(i)
                    }
                }
                return l
            },
            cleanData: function(e) {
                var t, n, r, i, s = jQuery.event.special,
                    o = 0;
                for (;
                    (n = e[o]) !== undefined; o++) {
                    if (jQuery.acceptData(n)) {
                        i = n[data_priv.expando];
                        if (i && (t = data_priv.cache[i])) {
                            if (t.events)
                                for (r in t.events) s[r] ? jQuery.event.remove(n, r) : jQuery.removeEvent(n, r, t.handle);
                            data_priv.cache[i] && delete data_priv.cache[i]
                        }
                    }
                    delete data_user.cache[n[data_user.expando]]
                }
            }
        }), jQuery.fn.extend({
            text: function(e) {
                return access(this, function(e) {
                    return e === undefined ? jQuery.text(this) : this.empty().each(function() {
                        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) this.textContent = e
                    })
                }, null, e, arguments.length)
            },
            append: function() {
                return this.domManip(arguments, function(e) {
                    if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                        var t = manipulationTarget(this, e);
                        t.appendChild(e)
                    }
                })
            },
            prepend: function() {
                return this.domManip(arguments, function(e) {
                    if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                        var t = manipulationTarget(this, e);
                        t.insertBefore(e, t.firstChild)
                    }
                })
            },
            before: function() {
                return this.domManip(arguments, function(e) {
                    this.parentNode && this.parentNode.insertBefore(e, this)
                })
            },
            after: function() {
                return this.domManip(arguments, function(e) {
                    this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                })
            },
            remove: function(e, t) {
                var n, r = e ? jQuery.filter(e, this) : this,
                    i = 0;
                for (;
                    (n = r[i]) != null; i++) !t && n.nodeType === 1 && jQuery.cleanData(getAll(n)), n.parentNode && (t && jQuery.contains(n.ownerDocument, n) && setGlobalEval(getAll(n, "script")), n.parentNode.removeChild(n));
                return this
            },
            empty: function() {
                var e, t = 0;
                for (;
                    (e = this[t]) != null; t++) e.nodeType === 1 && (jQuery.cleanData(getAll(e, !1)), e.textContent = "");
                return this
            },
            clone: function(e, t) {
                return e = e == null ? !1 : e, t = t == null ? e : t, this.map(function() {
                    return jQuery.clone(this, e, t)
                })
            },
            html: function(e) {
                return access(this, function(e) {
                    var t = this[0] || {},
                        n = 0,
                        r = this.length;
                    if (e === undefined && t.nodeType === 1) return t.innerHTML;
                    if (typeof e == "string" && !rnoInnerhtml.test(e) && !wrapMap[(rtagName.exec(e) || ["", ""])[1].toLowerCase()]) {
                        e = e.replace(rxhtmlTag, "<$1></$2>");
                        try {
                            for (; n < r; n++) t = this[n] || {}, t.nodeType === 1 && (jQuery.cleanData(getAll(t, !1)), t.innerHTML = e);
                            t = 0
                        } catch (i) {}
                    }
                    t && this.empty().append(e)
                }, null, e, arguments.length)
            },
            replaceWith: function() {
                var e = arguments[0];
                return this.domManip(arguments, function(t) {
                    e = this.parentNode, jQuery.cleanData(getAll(this)), e && e.replaceChild(t, this)
                }), e && (e.length || e.nodeType) ? this : this.remove()
            },
            detach: function(e) {
                return this.remove(e, !0)
            },
            domManip: function(e, t) {
                e = concat.apply([], e);
                var n, r, i, s, o, u, a = 0,
                    f = this.length,
                    l = this,
                    c = f - 1,
                    h = e[0],
                    p = jQuery.isFunction(h);
                if (p || f > 1 && typeof h == "string" && !support.checkClone && rchecked.test(h)) return this.each(function(n) {
                    var r = l.eq(n);
                    p && (e[0] = h.call(this, n, r.html())), r.domManip(e, t)
                });
                if (f) {
                    n = jQuery.buildFragment(e, this[0].ownerDocument, !1, this), r = n.firstChild, n.childNodes.length === 1 && (n = r);
                    if (r) {
                        i = jQuery.map(getAll(n, "script"), disableScript), s = i.length;
                        for (; a < f; a++) o = n, a !== c && (o = jQuery.clone(o, !0, !0), s && jQuery.merge(i, getAll(o, "script"))), t.call(this[a], o, a);
                        if (s) {
                            u = i[i.length - 1].ownerDocument, jQuery.map(i, restoreScript);
                            for (a = 0; a < s; a++) o = i[a], rscriptType.test(o.type || "") && !data_priv.access(o, "globalEval") && jQuery.contains(u, o) && (o.src ? jQuery._evalUrl && jQuery._evalUrl(o.src) : jQuery.globalEval(o.textContent.replace(rcleanScript, "")))
                        }
                    }
                }
                return this
            }
        }), jQuery.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(e, t) {
            jQuery.fn[e] = function(e) {
                var n, r = [],
                    i = jQuery(e),
                    s = i.length - 1,
                    o = 0;
                for (; o <= s; o++) n = o === s ? this : this.clone(!0), jQuery(i[o])[t](n), push.apply(r, n.get());
                return this.pushStack(r)
            }
        });
        var iframe, elemdisplay = {},
            rmargin = /^margin/,
            rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i"),
            getStyles = function(e) {
                return e.ownerDocument.defaultView.getComputedStyle(e, null)
            };
        (function() {
            function s() {
                i.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", i.innerHTML = "", n.appendChild(r);
                var s = window.getComputedStyle(i, null);
                e = s.top !== "1%", t = s.width === "4px", n.removeChild(r)
            }
            var e, t, n = document.documentElement,
                r = document.createElement("div"),
                i = document.createElement("div");
            if (!i.style) return;
            i.style.backgroundClip = "content-box", i.cloneNode(!0).style.backgroundClip = "", support.clearCloneStyle = i.style.backgroundClip === "content-box", r.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute", r.appendChild(i), window.getComputedStyle && jQuery.extend(support, {
                pixelPosition: function() {
                    return s(), e
                },
                boxSizingReliable: function() {
                    return t == null && s(), t
                },
                reliableMarginRight: function() {
                    var e, t = i.appendChild(document.createElement("div"));
                    return t.style.cssText = i.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", t.style.marginRight = t.style.width = "0", i.style.width = "1px", n.appendChild(r), e = !parseFloat(window.getComputedStyle(t, null).marginRight), n.removeChild(r), e
                }
            })
        })(), jQuery.swap = function(e, t, n, r) {
            var i, s, o = {};
            for (s in t) o[s] = e.style[s], e.style[s] = t[s];
            i = n.apply(e, r || []);
            for (s in t) e.style[s] = o[s];
            return i
        };
        var rdisplayswap = /^(none|table(?!-c[ea]).+)/,
            rnumsplit = new RegExp("^(" + pnum + ")(.*)$", "i"),
            rrelNum = new RegExp("^([+-])=(" + pnum + ")", "i"),
            cssShow = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            cssNormalTransform = {
                letterSpacing: "0",
                fontWeight: "400"
            },
            cssPrefixes = ["Webkit", "O", "Moz", "ms"];
        jQuery.extend({
            cssHooks: {
                opacity: {
                    get: function(e, t) {
                        if (t) {
                            var n = curCSS(e, "opacity");
                            return n === "" ? "1" : n
                        }
                    }
                }
            },
            cssNumber: {
                columnCount: !0,
                fillOpacity: !0,
                flexGrow: !0,
                flexShrink: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {
                "float": "cssFloat"
            },
            style: function(e, t, n, r) {
                if (!e || e.nodeType === 3 || e.nodeType === 8 || !e.style) return;
                var i, s, o, u = jQuery.camelCase(t),
                    a = e.style;
                t = jQuery.cssProps[u] || (jQuery.cssProps[u] = vendorPropName(a, u)), o = jQuery.cssHooks[t] || jQuery.cssHooks[u];
                if (n === undefined) return o && "get" in o && (i = o.get(e, !1, r)) !== undefined ? i : a[t];
                s = typeof n, s === "string" && (i = rrelNum.exec(n)) && (n = (i[1] + 1) * i[2] + parseFloat(jQuery.css(e, t)), s = "number");
                if (n == null || n !== n) return;
                s === "number" && !jQuery.cssNumber[u] && (n += "px"), !support.clearCloneStyle && n === "" && t.indexOf("background") === 0 && (a[t] = "inherit");
                if (!o || !("set" in o) || (n = o.set(e, n, r)) !== undefined) a[t] = n
            },
            css: function(e, t, n, r) {
                var i, s, o, u = jQuery.camelCase(t);
                return t = jQuery.cssProps[u] || (jQuery.cssProps[u] = vendorPropName(e.style, u)), o = jQuery.cssHooks[t] || jQuery.cssHooks[u], o && "get" in o && (i = o.get(e, !0, n)), i === undefined && (i = curCSS(e, t, r)), i === "normal" && t in cssNormalTransform && (i = cssNormalTransform[t]), n === "" || n ? (s = parseFloat(i), n === !0 || jQuery.isNumeric(s) ? s || 0 : i) : i
            }
        }), jQuery.each(["height", "width"], function(e, t) {
            jQuery.cssHooks[t] = {
                get: function(e, n, r) {
                    if (n) return rdisplayswap.test(jQuery.css(e, "display")) && e.offsetWidth === 0 ? jQuery.swap(e, cssShow, function() {
                        return getWidthOrHeight(e, t, r)
                    }) : getWidthOrHeight(e, t, r)
                },
                set: function(e, n, r) {
                    var i = r && getStyles(e);
                    return setPositiveNumber(e, n, r ? augmentWidthOrHeight(e, t, r, jQuery.css(e, "boxSizing", !1, i) === "border-box", i) : 0)
                }
            }
        }), jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function(e, t) {
            if (t) return jQuery.swap(e, {
                display: "inline-block"
            }, curCSS, [e, "marginRight"])
        }), jQuery.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(e, t) {
            jQuery.cssHooks[e + t] = {
                expand: function(n) {
                    var r = 0,
                        i = {},
                        s = typeof n == "string" ? n.split(" ") : [n];
                    for (; r < 4; r++) i[e + cssExpand[r] + t] = s[r] || s[r - 2] || s[0];
                    return i
                }
            }, rmargin.test(e) || (jQuery.cssHooks[e + t].set = setPositiveNumber)
        }), jQuery.fn.extend({
            css: function(e, t) {
                return access(this, function(e, t, n) {
                    var r, i, s = {},
                        o = 0;
                    if (jQuery.isArray(t)) {
                        r = getStyles(e), i = t.length;
                        for (; o < i; o++) s[t[o]] = jQuery.css(e, t[o], !1, r);
                        return s
                    }
                    return n !== undefined ? jQuery.style(e, t, n) : jQuery.css(e, t)
                }, e, t, arguments.length > 1)
            },
            show: function() {
                return showHide(this, !0)
            },
            hide: function() {
                return showHide(this)
            },
            toggle: function(e) {
                return typeof e == "boolean" ? e ? this.show() : this.hide() : this.each(function() {
                    isHidden(this) ? jQuery(this).show() : jQuery(this).hide()
                })
            }
        }), jQuery.Tween = Tween, Tween.prototype = {
            constructor: Tween,
            init: function(e, t, n, r, i, s) {
                this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = s || (jQuery.cssNumber[n] ? "" : "px")
            },
            cur: function() {
                var e = Tween.propHooks[this.prop];
                return e && e.get ? e.get(this) : Tween.propHooks._default.get(this)
            },
            run: function(e) {
                var t, n = Tween.propHooks[this.prop];
                return this.options.duration ? this.pos = t = jQuery.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : Tween.propHooks._default.set(this), this
            }
        }, Tween.prototype.init.prototype = Tween.prototype, Tween.propHooks = {
            _default: {
                get: function(e) {
                    var t;
                    return e.elem[e.prop] == null || !!e.elem.style && e.elem.style[e.prop] != null ? (t = jQuery.css(e.elem, e.prop, ""), !t || t === "auto" ? 0 : t) : e.elem[e.prop]
                },
                set: function(e) {
                    jQuery.fx.step[e.prop] ? jQuery.fx.step[e.prop](e) : e.elem.style && (e.elem.style[jQuery.cssProps[e.prop]] != null || jQuery.cssHooks[e.prop]) ? jQuery.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
                }
            }
        }, Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
            set: function(e) {
                e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
            }
        }, jQuery.easing = {
            linear: function(e) {
                return e
            },
            swing: function(e) {
                return .5 - Math.cos(e * Math.PI) / 2
            }
        }, jQuery.fx = Tween.prototype.init, jQuery.fx.step = {};
        var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/,
            rfxnum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i"),
            rrun = /queueHooks$/,
            animationPrefilters = [defaultPrefilter],
            tweeners = {
                "*": [function(e, t) {
                    var n = this.createTween(e, t),
                        r = n.cur(),
                        i = rfxnum.exec(t),
                        s = i && i[3] || (jQuery.cssNumber[e] ? "" : "px"),
                        o = (jQuery.cssNumber[e] || s !== "px" && +r) && rfxnum.exec(jQuery.css(n.elem, e)),
                        u = 1,
                        a = 20;
                    if (o && o[3] !== s) {
                        s = s || o[3], i = i || [], o = +r || 1;
                        do u = u || ".5", o /= u, jQuery.style(n.elem, e, o + s); while (u !== (u = n.cur() / r) && u !== 1 && --a)
                    }
                    return i && (o = n.start = +o || +r || 0, n.unit = s, n.end = i[1] ? o + (i[1] + 1) * i[2] : +i[2]), n
                }]
            };
        jQuery.Animation = jQuery.extend(Animation, {
                tweener: function(e, t) {
                    jQuery.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
                    var n, r = 0,
                        i = e.length;
                    for (; r < i; r++) n = e[r], tweeners[n] = tweeners[n] || [], tweeners[n].unshift(t)
                },
                prefilter: function(e, t) {
                    t ? animationPrefilters.unshift(e) : animationPrefilters.push(e)
                }
            }), jQuery.speed = function(e, t, n) {
                var r = e && typeof e == "object" ? jQuery.extend({}, e) : {
                    complete: n || !n && t || jQuery.isFunction(e) && e,
                    duration: e,
                    easing: n && t || t && !jQuery.isFunction(t) && t
                };
                r.duration = jQuery.fx.off ? 0 : typeof r.duration == "number" ? r.duration : r.duration in jQuery.fx.speeds ? jQuery.fx.speeds[r.duration] : jQuery.fx.speeds._default;
                if (r.queue == null || r.queue === !0) r.queue = "fx";
                return r.old = r.complete, r.complete = function() {
                    jQuery.isFunction(r.old) && r.old.call(this), r.queue && jQuery.dequeue(this, r.queue)
                }, r
            }, jQuery.fn.extend({
                fadeTo: function(e, t, n, r) {
                    return this.filter(isHidden).css("opacity", 0).show().end().animate({
                        opacity: t
                    }, e, n, r)
                },
                animate: function(e, t, n, r) {
                    var i = jQuery.isEmptyObject(e),
                        s = jQuery.speed(t, n, r),
                        o = function() {
                            var t = Animation(this, jQuery.extend({}, e), s);
                            (i || data_priv.get(this, "finish")) && t.stop(!0)
                        };
                    return o.finish = o, i || s.queue === !1 ? this.each(o) : this.queue(s.queue, o)
                },
                stop: function(e, t, n) {
                    var r = function(e) {
                        var t = e.stop;
                        delete e.stop, t(n)
                    };
                    return typeof e != "string" && (n = t, t = e, e = undefined), t && e !== !1 && this.queue(e || "fx", []), this.each(function() {
                        var t = !0,
                            i = e != null && e + "queueHooks",
                            s = jQuery.timers,
                            o = data_priv.get(this);
                        if (i) o[i] && o[i].stop && r(o[i]);
                        else
                            for (i in o) o[i] && o[i].stop && rrun.test(i) && r(o[i]);
                        for (i = s.length; i--;) s[i].elem === this && (e == null || s[i].queue === e) && (s[i].anim.stop(n), t = !1, s.splice(i, 1));
                        (t || !n) && jQuery.dequeue(this, e)
                    })
                },
                finish: function(e) {
                    return e !== !1 && (e = e || "fx"), this.each(function() {
                        var t, n = data_priv.get(this),
                            r = n[e + "queue"],
                            i = n[e + "queueHooks"],
                            s = jQuery.timers,
                            o = r ? r.length : 0;
                        n.finish = !0, jQuery.queue(this, e, []), i && i.stop && i.stop.call(this, !0);
                        for (t = s.length; t--;) s[t].elem === this && s[t].queue === e && (s[t].anim.stop(!0), s.splice(t, 1));
                        for (t = 0; t < o; t++) r[t] && r[t].finish && r[t].finish.call(this);
                        delete n.finish
                    })
                }
            }), jQuery.each(["toggle", "show", "hide"], function(e, t) {
                var n = jQuery.fn[t];
                jQuery.fn[t] = function(e, r, i) {
                    return e == null || typeof e == "boolean" ? n.apply(this, arguments) : this.animate(genFx(t, !0), e, r, i)
                }
            }), jQuery.each({
                slideDown: genFx("show"),
                slideUp: genFx("hide"),
                slideToggle: genFx("toggle"),
                fadeIn: {
                    opacity: "show"
                },
                fadeOut: {
                    opacity: "hide"
                },
                fadeToggle: {
                    opacity: "toggle"
                }
            }, function(e, t) {
                jQuery.fn[e] = function(e, n, r) {
                    return this.animate(t, e, n, r)
                }
            }), jQuery.timers = [], jQuery.fx.tick = function() {
                var e, t = 0,
                    n = jQuery.timers;
                fxNow = jQuery.now();
                for (; t < n.length; t++) e = n[t], !e() && n[t] === e && n.splice(t--, 1);
                n.length || jQuery.fx.stop(), fxNow = undefined
            }, jQuery.fx.timer = function(e) {
                jQuery.timers.push(e), e() ? jQuery.fx.start() : jQuery.timers.pop()
            }, jQuery.fx.interval = 13, jQuery.fx.start = function() {
                timerId || (timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval))
            }, jQuery.fx.stop = function() {
                clearInterval(timerId), timerId = null
            }, jQuery.fx.speeds = {
                slow: 600,
                fast: 200,
                _default: 400
            }, jQuery.fn.delay = function(e, t) {
                return e = jQuery.fx ? jQuery.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, n) {
                    var r = setTimeout(t, e);
                    n.stop = function() {
                        clearTimeout(r)
                    }
                })
            },
            function() {
                var e = document.createElement("input"),
                    t = document.createElement("select"),
                    n = t.appendChild(document.createElement("option"));
                e.type = "checkbox", support.checkOn = e.value !== "", support.optSelected = n.selected, t.disabled = !0, support.optDisabled = !n.disabled, e = document.createElement("input"), e.value = "t", e.type = "radio", support.radioValue = e.value === "t"
            }();
        var nodeHook, boolHook, attrHandle = jQuery.expr.attrHandle;
        jQuery.fn.extend({
            attr: function(e, t) {
                return access(this, jQuery.attr, e, t, arguments.length > 1)
            },
            removeAttr: function(e) {
                return this.each(function() {
                    jQuery.removeAttr(this, e)
                })
            }
        }), jQuery.extend({
            attr: function(e, t, n) {
                var r, i, s = e.nodeType;
                if (!e || s === 3 || s === 8 || s === 2) return;
                if (typeof e.getAttribute === strundefined) return jQuery.prop(e, t, n);
                if (s !== 1 || !jQuery.isXMLDoc(e)) t = t.toLowerCase(), r = jQuery.attrHooks[t] || (jQuery.expr.match.bool.test(t) ? boolHook : nodeHook);
                if (n === undefined) return r && "get" in r && (i = r.get(e, t)) !== null ? i : (i = jQuery.find.attr(e, t), i == null ? undefined : i);
                if (n !== null) return r && "set" in r && (i = r.set(e, n, t)) !== undefined ? i : (e.setAttribute(t, n + ""), n);
                jQuery.removeAttr(e, t)
            },
            removeAttr: function(e, t) {
                var n, r, i = 0,
                    s = t && t.match(rnotwhite);
                if (s && e.nodeType === 1)
                    while (n = s[i++]) r = jQuery.propFix[n] || n, jQuery.expr.match.bool.test(n) && (e[r] = !1), e.removeAttribute(n)
            },
            attrHooks: {
                type: {
                    set: function(e, t) {
                        if (!support.radioValue && t === "radio" && jQuery.nodeName(e, "input")) {
                            var n = e.value;
                            return e.setAttribute("type", t), n && (e.value = n), t
                        }
                    }
                }
            }
        }), boolHook = {
            set: function(e, t, n) {
                return t === !1 ? jQuery.removeAttr(e, n) : e.setAttribute(n, n), n
            }
        }, jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(e, t) {
            var n = attrHandle[t] || jQuery.find.attr;
            attrHandle[t] = function(e, t, r) {
                var i, s;
                return r || (s = attrHandle[t], attrHandle[t] = i, i = n(e, t, r) != null ? t.toLowerCase() : null, attrHandle[t] = s), i
            }
        });
        var rfocusable = /^(?:input|select|textarea|button)$/i;
        jQuery.fn.extend({
            prop: function(e, t) {
                return access(this, jQuery.prop, e, t, arguments.length > 1)
            },
            removeProp: function(e) {
                return this.each(function() {
                    delete this[jQuery.propFix[e] || e]
                })
            }
        }), jQuery.extend({
            propFix: {
                "for": "htmlFor",
                "class": "className"
            },
            prop: function(e, t, n) {
                var r, i, s, o = e.nodeType;
                if (!e || o === 3 || o === 8 || o === 2) return;
                return s = o !== 1 || !jQuery.isXMLDoc(e), s && (t = jQuery.propFix[t] || t, i = jQuery.propHooks[t]), n !== undefined ? i && "set" in i && (r = i.set(e, n, t)) !== undefined ? r : e[t] = n : i && "get" in i && (r = i.get(e, t)) !== null ? r : e[t]
            },
            propHooks: {
                tabIndex: {
                    get: function(e) {
                        return e.hasAttribute("tabindex") || rfocusable.test(e.nodeName) || e.href ? e.tabIndex : -1
                    }
                }
            }
        }), support.optSelected || (jQuery.propHooks.selected = {
            get: function(e) {
                var t = e.parentNode;
                return t && t.parentNode && t.parentNode.selectedIndex, null
            }
        }), jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
            jQuery.propFix[this.toLowerCase()] = this
        });
        var rclass = /[\t\r\n\f]/g;
        jQuery.fn.extend({
            addClass: function(e) {
                var t, n, r, i, s, o, u = typeof e == "string" && e,
                    a = 0,
                    f = this.length;
                if (jQuery.isFunction(e)) return this.each(function(t) {
                    jQuery(this).addClass(e.call(this, t, this.className))
                });
                if (u) {
                    t = (e || "").match(rnotwhite) || [];
                    for (; a < f; a++) {
                        n = this[a], r = n.nodeType === 1 && (n.className ? (" " + n.className + " ").replace(rclass, " ") : " ");
                        if (r) {
                            s = 0;
                            while (i = t[s++]) r.indexOf(" " + i + " ") < 0 && (r += i + " ");
                            o = jQuery.trim(r), n.className !== o && (n.className = o)
                        }
                    }
                }
                return this
            },
            removeClass: function(e) {
                var t, n, r, i, s, o, u = arguments.length === 0 || typeof e == "string" && e,
                    a = 0,
                    f = this.length;
                if (jQuery.isFunction(e)) return this.each(function(t) {
                    jQuery(this).removeClass(e.call(this, t, this.className))
                });
                if (u) {
                    t = (e || "").match(rnotwhite) || [];
                    for (; a < f; a++) {
                        n = this[a], r = n.nodeType === 1 && (n.className ? (" " + n.className + " ").replace(rclass, " ") : "");
                        if (r) {
                            s = 0;
                            while (i = t[s++])
                                while (r.indexOf(" " + i + " ") >= 0) r = r.replace(" " + i + " ", " ");
                            o = e ? jQuery.trim(r) : "", n.className !== o && (n.className = o)
                        }
                    }
                }
                return this
            },
            toggleClass: function(e, t) {
                var n = typeof e;
                return typeof t == "boolean" && n === "string" ? t ? this.addClass(e) : this.removeClass(e) : jQuery.isFunction(e) ? this.each(function(n) {
                    jQuery(this).toggleClass(e.call(this, n, this.className, t), t)
                }) : this.each(function() {
                    if (n === "string") {
                        var t, r = 0,
                            i = jQuery(this),
                            s = e.match(rnotwhite) || [];
                        while (t = s[r++]) i.hasClass(t) ? i.removeClass(t) : i.addClass(t)
                    } else if (n === strundefined || n === "boolean") this.className && data_priv.set(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : data_priv.get(this, "__className__") || ""
                })
            },
            hasClass: function(e) {
                var t = " " + e + " ",
                    n = 0,
                    r = this.length;
                for (; n < r; n++)
                    if (this[n].nodeType === 1 && (" " + this[n].className + " ").replace(rclass, " ").indexOf(t) >= 0) return !0;
                return !1
            }
        });
        var rreturn = /\r/g;
        jQuery.fn.extend({
            val: function(e) {
                var t, n, r, i = this[0];
                if (!arguments.length) {
                    if (i) return t = jQuery.valHooks[i.type] || jQuery.valHooks[i.nodeName.toLowerCase()], t && "get" in t && (n = t.get(i, "value")) !== undefined ? n : (n = i.value, typeof n == "string" ? n.replace(rreturn, "") : n == null ? "" : n);
                    return
                }
                return r = jQuery.isFunction(e), this.each(function(n) {
                    var i;
                    if (this.nodeType !== 1) return;
                    r ? i = e.call(this, n, jQuery(this).val()) : i = e, i == null ? i = "" : typeof i == "number" ? i += "" : jQuery.isArray(i) && (i = jQuery.map(i, function(e) {
                        return e == null ? "" : e + ""
                    })), t = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
                    if (!t || !("set" in t) || t.set(this, i, "value") === undefined) this.value = i
                })
            }
        }), jQuery.extend({
            valHooks: {
                option: {
                    get: function(e) {
                        var t = jQuery.find.attr(e, "value");
                        return t != null ? t : jQuery.trim(jQuery.text(e))
                    }
                },
                select: {
                    get: function(e) {
                        var t, n, r = e.options,
                            i = e.selectedIndex,
                            s = e.type === "select-one" || i < 0,
                            o = s ? null : [],
                            u = s ? i + 1 : r.length,
                            a = i < 0 ? u : s ? i : 0;
                        for (; a < u; a++) {
                            n = r[a];
                            if ((n.selected || a === i) && (support.optDisabled ? !n.disabled : n.getAttribute("disabled") === null) && (!n.parentNode.disabled || !jQuery.nodeName(n.parentNode, "optgroup"))) {
                                t = jQuery(n).val();
                                if (s) return t;
                                o.push(t)
                            }
                        }
                        return o
                    },
                    set: function(e, t) {
                        var n, r, i = e.options,
                            s = jQuery.makeArray(t),
                            o = i.length;
                        while (o--) {
                            r = i[o];
                            if (r.selected = jQuery.inArray(r.value, s) >= 0) n = !0
                        }
                        return n || (e.selectedIndex = -1), s
                    }
                }
            }
        }), jQuery.each(["radio", "checkbox"], function() {
            jQuery.valHooks[this] = {
                set: function(e, t) {
                    if (jQuery.isArray(t)) return e.checked = jQuery.inArray(jQuery(e).val(), t) >= 0
                }
            }, support.checkOn || (jQuery.valHooks[this].get = function(e) {
                return e.getAttribute("value") === null ? "on" : e.value
            })
        }), jQuery.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
            jQuery.fn[t] = function(e, n) {
                return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
            }
        }), jQuery.fn.extend({
            hover: function(e, t) {
                return this.mouseenter(e).mouseleave(t || e)
            },
            bind: function(e, t, n) {
                return this.on(e, null, t, n)
            },
            unbind: function(e, t) {
                return this.off(e, null, t)
            },
            delegate: function(e, t, n, r) {
                return this.on(t, e, n, r)
            },
            undelegate: function(e, t, n) {
                return arguments.length === 1 ? this.off(e, "**") : this.off(t, e || "**", n)
            }
        });
        var nonce = jQuery.now(),
            rquery = /\?/;
        jQuery.parseJSON = function(e) {
            return JSON.parse(e + "")
        }, jQuery.parseXML = function(e) {
            var t, n;
            if (!e || typeof e != "string") return null;
            try {
                n = new DOMParser, t = n.parseFromString(e, "text/xml")
            } catch (r) {
                t = undefined
            }
            return (!t || t.getElementsByTagName("parsererror").length) && jQuery.error("Invalid XML: " + e), t
        };
        var ajaxLocParts, ajaxLocation, rhash = /#.*$/,
            rts = /([?&])_=[^&]*/,
            rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
            rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            rnoContent = /^(?:GET|HEAD)$/,
            rprotocol = /^\/\//,
            rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
            prefilters = {},
            transports = {},
            allTypes = "*/".concat("*");
        try {
            ajaxLocation = location.href
        } catch (e) {
            ajaxLocation = document.createElement("a"), ajaxLocation.href = "", ajaxLocation = ajaxLocation.href
        }
        ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [], jQuery.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: ajaxLocation,
                type: "GET",
                isLocal: rlocalProtocol.test(ajaxLocParts[1]),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": allTypes,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /xml/,
                    html: /html/,
                    json: /json/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": !0,
                    "text json": jQuery.parseJSON,
                    "text xml": jQuery.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function(e, t) {
                return t ? ajaxExtend(ajaxExtend(e, jQuery.ajaxSettings), t) : ajaxExtend(jQuery.ajaxSettings, e)
            },
            ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
            ajaxTransport: addToPrefiltersOrTransports(transports),
            ajax: function(e, t) {
                function S(e, t, s, u) {
                    var f, m, g, b, E, S = t;
                    if (y === 2) return;
                    y = 2, o && clearTimeout(o), n = undefined, i = u || "", w.readyState = e > 0 ? 4 : 0, f = e >= 200 && e < 300 || e === 304, s && (b = ajaxHandleResponses(l, w, s)), b = ajaxConvert(l, b, w, f);
                    if (f) l.ifModified && (E = w.getResponseHeader("Last-Modified"), E && (jQuery.lastModified[r] = E), E = w.getResponseHeader("etag"), E && (jQuery.etag[r] = E)), e === 204 || l.type === "HEAD" ? S = "nocontent" : e === 304 ? S = "notmodified" : (S = b.state, m = b.data, g = b.error, f = !g);
                    else {
                        g = S;
                        if (e || !S) S = "error", e < 0 && (e = 0)
                    }
                    w.status = e, w.statusText = (t || S) + "", f ? p.resolveWith(c, [m, S, w]) : p.rejectWith(c, [w, S, g]), w.statusCode(v), v = undefined, a && h.trigger(f ? "ajaxSuccess" : "ajaxError", [w, l, f ? m : g]), d.fireWith(c, [w, S]), a && (h.trigger("ajaxComplete", [w, l]), --jQuery.active || jQuery.event.trigger("ajaxStop"))
                }
                typeof e == "object" && (t = e, e = undefined), t = t || {};
                var n, r, i, s, o, u, a, f, l = jQuery.ajaxSetup({}, t),
                    c = l.context || l,
                    h = l.context && (c.nodeType || c.jquery) ? jQuery(c) : jQuery.event,
                    p = jQuery.Deferred(),
                    d = jQuery.Callbacks("once memory"),
                    v = l.statusCode || {},
                    m = {},
                    g = {},
                    y = 0,
                    b = "canceled",
                    w = {
                        readyState: 0,
                        getResponseHeader: function(e) {
                            var t;
                            if (y === 2) {
                                if (!s) {
                                    s = {};
                                    while (t = rheaders.exec(i)) s[t[1].toLowerCase()] = t[2]
                                }
                                t = s[e.toLowerCase()]
                            }
                            return t == null ? null : t
                        },
                        getAllResponseHeaders: function() {
                            return y === 2 ? i : null
                        },
                        setRequestHeader: function(e, t) {
                            var n = e.toLowerCase();
                            return y || (e = g[n] = g[n] || e, m[e] = t), this
                        },
                        overrideMimeType: function(e) {
                            return y || (l.mimeType = e), this
                        },
                        statusCode: function(e) {
                            var t;
                            if (e)
                                if (y < 2)
                                    for (t in e) v[t] = [v[t], e[t]];
                                else w.always(e[w.status]);
                            return this
                        },
                        abort: function(e) {
                            var t = e || b;
                            return n && n.abort(t), S(0, t), this
                        }
                    };
                p.promise(w).complete = d.add, w.success = w.done, w.error = w.fail, l.url = ((e || l.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//"), l.type = t.method || t.type || l.method || l.type, l.dataTypes = jQuery.trim(l.dataType || "*").toLowerCase().match(rnotwhite) || [""], l.crossDomain == null && (u = rurl.exec(l.url.toLowerCase()), l.crossDomain = !(!u || u[1] === ajaxLocParts[1] && u[2] === ajaxLocParts[2] && (u[3] || (u[1] === "http:" ? "80" : "443")) === (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? "80" : "443")))), l.data && l.processData && typeof l.data != "string" && (l.data = jQuery.param(l.data, l.traditional)), inspectPrefiltersOrTransports(prefilters, l, t, w);
                if (y === 2) return w;
                a = l.global, a && jQuery.active++ === 0 && jQuery.event.trigger("ajaxStart"), l.type = l.type.toUpperCase(), l.hasContent = !rnoContent.test(l.type), r = l.url, l.hasContent || (l.data && (r = l.url += (rquery.test(r) ? "&" : "?") + l.data, delete l.data), l.cache === !1 && (l.url = rts.test(r) ? r.replace(rts, "$1_=" + nonce++) : r + (rquery.test(r) ? "&" : "?") + "_=" + nonce++)), l.ifModified && (jQuery.lastModified[r] && w.setRequestHeader("If-Modified-Since", jQuery.lastModified[r]), jQuery.etag[r] && w.setRequestHeader("If-None-Match", jQuery.etag[r])), (l.data && l.hasContent && l.contentType !== !1 || t.contentType) && w.setRequestHeader("Content-Type", l.contentType), w.setRequestHeader("Accept", l.dataTypes[0] && l.accepts[l.dataTypes[0]] ? l.accepts[l.dataTypes[0]] + (l.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : l.accepts["*"]);
                for (f in l.headers) w.setRequestHeader(f, l.headers[f]);
                if (!l.beforeSend || l.beforeSend.call(c, w, l) !== !1 && y !== 2) {
                    b = "abort";
                    for (f in {
                            success: 1,
                            error: 1,
                            complete: 1
                        }) w[f](l[f]);
                    n = inspectPrefiltersOrTransports(transports, l, t, w);
                    if (!n) S(-1, "No Transport");
                    else {
                        w.readyState = 1, a && h.trigger("ajaxSend", [w, l]), l.async && l.timeout > 0 && (o = setTimeout(function() {
                            w.abort("timeout")
                        }, l.timeout));
                        try {
                            y = 1, n.send(m, S)
                        } catch (E) {
                            if (!(y < 2)) throw E;
                            S(-1, E)
                        }
                    }
                    return w
                }
                return w.abort()
            },
            getJSON: function(e, t, n) {
                return jQuery.get(e, t, n, "json")
            },
            getScript: function(e, t) {
                return jQuery.get(e, undefined, t, "script")
            }
        }), jQuery.each(["get", "post"], function(e, t) {
            jQuery[t] = function(e, n, r, i) {
                return jQuery.isFunction(n) && (i = i || r, r = n, n = undefined), jQuery.ajax({
                    url: e,
                    type: t,
                    dataType: i,
                    data: n,
                    success: r
                })
            }
        }), jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
            jQuery.fn[t] = function(e) {
                return this.on(t, e)
            }
        }), jQuery._evalUrl = function(e) {
            return jQuery.ajax({
                url: e,
                type: "GET",
                dataType: "script",
                async: !1,
                global: !1,
                "throws": !0
            })
        }, jQuery.fn.extend({
            wrapAll: function(e) {
                var t;
                return jQuery.isFunction(e) ? this.each(function(t) {
                    jQuery(this).wrapAll(e.call(this, t))
                }) : (this[0] && (t = jQuery(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                    var e = this;
                    while (e.firstElementChild) e = e.firstElementChild;
                    return e
                }).append(this)), this)
            },
            wrapInner: function(e) {
                return jQuery.isFunction(e) ? this.each(function(t) {
                    jQuery(this).wrapInner(e.call(this, t))
                }) : this.each(function() {
                    var t = jQuery(this),
                        n = t.contents();
                    n.length ? n.wrapAll(e) : t.append(e)
                })
            },
            wrap: function(e) {
                var t = jQuery.isFunction(e);
                return this.each(function(n) {
                    jQuery(this).wrapAll(t ? e.call(this, n) : e)
                })
            },
            unwrap: function() {
                return this.parent().each(function() {
                    jQuery.nodeName(this, "body") || jQuery(this).replaceWith(this.childNodes)
                }).end()
            }
        }), jQuery.expr.filters.hidden = function(e) {
            return e.offsetWidth <= 0 && e.offsetHeight <= 0
        }, jQuery.expr.filters.visible = function(e) {
            return !jQuery.expr.filters.hidden(e)
        };
        var r20 = /%20/g,
            rbracket = /\[\]$/,
            rCRLF = /\r?\n/g,
            rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
            rsubmittable = /^(?:input|select|textarea|keygen)/i;
        jQuery.param = function(e, t) {
            var n, r = [],
                i = function(e, t) {
                    t = jQuery.isFunction(t) ? t() : t == null ? "" : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
                };
            t === undefined && (t = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional);
            if (jQuery.isArray(e) || e.jquery && !jQuery.isPlainObject(e)) jQuery.each(e, function() {
                i(this.name, this.value)
            });
            else
                for (n in e) buildParams(n, e[n], t, i);
            return r.join("&").replace(r20, "+")
        }, jQuery.fn.extend({
            serialize: function() {
                return jQuery.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map(function() {
                    var e = jQuery.prop(this, "elements");
                    return e ? jQuery.makeArray(e) : this
                }).filter(function() {
                    var e = this.type;
                    return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(e) && (this.checked || !rcheckableType.test(e))
                }).map(function(e, t) {
                    var n = jQuery(this).val();
                    return n == null ? null : jQuery.isArray(n) ? jQuery.map(n, function(e) {
                        return {
                            name: t.name,
                            value: e.replace(rCRLF, "\r\n")
                        }
                    }) : {
                        name: t.name,
                        value: n.replace(rCRLF, "\r\n")
                    }
                }).get()
            }
        }), jQuery.ajaxSettings.xhr = function() {
            try {
                return new XMLHttpRequest
            } catch (e) {}
        };
        var xhrId = 0,
            xhrCallbacks = {},
            xhrSuccessStatus = {
                0: 200,
                1223: 204
            },
            xhrSupported = jQuery.ajaxSettings.xhr();
        window.ActiveXObject && jQuery(window).on("unload", function() {
            for (var e in xhrCallbacks) xhrCallbacks[e]()
        }), support.cors = !!xhrSupported && "withCredentials" in xhrSupported, support.ajax = xhrSupported = !!xhrSupported, jQuery.ajaxTransport(function(e) {
            var t;
            if (support.cors || xhrSupported && !e.crossDomain) return {
                send: function(n, r) {
                    var i, s = e.xhr(),
                        o = ++xhrId;
                    s.open(e.type, e.url, e.async, e.username, e.password);
                    if (e.xhrFields)
                        for (i in e.xhrFields) s[i] = e.xhrFields[i];
                    e.mimeType && s.overrideMimeType && s.overrideMimeType(e.mimeType), !e.crossDomain && !n["X-Requested-With"] && (n["X-Requested-With"] = "XMLHttpRequest");
                    for (i in n) s.setRequestHeader(i, n[i]);
                    t = function(e) {
                        return function() {
                            t && (delete xhrCallbacks[o], t = s.onload = s.onerror = null, e === "abort" ? s.abort() : e === "error" ? r(s.status, s.statusText) : r(xhrSuccessStatus[s.status] || s.status, s.statusText, typeof s.responseText == "string" ? {
                                text: s.responseText
                            } : undefined, s.getAllResponseHeaders()))
                        }
                    }, s.onload = t(), s.onerror = t("error"), t = xhrCallbacks[o] = t("abort");
                    try {
                        s.send(e.hasContent && e.data || null)
                    } catch (u) {
                        if (t) throw u
                    }
                },
                abort: function() {
                    t && t()
                }
            }
        }), jQuery.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /(?:java|ecma)script/
            },
            converters: {
                "text script": function(e) {
                    return jQuery.globalEval(e), e
                }
            }
        }), jQuery.ajaxPrefilter("script", function(e) {
            e.cache === undefined && (e.cache = !1), e.crossDomain && (e.type = "GET")
        }), jQuery.ajaxTransport("script", function(e) {
            if (e.crossDomain) {
                var t, n;
                return {
                    send: function(r, i) {
                        t = jQuery("<script>").prop({
                            async: !0,
                            charset: e.scriptCharset,
                            src: e.url
                        }).on("load error", n = function(e) {
                            t.remove(), n = null, e && i(e.type === "error" ? 404 : 200, e.type)
                        }), document.head.appendChild(t[0])
                    },
                    abort: function() {
                        n && n()
                    }
                }
            }
        });
        var oldCallbacks = [],
            rjsonp = /(=)\?(?=&|$)|\?\?/;
        jQuery.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var e = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
                return this[e] = !0, e
            }
        }), jQuery.ajaxPrefilter("json jsonp", function(e, t, n) {
            var r, i, s, o = e.jsonp !== !1 && (rjsonp.test(e.url) ? "url" : typeof e.data == "string" && !(e.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(e.data) && "data");
            if (o || e.dataTypes[0] === "jsonp") return r = e.jsonpCallback = jQuery.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, o ? e[o] = e[o].replace(rjsonp, "$1" + r) : e.jsonp !== !1 && (e.url += (rquery.test(e.url) ? "&" : "?") + e.jsonp + "=" + r), e.converters["script json"] = function() {
                return s || jQuery.error(r + " was not called"), s[0]
            }, e.dataTypes[0] = "json", i = window[r], window[r] = function() {
                s = arguments
            }, n.always(function() {
                window[r] = i, e[r] && (e.jsonpCallback = t.jsonpCallback, oldCallbacks.push(r)), s && jQuery.isFunction(i) && i(s[0]), s = i = undefined
            }), "script"
        }), jQuery.parseHTML = function(e, t, n) {
            if (!e || typeof e != "string") return null;
            typeof t == "boolean" && (n = t, t = !1), t = t || document;
            var r = rsingleTag.exec(e),
                i = !n && [];
            return r ? [t.createElement(r[1])] : (r = jQuery.buildFragment([e], t, i), i && i.length && jQuery(i).remove(), jQuery.merge([], r.childNodes))
        };
        var _load = jQuery.fn.load;
        jQuery.fn.load = function(e, t, n) {
            if (typeof e != "string" && _load) return _load.apply(this, arguments);
            var r, i, s, o = this,
                u = e.indexOf(" ");
            return u >= 0 && (r = jQuery.trim(e.slice(u)), e = e.slice(0, u)), jQuery.isFunction(t) ? (n = t, t = undefined) : t && typeof t == "object" && (i = "POST"), o.length > 0 && jQuery.ajax({
                url: e,
                type: i,
                dataType: "html",
                data: t
            }).done(function(e) {
                s = arguments, o.html(r ? jQuery("<div>").append(jQuery.parseHTML(e)).find(r) : e)
            }).complete(n && function(e, t) {
                o.each(n, s || [e.responseText, t, e])
            }), this
        }, jQuery.expr.filters.animated = function(e) {
            return jQuery.grep(jQuery.timers, function(t) {
                return e === t.elem
            }).length
        };
        var docElem = window.document.documentElement;
        jQuery.offset = {
            setOffset: function(e, t, n) {
                var r, i, s, o, u, a, f, l = jQuery.css(e, "position"),
                    c = jQuery(e),
                    h = {};
                l === "static" && (e.style.position = "relative"), u = c.offset(), s = jQuery.css(e, "top"), a = jQuery.css(e, "left"), f = (l === "absolute" || l === "fixed") && (s + a).indexOf("auto") > -1, f ? (r = c.position(), o = r.top, i = r.left) : (o = parseFloat(s) || 0, i = parseFloat(a) || 0), jQuery.isFunction(t) && (t = t.call(e, n, u)), t.top != null && (h.top = t.top - u.top + o), t.left != null && (h.left = t.left - u.left + i), "using" in t ? t.using.call(e, h) : c.css(h)
            }
        }, jQuery.fn.extend({
            offset: function(e) {
                if (arguments.length) return e === undefined ? this : this.each(function(t) {
                    jQuery.offset.setOffset(this, e, t)
                });
                var t, n, r = this[0],
                    i = {
                        top: 0,
                        left: 0
                    },
                    s = r && r.ownerDocument;
                if (!s) return;
                return t = s.documentElement, jQuery.contains(t, r) ? (typeof r.getBoundingClientRect !== strundefined && (i = r.getBoundingClientRect()), n = getWindow(s), {
                    top: i.top + n.pageYOffset - t.clientTop,
                    left: i.left + n.pageXOffset - t.clientLeft
                }) : i
            },
            position: function() {
                if (!this[0]) return;
                var e, t, n = this[0],
                    r = {
                        top: 0,
                        left: 0
                    };
                return jQuery.css(n, "position") === "fixed" ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), jQuery.nodeName(e[0], "html") || (r = e.offset()), r.top += jQuery.css(e[0], "borderTopWidth", !0), r.left += jQuery.css(e[0], "borderLeftWidth", !0)), {
                    top: t.top - r.top - jQuery.css(n, "marginTop", !0),
                    left: t.left - r.left - jQuery.css(n, "marginLeft", !0)
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    var e = this.offsetParent || docElem;
                    while (e && !jQuery.nodeName(e, "html") && jQuery.css(e, "position") === "static") e = e.offsetParent;
                    return e || docElem
                })
            }
        }), jQuery.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(e, t) {
            var n = "pageYOffset" === t;
            jQuery.fn[e] = function(r) {
                return access(this, function(e, r, i) {
                    var s = getWindow(e);
                    if (i === undefined) return s ? s[t] : e[r];
                    s ? s.scrollTo(n ? window.pageXOffset : i, n ? i : window.pageYOffset) : e[r] = i
                }, e, r, arguments.length, null)
            }
        }), jQuery.each(["top", "left"], function(e, t) {
            jQuery.cssHooks[t] = addGetHookIf(support.pixelPosition, function(e, n) {
                if (n) return n = curCSS(e, t), rnumnonpx.test(n) ? jQuery(e).position()[t] + "px" : n
            })
        }), jQuery.each({
            Height: "height",
            Width: "width"
        }, function(e, t) {
            jQuery.each({
                padding: "inner" + e,
                content: t,
                "": "outer" + e
            }, function(n, r) {
                jQuery.fn[r] = function(r, i) {
                    var s = arguments.length && (n || typeof r != "boolean"),
                        o = n || (r === !0 || i === !0 ? "margin" : "border");
                    return access(this, function(t, n, r) {
                        var i;
                        return jQuery.isWindow(t) ? t.document.documentElement["client" + e] : t.nodeType === 9 ? (i = t.documentElement, Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : r === undefined ? jQuery.css(t, n, o) : jQuery.style(t, n, r, o)
                    }, t, s ? r : undefined, s, null)
                }
            })
        }), jQuery.fn.size = function() {
            return this.length
        }, jQuery.fn.andSelf = jQuery.fn.addBack, typeof define == "function" && define.amd && define("jquery", [], function() {
            return jQuery
        });
        var _jQuery = window.jQuery,
            _$ = window.$;
        return jQuery.noConflict = function(e) {
            return window.$ === jQuery && (window.$ = _$), e && window.jQuery === jQuery && (window.jQuery = _jQuery), jQuery
        }, typeof noGlobal === strundefined && (window.jQuery = window.$ = jQuery), jQuery
    }), define("jQuery", function(e) {
        return function() {
            var t, n;
            return t || e.$
        }
    }(this)), define("utils/storage", [], function() {
        var e = "";
        return {
            setBaseKey: function(t) {
                e = t
            },
            set: function(t, n) {
                t = e + ":" + t, localStorage[t] = JSON.stringify(n)
            },
            get: function(t, n) {
                t = e + ":" + t;
                if (localStorage[t] === undefined) return n;
                try {
                    var r = JSON.parse(localStorage[t]);
                    return r == null ? n : r
                } catch (i) {
                    return console.error(i), localStorage[t] || n
                }
            },
            remove: function(t) {
                t = e + ":" + t, localStorage.removeItem(t)
            }
        }
    }), define("utils/sharing", ["jQuery"], function(e) {
        var t = {
                twitter: function(t) {
                    window.open("http://twitter.com/home?status=" + encodeURIComponent(e("title").text() + " " + location.href))
                },
                facebook: function(e) {
                    window.open("http://www.facebook.com/sharer/sharer.php?s=100&p[url]=" + encodeURIComponent(location.href))
                },
                "google-plus": function(e) {
                    window.open("https://plus.google.com/share?url=" + encodeURIComponent(location.href))
                },
                weibo: function(t) {
                    window.open("http://service.weibo.com/share/share.php?content=utf-8&url=" + encodeURIComponent(location.href) + "&title=" + encodeURIComponent(e("title").text()))
                },
                instapaper: function(e) {
                    window.open("http://www.instapaper.com/text?u=" + encodeURIComponent(location.href))
                }
            },
            n = function() {
                e(document).on("click", "a[data-sharing],button[data-sharing]", function(n) {
                    n && n.preventDefault();
                    var r = e(this).data("sharing");
                    t[r](e(this))
                })
            };
        return {
            init: n
        }
    }), define("utils/dropdown", ["jQuery"], function(e) {
        var t = function(t) {
                var n = e(t.currentTarget).parent().find(".dropdown-menu");
                n.toggleClass("open"), t.stopPropagation(), t.preventDefault()
            },
            n = function(t) {
                e(".dropdown-menu").removeClass("open")
            },
            r = function() {
                e(document).on("click", ".toggle-dropdown", t), e(document).on("click", ".dropdown-menu", function(e) {
                    e.stopPropagation()
                }), e(document).on("click", n)
            };
        return {
            init: r
        }
    }), define("core/events", ["jQuery"], function(e) {
        var t = e({});
        return t
    }), define("core/font-settings", ["jQuery", "utils/storage"], function(e, t) {
        var n, r = {
                white: 0,
                sepia: 1,
                night: 2
            },
            i = {
                serif: 0,
                sans: 1
            },
            s = function(e) {
                n.size < 4 && (n.size++, n.save())
            },
            o = function(e) {
                n.size > 0 && (n.size--, n.save())
            },
            u = function() {
                var t = e(this).data("font");
                n.family = t, n.save()
            },
            a = function() {
                var t = e(".book"),
                    r = e(this).data("theme");
                n.theme !== 0 && t.removeClass("color-theme-" + n.theme), n.theme = r, n.theme !== 0 && t.addClass("color-theme-" + n.theme), n.save()
            },
            f = function() {
                var t = e(".book");
                e(".font-settings .font-family-list li").removeClass("active"), e(".font-settings .font-family-list li:nth-child(" + (n.family + 1) + ")").addClass("active"), t[0].className = t[0].className.replace(/\bfont-\S+/g, ""), t.addClass("font-size-" + n.size), t.addClass("font-family-" + n.family), n.theme !== 0 && (t[0].className = t[0].className.replace(/\bcolor-theme-\S+/g, ""), t.addClass("color-theme-" + n.theme))
            },
            l = function(l) {
                var c, h, p, d;
                d = e(".book"), c = e(".book-header .toggle-font-settings"), p = e("#font-settings-wrapper .dropdown-menu"), h = e(".book-body"), n = t.get("fontState", {
                    size: l.size || 2,
                    family: i[l.family || "sans"],
                    theme: r[l.theme || "white"]
                }), n.save = function() {
                    t.set("fontState", n), f()
                }, f(), e(document).on("click", "#enlarge-font-size", s), e(document).on("click", "#reduce-font-size", o), e(document).on("click", "#font-settings-wrapper .font-family-list .button", u), e(document).on("click", "#font-settings-wrapper .color-theme-list .button", a)
            };
        return {
            init: l,
            update: f
        }
    }), define("core/state", ["jQuery"], function() {
        var e = {};
        return e.update = function(t) {
            var n = $(t.find(".book"));
            e.$book = n, e.level = n.data("level"), e.basePath = n.data("basepath"), e.revision = n.data("revision")
        }, e.update($), e
    }),
    function(e, t, n) {
        function m(e, t, n) {
            if (e.addEventListener) {
                e.addEventListener(t, n, !1);
                return
            }
            e.attachEvent("on" + t, n)
        }

        function g(e) {
            if (e.type == "keypress") {
                var t = String.fromCharCode(e.which);
                return e.shiftKey || (t = t.toLowerCase()), t
            }
            return r[e.which] ? r[e.which] : i[e.which] ? i[e.which] : String.fromCharCode(e.which).toLowerCase()
        }

        function y(e, t) {
            return e.sort().join(",") === t.sort().join(",")
        }

        function b(e) {
            e = e || {};
            var t = !1,
                n;
            for (n in l) {
                if (e[n]) {
                    t = !0;
                    continue
                }
                l[n] = 0
            }
            t || (d = !1)
        }

        function w(e, t, n, r, i, s) {
            var o, u, f = [],
                c = n.type;
            if (!a[e]) return [];
            c == "keyup" && k(e) && (t = [e]);
            for (o = 0; o < a[e].length; ++o) {
                u = a[e][o];
                if (!r && u.seq && l[u.seq] != u.level) continue;
                if (c != u.action) continue;
                if (c == "keypress" && !n.metaKey && !n.ctrlKey || y(t, u.modifiers)) {
                    var h = !r && u.combo == i,
                        p = r && u.seq == r && u.level == s;
                    (h || p) && a[e].splice(o, 1), f.push(u)
                }
            }
            return f
        }

        function E(e) {
            var t = [];
            return e.shiftKey && t.push("shift"), e.altKey && t.push("alt"), e.ctrlKey && t.push("ctrl"), e.metaKey && t.push("meta"), t
        }

        function S(e) {
            if (e.preventDefault) {
                e.preventDefault();
                return
            }
            e.returnValue = !1
        }

        function x(e) {
            if (e.stopPropagation) {
                e.stopPropagation();
                return
            }
            e.cancelBubble = !0
        }

        function T(e, t, n, r) {
            if (B.stopCallback(t, t.target || t.srcElement, n, r)) return;
            e(t, n) === !1 && (S(t), x(t))
        }

        function N(e, t, n) {
            var r = w(e, t, n),
                i, s = {},
                o = 0,
                u = !1;
            for (i = 0; i < r.length; ++i) r[i].seq && (o = Math.max(o, r[i].level));
            for (i = 0; i < r.length; ++i) {
                if (r[i].seq) {
                    if (r[i].level != o) continue;
                    u = !0, s[r[i].seq] = 1, T(r[i].callback, n, r[i].combo, r[i].seq);
                    continue
                }
                u || T(r[i].callback, n, r[i].combo)
            }
            var a = n.type == "keypress" && p;
            n.type == d && !k(e) && !a && b(s), p = u && n.type == "keydown"
        }

        function C(e) {
            typeof e.which != "number" && (e.which = e.keyCode);
            var t = g(e);
            if (!t) return;
            if (e.type == "keyup" && h === t) {
                h = !1;
                return
            }
            B.handleKey(t, E(e), e)
        }

        function k(e) {
            return e == "shift" || e == "ctrl" || e == "alt" || e == "meta"
        }

        function L() {
            clearTimeout(c), c = setTimeout(b, 1e3)
        }

        function A() {
            if (!u) {
                u = {};
                for (var e in r) {
                    if (e > 95 && e < 112) continue;
                    r.hasOwnProperty(e) && (u[r[e]] = e)
                }
            }
            return u
        }

        function O(e, t, n) {
            return n || (n = A()[e] ? "keydown" : "keypress"), n == "keypress" && t.length && (n = "keydown"), n
        }

        function M(e, t, n, r) {
            function i(t) {
                return function() {
                    d = t, ++l[e], L()
                }
            }

            function s(t) {
                T(n, t, e), r !== "keyup" && (h = g(t)), setTimeout(b, 10)
            }
            l[e] = 0;
            for (var o = 0; o < t.length; ++o) {
                var u = o + 1 === t.length,
                    a = u ? s : i(r || D(t[o + 1]).action);
                P(t[o], a, r, e, o)
            }
        }

        function _(e) {
            return e === "+" ? ["+"] : e.split("+")
        }

        function D(e, t) {
            var n, r, i, u = [];
            n = _(e);
            for (i = 0; i < n.length; ++i) r = n[i], o[r] && (r = o[r]), t && t != "keypress" && s[r] && (r = s[r], u.push("shift")), k(r) && u.push(r);
            return t = O(r, u, t), {
                key: r,
                modifiers: u,
                action: t
            }
        }

        function P(e, t, n, r, i) {
            f[e + ":" + n] = t, e = e.replace(/\s+/g, " ");
            var s = e.split(" "),
                o;
            if (s.length > 1) {
                M(e, s, t, n);
                return
            }
            o = D(e, n), a[o.key] = a[o.key] || [], w(o.key, o.modifiers, {
                type: o.action
            }, r, e, i), a[o.key][r ? "unshift" : "push"]({
                callback: t,
                modifiers: o.modifiers,
                action: o.action,
                seq: r,
                level: i,
                combo: e
            })
        }

        function H(e, t, n) {
            for (var r = 0; r < e.length; ++r) P(e[r], t, n)
        }
        var r = {
                8: "backspace",
                9: "tab",
                13: "enter",
                16: "shift",
                17: "ctrl",
                18: "alt",
                20: "capslock",
                27: "esc",
                32: "space",
                33: "pageup",
                34: "pagedown",
                35: "end",
                36: "home",
                37: "left",
                38: "up",
                39: "right",
                40: "down",
                45: "ins",
                46: "del",
                91: "meta",
                93: "meta",
                224: "meta"
            },
            i = {
                106: "*",
                107: "+",
                109: "-",
                110: ".",
                111: "/",
                186: ";",
                187: "=",
                188: ",",
                189: "-",
                190: ".",
                191: "/",
                192: "`",
                219: "[",
                220: "\\",
                221: "]",
                222: "'"
            },
            s = {
                "~": "`",
                "!": "1",
                "@": "2",
                "#": "3",
                $: "4",
                "%": "5",
                "^": "6",
                "&": "7",
                "*": "8",
                "(": "9",
                ")": "0",
                _: "-",
                "+": "=",
                ":": ";",
                '"': "'",
                "<": ",",
                ">": ".",
                "?": "/",
                "|": "\\"
            },
            o = {
                option: "alt",
                command: "meta",
                "return": "enter",
                escape: "esc",
                mod: /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? "meta" : "ctrl"
            },
            u, a = {},
            f = {},
            l = {},
            c, h = !1,
            p = !1,
            d = !1;
        for (var v = 1; v < 20; ++v) r[111 + v] = "f" + v;
        for (v = 0; v <= 9; ++v) r[v + 96] = v;
        m(t, "keypress", C), m(t, "keydown", C), m(t, "keyup", C);
        var B = {
            bind: function(e, t, n) {
                return e = e instanceof Array ? e : [e], H(e, t, n), this
            },
            unbind: function(e, t) {
                return B.bind(e, function() {}, t)
            },
            trigger: function(e, t) {
                return f[e + ":" + t] && f[e + ":" + t]({}, e), this
            },
            reset: function() {
                return a = {}, f = {}, this
            },
            stopCallback: function(e, t) {
                return (" " + t.className + " ").indexOf(" mousetrap ") > -1 ? !1 : t.tagName == "INPUT" || t.tagName == "SELECT" || t.tagName == "TEXTAREA" || t.isContentEditable
            },
            handleKey: N
        };
        e.Mousetrap = B, typeof define == "function" && define.amd && define("Mousetrap", B)
    }(window, document),
    function(e) {
        function S(e) {
            throw RangeError(g[e])
        }

        function x(e, t) {
            var n = e.length;
            while (n--) e[n] = t(e[n]);
            return e
        }

        function T(e, t) {
            return x(e.split(m), t).join(".")
        }

        function N(e) {
            var t = [],
                n = 0,
                r = e.length,
                i, s;
            while (n < r) i = e.charCodeAt(n++), i >= 55296 && i <= 56319 && n < r ? (s = e.charCodeAt(n++), (s & 64512) == 56320 ? t.push(((i & 1023) << 10) + (s & 1023) + 65536) : (t.push(i), n--)) : t.push(i);
            return t
        }

        function C(e) {
            return x(e, function(e) {
                var t = "";
                return e > 65535 && (e -= 65536, t += w(e >>> 10 & 1023 | 55296), e = 56320 | e & 1023), t += w(e), t
            }).join("")
        }

        function k(e) {
            return e - 48 < 10 ? e - 22 : e - 65 < 26 ? e - 65 : e - 97 < 26 ? e - 97 : o
        }

        function L(e, t) {
            return e + 22 + 75 * (e < 26) - ((t != 0) << 5)
        }

        function A(e, t, n) {
            var r = 0;
            e = n ? b(e / l) : e >> 1, e += b(e / t);
            for (; e > y * a >> 1; r += o) e = b(e / y);
            return b(r + (y + 1) * e / (e + f))
        }

        function O(e) {
            var t = [],
                n = e.length,
                r, i = 0,
                f = h,
                l = c,
                d, v, m, g, y, w, E, x, T, N;
            d = e.lastIndexOf(p), d < 0 && (d = 0);
            for (v = 0; v < d; ++v) e.charCodeAt(v) >= 128 && S("not-basic"), t.push(e.charCodeAt(v));
            for (m = d > 0 ? d + 1 : 0; m < n;) {
                for (g = i, y = 1, w = o;; w += o) {
                    m >= n && S("invalid-input"), E = k(e.charCodeAt(m++)), (E >= o || E > b((s - i) / y)) && S("overflow"), i += E * y, x = w <= l ? u : w >= l + a ? a : w - l;
                    if (E < x) break;
                    N = o - x, y > b(s / N) && S("overflow"), y *= N
                }
                r = t.length + 1, l = A(i - g, r, g == 0), b(i / r) > s - f && S("overflow"), f += b(i / r), i %= r, t.splice(i++, 0, f)
            }
            return C(t)
        }

        function M(e) {
            var t, n, r, i, f, l, d, v, m, g, y, E = [],
                x, T, C, k;
            e = N(e), x = e.length, t = h, n = 0, f = c;
            for (l = 0; l < x; ++l) y = e[l], y < 128 && E.push(w(y));
            r = i = E.length, i && E.push(p);
            while (r < x) {
                for (d = s, l = 0; l < x; ++l) y = e[l], y >= t && y < d && (d = y);
                T = r + 1, d - t > b((s - n) / T) && S("overflow"), n += (d - t) * T, t = d;
                for (l = 0; l < x; ++l) {
                    y = e[l], y < t && ++n > s && S("overflow");
                    if (y == t) {
                        for (v = n, m = o;; m += o) {
                            g = m <= f ? u : m >= f + a ? a : m - f;
                            if (v < g) break;
                            k = v - g, C = o - g, E.push(w(L(g + k % C, 0))), v = b(k / C)
                        }
                        E.push(w(L(v, 0))), f = A(n, T, r == i), n = 0, ++r
                    }
                }++n, ++t
            }
            return E.join("")
        }

        function _(e) {
            return T(e, function(e) {
                return d.test(e) ? O(e.slice(4).toLowerCase()) : e
            })
        }

        function D(e) {
            return T(e, function(e) {
                return v.test(e) ? "xn--" + M(e) : e
            })
        }
        var t = typeof exports == "object" && exports,
            n = typeof module == "object" && module && module.exports == t && module,
            r = typeof global == "object" && global;
        if (r.global === r || r.window === r) e = r;
        var i, s = 2147483647,
            o = 36,
            u = 1,
            a = 26,
            f = 38,
            l = 700,
            c = 72,
            h = 128,
            p = "-",
            d = /^xn--/,
            v = /[^ -~]/,
            m = /\x2E|\u3002|\uFF0E|\uFF61/g,
            g = {
                overflow: "Overflow: input needs wider integers to process",
                "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                "invalid-input": "Invalid input"
            },
            y = o - u,
            b = Math.floor,
            w = String.fromCharCode,
            E;
        i = {
            version: "1.2.3",
            ucs2: {
                decode: N,
                encode: C
            },
            decode: O,
            encode: M,
            toASCII: D,
            toUnicode: _
        };
        if (typeof define == "function" && typeof define.amd == "object" && define.amd) define("URIjs/punycode", [], function() {
            return i
        });
        else if (t && !t.nodeType)
            if (n) n.exports = i;
            else
                for (E in i) i.hasOwnProperty(E) && (t[E] = i[E]);
        else e.punycode = i
    }(this),
    function(e, t) {
        typeof exports == "object" ? module.exports = t() : typeof define == "function" && define.amd ? define("URIjs/IPv6", t) : e.IPv6 = t(e)
    }(this, function(e) {
        function n(e) {
            var t = e.toLowerCase(),
                n = t.split(":"),
                r = n.length,
                i = 8;
            n[0] === "" && n[1] === "" && n[2] === "" ? (n.shift(), n.shift()) : n[0] === "" && n[1] === "" ? n.shift() : n[r - 1] === "" && n[r - 2] === "" && n.pop(), r = n.length, n[r - 1].indexOf(".") !== -1 && (i = 7);
            var s;
            for (s = 0; s < r; s++)
                if (n[s] === "") break;
            if (s < i) {
                n.splice(s, 1, "0000");
                while (n.length < i) n.splice(s, 0, "0000");
                r = n.length
            }
            var o;
            for (var u = 0; u < i; u++) {
                o = n[u].split("");
                for (var a = 0; a < 3; a++) {
                    if (!(o[0] === "0" && o.length > 1)) break;
                    o.splice(0, 1)
                }
                n[u] = o.join("")
            }
            var f = -1,
                l = 0,
                c = 0,
                h = -1,
                p = !1;
            for (u = 0; u < i; u++) p ? n[u] === "0" ? c += 1 : (p = !1, c > l && (f = h, l = c)) : n[u] === "0" && (p = !0, h = u, c = 1);
            c > l && (f = h, l = c), l > 1 && n.splice(f, l, ""), r = n.length;
            var d = "";
            n[0] === "" && (d = ":");
            for (u = 0; u < r; u++) {
                d += n[u];
                if (u === r - 1) break;
                d += ":"
            }
            return n[r - 1] === "" && (d += ":"), d
        }

        function r() {
            return e.IPv6 === this && (e.IPv6 = t), this
        }
        var t = e && e.IPv6;
        return {
            best: n,
            noConflict: r
        }
    }),
    function(e, t) {
        typeof exports == "object" ? module.exports = t() : typeof define == "function" && define.amd ? define("URIjs/SecondLevelDomains", t) : e.SecondLevelDomains = t(e)
    }(this, function(e) {
        var t = e && e.SecondLevelDomains,
            n = {
                list: {
                    ac: " com gov mil net org ",
                    ae: " ac co gov mil name net org pro sch ",
                    af: " com edu gov net org ",
                    al: " com edu gov mil net org ",
                    ao: " co ed gv it og pb ",
                    ar: " com edu gob gov int mil net org tur ",
                    at: " ac co gv or ",
                    au: " asn com csiro edu gov id net org ",
                    ba: " co com edu gov mil net org rs unbi unmo unsa untz unze ",
                    bb: " biz co com edu gov info net org store tv ",
                    bh: " biz cc com edu gov info net org ",
                    bn: " com edu gov net org ",
                    bo: " com edu gob gov int mil net org tv ",
                    br: " adm adv agr am arq art ato b bio blog bmd cim cng cnt com coop ecn edu eng esp etc eti far flog fm fnd fot fst g12 ggf gov imb ind inf jor jus lel mat med mil mus net nom not ntr odo org ppg pro psc psi qsl rec slg srv tmp trd tur tv vet vlog wiki zlg ",
                    bs: " com edu gov net org ",
                    bz: " du et om ov rg ",
                    ca: " ab bc mb nb nf nl ns nt nu on pe qc sk yk ",
                    ck: " biz co edu gen gov info net org ",
                    cn: " ac ah bj com cq edu fj gd gov gs gx gz ha hb he hi hl hn jl js jx ln mil net nm nx org qh sc sd sh sn sx tj tw xj xz yn zj ",
                    co: " com edu gov mil net nom org ",
                    cr: " ac c co ed fi go or sa ",
                    cy: " ac biz com ekloges gov ltd name net org parliament press pro tm ",
                    "do": " art com edu gob gov mil net org sld web ",
                    dz: " art asso com edu gov net org pol ",
                    ec: " com edu fin gov info med mil net org pro ",
                    eg: " com edu eun gov mil name net org sci ",
                    er: " com edu gov ind mil net org rochest w ",
                    es: " com edu gob nom org ",
                    et: " biz com edu gov info name net org ",
                    fj: " ac biz com info mil name net org pro ",
                    fk: " ac co gov net nom org ",
                    fr: " asso com f gouv nom prd presse tm ",
                    gg: " co net org ",
                    gh: " com edu gov mil org ",
                    gn: " ac com gov net org ",
                    gr: " com edu gov mil net org ",
                    gt: " com edu gob ind mil net org ",
                    gu: " com edu gov net org ",
                    hk: " com edu gov idv net org ",
                    id: " ac co go mil net or sch web ",
                    il: " ac co gov idf k12 muni net org ",
                    "in": " ac co edu ernet firm gen gov i ind mil net nic org res ",
                    iq: " com edu gov i mil net org ",
                    ir: " ac co dnssec gov i id net org sch ",
                    it: " edu gov ",
                    je: " co net org ",
                    jo: " com edu gov mil name net org sch ",
                    jp: " ac ad co ed go gr lg ne or ",
                    ke: " ac co go info me mobi ne or sc ",
                    kh: " com edu gov mil net org per ",
                    ki: " biz com de edu gov info mob net org tel ",
                    km: " asso com coop edu gouv k medecin mil nom notaires pharmaciens presse tm veterinaire ",
                    kn: " edu gov net org ",
                    kr: " ac busan chungbuk chungnam co daegu daejeon es gangwon go gwangju gyeongbuk gyeonggi gyeongnam hs incheon jeju jeonbuk jeonnam k kg mil ms ne or pe re sc seoul ulsan ",
                    kw: " com edu gov net org ",
                    ky: " com edu gov net org ",
                    kz: " com edu gov mil net org ",
                    lb: " com edu gov net org ",
                    lk: " assn com edu gov grp hotel int ltd net ngo org sch soc web ",
                    lr: " com edu gov net org ",
                    lv: " asn com conf edu gov id mil net org ",
                    ly: " com edu gov id med net org plc sch ",
                    ma: " ac co gov m net org press ",
                    mc: " asso tm ",
                    me: " ac co edu gov its net org priv ",
                    mg: " com edu gov mil nom org prd tm ",
                    mk: " com edu gov inf name net org pro ",
                    ml: " com edu gov net org presse ",
                    mn: " edu gov org ",
                    mo: " com edu gov net org ",
                    mt: " com edu gov net org ",
                    mv: " aero biz com coop edu gov info int mil museum name net org pro ",
                    mw: " ac co com coop edu gov int museum net org ",
                    mx: " com edu gob net org ",
                    my: " com edu gov mil name net org sch ",
                    nf: " arts com firm info net other per rec store web ",
                    ng: " biz com edu gov mil mobi name net org sch ",
                    ni: " ac co com edu gob mil net nom org ",
                    np: " com edu gov mil net org ",
                    nr: " biz com edu gov info net org ",
                    om: " ac biz co com edu gov med mil museum net org pro sch ",
                    pe: " com edu gob mil net nom org sld ",
                    ph: " com edu gov i mil net ngo org ",
                    pk: " biz com edu fam gob gok gon gop gos gov net org web ",
                    pl: " art bialystok biz com edu gda gdansk gorzow gov info katowice krakow lodz lublin mil net ngo olsztyn org poznan pwr radom slupsk szczecin torun warszawa waw wroc wroclaw zgora ",
                    pr: " ac biz com edu est gov info isla name net org pro prof ",
                    ps: " com edu gov net org plo sec ",
                    pw: " belau co ed go ne or ",
                    ro: " arts com firm info nom nt org rec store tm www ",
                    rs: " ac co edu gov in org ",
                    sb: " com edu gov net org ",
                    sc: " com edu gov net org ",
                    sh: " co com edu gov net nom org ",
                    sl: " com edu gov net org ",
                    st: " co com consulado edu embaixada gov mil net org principe saotome store ",
                    sv: " com edu gob org red ",
                    sz: " ac co org ",
                    tr: " av bbs bel biz com dr edu gen gov info k12 name net org pol tel tsk tv web ",
                    tt: " aero biz cat co com coop edu gov info int jobs mil mobi museum name net org pro tel travel ",
                    tw: " club com ebiz edu game gov idv mil net org ",
                    mu: " ac co com gov net or org ",
                    mz: " ac co edu gov org ",
                    na: " co com ",
                    nz: " ac co cri geek gen govt health iwi maori mil net org parliament school ",
                    pa: " abo ac com edu gob ing med net nom org sld ",
                    pt: " com edu gov int net nome org publ ",
                    py: " com edu gov mil net org ",
                    qa: " com edu gov mil net org ",
                    re: " asso com nom ",
                    ru: " ac adygeya altai amur arkhangelsk astrakhan bashkiria belgorod bir bryansk buryatia cbg chel chelyabinsk chita chukotka chuvashia com dagestan e-burg edu gov grozny int irkutsk ivanovo izhevsk jar joshkar-ola kalmykia kaluga kamchatka karelia kazan kchr kemerovo khabarovsk khakassia khv kirov koenig komi kostroma kranoyarsk kuban kurgan kursk lipetsk magadan mari mari-el marine mil mordovia mosreg msk murmansk nalchik net nnov nov novosibirsk nsk omsk orenburg org oryol penza perm pp pskov ptz rnd ryazan sakhalin samara saratov simbirsk smolensk spb stavropol stv surgut tambov tatarstan tom tomsk tsaritsyn tsk tula tuva tver tyumen udm udmurtia ulan-ude vladikavkaz vladimir vladivostok volgograd vologda voronezh vrn vyatka yakutia yamal yekaterinburg yuzhno-sakhalinsk ",
                    rw: " ac co com edu gouv gov int mil net ",
                    sa: " com edu gov med net org pub sch ",
                    sd: " com edu gov info med net org tv ",
                    se: " a ac b bd c d e f g h i k l m n o org p parti pp press r s t tm u w x y z ",
                    sg: " com edu gov idn net org per ",
                    sn: " art com edu gouv org perso univ ",
                    sy: " com edu gov mil net news org ",
                    th: " ac co go in mi net or ",
                    tj: " ac biz co com edu go gov info int mil name net nic org test web ",
                    tn: " agrinet com defense edunet ens fin gov ind info intl mincom nat net org perso rnrt rns rnu tourism ",
                    tz: " ac co go ne or ",
                    ua: " biz cherkassy chernigov chernovtsy ck cn co com crimea cv dn dnepropetrovsk donetsk dp edu gov if in ivano-frankivsk kh kharkov kherson khmelnitskiy kiev kirovograd km kr ks kv lg lugansk lutsk lviv me mk net nikolaev od odessa org pl poltava pp rovno rv sebastopol sumy te ternopil uzhgorod vinnica vn zaporizhzhe zhitomir zp zt ",
                    ug: " ac co go ne or org sc ",
                    uk: " ac bl british-library co cym gov govt icnet jet lea ltd me mil mod national-library-scotland nel net nhs nic nls org orgn parliament plc police sch scot soc ",
                    us: " dni fed isa kids nsn ",
                    uy: " com edu gub mil net org ",
                    ve: " co com edu gob info mil net org web ",
                    vi: " co com k12 net org ",
                    vn: " ac biz com edu gov health info int name net org pro ",
                    ye: " co com gov ltd me net org plc ",
                    yu: " ac co edu gov org ",
                    za: " ac agric alt bourse city co cybernet db edu gov grondar iaccess imt inca landesign law mil net ngo nis nom olivetti org pix school tm web ",
                    zm: " ac co com edu gov net org sch "
                },
                has: function(e) {
                    var t = e.lastIndexOf(".");
                    if (t <= 0 || t >= e.length - 1) return !1;
                    var r = e.lastIndexOf(".", t - 1);
                    if (r <= 0 || r >= t - 1) return !1;
                    var i = n.list[e.slice(t + 1)];
                    return i ? i.indexOf(" " + e.slice(r + 1, t) + " ") >= 0 : !1
                },
                is: function(e) {
                    var t = e.lastIndexOf(".");
                    if (t <= 0 || t >= e.length - 1) return !1;
                    var r = e.lastIndexOf(".", t - 1);
                    if (r >= 0) return !1;
                    var i = n.list[e.slice(t + 1)];
                    return i ? i.indexOf(" " + e.slice(0, t) + " ") >= 0 : !1
                },
                get: function(e) {
                    var t = e.lastIndexOf(".");
                    if (t <= 0 || t >= e.length - 1) return null;
                    var r = e.lastIndexOf(".", t - 1);
                    if (r <= 0 || r >= t - 1) return null;
                    var i = n.list[e.slice(t + 1)];
                    return i ? i.indexOf(" " + e.slice(r + 1, t) + " ") < 0 ? null : e.slice(r + 1) : null
                },
                noConflict: function() {
                    return e.SecondLevelDomains === this && (e.SecondLevelDomains = t), this
                }
            };
        return n
    }),
    function(e, t) {
        typeof exports == "object" ? module.exports = t(require("./punycode"), require("./IPv6"), require("./SecondLevelDomains")) : typeof define == "function" && define.amd ? define("URIjs/URI", ["./punycode", "./IPv6", "./SecondLevelDomains"], t) : e.URI = t(e.punycode, e.IPv6, e.SecondLevelDomains, e)
    }(this, function(e, t, n, r) {
        function s(e, t) {
            return this instanceof s ? (e === undefined && (typeof location != "undefined" ? e = location.href + "" : e = ""), this.href(e), t !== undefined ? this.absoluteTo(t) : this) : new s(e, t)
        }

        function a(e) {
            return e.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1")
        }

        function f(e) {
            return e === undefined ? "Undefined" : String(Object.prototype.toString.call(e)).slice(8, -1)
        }

        function l(e) {
            return f(e) === "Array"
        }

        function c(e, t) {
            var n = {},
                r, i;
            if (l(t))
                for (r = 0, i = t.length; r < i; r++) n[t[r]] = !0;
            else n[t] = !0;
            for (r = 0, i = e.length; r < i; r++) n[e[r]] !== undefined && (e.splice(r, 1), i--, r--);
            return e
        }

        function h(e, t) {
            var n, r;
            if (l(t)) {
                for (n = 0, r = t.length; n < r; n++)
                    if (!h(e, t[n])) return !1;
                return !0
            }
            var i = f(t);
            for (n = 0, r = e.length; n < r; n++)
                if (i === "RegExp") {
                    if (typeof e[n] == "string" && e[n].match(t)) return !0
                } else if (e[n] === t) return !0;
            return !1
        }

        function p(e, t) {
            if (!l(e) || !l(t)) return !1;
            if (e.length !== t.length) return !1;
            e.sort(), t.sort();
            for (var n = 0, r = e.length; n < r; n++)
                if (e[n] !== t[n]) return !1;
            return !0
        }

        function d(e) {
            return escape(e)
        }

        function v(e) {
            return encodeURIComponent(e).replace(/[!'()*]/g, d).replace(/\*/g, "%2A")
        }
        var i = r && r.URI;
        s.version = "1.13.1";
        var o = s.prototype,
            u = Object.prototype.hasOwnProperty;
        s._parts = function() {
            return {
                protocol: null,
                username: null,
                password: null,
                hostname: null,
                urn: null,
                port: null,
                path: null,
                query: null,
                fragment: null,
                duplicateQueryParameters: s.duplicateQueryParameters,
                escapeQuerySpace: s.escapeQuerySpace
            }
        }, s.duplicateQueryParameters = !1, s.escapeQuerySpace = !0, s.protocol_expression = /^[a-z][a-z0-9.+-]*$/i, s.idn_expression = /[^a-z0-9\.-]/i, s.punycode_expression = /(xn--)/i, s.ip4_expression = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/, s.ip6_expression = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/, s.find_uri_expression = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig, s.findUri = {
            start: /\b(?:([a-z][a-z0-9.+-]*:\/\/)|www\.)/gi,
            end: /[\s\r\n]|$/,
            trim: /[`!()\[\]{};:'".,<>?«»“”„‘’]+$/
        }, s.defaultPorts = {
            http: "80",
            https: "443",
            ftp: "21",
            gopher: "70",
            ws: "80",
            wss: "443"
        }, s.invalid_hostname_characters = /[^a-zA-Z0-9\.-]/, s.domAttributes = {
            a: "href",
            blockquote: "cite",
            link: "href",
            base: "href",
            script: "src",
            form: "action",
            img: "src",
            area: "href",
            iframe: "src",
            embed: "src",
            source: "src",
            track: "src",
            input: "src"
        }, s.getDomAttribute = function(e) {
            if (!e || !e.nodeName) return undefined;
            var t = e.nodeName.toLowerCase();
            return t === "input" && e.type !== "image" ? undefined : s.domAttributes[t]
        }, s.encode = v, s.decode = decodeURIComponent, s.iso8859 = function() {
            s.encode = escape, s.decode = unescape
        }, s.unicode = function() {
            s.encode = v, s.decode = decodeURIComponent
        }, s.characters = {
            pathname: {
                encode: {
                    expression: /%(24|26|2B|2C|3B|3D|3A|40)/ig,
                    map: {
                        "%24": "$",
                        "%26": "&",
                        "%2B": "+",
                        "%2C": ",",
                        "%3B": ";",
                        "%3D": "=",
                        "%3A": ":",
                        "%40": "@"
                    }
                },
                decode: {
                    expression: /[\/\?#]/g,
                    map: {
                        "/": "%2F",
                        "?": "%3F",
                        "#": "%23"
                    }
                }
            },
            reserved: {
                encode: {
                    expression: /%(21|23|24|26|27|28|29|2A|2B|2C|2F|3A|3B|3D|3F|40|5B|5D)/ig,
                    map: {
                        "%3A": ":",
                        "%2F": "/",
                        "%3F": "?",
                        "%23": "#",
                        "%5B": "[",
                        "%5D": "]",
                        "%40": "@",
                        "%21": "!",
                        "%24": "$",
                        "%26": "&",
                        "%27": "'",
                        "%28": "(",
                        "%29": ")",
                        "%2A": "*",
                        "%2B": "+",
                        "%2C": ",",
                        "%3B": ";",
                        "%3D": "="
                    }
                }
            }
        }, s.encodeQuery = function(e, t) {
            var n = s.encode(e + "");
            return t === undefined && (t = s.escapeQuerySpace), t ? n.replace(/%20/g, "+") : n
        }, s.decodeQuery = function(e, t) {
            e += "", t === undefined && (t = s.escapeQuerySpace);
            try {
                return s.decode(t ? e.replace(/\+/g, "%20") : e)
            } catch (n) {
                return e
            }
        }, s.recodePath = function(e) {
            var t = (e + "").split("/");
            for (var n = 0, r = t.length; n < r; n++) t[n] = s.encodePathSegment(s.decode(t[n]));
            return t.join("/")
        }, s.decodePath = function(e) {
            var t = (e + "").split("/");
            for (var n = 0, r = t.length; n < r; n++) t[n] = s.decodePathSegment(t[n]);
            return t.join("/")
        };
        var m = {
                encode: "encode",
                decode: "decode"
            },
            g, y = function(e, t) {
                return function(n) {
                    return s[t](n + "").replace(s.characters[e][t].expression, function(n) {
                        return s.characters[e][t].map[n]
                    })
                }
            };
        for (g in m) s[g + "PathSegment"] = y("pathname", m[g]);
        s.encodeReserved = y("reserved", "encode"), s.parse = function(e, t) {
            var n;
            return t || (t = {}), n = e.indexOf("#"), n > -1 && (t.fragment = e.substring(n + 1) || null, e = e.substring(0, n)), n = e.indexOf("?"), n > -1 && (t.query = e.substring(n + 1) || null, e = e.substring(0, n)), e.substring(0, 2) === "//" ? (t.protocol = null, e = e.substring(2), e = s.parseAuthority(e, t)) : (n = e.indexOf(":"), n > -1 && (t.protocol = e.substring(0, n) || null, t.protocol && !t.protocol.match(s.protocol_expression) ? t.protocol = undefined : t.protocol === "file" ? e = e.substring(n + 3) : e.substring(n + 1, n + 3) === "//" ? (e = e.substring(n + 3), e = s.parseAuthority(e, t)) : (e = e.substring(n + 1), t.urn = !0))), t.path = e, t
        }, s.parseHost = function(e, t) {
            var n = e.indexOf("/"),
                r, i;
            return n === -1 && (n = e.length), e.charAt(0) === "[" ? (r = e.indexOf("]"), t.hostname = e.substring(1, r) || null, t.port = e.substring(r + 2, n) || null, t.port === "/" && (t.port = null)) : e.indexOf(":") !== e.lastIndexOf(":") ? (t.hostname = e.substring(0, n) || null, t.port = null) : (i = e.substring(0, n).split(":"), t.hostname = i[0] || null, t.port = i[1] || null), t.hostname && e.substring(n).charAt(0) !== "/" && (n++, e = "/" + e), e.substring(n) || "/"
        }, s.parseAuthority = function(e, t) {
            return e = s.parseUserinfo(e, t), s.parseHost(e, t)
        }, s.parseUserinfo = function(e, t) {
            var n = e.indexOf("/"),
                r = n > -1 ? e.lastIndexOf("@", n) : e.indexOf("@"),
                i;
            return r > -1 && (n === -1 || r < n) ? (i = e.substring(0, r).split(":"), t.username = i[0] ? s.decode(i[0]) : null, i.shift(), t.password = i[0] ? s.decode(i.join(":")) : null, e = e.substring(r + 1)) : (t.username = null, t.password = null), e
        }, s.parseQuery = function(e, t) {
            if (!e) return {};
            e = e.replace(/&+/g, "&").replace(/^\?*&*|&+$/g, "");
            if (!e) return {};
            var n = {},
                r = e.split("&"),
                i = r.length,
                o, u, a;
            for (var f = 0; f < i; f++) o = r[f].split("="), u = s.decodeQuery(o.shift(), t), a = o.length ? s.decodeQuery(o.join("="), t) : null, n[u] ? (typeof n[u] == "string" && (n[u] = [n[u]]), n[u].push(a)) : n[u] = a;
            return n
        }, s.build = function(e) {
            var t = "";
            return e.protocol && (t += e.protocol + ":"), !e.urn && (t || e.hostname) && (t += "//"), t += s.buildAuthority(e) || "", typeof e.path == "string" && (e.path.charAt(0) !== "/" && typeof e.hostname == "string" && (t += "/"), t += e.path), typeof e.query == "string" && e.query && (t += "?" + e.query), typeof e.fragment == "string" && e.fragment && (t += "#" + e.fragment), t
        }, s.buildHost = function(e) {
            var t = "";
            return e.hostname ? (s.ip6_expression.test(e.hostname) ? t += "[" + e.hostname + "]" : t += e.hostname, e.port && (t += ":" + e.port), t) : ""
        }, s.buildAuthority = function(e) {
            return s.buildUserinfo(e) + s.buildHost(e)
        }, s.buildUserinfo = function(e) {
            var t = "";
            return e.username && (t += s.encode(e.username), e.password && (t += ":" + s.encode(e.password)), t += "@"), t
        }, s.buildQuery = function(e, t, n) {
            var r = "",
                i, o, a, f;
            for (o in e)
                if (u.call(e, o) && o)
                    if (l(e[o])) {
                        i = {};
                        for (a = 0, f = e[o].length; a < f; a++) e[o][a] !== undefined && i[e[o][a] + ""] === undefined && (r += "&" + s.buildQueryParameter(o, e[o][a], n), t !== !0 && (i[e[o][a] + ""] = !0))
                    } else e[o] !== undefined && (r += "&" + s.buildQueryParameter(o, e[o], n));
            return r.substring(1)
        }, s.buildQueryParameter = function(e, t, n) {
            return s.encodeQuery(e, n) + (t !== null ? "=" + s.encodeQuery(t, n) : "")
        }, s.addQuery = function(e, t, n) {
            if (typeof t == "object")
                for (var r in t) u.call(t, r) && s.addQuery(e, r, t[r]);
            else {
                if (typeof t != "string") throw new TypeError("URI.addQuery() accepts an object, string as the name parameter");
                if (e[t] === undefined) {
                    e[t] = n;
                    return
                }
                typeof e[t] == "string" && (e[t] = [e[t]]), l(n) || (n = [n]), e[t] = e[t].concat(n)
            }
        }, s.removeQuery = function(e, t, n) {
            var r, i, o;
            if (l(t))
                for (r = 0, i = t.length; r < i; r++) e[t[r]] = undefined;
            else if (typeof t == "object")
                for (o in t) u.call(t, o) && s.removeQuery(e, o, t[o]);
            else {
                if (typeof t != "string") throw new TypeError("URI.addQuery() accepts an object, string as the first parameter");
                n !== undefined ? e[t] === n ? e[t] = undefined : l(e[t]) && (e[t] = c(e[t], n)) : e[t] = undefined
            }
        }, s.hasQuery = function(e, t, n, r) {
            if (typeof t == "object") {
                for (var i in t)
                    if (u.call(t, i) && !s.hasQuery(e, i, t[i])) return !1;
                return !0
            }
            if (typeof t != "string") throw new TypeError("URI.hasQuery() accepts an object, string as the name parameter");
            switch (f(n)) {
                case "Undefined":
                    return t in e;
                case "Boolean":
                    var o = Boolean(l(e[t]) ? e[t].length : e[t]);
                    return n === o;
                case "Function":
                    return !!n(e[t], t, e);
                case "Array":
                    if (!l(e[t])) return !1;
                    var a = r ? h : p;
                    return a(e[t], n);
                case "RegExp":
                    if (!l(e[t])) return Boolean(e[t] && e[t].match(n));
                    if (!r) return !1;
                    return h(e[t], n);
                case "Number":
                    n = String(n);
                case "String":
                    if (!l(e[t])) return e[t] === n;
                    if (!r) return !1;
                    return h(e[t], n);
                default:
                    throw new TypeError("URI.hasQuery() accepts undefined, boolean, string, number, RegExp, Function as the value parameter")
            }
        }, s.commonPath = function(e, t) {
            var n = Math.min(e.length, t.length),
                r;
            for (r = 0; r < n; r++)
                if (e.charAt(r) !== t.charAt(r)) {
                    r--;
                    break
                }
            if (r < 1) return e.charAt(0) === t.charAt(0) && e.charAt(0) === "/" ? "/" : "";
            if (e.charAt(r) !== "/" || t.charAt(r) !== "/") r = e.substring(0, r).lastIndexOf("/");
            return e.substring(0, r + 1)
        }, s.withinString = function(e, t, n) {
            n || (n = {});
            var r = n.start || s.findUri.start,
                i = n.end || s.findUri.end,
                o = n.trim || s.findUri.trim,
                u = /[a-z0-9-]=["']?$/i;
            r.lastIndex = 0;
            for (;;) {
                var a = r.exec(e);
                if (!a) break;
                var f = a.index;
                if (n.ignoreHtml) {
                    var l = e.slice(Math.max(f - 3, 0), f);
                    if (l && u.test(l)) continue
                }
                var c = f + e.slice(f).search(i),
                    h = e.slice(f, c).replace(o, "");
                if (n.ignore && n.ignore.test(h)) continue;
                c = f + h.length;
                var p = t(h, f, c, e);
                e = e.slice(0, f) + p + e.slice(c), r.lastIndex = f + p.length
            }
            return r.lastIndex = 0, e
        }, s.ensureValidHostname = function(t) {
            if (t.match(s.invalid_hostname_characters)) {
                if (!e) throw new TypeError('Hostname "' + t + '" contains characters other than [A-Z0-9.-] and Punycode.js is not available');
                if (e.toASCII(t).match(s.invalid_hostname_characters)) throw new TypeError('Hostname "' + t + '" contains characters other than [A-Z0-9.-]')
            }
        }, s.noConflict = function(e) {
            if (e) {
                var t = {
                    URI: this.noConflict()
                };
                return r.URITemplate && typeof r.URITemplate.noConflict == "function" && (t.URITemplate = r.URITemplate.noConflict()), r.IPv6 && typeof r.IPv6.noConflict == "function" && (t.IPv6 = r.IPv6.noConflict()), r.SecondLevelDomains && typeof r.SecondLevelDomains.noConflict == "function" && (t.SecondLevelDomains = r.SecondLevelDomains.noConflict()), t
            }
            return r.URI === this && (r.URI = i), this
        }, o.build = function(e) {
            if (e === !0) this._deferred_build = !0;
            else if (e === undefined || this._deferred_build) this._string = s.build(this._parts), this._deferred_build = !1;
            return this
        }, o.clone = function() {
            return new s(this)
        }, o.valueOf = o.toString = function() {
            return this.build(!1)._string
        }, m = {
            protocol: "protocol",
            username: "username",
            password: "password",
            hostname: "hostname",
            port: "port"
        }, y = function(e) {
            return function(t, n) {
                return t === undefined ? this._parts[e] || "" : (this._parts[e] = t || null, this.build(!n), this)
            }
        };
        for (g in m) o[g] = y(m[g]);
        m = {
            query: "?",
            fragment: "#"
        }, y = function(e, t) {
            return function(n, r) {
                return n === undefined ? this._parts[e] || "" : (n !== null && (n += "", n.charAt(0) === t && (n = n.substring(1))), this._parts[e] = n, this.build(!r), this)
            }
        };
        for (g in m) o[g] = y(g, m[g]);
        m = {
            search: ["?", "query"],
            hash: ["#", "fragment"]
        }, y = function(e, t) {
            return function(n, r) {
                var i = this[e](n, r);
                return typeof i == "string" && i.length ? t + i : i
            }
        };
        for (g in m) o[g] = y(m[g][1], m[g][0]);
        o.pathname = function(e, t) {
            if (e === undefined || e === !0) {
                var n = this._parts.path || (this._parts.hostname ? "/" : "");
                return e ? s.decodePath(n) : n
            }
            return this._parts.path = e ? s.recodePath(e) : "/", this.build(!t), this
        }, o.path = o.pathname, o.href = function(e, t) {
            var n;
            if (e === undefined) return this.toString();
            this._string = "", this._parts = s._parts();
            var r = e instanceof s,
                i = typeof e == "object" && (e.hostname || e.path || e.pathname);
            if (e.nodeName) {
                var o = s.getDomAttribute(e);
                e = e[o] || "", i = !1
            }!r && i && e.pathname !== undefined && (e = e.toString());
            if (typeof e == "string") this._parts = s.parse(e, this._parts);
            else {
                if (!r && !i) throw new TypeError("invalid input");
                var a = r ? e._parts : e;
                for (n in a) u.call(this._parts, n) && (this._parts[n] = a[n])
            }
            return this.build(!t), this
        }, o.is = function(e) {
            var t = !1,
                r = !1,
                i = !1,
                o = !1,
                u = !1,
                a = !1,
                f = !1,
                l = !this._parts.urn;
            this._parts.hostname && (l = !1, r = s.ip4_expression.test(this._parts.hostname), i = s.ip6_expression.test(this._parts.hostname), t = r || i, o = !t, u = o && n && n.has(this._parts.hostname), a = o && s.idn_expression.test(this._parts.hostname), f = o && s.punycode_expression.test(this._parts.hostname));
            switch (e.toLowerCase()) {
                case "relative":
                    return l;
                case "absolute":
                    return !l;
                case "domain":
                case "name":
                    return o;
                case "sld":
                    return u;
                case "ip":
                    return t;
                case "ip4":
                case "ipv4":
                case "inet4":
                    return r;
                case "ip6":
                case "ipv6":
                case "inet6":
                    return i;
                case "idn":
                    return a;
                case "url":
                    return !this._parts.urn;
                case "urn":
                    return !!this._parts.urn;
                case "punycode":
                    return f
            }
            return null
        };
        var b = o.protocol,
            w = o.port,
            E = o.hostname;
        o.protocol = function(e, t) {
            if (e !== undefined && e) {
                e = e.replace(/:(\/\/)?$/, "");
                if (!e.match(s.protocol_expression)) throw new TypeError('Protocol "' + e + "\" contains characters other than [A-Z0-9.+-] or doesn't start with [A-Z]")
            }
            return b.call(this, e, t)
        }, o.scheme = o.protocol, o.port = function(e, t) {
            if (this._parts.urn) return e === undefined ? "" : this;
            if (e !== undefined) {
                e === 0 && (e = null);
                if (e) {
                    e += "", e.charAt(0) === ":" && (e = e.substring(1));
                    if (e.match(/[^0-9]/)) throw new TypeError('Port "' + e + '" contains characters other than [0-9]')
                }
            }
            return w.call(this, e, t)
        }, o.hostname = function(e, t) {
            if (this._parts.urn) return e === undefined ? "" : this;
            if (e !== undefined) {
                var n = {};
                s.parseHost(e, n), e = n.hostname
            }
            return E.call(this, e, t)
        }, o.host = function(e, t) {
            return this._parts.urn ? e === undefined ? "" : this : e === undefined ? this._parts.hostname ? s.buildHost(this._parts) : "" : (s.parseHost(e, this._parts), this.build(!t), this)
        }, o.authority = function(e, t) {
            return this._parts.urn ? e === undefined ? "" : this : e === undefined ? this._parts.hostname ? s.buildAuthority(this._parts) : "" : (s.parseAuthority(e, this._parts), this.build(!t), this)
        }, o.userinfo = function(e, t) {
            if (this._parts.urn) return e === undefined ? "" : this;
            if (e === undefined) {
                if (!this._parts.username) return "";
                var n = s.buildUserinfo(this._parts);
                return n.substring(0, n.length - 1)
            }
            return e[e.length - 1] !== "@" && (e += "@"), s.parseUserinfo(e, this._parts), this.build(!t), this
        }, o.resource = function(e, t) {
            var n;
            return e === undefined ? this.path() + this.search() + this.hash() : (n = s.parse(e), this._parts.path = n.path, this._parts.query = n.query, this._parts.fragment = n.fragment, this.build(!t), this)
        }, o.subdomain = function(e, t) {
            if (this._parts.urn) return e === undefined ? "" : this;
            if (e === undefined) {
                if (!this._parts.hostname || this.is("IP")) return "";
                var n = this._parts.hostname.length - this.domain().length - 1;
                return this._parts.hostname.substring(0, n) || ""
            }
            var r = this._parts.hostname.length - this.domain().length,
                i = this._parts.hostname.substring(0, r),
                o = new RegExp("^" + a(i));
            return e && e.charAt(e.length - 1) !== "." && (e += "."), e && s.ensureValidHostname(e), this._parts.hostname = this._parts.hostname.replace(o, e), this.build(!t), this
        }, o.domain = function(e, t) {
            if (this._parts.urn) return e === undefined ? "" : this;
            typeof e == "boolean" && (t = e, e = undefined);
            if (e === undefined) {
                if (!this._parts.hostname || this.is("IP")) return "";
                var n = this._parts.hostname.match(/\./g);
                if (n && n.length < 2) return this._parts.hostname;
                var r = this._parts.hostname.length - this.tld(t).length - 1;
                return r = this._parts.hostname.lastIndexOf(".", r - 1) + 1, this._parts.hostname.substring(r) || ""
            }
            if (!e) throw new TypeError("cannot set domain empty");
            s.ensureValidHostname(e);
            if (!this._parts.hostname || this.is("IP")) this._parts.hostname = e;
            else {
                var i = new RegExp(a(this.domain()) + "$");
                this._parts.hostname = this._parts.hostname.replace(i, e)
            }
            return this.build(!t), this
        }, o.tld = function(e, t) {
            if (this._parts.urn) return e === undefined ? "" : this;
            typeof e == "boolean" && (t = e, e = undefined);
            if (e === undefined) {
                if (!this._parts.hostname || this.is("IP")) return "";
                var r = this._parts.hostname.lastIndexOf("."),
                    i = this._parts.hostname.substring(r + 1);
                return t !== !0 && n && n.list[i.toLowerCase()] ? n.get(this._parts.hostname) || i : i
            }
            var s;
            if (!e) throw new TypeError("cannot set TLD empty");
            if (e.match(/[^a-zA-Z0-9-]/)) {
                if (!n || !n.is(e)) throw new TypeError('TLD "' + e + '" contains characters other than [A-Z0-9]');
                s = new RegExp(a(this.tld()) + "$"), this._parts.hostname = this._parts.hostname.replace(s, e)
            } else {
                if (!this._parts.hostname || this.is("IP")) throw new ReferenceError("cannot set TLD on non-domain host");
                s = new RegExp(a(this.tld()) + "$"), this._parts.hostname = this._parts.hostname.replace(s, e)
            }
            return this.build(!t), this
        }, o.directory = function(e, t) {
            if (this._parts.urn) return e === undefined ? "" : this;
            if (e === undefined || e === !0) {
                if (!this._parts.path && !this._parts.hostname) return "";
                if (this._parts.path === "/") return "/";
                var n = this._parts.path.length - this.filename().length - 1,
                    r = this._parts.path.substring(0, n) || (this._parts.hostname ? "/" : "");
                return e ? s.decodePath(r) : r
            }
            var i = this._parts.path.length - this.filename().length,
                o = this._parts.path.substring(0, i),
                u = new RegExp("^" + a(o));
            return this.is("relative") || (e || (e = "/"), e.charAt(0) !== "/" && (e = "/" + e)), e && e.charAt(e.length - 1) !== "/" && (e += "/"), e = s.recodePath(e), this._parts.path = this._parts.path.replace(u, e), this.build(!t), this
        }, o.filename = function(e, t) {
            if (this._parts.urn) return e === undefined ? "" : this;
            if (e === undefined || e === !0) {
                if (!this._parts.path || this._parts.path === "/") return "";
                var n = this._parts.path.lastIndexOf("/"),
                    r = this._parts.path.substring(n + 1);
                return e ? s.decodePathSegment(r) : r
            }
            var i = !1;
            e.charAt(0) === "/" && (e = e.substring(1)), e.match(/\.?\//) && (i = !0);
            var o = new RegExp(a(this.filename()) + "$");
            return e = s.recodePath(e), this._parts.path = this._parts.path.replace(o, e), i ? this.normalizePath(t) : this.build(!t), this
        }, o.suffix = function(e, t) {
            if (this._parts.urn) return e === undefined ? "" : this;
            if (e === undefined || e === !0) {
                if (!this._parts.path || this._parts.path === "/") return "";
                var n = this.filename(),
                    r = n.lastIndexOf("."),
                    i, o;
                return r === -1 ? "" : (i = n.substring(r + 1), o = /^[a-z0-9%]+$/i.test(i) ? i : "", e ? s.decodePathSegment(o) : o)
            }
            e.charAt(0) === "." && (e = e.substring(1));
            var u = this.suffix(),
                f;
            if (!u) {
                if (!e) return this;
                this._parts.path += "." + s.recodePath(e)
            } else e ? f = new RegExp(a(u) + "$") : f = new RegExp(a("." + u) + "$");
            return f && (e = s.recodePath(e), this._parts.path = this._parts.path.replace(f, e)), this.build(!t), this
        }, o.segment = function(e, t, n) {
            var r = this._parts.urn ? ":" : "/",
                i = this.path(),
                s = i.substring(0, 1) === "/",
                o = i.split(r);
            e !== undefined && typeof e != "number" && (n = t, t = e, e = undefined);
            if (e !== undefined && typeof e != "number") throw new Error('Bad segment "' + e + '", must be 0-based integer');
            s && o.shift(), e < 0 && (e = Math.max(o.length + e, 0));
            if (t === undefined) return e === undefined ? o : o[e];
            if (e === null || o[e] === undefined) {
                if (l(t)) {
                    o = [];
                    for (var u = 0, a = t.length; u < a; u++) {
                        if (!t[u].length && (!o.length || !o[o.length - 1].length)) continue;
                        o.length && !o[o.length - 1].length && o.pop(), o.push(t[u])
                    }
                } else if (t || typeof t == "string") o[o.length - 1] === "" ? o[o.length - 1] = t : o.push(t)
            } else t || typeof t == "string" && t.length ? o[e] = t : o.splice(e, 1);
            return s && o.unshift(""), this.path(o.join(r), n)
        }, o.segmentCoded = function(e, t, n) {
            var r, i, o;
            typeof e != "number" && (n = t, t = e, e = undefined);
            if (t === undefined) {
                r = this.segment(e, t, n);
                if (!l(r)) r = r !== undefined ? s.decode(r) : undefined;
                else
                    for (i = 0, o = r.length; i < o; i++) r[i] = s.decode(r[i]);
                return r
            }
            if (!l(t)) t = typeof t == "string" ? s.encode(t) : t;
            else
                for (i = 0, o = t.length; i < o; i++) t[i] = s.decode(t[i]);
            return this.segment(e, t, n)
        };
        var S = o.query;
        return o.query = function(e, t) {
            if (e === !0) return s.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
            if (typeof e == "function") {
                var n = s.parseQuery(this._parts.query, this._parts.escapeQuerySpace),
                    r = e.call(this, n);
                return this._parts.query = s.buildQuery(r || n, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace), this.build(!t), this
            }
            return e !== undefined && typeof e != "string" ? (this._parts.query = s.buildQuery(e, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace), this.build(!t), this) : S.call(this, e, t)
        }, o.setQuery = function(e, t, n) {
            var r = s.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
            if (typeof e == "object")
                for (var i in e) u.call(e, i) && (r[i] = e[i]);
            else {
                if (typeof e != "string") throw new TypeError("URI.addQuery() accepts an object, string as the name parameter");
                r[e] = t !== undefined ? t : null
            }
            return this._parts.query = s.buildQuery(r, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace), typeof e != "string" && (n = t), this.build(!n), this
        }, o.addQuery = function(e, t, n) {
            var r = s.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
            return s.addQuery(r, e, t === undefined ? null : t), this._parts.query = s.buildQuery(r, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace), typeof e != "string" && (n = t), this.build(!n), this
        }, o.removeQuery = function(e, t, n) {
            var r = s.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
            return s.removeQuery(r, e, t), this._parts.query = s.buildQuery(r, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace), typeof e != "string" && (n = t), this.build(!n), this
        }, o.hasQuery = function(e, t, n) {
            var r = s.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
            return s.hasQuery(r, e, t, n)
        }, o.setSearch = o.setQuery, o.addSearch = o.addQuery, o.removeSearch = o.removeQuery, o.hasSearch = o.hasQuery, o.normalize = function() {
            return this._parts.urn ? this.normalizeProtocol(!1).normalizeQuery(!1).normalizeFragment(!1).build() : this.normalizeProtocol(!1).normalizeHostname(!1).normalizePort(!1).normalizePath(!1).normalizeQuery(!1).normalizeFragment(!1).build()
        }, o.normalizeProtocol = function(e) {
            return typeof this._parts.protocol == "string" && (this._parts.protocol = this._parts.protocol.toLowerCase(), this.build(!e)), this
        }, o.normalizeHostname = function(n) {
            return this._parts.hostname && (this.is("IDN") && e ? this._parts.hostname = e.toASCII(this._parts.hostname) : this.is("IPv6") && t && (this._parts.hostname = t.best(this._parts.hostname)), this._parts.hostname = this._parts.hostname.toLowerCase(), this.build(!n)), this
        }, o.normalizePort = function(e) {
            return typeof this._parts.protocol == "string" && this._parts.port === s.defaultPorts[this._parts.protocol] && (this._parts.port = null, this.build(!e)), this
        }, o.normalizePath = function(e) {
            if (this._parts.urn) return this;
            if (!this._parts.path || this._parts.path === "/") return this;
            var t, n = this._parts.path,
                r = "",
                i, o;
            n.charAt(0) !== "/" && (t = !0, n = "/" + n), n = n.replace(/(\/(\.\/)+)|(\/\.$)/g, "/").replace(/\/{2,}/g, "/"), t && (r = n.substring(1).match(/^(\.\.\/)+/) || "", r && (r = r[0]));
            for (;;) {
                i = n.indexOf("/..");
                if (i === -1) break;
                if (i === 0) {
                    n = n.substring(3);
                    continue
                }
                o = n.substring(0, i).lastIndexOf("/"), o === -1 && (o = i), n = n.substring(0, o) + n.substring(i + 3)
            }
            return t && this.is("relative") && (n = r + n.substring(1)), n = s.recodePath(n), this._parts.path = n, this.build(!e), this
        }, o.normalizePathname = o.normalizePath, o.normalizeQuery = function(e) {
            return typeof this._parts.query == "string" && (this._parts.query.length ? this.query(s.parseQuery(this._parts.query, this._parts.escapeQuerySpace)) : this._parts.query = null, this.build(!e)), this
        }, o.normalizeFragment = function(e) {
            return this._parts.fragment || (this._parts.fragment = null, this.build(!e)), this
        }, o.normalizeSearch = o.normalizeQuery, o.normalizeHash = o.normalizeFragment, o.iso8859 = function() {
            var e = s.encode,
                t = s.decode;
            return s.encode = escape, s.decode = decodeURIComponent, this.normalize(), s.encode = e, s.decode = t, this
        }, o.unicode = function() {
            var e = s.encode,
                t = s.decode;
            return s.encode = v, s.decode = unescape, this.normalize(), s.encode = e, s.decode = t, this
        }, o.readable = function() {
            var t = this.clone();
            t.username("").password("").normalize();
            var n = "";
            t._parts.protocol && (n += t._parts.protocol + "://"), t._parts.hostname && (t.is("punycode") && e ? (n += e.toUnicode(t._parts.hostname), t._parts.port && (n += ":" + t._parts.port)) : n += t.host()), t._parts.hostname && t._parts.path && t._parts.path.charAt(0) !== "/" && (n += "/"), n += t.path(!0);
            if (t._parts.query) {
                var r = "";
                for (var i = 0, o = t._parts.query.split("&"), u = o.length; i < u; i++) {
                    var a = (o[i] || "").split("=");
                    r += "&" + s.decodeQuery(a[0], this._parts.escapeQuerySpace).replace(/&/g, "%26"), a[1] !== undefined && (r += "=" + s.decodeQuery(a[1], this._parts.escapeQuerySpace).replace(/&/g, "%26"))
                }
                n += "?" + r.substring(1)
            }
            return n += s.decodeQuery(t.hash(), !0), n
        }, o.absoluteTo = function(e) {
            var t = this.clone(),
                n = ["protocol", "username", "password", "hostname", "port"],
                r, i, o;
            if (this._parts.urn) throw new Error("URNs do not have any generally defined hierarchical components");
            e instanceof s || (e = new s(e)), t._parts.protocol || (t._parts.protocol = e._parts.protocol);
            if (this._parts.hostname) return t;
            for (i = 0; o = n[i]; i++) t._parts[o] = e._parts[o];
            return t._parts.path ? t._parts.path.substring(-2) === ".." && (t._parts.path += "/") : (t._parts.path = e._parts.path, t._parts.query || (t._parts.query = e._parts.query)), t.path().charAt(0) !== "/" && (r = e.directory(), t._parts.path = (r ? r + "/" : "") + t._parts.path, t.normalizePath()), t.build(), t
        }, o.relativeTo = function(e) {
            var t = this.clone().normalize(),
                n, r, i, o, u;
            if (t._parts.urn) throw new Error("URNs do not have any generally defined hierarchical components");
            e = (new s(e)).normalize(), n = t._parts, r = e._parts, o = t.path(), u = e.path();
            if (o.charAt(0) !== "/") throw new Error("URI is already relative");
            if (u.charAt(0) !== "/") throw new Error("Cannot calculate a URI relative to another relative URI");
            n.protocol === r.protocol && (n.protocol = null);
            if (n.username !== r.username || n.password !== r.password) return t.build();
            if (n.protocol !== null || n.username !== null || n.password !== null) return t.build();
            if (n.hostname !== r.hostname || n.port !== r.port) return t.build();
            n.hostname = null, n.port = null;
            if (o === u) return n.path = "", t.build();
            i = s.commonPath(t.path(), e.path());
            if (!i) return t.build();
            var a = r.path.substring(i.length).replace(/[^\/]*$/, "").replace(/.*?\//g, "../");
            return n.path = a + n.path.substring(i.length), t.build()
        }, o.equals = function(e) {
            var t = this.clone(),
                n = new s(e),
                r = {},
                i = {},
                o = {},
                a, f, c;
            t.normalize(), n.normalize();
            if (t.toString() === n.toString()) return !0;
            a = t.query(), f = n.query(), t.query(""), n.query("");
            if (t.toString() !== n.toString()) return !1;
            if (a.length !== f.length) return !1;
            r = s.parseQuery(a, this._parts.escapeQuerySpace), i = s.parseQuery(f, this._parts.escapeQuerySpace);
            for (c in r)
                if (u.call(r, c)) {
                    if (!l(r[c])) {
                        if (r[c] !== i[c]) return !1
                    } else if (!p(r[c], i[c])) return !1;
                    o[c] = !0
                }
            for (c in i)
                if (u.call(i, c) && !o[c]) return !1;
            return !0
        }, o.duplicateQueryParameters = function(e) {
            return this._parts.duplicateQueryParameters = !!e, this
        }, o.escapeQuerySpace = function(e) {
            return this._parts.escapeQuerySpace = !!e, this
        }, s
    }), define("utils/url", ["URIjs/URI"], function(e) {
        function t(t, n) {
            var r = new e(n);
            return r.is("relative") && (r = r.absoluteTo(t)), r.toString()
        }

        function n(e) {
            return t(e, "..")
        }

        function r(e) {
            return e ? e[0] == "/" || e.indexOf("http://") == 0 || e.indexOf("https://") == 0 : !1
        }
        return {
            dirname: n,
            join: t,
            isAbsolute: r
        }
    }),
    function() {
        function q(e, t, n) {
            var r = (n || 0) - 1,
                i = e ? e.length : 0;
            while (++r < i)
                if (e[r] === t) return r;
            return -1
        }

        function R(e, t) {
            var n = typeof t;
            e = e.cache;
            if (n == "boolean" || t == null) return e[t] ? 0 : -1;
            n != "number" && n != "string" && (n = "object");
            var r = n == "number" ? t : i + t;
            return e = (e = e[n]) && e[r], n == "object" ? e && q(e, t) > -1 ? 0 : -1 : e ? 0 : -1
        }

        function U(e) {
            var t = this.cache,
                n = typeof e;
            if (n == "boolean" || e == null) t[e] = !0;
            else {
                n != "number" && n != "string" && (n = "object");
                var r = n == "number" ? e : i + e,
                    s = t[n] || (t[n] = {});
                n == "object" ? (s[r] || (s[r] = [])).push(e) : s[r] = !0
            }
        }

        function z(e) {
            return e.charCodeAt(0)
        }

        function W(e, t) {
            var n = e.criteria,
                r = t.criteria,
                i = -1,
                s = n.length;
            while (++i < s) {
                var o = n[i],
                    u = r[i];
                if (o !== u) {
                    if (o > u || typeof o == "undefined") return 1;
                    if (o < u || typeof u == "undefined") return -1
                }
            }
            return e.index - t.index
        }

        function X(e) {
            var t = -1,
                n = e.length,
                r = e[0],
                i = e[n / 2 | 0],
                s = e[n - 1];
            if (r && typeof r == "object" && i && typeof i == "object" && s && typeof s == "object") return !1;
            var o = J();
            o["false"] = o["null"] = o["true"] = o["undefined"] = !1;
            var u = J();
            u.array = e, u.cache = o, u.push = U;
            while (++t < n) u.push(e[t]);
            return u
        }

        function V(e) {
            return "\\" + P[e]
        }

        function $() {
            return t.pop() || []
        }

        function J() {
            return n.pop() || {
                array: null,
                cache: null,
                criteria: null,
                "false": !1,
                index: 0,
                "null": !1,
                number: null,
                object: null,
                push: null,
                string: null,
                "true": !1,
                "undefined": !1,
                value: null
            }
        }

        function K(e) {
            e.length = 0, t.length < o && t.push(e)
        }

        function Q(e) {
            var t = e.cache;
            t && Q(t), e.array = e.cache = e.criteria = e.object = e.number = e.string = e.value = null, n.length < o && n.push(e)
        }

        function G(e, t, n) {
            t || (t = 0), typeof n == "undefined" && (n = e ? e.length : 0);
            var r = -1,
                i = n - t || 0,
                s = Array(i < 0 ? 0 : i);
            while (++r < i) s[r] = e[t + r];
            return s
        }

        function Y(t) {
            function Lt(e) {
                return e && typeof e == "object" && !Gt(e) && ht.call(e, "__wrapped__") ? e : new At(e)
            }

            function At(e, t) {
                this.__chain__ = !!t, this.__wrapped__ = e
            }

            function Mt(e) {
                function i() {
                    if (n) {
                        var e = G(n);
                        pt.apply(e, arguments)
                    }
                    if (this instanceof i) {
                        var s = Dt(t.prototype),
                            o = t.apply(s, e || arguments);
                        return Cn(o) ? o : s
                    }
                    return t.apply(r, e || arguments)
                }
                var t = e[0],
                    n = e[2],
                    r = e[4];
                return $t(i, e), i
            }

            function _t(e, t, n, r, i) {
                if (n) {
                    var s = n(e);
                    if (typeof s != "undefined") return s
                }
                var o = Cn(e);
                if (!o) return e;
                var u = st.call(e);
                if (!O[u]) return e;
                var a = kt[u];
                switch (u) {
                    case x:
                    case T:
                        return new a(+e);
                    case C:
                    case A:
                        return new a(e);
                    case L:
                        return s = a(e.source, h.exec(e)), s.lastIndex = e.lastIndex, s
                }
                var f = Gt(e);
                if (t) {
                    var l = !r;
                    r || (r = $()), i || (i = $());
                    var c = r.length;
                    while (c--)
                        if (r[c] == e) return i[c];
                    s = f ? a(e.length) : {}
                } else s = f ? G(e) : sn({}, e);
                return f && (ht.call(e, "index") && (s.index = e.index), ht.call(e, "input") && (s.input = e.input)), t ? (r.push(e), i.push(s), (f ? Jn : dn)(e, function(e, o) {
                    s[o] = _t(e, t, n, r, i)
                }), l && (K(r), K(i)), s) : s
            }

            function Dt(e, t) {
                return Cn(e) ? yt(e) : {}
            }

            function Pt(e, t, n) {
                if (typeof e != "function") return Zr;
                if (typeof t != "undefined" && "prototype" in e) {
                    var r = e.__bindData__;
                    if (typeof r == "undefined") {
                        Ot.funcNames && (r = !e.name), r = r || !Ot.funcDecomp;
                        if (!r) {
                            var i = lt.call(e);
                            Ot.funcNames || (r = !p.test(i)), r || (r = g.test(i), $t(e, r))
                        }
                    }
                    if (r === !1 || r !== !0 && r[1] & 1) return e;
                    switch (n) {
                        case 1:
                            return function(n) {
                                return e.call(t, n)
                            };
                        case 2:
                            return function(n, r) {
                                return e.call(t, n, r)
                            };
                        case 3:
                            return function(n, r, i) {
                                return e.call(t, n, r, i)
                            };
                        case 4:
                            return function(n, r, i, s) {
                                return e.call(t, n, r, i, s)
                            }
                    }
                    return Br(e, t)
                }
                return e
            }

            function Ht(e) {
                function h() {
                    var e = u ? s : this;
                    if (r) {
                        var p = G(r);
                        pt.apply(p, arguments)
                    }
                    if (i || f) {
                        p || (p = G(arguments)), i && pt.apply(p, i);
                        if (f && p.length < o) return n |= 16, Ht([t, l ? n : n & -4, p, null, s, o])
                    }
                    p || (p = arguments), a && (t = e[c]);
                    if (this instanceof h) {
                        e = Dt(t.prototype);
                        var d = t.apply(e, p);
                        return Cn(d) ? d : e
                    }
                    return t.apply(e, p)
                }
                var t = e[0],
                    n = e[1],
                    r = e[2],
                    i = e[3],
                    s = e[4],
                    o = e[5],
                    u = n & 1,
                    a = n & 2,
                    f = n & 4,
                    l = n & 8,
                    c = t;
                return $t(h, e), h
            }

            function Bt(e, t) {
                var n = -1,
                    r = Xt(),
                    i = e ? e.length : 0,
                    o = i >= s && r === q,
                    u = [];
                if (o) {
                    var a = X(t);
                    a ? (r = R, t = a) : o = !1
                }
                while (++n < i) {
                    var f = e[n];
                    r(t, f) < 0 && u.push(f)
                }
                return o && Q(t), u
            }

            function jt(e, t, n, r) {
                var i = (r || 0) - 1,
                    s = e ? e.length : 0,
                    o = [];
                while (++i < s) {
                    var u = e[i];
                    if (u && typeof u == "object" && typeof u.length == "number" && (Gt(u) || Qt(u))) {
                        t || (u = jt(u, t, n));
                        var a = -1,
                            f = u.length,
                            l = o.length;
                        o.length += f;
                        while (++a < f) o[l++] = u[a]
                    } else n || o.push(u)
                }
                return o
            }

            function Ft(e, t, n, r, i, s) {
                if (n) {
                    var o = n(e, t);
                    if (typeof o != "undefined") return !!o
                }
                if (e === t) return e !== 0 || 1 / e == 1 / t;
                var u = typeof e,
                    a = typeof t;
                if (e === e && (!e || !D[u]) && (!t || !D[a])) return !1;
                if (e == null || t == null) return e === t;
                var f = st.call(e),
                    l = st.call(t);
                f == E && (f = k), l == E && (l = k);
                if (f != l) return !1;
                switch (f) {
                    case x:
                    case T:
                        return +e == +t;
                    case C:
                        return e != +e ? t != +t : e == 0 ? 1 / e == 1 / t : e == +t;
                    case L:
                    case A:
                        return e == et(t)
                }
                var c = f == S;
                if (!c) {
                    var h = ht.call(e, "__wrapped__"),
                        p = ht.call(t, "__wrapped__");
                    if (h || p) return Ft(h ? e.__wrapped__ : e, p ? t.__wrapped__ : t, n, r, i, s);
                    if (f != k) return !1;
                    var d = e.constructor,
                        v = t.constructor;
                    if (d != v && !(Nn(d) && d instanceof d && Nn(v) && v instanceof v) && "constructor" in e && "constructor" in t) return !1
                }
                var m = !i;
                i || (i = $()), s || (s = $());
                var g = i.length;
                while (g--)
                    if (i[g] == e) return s[g] == t;
                var y = 0;
                o = !0, i.push(e), s.push(t);
                if (c) {
                    g = e.length, y = t.length, o = y == g;
                    if (o || r)
                        while (y--) {
                            var b = g,
                                w = t[y];
                            if (r) {
                                while (b--)
                                    if (o = Ft(e[b], w, n, r, i, s)) break
                            } else if (!(o = Ft(e[y], w, n, r, i, s))) break
                        }
                } else hn(t, function(t, u, a) {
                    if (ht.call(a, u)) return y++, o = ht.call(e, u) && Ft(e[u], t, n, r, i, s)
                }), o && !r && hn(e, function(e, t, n) {
                    if (ht.call(n, t)) return o = --y > -1
                });
                return i.pop(), s.pop(), m && (K(i), K(s)), o
            }

            function It(e, t, n, r, i) {
                (Gt(t) ? Jn : dn)(t, function(t, s) {
                    var o, u, a = t,
                        f = e[s];
                    if (t && ((u = Gt(t)) || On(t))) {
                        var l = r.length;
                        while (l--)
                            if (o = r[l] == t) {
                                f = i[l];
                                break
                            }
                        if (!o) {
                            var c;
                            if (n) {
                                a = n(f, t);
                                if (c = typeof a != "undefined") f = a
                            }
                            c || (f = u ? Gt(f) ? f : [] : On(f) ? f : {}), r.push(t), i.push(f), c || It(f, t, n, r, i)
                        }
                    } else n && (a = n(f, t), typeof a == "undefined" && (a = t)), typeof a != "undefined" && (f = a);
                    e[s] = f
                })
            }

            function qt(e, t) {
                return e + ft(Ct() * (t - e + 1))
            }

            function Rt(e, t, n) {
                var r = -1,
                    i = Xt(),
                    o = e ? e.length : 0,
                    u = [],
                    a = !t && o >= s && i === q,
                    f = n || a ? $() : u;
                if (a) {
                    var l = X(f);
                    i = R, f = l
                }
                while (++r < o) {
                    var c = e[r],
                        h = n ? n(c, r, e) : c;
                    if (t ? !r || f[f.length - 1] !== h : i(f, h) < 0)(n || a) && f.push(h), u.push(c)
                }
                return a ? (K(f.array), Q(f)) : n && K(f), u
            }

            function Ut(e) {
                return function(t, n, r) {
                    var i = {};
                    n = Lt.createCallback(n, r, 3);
                    var s = -1,
                        o = t ? t.length : 0;
                    if (typeof o == "number")
                        while (++s < o) {
                            var u = t[s];
                            e(i, u, n(u, s, t), t)
                        } else dn(t, function(t, r, s) {
                            e(i, t, n(t, r, s), s)
                        });
                    return i
                }
            }

            function zt(e, t, n, r, i, s) {
                var o = t & 1,
                    u = t & 2,
                    a = t & 4,
                    f = t & 8,
                    l = t & 16,
                    c = t & 32;
                if (!u && !Nn(e)) throw new tt;
                l && !n.length && (t &= -17, l = n = !1), c && !r.length && (t &= -33, c = r = !1);
                var h = e && e.__bindData__;
                if (h && h !== !0) return h = G(h), h[2] && (h[2] = G(h[2])), h[3] && (h[3] = G(h[3])), o && !(h[1] & 1) && (h[4] = i), !o && h[1] & 1 && (t |= 8), a && !(h[1] & 4) && (h[5] = s), l && pt.apply(h[2] || (h[2] = []), n), c && mt.apply(h[3] || (h[3] = []), r), h[1] |= t, zt.apply(null, h);
                var p = t == 1 || t === 17 ? Mt : Ht;
                return p([e, t, n, r, i, s])
            }

            function Wt(e) {
                return en[e]
            }

            function Xt() {
                var e = (e = Lt.indexOf) === br ? q : e;
                return e
            }

            function Vt(e) {
                return typeof e == "function" && ot.test(e)
            }

            function Jt(e) {
                var t, n;
                return !!e && st.call(e) == k && (t = e.constructor, !Nn(t) || t instanceof t) ? (hn(e, function(e, t) {
                    n = t
                }), typeof n == "undefined" || ht.call(e, n)) : !1
            }

            function Kt(e) {
                return tn[e]
            }

            function Qt(e) {
                return e && typeof e == "object" && typeof e.length == "number" && st.call(e) == E || !1
            }

            function on(e, t, n, r) {
                return typeof t != "boolean" && t != null && (r = n, n = t, t = !1), _t(e, t, typeof n == "function" && Pt(n, r, 1))
            }

            function un(e, t, n) {
                return _t(e, !0, typeof t == "function" && Pt(t, n, 1))
            }

            function an(e, t) {
                var n = Dt(e);
                return t ? sn(n, t) : n
            }

            function ln(e, t, n) {
                var r;
                return t = Lt.createCallback(t, n, 3), dn(e, function(e, n, i) {
                    if (t(e, n, i)) return r = n, !1
                }), r
            }

            function cn(e, t, n) {
                var r;
                return t = Lt.createCallback(t, n, 3), vn(e, function(e, n, i) {
                    if (t(e, n, i)) return r = n, !1
                }), r
            }

            function pn(e, t, n) {
                var r = [];
                hn(e, function(e, t) {
                    r.push(t, e)
                });
                var i = r.length;
                t = Pt(t, n, 3);
                while (i--)
                    if (t(r[i--], r[i], e) === !1) break;
                return e
            }

            function vn(e, t, n) {
                var r = Zt(e),
                    i = r.length;
                t = Pt(t, n, 3);
                while (i--) {
                    var s = r[i];
                    if (t(e[s], s, e) === !1) break
                }
                return e
            }

            function mn(e) {
                var t = [];
                return hn(e, function(e, n) {
                    Nn(e) && t.push(n)
                }), t.sort()
            }

            function gn(e, t) {
                return e ? ht.call(e, t) : !1
            }

            function yn(e) {
                var t = -1,
                    n = Zt(e),
                    r = n.length,
                    i = {};
                while (++t < r) {
                    var s = n[t];
                    i[e[s]] = s
                }
                return i
            }

            function bn(e) {
                return e === !0 || e === !1 || e && typeof e == "object" && st.call(e) == x || !1
            }

            function wn(e) {
                return e && typeof e == "object" && st.call(e) == T || !1
            }

            function En(e) {
                return e && e.nodeType === 1 || !1
            }

            function Sn(e) {
                var t = !0;
                if (!e) return t;
                var n = st.call(e),
                    r = e.length;
                return n == S || n == A || n == E || n == k && typeof r == "number" && Nn(e.splice) ? !r : (dn(e, function() {
                    return t = !1
                }), t)
            }

            function xn(e, t, n, r) {
                return Ft(e, t, typeof n == "function" && Pt(n, r, 2))
            }

            function Tn(e) {
                return wt(e) && !Et(parseFloat(e))
            }

            function Nn(e) {
                return typeof e == "function"
            }

            function Cn(e) {
                return !!e && !!D[typeof e]
            }

            function kn(e) {
                return An(e) && e != +e
            }

            function Ln(e) {
                return e === null
            }

            function An(e) {
                return typeof e == "number" || e && typeof e == "object" && st.call(e) == C || !1
            }

            function Mn(e) {
                return e && typeof e == "object" && st.call(e) == L || !1
            }

            function _n(e) {
                return typeof e == "string" || e && typeof e == "object" && st.call(e) == A || !1
            }

            function Dn(e) {
                return typeof e == "undefined"
            }

            function Pn(e, t, n) {
                var r = {};
                return t = Lt.createCallback(t, n, 3), dn(e, function(e, n, i) {
                    r[n] = t(e, n, i)
                }), r
            }

            function Hn(e) {
                var t = arguments,
                    n = 2;
                if (!Cn(e)) return e;
                typeof t[2] != "number" && (n = t.length);
                if (n > 3 && typeof t[n - 2] == "function") var r = Pt(t[--n - 1], t[n--], 2);
                else n > 2 && typeof t[n - 1] == "function" && (r = t[--n]);
                var i = G(arguments, 1, n),
                    s = -1,
                    o = $(),
                    u = $();
                while (++s < n) It(e, i[s], r, o, u);
                return K(o), K(u), e
            }

            function Bn(e, t, n) {
                var r = {};
                if (typeof t != "function") {
                    var i = [];
                    hn(e, function(e, t) {
                        i.push(t)
                    }), i = Bt(i, jt(arguments, !0, !1, 1));
                    var s = -1,
                        o = i.length;
                    while (++s < o) {
                        var u = i[s];
                        r[u] = e[u]
                    }
                } else t = Lt.createCallback(t, n, 3), hn(e, function(e, n, i) {
                    t(e, n, i) || (r[n] = e)
                });
                return r
            }

            function jn(e) {
                var t = -1,
                    r = Zt(e),
                    i = r.length,
                    s = n(i);
                while (++t < i) {
                    var o = r[t];
                    s[t] = [o, e[o]]
                }
                return s
            }

            function Fn(e, t, n) {
                var r = {};
                if (typeof t != "function") {
                    var i = -1,
                        s = jt(arguments, !0, !1, 1),
                        o = Cn(e) ? s.length : 0;
                    while (++i < o) {
                        var u = s[i];
                        u in e && (r[u] = e[u])
                    }
                } else t = Lt.createCallback(t, n, 3), hn(e, function(e, n, i) {
                    t(e, n, i) && (r[n] = e)
                });
                return r
            }

            function In(e, t, n, r) {
                var i = Gt(e);
                if (n == null)
                    if (i) n = [];
                    else {
                        var s = e && e.constructor,
                            o = s && s.prototype;
                        n = Dt(o)
                    }
                return t && (t = Lt.createCallback(t, r, 4), (i ? Jn : dn)(e, function(e, r, i) {
                    return t(n, e, r, i)
                })), n
            }

            function qn(e) {
                var t = -1,
                    r = Zt(e),
                    i = r.length,
                    s = n(i);
                while (++t < i) s[t] = e[r[t]];
                return s
            }

            function Rn(e) {
                var t = arguments,
                    r = -1,
                    i = jt(t, !0, !1, 1),
                    s = t[2] && t[2][t[1]] === e ? 1 : i.length,
                    o = n(s);
                while (++r < s) o[r] = e[i[r]];
                return o
            }

            function Un(e, t, n) {
                var r = -1,
                    i = Xt(),
                    s = e ? e.length : 0,
                    o = !1;
                return n = (n < 0 ? xt(0, s + n) : n) || 0, Gt(e) ? o = i(e, t, n) > -1 : typeof s == "number" ? o = (_n(e) ? e.indexOf(t, n) : i(e, t, n)) > -1 : dn(e, function(e) {
                    if (++r >= n) return !(o = e === t)
                }), o
            }

            function Wn(e, t, n) {
                var r = !0;
                t = Lt.createCallback(t, n, 3);
                var i = -1,
                    s = e ? e.length : 0;
                if (typeof s == "number") {
                    while (++i < s)
                        if (!(r = !!t(e[i], i, e))) break
                } else dn(e, function(e, n, i) {
                    return r = !!t(e, n, i)
                });
                return r
            }

            function Xn(e, t, n) {
                var r = [];
                t = Lt.createCallback(t, n, 3);
                var i = -1,
                    s = e ? e.length : 0;
                if (typeof s == "number")
                    while (++i < s) {
                        var o = e[i];
                        t(o, i, e) && r.push(o)
                    } else dn(e, function(e, n, i) {
                        t(e, n, i) && r.push(e)
                    });
                return r
            }

            function Vn(e, t, n) {
                t = Lt.createCallback(t, n, 3);
                var r = -1,
                    i = e ? e.length : 0;
                if (typeof i != "number") {
                    var o;
                    return dn(e, function(e, n, r) {
                        if (t(e, n, r)) return o = e, !1
                    }), o
                }
                while (++r < i) {
                    var s = e[r];
                    if (t(s, r, e)) return s
                }
            }

            function $n(e, t, n) {
                var r;
                return t = Lt.createCallback(t, n, 3), Kn(e, function(e, n, i) {
                    if (t(e, n, i)) return r = e, !1
                }), r
            }

            function Jn(e, t, n) {
                var r = -1,
                    i = e ? e.length : 0;
                t = t && typeof n == "undefined" ? t : Pt(t, n, 3);
                if (typeof i == "number") {
                    while (++r < i)
                        if (t(e[r], r, e) === !1) break
                } else dn(e, t);
                return e
            }

            function Kn(e, t, n) {
                var r = e ? e.length : 0;
                t = t && typeof n == "undefined" ? t : Pt(t, n, 3);
                if (typeof r == "number") {
                    while (r--)
                        if (t(e[r], r, e) === !1) break
                } else {
                    var i = Zt(e);
                    r = i.length, dn(e, function(e, n, s) {
                        return n = i ? i[--r] : --r, t(s[n], n, s)
                    })
                }
                return e
            }

            function Yn(e, t) {
                var r = G(arguments, 2),
                    i = -1,
                    s = typeof t == "function",
                    o = e ? e.length : 0,
                    u = n(typeof o == "number" ? o : 0);
                return Jn(e, function(e) {
                    u[++i] = (s ? t : e[t]).apply(e, r)
                }), u
            }

            function Zn(e, t, r) {
                var i = -1,
                    s = e ? e.length : 0;
                t = Lt.createCallback(t, r, 3);
                if (typeof s == "number") {
                    var o = n(s);
                    while (++i < s) o[i] = t(e[i], i, e)
                } else o = [], dn(e, function(e, n, r) {
                    o[++i] = t(e, n, r)
                });
                return o
            }

            function er(e, t, n) {
                var r = -Infinity,
                    i = r;
                typeof t != "function" && n && n[t] === e && (t = null);
                if (t == null && Gt(e)) {
                    var s = -1,
                        o = e.length;
                    while (++s < o) {
                        var u = e[s];
                        u > i && (i = u)
                    }
                } else t = t == null && _n(e) ? z : Lt.createCallback(t, n, 3), Jn(e, function(e, n, s) {
                    var o = t(e, n, s);
                    o > r && (r = o, i = e)
                });
                return i
            }

            function tr(e, t, n) {
                var r = Infinity,
                    i = r;
                typeof t != "function" && n && n[t] === e && (t = null);
                if (t == null && Gt(e)) {
                    var s = -1,
                        o = e.length;
                    while (++s < o) {
                        var u = e[s];
                        u < i && (i = u)
                    }
                } else t = t == null && _n(e) ? z : Lt.createCallback(t, n, 3), Jn(e, function(e, n, s) {
                    var o = t(e, n, s);
                    o < r && (r = o, i = e)
                });
                return i
            }

            function rr(e, t, n, r) {
                if (!e) return n;
                var i = arguments.length < 3;
                t = Lt.createCallback(t, r, 4);
                var s = -1,
                    o = e.length;
                if (typeof o == "number") {
                    i && (n = e[++s]);
                    while (++s < o) n = t(n, e[s], s, e)
                } else dn(e, function(e, r, s) {
                    n = i ? (i = !1, e) : t(n, e, r, s)
                });
                return n
            }

            function ir(e, t, n, r) {
                var i = arguments.length < 3;
                return t = Lt.createCallback(t, r, 4), Kn(e, function(e, r, s) {
                    n = i ? (i = !1, e) : t(n, e, r, s)
                }), n
            }

            function sr(e, t, n) {
                return t = Lt.createCallback(t, n, 3), Xn(e, function(e, n, r) {
                    return !t(e, n, r)
                })
            }

            function or(t, n, r) {
                t && typeof t.length != "number" && (t = qn(t));
                if (n == null || r) return t ? t[qt(0, t.length - 1)] : e;
                var i = ur(t);
                return i.length = Tt(xt(0, n), i.length), i
            }

            function ur(e) {
                var t = -1,
                    r = e ? e.length : 0,
                    i = n(typeof r == "number" ? r : 0);
                return Jn(e, function(e) {
                    var n = qt(0, ++t);
                    i[t] = i[n], i[n] = e
                }), i
            }

            function ar(e) {
                var t = e ? e.length : 0;
                return typeof t == "number" ? t : Zt(e).length
            }

            function fr(e, t, n) {
                var r;
                t = Lt.createCallback(t, n, 3);
                var i = -1,
                    s = e ? e.length : 0;
                if (typeof s == "number") {
                    while (++i < s)
                        if (r = t(e[i], i, e)) break
                } else dn(e, function(e, n, i) {
                    return !(r = t(e, n, i))
                });
                return !!r
            }

            function lr(e, t, r) {
                var i = -1,
                    s = Gt(t),
                    o = e ? e.length : 0,
                    u = n(typeof o == "number" ? o : 0);
                s || (t = Lt.createCallback(t, r, 3)), Jn(e, function(e, n, r) {
                    var o = u[++i] = J();
                    s ? o.criteria = Zn(t, function(t) {
                        return e[t]
                    }) : (o.criteria = $())[0] = t(e, n, r), o.index = i, o.value = e
                }), o = u.length, u.sort(W);
                while (o--) {
                    var a = u[o];
                    u[o] = a.value, s || K(a.criteria), Q(a)
                }
                return u
            }

            function cr(e) {
                return e && typeof e.length == "number" ? G(e) : qn(e)
            }

            function pr(e) {
                var t = -1,
                    n = e ? e.length : 0,
                    r = [];
                while (++t < n) {
                    var i = e[t];
                    i && r.push(i)
                }
                return r
            }

            function dr(e) {
                return Bt(e, jt(arguments, !0, !0, 1))
            }

            function vr(e, t, n) {
                var r = -1,
                    i = e ? e.length : 0;
                t = Lt.createCallback(t, n, 3);
                while (++r < i)
                    if (t(e[r], r, e)) return r;
                return -1
            }

            function mr(e, t, n) {
                var r = e ? e.length : 0;
                t = Lt.createCallback(t, n, 3);
                while (r--)
                    if (t(e[r], r, e)) return r;
                return -1
            }

            function gr(t, n, r) {
                var i = 0,
                    s = t ? t.length : 0;
                if (typeof n != "number" && n != null) {
                    var o = -1;
                    n = Lt.createCallback(n, r, 3);
                    while (++o < s && n(t[o], o, t)) i++
                } else {
                    i = n;
                    if (i == null || r) return t ? t[0] : e
                }
                return G(t, 0, Tt(xt(0, i), s))
            }

            function yr(e, t, n, r) {
                return typeof t != "boolean" && t != null && (r = n, n = typeof t != "function" && r && r[t] === e ? null : t, t = !1), n != null && (e = Zn(e, n, r)), jt(e, t)
            }

            function br(e, t, n) {
                if (typeof n == "number") {
                    var r = e ? e.length : 0;
                    n = n < 0 ? xt(0, r + n) : n || 0
                } else if (n) {
                    var i = Lr(e, t);
                    return e[i] === t ? i : -1
                }
                return q(e, t, n)
            }

            function wr(e, t, n) {
                var r = 0,
                    i = e ? e.length : 0;
                if (typeof t != "number" && t != null) {
                    var s = i;
                    t = Lt.createCallback(t, n, 3);
                    while (s-- && t(e[s], s, e)) r++
                } else r = t == null || n ? 1 : t || r;
                return G(e, 0, Tt(xt(0, i - r), i))
            }

            function Er() {
                var e = [],
                    t = -1,
                    n = arguments.length,
                    r = $(),
                    i = Xt(),
                    o = i === q,
                    u = $();
                while (++t < n) {
                    var a = arguments[t];
                    if (Gt(a) || Qt(a)) e.push(a), r.push(o && a.length >= s && X(t ? e[t] : u))
                }
                var f = e[0],
                    l = -1,
                    c = f ? f.length : 0,
                    h = [];
                e: while (++l < c) {
                    var p = r[0];
                    a = f[l];
                    if ((p ? R(p, a) : i(u, a)) < 0) {
                        t = n, (p || u).push(a);
                        while (--t) {
                            p = r[t];
                            if ((p ? R(p, a) : i(e[t], a)) < 0) continue e
                        }
                        h.push(a)
                    }
                }
                while (n--) p = r[n], p && Q(p);
                return K(r), K(u), h
            }

            function Sr(t, n, r) {
                var i = 0,
                    s = t ? t.length : 0;
                if (typeof n != "number" && n != null) {
                    var o = s;
                    n = Lt.createCallback(n, r, 3);
                    while (o-- && n(t[o], o, t)) i++
                } else {
                    i = n;
                    if (i == null || r) return t ? t[s - 1] : e
                }
                return G(t, xt(0, s - i))
            }

            function xr(e, t, n) {
                var r = e ? e.length : 0;
                typeof n == "number" && (r = (n < 0 ? xt(0, r + n) : Tt(n, r - 1)) + 1);
                while (r--)
                    if (e[r] === t) return r;
                return -1
            }

            function Tr(e) {
                var t = arguments,
                    n = 0,
                    r = t.length,
                    i = e ? e.length : 0;
                while (++n < r) {
                    var s = -1,
                        o = t[n];
                    while (++s < i) e[s] === o && (vt.call(e, s--, 1), i--)
                }
                return e
            }

            function Nr(e, t, r) {
                e = +e || 0, r = typeof r == "number" ? r : +r || 1, t == null && (t = e, e = 0);
                var i = -1,
                    s = xt(0, ut((t - e) / (r || 1))),
                    o = n(s);
                while (++i < s) o[i] = e, e += r;
                return o
            }

            function Cr(e, t, n) {
                var r = -1,
                    i = e ? e.length : 0,
                    s = [];
                t = Lt.createCallback(t, n, 3);
                while (++r < i) {
                    var o = e[r];
                    t(o, r, e) && (s.push(o), vt.call(e, r--, 1), i--)
                }
                return s
            }

            function kr(e, t, n) {
                if (typeof t != "number" && t != null) {
                    var r = 0,
                        i = -1,
                        s = e ? e.length : 0;
                    t = Lt.createCallback(t, n, 3);
                    while (++i < s && t(e[i], i, e)) r++
                } else r = t == null || n ? 1 : xt(0, t);
                return G(e, r)
            }

            function Lr(e, t, n, r) {
                var i = 0,
                    s = e ? e.length : i;
                n = n ? Lt.createCallback(n, r, 1) : Zr, t = n(t);
                while (i < s) {
                    var o = i + s >>> 1;
                    n(e[o]) < t ? i = o + 1 : s = o
                }
                return i
            }

            function Ar() {
                return Rt(jt(arguments, !0, !0))
            }

            function Or(e, t, n, r) {
                return typeof t != "boolean" && t != null && (r = n, n = typeof t != "function" && r && r[t] === e ? null : t, t = !1), n != null && (n = Lt.createCallback(n, r, 3)), Rt(e, t, n)
            }

            function Mr(e) {
                return Bt(e, G(arguments, 1))
            }

            function _r() {
                var e = -1,
                    t = arguments.length;
                while (++e < t) {
                    var n = arguments[e];
                    if (Gt(n) || Qt(n)) var r = r ? Rt(Bt(r, n).concat(Bt(n, r))) : n
                }
                return r || []
            }

            function Dr() {
                var e = arguments.length > 1 ? arguments : arguments[0],
                    t = -1,
                    r = e ? er(nr(e, "length")) : 0,
                    i = n(r < 0 ? 0 : r);
                while (++t < r) i[t] = nr(e, t);
                return i
            }

            function Pr(e, t) {
                var n = -1,
                    r = e ? e.length : 0,
                    i = {};
                !t && r && !Gt(e[0]) && (t = []);
                while (++n < r) {
                    var s = e[n];
                    t ? i[s] = t[n] : s && (i[s[0]] = s[1])
                }
                return i
            }

            function Hr(e, t) {
                if (!Nn(t)) throw new tt;
                return function() {
                    if (--e < 1) return t.apply(this, arguments)
                }
            }

            function Br(e, t) {
                return arguments.length > 2 ? zt(e, 17, G(arguments, 2), null, t) : zt(e, 1, null, null, t)
            }

            function jr(e) {
                var t = arguments.length > 1 ? jt(arguments, !0, !1, 1) : mn(e),
                    n = -1,
                    r = t.length;
                while (++n < r) {
                    var i = t[n];
                    e[i] = zt(e[i], 1, null, null, e)
                }
                return e
            }

            function Fr(e, t) {
                return arguments.length > 2 ? zt(t, 19, G(arguments, 2), null, e) : zt(t, 3, null, null, e)
            }

            function Ir() {
                var e = arguments,
                    t = e.length;
                while (t--)
                    if (!Nn(e[t])) throw new tt;
                return function() {
                    var t = arguments,
                        n = e.length;
                    while (n--) t = [e[n].apply(this, t)];
                    return t[0]
                }
            }

            function qr(e, t) {
                return t = typeof t == "number" ? t : +t || e.length, zt(e, 4, null, null, null, t)
            }

            function Rr(t, n, r) {
                var i, s, o, u, a, f, l, c = 0,
                    h = !1,
                    p = !0;
                if (!Nn(t)) throw new tt;
                n = xt(0, n) || 0;
                if (r === !0) {
                    var d = !0;
                    p = !1
                } else Cn(r) && (d = r.leading, h = "maxWait" in r && (xt(n, r.maxWait) || 0), p = "trailing" in r ? r.trailing : p);
                var v = function() {
                        var r = n - (ri() - u);
                        if (r <= 0) {
                            s && at(s);
                            var h = l;
                            s = f = l = e, h && (c = ri(), o = t.apply(a, i), !f && !s && (i = a = null))
                        } else f = dt(v, r)
                    },
                    m = function() {
                        f && at(f), s = f = l = e;
                        if (p || h !== n) c = ri(), o = t.apply(a, i), !f && !s && (i = a = null)
                    };
                return function() {
                    i = arguments, u = ri(), a = this, l = p && (f || !d);
                    if (h === !1) var e = d && !f;
                    else {
                        !s && !d && (c = u);
                        var r = h - (u - c),
                            g = r <= 0;
                        g ? (s && (s = at(s)), c = u, o = t.apply(a, i)) : s || (s = dt(m, r))
                    }
                    return g && f ? f = at(f) : !f && n !== h && (f = dt(v, n)), e && (g = !0, o = t.apply(a, i)), g && !f && !s && (i = a = null), o
                }
            }

            function Ur(t) {
                if (!Nn(t)) throw new tt;
                var n = G(arguments, 1);
                return dt(function() {
                    t.apply(e, n)
                }, 1)
            }

            function zr(t, n) {
                if (!Nn(t)) throw new tt;
                var r = G(arguments, 2);
                return dt(function() {
                    t.apply(e, r)
                }, n)
            }

            function Wr(e, t) {
                if (!Nn(e)) throw new tt;
                var n = function() {
                    var r = n.cache,
                        s = t ? t.apply(this, arguments) : i + arguments[0];
                    return ht.call(r, s) ? r[s] : r[s] = e.apply(this, arguments)
                };
                return n.cache = {}, n
            }

            function Xr(e) {
                var t, n;
                if (!Nn(e)) throw new tt;
                return function() {
                    return t ? n : (t = !0, n = e.apply(this, arguments), e = null, n)
                }
            }

            function Vr(e) {
                return zt(e, 16, G(arguments, 1))
            }

            function $r(e) {
                return zt(e, 32, null, G(arguments, 1))
            }

            function Jr(e, t, n) {
                var r = !0,
                    i = !0;
                if (!Nn(e)) throw new tt;
                return n === !1 ? r = !1 : Cn(n) && (r = "leading" in n ? n.leading : r, i = "trailing" in n ? n.trailing : i), M.leading = r, M.maxWait = t, M.trailing = i, Rr(e, t, M)
            }

            function Kr(e, t) {
                return zt(t, 16, [e])
            }

            function Qr(e) {
                return function() {
                    return e
                }
            }

            function Gr(e, t, n) {
                var r = typeof e;
                if (e == null || r == "function") return Pt(e, t, n);
                if (r != "object") return si(e);
                var i = Zt(e),
                    s = i[0],
                    o = e[s];
                return i.length == 1 && o === o && !Cn(o) ? function(e) {
                    var t = e[s];
                    return o === t && (o !== 0 || 1 / o == 1 / t)
                } : function(t) {
                    var n = i.length,
                        r = !1;
                    while (n--)
                        if (!(r = Ft(t[i[n]], e[i[n]], null, !0))) break;
                    return r
                }
            }

            function Yr(e) {
                return e == null ? "" : et(e).replace(rn, Wt)
            }

            function Zr(e) {
                return e
            }

            function ei(e, t, n) {
                var r = !0,
                    i = t && mn(t);
                if (!t || !n && !i.length) n == null && (n = t), s = At, t = e, e = Lt, i = mn(t);
                n === !1 ? r = !1 : Cn(n) && "chain" in n && (r = n.chain);
                var s = e,
                    o = Nn(s);
                Jn(i, function(n) {
                    var i = e[n] = t[n];
                    o && (s.prototype[n] = function() {
                        var t = this.__chain__,
                            n = this.__wrapped__,
                            o = [n];
                        pt.apply(o, arguments);
                        var u = i.apply(e, o);
                        if (r || t) {
                            if (n === u && Cn(u)) return this;
                            u = new s(u), u.__chain__ = t
                        }
                        return u
                    })
                })
            }

            function ti() {
                return t._ = it, this
            }

            function ni() {}

            function si(e) {
                return function(t) {
                    return t[e]
                }
            }

            function oi(e, t, n) {
                var r = e == null,
                    i = t == null;
                n == null && (typeof e == "boolean" && i ? (n = e, e = 1) : !i && typeof t == "boolean" && (n = t, i = !0)), r && i && (t = 1), e = +e || 0, i ? (t = e, e = 0) : t = +t || 0;
                if (n || e % 1 || t % 1) {
                    var s = Ct();
                    return Tt(e + s * (t - e + parseFloat("1e-" + ((s + "").length - 1))), t)
                }
                return qt(e, t)
            }

            function ui(e, t) {
                if (e) {
                    var n = e[t];
                    return Nn(n) ? e[t]() : n
                }
            }

            function ai(t, n, r) {
                var i = Lt.templateSettings;
                t = et(t || ""), r = fn({}, r, i);
                var s = fn({}, r.imports, i.imports),
                    o = Zt(s),
                    u = qn(s),
                    h, p = 0,
                    v = r.interpolate || m,
                    g = "__p += '",
                    b = U((r.escape || m).source + "|" + v.source + "|" + (v === d ? c : m).source + "|" + (r.evaluate || m).source + "|$", "g");
                t.replace(b, function(e, n, r, i, s, o) {
                    return r || (r = i), g += t.slice(p, o).replace(y, V), n && (g += "' +\n__e(" + n + ") +\n'"), s && (h = !0, g += "';\n" + s + ";\n__p += '"), r && (g += "' +\n((__t = (" + r + ")) == null ? '' : __t) +\n'"), p = o + e.length, e
                }), g += "';\n";
                var E = r.variable,
                    S = E;
                S || (E = "obj", g = "with (" + E + ") {\n" + g + "\n}\n"), g = (h ? g.replace(a, "") : g).replace(f, "$1").replace(l, "$1;"), g = "function(" + E + ") {\n" + (S ? "" : E + " || (" + E + " = {});\n") + "var __t, __p = '', __e = _.escape" + (h ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + g + "return __p\n}";
                var x = "\n/*\n//# sourceURL=" + (r.sourceURL || "/lodash/template/source[" + w++ +"]") + "\n*/";
                try {
                    var T = B(o, "return " + g + x).apply(e, u)
                } catch (N) {
                    throw N.source = g, N
                }
                return n ? T(n) : (T.source = g, T)
            }

            function fi(e, t, r) {
                e = (e = +e) > -1 ? e : 0;
                var i = -1,
                    s = n(e);
                t = Pt(t, r, 1);
                while (++i < e) s[i] = t(i);
                return s
            }

            function li(e) {
                return e == null ? "" : et(e).replace(nn, Kt)
            }

            function ci(e) {
                var t = ++r;
                return et(e == null ? "" : e) + t
            }

            function hi(e) {
                return e = new At(e), e.__chain__ = !0, e
            }

            function pi(e, t) {
                return t(e), e
            }

            function di() {
                return this.__chain__ = !0, this
            }

            function vi() {
                return et(this.__wrapped__)
            }

            function mi() {
                return this.__wrapped__
            }
            t = t ? Z.defaults(H.Object(), t, Z.pick(H, b)) : H;
            var n = t.Array,
                o = t.Boolean,
                P = t.Date,
                B = t.Function,
                j = t.Math,
                F = t.Number,
                I = t.Object,
                U = t.RegExp,
                et = t.String,
                tt = t.TypeError,
                nt = [],
                rt = I.prototype,
                it = t._,
                st = rt.toString,
                ot = U("^" + et(st).replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/toString| for [^\]]+/g, ".*?") + "$"),
                ut = j.ceil,
                at = t.clearTimeout,
                ft = j.floor,
                lt = B.prototype.toString,
                ct = Vt(ct = I.getPrototypeOf) && ct,
                ht = rt.hasOwnProperty,
                pt = nt.push,
                dt = t.setTimeout,
                vt = nt.splice,
                mt = nt.unshift,
                gt = function() {
                    try {
                        var e = {},
                            t = Vt(t = I.defineProperty) && t,
                            n = t(e, e, e) && t
                    } catch (r) {}
                    return n
                }(),
                yt = Vt(yt = I.create) && yt,
                bt = Vt(bt = n.isArray) && bt,
                wt = t.isFinite,
                Et = t.isNaN,
                St = Vt(St = I.keys) && St,
                xt = j.max,
                Tt = j.min,
                Nt = t.parseInt,
                Ct = j.random,
                kt = {};
            kt[S] = n, kt[x] = o, kt[T] = P, kt[N] = B, kt[k] = I, kt[C] = F, kt[L] = U, kt[A] = et, At.prototype = Lt.prototype;
            var Ot = Lt.support = {};
            Ot.funcDecomp = !Vt(t.WinRTError) && g.test(Y), Ot.funcNames = typeof B.name == "string", Lt.templateSettings = {
                escape: /<%-([\s\S]+?)%>/g,
                evaluate: /<%([\s\S]+?)%>/g,
                interpolate: d,
                variable: "",
                imports: {
                    _: Lt
                }
            }, yt || (Dt = function() {
                function e() {}
                return function(n) {
                    if (Cn(n)) {
                        e.prototype = n;
                        var r = new e;
                        e.prototype = null
                    }
                    return r || t.Object()
                }
            }());
            var $t = gt ? function(e, t) {
                    _.value = t, gt(e, "__bindData__", _)
                } : ni,
                Gt = bt || function(e) {
                    return e && typeof e == "object" && typeof e.length == "number" && st.call(e) == S || !1
                },
                Yt = function(e) {
                    var t, n = e,
                        r = [];
                    if (!n) return r;
                    if (!D[typeof e]) return r;
                    for (t in n) ht.call(n, t) && r.push(t);
                    return r
                },
                Zt = St ? function(e) {
                    return Cn(e) ? St(e) : []
                } : Yt,
                en = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;"
                },
                tn = yn(en),
                nn = U("(" + Zt(tn).join("|") + ")", "g"),
                rn = U("[" + Zt(en).join("") + "]", "g"),
                sn = function(e, t, n) {
                    var r, i = e,
                        s = i;
                    if (!i) return s;
                    var o = arguments,
                        u = 0,
                        a = typeof n == "number" ? 2 : o.length;
                    if (a > 3 && typeof o[a - 2] == "function") var f = Pt(o[--a - 1], o[a--], 2);
                    else a > 2 && typeof o[a - 1] == "function" && (f = o[--a]);
                    while (++u < a) {
                        i = o[u];
                        if (i && D[typeof i]) {
                            var l = -1,
                                c = D[typeof i] && Zt(i),
                                h = c ? c.length : 0;
                            while (++l < h) r = c[l], s[r] = f ? f(s[r], i[r]) : i[r]
                        }
                    }
                    return s
                },
                fn = function(e, t, n) {
                    var r, i = e,
                        s = i;
                    if (!i) return s;
                    var o = arguments,
                        u = 0,
                        a = typeof n == "number" ? 2 : o.length;
                    while (++u < a) {
                        i = o[u];
                        if (i && D[typeof i]) {
                            var f = -1,
                                l = D[typeof i] && Zt(i),
                                c = l ? l.length : 0;
                            while (++f < c) r = l[f], typeof s[r] == "undefined" && (s[r] = i[r])
                        }
                    }
                    return s
                },
                hn = function(e, t, n) {
                    var r, i = e,
                        s = i;
                    if (!i) return s;
                    if (!D[typeof i]) return s;
                    t = t && typeof n == "undefined" ? t : Pt(t, n, 3);
                    for (r in i)
                        if (t(i[r], r, e) === !1) return s;
                    return s
                },
                dn = function(e, t, n) {
                    var r, i = e,
                        s = i;
                    if (!i) return s;
                    if (!D[typeof i]) return s;
                    t = t && typeof n == "undefined" ? t : Pt(t, n, 3);
                    var o = -1,
                        u = D[typeof i] && Zt(i),
                        a = u ? u.length : 0;
                    while (++o < a) {
                        r = u[o];
                        if (t(i[r], r, e) === !1) return s
                    }
                    return s
                },
                On = ct ? function(e) {
                    if (!e || st.call(e) != k) return !1;
                    var t = e.valueOf,
                        n = Vt(t) && (n = ct(t)) && ct(n);
                    return n ? e == n || ct(e) == n : Jt(e)
                } : Jt,
                zn = Ut(function(e, t, n) {
                    ht.call(e, n) ? e[n] ++ : e[n] = 1
                }),
                Qn = Ut(function(e, t, n) {
                    (ht.call(e, n) ? e[n] : e[n] = []).push(t)
                }),
                Gn = Ut(function(e, t, n) {
                    e[n] = t
                }),
                nr = Zn,
                hr = Xn,
                ri = Vt(ri = P.now) && ri || function() {
                    return (new P).getTime()
                },
                ii = Nt(u + "08") == 8 ? Nt : function(e, t) {
                    return Nt(_n(e) ? e.replace(v, "") : e, t || 0)
                };
            return Lt.after = Hr, Lt.assign = sn, Lt.at = Rn, Lt.bind = Br, Lt.bindAll = jr, Lt.bindKey = Fr, Lt.chain = hi, Lt.compact = pr, Lt.compose = Ir, Lt.constant = Qr, Lt.countBy = zn, Lt.create = an, Lt.createCallback = Gr, Lt.curry = qr, Lt.debounce = Rr, Lt.defaults = fn, Lt.defer = Ur, Lt.delay = zr, Lt.difference = dr, Lt.filter = Xn, Lt.flatten = yr, Lt.forEach = Jn, Lt.forEachRight = Kn, Lt.forIn = hn, Lt.forInRight = pn, Lt.forOwn = dn, Lt.forOwnRight = vn, Lt.functions = mn, Lt.groupBy = Qn, Lt.indexBy = Gn, Lt.initial = wr, Lt.intersection = Er, Lt.invert = yn, Lt.invoke = Yn, Lt.keys = Zt, Lt.map = Zn, Lt.mapValues = Pn, Lt.max = er, Lt.memoize = Wr, Lt.merge = Hn, Lt.min = tr, Lt.omit = Bn, Lt.once = Xr, Lt.pairs = jn, Lt.partial = Vr, Lt.partialRight = $r, Lt.pick = Fn, Lt.pluck = nr, Lt.property = si, Lt.pull = Tr, Lt.range = Nr, Lt.reject = sr, Lt.remove = Cr, Lt.rest = kr, Lt.shuffle = ur, Lt.sortBy = lr, Lt.tap = pi, Lt.throttle = Jr, Lt.times = fi, Lt.toArray = cr, Lt.transform = In, Lt.union = Ar, Lt.uniq = Or, Lt.values = qn, Lt.where = hr, Lt.without = Mr, Lt.wrap = Kr, Lt.xor = _r, Lt.zip = Dr, Lt.zipObject = Pr, Lt.collect = Zn, Lt.drop = kr, Lt.each = Jn, Lt.eachRight = Kn, Lt.extend = sn, Lt.methods = mn, Lt.object = Pr, Lt.select = Xn, Lt.tail = kr, Lt.unique = Or, Lt.unzip = Dr, ei(Lt), Lt.clone = on, Lt.cloneDeep = un, Lt.contains = Un, Lt.escape = Yr, Lt.every = Wn, Lt.find = Vn, Lt.findIndex = vr, Lt.findKey = ln, Lt.findLast = $n, Lt.findLastIndex = mr, Lt.findLastKey = cn, Lt.has = gn, Lt.identity = Zr, Lt.indexOf = br, Lt.isArguments = Qt, Lt.isArray = Gt, Lt.isBoolean = bn, Lt.isDate = wn, Lt.isElement = En, Lt.isEmpty = Sn, Lt.isEqual = xn, Lt.isFinite = Tn, Lt.isFunction = Nn, Lt.isNaN = kn, Lt.isNull = Ln, Lt.isNumber = An, Lt.isObject = Cn, Lt.isPlainObject = On, Lt.isRegExp = Mn, Lt.isString = _n, Lt.isUndefined = Dn, Lt.lastIndexOf = xr, Lt.mixin = ei, Lt.noConflict = ti, Lt.noop = ni, Lt.now = ri, Lt.parseInt = ii, Lt.random = oi, Lt.reduce = rr, Lt.reduceRight = ir, Lt.result = ui, Lt.runInContext = Y, Lt.size = ar, Lt.some = fr, Lt.sortedIndex = Lr, Lt.template = ai, Lt.unescape = li, Lt.uniqueId = ci, Lt.all = Wn, Lt.any = fr, Lt.detect = Vn, Lt.findWhere = Vn, Lt.foldl = rr, Lt.foldr = ir, Lt.include = Un, Lt.inject = rr, ei(function() {
                var e = {};
                return dn(Lt, function(t, n) {
                    Lt.prototype[n] || (e[n] = t)
                }), e
            }(), !1), Lt.first = gr, Lt.last = Sr, Lt.sample = or, Lt.take = gr, Lt.head = gr, dn(Lt, function(e, t) {
                var n = t !== "sample";
                Lt.prototype[t] || (Lt.prototype[t] = function(t, r) {
                    var i = this.__chain__,
                        s = e(this.__wrapped__, t, r);
                    return !i && (t == null || r && (!n || typeof t != "function")) ? s : new At(s, i)
                })
            }), Lt.VERSION = "2.4.1", Lt.prototype.chain = di, Lt.prototype.toString = vi, Lt.prototype.value = mi, Lt.prototype.valueOf = mi, Jn(["join", "pop", "shift"], function(e) {
                var t = nt[e];
                Lt.prototype[e] = function() {
                    var e = this.__chain__,
                        n = t.apply(this.__wrapped__, arguments);
                    return e ? new At(n, e) : n
                }
            }), Jn(["push", "reverse", "sort", "unshift"], function(e) {
                var t = nt[e];
                Lt.prototype[e] = function() {
                    return t.apply(this.__wrapped__, arguments), this
                }
            }), Jn(["concat", "slice", "splice"], function(e) {
                var t = nt[e];
                Lt.prototype[e] = function() {
                    return new At(t.apply(this.__wrapped__, arguments), this.__chain__)
                }
            }), Lt
        }
        var e, t = [],
            n = [],
            r = 0,
            i = +(new Date) + "",
            s = 75,
            o = 40,
            u = "   \f ﻿\n\r\u2028\u2029 ᠎             　",
            a = /\b__p \+= '';/g,
            f = /\b(__p \+=) '' \+/g,
            l = /(__e\(.*?\)|\b__t\)) \+\n'';/g,
            c = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
            h = /\w*$/,
            p = /^\s*function[ \n\r\t]+\w/,
            d = /<%=([\s\S]+?)%>/g,
            v = RegExp("^[" + u + "]*0+(?=.$)"),
            m = /($^)/,
            g = /\bthis\b/,
            y = /['\n\r\t\u2028\u2029\\]/g,
            b = ["Array", "Boolean", "Date", "Function", "Math", "Number", "Object", "RegExp", "String", "_", "attachEvent", "clearTimeout", "isFinite", "isNaN", "parseInt", "setTimeout"],
            w = 0,
            E = "[object Arguments]",
            S = "[object Array]",
            x = "[object Boolean]",
            T = "[object Date]",
            N = "[object Function]",
            C = "[object Number]",
            k = "[object Object]",
            L = "[object RegExp]",
            A = "[object String]",
            O = {};
        O[N] = !1, O[E] = O[S] = O[x] = O[T] = O[C] = O[k] = O[L] = O[A] = !0;
        var M = {
                leading: !1,
                maxWait: 0,
                trailing: !1
            },
            _ = {
                configurable: !1,
                enumerable: !1,
                value: null,
                writable: !1
            },
            D = {
                "boolean": !1,
                "function": !0,
                object: !0,
                number: !1,
                string: !1,
                "undefined": !1
            },
            P = {
                "\\": "\\",
                "'": "'",
                "\n": "n",
                "\r": "r",
                " ": "t",
                "\u2028": "u2028",
                "\u2029": "u2029"
            },
            H = D[typeof window] && window || this,
            B = D[typeof exports] && exports && !exports.nodeType && exports,
            j = D[typeof module] && module && !module.nodeType && module,
            F = j && j.exports === B && B,
            I = D[typeof global] && global;
        I && (I.global === I || I.window === I) && (H = I);
        var Z = Y();
        typeof define == "function" && typeof define.amd == "object" && define.amd ? (H._ = Z, define("lodash", [], function() {
            return Z
        })) : B && j ? F ? (j.exports = Z)._ = Z : B._ = Z : H._ = Z
    }.call(this), define("core/progress", ["lodash", "jQuery", "utils/storage", "core/state"], function(e, t, n, r) {
        var i = function() {
                return r.level
            },
            s = function() {
                var n = t(".book-summary li[data-level]");
                return e.map(n, function(e) {
                    return t(e).data("level").toString()
                })
            },
            o = function() {
                var t = n.get("progress", {}),
                    r = s();
                return e.each(r, function(e) {
                    t[e] = t[e] || 0
                }), t
            },
            u = function(e, t) {
                var r = o();
                t == null && (t = !0), r[e] = t ? Date.now() : 0, n.set("progress", r)
            },
            a = function() {
                var n = o(),
                    r = t(".book-summary");
                e.each(n, function(e, t) {
                    r.find("li[data-level='" + t + "']").toggleClass("done", e > 0)
                }), n[i()] || u(i(), !0)
            };
        return {
            current: i,
            levels: s,
            get: o,
            mark: u,
            show: a
        }
    }), define("core/loading", ["jQuery"], function(e) {
        var t = function(t) {
            return e(".book").addClass("is-loading"), t.always(function() {
                e(".book").removeClass("is-loading")
            }), t
        };
        return {
            show: t
        }
    }),
    function() {
        var e = function(t) {
            var n = new e.Index;
            return n.pipeline.add(e.trimmer, e.stopWordFilter, e.stemmer), t && t.call(n, n), n
        };
        e.version = "0.5.2", e.utils = {}, e.utils.warn = function(e) {
                return function(t) {
                    e.console && console.warn && console.warn(t)
                }
            }(this), e.EventEmitter = function() {
                this.events = {}
            }, e.EventEmitter.prototype.addListener = function() {
                var e = Array.prototype.slice.call(arguments),
                    t = e.pop(),
                    n = e;
                if (typeof t != "function") throw new TypeError("last argument must be a function");
                n.forEach(function(e) {
                    this.hasHandler(e) || (this.events[e] = []), this.events[e].push(t)
                }, this)
            }, e.EventEmitter.prototype.removeListener = function(e, t) {
                if (!this.hasHandler(e)) return;
                var n = this.events[e].indexOf(t);
                this.events[e].splice(n, 1), this.events[e].length || delete this.events[e]
            }, e.EventEmitter.prototype.emit = function(e) {
                if (!this.hasHandler(e)) return;
                var t = Array.prototype.slice.call(arguments, 1);
                this.events[e].forEach(function(e) {
                    e.apply(undefined, t)
                })
            }, e.EventEmitter.prototype.hasHandler = function(e) {
                return e in this.events
            }, e.tokenizer = function(e) {
                if (!arguments.length || e == null || e == undefined) return [];
                if (Array.isArray(e)) return e.map(function(e) {
                    return e.toLowerCase()
                });
                var t = e.toString().replace(/^\s+/, "");
                for (var n = t.length - 1; n >= 0; n--)
                    if (/\S/.test(t.charAt(n))) {
                        t = t.substring(0, n + 1);
                        break
                    }
                return t.split(/\s+/).map(function(e) {
                    return e.toLowerCase()
                })
            }, e.Pipeline = function() {
                this._stack = []
            }, e.Pipeline.registeredFunctions = {}, e.Pipeline.registerFunction = function(t, n) {
                n in this.registeredFunctions && e.utils.warn("Overwriting existing registered function: " + n), t.label = n, e.Pipeline.registeredFunctions[t.label] = t
            }, e.Pipeline.warnIfFunctionNotRegistered = function(t) {
                var n = t.label && t.label in this.registeredFunctions;
                n || e.utils.warn("Function is not registered with pipeline. This may cause problems when serialising the index.\n", t)
            }, e.Pipeline.load = function(t) {
                var n = new e.Pipeline;
                return t.forEach(function(t) {
                    var r = e.Pipeline.registeredFunctions[t];
                    if (!r) throw new Error("Cannot load un-registered function: " + t);
                    n.add(r)
                }), n
            }, e.Pipeline.prototype.add = function() {
                var t = Array.prototype.slice.call(arguments);
                t.forEach(function(t) {
                    e.Pipeline.warnIfFunctionNotRegistered(t), this._stack.push(t)
                }, this)
            }, e.Pipeline.prototype.after = function(t, n) {
                e.Pipeline.warnIfFunctionNotRegistered(n);
                var r = this._stack.indexOf(t) + 1;
                this._stack.splice(r, 0, n)
            }, e.Pipeline.prototype.before = function(t, n) {
                e.Pipeline.warnIfFunctionNotRegistered(n);
                var r = this._stack.indexOf(t);
                this._stack.splice(r, 0, n)
            }, e.Pipeline.prototype.remove = function(e) {
                var t = this._stack.indexOf(e);
                this._stack.splice(t, 1)
            }, e.Pipeline.prototype.run = function(e) {
                var t = [],
                    n = e.length,
                    r = this._stack.length;
                for (var i = 0; i < n; i++) {
                    var s = e[i];
                    for (var o = 0; o < r; o++) {
                        s = this._stack[o](s, i, e);
                        if (s === void 0) break
                    }
                    s !== void 0 && t.push(s)
                }
                return t
            }, e.Pipeline.prototype.reset = function() {
                this._stack = []
            }, e.Pipeline.prototype.toJSON = function() {
                return this._stack.map(function(t) {
                    return e.Pipeline.warnIfFunctionNotRegistered(t), t.label
                })
            }, e.Vector = function() {
                this._magnitude = null, this.list = undefined, this.length = 0
            }, e.Vector.Node = function(e, t, n) {
                this.idx = e, this.val = t, this.next = n
            }, e.Vector.prototype.insert = function(t, n) {
                var r = this.list;
                if (!r) return this.list = new e.Vector.Node(t, n, r), this.length++;
                var i = r,
                    s = r.next;
                while (s != undefined) {
                    if (t < s.idx) return i.next = new e.Vector.Node(t, n, s), this.length++;
                    i = s, s = s.next
                }
                return i.next = new e.Vector.Node(t, n, s), this.length++
            }, e.Vector.prototype.magnitude = function() {
                if (this._magniture) return this._magnitude;
                var e = this.list,
                    t = 0,
                    n;
                while (e) n = e.val, t += n * n, e = e.next;
                return this._magnitude = Math.sqrt(t)
            }, e.Vector.prototype.dot = function(e) {
                var t = this.list,
                    n = e.list,
                    r = 0;
                while (t && n) t.idx < n.idx ? t = t.next : t.idx > n.idx ? n = n.next : (r += t.val * n.val, t = t.next, n = n.next);
                return r
            }, e.Vector.prototype.similarity = function(e) {
                return this.dot(e) / (this.magnitude() * e.magnitude())
            }, e.SortedSet = function() {
                this.length = 0, this.elements = []
            }, e.SortedSet.load = function(e) {
                var t = new this;
                return t.elements = e, t.length = e.length, t
            }, e.SortedSet.prototype.add = function() {
                Array.prototype.slice.call(arguments).forEach(function(e) {
                    if (~this.indexOf(e)) return;
                    this.elements.splice(this.locationFor(e), 0, e)
                }, this), this.length = this.elements.length
            }, e.SortedSet.prototype.toArray = function() {
                return this.elements.slice()
            }, e.SortedSet.prototype.map = function(e, t) {
                return this.elements.map(e, t)
            }, e.SortedSet.prototype.forEach = function(e, t) {
                return this.elements.forEach(e, t)
            }, e.SortedSet.prototype.indexOf = function(e, t, n) {
                var t = t || 0,
                    n = n || this.elements.length,
                    r = n - t,
                    i = t + Math.floor(r / 2),
                    s = this.elements[i];
                if (r <= 1) return s === e ? i : -1;
                if (s < e) return this.indexOf(e, i, n);
                if (s > e) return this.indexOf(e, t, i);
                if (s === e) return i
            }, e.SortedSet.prototype.locationFor = function(e, t, n) {
                var t = t || 0,
                    n = n || this.elements.length,
                    r = n - t,
                    i = t + Math.floor(r / 2),
                    s = this.elements[i];
                if (r <= 1) {
                    if (s > e) return i;
                    if (s < e) return i + 1
                }
                if (s < e) return this.locationFor(e, i, n);
                if (s > e) return this.locationFor(e, t, i)
            }, e.SortedSet.prototype.intersect = function(t) {
                var n = new e.SortedSet,
                    r = 0,
                    i = 0,
                    s = this.length,
                    o = t.length,
                    u = this.elements,
                    a = t.elements;
                for (;;) {
                    if (r > s - 1 || i > o - 1) break;
                    if (u[r] === a[i]) {
                        n.add(u[r]), r++, i++;
                        continue
                    }
                    if (u[r] < a[i]) {
                        r++;
                        continue
                    }
                    if (u[r] > a[i]) {
                        i++;
                        continue
                    }
                }
                return n
            }, e.SortedSet.prototype.clone = function() {
                var t = new e.SortedSet;
                return t.elements = this.toArray(), t.length = t.elements.length, t
            }, e.SortedSet.prototype.union = function(e) {
                var t, n, r;
                return this.length >= e.length ? (t = this, n = e) : (t = e, n = this), r = t.clone(), r.add.apply(r, n.toArray()), r
            }, e.SortedSet.prototype.toJSON = function() {
                return this.toArray()
            }, e.Index = function() {
                this._fields = [], this._ref = "id", this.pipeline = new e.Pipeline, this.documentStore = new e.Store, this.tokenStore = new e.TokenStore, this.corpusTokens = new e.SortedSet, this.eventEmitter = new e.EventEmitter, this._idfCache = {}, this.on("add", "remove", "update", function() {
                    this._idfCache = {}
                }.bind(this))
            }, e.Index.prototype.on = function() {
                var e = Array.prototype.slice.call(arguments);
                return this.eventEmitter.addListener.apply(this.eventEmitter, e)
            }, e.Index.prototype.off = function(e, t) {
                return this.eventEmitter.removeListener(e, t)
            }, e.Index.load = function(t) {
                t.version !== e.version && e.utils.warn("version mismatch: current " + e.version + " importing " + t.version);
                var n = new this;
                return n._fields = t.fields, n._ref = t.ref, n.documentStore = e.Store.load(t.documentStore), n.tokenStore = e.TokenStore.load(t.tokenStore), n.corpusTokens = e.SortedSet.load(t.corpusTokens), n.pipeline = e.Pipeline.load(t.pipeline), n
            }, e.Index.prototype.field = function(e, t) {
                var t = t || {},
                    n = {
                        name: e,
                        boost: t.boost || 1
                    };
                return this._fields.push(n), this
            }, e.Index.prototype.ref = function(e) {
                return this._ref = e, this
            }, e.Index.prototype.add = function(t, n) {
                var r = {},
                    i = new e.SortedSet,
                    s = t[this._ref],
                    n = n === undefined ? !0 : n;
                this._fields.forEach(function(n) {
                    var s = this.pipeline.run(e.tokenizer(t[n.name]));
                    r[n.name] = s, e.SortedSet.prototype.add.apply(i, s)
                }, this), this.documentStore.set(s, i), e.SortedSet.prototype.add.apply(this.corpusTokens, i.toArray());
                for (var o = 0; o < i.length; o++) {
                    var u = i.elements[o],
                        a = this._fields.reduce(function(e, t) {
                            var n = r[t.name].length;
                            if (!n) return e;
                            var i = r[t.name].filter(function(e) {
                                return e === u
                            }).length;
                            return e + i / n * t.boost
                        }, 0);
                    this.tokenStore.add(u, {
                        ref: s,
                        tf: a
                    })
                }
                n && this.eventEmitter.emit("add", t, this)
            }, e.Index.prototype.remove = function(e, t) {
                var n = e[this._ref],
                    t = t === undefined ? !0 : t;
                if (!this.documentStore.has(n)) return;
                var r = this.documentStore.get(n);
                this.documentStore.remove(n), r.forEach(function(e) {
                    this.tokenStore.remove(e, n)
                }, this), t && this.eventEmitter.emit("remove", e, this)
            }, e.Index.prototype.update = function(e, t) {
                var t = t === undefined ? !0 : t;
                this.remove(e, !1), this.add(e, !1), t && this.eventEmitter.emit("update", e, this)
            }, e.Index.prototype.idf = function(e) {
                var t = "@" + e;
                if (Object.prototype.hasOwnProperty.call(this._idfCache, t)) return this._idfCache[t];
                var n = this.tokenStore.count(e),
                    r = 1;
                return n > 0 && (r = 1 + Math.log(this.tokenStore.length / n)), this._idfCache[t] = r
            }, e.Index.prototype.search = function(t) {
                var n = this.pipeline.run(e.tokenizer(t)),
                    r = new e.Vector,
                    i = [],
                    s = this._fields.reduce(function(e, t) {
                        return e + t.boost
                    }, 0),
                    o = n.some(function(e) {
                        return this.tokenStore.has(e)
                    }, this);
                if (!o) return [];
                n.forEach(function(t, n, o) {
                    var u = 1 / o.length * this._fields.length * s,
                        a = this,
                        f = this.tokenStore.expand(t).reduce(function(n, i) {
                            var s = a.corpusTokens.indexOf(i),
                                o = a.idf(i),
                                f = 1,
                                l = new e.SortedSet;
                            if (i !== t) {
                                var c = Math.max(3, i.length - t.length);
                                f = 1 / Math.log(c)
                            }
                            return s > -1 && r.insert(s, u * o * f), Object.keys(a.tokenStore.get(i)).forEach(function(e) {
                                l.add(e)
                            }), n.union(l)
                        }, new e.SortedSet);
                    i.push(f)
                }, this);
                var u = i.reduce(function(e, t) {
                    return e.intersect(t)
                });
                return u.map(function(e) {
                    return {
                        ref: e,
                        score: r.similarity(this.documentVector(e))
                    }
                }, this).sort(function(e, t) {
                    return t.score - e.score
                })
            }, e.Index.prototype.documentVector = function(t) {
                var n = this.documentStore.get(t),
                    r = n.length,
                    i = new e.Vector;
                for (var s = 0; s < r; s++) {
                    var o = n.elements[s],
                        u = this.tokenStore.get(o)[t].tf,
                        a = this.idf(o);
                    i.insert(this.corpusTokens.indexOf(o), u * a)
                }
                return i
            }, e.Index.prototype.toJSON = function() {
                return {
                    version: e.version,
                    fields: this._fields,
                    ref: this._ref,
                    documentStore: this.documentStore.toJSON(),
                    tokenStore: this.tokenStore.toJSON(),
                    corpusTokens: this.corpusTokens.toJSON(),
                    pipeline: this.pipeline.toJSON()
                }
            }, e.Index.prototype.use = function(e) {
                var t = Array.prototype.slice.call(arguments, 1);
                t.unshift(this), e.apply(this, t)
            }, e.Store = function() {
                this.store = {}, this.length = 0
            }, e.Store.load = function(t) {
                var n = new this;
                return n.length = t.length, n.store = Object.keys(t.store).reduce(function(n, r) {
                    return n[r] = e.SortedSet.load(t.store[r]), n
                }, {}), n
            }, e.Store.prototype.set = function(e, t) {
                this.store[e] = t, this.length = Object.keys(this.store).length
            }, e.Store.prototype.get = function(e) {
                return this.store[e]
            }, e.Store.prototype.has = function(e) {
                return e in this.store
            }, e.Store.prototype.remove = function(e) {
                if (!this.has(e)) return;
                delete this.store[e], this.length--
            }, e.Store.prototype.toJSON = function() {
                return {
                    store: this.store,
                    length: this.length
                }
            }, e.stemmer = function() {
                var e = {
                        ational: "ate",
                        tional: "tion",
                        enci: "ence",
                        anci: "ance",
                        izer: "ize",
                        bli: "ble",
                        alli: "al",
                        entli: "ent",
                        eli: "e",
                        ousli: "ous",
                        ization: "ize",
                        ation: "ate",
                        ator: "ate",
                        alism: "al",
                        iveness: "ive",
                        fulness: "ful",
                        ousness: "ous",
                        aliti: "al",
                        iviti: "ive",
                        biliti: "ble",
                        logi: "log"
                    },
                    t = {
                        icate: "ic",
                        ative: "",
                        alize: "al",
                        iciti: "ic",
                        ical: "ic",
                        ful: "",
                        ness: ""
                    },
                    n = "[^aeiou]",
                    r = "[aeiouy]",
                    i = n + "[^aeiouy]*",
                    s = r + "[aeiou]*",
                    o = "^(" + i + ")?" + s + i,
                    u = "^(" + i + ")?" + s + i + "(" + s + ")?$",
                    a = "^(" + i + ")?" + s + i + s + i,
                    f = "^(" + i + ")?" + r;
                return function(n) {
                    var s, l, c, h, p, d, m;
                    if (n.length < 3) return n;
                    c = n.substr(0, 1), c == "y" && (n = c.toUpperCase() + n.substr(1)), h = /^(.+?)(ss|i)es$/, p = /^(.+?)([^s])s$/, h.test(n) ? n = n.replace(h, "$1$2") : p.test(n) && (n = n.replace(p, "$1$2")), h = /^(.+?)eed$/, p = /^(.+?)(ed|ing)$/;
                    if (h.test(n)) {
                        var g = h.exec(n);
                        h = new RegExp(o), h.test(g[1]) && (h = /.$/, n = n.replace(h, ""))
                    } else if (p.test(n)) {
                        var g = p.exec(n);
                        s = g[1], p = new RegExp(f), p.test(s) && (n = s, p = /(at|bl|iz)$/, d = new RegExp("([^aeiouylsz])\\1$"), m = new RegExp("^" + i + r + "[^aeiouwxy]$"), p.test(n) ? n += "e" : d.test(n) ? (h = /.$/, n = n.replace(h, "")) : m.test(n) && (n += "e"))
                    }
                    h = /^(.+?)y$/;
                    if (h.test(n)) {
                        var g = h.exec(n);
                        s = g[1], h = new RegExp(f), h.test(s) && (n = s + "i")
                    }
                    h = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
                    if (h.test(n)) {
                        var g = h.exec(n);
                        s = g[1], l = g[2], h = new RegExp(o), h.test(s) && (n = s + e[l])
                    }
                    h = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
                    if (h.test(n)) {
                        var g = h.exec(n);
                        s = g[1], l = g[2], h = new RegExp(o), h.test(s) && (n = s + t[l])
                    }
                    h = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/, p = /^(.+?)(s|t)(ion)$/;
                    if (h.test(n)) {
                        var g = h.exec(n);
                        s = g[1], h = new RegExp(a), h.test(s) && (n = s)
                    } else if (p.test(n)) {
                        var g = p.exec(n);
                        s = g[1] + g[2], p = new RegExp(a), p.test(s) && (n = s)
                    }
                    h = /^(.+?)e$/;
                    if (h.test(n)) {
                        var g = h.exec(n);
                        s = g[1], h = new RegExp(a), p = new RegExp(u), d = new RegExp("^" + i + r + "[^aeiouwxy]$");
                        if (h.test(s) || p.test(s) && !d.test(s)) n = s
                    }
                    return h = /ll$/, p = new RegExp(a), h.test(n) && p.test(n) && (h = /.$/, n = n.replace(h, "")), c == "y" && (n = c.toLowerCase() + n.substr(1)), n
                }
            }(), e.Pipeline.registerFunction(e.stemmer, "stemmer"), e.stopWordFilter = function(t) {
                if (e.stopWordFilter.stopWords.indexOf(t) === -1) return t
            }, e.stopWordFilter.stopWords = new e.SortedSet, e.stopWordFilter.stopWords.length = 119, e.stopWordFilter.stopWords.elements = ["", "a", "able", "about", "across", "after", "all", "almost", "also", "am", "among", "an", "and", "any", "are", "as", "at", "be", "because", "been", "but", "by", "can", "cannot", "could", "dear", "did", "do", "does", "either", "else", "ever", "every", "for", "from", "get", "got", "had", "has", "have", "he", "her", "hers", "him", "his", "how", "however", "i", "if", "in", "into", "is", "it", "its", "just", "least", "let", "like", "likely", "may", "me", "might", "most", "must", "my", "neither", "no", "nor", "not", "of", "off", "often", "on", "only", "or", "other", "our", "own", "rather", "said", "say", "says", "she", "should", "since", "so", "some", "than", "that", "the", "their", "them", "then", "there", "these", "they", "this", "tis", "to", "too", "twas", "us", "wants", "was", "we", "were", "what", "when", "where", "which", "while", "who", "whom", "why", "will", "with", "would", "yet", "you", "your"], e.Pipeline.registerFunction(e.stopWordFilter, "stopWordFilter"), e.trimmer = function(e) {
                return e.replace(/^\W+/, "").replace(/\W+$/, "")
            }, e.Pipeline.registerFunction(e.trimmer, "trimmer"), e.TokenStore = function() {
                this.root = {
                    docs: {}
                }, this.length = 0
            }, e.TokenStore.load = function(e) {
                var t = new this;
                return t.root = e.root, t.length = e.length, t
            }, e.TokenStore.prototype.add = function(e, t, n) {
                var n = n || this.root,
                    r = e[0],
                    i = e.slice(1);
                r in n || (n[r] = {
                    docs: {}
                });
                if (i.length === 0) {
                    n[r].docs[t.ref] = t, this.length += 1;
                    return
                }
                return this.add(i, t, n[r])
            }, e.TokenStore.prototype.has = function(e) {
                if (!e) return !1;
                var t = this.root;
                for (var n = 0; n < e.length; n++) {
                    if (!t[e[n]]) return !1;
                    t = t[e[n]]
                }
                return !0
            }, e.TokenStore.prototype.getNode = function(e) {
                if (!e) return {};
                var t = this.root;
                for (var n = 0; n < e.length; n++) {
                    if (!t[e[n]]) return {};
                    t = t[e[n]]
                }
                return t
            }, e.TokenStore.prototype.get = function(e, t) {
                return this.getNode(e, t).docs || {}
            }, e.TokenStore.prototype.count = function(e, t) {
                return Object.keys(this.get(e, t)).length
            }, e.TokenStore.prototype.remove = function(e, t) {
                if (!e) return;
                var n = this.root;
                for (var r = 0; r < e.length; r++) {
                    if (!(e[r] in n)) return;
                    n = n[e[r]]
                }
                delete n.docs[t]
            }, e.TokenStore.prototype.expand = function(e, t) {
                var n = this.getNode(e),
                    r = n.docs || {},
                    t = t || [];
                return Object.keys(r).length && t.push(e), Object.keys(n).forEach(function(n) {
                    if (n === "docs") return;
                    t.concat(this.expand(e + n, t))
                }, this), t
            }, e.TokenStore.prototype.toJSON = function() {
                return {
                    root: this.root,
                    length: this.length
                }
            },
            function(e, t) {
                typeof define == "function" && define.amd ? define("lunr", t) : typeof exports == "object" ? module.exports = t() : e.lunr = t()
            }(this, function() {
                return e
            })
    }(), define("utils/platform", [], function() {
        return {
            isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        }
    }), define("core/sidebar", ["jQuery", "lodash", "utils/storage", "utils/platform", "core/state"], function(e, t, n, r, i) {
        var s = function(e, t) {
                if (i != null && o() == e) return;
                t == null && (t = !0), i.$book.toggleClass("without-animation", !t), i.$book.toggleClass("with-summary", e), n.set("sidebar", o())
            },
            o = function() {
                return i.$book.hasClass("with-summary")
            },
            u = function() {
                e(document).on("click", ".book-header .toggle-summary", function(e) {
                    e.preventDefault(), s()
                }), r.isMobile || s(n.get("sidebar", !0), !1)
            },
            a = function(n) {
                var r = e(".book-summary");
                r.find("li").each(function() {
                    var r = e(this).data("path"),
                        i = n == null || t.contains(n, r);
                    e(this).toggle(i), i && e(this).parents("li").show()
                })
            };
        return {
            init: u,
            toggle: s,
            filter: a
        }
    }), define("core/search", ["jQuery", "lodash", "lunr", "utils/storage", "core/state", "core/sidebar"], function(e, t, n, r, i, s) {
        var o = null,
            u = function(e) {
                o = n.Index.load(e)
            },
            a = function() {
                e.getJSON(i.basePath + "/search_index.json").then(u)
            },
            f = function(e) {
                if (!o) return;
                var n = t.chain(o.search(e)).map(function(e) {
                    var t = e.ref.split("#");
                    return {
                        path: t[0],
                        hash: t[1]
                    }
                }).value();
                return n
            },
            l = function(t) {
                if (i != null && c() == t) return;
                var n = e(".book-search input");
                i.$book.toggleClass("with-search", t), c() ? (s.toggle(!0), n.focus()) : (n.blur(), n.val(""), s.filter(null))
            },
            c = function() {
                return i.$book.hasClass("with-search")
            },
            h = function() {
                a(), e(document).on("click", ".book-header .toggle-search", function(e) {
                    e.preventDefault(), l()
                }), e(document).on("keyup", ".book-search input", function(n) {
                    var i = n.keyCode ? n.keyCode : n.which,
                        o = e(this).val();
                    if (i == 27) {
                        n.preventDefault(), l(!1);
                        return
                    }
                    if (o.length == 0) s.filter(null), r.remove("keyword");
                    else {
                        var u = f(o);
                        s.filter(t.pluck(u, "path")), r.set("keyword", o)
                    }
                })
            },
            p = function() {
                var n = r.get("keyword", "");
                n.length > 0 && (c() || l(), s.filter(t.pluck(f(n), "path"))), e(".book-search input").val(n)
            };
        return {
            init: h,
            search: f,
            toggle: l,
            recover: p
        }
    }), define("core/glossary", ["jQuery", "lodash", "core/state"], function(e, t, n) {
        var r = null,
            i = function(e) {
                r = e
            },
            s = function() {
                return e.getJSON(n.basePath + "/glossary_index.json").then(i)
            },
            o = function() {
                var t = e.Deferred();
                return r ? t.resolve(r) : s().done(function() {
                    t.resolve(r)
                }).fail(t.reject), t.promise()
            };
        e.fn.replaceText = function(t, n, r) {
            return this.each(function() {
                var i = this.firstChild,
                    s, o, u = [];
                if (i)
                    do i.nodeType === 3 && (s = i.nodeValue, o = s.replace(t, n), o !== s && (!r && /</.test(o) ? (e(i).before(o), u.push(i)) : i.nodeValue = o)); while (i = i.nextSibling);
                u.length && e(u).remove()
            })
        };
        var u = function(e) {
                return (e + "").replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, "\\$1")
            },
            a = function() {
                e(document).on("click", ".book-body .page-wrapper .page-inner .glossary-term", function(t) {
                    t.preventDefault(), location.href = n.basePath + "/GLOSSARY.html#" + e(t.currentTarget).data("glossary-term")
                })
            },
            f = function(e, t) {
                var n = new RegExp("\\b(" + u(t.name.toLowerCase()) + ")\\b", "gi");
                e.find("*").replaceText(n, function(e) {
                    return "<span class='glossary-term' data-glossary-term='" + t.id + "' title='" + t.description + "'>" + e + "</span>"
                })
            },
            l = function() {
                o().done(function() {
                    t.each(r, t.partial(f, e(".book-body .page-wrapper .page-inner")))
                })
            };
        return {
            init: a,
            prepare: l
        }
    }), define("core/navigation", ["jQuery", "utils/url", "core/events", "core/state", "core/progress", "core/loading", "core/search", "core/glossary"], function(e, t, n, r, i, s, o, u) {
        var a, f, l = typeof history.pushState != "undefined",
            c = function(n, i) {
                var u = t.join(window.location.pathname, n);
                console.log("navigate to ", u, "baseurl=" + n, "current=" + window.location.pathname);
                if (!l) {
                    location.href = n;
                    return
                }
                return s.show(e.get(u).done(function(t) {
                    i && history.pushState({
                        path: u
                    }, null, u), t = t.replace(/<(\/?)(html|head|body)([^>]*)>/ig, function(e, t, n, r) {
                        return "<" + t + "div" + (t ? "" : ' data-element="' + n + '"') + r + ">"
                    });
                    var n = e(t),
                        s = n.find("[data-element=head]"),
                        a = n.find(".book"),
                        f = s.html();
                    e("head style").each(function() {
                        f += this.outerHTML
                    }), e("head").html(f);
                    var l = e(".book").attr("class"),
                        c = e(".book-summary .summary").scrollTop();
                    a.toggleClass("with-summary", e(".book").hasClass("with-summary")), e(".book").replaceWith(a), e(".book").attr("class", l), e(".book-summary .summary").scrollTop(c), r.update(e("html")), o.recover(), p()
                }).fail(function(e) {
                    location.href = n
                }))
            },
            h = function() {
                var t, n;
                t = parseInt(e(".body-inner").css("width"), 10), n = parseInt(e(".page-wrapper").css("width"), 10), e(".navigation-next").css("margin-right", t - n + "px")
            },
            p = function() {
                var t = e(".book-body .page-wrapper");
                i.show(), h(), u.prepare(), t.scrollTop(0), t.focus(), n.trigger("page.change")
            },
            d = function(t) {
                t.stopPropagation(), t.preventDefault();
                var n = e(this).attr("href");
                n && c(n, !0)
            },
            v = function() {
                var t = e(".navigation-next").attr("href");
                t && c(t, !0)
            },
            m = function() {
                var t = e(".navigation-prev").attr("href");
                t && c(t, !0)
            },
            g = function() {
                e.ajaxSetup({
                    cache: !1
                }), history.replaceState({
                    path: window.location.href
                }, ""), window.onpopstate = function(e) {
                    if (e.state === null) return;
                    return c(e.state.path, !1)
                }, e(document).on("click", ".navigation-prev", d), e(document).on("click", ".navigation-next", d), e(document).on("click", ".summary [data-path] a", d), e(window).resize(h), p()
            };
        return {
            init: g,
            goNext: v,
            goPrev: m
        }
    }), define("core/keyboard", ["jQuery", "Mousetrap", "core/navigation", "core/sidebar", "core/search"], function(e, t, n, r, i) {
        var s = function() {
            t.bind(["right"], function(e) {
                return n.goNext(), !1
            }), t.bind(["left"], function(e) {
                return n.goPrev(), !1
            }), t.bind(["s"], function(e) {
                return r.toggle(), !1
            }), t.bind(["f"], function(e) {
                return i.toggle(), !1
            })
        };
        return {
            init: s
        }
    }), define("gitbook", ["jQuery", "utils/storage", "utils/sharing", "utils/dropdown", "core/events", "core/font-settings", "core/state", "core/keyboard", "core/navigation", "core/progress", "core/sidebar", "core/search", "core/glossary"], function(e, t, n, r, i, s, o, u, a, f, l, c, h) {
        var p = function(e) {
            var t;
            t = o.$book, l.init(), c.init(), h.init(), u.init(), n.init(), r.init(), a.init(), s.init(e.fontSettings || {}), i.trigger("start", e)
        };
        return {
            start: p,
            events: i,
            state: o
        }
    });
