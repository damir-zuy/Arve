import Pt, { nativeTheme as Tf, ipcMain as Mn, app as $n, BrowserWindow as ll } from "electron";
import { fileURLToPath as Cf } from "node:url";
import ct from "node:path";
import gt from "fs";
import $f from "constants";
import kr from "stream";
import ho from "util";
import cl from "assert";
import ne from "path";
import Bn from "child_process";
import ul from "events";
import Mr from "crypto";
import fl from "tty";
import jn from "os";
import rr from "url";
import bf from "string_decoder";
import dl from "zlib";
import Of from "http";
var Se = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Je = {}, Dt = {}, $e = {};
$e.fromCallback = function(e) {
  return Object.defineProperty(function(...t) {
    if (typeof t[t.length - 1] == "function") e.apply(this, t);
    else
      return new Promise((r, n) => {
        t.push((i, o) => i != null ? n(i) : r(o)), e.apply(this, t);
      });
  }, "name", { value: e.name });
};
$e.fromPromise = function(e) {
  return Object.defineProperty(function(...t) {
    const r = t[t.length - 1];
    if (typeof r != "function") return e.apply(this, t);
    t.pop(), e.apply(this, t).then((n) => r(null, n), r);
  }, "name", { value: e.name });
};
var it = $f, If = process.cwd, An = null, Rf = process.env.GRACEFUL_FS_PLATFORM || process.platform;
process.cwd = function() {
  return An || (An = If.call(process)), An;
};
try {
  process.cwd();
} catch {
}
if (typeof process.chdir == "function") {
  var ua = process.chdir;
  process.chdir = function(e) {
    An = null, ua.call(process, e);
  }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, ua);
}
var Pf = Nf;
function Nf(e) {
  it.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && t(e), e.lutimes || r(e), e.chown = o(e.chown), e.fchown = o(e.fchown), e.lchown = o(e.lchown), e.chmod = n(e.chmod), e.fchmod = n(e.fchmod), e.lchmod = n(e.lchmod), e.chownSync = a(e.chownSync), e.fchownSync = a(e.fchownSync), e.lchownSync = a(e.lchownSync), e.chmodSync = i(e.chmodSync), e.fchmodSync = i(e.fchmodSync), e.lchmodSync = i(e.lchmodSync), e.stat = s(e.stat), e.fstat = s(e.fstat), e.lstat = s(e.lstat), e.statSync = l(e.statSync), e.fstatSync = l(e.fstatSync), e.lstatSync = l(e.lstatSync), e.chmod && !e.lchmod && (e.lchmod = function(c, f, h) {
    h && process.nextTick(h);
  }, e.lchmodSync = function() {
  }), e.chown && !e.lchown && (e.lchown = function(c, f, h, g) {
    g && process.nextTick(g);
  }, e.lchownSync = function() {
  }), Rf === "win32" && (e.rename = typeof e.rename != "function" ? e.rename : function(c) {
    function f(h, g, _) {
      var y = Date.now(), A = 0;
      c(h, g, function T(S) {
        if (S && (S.code === "EACCES" || S.code === "EPERM" || S.code === "EBUSY") && Date.now() - y < 6e4) {
          setTimeout(function() {
            e.stat(g, function(D, x) {
              D && D.code === "ENOENT" ? c(h, g, T) : _(S);
            });
          }, A), A < 100 && (A += 10);
          return;
        }
        _ && _(S);
      });
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(f, c), f;
  }(e.rename)), e.read = typeof e.read != "function" ? e.read : function(c) {
    function f(h, g, _, y, A, T) {
      var S;
      if (T && typeof T == "function") {
        var D = 0;
        S = function(x, Z, ae) {
          if (x && x.code === "EAGAIN" && D < 10)
            return D++, c.call(e, h, g, _, y, A, S);
          T.apply(this, arguments);
        };
      }
      return c.call(e, h, g, _, y, A, S);
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(f, c), f;
  }(e.read), e.readSync = typeof e.readSync != "function" ? e.readSync : /* @__PURE__ */ function(c) {
    return function(f, h, g, _, y) {
      for (var A = 0; ; )
        try {
          return c.call(e, f, h, g, _, y);
        } catch (T) {
          if (T.code === "EAGAIN" && A < 10) {
            A++;
            continue;
          }
          throw T;
        }
    };
  }(e.readSync);
  function t(c) {
    c.lchmod = function(f, h, g) {
      c.open(
        f,
        it.O_WRONLY | it.O_SYMLINK,
        h,
        function(_, y) {
          if (_) {
            g && g(_);
            return;
          }
          c.fchmod(y, h, function(A) {
            c.close(y, function(T) {
              g && g(A || T);
            });
          });
        }
      );
    }, c.lchmodSync = function(f, h) {
      var g = c.openSync(f, it.O_WRONLY | it.O_SYMLINK, h), _ = !0, y;
      try {
        y = c.fchmodSync(g, h), _ = !1;
      } finally {
        if (_)
          try {
            c.closeSync(g);
          } catch {
          }
        else
          c.closeSync(g);
      }
      return y;
    };
  }
  function r(c) {
    it.hasOwnProperty("O_SYMLINK") && c.futimes ? (c.lutimes = function(f, h, g, _) {
      c.open(f, it.O_SYMLINK, function(y, A) {
        if (y) {
          _ && _(y);
          return;
        }
        c.futimes(A, h, g, function(T) {
          c.close(A, function(S) {
            _ && _(T || S);
          });
        });
      });
    }, c.lutimesSync = function(f, h, g) {
      var _ = c.openSync(f, it.O_SYMLINK), y, A = !0;
      try {
        y = c.futimesSync(_, h, g), A = !1;
      } finally {
        if (A)
          try {
            c.closeSync(_);
          } catch {
          }
        else
          c.closeSync(_);
      }
      return y;
    }) : c.futimes && (c.lutimes = function(f, h, g, _) {
      _ && process.nextTick(_);
    }, c.lutimesSync = function() {
    });
  }
  function n(c) {
    return c && function(f, h, g) {
      return c.call(e, f, h, function(_) {
        m(_) && (_ = null), g && g.apply(this, arguments);
      });
    };
  }
  function i(c) {
    return c && function(f, h) {
      try {
        return c.call(e, f, h);
      } catch (g) {
        if (!m(g)) throw g;
      }
    };
  }
  function o(c) {
    return c && function(f, h, g, _) {
      return c.call(e, f, h, g, function(y) {
        m(y) && (y = null), _ && _.apply(this, arguments);
      });
    };
  }
  function a(c) {
    return c && function(f, h, g) {
      try {
        return c.call(e, f, h, g);
      } catch (_) {
        if (!m(_)) throw _;
      }
    };
  }
  function s(c) {
    return c && function(f, h, g) {
      typeof h == "function" && (g = h, h = null);
      function _(y, A) {
        A && (A.uid < 0 && (A.uid += 4294967296), A.gid < 0 && (A.gid += 4294967296)), g && g.apply(this, arguments);
      }
      return h ? c.call(e, f, h, _) : c.call(e, f, _);
    };
  }
  function l(c) {
    return c && function(f, h) {
      var g = h ? c.call(e, f, h) : c.call(e, f);
      return g && (g.uid < 0 && (g.uid += 4294967296), g.gid < 0 && (g.gid += 4294967296)), g;
    };
  }
  function m(c) {
    if (!c || c.code === "ENOSYS")
      return !0;
    var f = !process.getuid || process.getuid() !== 0;
    return !!(f && (c.code === "EINVAL" || c.code === "EPERM"));
  }
}
var fa = kr.Stream, Df = Ff;
function Ff(e) {
  return {
    ReadStream: t,
    WriteStream: r
  };
  function t(n, i) {
    if (!(this instanceof t)) return new t(n, i);
    fa.call(this);
    var o = this;
    this.path = n, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, i = i || {};
    for (var a = Object.keys(i), s = 0, l = a.length; s < l; s++) {
      var m = a[s];
      this[m] = i[m];
    }
    if (this.encoding && this.setEncoding(this.encoding), this.start !== void 0) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.end === void 0)
        this.end = 1 / 0;
      else if (typeof this.end != "number")
        throw TypeError("end must be a Number");
      if (this.start > this.end)
        throw new Error("start must be <= end");
      this.pos = this.start;
    }
    if (this.fd !== null) {
      process.nextTick(function() {
        o._read();
      });
      return;
    }
    e.open(this.path, this.flags, this.mode, function(c, f) {
      if (c) {
        o.emit("error", c), o.readable = !1;
        return;
      }
      o.fd = f, o.emit("open", f), o._read();
    });
  }
  function r(n, i) {
    if (!(this instanceof r)) return new r(n, i);
    fa.call(this), this.path = n, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, i = i || {};
    for (var o = Object.keys(i), a = 0, s = o.length; a < s; a++) {
      var l = o[a];
      this[l] = i[l];
    }
    if (this.start !== void 0) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.start < 0)
        throw new Error("start must be >= zero");
      this.pos = this.start;
    }
    this.busy = !1, this._queue = [], this.fd === null && (this._open = e.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush());
  }
}
var xf = Uf, Lf = Object.getPrototypeOf || function(e) {
  return e.__proto__;
};
function Uf(e) {
  if (e === null || typeof e != "object")
    return e;
  if (e instanceof Object)
    var t = { __proto__: Lf(e) };
  else
    var t = /* @__PURE__ */ Object.create(null);
  return Object.getOwnPropertyNames(e).forEach(function(r) {
    Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(e, r));
  }), t;
}
var re = gt, kf = Pf, Mf = Df, Bf = xf, sn = ho, ge, bn;
typeof Symbol == "function" && typeof Symbol.for == "function" ? (ge = Symbol.for("graceful-fs.queue"), bn = Symbol.for("graceful-fs.previous")) : (ge = "___graceful-fs.queue", bn = "___graceful-fs.previous");
function jf() {
}
function hl(e, t) {
  Object.defineProperty(e, ge, {
    get: function() {
      return t;
    }
  });
}
var It = jf;
sn.debuglog ? It = sn.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (It = function() {
  var e = sn.format.apply(sn, arguments);
  e = "GFS4: " + e.split(/\n/).join(`
GFS4: `), console.error(e);
});
if (!re[ge]) {
  var Hf = Se[ge] || [];
  hl(re, Hf), re.close = function(e) {
    function t(r, n) {
      return e.call(re, r, function(i) {
        i || da(), typeof n == "function" && n.apply(this, arguments);
      });
    }
    return Object.defineProperty(t, bn, {
      value: e
    }), t;
  }(re.close), re.closeSync = function(e) {
    function t(r) {
      e.apply(re, arguments), da();
    }
    return Object.defineProperty(t, bn, {
      value: e
    }), t;
  }(re.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
    It(re[ge]), cl.equal(re[ge].length, 0);
  });
}
Se[ge] || hl(Se, re[ge]);
var be = po(Bf(re));
process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !re.__patched && (be = po(re), re.__patched = !0);
function po(e) {
  kf(e), e.gracefulify = po, e.createReadStream = Z, e.createWriteStream = ae;
  var t = e.readFile;
  e.readFile = r;
  function r(E, G, j) {
    return typeof G == "function" && (j = G, G = null), M(E, G, j);
    function M(X, I, b, P) {
      return t(X, I, function($) {
        $ && ($.code === "EMFILE" || $.code === "ENFILE") ? Ut([M, [X, I, b], $, P || Date.now(), Date.now()]) : typeof b == "function" && b.apply(this, arguments);
      });
    }
  }
  var n = e.writeFile;
  e.writeFile = i;
  function i(E, G, j, M) {
    return typeof j == "function" && (M = j, j = null), X(E, G, j, M);
    function X(I, b, P, $, N) {
      return n(I, b, P, function(R) {
        R && (R.code === "EMFILE" || R.code === "ENFILE") ? Ut([X, [I, b, P, $], R, N || Date.now(), Date.now()]) : typeof $ == "function" && $.apply(this, arguments);
      });
    }
  }
  var o = e.appendFile;
  o && (e.appendFile = a);
  function a(E, G, j, M) {
    return typeof j == "function" && (M = j, j = null), X(E, G, j, M);
    function X(I, b, P, $, N) {
      return o(I, b, P, function(R) {
        R && (R.code === "EMFILE" || R.code === "ENFILE") ? Ut([X, [I, b, P, $], R, N || Date.now(), Date.now()]) : typeof $ == "function" && $.apply(this, arguments);
      });
    }
  }
  var s = e.copyFile;
  s && (e.copyFile = l);
  function l(E, G, j, M) {
    return typeof j == "function" && (M = j, j = 0), X(E, G, j, M);
    function X(I, b, P, $, N) {
      return s(I, b, P, function(R) {
        R && (R.code === "EMFILE" || R.code === "ENFILE") ? Ut([X, [I, b, P, $], R, N || Date.now(), Date.now()]) : typeof $ == "function" && $.apply(this, arguments);
      });
    }
  }
  var m = e.readdir;
  e.readdir = f;
  var c = /^v[0-5]\./;
  function f(E, G, j) {
    typeof G == "function" && (j = G, G = null);
    var M = c.test(process.version) ? function(b, P, $, N) {
      return m(b, X(
        b,
        P,
        $,
        N
      ));
    } : function(b, P, $, N) {
      return m(b, P, X(
        b,
        P,
        $,
        N
      ));
    };
    return M(E, G, j);
    function X(I, b, P, $) {
      return function(N, R) {
        N && (N.code === "EMFILE" || N.code === "ENFILE") ? Ut([
          M,
          [I, b, P],
          N,
          $ || Date.now(),
          Date.now()
        ]) : (R && R.sort && R.sort(), typeof P == "function" && P.call(this, N, R));
      };
    }
  }
  if (process.version.substr(0, 4) === "v0.8") {
    var h = Mf(e);
    T = h.ReadStream, D = h.WriteStream;
  }
  var g = e.ReadStream;
  g && (T.prototype = Object.create(g.prototype), T.prototype.open = S);
  var _ = e.WriteStream;
  _ && (D.prototype = Object.create(_.prototype), D.prototype.open = x), Object.defineProperty(e, "ReadStream", {
    get: function() {
      return T;
    },
    set: function(E) {
      T = E;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(e, "WriteStream", {
    get: function() {
      return D;
    },
    set: function(E) {
      D = E;
    },
    enumerable: !0,
    configurable: !0
  });
  var y = T;
  Object.defineProperty(e, "FileReadStream", {
    get: function() {
      return y;
    },
    set: function(E) {
      y = E;
    },
    enumerable: !0,
    configurable: !0
  });
  var A = D;
  Object.defineProperty(e, "FileWriteStream", {
    get: function() {
      return A;
    },
    set: function(E) {
      A = E;
    },
    enumerable: !0,
    configurable: !0
  });
  function T(E, G) {
    return this instanceof T ? (g.apply(this, arguments), this) : T.apply(Object.create(T.prototype), arguments);
  }
  function S() {
    var E = this;
    Ne(E.path, E.flags, E.mode, function(G, j) {
      G ? (E.autoClose && E.destroy(), E.emit("error", G)) : (E.fd = j, E.emit("open", j), E.read());
    });
  }
  function D(E, G) {
    return this instanceof D ? (_.apply(this, arguments), this) : D.apply(Object.create(D.prototype), arguments);
  }
  function x() {
    var E = this;
    Ne(E.path, E.flags, E.mode, function(G, j) {
      G ? (E.destroy(), E.emit("error", G)) : (E.fd = j, E.emit("open", j));
    });
  }
  function Z(E, G) {
    return new e.ReadStream(E, G);
  }
  function ae(E, G) {
    return new e.WriteStream(E, G);
  }
  var Y = e.open;
  e.open = Ne;
  function Ne(E, G, j, M) {
    return typeof j == "function" && (M = j, j = null), X(E, G, j, M);
    function X(I, b, P, $, N) {
      return Y(I, b, P, function(R, k) {
        R && (R.code === "EMFILE" || R.code === "ENFILE") ? Ut([X, [I, b, P, $], R, N || Date.now(), Date.now()]) : typeof $ == "function" && $.apply(this, arguments);
      });
    }
  }
  return e;
}
function Ut(e) {
  It("ENQUEUE", e[0].name, e[1]), re[ge].push(e), mo();
}
var ln;
function da() {
  for (var e = Date.now(), t = 0; t < re[ge].length; ++t)
    re[ge][t].length > 2 && (re[ge][t][3] = e, re[ge][t][4] = e);
  mo();
}
function mo() {
  if (clearTimeout(ln), ln = void 0, re[ge].length !== 0) {
    var e = re[ge].shift(), t = e[0], r = e[1], n = e[2], i = e[3], o = e[4];
    if (i === void 0)
      It("RETRY", t.name, r), t.apply(null, r);
    else if (Date.now() - i >= 6e4) {
      It("TIMEOUT", t.name, r);
      var a = r.pop();
      typeof a == "function" && a.call(null, n);
    } else {
      var s = Date.now() - o, l = Math.max(o - i, 1), m = Math.min(l * 1.2, 100);
      s >= m ? (It("RETRY", t.name, r), t.apply(null, r.concat([i]))) : re[ge].push(e);
    }
    ln === void 0 && (ln = setTimeout(mo, 0));
  }
}
(function(e) {
  const t = $e.fromCallback, r = be, n = [
    "access",
    "appendFile",
    "chmod",
    "chown",
    "close",
    "copyFile",
    "fchmod",
    "fchown",
    "fdatasync",
    "fstat",
    "fsync",
    "ftruncate",
    "futimes",
    "lchmod",
    "lchown",
    "link",
    "lstat",
    "mkdir",
    "mkdtemp",
    "open",
    "opendir",
    "readdir",
    "readFile",
    "readlink",
    "realpath",
    "rename",
    "rm",
    "rmdir",
    "stat",
    "symlink",
    "truncate",
    "unlink",
    "utimes",
    "writeFile"
  ].filter((i) => typeof r[i] == "function");
  Object.assign(e, r), n.forEach((i) => {
    e[i] = t(r[i]);
  }), e.exists = function(i, o) {
    return typeof o == "function" ? r.exists(i, o) : new Promise((a) => r.exists(i, a));
  }, e.read = function(i, o, a, s, l, m) {
    return typeof m == "function" ? r.read(i, o, a, s, l, m) : new Promise((c, f) => {
      r.read(i, o, a, s, l, (h, g, _) => {
        if (h) return f(h);
        c({ bytesRead: g, buffer: _ });
      });
    });
  }, e.write = function(i, o, ...a) {
    return typeof a[a.length - 1] == "function" ? r.write(i, o, ...a) : new Promise((s, l) => {
      r.write(i, o, ...a, (m, c, f) => {
        if (m) return l(m);
        s({ bytesWritten: c, buffer: f });
      });
    });
  }, typeof r.writev == "function" && (e.writev = function(i, o, ...a) {
    return typeof a[a.length - 1] == "function" ? r.writev(i, o, ...a) : new Promise((s, l) => {
      r.writev(i, o, ...a, (m, c, f) => {
        if (m) return l(m);
        s({ bytesWritten: c, buffers: f });
      });
    });
  }), typeof r.realpath.native == "function" ? e.realpath.native = t(r.realpath.native) : process.emitWarning(
    "fs.realpath.native is not a function. Is fs being monkey-patched?",
    "Warning",
    "fs-extra-WARN0003"
  );
})(Dt);
var go = {}, pl = {};
const qf = ne;
pl.checkPath = function(t) {
  if (process.platform === "win32" && /[<>:"|?*]/.test(t.replace(qf.parse(t).root, ""))) {
    const n = new Error(`Path contains invalid characters: ${t}`);
    throw n.code = "EINVAL", n;
  }
};
const ml = Dt, { checkPath: gl } = pl, El = (e) => {
  const t = { mode: 511 };
  return typeof e == "number" ? e : { ...t, ...e }.mode;
};
go.makeDir = async (e, t) => (gl(e), ml.mkdir(e, {
  mode: El(t),
  recursive: !0
}));
go.makeDirSync = (e, t) => (gl(e), ml.mkdirSync(e, {
  mode: El(t),
  recursive: !0
}));
const Gf = $e.fromPromise, { makeDir: Vf, makeDirSync: yi } = go, vi = Gf(Vf);
var Ye = {
  mkdirs: vi,
  mkdirsSync: yi,
  // alias
  mkdirp: vi,
  mkdirpSync: yi,
  ensureDir: vi,
  ensureDirSync: yi
};
const Wf = $e.fromPromise, yl = Dt;
function Yf(e) {
  return yl.access(e).then(() => !0).catch(() => !1);
}
var Ft = {
  pathExists: Wf(Yf),
  pathExistsSync: yl.existsSync
};
const Kt = be;
function zf(e, t, r, n) {
  Kt.open(e, "r+", (i, o) => {
    if (i) return n(i);
    Kt.futimes(o, t, r, (a) => {
      Kt.close(o, (s) => {
        n && n(a || s);
      });
    });
  });
}
function Xf(e, t, r) {
  const n = Kt.openSync(e, "r+");
  return Kt.futimesSync(n, t, r), Kt.closeSync(n);
}
var vl = {
  utimesMillis: zf,
  utimesMillisSync: Xf
};
const Qt = Dt, de = ne, Kf = ho;
function Jf(e, t, r) {
  const n = r.dereference ? (i) => Qt.stat(i, { bigint: !0 }) : (i) => Qt.lstat(i, { bigint: !0 });
  return Promise.all([
    n(e),
    n(t).catch((i) => {
      if (i.code === "ENOENT") return null;
      throw i;
    })
  ]).then(([i, o]) => ({ srcStat: i, destStat: o }));
}
function Qf(e, t, r) {
  let n;
  const i = r.dereference ? (a) => Qt.statSync(a, { bigint: !0 }) : (a) => Qt.lstatSync(a, { bigint: !0 }), o = i(e);
  try {
    n = i(t);
  } catch (a) {
    if (a.code === "ENOENT") return { srcStat: o, destStat: null };
    throw a;
  }
  return { srcStat: o, destStat: n };
}
function Zf(e, t, r, n, i) {
  Kf.callbackify(Jf)(e, t, n, (o, a) => {
    if (o) return i(o);
    const { srcStat: s, destStat: l } = a;
    if (l) {
      if (Br(s, l)) {
        const m = de.basename(e), c = de.basename(t);
        return r === "move" && m !== c && m.toLowerCase() === c.toLowerCase() ? i(null, { srcStat: s, destStat: l, isChangingCase: !0 }) : i(new Error("Source and destination must not be the same."));
      }
      if (s.isDirectory() && !l.isDirectory())
        return i(new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`));
      if (!s.isDirectory() && l.isDirectory())
        return i(new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`));
    }
    return s.isDirectory() && Eo(e, t) ? i(new Error(Hn(e, t, r))) : i(null, { srcStat: s, destStat: l });
  });
}
function ed(e, t, r, n) {
  const { srcStat: i, destStat: o } = Qf(e, t, n);
  if (o) {
    if (Br(i, o)) {
      const a = de.basename(e), s = de.basename(t);
      if (r === "move" && a !== s && a.toLowerCase() === s.toLowerCase())
        return { srcStat: i, destStat: o, isChangingCase: !0 };
      throw new Error("Source and destination must not be the same.");
    }
    if (i.isDirectory() && !o.isDirectory())
      throw new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`);
    if (!i.isDirectory() && o.isDirectory())
      throw new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`);
  }
  if (i.isDirectory() && Eo(e, t))
    throw new Error(Hn(e, t, r));
  return { srcStat: i, destStat: o };
}
function wl(e, t, r, n, i) {
  const o = de.resolve(de.dirname(e)), a = de.resolve(de.dirname(r));
  if (a === o || a === de.parse(a).root) return i();
  Qt.stat(a, { bigint: !0 }, (s, l) => s ? s.code === "ENOENT" ? i() : i(s) : Br(t, l) ? i(new Error(Hn(e, r, n))) : wl(e, t, a, n, i));
}
function _l(e, t, r, n) {
  const i = de.resolve(de.dirname(e)), o = de.resolve(de.dirname(r));
  if (o === i || o === de.parse(o).root) return;
  let a;
  try {
    a = Qt.statSync(o, { bigint: !0 });
  } catch (s) {
    if (s.code === "ENOENT") return;
    throw s;
  }
  if (Br(t, a))
    throw new Error(Hn(e, r, n));
  return _l(e, t, o, n);
}
function Br(e, t) {
  return t.ino && t.dev && t.ino === e.ino && t.dev === e.dev;
}
function Eo(e, t) {
  const r = de.resolve(e).split(de.sep).filter((i) => i), n = de.resolve(t).split(de.sep).filter((i) => i);
  return r.reduce((i, o, a) => i && n[a] === o, !0);
}
function Hn(e, t, r) {
  return `Cannot ${r} '${e}' to a subdirectory of itself, '${t}'.`;
}
var nr = {
  checkPaths: Zf,
  checkPathsSync: ed,
  checkParentPaths: wl,
  checkParentPathsSync: _l,
  isSrcSubdir: Eo,
  areIdentical: Br
};
const Re = be, Sr = ne, td = Ye.mkdirs, rd = Ft.pathExists, nd = vl.utimesMillis, Tr = nr;
function id(e, t, r, n) {
  typeof r == "function" && !n ? (n = r, r = {}) : typeof r == "function" && (r = { filter: r }), n = n || function() {
  }, r = r || {}, r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0001"
  ), Tr.checkPaths(e, t, "copy", r, (i, o) => {
    if (i) return n(i);
    const { srcStat: a, destStat: s } = o;
    Tr.checkParentPaths(e, a, t, "copy", (l) => l ? n(l) : r.filter ? Al(ha, s, e, t, r, n) : ha(s, e, t, r, n));
  });
}
function ha(e, t, r, n, i) {
  const o = Sr.dirname(r);
  rd(o, (a, s) => {
    if (a) return i(a);
    if (s) return On(e, t, r, n, i);
    td(o, (l) => l ? i(l) : On(e, t, r, n, i));
  });
}
function Al(e, t, r, n, i, o) {
  Promise.resolve(i.filter(r, n)).then((a) => a ? e(t, r, n, i, o) : o(), (a) => o(a));
}
function od(e, t, r, n, i) {
  return n.filter ? Al(On, e, t, r, n, i) : On(e, t, r, n, i);
}
function On(e, t, r, n, i) {
  (n.dereference ? Re.stat : Re.lstat)(t, (a, s) => a ? i(a) : s.isDirectory() ? dd(s, e, t, r, n, i) : s.isFile() || s.isCharacterDevice() || s.isBlockDevice() ? ad(s, e, t, r, n, i) : s.isSymbolicLink() ? md(e, t, r, n, i) : s.isSocket() ? i(new Error(`Cannot copy a socket file: ${t}`)) : s.isFIFO() ? i(new Error(`Cannot copy a FIFO pipe: ${t}`)) : i(new Error(`Unknown file: ${t}`)));
}
function ad(e, t, r, n, i, o) {
  return t ? sd(e, r, n, i, o) : Sl(e, r, n, i, o);
}
function sd(e, t, r, n, i) {
  if (n.overwrite)
    Re.unlink(r, (o) => o ? i(o) : Sl(e, t, r, n, i));
  else return n.errorOnExist ? i(new Error(`'${r}' already exists`)) : i();
}
function Sl(e, t, r, n, i) {
  Re.copyFile(t, r, (o) => o ? i(o) : n.preserveTimestamps ? ld(e.mode, t, r, i) : qn(r, e.mode, i));
}
function ld(e, t, r, n) {
  return cd(e) ? ud(r, e, (i) => i ? n(i) : pa(e, t, r, n)) : pa(e, t, r, n);
}
function cd(e) {
  return (e & 128) === 0;
}
function ud(e, t, r) {
  return qn(e, t | 128, r);
}
function pa(e, t, r, n) {
  fd(t, r, (i) => i ? n(i) : qn(r, e, n));
}
function qn(e, t, r) {
  return Re.chmod(e, t, r);
}
function fd(e, t, r) {
  Re.stat(e, (n, i) => n ? r(n) : nd(t, i.atime, i.mtime, r));
}
function dd(e, t, r, n, i, o) {
  return t ? Tl(r, n, i, o) : hd(e.mode, r, n, i, o);
}
function hd(e, t, r, n, i) {
  Re.mkdir(r, (o) => {
    if (o) return i(o);
    Tl(t, r, n, (a) => a ? i(a) : qn(r, e, i));
  });
}
function Tl(e, t, r, n) {
  Re.readdir(e, (i, o) => i ? n(i) : Cl(o, e, t, r, n));
}
function Cl(e, t, r, n, i) {
  const o = e.pop();
  return o ? pd(e, o, t, r, n, i) : i();
}
function pd(e, t, r, n, i, o) {
  const a = Sr.join(r, t), s = Sr.join(n, t);
  Tr.checkPaths(a, s, "copy", i, (l, m) => {
    if (l) return o(l);
    const { destStat: c } = m;
    od(c, a, s, i, (f) => f ? o(f) : Cl(e, r, n, i, o));
  });
}
function md(e, t, r, n, i) {
  Re.readlink(t, (o, a) => {
    if (o) return i(o);
    if (n.dereference && (a = Sr.resolve(process.cwd(), a)), e)
      Re.readlink(r, (s, l) => s ? s.code === "EINVAL" || s.code === "UNKNOWN" ? Re.symlink(a, r, i) : i(s) : (n.dereference && (l = Sr.resolve(process.cwd(), l)), Tr.isSrcSubdir(a, l) ? i(new Error(`Cannot copy '${a}' to a subdirectory of itself, '${l}'.`)) : e.isDirectory() && Tr.isSrcSubdir(l, a) ? i(new Error(`Cannot overwrite '${l}' with '${a}'.`)) : gd(a, r, i)));
    else
      return Re.symlink(a, r, i);
  });
}
function gd(e, t, r) {
  Re.unlink(t, (n) => n ? r(n) : Re.symlink(e, t, r));
}
var Ed = id;
const we = be, Cr = ne, yd = Ye.mkdirsSync, vd = vl.utimesMillisSync, $r = nr;
function wd(e, t, r) {
  typeof r == "function" && (r = { filter: r }), r = r || {}, r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0002"
  );
  const { srcStat: n, destStat: i } = $r.checkPathsSync(e, t, "copy", r);
  return $r.checkParentPathsSync(e, n, t, "copy"), _d(i, e, t, r);
}
function _d(e, t, r, n) {
  if (n.filter && !n.filter(t, r)) return;
  const i = Cr.dirname(r);
  return we.existsSync(i) || yd(i), $l(e, t, r, n);
}
function Ad(e, t, r, n) {
  if (!(n.filter && !n.filter(t, r)))
    return $l(e, t, r, n);
}
function $l(e, t, r, n) {
  const o = (n.dereference ? we.statSync : we.lstatSync)(t);
  if (o.isDirectory()) return Id(o, e, t, r, n);
  if (o.isFile() || o.isCharacterDevice() || o.isBlockDevice()) return Sd(o, e, t, r, n);
  if (o.isSymbolicLink()) return Nd(e, t, r, n);
  throw o.isSocket() ? new Error(`Cannot copy a socket file: ${t}`) : o.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${t}`) : new Error(`Unknown file: ${t}`);
}
function Sd(e, t, r, n, i) {
  return t ? Td(e, r, n, i) : bl(e, r, n, i);
}
function Td(e, t, r, n) {
  if (n.overwrite)
    return we.unlinkSync(r), bl(e, t, r, n);
  if (n.errorOnExist)
    throw new Error(`'${r}' already exists`);
}
function bl(e, t, r, n) {
  return we.copyFileSync(t, r), n.preserveTimestamps && Cd(e.mode, t, r), yo(r, e.mode);
}
function Cd(e, t, r) {
  return $d(e) && bd(r, e), Od(t, r);
}
function $d(e) {
  return (e & 128) === 0;
}
function bd(e, t) {
  return yo(e, t | 128);
}
function yo(e, t) {
  return we.chmodSync(e, t);
}
function Od(e, t) {
  const r = we.statSync(e);
  return vd(t, r.atime, r.mtime);
}
function Id(e, t, r, n, i) {
  return t ? Ol(r, n, i) : Rd(e.mode, r, n, i);
}
function Rd(e, t, r, n) {
  return we.mkdirSync(r), Ol(t, r, n), yo(r, e);
}
function Ol(e, t, r) {
  we.readdirSync(e).forEach((n) => Pd(n, e, t, r));
}
function Pd(e, t, r, n) {
  const i = Cr.join(t, e), o = Cr.join(r, e), { destStat: a } = $r.checkPathsSync(i, o, "copy", n);
  return Ad(a, i, o, n);
}
function Nd(e, t, r, n) {
  let i = we.readlinkSync(t);
  if (n.dereference && (i = Cr.resolve(process.cwd(), i)), e) {
    let o;
    try {
      o = we.readlinkSync(r);
    } catch (a) {
      if (a.code === "EINVAL" || a.code === "UNKNOWN") return we.symlinkSync(i, r);
      throw a;
    }
    if (n.dereference && (o = Cr.resolve(process.cwd(), o)), $r.isSrcSubdir(i, o))
      throw new Error(`Cannot copy '${i}' to a subdirectory of itself, '${o}'.`);
    if (we.statSync(r).isDirectory() && $r.isSrcSubdir(o, i))
      throw new Error(`Cannot overwrite '${o}' with '${i}'.`);
    return Dd(i, r);
  } else
    return we.symlinkSync(i, r);
}
function Dd(e, t) {
  return we.unlinkSync(t), we.symlinkSync(e, t);
}
var Fd = wd;
const xd = $e.fromCallback;
var vo = {
  copy: xd(Ed),
  copySync: Fd
};
const ma = be, Il = ne, J = cl, br = process.platform === "win32";
function Rl(e) {
  [
    "unlink",
    "chmod",
    "stat",
    "lstat",
    "rmdir",
    "readdir"
  ].forEach((r) => {
    e[r] = e[r] || ma[r], r = r + "Sync", e[r] = e[r] || ma[r];
  }), e.maxBusyTries = e.maxBusyTries || 3;
}
function wo(e, t, r) {
  let n = 0;
  typeof t == "function" && (r = t, t = {}), J(e, "rimraf: missing path"), J.strictEqual(typeof e, "string", "rimraf: path should be a string"), J.strictEqual(typeof r, "function", "rimraf: callback function required"), J(t, "rimraf: invalid options argument provided"), J.strictEqual(typeof t, "object", "rimraf: options should be object"), Rl(t), ga(e, t, function i(o) {
    if (o) {
      if ((o.code === "EBUSY" || o.code === "ENOTEMPTY" || o.code === "EPERM") && n < t.maxBusyTries) {
        n++;
        const a = n * 100;
        return setTimeout(() => ga(e, t, i), a);
      }
      o.code === "ENOENT" && (o = null);
    }
    r(o);
  });
}
function ga(e, t, r) {
  J(e), J(t), J(typeof r == "function"), t.lstat(e, (n, i) => {
    if (n && n.code === "ENOENT")
      return r(null);
    if (n && n.code === "EPERM" && br)
      return Ea(e, t, n, r);
    if (i && i.isDirectory())
      return Sn(e, t, n, r);
    t.unlink(e, (o) => {
      if (o) {
        if (o.code === "ENOENT")
          return r(null);
        if (o.code === "EPERM")
          return br ? Ea(e, t, o, r) : Sn(e, t, o, r);
        if (o.code === "EISDIR")
          return Sn(e, t, o, r);
      }
      return r(o);
    });
  });
}
function Ea(e, t, r, n) {
  J(e), J(t), J(typeof n == "function"), t.chmod(e, 438, (i) => {
    i ? n(i.code === "ENOENT" ? null : r) : t.stat(e, (o, a) => {
      o ? n(o.code === "ENOENT" ? null : r) : a.isDirectory() ? Sn(e, t, r, n) : t.unlink(e, n);
    });
  });
}
function ya(e, t, r) {
  let n;
  J(e), J(t);
  try {
    t.chmodSync(e, 438);
  } catch (i) {
    if (i.code === "ENOENT")
      return;
    throw r;
  }
  try {
    n = t.statSync(e);
  } catch (i) {
    if (i.code === "ENOENT")
      return;
    throw r;
  }
  n.isDirectory() ? Tn(e, t, r) : t.unlinkSync(e);
}
function Sn(e, t, r, n) {
  J(e), J(t), J(typeof n == "function"), t.rmdir(e, (i) => {
    i && (i.code === "ENOTEMPTY" || i.code === "EEXIST" || i.code === "EPERM") ? Ld(e, t, n) : i && i.code === "ENOTDIR" ? n(r) : n(i);
  });
}
function Ld(e, t, r) {
  J(e), J(t), J(typeof r == "function"), t.readdir(e, (n, i) => {
    if (n) return r(n);
    let o = i.length, a;
    if (o === 0) return t.rmdir(e, r);
    i.forEach((s) => {
      wo(Il.join(e, s), t, (l) => {
        if (!a) {
          if (l) return r(a = l);
          --o === 0 && t.rmdir(e, r);
        }
      });
    });
  });
}
function Pl(e, t) {
  let r;
  t = t || {}, Rl(t), J(e, "rimraf: missing path"), J.strictEqual(typeof e, "string", "rimraf: path should be a string"), J(t, "rimraf: missing options"), J.strictEqual(typeof t, "object", "rimraf: options should be object");
  try {
    r = t.lstatSync(e);
  } catch (n) {
    if (n.code === "ENOENT")
      return;
    n.code === "EPERM" && br && ya(e, t, n);
  }
  try {
    r && r.isDirectory() ? Tn(e, t, null) : t.unlinkSync(e);
  } catch (n) {
    if (n.code === "ENOENT")
      return;
    if (n.code === "EPERM")
      return br ? ya(e, t, n) : Tn(e, t, n);
    if (n.code !== "EISDIR")
      throw n;
    Tn(e, t, n);
  }
}
function Tn(e, t, r) {
  J(e), J(t);
  try {
    t.rmdirSync(e);
  } catch (n) {
    if (n.code === "ENOTDIR")
      throw r;
    if (n.code === "ENOTEMPTY" || n.code === "EEXIST" || n.code === "EPERM")
      Ud(e, t);
    else if (n.code !== "ENOENT")
      throw n;
  }
}
function Ud(e, t) {
  if (J(e), J(t), t.readdirSync(e).forEach((r) => Pl(Il.join(e, r), t)), br) {
    const r = Date.now();
    do
      try {
        return t.rmdirSync(e, t);
      } catch {
      }
    while (Date.now() - r < 500);
  } else
    return t.rmdirSync(e, t);
}
var kd = wo;
wo.sync = Pl;
const In = be, Md = $e.fromCallback, Nl = kd;
function Bd(e, t) {
  if (In.rm) return In.rm(e, { recursive: !0, force: !0 }, t);
  Nl(e, t);
}
function jd(e) {
  if (In.rmSync) return In.rmSync(e, { recursive: !0, force: !0 });
  Nl.sync(e);
}
var Gn = {
  remove: Md(Bd),
  removeSync: jd
};
const Hd = $e.fromPromise, Dl = Dt, Fl = ne, xl = Ye, Ll = Gn, va = Hd(async function(t) {
  let r;
  try {
    r = await Dl.readdir(t);
  } catch {
    return xl.mkdirs(t);
  }
  return Promise.all(r.map((n) => Ll.remove(Fl.join(t, n))));
});
function wa(e) {
  let t;
  try {
    t = Dl.readdirSync(e);
  } catch {
    return xl.mkdirsSync(e);
  }
  t.forEach((r) => {
    r = Fl.join(e, r), Ll.removeSync(r);
  });
}
var qd = {
  emptyDirSync: wa,
  emptydirSync: wa,
  emptyDir: va,
  emptydir: va
};
const Gd = $e.fromCallback, Ul = ne, st = be, kl = Ye;
function Vd(e, t) {
  function r() {
    st.writeFile(e, "", (n) => {
      if (n) return t(n);
      t();
    });
  }
  st.stat(e, (n, i) => {
    if (!n && i.isFile()) return t();
    const o = Ul.dirname(e);
    st.stat(o, (a, s) => {
      if (a)
        return a.code === "ENOENT" ? kl.mkdirs(o, (l) => {
          if (l) return t(l);
          r();
        }) : t(a);
      s.isDirectory() ? r() : st.readdir(o, (l) => {
        if (l) return t(l);
      });
    });
  });
}
function Wd(e) {
  let t;
  try {
    t = st.statSync(e);
  } catch {
  }
  if (t && t.isFile()) return;
  const r = Ul.dirname(e);
  try {
    st.statSync(r).isDirectory() || st.readdirSync(r);
  } catch (n) {
    if (n && n.code === "ENOENT") kl.mkdirsSync(r);
    else throw n;
  }
  st.writeFileSync(e, "");
}
var Yd = {
  createFile: Gd(Vd),
  createFileSync: Wd
};
const zd = $e.fromCallback, Ml = ne, at = be, Bl = Ye, Xd = Ft.pathExists, { areIdentical: jl } = nr;
function Kd(e, t, r) {
  function n(i, o) {
    at.link(i, o, (a) => {
      if (a) return r(a);
      r(null);
    });
  }
  at.lstat(t, (i, o) => {
    at.lstat(e, (a, s) => {
      if (a)
        return a.message = a.message.replace("lstat", "ensureLink"), r(a);
      if (o && jl(s, o)) return r(null);
      const l = Ml.dirname(t);
      Xd(l, (m, c) => {
        if (m) return r(m);
        if (c) return n(e, t);
        Bl.mkdirs(l, (f) => {
          if (f) return r(f);
          n(e, t);
        });
      });
    });
  });
}
function Jd(e, t) {
  let r;
  try {
    r = at.lstatSync(t);
  } catch {
  }
  try {
    const o = at.lstatSync(e);
    if (r && jl(o, r)) return;
  } catch (o) {
    throw o.message = o.message.replace("lstat", "ensureLink"), o;
  }
  const n = Ml.dirname(t);
  return at.existsSync(n) || Bl.mkdirsSync(n), at.linkSync(e, t);
}
var Qd = {
  createLink: zd(Kd),
  createLinkSync: Jd
};
const lt = ne, vr = be, Zd = Ft.pathExists;
function eh(e, t, r) {
  if (lt.isAbsolute(e))
    return vr.lstat(e, (n) => n ? (n.message = n.message.replace("lstat", "ensureSymlink"), r(n)) : r(null, {
      toCwd: e,
      toDst: e
    }));
  {
    const n = lt.dirname(t), i = lt.join(n, e);
    return Zd(i, (o, a) => o ? r(o) : a ? r(null, {
      toCwd: i,
      toDst: e
    }) : vr.lstat(e, (s) => s ? (s.message = s.message.replace("lstat", "ensureSymlink"), r(s)) : r(null, {
      toCwd: e,
      toDst: lt.relative(n, e)
    })));
  }
}
function th(e, t) {
  let r;
  if (lt.isAbsolute(e)) {
    if (r = vr.existsSync(e), !r) throw new Error("absolute srcpath does not exist");
    return {
      toCwd: e,
      toDst: e
    };
  } else {
    const n = lt.dirname(t), i = lt.join(n, e);
    if (r = vr.existsSync(i), r)
      return {
        toCwd: i,
        toDst: e
      };
    if (r = vr.existsSync(e), !r) throw new Error("relative srcpath does not exist");
    return {
      toCwd: e,
      toDst: lt.relative(n, e)
    };
  }
}
var rh = {
  symlinkPaths: eh,
  symlinkPathsSync: th
};
const Hl = be;
function nh(e, t, r) {
  if (r = typeof t == "function" ? t : r, t = typeof t == "function" ? !1 : t, t) return r(null, t);
  Hl.lstat(e, (n, i) => {
    if (n) return r(null, "file");
    t = i && i.isDirectory() ? "dir" : "file", r(null, t);
  });
}
function ih(e, t) {
  let r;
  if (t) return t;
  try {
    r = Hl.lstatSync(e);
  } catch {
    return "file";
  }
  return r && r.isDirectory() ? "dir" : "file";
}
var oh = {
  symlinkType: nh,
  symlinkTypeSync: ih
};
const ah = $e.fromCallback, ql = ne, Me = Dt, Gl = Ye, sh = Gl.mkdirs, lh = Gl.mkdirsSync, Vl = rh, ch = Vl.symlinkPaths, uh = Vl.symlinkPathsSync, Wl = oh, fh = Wl.symlinkType, dh = Wl.symlinkTypeSync, hh = Ft.pathExists, { areIdentical: Yl } = nr;
function ph(e, t, r, n) {
  n = typeof r == "function" ? r : n, r = typeof r == "function" ? !1 : r, Me.lstat(t, (i, o) => {
    !i && o.isSymbolicLink() ? Promise.all([
      Me.stat(e),
      Me.stat(t)
    ]).then(([a, s]) => {
      if (Yl(a, s)) return n(null);
      _a(e, t, r, n);
    }) : _a(e, t, r, n);
  });
}
function _a(e, t, r, n) {
  ch(e, t, (i, o) => {
    if (i) return n(i);
    e = o.toDst, fh(o.toCwd, r, (a, s) => {
      if (a) return n(a);
      const l = ql.dirname(t);
      hh(l, (m, c) => {
        if (m) return n(m);
        if (c) return Me.symlink(e, t, s, n);
        sh(l, (f) => {
          if (f) return n(f);
          Me.symlink(e, t, s, n);
        });
      });
    });
  });
}
function mh(e, t, r) {
  let n;
  try {
    n = Me.lstatSync(t);
  } catch {
  }
  if (n && n.isSymbolicLink()) {
    const s = Me.statSync(e), l = Me.statSync(t);
    if (Yl(s, l)) return;
  }
  const i = uh(e, t);
  e = i.toDst, r = dh(i.toCwd, r);
  const o = ql.dirname(t);
  return Me.existsSync(o) || lh(o), Me.symlinkSync(e, t, r);
}
var gh = {
  createSymlink: ah(ph),
  createSymlinkSync: mh
};
const { createFile: Aa, createFileSync: Sa } = Yd, { createLink: Ta, createLinkSync: Ca } = Qd, { createSymlink: $a, createSymlinkSync: ba } = gh;
var Eh = {
  // file
  createFile: Aa,
  createFileSync: Sa,
  ensureFile: Aa,
  ensureFileSync: Sa,
  // link
  createLink: Ta,
  createLinkSync: Ca,
  ensureLink: Ta,
  ensureLinkSync: Ca,
  // symlink
  createSymlink: $a,
  createSymlinkSync: ba,
  ensureSymlink: $a,
  ensureSymlinkSync: ba
};
function yh(e, { EOL: t = `
`, finalEOL: r = !0, replacer: n = null, spaces: i } = {}) {
  const o = r ? t : "";
  return JSON.stringify(e, n, i).replace(/\n/g, t) + o;
}
function vh(e) {
  return Buffer.isBuffer(e) && (e = e.toString("utf8")), e.replace(/^\uFEFF/, "");
}
var _o = { stringify: yh, stripBom: vh };
let Zt;
try {
  Zt = be;
} catch {
  Zt = gt;
}
const Vn = $e, { stringify: zl, stripBom: Xl } = _o;
async function wh(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const r = t.fs || Zt, n = "throws" in t ? t.throws : !0;
  let i = await Vn.fromCallback(r.readFile)(e, t);
  i = Xl(i);
  let o;
  try {
    o = JSON.parse(i, t ? t.reviver : null);
  } catch (a) {
    if (n)
      throw a.message = `${e}: ${a.message}`, a;
    return null;
  }
  return o;
}
const _h = Vn.fromPromise(wh);
function Ah(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const r = t.fs || Zt, n = "throws" in t ? t.throws : !0;
  try {
    let i = r.readFileSync(e, t);
    return i = Xl(i), JSON.parse(i, t.reviver);
  } catch (i) {
    if (n)
      throw i.message = `${e}: ${i.message}`, i;
    return null;
  }
}
async function Sh(e, t, r = {}) {
  const n = r.fs || Zt, i = zl(t, r);
  await Vn.fromCallback(n.writeFile)(e, i, r);
}
const Th = Vn.fromPromise(Sh);
function Ch(e, t, r = {}) {
  const n = r.fs || Zt, i = zl(t, r);
  return n.writeFileSync(e, i, r);
}
const $h = {
  readFile: _h,
  readFileSync: Ah,
  writeFile: Th,
  writeFileSync: Ch
};
var bh = $h;
const cn = bh;
var Oh = {
  // jsonfile exports
  readJson: cn.readFile,
  readJsonSync: cn.readFileSync,
  writeJson: cn.writeFile,
  writeJsonSync: cn.writeFileSync
};
const Ih = $e.fromCallback, wr = be, Kl = ne, Jl = Ye, Rh = Ft.pathExists;
function Ph(e, t, r, n) {
  typeof r == "function" && (n = r, r = "utf8");
  const i = Kl.dirname(e);
  Rh(i, (o, a) => {
    if (o) return n(o);
    if (a) return wr.writeFile(e, t, r, n);
    Jl.mkdirs(i, (s) => {
      if (s) return n(s);
      wr.writeFile(e, t, r, n);
    });
  });
}
function Nh(e, ...t) {
  const r = Kl.dirname(e);
  if (wr.existsSync(r))
    return wr.writeFileSync(e, ...t);
  Jl.mkdirsSync(r), wr.writeFileSync(e, ...t);
}
var Ao = {
  outputFile: Ih(Ph),
  outputFileSync: Nh
};
const { stringify: Dh } = _o, { outputFile: Fh } = Ao;
async function xh(e, t, r = {}) {
  const n = Dh(t, r);
  await Fh(e, n, r);
}
var Lh = xh;
const { stringify: Uh } = _o, { outputFileSync: kh } = Ao;
function Mh(e, t, r) {
  const n = Uh(t, r);
  kh(e, n, r);
}
var Bh = Mh;
const jh = $e.fromPromise, Ce = Oh;
Ce.outputJson = jh(Lh);
Ce.outputJsonSync = Bh;
Ce.outputJSON = Ce.outputJson;
Ce.outputJSONSync = Ce.outputJsonSync;
Ce.writeJSON = Ce.writeJson;
Ce.writeJSONSync = Ce.writeJsonSync;
Ce.readJSON = Ce.readJson;
Ce.readJSONSync = Ce.readJsonSync;
var Hh = Ce;
const qh = be, zi = ne, Gh = vo.copy, Ql = Gn.remove, Vh = Ye.mkdirp, Wh = Ft.pathExists, Oa = nr;
function Yh(e, t, r, n) {
  typeof r == "function" && (n = r, r = {}), r = r || {};
  const i = r.overwrite || r.clobber || !1;
  Oa.checkPaths(e, t, "move", r, (o, a) => {
    if (o) return n(o);
    const { srcStat: s, isChangingCase: l = !1 } = a;
    Oa.checkParentPaths(e, s, t, "move", (m) => {
      if (m) return n(m);
      if (zh(t)) return Ia(e, t, i, l, n);
      Vh(zi.dirname(t), (c) => c ? n(c) : Ia(e, t, i, l, n));
    });
  });
}
function zh(e) {
  const t = zi.dirname(e);
  return zi.parse(t).root === t;
}
function Ia(e, t, r, n, i) {
  if (n) return wi(e, t, r, i);
  if (r)
    return Ql(t, (o) => o ? i(o) : wi(e, t, r, i));
  Wh(t, (o, a) => o ? i(o) : a ? i(new Error("dest already exists.")) : wi(e, t, r, i));
}
function wi(e, t, r, n) {
  qh.rename(e, t, (i) => i ? i.code !== "EXDEV" ? n(i) : Xh(e, t, r, n) : n());
}
function Xh(e, t, r, n) {
  Gh(e, t, {
    overwrite: r,
    errorOnExist: !0
  }, (o) => o ? n(o) : Ql(e, n));
}
var Kh = Yh;
const Zl = be, Xi = ne, Jh = vo.copySync, ec = Gn.removeSync, Qh = Ye.mkdirpSync, Ra = nr;
function Zh(e, t, r) {
  r = r || {};
  const n = r.overwrite || r.clobber || !1, { srcStat: i, isChangingCase: o = !1 } = Ra.checkPathsSync(e, t, "move", r);
  return Ra.checkParentPathsSync(e, i, t, "move"), ep(t) || Qh(Xi.dirname(t)), tp(e, t, n, o);
}
function ep(e) {
  const t = Xi.dirname(e);
  return Xi.parse(t).root === t;
}
function tp(e, t, r, n) {
  if (n) return _i(e, t, r);
  if (r)
    return ec(t), _i(e, t, r);
  if (Zl.existsSync(t)) throw new Error("dest already exists.");
  return _i(e, t, r);
}
function _i(e, t, r) {
  try {
    Zl.renameSync(e, t);
  } catch (n) {
    if (n.code !== "EXDEV") throw n;
    return rp(e, t, r);
  }
}
function rp(e, t, r) {
  return Jh(e, t, {
    overwrite: r,
    errorOnExist: !0
  }), ec(e);
}
var np = Zh;
const ip = $e.fromCallback;
var op = {
  move: ip(Kh),
  moveSync: np
}, Et = {
  // Export promiseified graceful-fs:
  ...Dt,
  // Export extra methods:
  ...vo,
  ...qd,
  ...Eh,
  ...Hh,
  ...Ye,
  ...op,
  ...Ao,
  ...Ft,
  ...Gn
}, Ze = {}, ft = {}, he = {}, dt = {};
Object.defineProperty(dt, "__esModule", { value: !0 });
dt.CancellationError = dt.CancellationToken = void 0;
const ap = ul;
class sp extends ap.EventEmitter {
  get cancelled() {
    return this._cancelled || this._parent != null && this._parent.cancelled;
  }
  set parent(t) {
    this.removeParentCancelHandler(), this._parent = t, this.parentCancelHandler = () => this.cancel(), this._parent.onCancel(this.parentCancelHandler);
  }
  // babel cannot compile ... correctly for super calls
  constructor(t) {
    super(), this.parentCancelHandler = null, this._parent = null, this._cancelled = !1, t != null && (this.parent = t);
  }
  cancel() {
    this._cancelled = !0, this.emit("cancel");
  }
  onCancel(t) {
    this.cancelled ? t() : this.once("cancel", t);
  }
  createPromise(t) {
    if (this.cancelled)
      return Promise.reject(new Ki());
    const r = () => {
      if (n != null)
        try {
          this.removeListener("cancel", n), n = null;
        } catch {
        }
    };
    let n = null;
    return new Promise((i, o) => {
      let a = null;
      if (n = () => {
        try {
          a != null && (a(), a = null);
        } finally {
          o(new Ki());
        }
      }, this.cancelled) {
        n();
        return;
      }
      this.onCancel(n), t(i, o, (s) => {
        a = s;
      });
    }).then((i) => (r(), i)).catch((i) => {
      throw r(), i;
    });
  }
  removeParentCancelHandler() {
    const t = this._parent;
    t != null && this.parentCancelHandler != null && (t.removeListener("cancel", this.parentCancelHandler), this.parentCancelHandler = null);
  }
  dispose() {
    try {
      this.removeParentCancelHandler();
    } finally {
      this.removeAllListeners(), this._parent = null;
    }
  }
}
dt.CancellationToken = sp;
class Ki extends Error {
  constructor() {
    super("cancelled");
  }
}
dt.CancellationError = Ki;
var ir = {};
Object.defineProperty(ir, "__esModule", { value: !0 });
ir.newError = lp;
function lp(e, t) {
  const r = new Error(e);
  return r.code = t, r;
}
var Te = {}, Ji = { exports: {} }, un = { exports: {} }, Ai, Pa;
function cp() {
  if (Pa) return Ai;
  Pa = 1;
  var e = 1e3, t = e * 60, r = t * 60, n = r * 24, i = n * 7, o = n * 365.25;
  Ai = function(c, f) {
    f = f || {};
    var h = typeof c;
    if (h === "string" && c.length > 0)
      return a(c);
    if (h === "number" && isFinite(c))
      return f.long ? l(c) : s(c);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(c)
    );
  };
  function a(c) {
    if (c = String(c), !(c.length > 100)) {
      var f = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        c
      );
      if (f) {
        var h = parseFloat(f[1]), g = (f[2] || "ms").toLowerCase();
        switch (g) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return h * o;
          case "weeks":
          case "week":
          case "w":
            return h * i;
          case "days":
          case "day":
          case "d":
            return h * n;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return h * r;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return h * t;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return h * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return h;
          default:
            return;
        }
      }
    }
  }
  function s(c) {
    var f = Math.abs(c);
    return f >= n ? Math.round(c / n) + "d" : f >= r ? Math.round(c / r) + "h" : f >= t ? Math.round(c / t) + "m" : f >= e ? Math.round(c / e) + "s" : c + "ms";
  }
  function l(c) {
    var f = Math.abs(c);
    return f >= n ? m(c, f, n, "day") : f >= r ? m(c, f, r, "hour") : f >= t ? m(c, f, t, "minute") : f >= e ? m(c, f, e, "second") : c + " ms";
  }
  function m(c, f, h, g) {
    var _ = f >= h * 1.5;
    return Math.round(c / h) + " " + g + (_ ? "s" : "");
  }
  return Ai;
}
var Si, Na;
function tc() {
  if (Na) return Si;
  Na = 1;
  function e(t) {
    n.debug = n, n.default = n, n.coerce = m, n.disable = s, n.enable = o, n.enabled = l, n.humanize = cp(), n.destroy = c, Object.keys(t).forEach((f) => {
      n[f] = t[f];
    }), n.names = [], n.skips = [], n.formatters = {};
    function r(f) {
      let h = 0;
      for (let g = 0; g < f.length; g++)
        h = (h << 5) - h + f.charCodeAt(g), h |= 0;
      return n.colors[Math.abs(h) % n.colors.length];
    }
    n.selectColor = r;
    function n(f) {
      let h, g = null, _, y;
      function A(...T) {
        if (!A.enabled)
          return;
        const S = A, D = Number(/* @__PURE__ */ new Date()), x = D - (h || D);
        S.diff = x, S.prev = h, S.curr = D, h = D, T[0] = n.coerce(T[0]), typeof T[0] != "string" && T.unshift("%O");
        let Z = 0;
        T[0] = T[0].replace(/%([a-zA-Z%])/g, (Y, Ne) => {
          if (Y === "%%")
            return "%";
          Z++;
          const E = n.formatters[Ne];
          if (typeof E == "function") {
            const G = T[Z];
            Y = E.call(S, G), T.splice(Z, 1), Z--;
          }
          return Y;
        }), n.formatArgs.call(S, T), (S.log || n.log).apply(S, T);
      }
      return A.namespace = f, A.useColors = n.useColors(), A.color = n.selectColor(f), A.extend = i, A.destroy = n.destroy, Object.defineProperty(A, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => g !== null ? g : (_ !== n.namespaces && (_ = n.namespaces, y = n.enabled(f)), y),
        set: (T) => {
          g = T;
        }
      }), typeof n.init == "function" && n.init(A), A;
    }
    function i(f, h) {
      const g = n(this.namespace + (typeof h > "u" ? ":" : h) + f);
      return g.log = this.log, g;
    }
    function o(f) {
      n.save(f), n.namespaces = f, n.names = [], n.skips = [];
      const h = (typeof f == "string" ? f : "").trim().replace(" ", ",").split(",").filter(Boolean);
      for (const g of h)
        g[0] === "-" ? n.skips.push(g.slice(1)) : n.names.push(g);
    }
    function a(f, h) {
      let g = 0, _ = 0, y = -1, A = 0;
      for (; g < f.length; )
        if (_ < h.length && (h[_] === f[g] || h[_] === "*"))
          h[_] === "*" ? (y = _, A = g, _++) : (g++, _++);
        else if (y !== -1)
          _ = y + 1, A++, g = A;
        else
          return !1;
      for (; _ < h.length && h[_] === "*"; )
        _++;
      return _ === h.length;
    }
    function s() {
      const f = [
        ...n.names,
        ...n.skips.map((h) => "-" + h)
      ].join(",");
      return n.enable(""), f;
    }
    function l(f) {
      for (const h of n.skips)
        if (a(f, h))
          return !1;
      for (const h of n.names)
        if (a(f, h))
          return !0;
      return !1;
    }
    function m(f) {
      return f instanceof Error ? f.stack || f.message : f;
    }
    function c() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return n.enable(n.load()), n;
  }
  return Si = e, Si;
}
var Da;
function up() {
  return Da || (Da = 1, function(e, t) {
    t.formatArgs = n, t.save = i, t.load = o, t.useColors = r, t.storage = a(), t.destroy = /* @__PURE__ */ (() => {
      let l = !1;
      return () => {
        l || (l = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })(), t.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function r() {
      if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
        return !0;
      if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
        return !1;
      let l;
      return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && (l = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(l[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function n(l) {
      if (l[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + l[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors)
        return;
      const m = "color: " + this.color;
      l.splice(1, 0, m, "color: inherit");
      let c = 0, f = 0;
      l[0].replace(/%[a-zA-Z%]/g, (h) => {
        h !== "%%" && (c++, h === "%c" && (f = c));
      }), l.splice(f, 0, m);
    }
    t.log = console.debug || console.log || (() => {
    });
    function i(l) {
      try {
        l ? t.storage.setItem("debug", l) : t.storage.removeItem("debug");
      } catch {
      }
    }
    function o() {
      let l;
      try {
        l = t.storage.getItem("debug");
      } catch {
      }
      return !l && typeof process < "u" && "env" in process && (l = process.env.DEBUG), l;
    }
    function a() {
      try {
        return localStorage;
      } catch {
      }
    }
    e.exports = tc()(t);
    const { formatters: s } = e.exports;
    s.j = function(l) {
      try {
        return JSON.stringify(l);
      } catch (m) {
        return "[UnexpectedJSONParseError]: " + m.message;
      }
    };
  }(un, un.exports)), un.exports;
}
var fn = { exports: {} }, Ti, Fa;
function fp() {
  return Fa || (Fa = 1, Ti = (e, t = process.argv) => {
    const r = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", n = t.indexOf(r + e), i = t.indexOf("--");
    return n !== -1 && (i === -1 || n < i);
  }), Ti;
}
var Ci, xa;
function dp() {
  if (xa) return Ci;
  xa = 1;
  const e = jn, t = fl, r = fp(), { env: n } = process;
  let i;
  r("no-color") || r("no-colors") || r("color=false") || r("color=never") ? i = 0 : (r("color") || r("colors") || r("color=true") || r("color=always")) && (i = 1), "FORCE_COLOR" in n && (n.FORCE_COLOR === "true" ? i = 1 : n.FORCE_COLOR === "false" ? i = 0 : i = n.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(n.FORCE_COLOR, 10), 3));
  function o(l) {
    return l === 0 ? !1 : {
      level: l,
      hasBasic: !0,
      has256: l >= 2,
      has16m: l >= 3
    };
  }
  function a(l, m) {
    if (i === 0)
      return 0;
    if (r("color=16m") || r("color=full") || r("color=truecolor"))
      return 3;
    if (r("color=256"))
      return 2;
    if (l && !m && i === void 0)
      return 0;
    const c = i || 0;
    if (n.TERM === "dumb")
      return c;
    if (process.platform === "win32") {
      const f = e.release().split(".");
      return Number(f[0]) >= 10 && Number(f[2]) >= 10586 ? Number(f[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in n)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((f) => f in n) || n.CI_NAME === "codeship" ? 1 : c;
    if ("TEAMCITY_VERSION" in n)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(n.TEAMCITY_VERSION) ? 1 : 0;
    if (n.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in n) {
      const f = parseInt((n.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (n.TERM_PROGRAM) {
        case "iTerm.app":
          return f >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(n.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(n.TERM) || "COLORTERM" in n ? 1 : c;
  }
  function s(l) {
    const m = a(l, l && l.isTTY);
    return o(m);
  }
  return Ci = {
    supportsColor: s,
    stdout: o(a(!0, t.isatty(1))),
    stderr: o(a(!0, t.isatty(2)))
  }, Ci;
}
var La;
function hp() {
  return La || (La = 1, function(e, t) {
    const r = fl, n = ho;
    t.init = c, t.log = s, t.formatArgs = o, t.save = l, t.load = m, t.useColors = i, t.destroy = n.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), t.colors = [6, 2, 3, 4, 5, 1];
    try {
      const h = dp();
      h && (h.stderr || h).level >= 2 && (t.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
      ]);
    } catch {
    }
    t.inspectOpts = Object.keys(process.env).filter((h) => /^debug_/i.test(h)).reduce((h, g) => {
      const _ = g.substring(6).toLowerCase().replace(/_([a-z])/g, (A, T) => T.toUpperCase());
      let y = process.env[g];
      return /^(yes|on|true|enabled)$/i.test(y) ? y = !0 : /^(no|off|false|disabled)$/i.test(y) ? y = !1 : y === "null" ? y = null : y = Number(y), h[_] = y, h;
    }, {});
    function i() {
      return "colors" in t.inspectOpts ? !!t.inspectOpts.colors : r.isatty(process.stderr.fd);
    }
    function o(h) {
      const { namespace: g, useColors: _ } = this;
      if (_) {
        const y = this.color, A = "\x1B[3" + (y < 8 ? y : "8;5;" + y), T = `  ${A};1m${g} \x1B[0m`;
        h[0] = T + h[0].split(`
`).join(`
` + T), h.push(A + "m+" + e.exports.humanize(this.diff) + "\x1B[0m");
      } else
        h[0] = a() + g + " " + h[0];
    }
    function a() {
      return t.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function s(...h) {
      return process.stderr.write(n.formatWithOptions(t.inspectOpts, ...h) + `
`);
    }
    function l(h) {
      h ? process.env.DEBUG = h : delete process.env.DEBUG;
    }
    function m() {
      return process.env.DEBUG;
    }
    function c(h) {
      h.inspectOpts = {};
      const g = Object.keys(t.inspectOpts);
      for (let _ = 0; _ < g.length; _++)
        h.inspectOpts[g[_]] = t.inspectOpts[g[_]];
    }
    e.exports = tc()(t);
    const { formatters: f } = e.exports;
    f.o = function(h) {
      return this.inspectOpts.colors = this.useColors, n.inspect(h, this.inspectOpts).split(`
`).map((g) => g.trim()).join(" ");
    }, f.O = function(h) {
      return this.inspectOpts.colors = this.useColors, n.inspect(h, this.inspectOpts);
    };
  }(fn, fn.exports)), fn.exports;
}
typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? Ji.exports = up() : Ji.exports = hp();
var pp = Ji.exports, jr = {};
Object.defineProperty(jr, "__esModule", { value: !0 });
jr.ProgressCallbackTransform = void 0;
const mp = kr;
class gp extends mp.Transform {
  constructor(t, r, n) {
    super(), this.total = t, this.cancellationToken = r, this.onProgress = n, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.nextUpdate = this.start + 1e3;
  }
  _transform(t, r, n) {
    if (this.cancellationToken.cancelled) {
      n(new Error("cancelled"), null);
      return;
    }
    this.transferred += t.length, this.delta += t.length;
    const i = Date.now();
    i >= this.nextUpdate && this.transferred !== this.total && (this.nextUpdate = i + 1e3, this.onProgress({
      total: this.total,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.total * 100,
      bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
    }), this.delta = 0), n(null, t);
  }
  _flush(t) {
    if (this.cancellationToken.cancelled) {
      t(new Error("cancelled"));
      return;
    }
    this.onProgress({
      total: this.total,
      delta: this.delta,
      transferred: this.total,
      percent: 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    }), this.delta = 0, t(null);
  }
}
jr.ProgressCallbackTransform = gp;
Object.defineProperty(Te, "__esModule", { value: !0 });
Te.DigestTransform = Te.HttpExecutor = Te.HttpError = void 0;
Te.createHttpError = Qi;
Te.parseJson = Tp;
Te.configureRequestOptionsFromUrl = nc;
Te.configureRequestUrl = To;
Te.safeGetHeader = Jt;
Te.configureRequestOptions = Pn;
Te.safeStringifyJson = Nn;
const Ep = Mr, yp = pp, vp = gt, wp = kr, rc = rr, _p = dt, Ua = ir, Ap = jr, dr = (0, yp.default)("electron-builder");
function Qi(e, t = null) {
  return new So(e.statusCode || -1, `${e.statusCode} ${e.statusMessage}` + (t == null ? "" : `
` + JSON.stringify(t, null, "  ")) + `
Headers: ` + Nn(e.headers), t);
}
const Sp = /* @__PURE__ */ new Map([
  [429, "Too many requests"],
  [400, "Bad request"],
  [403, "Forbidden"],
  [404, "Not found"],
  [405, "Method not allowed"],
  [406, "Not acceptable"],
  [408, "Request timeout"],
  [413, "Request entity too large"],
  [500, "Internal server error"],
  [502, "Bad gateway"],
  [503, "Service unavailable"],
  [504, "Gateway timeout"],
  [505, "HTTP version not supported"]
]);
class So extends Error {
  constructor(t, r = `HTTP error: ${Sp.get(t) || t}`, n = null) {
    super(r), this.statusCode = t, this.description = n, this.name = "HttpError", this.code = `HTTP_ERROR_${t}`;
  }
  isServerError() {
    return this.statusCode >= 500 && this.statusCode <= 599;
  }
}
Te.HttpError = So;
function Tp(e) {
  return e.then((t) => t == null || t.length === 0 ? null : JSON.parse(t));
}
class Rn {
  constructor() {
    this.maxRedirects = 10;
  }
  request(t, r = new _p.CancellationToken(), n) {
    Pn(t);
    const i = n == null ? void 0 : JSON.stringify(n), o = i ? Buffer.from(i) : void 0;
    if (o != null) {
      dr(i);
      const { headers: a, ...s } = t;
      t = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": o.length,
          ...a
        },
        ...s
      };
    }
    return this.doApiRequest(t, r, (a) => a.end(o));
  }
  doApiRequest(t, r, n, i = 0) {
    return dr.enabled && dr(`Request: ${Nn(t)}`), r.createPromise((o, a, s) => {
      const l = this.createRequest(t, (m) => {
        try {
          this.handleResponse(m, t, r, o, a, i, n);
        } catch (c) {
          a(c);
        }
      });
      this.addErrorAndTimeoutHandlers(l, a, t.timeout), this.addRedirectHandlers(l, t, a, i, (m) => {
        this.doApiRequest(m, r, n, i).then(o).catch(a);
      }), n(l, a), s(() => l.abort());
    });
  }
  // noinspection JSUnusedLocalSymbols
  // eslint-disable-next-line
  addRedirectHandlers(t, r, n, i, o) {
  }
  addErrorAndTimeoutHandlers(t, r, n = 60 * 1e3) {
    this.addTimeOutHandler(t, r, n), t.on("error", r), t.on("aborted", () => {
      r(new Error("Request has been aborted by the server"));
    });
  }
  handleResponse(t, r, n, i, o, a, s) {
    var l;
    if (dr.enabled && dr(`Response: ${t.statusCode} ${t.statusMessage}, request options: ${Nn(r)}`), t.statusCode === 404) {
      o(Qi(t, `method: ${r.method || "GET"} url: ${r.protocol || "https:"}//${r.hostname}${r.port ? `:${r.port}` : ""}${r.path}

Please double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.
`));
      return;
    } else if (t.statusCode === 204) {
      i();
      return;
    }
    const m = (l = t.statusCode) !== null && l !== void 0 ? l : 0, c = m >= 300 && m < 400, f = Jt(t, "location");
    if (c && f != null) {
      if (a > this.maxRedirects) {
        o(this.createMaxRedirectError());
        return;
      }
      this.doApiRequest(Rn.prepareRedirectUrlOptions(f, r), n, s, a).then(i).catch(o);
      return;
    }
    t.setEncoding("utf8");
    let h = "";
    t.on("error", o), t.on("data", (g) => h += g), t.on("end", () => {
      try {
        if (t.statusCode != null && t.statusCode >= 400) {
          const g = Jt(t, "content-type"), _ = g != null && (Array.isArray(g) ? g.find((y) => y.includes("json")) != null : g.includes("json"));
          o(Qi(t, `method: ${r.method || "GET"} url: ${r.protocol || "https:"}//${r.hostname}${r.port ? `:${r.port}` : ""}${r.path}

          Data:
          ${_ ? JSON.stringify(JSON.parse(h)) : h}
          `));
        } else
          i(h.length === 0 ? null : h);
      } catch (g) {
        o(g);
      }
    });
  }
  async downloadToBuffer(t, r) {
    return await r.cancellationToken.createPromise((n, i, o) => {
      const a = [], s = {
        headers: r.headers || void 0,
        // because PrivateGitHubProvider requires HttpExecutor.prepareRedirectUrlOptions logic, so, we need to redirect manually
        redirect: "manual"
      };
      To(t, s), Pn(s), this.doDownload(s, {
        destination: null,
        options: r,
        onCancel: o,
        callback: (l) => {
          l == null ? n(Buffer.concat(a)) : i(l);
        },
        responseHandler: (l, m) => {
          let c = 0;
          l.on("data", (f) => {
            if (c += f.length, c > 524288e3) {
              m(new Error("Maximum allowed size is 500 MB"));
              return;
            }
            a.push(f);
          }), l.on("end", () => {
            m(null);
          });
        }
      }, 0);
    });
  }
  doDownload(t, r, n) {
    const i = this.createRequest(t, (o) => {
      if (o.statusCode >= 400) {
        r.callback(new Error(`Cannot download "${t.protocol || "https:"}//${t.hostname}${t.path}", status ${o.statusCode}: ${o.statusMessage}`));
        return;
      }
      o.on("error", r.callback);
      const a = Jt(o, "location");
      if (a != null) {
        n < this.maxRedirects ? this.doDownload(Rn.prepareRedirectUrlOptions(a, t), r, n++) : r.callback(this.createMaxRedirectError());
        return;
      }
      r.responseHandler == null ? $p(r, o) : r.responseHandler(o, r.callback);
    });
    this.addErrorAndTimeoutHandlers(i, r.callback, t.timeout), this.addRedirectHandlers(i, t, r.callback, n, (o) => {
      this.doDownload(o, r, n++);
    }), i.end();
  }
  createMaxRedirectError() {
    return new Error(`Too many redirects (> ${this.maxRedirects})`);
  }
  addTimeOutHandler(t, r, n) {
    t.on("socket", (i) => {
      i.setTimeout(n, () => {
        t.abort(), r(new Error("Request timed out"));
      });
    });
  }
  static prepareRedirectUrlOptions(t, r) {
    const n = nc(t, { ...r }), i = n.headers;
    if (i != null && i.authorization) {
      const o = new rc.URL(t);
      (o.hostname.endsWith(".amazonaws.com") || o.searchParams.has("X-Amz-Credential")) && delete i.authorization;
    }
    return n;
  }
  static retryOnServerError(t, r = 3) {
    for (let n = 0; ; n++)
      try {
        return t();
      } catch (i) {
        if (n < r && (i instanceof So && i.isServerError() || i.code === "EPIPE"))
          continue;
        throw i;
      }
  }
}
Te.HttpExecutor = Rn;
function nc(e, t) {
  const r = Pn(t);
  return To(new rc.URL(e), r), r;
}
function To(e, t) {
  t.protocol = e.protocol, t.hostname = e.hostname, e.port ? t.port = e.port : t.port && delete t.port, t.path = e.pathname + e.search;
}
class Zi extends wp.Transform {
  // noinspection JSUnusedGlobalSymbols
  get actual() {
    return this._actual;
  }
  constructor(t, r = "sha512", n = "base64") {
    super(), this.expected = t, this.algorithm = r, this.encoding = n, this._actual = null, this.isValidateOnEnd = !0, this.digester = (0, Ep.createHash)(r);
  }
  // noinspection JSUnusedGlobalSymbols
  _transform(t, r, n) {
    this.digester.update(t), n(null, t);
  }
  // noinspection JSUnusedGlobalSymbols
  _flush(t) {
    if (this._actual = this.digester.digest(this.encoding), this.isValidateOnEnd)
      try {
        this.validate();
      } catch (r) {
        t(r);
        return;
      }
    t(null);
  }
  validate() {
    if (this._actual == null)
      throw (0, Ua.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
    if (this._actual !== this.expected)
      throw (0, Ua.newError)(`${this.algorithm} checksum mismatch, expected ${this.expected}, got ${this._actual}`, "ERR_CHECKSUM_MISMATCH");
    return null;
  }
}
Te.DigestTransform = Zi;
function Cp(e, t, r) {
  return e != null && t != null && e !== t ? (r(new Error(`checksum mismatch: expected ${t} but got ${e} (X-Checksum-Sha2 header)`)), !1) : !0;
}
function Jt(e, t) {
  const r = e.headers[t];
  return r == null ? null : Array.isArray(r) ? r.length === 0 ? null : r[r.length - 1] : r;
}
function $p(e, t) {
  if (!Cp(Jt(t, "X-Checksum-Sha2"), e.options.sha2, e.callback))
    return;
  const r = [];
  if (e.options.onProgress != null) {
    const a = Jt(t, "content-length");
    a != null && r.push(new Ap.ProgressCallbackTransform(parseInt(a, 10), e.options.cancellationToken, e.options.onProgress));
  }
  const n = e.options.sha512;
  n != null ? r.push(new Zi(n, "sha512", n.length === 128 && !n.includes("+") && !n.includes("Z") && !n.includes("=") ? "hex" : "base64")) : e.options.sha2 != null && r.push(new Zi(e.options.sha2, "sha256", "hex"));
  const i = (0, vp.createWriteStream)(e.destination);
  r.push(i);
  let o = t;
  for (const a of r)
    a.on("error", (s) => {
      i.close(), e.options.cancellationToken.cancelled || e.callback(s);
    }), o = o.pipe(a);
  i.on("finish", () => {
    i.close(e.callback);
  });
}
function Pn(e, t, r) {
  r != null && (e.method = r), e.headers = { ...e.headers };
  const n = e.headers;
  return t != null && (n.authorization = t.startsWith("Basic") || t.startsWith("Bearer") ? t : `token ${t}`), n["User-Agent"] == null && (n["User-Agent"] = "electron-builder"), (r == null || r === "GET" || n["Cache-Control"] == null) && (n["Cache-Control"] = "no-cache"), e.protocol == null && process.versions.electron != null && (e.protocol = "https:"), e;
}
function Nn(e, t) {
  return JSON.stringify(e, (r, n) => r.endsWith("Authorization") || r.endsWith("authorization") || r.endsWith("Password") || r.endsWith("PASSWORD") || r.endsWith("Token") || r.includes("password") || r.includes("token") || t != null && t.has(r) ? "<stripped sensitive data>" : n, 2);
}
var Wn = {};
Object.defineProperty(Wn, "__esModule", { value: !0 });
Wn.MemoLazy = void 0;
class bp {
  constructor(t, r) {
    this.selector = t, this.creator = r, this.selected = void 0, this._value = void 0;
  }
  get hasValue() {
    return this._value !== void 0;
  }
  get value() {
    const t = this.selector();
    if (this._value !== void 0 && ic(this.selected, t))
      return this._value;
    this.selected = t;
    const r = this.creator(t);
    return this.value = r, r;
  }
  set value(t) {
    this._value = t;
  }
}
Wn.MemoLazy = bp;
function ic(e, t) {
  if (typeof e == "object" && e !== null && (typeof t == "object" && t !== null)) {
    const i = Object.keys(e), o = Object.keys(t);
    return i.length === o.length && i.every((a) => ic(e[a], t[a]));
  }
  return e === t;
}
var Yn = {};
Object.defineProperty(Yn, "__esModule", { value: !0 });
Yn.githubUrl = Op;
Yn.getS3LikeProviderBaseUrl = Ip;
function Op(e, t = "github.com") {
  return `${e.protocol || "https"}://${e.host || t}`;
}
function Ip(e) {
  const t = e.provider;
  if (t === "s3")
    return Rp(e);
  if (t === "spaces")
    return Pp(e);
  throw new Error(`Not supported provider: ${t}`);
}
function Rp(e) {
  let t;
  if (e.accelerate == !0)
    t = `https://${e.bucket}.s3-accelerate.amazonaws.com`;
  else if (e.endpoint != null)
    t = `${e.endpoint}/${e.bucket}`;
  else if (e.bucket.includes(".")) {
    if (e.region == null)
      throw new Error(`Bucket name "${e.bucket}" includes a dot, but S3 region is missing`);
    e.region === "us-east-1" ? t = `https://s3.amazonaws.com/${e.bucket}` : t = `https://s3-${e.region}.amazonaws.com/${e.bucket}`;
  } else e.region === "cn-north-1" ? t = `https://${e.bucket}.s3.${e.region}.amazonaws.com.cn` : t = `https://${e.bucket}.s3.amazonaws.com`;
  return oc(t, e.path);
}
function oc(e, t) {
  return t != null && t.length > 0 && (t.startsWith("/") || (e += "/"), e += t), e;
}
function Pp(e) {
  if (e.name == null)
    throw new Error("name is missing");
  if (e.region == null)
    throw new Error("region is missing");
  return oc(`https://${e.name}.${e.region}.digitaloceanspaces.com`, e.path);
}
var Co = {};
Object.defineProperty(Co, "__esModule", { value: !0 });
Co.retry = ac;
const Np = dt;
async function ac(e, t, r, n = 0, i = 0, o) {
  var a;
  const s = new Np.CancellationToken();
  try {
    return await e();
  } catch (l) {
    if ((!((a = o == null ? void 0 : o(l)) !== null && a !== void 0) || a) && t > 0 && !s.cancelled)
      return await new Promise((m) => setTimeout(m, r + n * i)), await ac(e, t - 1, r, n, i + 1, o);
    throw l;
  }
}
var $o = {};
Object.defineProperty($o, "__esModule", { value: !0 });
$o.parseDn = Dp;
function Dp(e) {
  let t = !1, r = null, n = "", i = 0;
  e = e.trim();
  const o = /* @__PURE__ */ new Map();
  for (let a = 0; a <= e.length; a++) {
    if (a === e.length) {
      r !== null && o.set(r, n);
      break;
    }
    const s = e[a];
    if (t) {
      if (s === '"') {
        t = !1;
        continue;
      }
    } else {
      if (s === '"') {
        t = !0;
        continue;
      }
      if (s === "\\") {
        a++;
        const l = parseInt(e.slice(a, a + 2), 16);
        Number.isNaN(l) ? n += e[a] : (a++, n += String.fromCharCode(l));
        continue;
      }
      if (r === null && s === "=") {
        r = n, n = "";
        continue;
      }
      if (s === "," || s === ";" || s === "+") {
        r !== null && o.set(r, n), r = null, n = "";
        continue;
      }
    }
    if (s === " " && !t) {
      if (n.length === 0)
        continue;
      if (a > i) {
        let l = a;
        for (; e[l] === " "; )
          l++;
        i = l;
      }
      if (i >= e.length || e[i] === "," || e[i] === ";" || r === null && e[i] === "=" || r !== null && e[i] === "+") {
        a = i - 1;
        continue;
      }
    }
    n += s;
  }
  return o;
}
var er = {};
Object.defineProperty(er, "__esModule", { value: !0 });
er.nil = er.UUID = void 0;
const sc = Mr, lc = ir, Fp = "options.name must be either a string or a Buffer", ka = (0, sc.randomBytes)(16);
ka[0] = ka[0] | 1;
const Cn = {}, W = [];
for (let e = 0; e < 256; e++) {
  const t = (e + 256).toString(16).substr(1);
  Cn[t] = e, W[e] = t;
}
class Nt {
  constructor(t) {
    this.ascii = null, this.binary = null;
    const r = Nt.check(t);
    if (!r)
      throw new Error("not a UUID");
    this.version = r.version, r.format === "ascii" ? this.ascii = t : this.binary = t;
  }
  static v5(t, r) {
    return xp(t, "sha1", 80, r);
  }
  toString() {
    return this.ascii == null && (this.ascii = Lp(this.binary)), this.ascii;
  }
  inspect() {
    return `UUID v${this.version} ${this.toString()}`;
  }
  static check(t, r = 0) {
    if (typeof t == "string")
      return t = t.toLowerCase(), /^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(t) ? t === "00000000-0000-0000-0000-000000000000" ? { version: void 0, variant: "nil", format: "ascii" } : {
        version: (Cn[t[14] + t[15]] & 240) >> 4,
        variant: Ma((Cn[t[19] + t[20]] & 224) >> 5),
        format: "ascii"
      } : !1;
    if (Buffer.isBuffer(t)) {
      if (t.length < r + 16)
        return !1;
      let n = 0;
      for (; n < 16 && t[r + n] === 0; n++)
        ;
      return n === 16 ? { version: void 0, variant: "nil", format: "binary" } : {
        version: (t[r + 6] & 240) >> 4,
        variant: Ma((t[r + 8] & 224) >> 5),
        format: "binary"
      };
    }
    throw (0, lc.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
  }
  // read stringified uuid into a Buffer
  static parse(t) {
    const r = Buffer.allocUnsafe(16);
    let n = 0;
    for (let i = 0; i < 16; i++)
      r[i] = Cn[t[n++] + t[n++]], (i === 3 || i === 5 || i === 7 || i === 9) && (n += 1);
    return r;
  }
}
er.UUID = Nt;
Nt.OID = Nt.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
function Ma(e) {
  switch (e) {
    case 0:
    case 1:
    case 3:
      return "ncs";
    case 4:
    case 5:
      return "rfc4122";
    case 6:
      return "microsoft";
    default:
      return "future";
  }
}
var _r;
(function(e) {
  e[e.ASCII = 0] = "ASCII", e[e.BINARY = 1] = "BINARY", e[e.OBJECT = 2] = "OBJECT";
})(_r || (_r = {}));
function xp(e, t, r, n, i = _r.ASCII) {
  const o = (0, sc.createHash)(t);
  if (typeof e != "string" && !Buffer.isBuffer(e))
    throw (0, lc.newError)(Fp, "ERR_INVALID_UUID_NAME");
  o.update(n), o.update(e);
  const s = o.digest();
  let l;
  switch (i) {
    case _r.BINARY:
      s[6] = s[6] & 15 | r, s[8] = s[8] & 63 | 128, l = s;
      break;
    case _r.OBJECT:
      s[6] = s[6] & 15 | r, s[8] = s[8] & 63 | 128, l = new Nt(s);
      break;
    default:
      l = W[s[0]] + W[s[1]] + W[s[2]] + W[s[3]] + "-" + W[s[4]] + W[s[5]] + "-" + W[s[6] & 15 | r] + W[s[7]] + "-" + W[s[8] & 63 | 128] + W[s[9]] + "-" + W[s[10]] + W[s[11]] + W[s[12]] + W[s[13]] + W[s[14]] + W[s[15]];
      break;
  }
  return l;
}
function Lp(e) {
  return W[e[0]] + W[e[1]] + W[e[2]] + W[e[3]] + "-" + W[e[4]] + W[e[5]] + "-" + W[e[6]] + W[e[7]] + "-" + W[e[8]] + W[e[9]] + "-" + W[e[10]] + W[e[11]] + W[e[12]] + W[e[13]] + W[e[14]] + W[e[15]];
}
er.nil = new Nt("00000000-0000-0000-0000-000000000000");
var Hr = {}, cc = {};
(function(e) {
  (function(t) {
    t.parser = function(d, u) {
      return new n(d, u);
    }, t.SAXParser = n, t.SAXStream = c, t.createStream = m, t.MAX_BUFFER_LENGTH = 64 * 1024;
    var r = [
      "comment",
      "sgmlDecl",
      "textNode",
      "tagName",
      "doctype",
      "procInstName",
      "procInstBody",
      "entity",
      "attribName",
      "attribValue",
      "cdata",
      "script"
    ];
    t.EVENTS = [
      "text",
      "processinginstruction",
      "sgmldeclaration",
      "doctype",
      "comment",
      "opentagstart",
      "attribute",
      "opentag",
      "closetag",
      "opencdata",
      "cdata",
      "closecdata",
      "error",
      "end",
      "ready",
      "script",
      "opennamespace",
      "closenamespace"
    ];
    function n(d, u) {
      if (!(this instanceof n))
        return new n(d, u);
      var C = this;
      o(C), C.q = C.c = "", C.bufferCheckPosition = t.MAX_BUFFER_LENGTH, C.opt = u || {}, C.opt.lowercase = C.opt.lowercase || C.opt.lowercasetags, C.looseCase = C.opt.lowercase ? "toLowerCase" : "toUpperCase", C.tags = [], C.closed = C.closedRoot = C.sawRoot = !1, C.tag = C.error = null, C.strict = !!d, C.noscript = !!(d || C.opt.noscript), C.state = E.BEGIN, C.strictEntities = C.opt.strictEntities, C.ENTITIES = C.strictEntities ? Object.create(t.XML_ENTITIES) : Object.create(t.ENTITIES), C.attribList = [], C.opt.xmlns && (C.ns = Object.create(y)), C.opt.unquotedAttributeValues === void 0 && (C.opt.unquotedAttributeValues = !d), C.trackPosition = C.opt.position !== !1, C.trackPosition && (C.position = C.line = C.column = 0), j(C, "onready");
    }
    Object.create || (Object.create = function(d) {
      function u() {
      }
      u.prototype = d;
      var C = new u();
      return C;
    }), Object.keys || (Object.keys = function(d) {
      var u = [];
      for (var C in d) d.hasOwnProperty(C) && u.push(C);
      return u;
    });
    function i(d) {
      for (var u = Math.max(t.MAX_BUFFER_LENGTH, 10), C = 0, w = 0, z = r.length; w < z; w++) {
        var ee = d[r[w]].length;
        if (ee > u)
          switch (r[w]) {
            case "textNode":
              X(d);
              break;
            case "cdata":
              M(d, "oncdata", d.cdata), d.cdata = "";
              break;
            case "script":
              M(d, "onscript", d.script), d.script = "";
              break;
            default:
              b(d, "Max buffer length exceeded: " + r[w]);
          }
        C = Math.max(C, ee);
      }
      var ie = t.MAX_BUFFER_LENGTH - C;
      d.bufferCheckPosition = ie + d.position;
    }
    function o(d) {
      for (var u = 0, C = r.length; u < C; u++)
        d[r[u]] = "";
    }
    function a(d) {
      X(d), d.cdata !== "" && (M(d, "oncdata", d.cdata), d.cdata = ""), d.script !== "" && (M(d, "onscript", d.script), d.script = "");
    }
    n.prototype = {
      end: function() {
        P(this);
      },
      write: qe,
      resume: function() {
        return this.error = null, this;
      },
      close: function() {
        return this.write(null);
      },
      flush: function() {
        a(this);
      }
    };
    var s;
    try {
      s = require("stream").Stream;
    } catch {
      s = function() {
      };
    }
    s || (s = function() {
    });
    var l = t.EVENTS.filter(function(d) {
      return d !== "error" && d !== "end";
    });
    function m(d, u) {
      return new c(d, u);
    }
    function c(d, u) {
      if (!(this instanceof c))
        return new c(d, u);
      s.apply(this), this._parser = new n(d, u), this.writable = !0, this.readable = !0;
      var C = this;
      this._parser.onend = function() {
        C.emit("end");
      }, this._parser.onerror = function(w) {
        C.emit("error", w), C._parser.error = null;
      }, this._decoder = null, l.forEach(function(w) {
        Object.defineProperty(C, "on" + w, {
          get: function() {
            return C._parser["on" + w];
          },
          set: function(z) {
            if (!z)
              return C.removeAllListeners(w), C._parser["on" + w] = z, z;
            C.on(w, z);
          },
          enumerable: !0,
          configurable: !1
        });
      });
    }
    c.prototype = Object.create(s.prototype, {
      constructor: {
        value: c
      }
    }), c.prototype.write = function(d) {
      if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(d)) {
        if (!this._decoder) {
          var u = bf.StringDecoder;
          this._decoder = new u("utf8");
        }
        d = this._decoder.write(d);
      }
      return this._parser.write(d.toString()), this.emit("data", d), !0;
    }, c.prototype.end = function(d) {
      return d && d.length && this.write(d), this._parser.end(), !0;
    }, c.prototype.on = function(d, u) {
      var C = this;
      return !C._parser["on" + d] && l.indexOf(d) !== -1 && (C._parser["on" + d] = function() {
        var w = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
        w.splice(0, 0, d), C.emit.apply(C, w);
      }), s.prototype.on.call(C, d, u);
    };
    var f = "[CDATA[", h = "DOCTYPE", g = "http://www.w3.org/XML/1998/namespace", _ = "http://www.w3.org/2000/xmlns/", y = { xml: g, xmlns: _ }, A = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, T = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, S = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, D = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
    function x(d) {
      return d === " " || d === `
` || d === "\r" || d === "	";
    }
    function Z(d) {
      return d === '"' || d === "'";
    }
    function ae(d) {
      return d === ">" || x(d);
    }
    function Y(d, u) {
      return d.test(u);
    }
    function Ne(d, u) {
      return !Y(d, u);
    }
    var E = 0;
    t.STATE = {
      BEGIN: E++,
      // leading byte order mark or whitespace
      BEGIN_WHITESPACE: E++,
      // leading whitespace
      TEXT: E++,
      // general stuff
      TEXT_ENTITY: E++,
      // &amp and such.
      OPEN_WAKA: E++,
      // <
      SGML_DECL: E++,
      // <!BLARG
      SGML_DECL_QUOTED: E++,
      // <!BLARG foo "bar
      DOCTYPE: E++,
      // <!DOCTYPE
      DOCTYPE_QUOTED: E++,
      // <!DOCTYPE "//blah
      DOCTYPE_DTD: E++,
      // <!DOCTYPE "//blah" [ ...
      DOCTYPE_DTD_QUOTED: E++,
      // <!DOCTYPE "//blah" [ "foo
      COMMENT_STARTING: E++,
      // <!-
      COMMENT: E++,
      // <!--
      COMMENT_ENDING: E++,
      // <!-- blah -
      COMMENT_ENDED: E++,
      // <!-- blah --
      CDATA: E++,
      // <![CDATA[ something
      CDATA_ENDING: E++,
      // ]
      CDATA_ENDING_2: E++,
      // ]]
      PROC_INST: E++,
      // <?hi
      PROC_INST_BODY: E++,
      // <?hi there
      PROC_INST_ENDING: E++,
      // <?hi "there" ?
      OPEN_TAG: E++,
      // <strong
      OPEN_TAG_SLASH: E++,
      // <strong /
      ATTRIB: E++,
      // <a
      ATTRIB_NAME: E++,
      // <a foo
      ATTRIB_NAME_SAW_WHITE: E++,
      // <a foo _
      ATTRIB_VALUE: E++,
      // <a foo=
      ATTRIB_VALUE_QUOTED: E++,
      // <a foo="bar
      ATTRIB_VALUE_CLOSED: E++,
      // <a foo="bar"
      ATTRIB_VALUE_UNQUOTED: E++,
      // <a foo=bar
      ATTRIB_VALUE_ENTITY_Q: E++,
      // <foo bar="&quot;"
      ATTRIB_VALUE_ENTITY_U: E++,
      // <foo bar=&quot
      CLOSE_TAG: E++,
      // </a
      CLOSE_TAG_SAW_WHITE: E++,
      // </a   >
      SCRIPT: E++,
      // <script> ...
      SCRIPT_ENDING: E++
      // <script> ... <
    }, t.XML_ENTITIES = {
      amp: "&",
      gt: ">",
      lt: "<",
      quot: '"',
      apos: "'"
    }, t.ENTITIES = {
      amp: "&",
      gt: ">",
      lt: "<",
      quot: '"',
      apos: "'",
      AElig: 198,
      Aacute: 193,
      Acirc: 194,
      Agrave: 192,
      Aring: 197,
      Atilde: 195,
      Auml: 196,
      Ccedil: 199,
      ETH: 208,
      Eacute: 201,
      Ecirc: 202,
      Egrave: 200,
      Euml: 203,
      Iacute: 205,
      Icirc: 206,
      Igrave: 204,
      Iuml: 207,
      Ntilde: 209,
      Oacute: 211,
      Ocirc: 212,
      Ograve: 210,
      Oslash: 216,
      Otilde: 213,
      Ouml: 214,
      THORN: 222,
      Uacute: 218,
      Ucirc: 219,
      Ugrave: 217,
      Uuml: 220,
      Yacute: 221,
      aacute: 225,
      acirc: 226,
      aelig: 230,
      agrave: 224,
      aring: 229,
      atilde: 227,
      auml: 228,
      ccedil: 231,
      eacute: 233,
      ecirc: 234,
      egrave: 232,
      eth: 240,
      euml: 235,
      iacute: 237,
      icirc: 238,
      igrave: 236,
      iuml: 239,
      ntilde: 241,
      oacute: 243,
      ocirc: 244,
      ograve: 242,
      oslash: 248,
      otilde: 245,
      ouml: 246,
      szlig: 223,
      thorn: 254,
      uacute: 250,
      ucirc: 251,
      ugrave: 249,
      uuml: 252,
      yacute: 253,
      yuml: 255,
      copy: 169,
      reg: 174,
      nbsp: 160,
      iexcl: 161,
      cent: 162,
      pound: 163,
      curren: 164,
      yen: 165,
      brvbar: 166,
      sect: 167,
      uml: 168,
      ordf: 170,
      laquo: 171,
      not: 172,
      shy: 173,
      macr: 175,
      deg: 176,
      plusmn: 177,
      sup1: 185,
      sup2: 178,
      sup3: 179,
      acute: 180,
      micro: 181,
      para: 182,
      middot: 183,
      cedil: 184,
      ordm: 186,
      raquo: 187,
      frac14: 188,
      frac12: 189,
      frac34: 190,
      iquest: 191,
      times: 215,
      divide: 247,
      OElig: 338,
      oelig: 339,
      Scaron: 352,
      scaron: 353,
      Yuml: 376,
      fnof: 402,
      circ: 710,
      tilde: 732,
      Alpha: 913,
      Beta: 914,
      Gamma: 915,
      Delta: 916,
      Epsilon: 917,
      Zeta: 918,
      Eta: 919,
      Theta: 920,
      Iota: 921,
      Kappa: 922,
      Lambda: 923,
      Mu: 924,
      Nu: 925,
      Xi: 926,
      Omicron: 927,
      Pi: 928,
      Rho: 929,
      Sigma: 931,
      Tau: 932,
      Upsilon: 933,
      Phi: 934,
      Chi: 935,
      Psi: 936,
      Omega: 937,
      alpha: 945,
      beta: 946,
      gamma: 947,
      delta: 948,
      epsilon: 949,
      zeta: 950,
      eta: 951,
      theta: 952,
      iota: 953,
      kappa: 954,
      lambda: 955,
      mu: 956,
      nu: 957,
      xi: 958,
      omicron: 959,
      pi: 960,
      rho: 961,
      sigmaf: 962,
      sigma: 963,
      tau: 964,
      upsilon: 965,
      phi: 966,
      chi: 967,
      psi: 968,
      omega: 969,
      thetasym: 977,
      upsih: 978,
      piv: 982,
      ensp: 8194,
      emsp: 8195,
      thinsp: 8201,
      zwnj: 8204,
      zwj: 8205,
      lrm: 8206,
      rlm: 8207,
      ndash: 8211,
      mdash: 8212,
      lsquo: 8216,
      rsquo: 8217,
      sbquo: 8218,
      ldquo: 8220,
      rdquo: 8221,
      bdquo: 8222,
      dagger: 8224,
      Dagger: 8225,
      bull: 8226,
      hellip: 8230,
      permil: 8240,
      prime: 8242,
      Prime: 8243,
      lsaquo: 8249,
      rsaquo: 8250,
      oline: 8254,
      frasl: 8260,
      euro: 8364,
      image: 8465,
      weierp: 8472,
      real: 8476,
      trade: 8482,
      alefsym: 8501,
      larr: 8592,
      uarr: 8593,
      rarr: 8594,
      darr: 8595,
      harr: 8596,
      crarr: 8629,
      lArr: 8656,
      uArr: 8657,
      rArr: 8658,
      dArr: 8659,
      hArr: 8660,
      forall: 8704,
      part: 8706,
      exist: 8707,
      empty: 8709,
      nabla: 8711,
      isin: 8712,
      notin: 8713,
      ni: 8715,
      prod: 8719,
      sum: 8721,
      minus: 8722,
      lowast: 8727,
      radic: 8730,
      prop: 8733,
      infin: 8734,
      ang: 8736,
      and: 8743,
      or: 8744,
      cap: 8745,
      cup: 8746,
      int: 8747,
      there4: 8756,
      sim: 8764,
      cong: 8773,
      asymp: 8776,
      ne: 8800,
      equiv: 8801,
      le: 8804,
      ge: 8805,
      sub: 8834,
      sup: 8835,
      nsub: 8836,
      sube: 8838,
      supe: 8839,
      oplus: 8853,
      otimes: 8855,
      perp: 8869,
      sdot: 8901,
      lceil: 8968,
      rceil: 8969,
      lfloor: 8970,
      rfloor: 8971,
      lang: 9001,
      rang: 9002,
      loz: 9674,
      spades: 9824,
      clubs: 9827,
      hearts: 9829,
      diams: 9830
    }, Object.keys(t.ENTITIES).forEach(function(d) {
      var u = t.ENTITIES[d], C = typeof u == "number" ? String.fromCharCode(u) : u;
      t.ENTITIES[d] = C;
    });
    for (var G in t.STATE)
      t.STATE[t.STATE[G]] = G;
    E = t.STATE;
    function j(d, u, C) {
      d[u] && d[u](C);
    }
    function M(d, u, C) {
      d.textNode && X(d), j(d, u, C);
    }
    function X(d) {
      d.textNode = I(d.opt, d.textNode), d.textNode && j(d, "ontext", d.textNode), d.textNode = "";
    }
    function I(d, u) {
      return d.trim && (u = u.trim()), d.normalize && (u = u.replace(/\s+/g, " ")), u;
    }
    function b(d, u) {
      return X(d), d.trackPosition && (u += `
Line: ` + d.line + `
Column: ` + d.column + `
Char: ` + d.c), u = new Error(u), d.error = u, j(d, "onerror", u), d;
    }
    function P(d) {
      return d.sawRoot && !d.closedRoot && $(d, "Unclosed root tag"), d.state !== E.BEGIN && d.state !== E.BEGIN_WHITESPACE && d.state !== E.TEXT && b(d, "Unexpected end"), X(d), d.c = "", d.closed = !0, j(d, "onend"), n.call(d, d.strict, d.opt), d;
    }
    function $(d, u) {
      if (typeof d != "object" || !(d instanceof n))
        throw new Error("bad call to strictFail");
      d.strict && b(d, u);
    }
    function N(d) {
      d.strict || (d.tagName = d.tagName[d.looseCase]());
      var u = d.tags[d.tags.length - 1] || d, C = d.tag = { name: d.tagName, attributes: {} };
      d.opt.xmlns && (C.ns = u.ns), d.attribList.length = 0, M(d, "onopentagstart", C);
    }
    function R(d, u) {
      var C = d.indexOf(":"), w = C < 0 ? ["", d] : d.split(":"), z = w[0], ee = w[1];
      return u && d === "xmlns" && (z = "xmlns", ee = ""), { prefix: z, local: ee };
    }
    function k(d) {
      if (d.strict || (d.attribName = d.attribName[d.looseCase]()), d.attribList.indexOf(d.attribName) !== -1 || d.tag.attributes.hasOwnProperty(d.attribName)) {
        d.attribName = d.attribValue = "";
        return;
      }
      if (d.opt.xmlns) {
        var u = R(d.attribName, !0), C = u.prefix, w = u.local;
        if (C === "xmlns")
          if (w === "xml" && d.attribValue !== g)
            $(
              d,
              "xml: prefix must be bound to " + g + `
Actual: ` + d.attribValue
            );
          else if (w === "xmlns" && d.attribValue !== _)
            $(
              d,
              "xmlns: prefix must be bound to " + _ + `
Actual: ` + d.attribValue
            );
          else {
            var z = d.tag, ee = d.tags[d.tags.length - 1] || d;
            z.ns === ee.ns && (z.ns = Object.create(ee.ns)), z.ns[w] = d.attribValue;
          }
        d.attribList.push([d.attribName, d.attribValue]);
      } else
        d.tag.attributes[d.attribName] = d.attribValue, M(d, "onattribute", {
          name: d.attribName,
          value: d.attribValue
        });
      d.attribName = d.attribValue = "";
    }
    function V(d, u) {
      if (d.opt.xmlns) {
        var C = d.tag, w = R(d.tagName);
        C.prefix = w.prefix, C.local = w.local, C.uri = C.ns[w.prefix] || "", C.prefix && !C.uri && ($(d, "Unbound namespace prefix: " + JSON.stringify(d.tagName)), C.uri = w.prefix);
        var z = d.tags[d.tags.length - 1] || d;
        C.ns && z.ns !== C.ns && Object.keys(C.ns).forEach(function(Jr) {
          M(d, "onopennamespace", {
            prefix: Jr,
            uri: C.ns[Jr]
          });
        });
        for (var ee = 0, ie = d.attribList.length; ee < ie; ee++) {
          var pe = d.attribList[ee], ye = pe[0], et = pe[1], le = R(ye, !0), Ue = le.prefix, ui = le.local, Kr = Ue === "" ? "" : C.ns[Ue] || "", sr = {
            name: ye,
            value: et,
            prefix: Ue,
            local: ui,
            uri: Kr
          };
          Ue && Ue !== "xmlns" && !Kr && ($(d, "Unbound namespace prefix: " + JSON.stringify(Ue)), sr.uri = Ue), d.tag.attributes[ye] = sr, M(d, "onattribute", sr);
        }
        d.attribList.length = 0;
      }
      d.tag.isSelfClosing = !!u, d.sawRoot = !0, d.tags.push(d.tag), M(d, "onopentag", d.tag), u || (!d.noscript && d.tagName.toLowerCase() === "script" ? d.state = E.SCRIPT : d.state = E.TEXT, d.tag = null, d.tagName = ""), d.attribName = d.attribValue = "", d.attribList.length = 0;
    }
    function H(d) {
      if (!d.tagName) {
        $(d, "Weird empty close tag."), d.textNode += "</>", d.state = E.TEXT;
        return;
      }
      if (d.script) {
        if (d.tagName !== "script") {
          d.script += "</" + d.tagName + ">", d.tagName = "", d.state = E.SCRIPT;
          return;
        }
        M(d, "onscript", d.script), d.script = "";
      }
      var u = d.tags.length, C = d.tagName;
      d.strict || (C = C[d.looseCase]());
      for (var w = C; u--; ) {
        var z = d.tags[u];
        if (z.name !== w)
          $(d, "Unexpected close tag");
        else
          break;
      }
      if (u < 0) {
        $(d, "Unmatched closing tag: " + d.tagName), d.textNode += "</" + d.tagName + ">", d.state = E.TEXT;
        return;
      }
      d.tagName = C;
      for (var ee = d.tags.length; ee-- > u; ) {
        var ie = d.tag = d.tags.pop();
        d.tagName = d.tag.name, M(d, "onclosetag", d.tagName);
        var pe = {};
        for (var ye in ie.ns)
          pe[ye] = ie.ns[ye];
        var et = d.tags[d.tags.length - 1] || d;
        d.opt.xmlns && ie.ns !== et.ns && Object.keys(ie.ns).forEach(function(le) {
          var Ue = ie.ns[le];
          M(d, "onclosenamespace", { prefix: le, uri: Ue });
        });
      }
      u === 0 && (d.closedRoot = !0), d.tagName = d.attribValue = d.attribName = "", d.attribList.length = 0, d.state = E.TEXT;
    }
    function K(d) {
      var u = d.entity, C = u.toLowerCase(), w, z = "";
      return d.ENTITIES[u] ? d.ENTITIES[u] : d.ENTITIES[C] ? d.ENTITIES[C] : (u = C, u.charAt(0) === "#" && (u.charAt(1) === "x" ? (u = u.slice(2), w = parseInt(u, 16), z = w.toString(16)) : (u = u.slice(1), w = parseInt(u, 10), z = w.toString(10))), u = u.replace(/^0+/, ""), isNaN(w) || z.toLowerCase() !== u ? ($(d, "Invalid character entity"), "&" + d.entity + ";") : String.fromCodePoint(w));
    }
    function ue(d, u) {
      u === "<" ? (d.state = E.OPEN_WAKA, d.startTagPosition = d.position) : x(u) || ($(d, "Non-whitespace before first tag."), d.textNode = u, d.state = E.TEXT);
    }
    function U(d, u) {
      var C = "";
      return u < d.length && (C = d.charAt(u)), C;
    }
    function qe(d) {
      var u = this;
      if (this.error)
        throw this.error;
      if (u.closed)
        return b(
          u,
          "Cannot write after close. Assign an onready handler."
        );
      if (d === null)
        return P(u);
      typeof d == "object" && (d = d.toString());
      for (var C = 0, w = ""; w = U(d, C++), u.c = w, !!w; )
        switch (u.trackPosition && (u.position++, w === `
` ? (u.line++, u.column = 0) : u.column++), u.state) {
          case E.BEGIN:
            if (u.state = E.BEGIN_WHITESPACE, w === "\uFEFF")
              continue;
            ue(u, w);
            continue;
          case E.BEGIN_WHITESPACE:
            ue(u, w);
            continue;
          case E.TEXT:
            if (u.sawRoot && !u.closedRoot) {
              for (var z = C - 1; w && w !== "<" && w !== "&"; )
                w = U(d, C++), w && u.trackPosition && (u.position++, w === `
` ? (u.line++, u.column = 0) : u.column++);
              u.textNode += d.substring(z, C - 1);
            }
            w === "<" && !(u.sawRoot && u.closedRoot && !u.strict) ? (u.state = E.OPEN_WAKA, u.startTagPosition = u.position) : (!x(w) && (!u.sawRoot || u.closedRoot) && $(u, "Text data outside of root node."), w === "&" ? u.state = E.TEXT_ENTITY : u.textNode += w);
            continue;
          case E.SCRIPT:
            w === "<" ? u.state = E.SCRIPT_ENDING : u.script += w;
            continue;
          case E.SCRIPT_ENDING:
            w === "/" ? u.state = E.CLOSE_TAG : (u.script += "<" + w, u.state = E.SCRIPT);
            continue;
          case E.OPEN_WAKA:
            if (w === "!")
              u.state = E.SGML_DECL, u.sgmlDecl = "";
            else if (!x(w)) if (Y(A, w))
              u.state = E.OPEN_TAG, u.tagName = w;
            else if (w === "/")
              u.state = E.CLOSE_TAG, u.tagName = "";
            else if (w === "?")
              u.state = E.PROC_INST, u.procInstName = u.procInstBody = "";
            else {
              if ($(u, "Unencoded <"), u.startTagPosition + 1 < u.position) {
                var ee = u.position - u.startTagPosition;
                w = new Array(ee).join(" ") + w;
              }
              u.textNode += "<" + w, u.state = E.TEXT;
            }
            continue;
          case E.SGML_DECL:
            if (u.sgmlDecl + w === "--") {
              u.state = E.COMMENT, u.comment = "", u.sgmlDecl = "";
              continue;
            }
            u.doctype && u.doctype !== !0 && u.sgmlDecl ? (u.state = E.DOCTYPE_DTD, u.doctype += "<!" + u.sgmlDecl + w, u.sgmlDecl = "") : (u.sgmlDecl + w).toUpperCase() === f ? (M(u, "onopencdata"), u.state = E.CDATA, u.sgmlDecl = "", u.cdata = "") : (u.sgmlDecl + w).toUpperCase() === h ? (u.state = E.DOCTYPE, (u.doctype || u.sawRoot) && $(
              u,
              "Inappropriately located doctype declaration"
            ), u.doctype = "", u.sgmlDecl = "") : w === ">" ? (M(u, "onsgmldeclaration", u.sgmlDecl), u.sgmlDecl = "", u.state = E.TEXT) : (Z(w) && (u.state = E.SGML_DECL_QUOTED), u.sgmlDecl += w);
            continue;
          case E.SGML_DECL_QUOTED:
            w === u.q && (u.state = E.SGML_DECL, u.q = ""), u.sgmlDecl += w;
            continue;
          case E.DOCTYPE:
            w === ">" ? (u.state = E.TEXT, M(u, "ondoctype", u.doctype), u.doctype = !0) : (u.doctype += w, w === "[" ? u.state = E.DOCTYPE_DTD : Z(w) && (u.state = E.DOCTYPE_QUOTED, u.q = w));
            continue;
          case E.DOCTYPE_QUOTED:
            u.doctype += w, w === u.q && (u.q = "", u.state = E.DOCTYPE);
            continue;
          case E.DOCTYPE_DTD:
            w === "]" ? (u.doctype += w, u.state = E.DOCTYPE) : w === "<" ? (u.state = E.OPEN_WAKA, u.startTagPosition = u.position) : Z(w) ? (u.doctype += w, u.state = E.DOCTYPE_DTD_QUOTED, u.q = w) : u.doctype += w;
            continue;
          case E.DOCTYPE_DTD_QUOTED:
            u.doctype += w, w === u.q && (u.state = E.DOCTYPE_DTD, u.q = "");
            continue;
          case E.COMMENT:
            w === "-" ? u.state = E.COMMENT_ENDING : u.comment += w;
            continue;
          case E.COMMENT_ENDING:
            w === "-" ? (u.state = E.COMMENT_ENDED, u.comment = I(u.opt, u.comment), u.comment && M(u, "oncomment", u.comment), u.comment = "") : (u.comment += "-" + w, u.state = E.COMMENT);
            continue;
          case E.COMMENT_ENDED:
            w !== ">" ? ($(u, "Malformed comment"), u.comment += "--" + w, u.state = E.COMMENT) : u.doctype && u.doctype !== !0 ? u.state = E.DOCTYPE_DTD : u.state = E.TEXT;
            continue;
          case E.CDATA:
            w === "]" ? u.state = E.CDATA_ENDING : u.cdata += w;
            continue;
          case E.CDATA_ENDING:
            w === "]" ? u.state = E.CDATA_ENDING_2 : (u.cdata += "]" + w, u.state = E.CDATA);
            continue;
          case E.CDATA_ENDING_2:
            w === ">" ? (u.cdata && M(u, "oncdata", u.cdata), M(u, "onclosecdata"), u.cdata = "", u.state = E.TEXT) : w === "]" ? u.cdata += "]" : (u.cdata += "]]" + w, u.state = E.CDATA);
            continue;
          case E.PROC_INST:
            w === "?" ? u.state = E.PROC_INST_ENDING : x(w) ? u.state = E.PROC_INST_BODY : u.procInstName += w;
            continue;
          case E.PROC_INST_BODY:
            if (!u.procInstBody && x(w))
              continue;
            w === "?" ? u.state = E.PROC_INST_ENDING : u.procInstBody += w;
            continue;
          case E.PROC_INST_ENDING:
            w === ">" ? (M(u, "onprocessinginstruction", {
              name: u.procInstName,
              body: u.procInstBody
            }), u.procInstName = u.procInstBody = "", u.state = E.TEXT) : (u.procInstBody += "?" + w, u.state = E.PROC_INST_BODY);
            continue;
          case E.OPEN_TAG:
            Y(T, w) ? u.tagName += w : (N(u), w === ">" ? V(u) : w === "/" ? u.state = E.OPEN_TAG_SLASH : (x(w) || $(u, "Invalid character in tag name"), u.state = E.ATTRIB));
            continue;
          case E.OPEN_TAG_SLASH:
            w === ">" ? (V(u, !0), H(u)) : ($(u, "Forward-slash in opening tag not followed by >"), u.state = E.ATTRIB);
            continue;
          case E.ATTRIB:
            if (x(w))
              continue;
            w === ">" ? V(u) : w === "/" ? u.state = E.OPEN_TAG_SLASH : Y(A, w) ? (u.attribName = w, u.attribValue = "", u.state = E.ATTRIB_NAME) : $(u, "Invalid attribute name");
            continue;
          case E.ATTRIB_NAME:
            w === "=" ? u.state = E.ATTRIB_VALUE : w === ">" ? ($(u, "Attribute without value"), u.attribValue = u.attribName, k(u), V(u)) : x(w) ? u.state = E.ATTRIB_NAME_SAW_WHITE : Y(T, w) ? u.attribName += w : $(u, "Invalid attribute name");
            continue;
          case E.ATTRIB_NAME_SAW_WHITE:
            if (w === "=")
              u.state = E.ATTRIB_VALUE;
            else {
              if (x(w))
                continue;
              $(u, "Attribute without value"), u.tag.attributes[u.attribName] = "", u.attribValue = "", M(u, "onattribute", {
                name: u.attribName,
                value: ""
              }), u.attribName = "", w === ">" ? V(u) : Y(A, w) ? (u.attribName = w, u.state = E.ATTRIB_NAME) : ($(u, "Invalid attribute name"), u.state = E.ATTRIB);
            }
            continue;
          case E.ATTRIB_VALUE:
            if (x(w))
              continue;
            Z(w) ? (u.q = w, u.state = E.ATTRIB_VALUE_QUOTED) : (u.opt.unquotedAttributeValues || b(u, "Unquoted attribute value"), u.state = E.ATTRIB_VALUE_UNQUOTED, u.attribValue = w);
            continue;
          case E.ATTRIB_VALUE_QUOTED:
            if (w !== u.q) {
              w === "&" ? u.state = E.ATTRIB_VALUE_ENTITY_Q : u.attribValue += w;
              continue;
            }
            k(u), u.q = "", u.state = E.ATTRIB_VALUE_CLOSED;
            continue;
          case E.ATTRIB_VALUE_CLOSED:
            x(w) ? u.state = E.ATTRIB : w === ">" ? V(u) : w === "/" ? u.state = E.OPEN_TAG_SLASH : Y(A, w) ? ($(u, "No whitespace between attributes"), u.attribName = w, u.attribValue = "", u.state = E.ATTRIB_NAME) : $(u, "Invalid attribute name");
            continue;
          case E.ATTRIB_VALUE_UNQUOTED:
            if (!ae(w)) {
              w === "&" ? u.state = E.ATTRIB_VALUE_ENTITY_U : u.attribValue += w;
              continue;
            }
            k(u), w === ">" ? V(u) : u.state = E.ATTRIB;
            continue;
          case E.CLOSE_TAG:
            if (u.tagName)
              w === ">" ? H(u) : Y(T, w) ? u.tagName += w : u.script ? (u.script += "</" + u.tagName, u.tagName = "", u.state = E.SCRIPT) : (x(w) || $(u, "Invalid tagname in closing tag"), u.state = E.CLOSE_TAG_SAW_WHITE);
            else {
              if (x(w))
                continue;
              Ne(A, w) ? u.script ? (u.script += "</" + w, u.state = E.SCRIPT) : $(u, "Invalid tagname in closing tag.") : u.tagName = w;
            }
            continue;
          case E.CLOSE_TAG_SAW_WHITE:
            if (x(w))
              continue;
            w === ">" ? H(u) : $(u, "Invalid characters in closing tag");
            continue;
          case E.TEXT_ENTITY:
          case E.ATTRIB_VALUE_ENTITY_Q:
          case E.ATTRIB_VALUE_ENTITY_U:
            var ie, pe;
            switch (u.state) {
              case E.TEXT_ENTITY:
                ie = E.TEXT, pe = "textNode";
                break;
              case E.ATTRIB_VALUE_ENTITY_Q:
                ie = E.ATTRIB_VALUE_QUOTED, pe = "attribValue";
                break;
              case E.ATTRIB_VALUE_ENTITY_U:
                ie = E.ATTRIB_VALUE_UNQUOTED, pe = "attribValue";
                break;
            }
            if (w === ";") {
              var ye = K(u);
              u.opt.unparsedEntities && !Object.values(t.XML_ENTITIES).includes(ye) ? (u.entity = "", u.state = ie, u.write(ye)) : (u[pe] += ye, u.entity = "", u.state = ie);
            } else Y(u.entity.length ? D : S, w) ? u.entity += w : ($(u, "Invalid character in entity name"), u[pe] += "&" + u.entity + w, u.entity = "", u.state = ie);
            continue;
          default:
            throw new Error(u, "Unknown state: " + u.state);
        }
      return u.position >= u.bufferCheckPosition && i(u), u;
    }
    /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
    String.fromCodePoint || function() {
      var d = String.fromCharCode, u = Math.floor, C = function() {
        var w = 16384, z = [], ee, ie, pe = -1, ye = arguments.length;
        if (!ye)
          return "";
        for (var et = ""; ++pe < ye; ) {
          var le = Number(arguments[pe]);
          if (!isFinite(le) || // `NaN`, `+Infinity`, or `-Infinity`
          le < 0 || // not a valid Unicode code point
          le > 1114111 || // not a valid Unicode code point
          u(le) !== le)
            throw RangeError("Invalid code point: " + le);
          le <= 65535 ? z.push(le) : (le -= 65536, ee = (le >> 10) + 55296, ie = le % 1024 + 56320, z.push(ee, ie)), (pe + 1 === ye || z.length > w) && (et += d.apply(null, z), z.length = 0);
        }
        return et;
      };
      Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
        value: C,
        configurable: !0,
        writable: !0
      }) : String.fromCodePoint = C;
    }();
  })(e);
})(cc);
Object.defineProperty(Hr, "__esModule", { value: !0 });
Hr.XElement = void 0;
Hr.parseXml = Bp;
const Up = cc, dn = ir;
class uc {
  constructor(t) {
    if (this.name = t, this.value = "", this.attributes = null, this.isCData = !1, this.elements = null, !t)
      throw (0, dn.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
    if (!Mp(t))
      throw (0, dn.newError)(`Invalid element name: ${t}`, "ERR_XML_ELEMENT_INVALID_NAME");
  }
  attribute(t) {
    const r = this.attributes === null ? null : this.attributes[t];
    if (r == null)
      throw (0, dn.newError)(`No attribute "${t}"`, "ERR_XML_MISSED_ATTRIBUTE");
    return r;
  }
  removeAttribute(t) {
    this.attributes !== null && delete this.attributes[t];
  }
  element(t, r = !1, n = null) {
    const i = this.elementOrNull(t, r);
    if (i === null)
      throw (0, dn.newError)(n || `No element "${t}"`, "ERR_XML_MISSED_ELEMENT");
    return i;
  }
  elementOrNull(t, r = !1) {
    if (this.elements === null)
      return null;
    for (const n of this.elements)
      if (Ba(n, t, r))
        return n;
    return null;
  }
  getElements(t, r = !1) {
    return this.elements === null ? [] : this.elements.filter((n) => Ba(n, t, r));
  }
  elementValueOrEmpty(t, r = !1) {
    const n = this.elementOrNull(t, r);
    return n === null ? "" : n.value;
  }
}
Hr.XElement = uc;
const kp = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
function Mp(e) {
  return kp.test(e);
}
function Ba(e, t, r) {
  const n = e.name;
  return n === t || r === !0 && n.length === t.length && n.toLowerCase() === t.toLowerCase();
}
function Bp(e) {
  let t = null;
  const r = Up.parser(!0, {}), n = [];
  return r.onopentag = (i) => {
    const o = new uc(i.name);
    if (o.attributes = i.attributes, t === null)
      t = o;
    else {
      const a = n[n.length - 1];
      a.elements == null && (a.elements = []), a.elements.push(o);
    }
    n.push(o);
  }, r.onclosetag = () => {
    n.pop();
  }, r.ontext = (i) => {
    n.length > 0 && (n[n.length - 1].value = i);
  }, r.oncdata = (i) => {
    const o = n[n.length - 1];
    o.value = i, o.isCData = !0;
  }, r.onerror = (i) => {
    throw i;
  }, r.write(e), t;
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CURRENT_APP_PACKAGE_FILE_NAME = e.CURRENT_APP_INSTALLER_FILE_NAME = e.XElement = e.parseXml = e.UUID = e.parseDn = e.retry = e.githubUrl = e.getS3LikeProviderBaseUrl = e.ProgressCallbackTransform = e.MemoLazy = e.safeStringifyJson = e.safeGetHeader = e.parseJson = e.HttpExecutor = e.HttpError = e.DigestTransform = e.createHttpError = e.configureRequestUrl = e.configureRequestOptionsFromUrl = e.configureRequestOptions = e.newError = e.CancellationToken = e.CancellationError = void 0, e.asArray = f;
  var t = dt;
  Object.defineProperty(e, "CancellationError", { enumerable: !0, get: function() {
    return t.CancellationError;
  } }), Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
    return t.CancellationToken;
  } });
  var r = ir;
  Object.defineProperty(e, "newError", { enumerable: !0, get: function() {
    return r.newError;
  } });
  var n = Te;
  Object.defineProperty(e, "configureRequestOptions", { enumerable: !0, get: function() {
    return n.configureRequestOptions;
  } }), Object.defineProperty(e, "configureRequestOptionsFromUrl", { enumerable: !0, get: function() {
    return n.configureRequestOptionsFromUrl;
  } }), Object.defineProperty(e, "configureRequestUrl", { enumerable: !0, get: function() {
    return n.configureRequestUrl;
  } }), Object.defineProperty(e, "createHttpError", { enumerable: !0, get: function() {
    return n.createHttpError;
  } }), Object.defineProperty(e, "DigestTransform", { enumerable: !0, get: function() {
    return n.DigestTransform;
  } }), Object.defineProperty(e, "HttpError", { enumerable: !0, get: function() {
    return n.HttpError;
  } }), Object.defineProperty(e, "HttpExecutor", { enumerable: !0, get: function() {
    return n.HttpExecutor;
  } }), Object.defineProperty(e, "parseJson", { enumerable: !0, get: function() {
    return n.parseJson;
  } }), Object.defineProperty(e, "safeGetHeader", { enumerable: !0, get: function() {
    return n.safeGetHeader;
  } }), Object.defineProperty(e, "safeStringifyJson", { enumerable: !0, get: function() {
    return n.safeStringifyJson;
  } });
  var i = Wn;
  Object.defineProperty(e, "MemoLazy", { enumerable: !0, get: function() {
    return i.MemoLazy;
  } });
  var o = jr;
  Object.defineProperty(e, "ProgressCallbackTransform", { enumerable: !0, get: function() {
    return o.ProgressCallbackTransform;
  } });
  var a = Yn;
  Object.defineProperty(e, "getS3LikeProviderBaseUrl", { enumerable: !0, get: function() {
    return a.getS3LikeProviderBaseUrl;
  } }), Object.defineProperty(e, "githubUrl", { enumerable: !0, get: function() {
    return a.githubUrl;
  } });
  var s = Co;
  Object.defineProperty(e, "retry", { enumerable: !0, get: function() {
    return s.retry;
  } });
  var l = $o;
  Object.defineProperty(e, "parseDn", { enumerable: !0, get: function() {
    return l.parseDn;
  } });
  var m = er;
  Object.defineProperty(e, "UUID", { enumerable: !0, get: function() {
    return m.UUID;
  } });
  var c = Hr;
  Object.defineProperty(e, "parseXml", { enumerable: !0, get: function() {
    return c.parseXml;
  } }), Object.defineProperty(e, "XElement", { enumerable: !0, get: function() {
    return c.XElement;
  } }), e.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe", e.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
  function f(h) {
    return h == null ? [] : Array.isArray(h) ? h : [h];
  }
})(he);
var Ee = {}, bo = {}, Be = {};
function fc(e) {
  return typeof e > "u" || e === null;
}
function jp(e) {
  return typeof e == "object" && e !== null;
}
function Hp(e) {
  return Array.isArray(e) ? e : fc(e) ? [] : [e];
}
function qp(e, t) {
  var r, n, i, o;
  if (t)
    for (o = Object.keys(t), r = 0, n = o.length; r < n; r += 1)
      i = o[r], e[i] = t[i];
  return e;
}
function Gp(e, t) {
  var r = "", n;
  for (n = 0; n < t; n += 1)
    r += e;
  return r;
}
function Vp(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
Be.isNothing = fc;
Be.isObject = jp;
Be.toArray = Hp;
Be.repeat = Gp;
Be.isNegativeZero = Vp;
Be.extend = qp;
function dc(e, t) {
  var r = "", n = e.reason || "(unknown reason)";
  return e.mark ? (e.mark.name && (r += 'in "' + e.mark.name + '" '), r += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")", !t && e.mark.snippet && (r += `

` + e.mark.snippet), n + " " + r) : n;
}
function Or(e, t) {
  Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = t, this.message = dc(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
Or.prototype = Object.create(Error.prototype);
Or.prototype.constructor = Or;
Or.prototype.toString = function(t) {
  return this.name + ": " + dc(this, t);
};
var qr = Or, Er = Be;
function $i(e, t, r, n, i) {
  var o = "", a = "", s = Math.floor(i / 2) - 1;
  return n - t > s && (o = " ... ", t = n - s + o.length), r - n > s && (a = " ...", r = n + s - a.length), {
    str: o + e.slice(t, r).replace(/\t/g, "→") + a,
    pos: n - t + o.length
    // relative position
  };
}
function bi(e, t) {
  return Er.repeat(" ", t - e.length) + e;
}
function Wp(e, t) {
  if (t = Object.create(t || null), !e.buffer) return null;
  t.maxLength || (t.maxLength = 79), typeof t.indent != "number" && (t.indent = 1), typeof t.linesBefore != "number" && (t.linesBefore = 3), typeof t.linesAfter != "number" && (t.linesAfter = 2);
  for (var r = /\r?\n|\r|\0/g, n = [0], i = [], o, a = -1; o = r.exec(e.buffer); )
    i.push(o.index), n.push(o.index + o[0].length), e.position <= o.index && a < 0 && (a = n.length - 2);
  a < 0 && (a = n.length - 1);
  var s = "", l, m, c = Math.min(e.line + t.linesAfter, i.length).toString().length, f = t.maxLength - (t.indent + c + 3);
  for (l = 1; l <= t.linesBefore && !(a - l < 0); l++)
    m = $i(
      e.buffer,
      n[a - l],
      i[a - l],
      e.position - (n[a] - n[a - l]),
      f
    ), s = Er.repeat(" ", t.indent) + bi((e.line - l + 1).toString(), c) + " | " + m.str + `
` + s;
  for (m = $i(e.buffer, n[a], i[a], e.position, f), s += Er.repeat(" ", t.indent) + bi((e.line + 1).toString(), c) + " | " + m.str + `
`, s += Er.repeat("-", t.indent + c + 3 + m.pos) + `^
`, l = 1; l <= t.linesAfter && !(a + l >= i.length); l++)
    m = $i(
      e.buffer,
      n[a + l],
      i[a + l],
      e.position - (n[a] - n[a + l]),
      f
    ), s += Er.repeat(" ", t.indent) + bi((e.line + l + 1).toString(), c) + " | " + m.str + `
`;
  return s.replace(/\n$/, "");
}
var Yp = Wp, ja = qr, zp = [
  "kind",
  "multi",
  "resolve",
  "construct",
  "instanceOf",
  "predicate",
  "represent",
  "representName",
  "defaultStyle",
  "styleAliases"
], Xp = [
  "scalar",
  "sequence",
  "mapping"
];
function Kp(e) {
  var t = {};
  return e !== null && Object.keys(e).forEach(function(r) {
    e[r].forEach(function(n) {
      t[String(n)] = r;
    });
  }), t;
}
function Jp(e, t) {
  if (t = t || {}, Object.keys(t).forEach(function(r) {
    if (zp.indexOf(r) === -1)
      throw new ja('Unknown option "' + r + '" is met in definition of "' + e + '" YAML type.');
  }), this.options = t, this.tag = e, this.kind = t.kind || null, this.resolve = t.resolve || function() {
    return !0;
  }, this.construct = t.construct || function(r) {
    return r;
  }, this.instanceOf = t.instanceOf || null, this.predicate = t.predicate || null, this.represent = t.represent || null, this.representName = t.representName || null, this.defaultStyle = t.defaultStyle || null, this.multi = t.multi || !1, this.styleAliases = Kp(t.styleAliases || null), Xp.indexOf(this.kind) === -1)
    throw new ja('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
var Oe = Jp, hr = qr, Oi = Oe;
function Ha(e, t) {
  var r = [];
  return e[t].forEach(function(n) {
    var i = r.length;
    r.forEach(function(o, a) {
      o.tag === n.tag && o.kind === n.kind && o.multi === n.multi && (i = a);
    }), r[i] = n;
  }), r;
}
function Qp() {
  var e = {
    scalar: {},
    sequence: {},
    mapping: {},
    fallback: {},
    multi: {
      scalar: [],
      sequence: [],
      mapping: [],
      fallback: []
    }
  }, t, r;
  function n(i) {
    i.multi ? (e.multi[i.kind].push(i), e.multi.fallback.push(i)) : e[i.kind][i.tag] = e.fallback[i.tag] = i;
  }
  for (t = 0, r = arguments.length; t < r; t += 1)
    arguments[t].forEach(n);
  return e;
}
function eo(e) {
  return this.extend(e);
}
eo.prototype.extend = function(t) {
  var r = [], n = [];
  if (t instanceof Oi)
    n.push(t);
  else if (Array.isArray(t))
    n = n.concat(t);
  else if (t && (Array.isArray(t.implicit) || Array.isArray(t.explicit)))
    t.implicit && (r = r.concat(t.implicit)), t.explicit && (n = n.concat(t.explicit));
  else
    throw new hr("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  r.forEach(function(o) {
    if (!(o instanceof Oi))
      throw new hr("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (o.loadKind && o.loadKind !== "scalar")
      throw new hr("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (o.multi)
      throw new hr("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), n.forEach(function(o) {
    if (!(o instanceof Oi))
      throw new hr("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  var i = Object.create(eo.prototype);
  return i.implicit = (this.implicit || []).concat(r), i.explicit = (this.explicit || []).concat(n), i.compiledImplicit = Ha(i, "implicit"), i.compiledExplicit = Ha(i, "explicit"), i.compiledTypeMap = Qp(i.compiledImplicit, i.compiledExplicit), i;
};
var hc = eo, Zp = Oe, pc = new Zp("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(e) {
    return e !== null ? e : "";
  }
}), em = Oe, mc = new em("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(e) {
    return e !== null ? e : [];
  }
}), tm = Oe, gc = new tm("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(e) {
    return e !== null ? e : {};
  }
}), rm = hc, Ec = new rm({
  explicit: [
    pc,
    mc,
    gc
  ]
}), nm = Oe;
function im(e) {
  if (e === null) return !0;
  var t = e.length;
  return t === 1 && e === "~" || t === 4 && (e === "null" || e === "Null" || e === "NULL");
}
function om() {
  return null;
}
function am(e) {
  return e === null;
}
var yc = new nm("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: im,
  construct: om,
  predicate: am,
  represent: {
    canonical: function() {
      return "~";
    },
    lowercase: function() {
      return "null";
    },
    uppercase: function() {
      return "NULL";
    },
    camelcase: function() {
      return "Null";
    },
    empty: function() {
      return "";
    }
  },
  defaultStyle: "lowercase"
}), sm = Oe;
function lm(e) {
  if (e === null) return !1;
  var t = e.length;
  return t === 4 && (e === "true" || e === "True" || e === "TRUE") || t === 5 && (e === "false" || e === "False" || e === "FALSE");
}
function cm(e) {
  return e === "true" || e === "True" || e === "TRUE";
}
function um(e) {
  return Object.prototype.toString.call(e) === "[object Boolean]";
}
var vc = new sm("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: lm,
  construct: cm,
  predicate: um,
  represent: {
    lowercase: function(e) {
      return e ? "true" : "false";
    },
    uppercase: function(e) {
      return e ? "TRUE" : "FALSE";
    },
    camelcase: function(e) {
      return e ? "True" : "False";
    }
  },
  defaultStyle: "lowercase"
}), fm = Be, dm = Oe;
function hm(e) {
  return 48 <= e && e <= 57 || 65 <= e && e <= 70 || 97 <= e && e <= 102;
}
function pm(e) {
  return 48 <= e && e <= 55;
}
function mm(e) {
  return 48 <= e && e <= 57;
}
function gm(e) {
  if (e === null) return !1;
  var t = e.length, r = 0, n = !1, i;
  if (!t) return !1;
  if (i = e[r], (i === "-" || i === "+") && (i = e[++r]), i === "0") {
    if (r + 1 === t) return !0;
    if (i = e[++r], i === "b") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (i !== "0" && i !== "1") return !1;
          n = !0;
        }
      return n && i !== "_";
    }
    if (i === "x") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (!hm(e.charCodeAt(r))) return !1;
          n = !0;
        }
      return n && i !== "_";
    }
    if (i === "o") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (!pm(e.charCodeAt(r))) return !1;
          n = !0;
        }
      return n && i !== "_";
    }
  }
  if (i === "_") return !1;
  for (; r < t; r++)
    if (i = e[r], i !== "_") {
      if (!mm(e.charCodeAt(r)))
        return !1;
      n = !0;
    }
  return !(!n || i === "_");
}
function Em(e) {
  var t = e, r = 1, n;
  if (t.indexOf("_") !== -1 && (t = t.replace(/_/g, "")), n = t[0], (n === "-" || n === "+") && (n === "-" && (r = -1), t = t.slice(1), n = t[0]), t === "0") return 0;
  if (n === "0") {
    if (t[1] === "b") return r * parseInt(t.slice(2), 2);
    if (t[1] === "x") return r * parseInt(t.slice(2), 16);
    if (t[1] === "o") return r * parseInt(t.slice(2), 8);
  }
  return r * parseInt(t, 10);
}
function ym(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !fm.isNegativeZero(e);
}
var wc = new dm("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: gm,
  construct: Em,
  predicate: ym,
  represent: {
    binary: function(e) {
      return e >= 0 ? "0b" + e.toString(2) : "-0b" + e.toString(2).slice(1);
    },
    octal: function(e) {
      return e >= 0 ? "0o" + e.toString(8) : "-0o" + e.toString(8).slice(1);
    },
    decimal: function(e) {
      return e.toString(10);
    },
    /* eslint-disable max-len */
    hexadecimal: function(e) {
      return e >= 0 ? "0x" + e.toString(16).toUpperCase() : "-0x" + e.toString(16).toUpperCase().slice(1);
    }
  },
  defaultStyle: "decimal",
  styleAliases: {
    binary: [2, "bin"],
    octal: [8, "oct"],
    decimal: [10, "dec"],
    hexadecimal: [16, "hex"]
  }
}), _c = Be, vm = Oe, wm = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function _m(e) {
  return !(e === null || !wm.test(e) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  e[e.length - 1] === "_");
}
function Am(e) {
  var t, r;
  return t = e.replace(/_/g, "").toLowerCase(), r = t[0] === "-" ? -1 : 1, "+-".indexOf(t[0]) >= 0 && (t = t.slice(1)), t === ".inf" ? r === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : t === ".nan" ? NaN : r * parseFloat(t, 10);
}
var Sm = /^[-+]?[0-9]+e/;
function Tm(e, t) {
  var r;
  if (isNaN(e))
    switch (t) {
      case "lowercase":
        return ".nan";
      case "uppercase":
        return ".NAN";
      case "camelcase":
        return ".NaN";
    }
  else if (Number.POSITIVE_INFINITY === e)
    switch (t) {
      case "lowercase":
        return ".inf";
      case "uppercase":
        return ".INF";
      case "camelcase":
        return ".Inf";
    }
  else if (Number.NEGATIVE_INFINITY === e)
    switch (t) {
      case "lowercase":
        return "-.inf";
      case "uppercase":
        return "-.INF";
      case "camelcase":
        return "-.Inf";
    }
  else if (_c.isNegativeZero(e))
    return "-0.0";
  return r = e.toString(10), Sm.test(r) ? r.replace("e", ".e") : r;
}
function Cm(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || _c.isNegativeZero(e));
}
var Ac = new vm("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: _m,
  construct: Am,
  predicate: Cm,
  represent: Tm,
  defaultStyle: "lowercase"
}), Sc = Ec.extend({
  implicit: [
    yc,
    vc,
    wc,
    Ac
  ]
}), Tc = Sc, $m = Oe, Cc = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), $c = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function bm(e) {
  return e === null ? !1 : Cc.exec(e) !== null || $c.exec(e) !== null;
}
function Om(e) {
  var t, r, n, i, o, a, s, l = 0, m = null, c, f, h;
  if (t = Cc.exec(e), t === null && (t = $c.exec(e)), t === null) throw new Error("Date resolve error");
  if (r = +t[1], n = +t[2] - 1, i = +t[3], !t[4])
    return new Date(Date.UTC(r, n, i));
  if (o = +t[4], a = +t[5], s = +t[6], t[7]) {
    for (l = t[7].slice(0, 3); l.length < 3; )
      l += "0";
    l = +l;
  }
  return t[9] && (c = +t[10], f = +(t[11] || 0), m = (c * 60 + f) * 6e4, t[9] === "-" && (m = -m)), h = new Date(Date.UTC(r, n, i, o, a, s, l)), m && h.setTime(h.getTime() - m), h;
}
function Im(e) {
  return e.toISOString();
}
var bc = new $m("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: bm,
  construct: Om,
  instanceOf: Date,
  represent: Im
}), Rm = Oe;
function Pm(e) {
  return e === "<<" || e === null;
}
var Oc = new Rm("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: Pm
}), Nm = Oe, Oo = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function Dm(e) {
  if (e === null) return !1;
  var t, r, n = 0, i = e.length, o = Oo;
  for (r = 0; r < i; r++)
    if (t = o.indexOf(e.charAt(r)), !(t > 64)) {
      if (t < 0) return !1;
      n += 6;
    }
  return n % 8 === 0;
}
function Fm(e) {
  var t, r, n = e.replace(/[\r\n=]/g, ""), i = n.length, o = Oo, a = 0, s = [];
  for (t = 0; t < i; t++)
    t % 4 === 0 && t && (s.push(a >> 16 & 255), s.push(a >> 8 & 255), s.push(a & 255)), a = a << 6 | o.indexOf(n.charAt(t));
  return r = i % 4 * 6, r === 0 ? (s.push(a >> 16 & 255), s.push(a >> 8 & 255), s.push(a & 255)) : r === 18 ? (s.push(a >> 10 & 255), s.push(a >> 2 & 255)) : r === 12 && s.push(a >> 4 & 255), new Uint8Array(s);
}
function xm(e) {
  var t = "", r = 0, n, i, o = e.length, a = Oo;
  for (n = 0; n < o; n++)
    n % 3 === 0 && n && (t += a[r >> 18 & 63], t += a[r >> 12 & 63], t += a[r >> 6 & 63], t += a[r & 63]), r = (r << 8) + e[n];
  return i = o % 3, i === 0 ? (t += a[r >> 18 & 63], t += a[r >> 12 & 63], t += a[r >> 6 & 63], t += a[r & 63]) : i === 2 ? (t += a[r >> 10 & 63], t += a[r >> 4 & 63], t += a[r << 2 & 63], t += a[64]) : i === 1 && (t += a[r >> 2 & 63], t += a[r << 4 & 63], t += a[64], t += a[64]), t;
}
function Lm(e) {
  return Object.prototype.toString.call(e) === "[object Uint8Array]";
}
var Ic = new Nm("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: Dm,
  construct: Fm,
  predicate: Lm,
  represent: xm
}), Um = Oe, km = Object.prototype.hasOwnProperty, Mm = Object.prototype.toString;
function Bm(e) {
  if (e === null) return !0;
  var t = [], r, n, i, o, a, s = e;
  for (r = 0, n = s.length; r < n; r += 1) {
    if (i = s[r], a = !1, Mm.call(i) !== "[object Object]") return !1;
    for (o in i)
      if (km.call(i, o))
        if (!a) a = !0;
        else return !1;
    if (!a) return !1;
    if (t.indexOf(o) === -1) t.push(o);
    else return !1;
  }
  return !0;
}
function jm(e) {
  return e !== null ? e : [];
}
var Rc = new Um("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: Bm,
  construct: jm
}), Hm = Oe, qm = Object.prototype.toString;
function Gm(e) {
  if (e === null) return !0;
  var t, r, n, i, o, a = e;
  for (o = new Array(a.length), t = 0, r = a.length; t < r; t += 1) {
    if (n = a[t], qm.call(n) !== "[object Object]" || (i = Object.keys(n), i.length !== 1)) return !1;
    o[t] = [i[0], n[i[0]]];
  }
  return !0;
}
function Vm(e) {
  if (e === null) return [];
  var t, r, n, i, o, a = e;
  for (o = new Array(a.length), t = 0, r = a.length; t < r; t += 1)
    n = a[t], i = Object.keys(n), o[t] = [i[0], n[i[0]]];
  return o;
}
var Pc = new Hm("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: Gm,
  construct: Vm
}), Wm = Oe, Ym = Object.prototype.hasOwnProperty;
function zm(e) {
  if (e === null) return !0;
  var t, r = e;
  for (t in r)
    if (Ym.call(r, t) && r[t] !== null)
      return !1;
  return !0;
}
function Xm(e) {
  return e !== null ? e : {};
}
var Nc = new Wm("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: zm,
  construct: Xm
}), Io = Tc.extend({
  implicit: [
    bc,
    Oc
  ],
  explicit: [
    Ic,
    Rc,
    Pc,
    Nc
  ]
}), bt = Be, Dc = qr, Km = Yp, Jm = Io, ht = Object.prototype.hasOwnProperty, Dn = 1, Fc = 2, xc = 3, Fn = 4, Ii = 1, Qm = 2, qa = 3, Zm = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, eg = /[\x85\u2028\u2029]/, tg = /[,\[\]\{\}]/, Lc = /^(?:!|!!|![a-z\-]+!)$/i, Uc = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function Ga(e) {
  return Object.prototype.toString.call(e);
}
function We(e) {
  return e === 10 || e === 13;
}
function Rt(e) {
  return e === 9 || e === 32;
}
function Pe(e) {
  return e === 9 || e === 32 || e === 10 || e === 13;
}
function Vt(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
function rg(e) {
  var t;
  return 48 <= e && e <= 57 ? e - 48 : (t = e | 32, 97 <= t && t <= 102 ? t - 97 + 10 : -1);
}
function ng(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function ig(e) {
  return 48 <= e && e <= 57 ? e - 48 : -1;
}
function Va(e) {
  return e === 48 ? "\0" : e === 97 ? "\x07" : e === 98 ? "\b" : e === 116 || e === 9 ? "	" : e === 110 ? `
` : e === 118 ? "\v" : e === 102 ? "\f" : e === 114 ? "\r" : e === 101 ? "\x1B" : e === 32 ? " " : e === 34 ? '"' : e === 47 ? "/" : e === 92 ? "\\" : e === 78 ? "" : e === 95 ? " " : e === 76 ? "\u2028" : e === 80 ? "\u2029" : "";
}
function og(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
    (e - 65536 >> 10) + 55296,
    (e - 65536 & 1023) + 56320
  );
}
var kc = new Array(256), Mc = new Array(256);
for (var kt = 0; kt < 256; kt++)
  kc[kt] = Va(kt) ? 1 : 0, Mc[kt] = Va(kt);
function ag(e, t) {
  this.input = e, this.filename = t.filename || null, this.schema = t.schema || Jm, this.onWarning = t.onWarning || null, this.legacy = t.legacy || !1, this.json = t.json || !1, this.listener = t.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
}
function Bc(e, t) {
  var r = {
    name: e.filename,
    buffer: e.input.slice(0, -1),
    // omit trailing \0
    position: e.position,
    line: e.line,
    column: e.position - e.lineStart
  };
  return r.snippet = Km(r), new Dc(t, r);
}
function L(e, t) {
  throw Bc(e, t);
}
function xn(e, t) {
  e.onWarning && e.onWarning.call(null, Bc(e, t));
}
var Wa = {
  YAML: function(t, r, n) {
    var i, o, a;
    t.version !== null && L(t, "duplication of %YAML directive"), n.length !== 1 && L(t, "YAML directive accepts exactly one argument"), i = /^([0-9]+)\.([0-9]+)$/.exec(n[0]), i === null && L(t, "ill-formed argument of the YAML directive"), o = parseInt(i[1], 10), a = parseInt(i[2], 10), o !== 1 && L(t, "unacceptable YAML version of the document"), t.version = n[0], t.checkLineBreaks = a < 2, a !== 1 && a !== 2 && xn(t, "unsupported YAML version of the document");
  },
  TAG: function(t, r, n) {
    var i, o;
    n.length !== 2 && L(t, "TAG directive accepts exactly two arguments"), i = n[0], o = n[1], Lc.test(i) || L(t, "ill-formed tag handle (first argument) of the TAG directive"), ht.call(t.tagMap, i) && L(t, 'there is a previously declared suffix for "' + i + '" tag handle'), Uc.test(o) || L(t, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      o = decodeURIComponent(o);
    } catch {
      L(t, "tag prefix is malformed: " + o);
    }
    t.tagMap[i] = o;
  }
};
function ut(e, t, r, n) {
  var i, o, a, s;
  if (t < r) {
    if (s = e.input.slice(t, r), n)
      for (i = 0, o = s.length; i < o; i += 1)
        a = s.charCodeAt(i), a === 9 || 32 <= a && a <= 1114111 || L(e, "expected valid JSON character");
    else Zm.test(s) && L(e, "the stream contains non-printable characters");
    e.result += s;
  }
}
function Ya(e, t, r, n) {
  var i, o, a, s;
  for (bt.isObject(r) || L(e, "cannot merge mappings; the provided source object is unacceptable"), i = Object.keys(r), a = 0, s = i.length; a < s; a += 1)
    o = i[a], ht.call(t, o) || (t[o] = r[o], n[o] = !0);
}
function Wt(e, t, r, n, i, o, a, s, l) {
  var m, c;
  if (Array.isArray(i))
    for (i = Array.prototype.slice.call(i), m = 0, c = i.length; m < c; m += 1)
      Array.isArray(i[m]) && L(e, "nested arrays are not supported inside keys"), typeof i == "object" && Ga(i[m]) === "[object Object]" && (i[m] = "[object Object]");
  if (typeof i == "object" && Ga(i) === "[object Object]" && (i = "[object Object]"), i = String(i), t === null && (t = {}), n === "tag:yaml.org,2002:merge")
    if (Array.isArray(o))
      for (m = 0, c = o.length; m < c; m += 1)
        Ya(e, t, o[m], r);
    else
      Ya(e, t, o, r);
  else
    !e.json && !ht.call(r, i) && ht.call(t, i) && (e.line = a || e.line, e.lineStart = s || e.lineStart, e.position = l || e.position, L(e, "duplicated mapping key")), i === "__proto__" ? Object.defineProperty(t, i, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: o
    }) : t[i] = o, delete r[i];
  return t;
}
function Ro(e) {
  var t;
  t = e.input.charCodeAt(e.position), t === 10 ? e.position++ : t === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : L(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
}
function se(e, t, r) {
  for (var n = 0, i = e.input.charCodeAt(e.position); i !== 0; ) {
    for (; Rt(i); )
      i === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), i = e.input.charCodeAt(++e.position);
    if (t && i === 35)
      do
        i = e.input.charCodeAt(++e.position);
      while (i !== 10 && i !== 13 && i !== 0);
    if (We(i))
      for (Ro(e), i = e.input.charCodeAt(e.position), n++, e.lineIndent = 0; i === 32; )
        e.lineIndent++, i = e.input.charCodeAt(++e.position);
    else
      break;
  }
  return r !== -1 && n !== 0 && e.lineIndent < r && xn(e, "deficient indentation"), n;
}
function zn(e) {
  var t = e.position, r;
  return r = e.input.charCodeAt(t), !!((r === 45 || r === 46) && r === e.input.charCodeAt(t + 1) && r === e.input.charCodeAt(t + 2) && (t += 3, r = e.input.charCodeAt(t), r === 0 || Pe(r)));
}
function Po(e, t) {
  t === 1 ? e.result += " " : t > 1 && (e.result += bt.repeat(`
`, t - 1));
}
function sg(e, t, r) {
  var n, i, o, a, s, l, m, c, f = e.kind, h = e.result, g;
  if (g = e.input.charCodeAt(e.position), Pe(g) || Vt(g) || g === 35 || g === 38 || g === 42 || g === 33 || g === 124 || g === 62 || g === 39 || g === 34 || g === 37 || g === 64 || g === 96 || (g === 63 || g === 45) && (i = e.input.charCodeAt(e.position + 1), Pe(i) || r && Vt(i)))
    return !1;
  for (e.kind = "scalar", e.result = "", o = a = e.position, s = !1; g !== 0; ) {
    if (g === 58) {
      if (i = e.input.charCodeAt(e.position + 1), Pe(i) || r && Vt(i))
        break;
    } else if (g === 35) {
      if (n = e.input.charCodeAt(e.position - 1), Pe(n))
        break;
    } else {
      if (e.position === e.lineStart && zn(e) || r && Vt(g))
        break;
      if (We(g))
        if (l = e.line, m = e.lineStart, c = e.lineIndent, se(e, !1, -1), e.lineIndent >= t) {
          s = !0, g = e.input.charCodeAt(e.position);
          continue;
        } else {
          e.position = a, e.line = l, e.lineStart = m, e.lineIndent = c;
          break;
        }
    }
    s && (ut(e, o, a, !1), Po(e, e.line - l), o = a = e.position, s = !1), Rt(g) || (a = e.position + 1), g = e.input.charCodeAt(++e.position);
  }
  return ut(e, o, a, !1), e.result ? !0 : (e.kind = f, e.result = h, !1);
}
function lg(e, t) {
  var r, n, i;
  if (r = e.input.charCodeAt(e.position), r !== 39)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, n = i = e.position; (r = e.input.charCodeAt(e.position)) !== 0; )
    if (r === 39)
      if (ut(e, n, e.position, !0), r = e.input.charCodeAt(++e.position), r === 39)
        n = e.position, e.position++, i = e.position;
      else
        return !0;
    else We(r) ? (ut(e, n, i, !0), Po(e, se(e, !1, t)), n = i = e.position) : e.position === e.lineStart && zn(e) ? L(e, "unexpected end of the document within a single quoted scalar") : (e.position++, i = e.position);
  L(e, "unexpected end of the stream within a single quoted scalar");
}
function cg(e, t) {
  var r, n, i, o, a, s;
  if (s = e.input.charCodeAt(e.position), s !== 34)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, r = n = e.position; (s = e.input.charCodeAt(e.position)) !== 0; ) {
    if (s === 34)
      return ut(e, r, e.position, !0), e.position++, !0;
    if (s === 92) {
      if (ut(e, r, e.position, !0), s = e.input.charCodeAt(++e.position), We(s))
        se(e, !1, t);
      else if (s < 256 && kc[s])
        e.result += Mc[s], e.position++;
      else if ((a = ng(s)) > 0) {
        for (i = a, o = 0; i > 0; i--)
          s = e.input.charCodeAt(++e.position), (a = rg(s)) >= 0 ? o = (o << 4) + a : L(e, "expected hexadecimal character");
        e.result += og(o), e.position++;
      } else
        L(e, "unknown escape sequence");
      r = n = e.position;
    } else We(s) ? (ut(e, r, n, !0), Po(e, se(e, !1, t)), r = n = e.position) : e.position === e.lineStart && zn(e) ? L(e, "unexpected end of the document within a double quoted scalar") : (e.position++, n = e.position);
  }
  L(e, "unexpected end of the stream within a double quoted scalar");
}
function ug(e, t) {
  var r = !0, n, i, o, a = e.tag, s, l = e.anchor, m, c, f, h, g, _ = /* @__PURE__ */ Object.create(null), y, A, T, S;
  if (S = e.input.charCodeAt(e.position), S === 91)
    c = 93, g = !1, s = [];
  else if (S === 123)
    c = 125, g = !0, s = {};
  else
    return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = s), S = e.input.charCodeAt(++e.position); S !== 0; ) {
    if (se(e, !0, t), S = e.input.charCodeAt(e.position), S === c)
      return e.position++, e.tag = a, e.anchor = l, e.kind = g ? "mapping" : "sequence", e.result = s, !0;
    r ? S === 44 && L(e, "expected the node content, but found ','") : L(e, "missed comma between flow collection entries"), A = y = T = null, f = h = !1, S === 63 && (m = e.input.charCodeAt(e.position + 1), Pe(m) && (f = h = !0, e.position++, se(e, !0, t))), n = e.line, i = e.lineStart, o = e.position, tr(e, t, Dn, !1, !0), A = e.tag, y = e.result, se(e, !0, t), S = e.input.charCodeAt(e.position), (h || e.line === n) && S === 58 && (f = !0, S = e.input.charCodeAt(++e.position), se(e, !0, t), tr(e, t, Dn, !1, !0), T = e.result), g ? Wt(e, s, _, A, y, T, n, i, o) : f ? s.push(Wt(e, null, _, A, y, T, n, i, o)) : s.push(y), se(e, !0, t), S = e.input.charCodeAt(e.position), S === 44 ? (r = !0, S = e.input.charCodeAt(++e.position)) : r = !1;
  }
  L(e, "unexpected end of the stream within a flow collection");
}
function fg(e, t) {
  var r, n, i = Ii, o = !1, a = !1, s = t, l = 0, m = !1, c, f;
  if (f = e.input.charCodeAt(e.position), f === 124)
    n = !1;
  else if (f === 62)
    n = !0;
  else
    return !1;
  for (e.kind = "scalar", e.result = ""; f !== 0; )
    if (f = e.input.charCodeAt(++e.position), f === 43 || f === 45)
      Ii === i ? i = f === 43 ? qa : Qm : L(e, "repeat of a chomping mode identifier");
    else if ((c = ig(f)) >= 0)
      c === 0 ? L(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : a ? L(e, "repeat of an indentation width identifier") : (s = t + c - 1, a = !0);
    else
      break;
  if (Rt(f)) {
    do
      f = e.input.charCodeAt(++e.position);
    while (Rt(f));
    if (f === 35)
      do
        f = e.input.charCodeAt(++e.position);
      while (!We(f) && f !== 0);
  }
  for (; f !== 0; ) {
    for (Ro(e), e.lineIndent = 0, f = e.input.charCodeAt(e.position); (!a || e.lineIndent < s) && f === 32; )
      e.lineIndent++, f = e.input.charCodeAt(++e.position);
    if (!a && e.lineIndent > s && (s = e.lineIndent), We(f)) {
      l++;
      continue;
    }
    if (e.lineIndent < s) {
      i === qa ? e.result += bt.repeat(`
`, o ? 1 + l : l) : i === Ii && o && (e.result += `
`);
      break;
    }
    for (n ? Rt(f) ? (m = !0, e.result += bt.repeat(`
`, o ? 1 + l : l)) : m ? (m = !1, e.result += bt.repeat(`
`, l + 1)) : l === 0 ? o && (e.result += " ") : e.result += bt.repeat(`
`, l) : e.result += bt.repeat(`
`, o ? 1 + l : l), o = !0, a = !0, l = 0, r = e.position; !We(f) && f !== 0; )
      f = e.input.charCodeAt(++e.position);
    ut(e, r, e.position, !1);
  }
  return !0;
}
function za(e, t) {
  var r, n = e.tag, i = e.anchor, o = [], a, s = !1, l;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = o), l = e.input.charCodeAt(e.position); l !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, L(e, "tab characters must not be used in indentation")), !(l !== 45 || (a = e.input.charCodeAt(e.position + 1), !Pe(a)))); ) {
    if (s = !0, e.position++, se(e, !0, -1) && e.lineIndent <= t) {
      o.push(null), l = e.input.charCodeAt(e.position);
      continue;
    }
    if (r = e.line, tr(e, t, xc, !1, !0), o.push(e.result), se(e, !0, -1), l = e.input.charCodeAt(e.position), (e.line === r || e.lineIndent > t) && l !== 0)
      L(e, "bad indentation of a sequence entry");
    else if (e.lineIndent < t)
      break;
  }
  return s ? (e.tag = n, e.anchor = i, e.kind = "sequence", e.result = o, !0) : !1;
}
function dg(e, t, r) {
  var n, i, o, a, s, l, m = e.tag, c = e.anchor, f = {}, h = /* @__PURE__ */ Object.create(null), g = null, _ = null, y = null, A = !1, T = !1, S;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = f), S = e.input.charCodeAt(e.position); S !== 0; ) {
    if (!A && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, L(e, "tab characters must not be used in indentation")), n = e.input.charCodeAt(e.position + 1), o = e.line, (S === 63 || S === 58) && Pe(n))
      S === 63 ? (A && (Wt(e, f, h, g, _, null, a, s, l), g = _ = y = null), T = !0, A = !0, i = !0) : A ? (A = !1, i = !0) : L(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, S = n;
    else {
      if (a = e.line, s = e.lineStart, l = e.position, !tr(e, r, Fc, !1, !0))
        break;
      if (e.line === o) {
        for (S = e.input.charCodeAt(e.position); Rt(S); )
          S = e.input.charCodeAt(++e.position);
        if (S === 58)
          S = e.input.charCodeAt(++e.position), Pe(S) || L(e, "a whitespace character is expected after the key-value separator within a block mapping"), A && (Wt(e, f, h, g, _, null, a, s, l), g = _ = y = null), T = !0, A = !1, i = !1, g = e.tag, _ = e.result;
        else if (T)
          L(e, "can not read an implicit mapping pair; a colon is missed");
        else
          return e.tag = m, e.anchor = c, !0;
      } else if (T)
        L(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return e.tag = m, e.anchor = c, !0;
    }
    if ((e.line === o || e.lineIndent > t) && (A && (a = e.line, s = e.lineStart, l = e.position), tr(e, t, Fn, !0, i) && (A ? _ = e.result : y = e.result), A || (Wt(e, f, h, g, _, y, a, s, l), g = _ = y = null), se(e, !0, -1), S = e.input.charCodeAt(e.position)), (e.line === o || e.lineIndent > t) && S !== 0)
      L(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < t)
      break;
  }
  return A && Wt(e, f, h, g, _, null, a, s, l), T && (e.tag = m, e.anchor = c, e.kind = "mapping", e.result = f), T;
}
function hg(e) {
  var t, r = !1, n = !1, i, o, a;
  if (a = e.input.charCodeAt(e.position), a !== 33) return !1;
  if (e.tag !== null && L(e, "duplication of a tag property"), a = e.input.charCodeAt(++e.position), a === 60 ? (r = !0, a = e.input.charCodeAt(++e.position)) : a === 33 ? (n = !0, i = "!!", a = e.input.charCodeAt(++e.position)) : i = "!", t = e.position, r) {
    do
      a = e.input.charCodeAt(++e.position);
    while (a !== 0 && a !== 62);
    e.position < e.length ? (o = e.input.slice(t, e.position), a = e.input.charCodeAt(++e.position)) : L(e, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; a !== 0 && !Pe(a); )
      a === 33 && (n ? L(e, "tag suffix cannot contain exclamation marks") : (i = e.input.slice(t - 1, e.position + 1), Lc.test(i) || L(e, "named tag handle cannot contain such characters"), n = !0, t = e.position + 1)), a = e.input.charCodeAt(++e.position);
    o = e.input.slice(t, e.position), tg.test(o) && L(e, "tag suffix cannot contain flow indicator characters");
  }
  o && !Uc.test(o) && L(e, "tag name cannot contain such characters: " + o);
  try {
    o = decodeURIComponent(o);
  } catch {
    L(e, "tag name is malformed: " + o);
  }
  return r ? e.tag = o : ht.call(e.tagMap, i) ? e.tag = e.tagMap[i] + o : i === "!" ? e.tag = "!" + o : i === "!!" ? e.tag = "tag:yaml.org,2002:" + o : L(e, 'undeclared tag handle "' + i + '"'), !0;
}
function pg(e) {
  var t, r;
  if (r = e.input.charCodeAt(e.position), r !== 38) return !1;
  for (e.anchor !== null && L(e, "duplication of an anchor property"), r = e.input.charCodeAt(++e.position), t = e.position; r !== 0 && !Pe(r) && !Vt(r); )
    r = e.input.charCodeAt(++e.position);
  return e.position === t && L(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(t, e.position), !0;
}
function mg(e) {
  var t, r, n;
  if (n = e.input.charCodeAt(e.position), n !== 42) return !1;
  for (n = e.input.charCodeAt(++e.position), t = e.position; n !== 0 && !Pe(n) && !Vt(n); )
    n = e.input.charCodeAt(++e.position);
  return e.position === t && L(e, "name of an alias node must contain at least one character"), r = e.input.slice(t, e.position), ht.call(e.anchorMap, r) || L(e, 'unidentified alias "' + r + '"'), e.result = e.anchorMap[r], se(e, !0, -1), !0;
}
function tr(e, t, r, n, i) {
  var o, a, s, l = 1, m = !1, c = !1, f, h, g, _, y, A;
  if (e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null, o = a = s = Fn === r || xc === r, n && se(e, !0, -1) && (m = !0, e.lineIndent > t ? l = 1 : e.lineIndent === t ? l = 0 : e.lineIndent < t && (l = -1)), l === 1)
    for (; hg(e) || pg(e); )
      se(e, !0, -1) ? (m = !0, s = o, e.lineIndent > t ? l = 1 : e.lineIndent === t ? l = 0 : e.lineIndent < t && (l = -1)) : s = !1;
  if (s && (s = m || i), (l === 1 || Fn === r) && (Dn === r || Fc === r ? y = t : y = t + 1, A = e.position - e.lineStart, l === 1 ? s && (za(e, A) || dg(e, A, y)) || ug(e, y) ? c = !0 : (a && fg(e, y) || lg(e, y) || cg(e, y) ? c = !0 : mg(e) ? (c = !0, (e.tag !== null || e.anchor !== null) && L(e, "alias node should not have any properties")) : sg(e, y, Dn === r) && (c = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : l === 0 && (c = s && za(e, A))), e.tag === null)
    e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
  else if (e.tag === "?") {
    for (e.result !== null && e.kind !== "scalar" && L(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'), f = 0, h = e.implicitTypes.length; f < h; f += 1)
      if (_ = e.implicitTypes[f], _.resolve(e.result)) {
        e.result = _.construct(e.result), e.tag = _.tag, e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
        break;
      }
  } else if (e.tag !== "!") {
    if (ht.call(e.typeMap[e.kind || "fallback"], e.tag))
      _ = e.typeMap[e.kind || "fallback"][e.tag];
    else
      for (_ = null, g = e.typeMap.multi[e.kind || "fallback"], f = 0, h = g.length; f < h; f += 1)
        if (e.tag.slice(0, g[f].tag.length) === g[f].tag) {
          _ = g[f];
          break;
        }
    _ || L(e, "unknown tag !<" + e.tag + ">"), e.result !== null && _.kind !== e.kind && L(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + _.kind + '", not "' + e.kind + '"'), _.resolve(e.result, e.tag) ? (e.result = _.construct(e.result, e.tag), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : L(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
  }
  return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || c;
}
function gg(e) {
  var t = e.position, r, n, i, o = !1, a;
  for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (a = e.input.charCodeAt(e.position)) !== 0 && (se(e, !0, -1), a = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || a !== 37)); ) {
    for (o = !0, a = e.input.charCodeAt(++e.position), r = e.position; a !== 0 && !Pe(a); )
      a = e.input.charCodeAt(++e.position);
    for (n = e.input.slice(r, e.position), i = [], n.length < 1 && L(e, "directive name must not be less than one character in length"); a !== 0; ) {
      for (; Rt(a); )
        a = e.input.charCodeAt(++e.position);
      if (a === 35) {
        do
          a = e.input.charCodeAt(++e.position);
        while (a !== 0 && !We(a));
        break;
      }
      if (We(a)) break;
      for (r = e.position; a !== 0 && !Pe(a); )
        a = e.input.charCodeAt(++e.position);
      i.push(e.input.slice(r, e.position));
    }
    a !== 0 && Ro(e), ht.call(Wa, n) ? Wa[n](e, n, i) : xn(e, 'unknown document directive "' + n + '"');
  }
  if (se(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, se(e, !0, -1)) : o && L(e, "directives end mark is expected"), tr(e, e.lineIndent - 1, Fn, !1, !0), se(e, !0, -1), e.checkLineBreaks && eg.test(e.input.slice(t, e.position)) && xn(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && zn(e)) {
    e.input.charCodeAt(e.position) === 46 && (e.position += 3, se(e, !0, -1));
    return;
  }
  if (e.position < e.length - 1)
    L(e, "end of the stream or a document separator is expected");
  else
    return;
}
function jc(e, t) {
  e = String(e), t = t || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
  var r = new ag(e, t), n = e.indexOf("\0");
  for (n !== -1 && (r.position = n, L(r, "null byte is not allowed in input")), r.input += "\0"; r.input.charCodeAt(r.position) === 32; )
    r.lineIndent += 1, r.position += 1;
  for (; r.position < r.length - 1; )
    gg(r);
  return r.documents;
}
function Eg(e, t, r) {
  t !== null && typeof t == "object" && typeof r > "u" && (r = t, t = null);
  var n = jc(e, r);
  if (typeof t != "function")
    return n;
  for (var i = 0, o = n.length; i < o; i += 1)
    t(n[i]);
}
function yg(e, t) {
  var r = jc(e, t);
  if (r.length !== 0) {
    if (r.length === 1)
      return r[0];
    throw new Dc("expected a single document in the stream, but found more");
  }
}
bo.loadAll = Eg;
bo.load = yg;
var Hc = {}, Xn = Be, Gr = qr, vg = Io, qc = Object.prototype.toString, Gc = Object.prototype.hasOwnProperty, No = 65279, wg = 9, Ir = 10, _g = 13, Ag = 32, Sg = 33, Tg = 34, to = 35, Cg = 37, $g = 38, bg = 39, Og = 42, Vc = 44, Ig = 45, Ln = 58, Rg = 61, Pg = 62, Ng = 63, Dg = 64, Wc = 91, Yc = 93, Fg = 96, zc = 123, xg = 124, Xc = 125, _e = {};
_e[0] = "\\0";
_e[7] = "\\a";
_e[8] = "\\b";
_e[9] = "\\t";
_e[10] = "\\n";
_e[11] = "\\v";
_e[12] = "\\f";
_e[13] = "\\r";
_e[27] = "\\e";
_e[34] = '\\"';
_e[92] = "\\\\";
_e[133] = "\\N";
_e[160] = "\\_";
_e[8232] = "\\L";
_e[8233] = "\\P";
var Lg = [
  "y",
  "Y",
  "yes",
  "Yes",
  "YES",
  "on",
  "On",
  "ON",
  "n",
  "N",
  "no",
  "No",
  "NO",
  "off",
  "Off",
  "OFF"
], Ug = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function kg(e, t) {
  var r, n, i, o, a, s, l;
  if (t === null) return {};
  for (r = {}, n = Object.keys(t), i = 0, o = n.length; i < o; i += 1)
    a = n[i], s = String(t[a]), a.slice(0, 2) === "!!" && (a = "tag:yaml.org,2002:" + a.slice(2)), l = e.compiledTypeMap.fallback[a], l && Gc.call(l.styleAliases, s) && (s = l.styleAliases[s]), r[a] = s;
  return r;
}
function Mg(e) {
  var t, r, n;
  if (t = e.toString(16).toUpperCase(), e <= 255)
    r = "x", n = 2;
  else if (e <= 65535)
    r = "u", n = 4;
  else if (e <= 4294967295)
    r = "U", n = 8;
  else
    throw new Gr("code point within a string may not be greater than 0xFFFFFFFF");
  return "\\" + r + Xn.repeat("0", n - t.length) + t;
}
var Bg = 1, Rr = 2;
function jg(e) {
  this.schema = e.schema || vg, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = Xn.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = kg(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.quotingType = e.quotingType === '"' ? Rr : Bg, this.forceQuotes = e.forceQuotes || !1, this.replacer = typeof e.replacer == "function" ? e.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function Xa(e, t) {
  for (var r = Xn.repeat(" ", t), n = 0, i = -1, o = "", a, s = e.length; n < s; )
    i = e.indexOf(`
`, n), i === -1 ? (a = e.slice(n), n = s) : (a = e.slice(n, i + 1), n = i + 1), a.length && a !== `
` && (o += r), o += a;
  return o;
}
function ro(e, t) {
  return `
` + Xn.repeat(" ", e.indent * t);
}
function Hg(e, t) {
  var r, n, i;
  for (r = 0, n = e.implicitTypes.length; r < n; r += 1)
    if (i = e.implicitTypes[r], i.resolve(t))
      return !0;
  return !1;
}
function Un(e) {
  return e === Ag || e === wg;
}
function Pr(e) {
  return 32 <= e && e <= 126 || 161 <= e && e <= 55295 && e !== 8232 && e !== 8233 || 57344 <= e && e <= 65533 && e !== No || 65536 <= e && e <= 1114111;
}
function Ka(e) {
  return Pr(e) && e !== No && e !== _g && e !== Ir;
}
function Ja(e, t, r) {
  var n = Ka(e), i = n && !Un(e);
  return (
    // ns-plain-safe
    (r ? (
      // c = flow-in
      n
    ) : n && e !== Vc && e !== Wc && e !== Yc && e !== zc && e !== Xc) && e !== to && !(t === Ln && !i) || Ka(t) && !Un(t) && e === to || t === Ln && i
  );
}
function qg(e) {
  return Pr(e) && e !== No && !Un(e) && e !== Ig && e !== Ng && e !== Ln && e !== Vc && e !== Wc && e !== Yc && e !== zc && e !== Xc && e !== to && e !== $g && e !== Og && e !== Sg && e !== xg && e !== Rg && e !== Pg && e !== bg && e !== Tg && e !== Cg && e !== Dg && e !== Fg;
}
function Gg(e) {
  return !Un(e) && e !== Ln;
}
function yr(e, t) {
  var r = e.charCodeAt(t), n;
  return r >= 55296 && r <= 56319 && t + 1 < e.length && (n = e.charCodeAt(t + 1), n >= 56320 && n <= 57343) ? (r - 55296) * 1024 + n - 56320 + 65536 : r;
}
function Kc(e) {
  var t = /^\n* /;
  return t.test(e);
}
var Jc = 1, no = 2, Qc = 3, Zc = 4, Gt = 5;
function Vg(e, t, r, n, i, o, a, s) {
  var l, m = 0, c = null, f = !1, h = !1, g = n !== -1, _ = -1, y = qg(yr(e, 0)) && Gg(yr(e, e.length - 1));
  if (t || a)
    for (l = 0; l < e.length; m >= 65536 ? l += 2 : l++) {
      if (m = yr(e, l), !Pr(m))
        return Gt;
      y = y && Ja(m, c, s), c = m;
    }
  else {
    for (l = 0; l < e.length; m >= 65536 ? l += 2 : l++) {
      if (m = yr(e, l), m === Ir)
        f = !0, g && (h = h || // Foldable line = too long, and not more-indented.
        l - _ - 1 > n && e[_ + 1] !== " ", _ = l);
      else if (!Pr(m))
        return Gt;
      y = y && Ja(m, c, s), c = m;
    }
    h = h || g && l - _ - 1 > n && e[_ + 1] !== " ";
  }
  return !f && !h ? y && !a && !i(e) ? Jc : o === Rr ? Gt : no : r > 9 && Kc(e) ? Gt : a ? o === Rr ? Gt : no : h ? Zc : Qc;
}
function Wg(e, t, r, n, i) {
  e.dump = function() {
    if (t.length === 0)
      return e.quotingType === Rr ? '""' : "''";
    if (!e.noCompatMode && (Lg.indexOf(t) !== -1 || Ug.test(t)))
      return e.quotingType === Rr ? '"' + t + '"' : "'" + t + "'";
    var o = e.indent * Math.max(1, r), a = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - o), s = n || e.flowLevel > -1 && r >= e.flowLevel;
    function l(m) {
      return Hg(e, m);
    }
    switch (Vg(
      t,
      s,
      e.indent,
      a,
      l,
      e.quotingType,
      e.forceQuotes && !n,
      i
    )) {
      case Jc:
        return t;
      case no:
        return "'" + t.replace(/'/g, "''") + "'";
      case Qc:
        return "|" + Qa(t, e.indent) + Za(Xa(t, o));
      case Zc:
        return ">" + Qa(t, e.indent) + Za(Xa(Yg(t, a), o));
      case Gt:
        return '"' + zg(t) + '"';
      default:
        throw new Gr("impossible error: invalid scalar style");
    }
  }();
}
function Qa(e, t) {
  var r = Kc(e) ? String(t) : "", n = e[e.length - 1] === `
`, i = n && (e[e.length - 2] === `
` || e === `
`), o = i ? "+" : n ? "" : "-";
  return r + o + `
`;
}
function Za(e) {
  return e[e.length - 1] === `
` ? e.slice(0, -1) : e;
}
function Yg(e, t) {
  for (var r = /(\n+)([^\n]*)/g, n = function() {
    var m = e.indexOf(`
`);
    return m = m !== -1 ? m : e.length, r.lastIndex = m, es(e.slice(0, m), t);
  }(), i = e[0] === `
` || e[0] === " ", o, a; a = r.exec(e); ) {
    var s = a[1], l = a[2];
    o = l[0] === " ", n += s + (!i && !o && l !== "" ? `
` : "") + es(l, t), i = o;
  }
  return n;
}
function es(e, t) {
  if (e === "" || e[0] === " ") return e;
  for (var r = / [^ ]/g, n, i = 0, o, a = 0, s = 0, l = ""; n = r.exec(e); )
    s = n.index, s - i > t && (o = a > i ? a : s, l += `
` + e.slice(i, o), i = o + 1), a = s;
  return l += `
`, e.length - i > t && a > i ? l += e.slice(i, a) + `
` + e.slice(a + 1) : l += e.slice(i), l.slice(1);
}
function zg(e) {
  for (var t = "", r = 0, n, i = 0; i < e.length; r >= 65536 ? i += 2 : i++)
    r = yr(e, i), n = _e[r], !n && Pr(r) ? (t += e[i], r >= 65536 && (t += e[i + 1])) : t += n || Mg(r);
  return t;
}
function Xg(e, t, r) {
  var n = "", i = e.tag, o, a, s;
  for (o = 0, a = r.length; o < a; o += 1)
    s = r[o], e.replacer && (s = e.replacer.call(r, String(o), s)), (Qe(e, t, s, !1, !1) || typeof s > "u" && Qe(e, t, null, !1, !1)) && (n !== "" && (n += "," + (e.condenseFlow ? "" : " ")), n += e.dump);
  e.tag = i, e.dump = "[" + n + "]";
}
function ts(e, t, r, n) {
  var i = "", o = e.tag, a, s, l;
  for (a = 0, s = r.length; a < s; a += 1)
    l = r[a], e.replacer && (l = e.replacer.call(r, String(a), l)), (Qe(e, t + 1, l, !0, !0, !1, !0) || typeof l > "u" && Qe(e, t + 1, null, !0, !0, !1, !0)) && ((!n || i !== "") && (i += ro(e, t)), e.dump && Ir === e.dump.charCodeAt(0) ? i += "-" : i += "- ", i += e.dump);
  e.tag = o, e.dump = i || "[]";
}
function Kg(e, t, r) {
  var n = "", i = e.tag, o = Object.keys(r), a, s, l, m, c;
  for (a = 0, s = o.length; a < s; a += 1)
    c = "", n !== "" && (c += ", "), e.condenseFlow && (c += '"'), l = o[a], m = r[l], e.replacer && (m = e.replacer.call(r, l, m)), Qe(e, t, l, !1, !1) && (e.dump.length > 1024 && (c += "? "), c += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), Qe(e, t, m, !1, !1) && (c += e.dump, n += c));
  e.tag = i, e.dump = "{" + n + "}";
}
function Jg(e, t, r, n) {
  var i = "", o = e.tag, a = Object.keys(r), s, l, m, c, f, h;
  if (e.sortKeys === !0)
    a.sort();
  else if (typeof e.sortKeys == "function")
    a.sort(e.sortKeys);
  else if (e.sortKeys)
    throw new Gr("sortKeys must be a boolean or a function");
  for (s = 0, l = a.length; s < l; s += 1)
    h = "", (!n || i !== "") && (h += ro(e, t)), m = a[s], c = r[m], e.replacer && (c = e.replacer.call(r, m, c)), Qe(e, t + 1, m, !0, !0, !0) && (f = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024, f && (e.dump && Ir === e.dump.charCodeAt(0) ? h += "?" : h += "? "), h += e.dump, f && (h += ro(e, t)), Qe(e, t + 1, c, !0, f) && (e.dump && Ir === e.dump.charCodeAt(0) ? h += ":" : h += ": ", h += e.dump, i += h));
  e.tag = o, e.dump = i || "{}";
}
function rs(e, t, r) {
  var n, i, o, a, s, l;
  for (i = r ? e.explicitTypes : e.implicitTypes, o = 0, a = i.length; o < a; o += 1)
    if (s = i[o], (s.instanceOf || s.predicate) && (!s.instanceOf || typeof t == "object" && t instanceof s.instanceOf) && (!s.predicate || s.predicate(t))) {
      if (r ? s.multi && s.representName ? e.tag = s.representName(t) : e.tag = s.tag : e.tag = "?", s.represent) {
        if (l = e.styleMap[s.tag] || s.defaultStyle, qc.call(s.represent) === "[object Function]")
          n = s.represent(t, l);
        else if (Gc.call(s.represent, l))
          n = s.represent[l](t, l);
        else
          throw new Gr("!<" + s.tag + '> tag resolver accepts not "' + l + '" style');
        e.dump = n;
      }
      return !0;
    }
  return !1;
}
function Qe(e, t, r, n, i, o, a) {
  e.tag = null, e.dump = r, rs(e, r, !1) || rs(e, r, !0);
  var s = qc.call(e.dump), l = n, m;
  n && (n = e.flowLevel < 0 || e.flowLevel > t);
  var c = s === "[object Object]" || s === "[object Array]", f, h;
  if (c && (f = e.duplicates.indexOf(r), h = f !== -1), (e.tag !== null && e.tag !== "?" || h || e.indent !== 2 && t > 0) && (i = !1), h && e.usedDuplicates[f])
    e.dump = "*ref_" + f;
  else {
    if (c && h && !e.usedDuplicates[f] && (e.usedDuplicates[f] = !0), s === "[object Object]")
      n && Object.keys(e.dump).length !== 0 ? (Jg(e, t, e.dump, i), h && (e.dump = "&ref_" + f + e.dump)) : (Kg(e, t, e.dump), h && (e.dump = "&ref_" + f + " " + e.dump));
    else if (s === "[object Array]")
      n && e.dump.length !== 0 ? (e.noArrayIndent && !a && t > 0 ? ts(e, t - 1, e.dump, i) : ts(e, t, e.dump, i), h && (e.dump = "&ref_" + f + e.dump)) : (Xg(e, t, e.dump), h && (e.dump = "&ref_" + f + " " + e.dump));
    else if (s === "[object String]")
      e.tag !== "?" && Wg(e, e.dump, t, o, l);
    else {
      if (s === "[object Undefined]")
        return !1;
      if (e.skipInvalid) return !1;
      throw new Gr("unacceptable kind of an object to dump " + s);
    }
    e.tag !== null && e.tag !== "?" && (m = encodeURI(
      e.tag[0] === "!" ? e.tag.slice(1) : e.tag
    ).replace(/!/g, "%21"), e.tag[0] === "!" ? m = "!" + m : m.slice(0, 18) === "tag:yaml.org,2002:" ? m = "!!" + m.slice(18) : m = "!<" + m + ">", e.dump = m + " " + e.dump);
  }
  return !0;
}
function Qg(e, t) {
  var r = [], n = [], i, o;
  for (io(e, r, n), i = 0, o = n.length; i < o; i += 1)
    t.duplicates.push(r[n[i]]);
  t.usedDuplicates = new Array(o);
}
function io(e, t, r) {
  var n, i, o;
  if (e !== null && typeof e == "object")
    if (i = t.indexOf(e), i !== -1)
      r.indexOf(i) === -1 && r.push(i);
    else if (t.push(e), Array.isArray(e))
      for (i = 0, o = e.length; i < o; i += 1)
        io(e[i], t, r);
    else
      for (n = Object.keys(e), i = 0, o = n.length; i < o; i += 1)
        io(e[n[i]], t, r);
}
function Zg(e, t) {
  t = t || {};
  var r = new jg(t);
  r.noRefs || Qg(e, r);
  var n = e;
  return r.replacer && (n = r.replacer.call({ "": n }, "", n)), Qe(r, 0, n, !0, !0) ? r.dump + `
` : "";
}
Hc.dump = Zg;
var eu = bo, e0 = Hc;
function Do(e, t) {
  return function() {
    throw new Error("Function yaml." + e + " is removed in js-yaml 4. Use yaml." + t + " instead, which is now safe by default.");
  };
}
Ee.Type = Oe;
Ee.Schema = hc;
Ee.FAILSAFE_SCHEMA = Ec;
Ee.JSON_SCHEMA = Sc;
Ee.CORE_SCHEMA = Tc;
Ee.DEFAULT_SCHEMA = Io;
Ee.load = eu.load;
Ee.loadAll = eu.loadAll;
Ee.dump = e0.dump;
Ee.YAMLException = qr;
Ee.types = {
  binary: Ic,
  float: Ac,
  map: gc,
  null: yc,
  pairs: Pc,
  set: Nc,
  timestamp: bc,
  bool: vc,
  int: wc,
  merge: Oc,
  omap: Rc,
  seq: mc,
  str: pc
};
Ee.safeLoad = Do("safeLoad", "load");
Ee.safeLoadAll = Do("safeLoadAll", "loadAll");
Ee.safeDump = Do("safeDump", "dump");
var Kn = {};
Object.defineProperty(Kn, "__esModule", { value: !0 });
Kn.Lazy = void 0;
class t0 {
  constructor(t) {
    this._value = null, this.creator = t;
  }
  get hasValue() {
    return this.creator == null;
  }
  get value() {
    if (this.creator == null)
      return this._value;
    const t = this.creator();
    return this.value = t, t;
  }
  set value(t) {
    this._value = t, this.creator = null;
  }
}
Kn.Lazy = t0;
var oo = { exports: {} };
const r0 = "2.0.0", tu = 256, n0 = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, i0 = 16, o0 = tu - 6, a0 = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var Jn = {
  MAX_LENGTH: tu,
  MAX_SAFE_COMPONENT_LENGTH: i0,
  MAX_SAFE_BUILD_LENGTH: o0,
  MAX_SAFE_INTEGER: n0,
  RELEASE_TYPES: a0,
  SEMVER_SPEC_VERSION: r0,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const s0 = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var Qn = s0;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: r,
    MAX_SAFE_BUILD_LENGTH: n,
    MAX_LENGTH: i
  } = Jn, o = Qn;
  t = e.exports = {};
  const a = t.re = [], s = t.safeRe = [], l = t.src = [], m = t.safeSrc = [], c = t.t = {};
  let f = 0;
  const h = "[a-zA-Z0-9-]", g = [
    ["\\s", 1],
    ["\\d", i],
    [h, n]
  ], _ = (A) => {
    for (const [T, S] of g)
      A = A.split(`${T}*`).join(`${T}{0,${S}}`).split(`${T}+`).join(`${T}{1,${S}}`);
    return A;
  }, y = (A, T, S) => {
    const D = _(T), x = f++;
    o(A, x, T), c[A] = x, l[x] = T, m[x] = D, a[x] = new RegExp(T, S ? "g" : void 0), s[x] = new RegExp(D, S ? "g" : void 0);
  };
  y("NUMERICIDENTIFIER", "0|[1-9]\\d*"), y("NUMERICIDENTIFIERLOOSE", "\\d+"), y("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${h}*`), y("MAINVERSION", `(${l[c.NUMERICIDENTIFIER]})\\.(${l[c.NUMERICIDENTIFIER]})\\.(${l[c.NUMERICIDENTIFIER]})`), y("MAINVERSIONLOOSE", `(${l[c.NUMERICIDENTIFIERLOOSE]})\\.(${l[c.NUMERICIDENTIFIERLOOSE]})\\.(${l[c.NUMERICIDENTIFIERLOOSE]})`), y("PRERELEASEIDENTIFIER", `(?:${l[c.NUMERICIDENTIFIER]}|${l[c.NONNUMERICIDENTIFIER]})`), y("PRERELEASEIDENTIFIERLOOSE", `(?:${l[c.NUMERICIDENTIFIERLOOSE]}|${l[c.NONNUMERICIDENTIFIER]})`), y("PRERELEASE", `(?:-(${l[c.PRERELEASEIDENTIFIER]}(?:\\.${l[c.PRERELEASEIDENTIFIER]})*))`), y("PRERELEASELOOSE", `(?:-?(${l[c.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${l[c.PRERELEASEIDENTIFIERLOOSE]})*))`), y("BUILDIDENTIFIER", `${h}+`), y("BUILD", `(?:\\+(${l[c.BUILDIDENTIFIER]}(?:\\.${l[c.BUILDIDENTIFIER]})*))`), y("FULLPLAIN", `v?${l[c.MAINVERSION]}${l[c.PRERELEASE]}?${l[c.BUILD]}?`), y("FULL", `^${l[c.FULLPLAIN]}$`), y("LOOSEPLAIN", `[v=\\s]*${l[c.MAINVERSIONLOOSE]}${l[c.PRERELEASELOOSE]}?${l[c.BUILD]}?`), y("LOOSE", `^${l[c.LOOSEPLAIN]}$`), y("GTLT", "((?:<|>)?=?)"), y("XRANGEIDENTIFIERLOOSE", `${l[c.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), y("XRANGEIDENTIFIER", `${l[c.NUMERICIDENTIFIER]}|x|X|\\*`), y("XRANGEPLAIN", `[v=\\s]*(${l[c.XRANGEIDENTIFIER]})(?:\\.(${l[c.XRANGEIDENTIFIER]})(?:\\.(${l[c.XRANGEIDENTIFIER]})(?:${l[c.PRERELEASE]})?${l[c.BUILD]}?)?)?`), y("XRANGEPLAINLOOSE", `[v=\\s]*(${l[c.XRANGEIDENTIFIERLOOSE]})(?:\\.(${l[c.XRANGEIDENTIFIERLOOSE]})(?:\\.(${l[c.XRANGEIDENTIFIERLOOSE]})(?:${l[c.PRERELEASELOOSE]})?${l[c.BUILD]}?)?)?`), y("XRANGE", `^${l[c.GTLT]}\\s*${l[c.XRANGEPLAIN]}$`), y("XRANGELOOSE", `^${l[c.GTLT]}\\s*${l[c.XRANGEPLAINLOOSE]}$`), y("COERCEPLAIN", `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?`), y("COERCE", `${l[c.COERCEPLAIN]}(?:$|[^\\d])`), y("COERCEFULL", l[c.COERCEPLAIN] + `(?:${l[c.PRERELEASE]})?(?:${l[c.BUILD]})?(?:$|[^\\d])`), y("COERCERTL", l[c.COERCE], !0), y("COERCERTLFULL", l[c.COERCEFULL], !0), y("LONETILDE", "(?:~>?)"), y("TILDETRIM", `(\\s*)${l[c.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", y("TILDE", `^${l[c.LONETILDE]}${l[c.XRANGEPLAIN]}$`), y("TILDELOOSE", `^${l[c.LONETILDE]}${l[c.XRANGEPLAINLOOSE]}$`), y("LONECARET", "(?:\\^)"), y("CARETTRIM", `(\\s*)${l[c.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", y("CARET", `^${l[c.LONECARET]}${l[c.XRANGEPLAIN]}$`), y("CARETLOOSE", `^${l[c.LONECARET]}${l[c.XRANGEPLAINLOOSE]}$`), y("COMPARATORLOOSE", `^${l[c.GTLT]}\\s*(${l[c.LOOSEPLAIN]})$|^$`), y("COMPARATOR", `^${l[c.GTLT]}\\s*(${l[c.FULLPLAIN]})$|^$`), y("COMPARATORTRIM", `(\\s*)${l[c.GTLT]}\\s*(${l[c.LOOSEPLAIN]}|${l[c.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", y("HYPHENRANGE", `^\\s*(${l[c.XRANGEPLAIN]})\\s+-\\s+(${l[c.XRANGEPLAIN]})\\s*$`), y("HYPHENRANGELOOSE", `^\\s*(${l[c.XRANGEPLAINLOOSE]})\\s+-\\s+(${l[c.XRANGEPLAINLOOSE]})\\s*$`), y("STAR", "(<|>)?=?\\s*\\*"), y("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), y("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(oo, oo.exports);
var Vr = oo.exports;
const l0 = Object.freeze({ loose: !0 }), c0 = Object.freeze({}), u0 = (e) => e ? typeof e != "object" ? l0 : e : c0;
var Fo = u0;
const ns = /^[0-9]+$/, ru = (e, t) => {
  const r = ns.test(e), n = ns.test(t);
  return r && n && (e = +e, t = +t), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
}, f0 = (e, t) => ru(t, e);
var nu = {
  compareIdentifiers: ru,
  rcompareIdentifiers: f0
};
const hn = Qn, { MAX_LENGTH: is, MAX_SAFE_INTEGER: pn } = Jn, { safeRe: os, safeSrc: as, t: mn } = Vr, d0 = Fo, { compareIdentifiers: Mt } = nu;
let h0 = class Ve {
  constructor(t, r) {
    if (r = d0(r), t instanceof Ve) {
      if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > is)
      throw new TypeError(
        `version is longer than ${is} characters`
      );
    hn("SemVer", t, r), this.options = r, this.loose = !!r.loose, this.includePrerelease = !!r.includePrerelease;
    const n = t.trim().match(r.loose ? os[mn.LOOSE] : os[mn.FULL]);
    if (!n)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +n[1], this.minor = +n[2], this.patch = +n[3], this.major > pn || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > pn || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > pn || this.patch < 0)
      throw new TypeError("Invalid patch version");
    n[4] ? this.prerelease = n[4].split(".").map((i) => {
      if (/^[0-9]+$/.test(i)) {
        const o = +i;
        if (o >= 0 && o < pn)
          return o;
      }
      return i;
    }) : this.prerelease = [], this.build = n[5] ? n[5].split(".") : [], this.format();
  }
  format() {
    return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
  }
  toString() {
    return this.version;
  }
  compare(t) {
    if (hn("SemVer.compare", this.version, this.options, t), !(t instanceof Ve)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new Ve(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof Ve || (t = new Ve(t, this.options)), Mt(this.major, t.major) || Mt(this.minor, t.minor) || Mt(this.patch, t.patch);
  }
  comparePre(t) {
    if (t instanceof Ve || (t = new Ve(t, this.options)), this.prerelease.length && !t.prerelease.length)
      return -1;
    if (!this.prerelease.length && t.prerelease.length)
      return 1;
    if (!this.prerelease.length && !t.prerelease.length)
      return 0;
    let r = 0;
    do {
      const n = this.prerelease[r], i = t.prerelease[r];
      if (hn("prerelease compare", r, n, i), n === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === i)
        continue;
      return Mt(n, i);
    } while (++r);
  }
  compareBuild(t) {
    t instanceof Ve || (t = new Ve(t, this.options));
    let r = 0;
    do {
      const n = this.build[r], i = t.build[r];
      if (hn("build compare", r, n, i), n === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === i)
        continue;
      return Mt(n, i);
    } while (++r);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, r, n) {
    if (t.startsWith("pre")) {
      if (!r && n === !1)
        throw new Error("invalid increment argument: identifier is empty");
      if (r) {
        const i = new RegExp(`^${this.options.loose ? as[mn.PRERELEASELOOSE] : as[mn.PRERELEASE]}$`), o = `-${r}`.match(i);
        if (!o || o[1] !== r)
          throw new Error(`invalid identifier: ${r}`);
      }
    }
    switch (t) {
      case "premajor":
        this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", r, n);
        break;
      case "preminor":
        this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", r, n);
        break;
      case "prepatch":
        this.prerelease.length = 0, this.inc("patch", r, n), this.inc("pre", r, n);
        break;
      case "prerelease":
        this.prerelease.length === 0 && this.inc("patch", r, n), this.inc("pre", r, n);
        break;
      case "release":
        if (this.prerelease.length === 0)
          throw new Error(`version ${this.raw} is not a prerelease`);
        this.prerelease.length = 0;
        break;
      case "major":
        (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
        break;
      case "minor":
        (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
        break;
      case "patch":
        this.prerelease.length === 0 && this.patch++, this.prerelease = [];
        break;
      case "pre": {
        const i = Number(n) ? 1 : 0;
        if (this.prerelease.length === 0)
          this.prerelease = [i];
        else {
          let o = this.prerelease.length;
          for (; --o >= 0; )
            typeof this.prerelease[o] == "number" && (this.prerelease[o]++, o = -2);
          if (o === -1) {
            if (r === this.prerelease.join(".") && n === !1)
              throw new Error("invalid increment argument: identifier already exists");
            this.prerelease.push(i);
          }
        }
        if (r) {
          let o = [r, i];
          n === !1 && (o = [r]), Mt(this.prerelease[0], r) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = o) : this.prerelease = o;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var Ie = h0;
const ss = Ie, p0 = (e, t, r = !1) => {
  if (e instanceof ss)
    return e;
  try {
    return new ss(e, t);
  } catch (n) {
    if (!r)
      return null;
    throw n;
  }
};
var or = p0;
const m0 = or, g0 = (e, t) => {
  const r = m0(e, t);
  return r ? r.version : null;
};
var E0 = g0;
const y0 = or, v0 = (e, t) => {
  const r = y0(e.trim().replace(/^[=v]+/, ""), t);
  return r ? r.version : null;
};
var w0 = v0;
const ls = Ie, _0 = (e, t, r, n, i) => {
  typeof r == "string" && (i = n, n = r, r = void 0);
  try {
    return new ls(
      e instanceof ls ? e.version : e,
      r
    ).inc(t, n, i).version;
  } catch {
    return null;
  }
};
var A0 = _0;
const cs = or, S0 = (e, t) => {
  const r = cs(e, null, !0), n = cs(t, null, !0), i = r.compare(n);
  if (i === 0)
    return null;
  const o = i > 0, a = o ? r : n, s = o ? n : r, l = !!a.prerelease.length;
  if (!!s.prerelease.length && !l) {
    if (!s.patch && !s.minor)
      return "major";
    if (s.compareMain(a) === 0)
      return s.minor && !s.patch ? "minor" : "patch";
  }
  const c = l ? "pre" : "";
  return r.major !== n.major ? c + "major" : r.minor !== n.minor ? c + "minor" : r.patch !== n.patch ? c + "patch" : "prerelease";
};
var T0 = S0;
const C0 = Ie, $0 = (e, t) => new C0(e, t).major;
var b0 = $0;
const O0 = Ie, I0 = (e, t) => new O0(e, t).minor;
var R0 = I0;
const P0 = Ie, N0 = (e, t) => new P0(e, t).patch;
var D0 = N0;
const F0 = or, x0 = (e, t) => {
  const r = F0(e, t);
  return r && r.prerelease.length ? r.prerelease : null;
};
var L0 = x0;
const us = Ie, U0 = (e, t, r) => new us(e, r).compare(new us(t, r));
var je = U0;
const k0 = je, M0 = (e, t, r) => k0(t, e, r);
var B0 = M0;
const j0 = je, H0 = (e, t) => j0(e, t, !0);
var q0 = H0;
const fs = Ie, G0 = (e, t, r) => {
  const n = new fs(e, r), i = new fs(t, r);
  return n.compare(i) || n.compareBuild(i);
};
var xo = G0;
const V0 = xo, W0 = (e, t) => e.sort((r, n) => V0(r, n, t));
var Y0 = W0;
const z0 = xo, X0 = (e, t) => e.sort((r, n) => z0(n, r, t));
var K0 = X0;
const J0 = je, Q0 = (e, t, r) => J0(e, t, r) > 0;
var Zn = Q0;
const Z0 = je, eE = (e, t, r) => Z0(e, t, r) < 0;
var Lo = eE;
const tE = je, rE = (e, t, r) => tE(e, t, r) === 0;
var iu = rE;
const nE = je, iE = (e, t, r) => nE(e, t, r) !== 0;
var ou = iE;
const oE = je, aE = (e, t, r) => oE(e, t, r) >= 0;
var Uo = aE;
const sE = je, lE = (e, t, r) => sE(e, t, r) <= 0;
var ko = lE;
const cE = iu, uE = ou, fE = Zn, dE = Uo, hE = Lo, pE = ko, mE = (e, t, r, n) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
    case "":
    case "=":
    case "==":
      return cE(e, r, n);
    case "!=":
      return uE(e, r, n);
    case ">":
      return fE(e, r, n);
    case ">=":
      return dE(e, r, n);
    case "<":
      return hE(e, r, n);
    case "<=":
      return pE(e, r, n);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var au = mE;
const gE = Ie, EE = or, { safeRe: gn, t: En } = Vr, yE = (e, t) => {
  if (e instanceof gE)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let r = null;
  if (!t.rtl)
    r = e.match(t.includePrerelease ? gn[En.COERCEFULL] : gn[En.COERCE]);
  else {
    const l = t.includePrerelease ? gn[En.COERCERTLFULL] : gn[En.COERCERTL];
    let m;
    for (; (m = l.exec(e)) && (!r || r.index + r[0].length !== e.length); )
      (!r || m.index + m[0].length !== r.index + r[0].length) && (r = m), l.lastIndex = m.index + m[1].length + m[2].length;
    l.lastIndex = -1;
  }
  if (r === null)
    return null;
  const n = r[2], i = r[3] || "0", o = r[4] || "0", a = t.includePrerelease && r[5] ? `-${r[5]}` : "", s = t.includePrerelease && r[6] ? `+${r[6]}` : "";
  return EE(`${n}.${i}.${o}${a}${s}`, t);
};
var vE = yE;
class wE {
  constructor() {
    this.max = 1e3, this.map = /* @__PURE__ */ new Map();
  }
  get(t) {
    const r = this.map.get(t);
    if (r !== void 0)
      return this.map.delete(t), this.map.set(t, r), r;
  }
  delete(t) {
    return this.map.delete(t);
  }
  set(t, r) {
    if (!this.delete(t) && r !== void 0) {
      if (this.map.size >= this.max) {
        const i = this.map.keys().next().value;
        this.delete(i);
      }
      this.map.set(t, r);
    }
    return this;
  }
}
var _E = wE, Ri, ds;
function He() {
  if (ds) return Ri;
  ds = 1;
  const e = /\s+/g;
  class t {
    constructor(b, P) {
      if (P = i(P), b instanceof t)
        return b.loose === !!P.loose && b.includePrerelease === !!P.includePrerelease ? b : new t(b.raw, P);
      if (b instanceof o)
        return this.raw = b.value, this.set = [[b]], this.formatted = void 0, this;
      if (this.options = P, this.loose = !!P.loose, this.includePrerelease = !!P.includePrerelease, this.raw = b.trim().replace(e, " "), this.set = this.raw.split("||").map(($) => this.parseRange($.trim())).filter(($) => $.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const $ = this.set[0];
        if (this.set = this.set.filter((N) => !y(N[0])), this.set.length === 0)
          this.set = [$];
        else if (this.set.length > 1) {
          for (const N of this.set)
            if (N.length === 1 && A(N[0])) {
              this.set = [N];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let b = 0; b < this.set.length; b++) {
          b > 0 && (this.formatted += "||");
          const P = this.set[b];
          for (let $ = 0; $ < P.length; $++)
            $ > 0 && (this.formatted += " "), this.formatted += P[$].toString().trim();
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(b) {
      const $ = ((this.options.includePrerelease && g) | (this.options.loose && _)) + ":" + b, N = n.get($);
      if (N)
        return N;
      const R = this.options.loose, k = R ? l[m.HYPHENRANGELOOSE] : l[m.HYPHENRANGE];
      b = b.replace(k, M(this.options.includePrerelease)), a("hyphen replace", b), b = b.replace(l[m.COMPARATORTRIM], c), a("comparator trim", b), b = b.replace(l[m.TILDETRIM], f), a("tilde trim", b), b = b.replace(l[m.CARETTRIM], h), a("caret trim", b);
      let V = b.split(" ").map((U) => S(U, this.options)).join(" ").split(/\s+/).map((U) => j(U, this.options));
      R && (V = V.filter((U) => (a("loose invalid filter", U, this.options), !!U.match(l[m.COMPARATORLOOSE])))), a("range list", V);
      const H = /* @__PURE__ */ new Map(), K = V.map((U) => new o(U, this.options));
      for (const U of K) {
        if (y(U))
          return [U];
        H.set(U.value, U);
      }
      H.size > 1 && H.has("") && H.delete("");
      const ue = [...H.values()];
      return n.set($, ue), ue;
    }
    intersects(b, P) {
      if (!(b instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some(($) => T($, P) && b.set.some((N) => T(N, P) && $.every((R) => N.every((k) => R.intersects(k, P)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(b) {
      if (!b)
        return !1;
      if (typeof b == "string")
        try {
          b = new s(b, this.options);
        } catch {
          return !1;
        }
      for (let P = 0; P < this.set.length; P++)
        if (X(this.set[P], b, this.options))
          return !0;
      return !1;
    }
  }
  Ri = t;
  const r = _E, n = new r(), i = Fo, o = ei(), a = Qn, s = Ie, {
    safeRe: l,
    t: m,
    comparatorTrimReplace: c,
    tildeTrimReplace: f,
    caretTrimReplace: h
  } = Vr, { FLAG_INCLUDE_PRERELEASE: g, FLAG_LOOSE: _ } = Jn, y = (I) => I.value === "<0.0.0-0", A = (I) => I.value === "", T = (I, b) => {
    let P = !0;
    const $ = I.slice();
    let N = $.pop();
    for (; P && $.length; )
      P = $.every((R) => N.intersects(R, b)), N = $.pop();
    return P;
  }, S = (I, b) => (a("comp", I, b), I = ae(I, b), a("caret", I), I = x(I, b), a("tildes", I), I = Ne(I, b), a("xrange", I), I = G(I, b), a("stars", I), I), D = (I) => !I || I.toLowerCase() === "x" || I === "*", x = (I, b) => I.trim().split(/\s+/).map((P) => Z(P, b)).join(" "), Z = (I, b) => {
    const P = b.loose ? l[m.TILDELOOSE] : l[m.TILDE];
    return I.replace(P, ($, N, R, k, V) => {
      a("tilde", I, $, N, R, k, V);
      let H;
      return D(N) ? H = "" : D(R) ? H = `>=${N}.0.0 <${+N + 1}.0.0-0` : D(k) ? H = `>=${N}.${R}.0 <${N}.${+R + 1}.0-0` : V ? (a("replaceTilde pr", V), H = `>=${N}.${R}.${k}-${V} <${N}.${+R + 1}.0-0`) : H = `>=${N}.${R}.${k} <${N}.${+R + 1}.0-0`, a("tilde return", H), H;
    });
  }, ae = (I, b) => I.trim().split(/\s+/).map((P) => Y(P, b)).join(" "), Y = (I, b) => {
    a("caret", I, b);
    const P = b.loose ? l[m.CARETLOOSE] : l[m.CARET], $ = b.includePrerelease ? "-0" : "";
    return I.replace(P, (N, R, k, V, H) => {
      a("caret", I, N, R, k, V, H);
      let K;
      return D(R) ? K = "" : D(k) ? K = `>=${R}.0.0${$} <${+R + 1}.0.0-0` : D(V) ? R === "0" ? K = `>=${R}.${k}.0${$} <${R}.${+k + 1}.0-0` : K = `>=${R}.${k}.0${$} <${+R + 1}.0.0-0` : H ? (a("replaceCaret pr", H), R === "0" ? k === "0" ? K = `>=${R}.${k}.${V}-${H} <${R}.${k}.${+V + 1}-0` : K = `>=${R}.${k}.${V}-${H} <${R}.${+k + 1}.0-0` : K = `>=${R}.${k}.${V}-${H} <${+R + 1}.0.0-0`) : (a("no pr"), R === "0" ? k === "0" ? K = `>=${R}.${k}.${V}${$} <${R}.${k}.${+V + 1}-0` : K = `>=${R}.${k}.${V}${$} <${R}.${+k + 1}.0-0` : K = `>=${R}.${k}.${V} <${+R + 1}.0.0-0`), a("caret return", K), K;
    });
  }, Ne = (I, b) => (a("replaceXRanges", I, b), I.split(/\s+/).map((P) => E(P, b)).join(" ")), E = (I, b) => {
    I = I.trim();
    const P = b.loose ? l[m.XRANGELOOSE] : l[m.XRANGE];
    return I.replace(P, ($, N, R, k, V, H) => {
      a("xRange", I, $, N, R, k, V, H);
      const K = D(R), ue = K || D(k), U = ue || D(V), qe = U;
      return N === "=" && qe && (N = ""), H = b.includePrerelease ? "-0" : "", K ? N === ">" || N === "<" ? $ = "<0.0.0-0" : $ = "*" : N && qe ? (ue && (k = 0), V = 0, N === ">" ? (N = ">=", ue ? (R = +R + 1, k = 0, V = 0) : (k = +k + 1, V = 0)) : N === "<=" && (N = "<", ue ? R = +R + 1 : k = +k + 1), N === "<" && (H = "-0"), $ = `${N + R}.${k}.${V}${H}`) : ue ? $ = `>=${R}.0.0${H} <${+R + 1}.0.0-0` : U && ($ = `>=${R}.${k}.0${H} <${R}.${+k + 1}.0-0`), a("xRange return", $), $;
    });
  }, G = (I, b) => (a("replaceStars", I, b), I.trim().replace(l[m.STAR], "")), j = (I, b) => (a("replaceGTE0", I, b), I.trim().replace(l[b.includePrerelease ? m.GTE0PRE : m.GTE0], "")), M = (I) => (b, P, $, N, R, k, V, H, K, ue, U, qe) => (D($) ? P = "" : D(N) ? P = `>=${$}.0.0${I ? "-0" : ""}` : D(R) ? P = `>=${$}.${N}.0${I ? "-0" : ""}` : k ? P = `>=${P}` : P = `>=${P}${I ? "-0" : ""}`, D(K) ? H = "" : D(ue) ? H = `<${+K + 1}.0.0-0` : D(U) ? H = `<${K}.${+ue + 1}.0-0` : qe ? H = `<=${K}.${ue}.${U}-${qe}` : I ? H = `<${K}.${ue}.${+U + 1}-0` : H = `<=${H}`, `${P} ${H}`.trim()), X = (I, b, P) => {
    for (let $ = 0; $ < I.length; $++)
      if (!I[$].test(b))
        return !1;
    if (b.prerelease.length && !P.includePrerelease) {
      for (let $ = 0; $ < I.length; $++)
        if (a(I[$].semver), I[$].semver !== o.ANY && I[$].semver.prerelease.length > 0) {
          const N = I[$].semver;
          if (N.major === b.major && N.minor === b.minor && N.patch === b.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Ri;
}
var Pi, hs;
function ei() {
  if (hs) return Pi;
  hs = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(c, f) {
      if (f = r(f), c instanceof t) {
        if (c.loose === !!f.loose)
          return c;
        c = c.value;
      }
      c = c.trim().split(/\s+/).join(" "), a("comparator", c, f), this.options = f, this.loose = !!f.loose, this.parse(c), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, a("comp", this);
    }
    parse(c) {
      const f = this.options.loose ? n[i.COMPARATORLOOSE] : n[i.COMPARATOR], h = c.match(f);
      if (!h)
        throw new TypeError(`Invalid comparator: ${c}`);
      this.operator = h[1] !== void 0 ? h[1] : "", this.operator === "=" && (this.operator = ""), h[2] ? this.semver = new s(h[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(c) {
      if (a("Comparator.test", c, this.options.loose), this.semver === e || c === e)
        return !0;
      if (typeof c == "string")
        try {
          c = new s(c, this.options);
        } catch {
          return !1;
        }
      return o(c, this.operator, this.semver, this.options);
    }
    intersects(c, f) {
      if (!(c instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new l(c.value, f).test(this.value) : c.operator === "" ? c.value === "" ? !0 : new l(this.value, f).test(c.semver) : (f = r(f), f.includePrerelease && (this.value === "<0.0.0-0" || c.value === "<0.0.0-0") || !f.includePrerelease && (this.value.startsWith("<0.0.0") || c.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && c.operator.startsWith(">") || this.operator.startsWith("<") && c.operator.startsWith("<") || this.semver.version === c.semver.version && this.operator.includes("=") && c.operator.includes("=") || o(this.semver, "<", c.semver, f) && this.operator.startsWith(">") && c.operator.startsWith("<") || o(this.semver, ">", c.semver, f) && this.operator.startsWith("<") && c.operator.startsWith(">")));
    }
  }
  Pi = t;
  const r = Fo, { safeRe: n, t: i } = Vr, o = au, a = Qn, s = Ie, l = He();
  return Pi;
}
const AE = He(), SE = (e, t, r) => {
  try {
    t = new AE(t, r);
  } catch {
    return !1;
  }
  return t.test(e);
};
var ti = SE;
const TE = He(), CE = (e, t) => new TE(e, t).set.map((r) => r.map((n) => n.value).join(" ").trim().split(" "));
var $E = CE;
const bE = Ie, OE = He(), IE = (e, t, r) => {
  let n = null, i = null, o = null;
  try {
    o = new OE(t, r);
  } catch {
    return null;
  }
  return e.forEach((a) => {
    o.test(a) && (!n || i.compare(a) === -1) && (n = a, i = new bE(n, r));
  }), n;
};
var RE = IE;
const PE = Ie, NE = He(), DE = (e, t, r) => {
  let n = null, i = null, o = null;
  try {
    o = new NE(t, r);
  } catch {
    return null;
  }
  return e.forEach((a) => {
    o.test(a) && (!n || i.compare(a) === 1) && (n = a, i = new PE(n, r));
  }), n;
};
var FE = DE;
const Ni = Ie, xE = He(), ps = Zn, LE = (e, t) => {
  e = new xE(e, t);
  let r = new Ni("0.0.0");
  if (e.test(r) || (r = new Ni("0.0.0-0"), e.test(r)))
    return r;
  r = null;
  for (let n = 0; n < e.set.length; ++n) {
    const i = e.set[n];
    let o = null;
    i.forEach((a) => {
      const s = new Ni(a.semver.version);
      switch (a.operator) {
        case ">":
          s.prerelease.length === 0 ? s.patch++ : s.prerelease.push(0), s.raw = s.format();
        case "":
        case ">=":
          (!o || ps(s, o)) && (o = s);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${a.operator}`);
      }
    }), o && (!r || ps(r, o)) && (r = o);
  }
  return r && e.test(r) ? r : null;
};
var UE = LE;
const kE = He(), ME = (e, t) => {
  try {
    return new kE(e, t).range || "*";
  } catch {
    return null;
  }
};
var BE = ME;
const jE = Ie, su = ei(), { ANY: HE } = su, qE = He(), GE = ti, ms = Zn, gs = Lo, VE = ko, WE = Uo, YE = (e, t, r, n) => {
  e = new jE(e, n), t = new qE(t, n);
  let i, o, a, s, l;
  switch (r) {
    case ">":
      i = ms, o = VE, a = gs, s = ">", l = ">=";
      break;
    case "<":
      i = gs, o = WE, a = ms, s = "<", l = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (GE(e, t, n))
    return !1;
  for (let m = 0; m < t.set.length; ++m) {
    const c = t.set[m];
    let f = null, h = null;
    if (c.forEach((g) => {
      g.semver === HE && (g = new su(">=0.0.0")), f = f || g, h = h || g, i(g.semver, f.semver, n) ? f = g : a(g.semver, h.semver, n) && (h = g);
    }), f.operator === s || f.operator === l || (!h.operator || h.operator === s) && o(e, h.semver))
      return !1;
    if (h.operator === l && a(e, h.semver))
      return !1;
  }
  return !0;
};
var Mo = YE;
const zE = Mo, XE = (e, t, r) => zE(e, t, ">", r);
var KE = XE;
const JE = Mo, QE = (e, t, r) => JE(e, t, "<", r);
var ZE = QE;
const Es = He(), ey = (e, t, r) => (e = new Es(e, r), t = new Es(t, r), e.intersects(t, r));
var ty = ey;
const ry = ti, ny = je;
var iy = (e, t, r) => {
  const n = [];
  let i = null, o = null;
  const a = e.sort((c, f) => ny(c, f, r));
  for (const c of a)
    ry(c, t, r) ? (o = c, i || (i = c)) : (o && n.push([i, o]), o = null, i = null);
  i && n.push([i, null]);
  const s = [];
  for (const [c, f] of n)
    c === f ? s.push(c) : !f && c === a[0] ? s.push("*") : f ? c === a[0] ? s.push(`<=${f}`) : s.push(`${c} - ${f}`) : s.push(`>=${c}`);
  const l = s.join(" || "), m = typeof t.raw == "string" ? t.raw : String(t);
  return l.length < m.length ? l : t;
};
const ys = He(), Bo = ei(), { ANY: Di } = Bo, pr = ti, jo = je, oy = (e, t, r = {}) => {
  if (e === t)
    return !0;
  e = new ys(e, r), t = new ys(t, r);
  let n = !1;
  e: for (const i of e.set) {
    for (const o of t.set) {
      const a = sy(i, o, r);
      if (n = n || a !== null, a)
        continue e;
    }
    if (n)
      return !1;
  }
  return !0;
}, ay = [new Bo(">=0.0.0-0")], vs = [new Bo(">=0.0.0")], sy = (e, t, r) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === Di) {
    if (t.length === 1 && t[0].semver === Di)
      return !0;
    r.includePrerelease ? e = ay : e = vs;
  }
  if (t.length === 1 && t[0].semver === Di) {
    if (r.includePrerelease)
      return !0;
    t = vs;
  }
  const n = /* @__PURE__ */ new Set();
  let i, o;
  for (const g of e)
    g.operator === ">" || g.operator === ">=" ? i = ws(i, g, r) : g.operator === "<" || g.operator === "<=" ? o = _s(o, g, r) : n.add(g.semver);
  if (n.size > 1)
    return null;
  let a;
  if (i && o) {
    if (a = jo(i.semver, o.semver, r), a > 0)
      return null;
    if (a === 0 && (i.operator !== ">=" || o.operator !== "<="))
      return null;
  }
  for (const g of n) {
    if (i && !pr(g, String(i), r) || o && !pr(g, String(o), r))
      return null;
    for (const _ of t)
      if (!pr(g, String(_), r))
        return !1;
    return !0;
  }
  let s, l, m, c, f = o && !r.includePrerelease && o.semver.prerelease.length ? o.semver : !1, h = i && !r.includePrerelease && i.semver.prerelease.length ? i.semver : !1;
  f && f.prerelease.length === 1 && o.operator === "<" && f.prerelease[0] === 0 && (f = !1);
  for (const g of t) {
    if (c = c || g.operator === ">" || g.operator === ">=", m = m || g.operator === "<" || g.operator === "<=", i) {
      if (h && g.semver.prerelease && g.semver.prerelease.length && g.semver.major === h.major && g.semver.minor === h.minor && g.semver.patch === h.patch && (h = !1), g.operator === ">" || g.operator === ">=") {
        if (s = ws(i, g, r), s === g && s !== i)
          return !1;
      } else if (i.operator === ">=" && !pr(i.semver, String(g), r))
        return !1;
    }
    if (o) {
      if (f && g.semver.prerelease && g.semver.prerelease.length && g.semver.major === f.major && g.semver.minor === f.minor && g.semver.patch === f.patch && (f = !1), g.operator === "<" || g.operator === "<=") {
        if (l = _s(o, g, r), l === g && l !== o)
          return !1;
      } else if (o.operator === "<=" && !pr(o.semver, String(g), r))
        return !1;
    }
    if (!g.operator && (o || i) && a !== 0)
      return !1;
  }
  return !(i && m && !o && a !== 0 || o && c && !i && a !== 0 || h || f);
}, ws = (e, t, r) => {
  if (!e)
    return t;
  const n = jo(e.semver, t.semver, r);
  return n > 0 ? e : n < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, _s = (e, t, r) => {
  if (!e)
    return t;
  const n = jo(e.semver, t.semver, r);
  return n < 0 ? e : n > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var ly = oy;
const Fi = Vr, As = Jn, cy = Ie, Ss = nu, uy = or, fy = E0, dy = w0, hy = A0, py = T0, my = b0, gy = R0, Ey = D0, yy = L0, vy = je, wy = B0, _y = q0, Ay = xo, Sy = Y0, Ty = K0, Cy = Zn, $y = Lo, by = iu, Oy = ou, Iy = Uo, Ry = ko, Py = au, Ny = vE, Dy = ei(), Fy = He(), xy = ti, Ly = $E, Uy = RE, ky = FE, My = UE, By = BE, jy = Mo, Hy = KE, qy = ZE, Gy = ty, Vy = iy, Wy = ly;
var lu = {
  parse: uy,
  valid: fy,
  clean: dy,
  inc: hy,
  diff: py,
  major: my,
  minor: gy,
  patch: Ey,
  prerelease: yy,
  compare: vy,
  rcompare: wy,
  compareLoose: _y,
  compareBuild: Ay,
  sort: Sy,
  rsort: Ty,
  gt: Cy,
  lt: $y,
  eq: by,
  neq: Oy,
  gte: Iy,
  lte: Ry,
  cmp: Py,
  coerce: Ny,
  Comparator: Dy,
  Range: Fy,
  satisfies: xy,
  toComparators: Ly,
  maxSatisfying: Uy,
  minSatisfying: ky,
  minVersion: My,
  validRange: By,
  outside: jy,
  gtr: Hy,
  ltr: qy,
  intersects: Gy,
  simplifyRange: Vy,
  subset: Wy,
  SemVer: cy,
  re: Fi.re,
  src: Fi.src,
  tokens: Fi.t,
  SEMVER_SPEC_VERSION: As.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: As.RELEASE_TYPES,
  compareIdentifiers: Ss.compareIdentifiers,
  rcompareIdentifiers: Ss.rcompareIdentifiers
}, Wr = {}, kn = { exports: {} };
kn.exports;
(function(e, t) {
  var r = 200, n = "__lodash_hash_undefined__", i = 1, o = 2, a = 9007199254740991, s = "[object Arguments]", l = "[object Array]", m = "[object AsyncFunction]", c = "[object Boolean]", f = "[object Date]", h = "[object Error]", g = "[object Function]", _ = "[object GeneratorFunction]", y = "[object Map]", A = "[object Number]", T = "[object Null]", S = "[object Object]", D = "[object Promise]", x = "[object Proxy]", Z = "[object RegExp]", ae = "[object Set]", Y = "[object String]", Ne = "[object Symbol]", E = "[object Undefined]", G = "[object WeakMap]", j = "[object ArrayBuffer]", M = "[object DataView]", X = "[object Float32Array]", I = "[object Float64Array]", b = "[object Int8Array]", P = "[object Int16Array]", $ = "[object Int32Array]", N = "[object Uint8Array]", R = "[object Uint8ClampedArray]", k = "[object Uint16Array]", V = "[object Uint32Array]", H = /[\\^$.*+?()[\]{}|]/g, K = /^\[object .+?Constructor\]$/, ue = /^(?:0|[1-9]\d*)$/, U = {};
  U[X] = U[I] = U[b] = U[P] = U[$] = U[N] = U[R] = U[k] = U[V] = !0, U[s] = U[l] = U[j] = U[c] = U[M] = U[f] = U[h] = U[g] = U[y] = U[A] = U[S] = U[Z] = U[ae] = U[Y] = U[G] = !1;
  var qe = typeof Se == "object" && Se && Se.Object === Object && Se, d = typeof self == "object" && self && self.Object === Object && self, u = qe || d || Function("return this")(), C = t && !t.nodeType && t, w = C && !0 && e && !e.nodeType && e, z = w && w.exports === C, ee = z && qe.process, ie = function() {
    try {
      return ee && ee.binding && ee.binding("util");
    } catch {
    }
  }(), pe = ie && ie.isTypedArray;
  function ye(p, v) {
    for (var O = -1, F = p == null ? 0 : p.length, Q = 0, q = []; ++O < F; ) {
      var oe = p[O];
      v(oe, O, p) && (q[Q++] = oe);
    }
    return q;
  }
  function et(p, v) {
    for (var O = -1, F = v.length, Q = p.length; ++O < F; )
      p[Q + O] = v[O];
    return p;
  }
  function le(p, v) {
    for (var O = -1, F = p == null ? 0 : p.length; ++O < F; )
      if (v(p[O], O, p))
        return !0;
    return !1;
  }
  function Ue(p, v) {
    for (var O = -1, F = Array(p); ++O < p; )
      F[O] = v(O);
    return F;
  }
  function ui(p) {
    return function(v) {
      return p(v);
    };
  }
  function Kr(p, v) {
    return p.has(v);
  }
  function sr(p, v) {
    return p == null ? void 0 : p[v];
  }
  function Jr(p) {
    var v = -1, O = Array(p.size);
    return p.forEach(function(F, Q) {
      O[++v] = [Q, F];
    }), O;
  }
  function _u(p, v) {
    return function(O) {
      return p(v(O));
    };
  }
  function Au(p) {
    var v = -1, O = Array(p.size);
    return p.forEach(function(F) {
      O[++v] = F;
    }), O;
  }
  var Su = Array.prototype, Tu = Function.prototype, Qr = Object.prototype, fi = u["__core-js_shared__"], Wo = Tu.toString, Ge = Qr.hasOwnProperty, Yo = function() {
    var p = /[^.]+$/.exec(fi && fi.keys && fi.keys.IE_PROTO || "");
    return p ? "Symbol(src)_1." + p : "";
  }(), zo = Qr.toString, Cu = RegExp(
    "^" + Wo.call(Ge).replace(H, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), Xo = z ? u.Buffer : void 0, Zr = u.Symbol, Ko = u.Uint8Array, Jo = Qr.propertyIsEnumerable, $u = Su.splice, vt = Zr ? Zr.toStringTag : void 0, Qo = Object.getOwnPropertySymbols, bu = Xo ? Xo.isBuffer : void 0, Ou = _u(Object.keys, Object), di = Lt(u, "DataView"), lr = Lt(u, "Map"), hi = Lt(u, "Promise"), pi = Lt(u, "Set"), mi = Lt(u, "WeakMap"), cr = Lt(Object, "create"), Iu = At(di), Ru = At(lr), Pu = At(hi), Nu = At(pi), Du = At(mi), Zo = Zr ? Zr.prototype : void 0, gi = Zo ? Zo.valueOf : void 0;
  function wt(p) {
    var v = -1, O = p == null ? 0 : p.length;
    for (this.clear(); ++v < O; ) {
      var F = p[v];
      this.set(F[0], F[1]);
    }
  }
  function Fu() {
    this.__data__ = cr ? cr(null) : {}, this.size = 0;
  }
  function xu(p) {
    var v = this.has(p) && delete this.__data__[p];
    return this.size -= v ? 1 : 0, v;
  }
  function Lu(p) {
    var v = this.__data__;
    if (cr) {
      var O = v[p];
      return O === n ? void 0 : O;
    }
    return Ge.call(v, p) ? v[p] : void 0;
  }
  function Uu(p) {
    var v = this.__data__;
    return cr ? v[p] !== void 0 : Ge.call(v, p);
  }
  function ku(p, v) {
    var O = this.__data__;
    return this.size += this.has(p) ? 0 : 1, O[p] = cr && v === void 0 ? n : v, this;
  }
  wt.prototype.clear = Fu, wt.prototype.delete = xu, wt.prototype.get = Lu, wt.prototype.has = Uu, wt.prototype.set = ku;
  function ze(p) {
    var v = -1, O = p == null ? 0 : p.length;
    for (this.clear(); ++v < O; ) {
      var F = p[v];
      this.set(F[0], F[1]);
    }
  }
  function Mu() {
    this.__data__ = [], this.size = 0;
  }
  function Bu(p) {
    var v = this.__data__, O = tn(v, p);
    if (O < 0)
      return !1;
    var F = v.length - 1;
    return O == F ? v.pop() : $u.call(v, O, 1), --this.size, !0;
  }
  function ju(p) {
    var v = this.__data__, O = tn(v, p);
    return O < 0 ? void 0 : v[O][1];
  }
  function Hu(p) {
    return tn(this.__data__, p) > -1;
  }
  function qu(p, v) {
    var O = this.__data__, F = tn(O, p);
    return F < 0 ? (++this.size, O.push([p, v])) : O[F][1] = v, this;
  }
  ze.prototype.clear = Mu, ze.prototype.delete = Bu, ze.prototype.get = ju, ze.prototype.has = Hu, ze.prototype.set = qu;
  function _t(p) {
    var v = -1, O = p == null ? 0 : p.length;
    for (this.clear(); ++v < O; ) {
      var F = p[v];
      this.set(F[0], F[1]);
    }
  }
  function Gu() {
    this.size = 0, this.__data__ = {
      hash: new wt(),
      map: new (lr || ze)(),
      string: new wt()
    };
  }
  function Vu(p) {
    var v = rn(this, p).delete(p);
    return this.size -= v ? 1 : 0, v;
  }
  function Wu(p) {
    return rn(this, p).get(p);
  }
  function Yu(p) {
    return rn(this, p).has(p);
  }
  function zu(p, v) {
    var O = rn(this, p), F = O.size;
    return O.set(p, v), this.size += O.size == F ? 0 : 1, this;
  }
  _t.prototype.clear = Gu, _t.prototype.delete = Vu, _t.prototype.get = Wu, _t.prototype.has = Yu, _t.prototype.set = zu;
  function en(p) {
    var v = -1, O = p == null ? 0 : p.length;
    for (this.__data__ = new _t(); ++v < O; )
      this.add(p[v]);
  }
  function Xu(p) {
    return this.__data__.set(p, n), this;
  }
  function Ku(p) {
    return this.__data__.has(p);
  }
  en.prototype.add = en.prototype.push = Xu, en.prototype.has = Ku;
  function tt(p) {
    var v = this.__data__ = new ze(p);
    this.size = v.size;
  }
  function Ju() {
    this.__data__ = new ze(), this.size = 0;
  }
  function Qu(p) {
    var v = this.__data__, O = v.delete(p);
    return this.size = v.size, O;
  }
  function Zu(p) {
    return this.__data__.get(p);
  }
  function ef(p) {
    return this.__data__.has(p);
  }
  function tf(p, v) {
    var O = this.__data__;
    if (O instanceof ze) {
      var F = O.__data__;
      if (!lr || F.length < r - 1)
        return F.push([p, v]), this.size = ++O.size, this;
      O = this.__data__ = new _t(F);
    }
    return O.set(p, v), this.size = O.size, this;
  }
  tt.prototype.clear = Ju, tt.prototype.delete = Qu, tt.prototype.get = Zu, tt.prototype.has = ef, tt.prototype.set = tf;
  function rf(p, v) {
    var O = nn(p), F = !O && yf(p), Q = !O && !F && Ei(p), q = !O && !F && !Q && la(p), oe = O || F || Q || q, fe = oe ? Ue(p.length, String) : [], me = fe.length;
    for (var te in p)
      Ge.call(p, te) && !(oe && // Safari 9 has enumerable `arguments.length` in strict mode.
      (te == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      Q && (te == "offset" || te == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      q && (te == "buffer" || te == "byteLength" || te == "byteOffset") || // Skip index properties.
      hf(te, me))) && fe.push(te);
    return fe;
  }
  function tn(p, v) {
    for (var O = p.length; O--; )
      if (ia(p[O][0], v))
        return O;
    return -1;
  }
  function nf(p, v, O) {
    var F = v(p);
    return nn(p) ? F : et(F, O(p));
  }
  function ur(p) {
    return p == null ? p === void 0 ? E : T : vt && vt in Object(p) ? ff(p) : Ef(p);
  }
  function ea(p) {
    return fr(p) && ur(p) == s;
  }
  function ta(p, v, O, F, Q) {
    return p === v ? !0 : p == null || v == null || !fr(p) && !fr(v) ? p !== p && v !== v : of(p, v, O, F, ta, Q);
  }
  function of(p, v, O, F, Q, q) {
    var oe = nn(p), fe = nn(v), me = oe ? l : rt(p), te = fe ? l : rt(v);
    me = me == s ? S : me, te = te == s ? S : te;
    var De = me == S, ke = te == S, ve = me == te;
    if (ve && Ei(p)) {
      if (!Ei(v))
        return !1;
      oe = !0, De = !1;
    }
    if (ve && !De)
      return q || (q = new tt()), oe || la(p) ? ra(p, v, O, F, Q, q) : cf(p, v, me, O, F, Q, q);
    if (!(O & i)) {
      var Fe = De && Ge.call(p, "__wrapped__"), xe = ke && Ge.call(v, "__wrapped__");
      if (Fe || xe) {
        var nt = Fe ? p.value() : p, Xe = xe ? v.value() : v;
        return q || (q = new tt()), Q(nt, Xe, O, F, q);
      }
    }
    return ve ? (q || (q = new tt()), uf(p, v, O, F, Q, q)) : !1;
  }
  function af(p) {
    if (!sa(p) || mf(p))
      return !1;
    var v = oa(p) ? Cu : K;
    return v.test(At(p));
  }
  function sf(p) {
    return fr(p) && aa(p.length) && !!U[ur(p)];
  }
  function lf(p) {
    if (!gf(p))
      return Ou(p);
    var v = [];
    for (var O in Object(p))
      Ge.call(p, O) && O != "constructor" && v.push(O);
    return v;
  }
  function ra(p, v, O, F, Q, q) {
    var oe = O & i, fe = p.length, me = v.length;
    if (fe != me && !(oe && me > fe))
      return !1;
    var te = q.get(p);
    if (te && q.get(v))
      return te == v;
    var De = -1, ke = !0, ve = O & o ? new en() : void 0;
    for (q.set(p, v), q.set(v, p); ++De < fe; ) {
      var Fe = p[De], xe = v[De];
      if (F)
        var nt = oe ? F(xe, Fe, De, v, p, q) : F(Fe, xe, De, p, v, q);
      if (nt !== void 0) {
        if (nt)
          continue;
        ke = !1;
        break;
      }
      if (ve) {
        if (!le(v, function(Xe, St) {
          if (!Kr(ve, St) && (Fe === Xe || Q(Fe, Xe, O, F, q)))
            return ve.push(St);
        })) {
          ke = !1;
          break;
        }
      } else if (!(Fe === xe || Q(Fe, xe, O, F, q))) {
        ke = !1;
        break;
      }
    }
    return q.delete(p), q.delete(v), ke;
  }
  function cf(p, v, O, F, Q, q, oe) {
    switch (O) {
      case M:
        if (p.byteLength != v.byteLength || p.byteOffset != v.byteOffset)
          return !1;
        p = p.buffer, v = v.buffer;
      case j:
        return !(p.byteLength != v.byteLength || !q(new Ko(p), new Ko(v)));
      case c:
      case f:
      case A:
        return ia(+p, +v);
      case h:
        return p.name == v.name && p.message == v.message;
      case Z:
      case Y:
        return p == v + "";
      case y:
        var fe = Jr;
      case ae:
        var me = F & i;
        if (fe || (fe = Au), p.size != v.size && !me)
          return !1;
        var te = oe.get(p);
        if (te)
          return te == v;
        F |= o, oe.set(p, v);
        var De = ra(fe(p), fe(v), F, Q, q, oe);
        return oe.delete(p), De;
      case Ne:
        if (gi)
          return gi.call(p) == gi.call(v);
    }
    return !1;
  }
  function uf(p, v, O, F, Q, q) {
    var oe = O & i, fe = na(p), me = fe.length, te = na(v), De = te.length;
    if (me != De && !oe)
      return !1;
    for (var ke = me; ke--; ) {
      var ve = fe[ke];
      if (!(oe ? ve in v : Ge.call(v, ve)))
        return !1;
    }
    var Fe = q.get(p);
    if (Fe && q.get(v))
      return Fe == v;
    var xe = !0;
    q.set(p, v), q.set(v, p);
    for (var nt = oe; ++ke < me; ) {
      ve = fe[ke];
      var Xe = p[ve], St = v[ve];
      if (F)
        var ca = oe ? F(St, Xe, ve, v, p, q) : F(Xe, St, ve, p, v, q);
      if (!(ca === void 0 ? Xe === St || Q(Xe, St, O, F, q) : ca)) {
        xe = !1;
        break;
      }
      nt || (nt = ve == "constructor");
    }
    if (xe && !nt) {
      var on = p.constructor, an = v.constructor;
      on != an && "constructor" in p && "constructor" in v && !(typeof on == "function" && on instanceof on && typeof an == "function" && an instanceof an) && (xe = !1);
    }
    return q.delete(p), q.delete(v), xe;
  }
  function na(p) {
    return nf(p, _f, df);
  }
  function rn(p, v) {
    var O = p.__data__;
    return pf(v) ? O[typeof v == "string" ? "string" : "hash"] : O.map;
  }
  function Lt(p, v) {
    var O = sr(p, v);
    return af(O) ? O : void 0;
  }
  function ff(p) {
    var v = Ge.call(p, vt), O = p[vt];
    try {
      p[vt] = void 0;
      var F = !0;
    } catch {
    }
    var Q = zo.call(p);
    return F && (v ? p[vt] = O : delete p[vt]), Q;
  }
  var df = Qo ? function(p) {
    return p == null ? [] : (p = Object(p), ye(Qo(p), function(v) {
      return Jo.call(p, v);
    }));
  } : Af, rt = ur;
  (di && rt(new di(new ArrayBuffer(1))) != M || lr && rt(new lr()) != y || hi && rt(hi.resolve()) != D || pi && rt(new pi()) != ae || mi && rt(new mi()) != G) && (rt = function(p) {
    var v = ur(p), O = v == S ? p.constructor : void 0, F = O ? At(O) : "";
    if (F)
      switch (F) {
        case Iu:
          return M;
        case Ru:
          return y;
        case Pu:
          return D;
        case Nu:
          return ae;
        case Du:
          return G;
      }
    return v;
  });
  function hf(p, v) {
    return v = v ?? a, !!v && (typeof p == "number" || ue.test(p)) && p > -1 && p % 1 == 0 && p < v;
  }
  function pf(p) {
    var v = typeof p;
    return v == "string" || v == "number" || v == "symbol" || v == "boolean" ? p !== "__proto__" : p === null;
  }
  function mf(p) {
    return !!Yo && Yo in p;
  }
  function gf(p) {
    var v = p && p.constructor, O = typeof v == "function" && v.prototype || Qr;
    return p === O;
  }
  function Ef(p) {
    return zo.call(p);
  }
  function At(p) {
    if (p != null) {
      try {
        return Wo.call(p);
      } catch {
      }
      try {
        return p + "";
      } catch {
      }
    }
    return "";
  }
  function ia(p, v) {
    return p === v || p !== p && v !== v;
  }
  var yf = ea(/* @__PURE__ */ function() {
    return arguments;
  }()) ? ea : function(p) {
    return fr(p) && Ge.call(p, "callee") && !Jo.call(p, "callee");
  }, nn = Array.isArray;
  function vf(p) {
    return p != null && aa(p.length) && !oa(p);
  }
  var Ei = bu || Sf;
  function wf(p, v) {
    return ta(p, v);
  }
  function oa(p) {
    if (!sa(p))
      return !1;
    var v = ur(p);
    return v == g || v == _ || v == m || v == x;
  }
  function aa(p) {
    return typeof p == "number" && p > -1 && p % 1 == 0 && p <= a;
  }
  function sa(p) {
    var v = typeof p;
    return p != null && (v == "object" || v == "function");
  }
  function fr(p) {
    return p != null && typeof p == "object";
  }
  var la = pe ? ui(pe) : sf;
  function _f(p) {
    return vf(p) ? rf(p) : lf(p);
  }
  function Af() {
    return [];
  }
  function Sf() {
    return !1;
  }
  e.exports = wf;
})(kn, kn.exports);
var Yy = kn.exports;
Object.defineProperty(Wr, "__esModule", { value: !0 });
Wr.DownloadedUpdateHelper = void 0;
Wr.createTempUpdateFile = Qy;
const zy = Mr, Xy = gt, Ts = Yy, Ct = Et, Ar = ne;
class Ky {
  constructor(t) {
    this.cacheDir = t, this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, this._downloadedFileInfo = null;
  }
  get downloadedFileInfo() {
    return this._downloadedFileInfo;
  }
  get file() {
    return this._file;
  }
  get packageFile() {
    return this._packageFile;
  }
  get cacheDirForPendingUpdate() {
    return Ar.join(this.cacheDir, "pending");
  }
  async validateDownloadedPath(t, r, n, i) {
    if (this.versionInfo != null && this.file === t && this.fileInfo != null)
      return Ts(this.versionInfo, r) && Ts(this.fileInfo.info, n.info) && await (0, Ct.pathExists)(t) ? t : null;
    const o = await this.getValidCachedUpdateFile(n, i);
    return o === null ? null : (i.info(`Update has already been downloaded to ${t}).`), this._file = o, o);
  }
  async setDownloadedFile(t, r, n, i, o, a) {
    this._file = t, this._packageFile = r, this.versionInfo = n, this.fileInfo = i, this._downloadedFileInfo = {
      fileName: o,
      sha512: i.info.sha512,
      isAdminRightsRequired: i.info.isAdminRightsRequired === !0
    }, a && await (0, Ct.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo);
  }
  async clear() {
    this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, await this.cleanCacheDirForPendingUpdate();
  }
  async cleanCacheDirForPendingUpdate() {
    try {
      await (0, Ct.emptyDir)(this.cacheDirForPendingUpdate);
    } catch {
    }
  }
  /**
   * Returns "update-info.json" which is created in the update cache directory's "pending" subfolder after the first update is downloaded.  If the update file does not exist then the cache is cleared and recreated.  If the update file exists then its properties are validated.
   * @param fileInfo
   * @param logger
   */
  async getValidCachedUpdateFile(t, r) {
    const n = this.getUpdateInfoFile();
    if (!await (0, Ct.pathExists)(n))
      return null;
    let o;
    try {
      o = await (0, Ct.readJson)(n);
    } catch (m) {
      let c = "No cached update info available";
      return m.code !== "ENOENT" && (await this.cleanCacheDirForPendingUpdate(), c += ` (error on read: ${m.message})`), r.info(c), null;
    }
    if (!((o == null ? void 0 : o.fileName) !== null))
      return r.warn("Cached update info is corrupted: no fileName, directory for cached update will be cleaned"), await this.cleanCacheDirForPendingUpdate(), null;
    if (t.info.sha512 !== o.sha512)
      return r.info(`Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${o.sha512}, expected: ${t.info.sha512}. Directory for cached update will be cleaned`), await this.cleanCacheDirForPendingUpdate(), null;
    const s = Ar.join(this.cacheDirForPendingUpdate, o.fileName);
    if (!await (0, Ct.pathExists)(s))
      return r.info("Cached update file doesn't exist"), null;
    const l = await Jy(s);
    return t.info.sha512 !== l ? (r.warn(`Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${l}, expected: ${t.info.sha512}`), await this.cleanCacheDirForPendingUpdate(), null) : (this._downloadedFileInfo = o, s);
  }
  getUpdateInfoFile() {
    return Ar.join(this.cacheDirForPendingUpdate, "update-info.json");
  }
}
Wr.DownloadedUpdateHelper = Ky;
function Jy(e, t = "sha512", r = "base64", n) {
  return new Promise((i, o) => {
    const a = (0, zy.createHash)(t);
    a.on("error", o).setEncoding(r), (0, Xy.createReadStream)(e, {
      ...n,
      highWaterMark: 1024 * 1024
      /* better to use more memory but hash faster */
    }).on("error", o).on("end", () => {
      a.end(), i(a.read());
    }).pipe(a, { end: !1 });
  });
}
async function Qy(e, t, r) {
  let n = 0, i = Ar.join(t, e);
  for (let o = 0; o < 3; o++)
    try {
      return await (0, Ct.unlink)(i), i;
    } catch (a) {
      if (a.code === "ENOENT")
        return i;
      r.warn(`Error on remove temp update file: ${a}`), i = Ar.join(t, `${n++}-${e}`);
    }
  return i;
}
var ri = {}, Ho = {};
Object.defineProperty(Ho, "__esModule", { value: !0 });
Ho.getAppCacheDir = ev;
const xi = ne, Zy = jn;
function ev() {
  const e = (0, Zy.homedir)();
  let t;
  return process.platform === "win32" ? t = process.env.LOCALAPPDATA || xi.join(e, "AppData", "Local") : process.platform === "darwin" ? t = xi.join(e, "Library", "Caches") : t = process.env.XDG_CACHE_HOME || xi.join(e, ".cache"), t;
}
Object.defineProperty(ri, "__esModule", { value: !0 });
ri.ElectronAppAdapter = void 0;
const Cs = ne, tv = Ho;
class rv {
  constructor(t = Pt.app) {
    this.app = t;
  }
  whenReady() {
    return this.app.whenReady();
  }
  get version() {
    return this.app.getVersion();
  }
  get name() {
    return this.app.getName();
  }
  get isPackaged() {
    return this.app.isPackaged === !0;
  }
  get appUpdateConfigPath() {
    return this.isPackaged ? Cs.join(process.resourcesPath, "app-update.yml") : Cs.join(this.app.getAppPath(), "dev-app-update.yml");
  }
  get userDataPath() {
    return this.app.getPath("userData");
  }
  get baseCachePath() {
    return (0, tv.getAppCacheDir)();
  }
  quit() {
    this.app.quit();
  }
  relaunch() {
    this.app.relaunch();
  }
  onQuit(t) {
    this.app.once("quit", (r, n) => t(n));
  }
}
ri.ElectronAppAdapter = rv;
var cu = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ElectronHttpExecutor = e.NET_SESSION_NAME = void 0, e.getNetSession = r;
  const t = he;
  e.NET_SESSION_NAME = "electron-updater";
  function r() {
    return Pt.session.fromPartition(e.NET_SESSION_NAME, {
      cache: !1
    });
  }
  class n extends t.HttpExecutor {
    constructor(o) {
      super(), this.proxyLoginCallback = o, this.cachedSession = null;
    }
    async download(o, a, s) {
      return await s.cancellationToken.createPromise((l, m, c) => {
        const f = {
          headers: s.headers || void 0,
          redirect: "manual"
        };
        (0, t.configureRequestUrl)(o, f), (0, t.configureRequestOptions)(f), this.doDownload(f, {
          destination: a,
          options: s,
          onCancel: c,
          callback: (h) => {
            h == null ? l(a) : m(h);
          },
          responseHandler: null
        }, 0);
      });
    }
    createRequest(o, a) {
      o.headers && o.headers.Host && (o.host = o.headers.Host, delete o.headers.Host), this.cachedSession == null && (this.cachedSession = r());
      const s = Pt.net.request({
        ...o,
        session: this.cachedSession
      });
      return s.on("response", a), this.proxyLoginCallback != null && s.on("login", this.proxyLoginCallback), s;
    }
    addRedirectHandlers(o, a, s, l, m) {
      o.on("redirect", (c, f, h) => {
        o.abort(), l > this.maxRedirects ? s(this.createMaxRedirectError()) : m(t.HttpExecutor.prepareRedirectUrlOptions(h, a));
      });
    }
  }
  e.ElectronHttpExecutor = n;
})(cu);
var Yr = {}, Le = {}, nv = "[object Symbol]", uu = /[\\^$.*+?()[\]{}|]/g, iv = RegExp(uu.source), ov = typeof Se == "object" && Se && Se.Object === Object && Se, av = typeof self == "object" && self && self.Object === Object && self, sv = ov || av || Function("return this")(), lv = Object.prototype, cv = lv.toString, $s = sv.Symbol, bs = $s ? $s.prototype : void 0, Os = bs ? bs.toString : void 0;
function uv(e) {
  if (typeof e == "string")
    return e;
  if (dv(e))
    return Os ? Os.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function fv(e) {
  return !!e && typeof e == "object";
}
function dv(e) {
  return typeof e == "symbol" || fv(e) && cv.call(e) == nv;
}
function hv(e) {
  return e == null ? "" : uv(e);
}
function pv(e) {
  return e = hv(e), e && iv.test(e) ? e.replace(uu, "\\$&") : e;
}
var mv = pv;
Object.defineProperty(Le, "__esModule", { value: !0 });
Le.newBaseUrl = Ev;
Le.newUrlFromBase = ao;
Le.getChannelFilename = yv;
Le.blockmapFiles = vv;
const fu = rr, gv = mv;
function Ev(e) {
  const t = new fu.URL(e);
  return t.pathname.endsWith("/") || (t.pathname += "/"), t;
}
function ao(e, t, r = !1) {
  const n = new fu.URL(e, t), i = t.search;
  return i != null && i.length !== 0 ? n.search = i : r && (n.search = `noCache=${Date.now().toString(32)}`), n;
}
function yv(e) {
  return `${e}.yml`;
}
function vv(e, t, r) {
  const n = ao(`${e.pathname}.blockmap`, e);
  return [ao(`${e.pathname.replace(new RegExp(gv(r), "g"), t)}.blockmap`, e), n];
}
var ce = {};
Object.defineProperty(ce, "__esModule", { value: !0 });
ce.Provider = void 0;
ce.findFile = Av;
ce.parseUpdateInfo = Sv;
ce.getFileList = du;
ce.resolveFiles = Tv;
const pt = he, wv = Ee, Is = Le;
class _v {
  constructor(t) {
    this.runtimeOptions = t, this.requestHeaders = null, this.executor = t.executor;
  }
  get isUseMultipleRangeRequest() {
    return this.runtimeOptions.isUseMultipleRangeRequest !== !1;
  }
  getChannelFilePrefix() {
    if (this.runtimeOptions.platform === "linux") {
      const t = process.env.TEST_UPDATER_ARCH || process.arch;
      return "-linux" + (t === "x64" ? "" : `-${t}`);
    } else
      return this.runtimeOptions.platform === "darwin" ? "-mac" : "";
  }
  // due to historical reasons for windows we use channel name without platform specifier
  getDefaultChannelName() {
    return this.getCustomChannelName("latest");
  }
  getCustomChannelName(t) {
    return `${t}${this.getChannelFilePrefix()}`;
  }
  get fileExtraDownloadHeaders() {
    return null;
  }
  setRequestHeaders(t) {
    this.requestHeaders = t;
  }
  /**
   * Method to perform API request only to resolve update info, but not to download update.
   */
  httpRequest(t, r, n) {
    return this.executor.request(this.createRequestOptions(t, r), n);
  }
  createRequestOptions(t, r) {
    const n = {};
    return this.requestHeaders == null ? r != null && (n.headers = r) : n.headers = r == null ? this.requestHeaders : { ...this.requestHeaders, ...r }, (0, pt.configureRequestUrl)(t, n), n;
  }
}
ce.Provider = _v;
function Av(e, t, r) {
  if (e.length === 0)
    throw (0, pt.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
  const n = e.find((i) => i.url.pathname.toLowerCase().endsWith(`.${t}`));
  return n ?? (r == null ? e[0] : e.find((i) => !r.some((o) => i.url.pathname.toLowerCase().endsWith(`.${o}`))));
}
function Sv(e, t, r) {
  if (e == null)
    throw (0, pt.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${r}): rawData: null`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  let n;
  try {
    n = (0, wv.load)(e);
  } catch (i) {
    throw (0, pt.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${r}): ${i.stack || i.message}, rawData: ${e}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  }
  return n;
}
function du(e) {
  const t = e.files;
  if (t != null && t.length > 0)
    return t;
  if (e.path != null)
    return [
      {
        url: e.path,
        sha2: e.sha2,
        sha512: e.sha512
      }
    ];
  throw (0, pt.newError)(`No files provided: ${(0, pt.safeStringifyJson)(e)}`, "ERR_UPDATER_NO_FILES_PROVIDED");
}
function Tv(e, t, r = (n) => n) {
  const i = du(e).map((s) => {
    if (s.sha2 == null && s.sha512 == null)
      throw (0, pt.newError)(`Update info doesn't contain nor sha256 neither sha512 checksum: ${(0, pt.safeStringifyJson)(s)}`, "ERR_UPDATER_NO_CHECKSUM");
    return {
      url: (0, Is.newUrlFromBase)(r(s.url), t),
      info: s
    };
  }), o = e.packages, a = o == null ? null : o[process.arch] || o.ia32;
  return a != null && (i[0].packageInfo = {
    ...a,
    path: (0, Is.newUrlFromBase)(r(a.path), t).href
  }), i;
}
Object.defineProperty(Yr, "__esModule", { value: !0 });
Yr.GenericProvider = void 0;
const Rs = he, Li = Le, Ui = ce;
class Cv extends Ui.Provider {
  constructor(t, r, n) {
    super(n), this.configuration = t, this.updater = r, this.baseUrl = (0, Li.newBaseUrl)(this.configuration.url);
  }
  get channel() {
    const t = this.updater.channel || this.configuration.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    const t = (0, Li.getChannelFilename)(this.channel), r = (0, Li.newUrlFromBase)(t, this.baseUrl, this.updater.isAddNoCacheQuery);
    for (let n = 0; ; n++)
      try {
        return (0, Ui.parseUpdateInfo)(await this.httpRequest(r), t, r);
      } catch (i) {
        if (i instanceof Rs.HttpError && i.statusCode === 404)
          throw (0, Rs.newError)(`Cannot find channel "${t}" update info: ${i.stack || i.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
        if (i.code === "ECONNREFUSED" && n < 3) {
          await new Promise((o, a) => {
            try {
              setTimeout(o, 1e3 * n);
            } catch (s) {
              a(s);
            }
          });
          continue;
        }
        throw i;
      }
  }
  resolveFiles(t) {
    return (0, Ui.resolveFiles)(t, this.baseUrl);
  }
}
Yr.GenericProvider = Cv;
var ni = {}, ii = {};
Object.defineProperty(ii, "__esModule", { value: !0 });
ii.BitbucketProvider = void 0;
const Ps = he, ki = Le, Mi = ce;
class $v extends Mi.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = r;
    const { owner: i, slug: o } = t;
    this.baseUrl = (0, ki.newBaseUrl)(`https://api.bitbucket.org/2.0/repositories/${i}/${o}/downloads`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "latest";
  }
  async getLatestVersion() {
    const t = new Ps.CancellationToken(), r = (0, ki.getChannelFilename)(this.getCustomChannelName(this.channel)), n = (0, ki.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(n, void 0, t);
      return (0, Mi.parseUpdateInfo)(i, r, n);
    } catch (i) {
      throw (0, Ps.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, Mi.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { owner: t, slug: r } = this.configuration;
    return `Bitbucket (owner: ${t}, slug: ${r}, channel: ${this.channel})`;
  }
}
ii.BitbucketProvider = $v;
var mt = {};
Object.defineProperty(mt, "__esModule", { value: !0 });
mt.GitHubProvider = mt.BaseGitHubProvider = void 0;
mt.computeReleaseNotes = pu;
const Ke = he, Yt = lu, bv = rr, zt = Le, so = ce, Bi = /\/tag\/([^/]+)$/;
class hu extends so.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      /* because GitHib uses S3 */
      isUseMultipleRangeRequest: !1
    }), this.options = t, this.baseUrl = (0, zt.newBaseUrl)((0, Ke.githubUrl)(t, r));
    const i = r === "github.com" ? "api.github.com" : r;
    this.baseApiUrl = (0, zt.newBaseUrl)((0, Ke.githubUrl)(t, i));
  }
  computeGithubBasePath(t) {
    const r = this.options.host;
    return r && !["github.com", "api.github.com"].includes(r) ? `/api/v3${t}` : t;
  }
}
mt.BaseGitHubProvider = hu;
class Ov extends hu {
  constructor(t, r, n) {
    super(t, "github.com", n), this.options = t, this.updater = r;
  }
  get channel() {
    const t = this.updater.channel || this.options.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    var t, r, n, i, o;
    const a = new Ke.CancellationToken(), s = await this.httpRequest((0, zt.newUrlFromBase)(`${this.basePath}.atom`, this.baseUrl), {
      accept: "application/xml, application/atom+xml, text/xml, */*"
    }, a), l = (0, Ke.parseXml)(s);
    let m = l.element("entry", !1, "No published versions on GitHub"), c = null;
    try {
      if (this.updater.allowPrerelease) {
        const A = ((t = this.updater) === null || t === void 0 ? void 0 : t.channel) || ((r = Yt.prerelease(this.updater.currentVersion)) === null || r === void 0 ? void 0 : r[0]) || null;
        if (A === null)
          c = Bi.exec(m.element("link").attribute("href"))[1];
        else
          for (const T of l.getElements("entry")) {
            const S = Bi.exec(T.element("link").attribute("href"));
            if (S === null)
              continue;
            const D = S[1], x = ((n = Yt.prerelease(D)) === null || n === void 0 ? void 0 : n[0]) || null, Z = !A || ["alpha", "beta"].includes(A), ae = x !== null && !["alpha", "beta"].includes(String(x));
            if (Z && !ae && !(A === "beta" && x === "alpha")) {
              c = D;
              break;
            }
            if (x && x === A) {
              c = D;
              break;
            }
          }
      } else {
        c = await this.getLatestTagName(a);
        for (const A of l.getElements("entry"))
          if (Bi.exec(A.element("link").attribute("href"))[1] === c) {
            m = A;
            break;
          }
      }
    } catch (A) {
      throw (0, Ke.newError)(`Cannot parse releases feed: ${A.stack || A.message},
XML:
${s}`, "ERR_UPDATER_INVALID_RELEASE_FEED");
    }
    if (c == null)
      throw (0, Ke.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
    let f, h = "", g = "";
    const _ = async (A) => {
      h = (0, zt.getChannelFilename)(A), g = (0, zt.newUrlFromBase)(this.getBaseDownloadPath(String(c), h), this.baseUrl);
      const T = this.createRequestOptions(g);
      try {
        return await this.executor.request(T, a);
      } catch (S) {
        throw S instanceof Ke.HttpError && S.statusCode === 404 ? (0, Ke.newError)(`Cannot find ${h} in the latest release artifacts (${g}): ${S.stack || S.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : S;
      }
    };
    try {
      let A = this.channel;
      this.updater.allowPrerelease && (!((i = Yt.prerelease(c)) === null || i === void 0) && i[0]) && (A = this.getCustomChannelName(String((o = Yt.prerelease(c)) === null || o === void 0 ? void 0 : o[0]))), f = await _(A);
    } catch (A) {
      if (this.updater.allowPrerelease)
        f = await _(this.getDefaultChannelName());
      else
        throw A;
    }
    const y = (0, so.parseUpdateInfo)(f, h, g);
    return y.releaseName == null && (y.releaseName = m.elementValueOrEmpty("title")), y.releaseNotes == null && (y.releaseNotes = pu(this.updater.currentVersion, this.updater.fullChangelog, l, m)), {
      tag: c,
      ...y
    };
  }
  async getLatestTagName(t) {
    const r = this.options, n = r.host == null || r.host === "github.com" ? (0, zt.newUrlFromBase)(`${this.basePath}/latest`, this.baseUrl) : new bv.URL(`${this.computeGithubBasePath(`/repos/${r.owner}/${r.repo}/releases`)}/latest`, this.baseApiUrl);
    try {
      const i = await this.httpRequest(n, { Accept: "application/json" }, t);
      return i == null ? null : JSON.parse(i).tag_name;
    } catch (i) {
      throw (0, Ke.newError)(`Unable to find latest version on GitHub (${n}), please ensure a production release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return `/${this.options.owner}/${this.options.repo}/releases`;
  }
  resolveFiles(t) {
    return (0, so.resolveFiles)(t, this.baseUrl, (r) => this.getBaseDownloadPath(t.tag, r.replace(/ /g, "-")));
  }
  getBaseDownloadPath(t, r) {
    return `${this.basePath}/download/${t}/${r}`;
  }
}
mt.GitHubProvider = Ov;
function Ns(e) {
  const t = e.elementValueOrEmpty("content");
  return t === "No content." ? "" : t;
}
function pu(e, t, r, n) {
  if (!t)
    return Ns(n);
  const i = [];
  for (const o of r.getElements("entry")) {
    const a = /\/tag\/v?([^/]+)$/.exec(o.element("link").attribute("href"))[1];
    Yt.lt(e, a) && i.push({
      version: a,
      note: Ns(o)
    });
  }
  return i.sort((o, a) => Yt.rcompare(o.version, a.version));
}
var oi = {};
Object.defineProperty(oi, "__esModule", { value: !0 });
oi.KeygenProvider = void 0;
const Ds = he, ji = Le, Hi = ce;
class Iv extends Hi.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = r, this.defaultHostname = "api.keygen.sh";
    const i = this.configuration.host || this.defaultHostname;
    this.baseUrl = (0, ji.newBaseUrl)(`https://${i}/v1/accounts/${this.configuration.account}/artifacts?product=${this.configuration.product}`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "stable";
  }
  async getLatestVersion() {
    const t = new Ds.CancellationToken(), r = (0, ji.getChannelFilename)(this.getCustomChannelName(this.channel)), n = (0, ji.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(n, {
        Accept: "application/vnd.api+json",
        "Keygen-Version": "1.1"
      }, t);
      return (0, Hi.parseUpdateInfo)(i, r, n);
    } catch (i) {
      throw (0, Ds.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, Hi.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { account: t, product: r, platform: n } = this.configuration;
    return `Keygen (account: ${t}, product: ${r}, platform: ${n}, channel: ${this.channel})`;
  }
}
oi.KeygenProvider = Iv;
var ai = {};
Object.defineProperty(ai, "__esModule", { value: !0 });
ai.PrivateGitHubProvider = void 0;
const Bt = he, Rv = Ee, Pv = ne, Fs = rr, xs = Le, Nv = mt, Dv = ce;
class Fv extends Nv.BaseGitHubProvider {
  constructor(t, r, n, i) {
    super(t, "api.github.com", i), this.updater = r, this.token = n;
  }
  createRequestOptions(t, r) {
    const n = super.createRequestOptions(t, r);
    return n.redirect = "manual", n;
  }
  async getLatestVersion() {
    const t = new Bt.CancellationToken(), r = (0, xs.getChannelFilename)(this.getDefaultChannelName()), n = await this.getLatestVersionInfo(t), i = n.assets.find((s) => s.name === r);
    if (i == null)
      throw (0, Bt.newError)(`Cannot find ${r} in the release ${n.html_url || n.name}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
    const o = new Fs.URL(i.url);
    let a;
    try {
      a = (0, Rv.load)(await this.httpRequest(o, this.configureHeaders("application/octet-stream"), t));
    } catch (s) {
      throw s instanceof Bt.HttpError && s.statusCode === 404 ? (0, Bt.newError)(`Cannot find ${r} in the latest release artifacts (${o}): ${s.stack || s.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : s;
    }
    return a.assets = n.assets, a;
  }
  get fileExtraDownloadHeaders() {
    return this.configureHeaders("application/octet-stream");
  }
  configureHeaders(t) {
    return {
      accept: t,
      authorization: `token ${this.token}`
    };
  }
  async getLatestVersionInfo(t) {
    const r = this.updater.allowPrerelease;
    let n = this.basePath;
    r || (n = `${n}/latest`);
    const i = (0, xs.newUrlFromBase)(n, this.baseUrl);
    try {
      const o = JSON.parse(await this.httpRequest(i, this.configureHeaders("application/vnd.github.v3+json"), t));
      return r ? o.find((a) => a.prerelease) || o[0] : o;
    } catch (o) {
      throw (0, Bt.newError)(`Unable to find latest version on GitHub (${i}), please ensure a production release exists: ${o.stack || o.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return this.computeGithubBasePath(`/repos/${this.options.owner}/${this.options.repo}/releases`);
  }
  resolveFiles(t) {
    return (0, Dv.getFileList)(t).map((r) => {
      const n = Pv.posix.basename(r.url).replace(/ /g, "-"), i = t.assets.find((o) => o != null && o.name === n);
      if (i == null)
        throw (0, Bt.newError)(`Cannot find asset "${n}" in: ${JSON.stringify(t.assets, null, 2)}`, "ERR_UPDATER_ASSET_NOT_FOUND");
      return {
        url: new Fs.URL(i.url),
        info: r
      };
    });
  }
}
ai.PrivateGitHubProvider = Fv;
Object.defineProperty(ni, "__esModule", { value: !0 });
ni.isUrlProbablySupportMultiRangeRequests = mu;
ni.createClient = Mv;
const yn = he, xv = ii, Ls = Yr, Lv = mt, Uv = oi, kv = ai;
function mu(e) {
  return !e.includes("s3.amazonaws.com");
}
function Mv(e, t, r) {
  if (typeof e == "string")
    throw (0, yn.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
  const n = e.provider;
  switch (n) {
    case "github": {
      const i = e, o = (i.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || i.token;
      return o == null ? new Lv.GitHubProvider(i, t, r) : new kv.PrivateGitHubProvider(i, t, o, r);
    }
    case "bitbucket":
      return new xv.BitbucketProvider(e, t, r);
    case "keygen":
      return new Uv.KeygenProvider(e, t, r);
    case "s3":
    case "spaces":
      return new Ls.GenericProvider({
        provider: "generic",
        url: (0, yn.getS3LikeProviderBaseUrl)(e),
        channel: e.channel || null
      }, t, {
        ...r,
        // https://github.com/minio/minio/issues/5285#issuecomment-350428955
        isUseMultipleRangeRequest: !1
      });
    case "generic": {
      const i = e;
      return new Ls.GenericProvider(i, t, {
        ...r,
        isUseMultipleRangeRequest: i.useMultipleRangeRequest !== !1 && mu(i.url)
      });
    }
    case "custom": {
      const i = e, o = i.updateProvider;
      if (!o)
        throw (0, yn.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
      return new o(i, t, r);
    }
    default:
      throw (0, yn.newError)(`Unsupported provider: ${n}`, "ERR_UPDATER_UNSUPPORTED_PROVIDER");
  }
}
var si = {}, zr = {}, ar = {}, xt = {};
Object.defineProperty(xt, "__esModule", { value: !0 });
xt.OperationKind = void 0;
xt.computeOperations = Bv;
var Ot;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(Ot || (xt.OperationKind = Ot = {}));
function Bv(e, t, r) {
  const n = ks(e.files), i = ks(t.files);
  let o = null;
  const a = t.files[0], s = [], l = a.name, m = n.get(l);
  if (m == null)
    throw new Error(`no file ${l} in old blockmap`);
  const c = i.get(l);
  let f = 0;
  const { checksumToOffset: h, checksumToOldSize: g } = Hv(n.get(l), m.offset, r);
  let _ = a.offset;
  for (let y = 0; y < c.checksums.length; _ += c.sizes[y], y++) {
    const A = c.sizes[y], T = c.checksums[y];
    let S = h.get(T);
    S != null && g.get(T) !== A && (r.warn(`Checksum ("${T}") matches, but size differs (old: ${g.get(T)}, new: ${A})`), S = void 0), S === void 0 ? (f++, o != null && o.kind === Ot.DOWNLOAD && o.end === _ ? o.end += A : (o = {
      kind: Ot.DOWNLOAD,
      start: _,
      end: _ + A
      // oldBlocks: null,
    }, Us(o, s, T, y))) : o != null && o.kind === Ot.COPY && o.end === S ? o.end += A : (o = {
      kind: Ot.COPY,
      start: S,
      end: S + A
      // oldBlocks: [checksum]
    }, Us(o, s, T, y));
  }
  return f > 0 && r.info(`File${a.name === "file" ? "" : " " + a.name} has ${f} changed blocks`), s;
}
const jv = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
function Us(e, t, r, n) {
  if (jv && t.length !== 0) {
    const i = t[t.length - 1];
    if (i.kind === e.kind && e.start < i.end && e.start > i.start) {
      const o = [i.start, i.end, e.start, e.end].reduce((a, s) => a < s ? a : s);
      throw new Error(`operation (block index: ${n}, checksum: ${r}, kind: ${Ot[e.kind]}) overlaps previous operation (checksum: ${r}):
abs: ${i.start} until ${i.end} and ${e.start} until ${e.end}
rel: ${i.start - o} until ${i.end - o} and ${e.start - o} until ${e.end - o}`);
    }
  }
  t.push(e);
}
function Hv(e, t, r) {
  const n = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  let o = t;
  for (let a = 0; a < e.checksums.length; a++) {
    const s = e.checksums[a], l = e.sizes[a], m = i.get(s);
    if (m === void 0)
      n.set(s, o), i.set(s, l);
    else if (r.debug != null) {
      const c = m === l ? "(same size)" : `(size: ${m}, this size: ${l})`;
      r.debug(`${s} duplicated in blockmap ${c}, it doesn't lead to broken differential downloader, just corresponding block will be skipped)`);
    }
    o += l;
  }
  return { checksumToOffset: n, checksumToOldSize: i };
}
function ks(e) {
  const t = /* @__PURE__ */ new Map();
  for (const r of e)
    t.set(r.name, r);
  return t;
}
Object.defineProperty(ar, "__esModule", { value: !0 });
ar.DataSplitter = void 0;
ar.copyData = gu;
const vn = he, qv = gt, Gv = kr, Vv = xt, Ms = Buffer.from(`\r
\r
`);
var ot;
(function(e) {
  e[e.INIT = 0] = "INIT", e[e.HEADER = 1] = "HEADER", e[e.BODY = 2] = "BODY";
})(ot || (ot = {}));
function gu(e, t, r, n, i) {
  const o = (0, qv.createReadStream)("", {
    fd: r,
    autoClose: !1,
    start: e.start,
    // end is inclusive
    end: e.end - 1
  });
  o.on("error", n), o.once("end", i), o.pipe(t, {
    end: !1
  });
}
class Wv extends Gv.Writable {
  constructor(t, r, n, i, o, a) {
    super(), this.out = t, this.options = r, this.partIndexToTaskIndex = n, this.partIndexToLength = o, this.finishHandler = a, this.partIndex = -1, this.headerListBuffer = null, this.readState = ot.INIT, this.ignoreByteCount = 0, this.remainingPartDataCount = 0, this.actualPartLength = 0, this.boundaryLength = i.length + 4, this.ignoreByteCount = this.boundaryLength - 2;
  }
  get isFinished() {
    return this.partIndex === this.partIndexToLength.length;
  }
  // noinspection JSUnusedGlobalSymbols
  _write(t, r, n) {
    if (this.isFinished) {
      console.error(`Trailing ignored data: ${t.length} bytes`);
      return;
    }
    this.handleData(t).then(n).catch(n);
  }
  async handleData(t) {
    let r = 0;
    if (this.ignoreByteCount !== 0 && this.remainingPartDataCount !== 0)
      throw (0, vn.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
    if (this.ignoreByteCount > 0) {
      const n = Math.min(this.ignoreByteCount, t.length);
      this.ignoreByteCount -= n, r = n;
    } else if (this.remainingPartDataCount > 0) {
      const n = Math.min(this.remainingPartDataCount, t.length);
      this.remainingPartDataCount -= n, await this.processPartData(t, 0, n), r = n;
    }
    if (r !== t.length) {
      if (this.readState === ot.HEADER) {
        const n = this.searchHeaderListEnd(t, r);
        if (n === -1)
          return;
        r = n, this.readState = ot.BODY, this.headerListBuffer = null;
      }
      for (; ; ) {
        if (this.readState === ot.BODY)
          this.readState = ot.INIT;
        else {
          this.partIndex++;
          let a = this.partIndexToTaskIndex.get(this.partIndex);
          if (a == null)
            if (this.isFinished)
              a = this.options.end;
            else
              throw (0, vn.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
          const s = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
          if (s < a)
            await this.copyExistingData(s, a);
          else if (s > a)
            throw (0, vn.newError)("prevTaskIndex must be < taskIndex", "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED");
          if (this.isFinished) {
            this.onPartEnd(), this.finishHandler();
            return;
          }
          if (r = this.searchHeaderListEnd(t, r), r === -1) {
            this.readState = ot.HEADER;
            return;
          }
        }
        const n = this.partIndexToLength[this.partIndex], i = r + n, o = Math.min(i, t.length);
        if (await this.processPartStarted(t, r, o), this.remainingPartDataCount = n - (o - r), this.remainingPartDataCount > 0)
          return;
        if (r = i + this.boundaryLength, r >= t.length) {
          this.ignoreByteCount = this.boundaryLength - (t.length - i);
          return;
        }
      }
    }
  }
  copyExistingData(t, r) {
    return new Promise((n, i) => {
      const o = () => {
        if (t === r) {
          n();
          return;
        }
        const a = this.options.tasks[t];
        if (a.kind !== Vv.OperationKind.COPY) {
          i(new Error("Task kind must be COPY"));
          return;
        }
        gu(a, this.out, this.options.oldFileFd, i, () => {
          t++, o();
        });
      };
      o();
    });
  }
  searchHeaderListEnd(t, r) {
    const n = t.indexOf(Ms, r);
    if (n !== -1)
      return n + Ms.length;
    const i = r === 0 ? t : t.slice(r);
    return this.headerListBuffer == null ? this.headerListBuffer = i : this.headerListBuffer = Buffer.concat([this.headerListBuffer, i]), -1;
  }
  onPartEnd() {
    const t = this.partIndexToLength[this.partIndex - 1];
    if (this.actualPartLength !== t)
      throw (0, vn.newError)(`Expected length: ${t} differs from actual: ${this.actualPartLength}`, "ERR_DATA_SPLITTER_LENGTH_MISMATCH");
    this.actualPartLength = 0;
  }
  processPartStarted(t, r, n) {
    return this.partIndex !== 0 && this.onPartEnd(), this.processPartData(t, r, n);
  }
  processPartData(t, r, n) {
    this.actualPartLength += n - r;
    const i = this.out;
    return i.write(r === 0 && t.length === n ? t : t.slice(r, n)) ? Promise.resolve() : new Promise((o, a) => {
      i.on("error", a), i.once("drain", () => {
        i.removeListener("error", a), o();
      });
    });
  }
}
ar.DataSplitter = Wv;
var li = {};
Object.defineProperty(li, "__esModule", { value: !0 });
li.executeTasksUsingMultipleRangeRequests = Yv;
li.checkIsRangesSupported = co;
const lo = he, Bs = ar, js = xt;
function Yv(e, t, r, n, i) {
  const o = (a) => {
    if (a >= t.length) {
      e.fileMetadataBuffer != null && r.write(e.fileMetadataBuffer), r.end();
      return;
    }
    const s = a + 1e3;
    zv(e, {
      tasks: t,
      start: a,
      end: Math.min(t.length, s),
      oldFileFd: n
    }, r, () => o(s), i);
  };
  return o;
}
function zv(e, t, r, n, i) {
  let o = "bytes=", a = 0;
  const s = /* @__PURE__ */ new Map(), l = [];
  for (let f = t.start; f < t.end; f++) {
    const h = t.tasks[f];
    h.kind === js.OperationKind.DOWNLOAD && (o += `${h.start}-${h.end - 1}, `, s.set(a, f), a++, l.push(h.end - h.start));
  }
  if (a <= 1) {
    const f = (h) => {
      if (h >= t.end) {
        n();
        return;
      }
      const g = t.tasks[h++];
      if (g.kind === js.OperationKind.COPY)
        (0, Bs.copyData)(g, r, t.oldFileFd, i, () => f(h));
      else {
        const _ = e.createRequestOptions();
        _.headers.Range = `bytes=${g.start}-${g.end - 1}`;
        const y = e.httpExecutor.createRequest(_, (A) => {
          co(A, i) && (A.pipe(r, {
            end: !1
          }), A.once("end", () => f(h)));
        });
        e.httpExecutor.addErrorAndTimeoutHandlers(y, i), y.end();
      }
    };
    f(t.start);
    return;
  }
  const m = e.createRequestOptions();
  m.headers.Range = o.substring(0, o.length - 2);
  const c = e.httpExecutor.createRequest(m, (f) => {
    if (!co(f, i))
      return;
    const h = (0, lo.safeGetHeader)(f, "content-type"), g = /^multipart\/.+?(?:; boundary=(?:(?:"(.+)")|(?:([^\s]+))))$/i.exec(h);
    if (g == null) {
      i(new Error(`Content-Type "multipart/byteranges" is expected, but got "${h}"`));
      return;
    }
    const _ = new Bs.DataSplitter(r, t, s, g[1] || g[2], l, n);
    _.on("error", i), f.pipe(_), f.on("end", () => {
      setTimeout(() => {
        c.abort(), i(new Error("Response ends without calling any handlers"));
      }, 1e4);
    });
  });
  e.httpExecutor.addErrorAndTimeoutHandlers(c, i), c.end();
}
function co(e, t) {
  if (e.statusCode >= 400)
    return t((0, lo.createHttpError)(e)), !1;
  if (e.statusCode !== 206) {
    const r = (0, lo.safeGetHeader)(e, "accept-ranges");
    if (r == null || r === "none")
      return t(new Error(`Server doesn't support Accept-Ranges (response code ${e.statusCode})`)), !1;
  }
  return !0;
}
var ci = {};
Object.defineProperty(ci, "__esModule", { value: !0 });
ci.ProgressDifferentialDownloadCallbackTransform = void 0;
const Xv = kr;
var Xt;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(Xt || (Xt = {}));
class Kv extends Xv.Transform {
  constructor(t, r, n) {
    super(), this.progressDifferentialDownloadInfo = t, this.cancellationToken = r, this.onProgress = n, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.expectedBytes = 0, this.index = 0, this.operationType = Xt.COPY, this.nextUpdate = this.start + 1e3;
  }
  _transform(t, r, n) {
    if (this.cancellationToken.cancelled) {
      n(new Error("cancelled"), null);
      return;
    }
    if (this.operationType == Xt.COPY) {
      n(null, t);
      return;
    }
    this.transferred += t.length, this.delta += t.length;
    const i = Date.now();
    i >= this.nextUpdate && this.transferred !== this.expectedBytes && this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && (this.nextUpdate = i + 1e3, this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
      bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
    }), this.delta = 0), n(null, t);
  }
  beginFileCopy() {
    this.operationType = Xt.COPY;
  }
  beginRangeDownload() {
    this.operationType = Xt.DOWNLOAD, this.expectedBytes += this.progressDifferentialDownloadInfo.expectedByteCounts[this.index++];
  }
  endRangeDownload() {
    this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    });
  }
  // Called when we are 100% done with the connection/download
  _flush(t) {
    if (this.cancellationToken.cancelled) {
      t(new Error("cancelled"));
      return;
    }
    this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    }), this.delta = 0, this.transferred = 0, t(null);
  }
}
ci.ProgressDifferentialDownloadCallbackTransform = Kv;
Object.defineProperty(zr, "__esModule", { value: !0 });
zr.DifferentialDownloader = void 0;
const mr = he, qi = Et, Jv = gt, Qv = ar, Zv = rr, wn = xt, Hs = li, ew = ci;
class tw {
  // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
  constructor(t, r, n) {
    this.blockAwareFileInfo = t, this.httpExecutor = r, this.options = n, this.fileMetadataBuffer = null, this.logger = n.logger;
  }
  createRequestOptions() {
    const t = {
      headers: {
        ...this.options.requestHeaders,
        accept: "*/*"
      }
    };
    return (0, mr.configureRequestUrl)(this.options.newUrl, t), (0, mr.configureRequestOptions)(t), t;
  }
  doDownload(t, r) {
    if (t.version !== r.version)
      throw new Error(`version is different (${t.version} - ${r.version}), full download is required`);
    const n = this.logger, i = (0, wn.computeOperations)(t, r, n);
    n.debug != null && n.debug(JSON.stringify(i, null, 2));
    let o = 0, a = 0;
    for (const l of i) {
      const m = l.end - l.start;
      l.kind === wn.OperationKind.DOWNLOAD ? o += m : a += m;
    }
    const s = this.blockAwareFileInfo.size;
    if (o + a + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== s)
      throw new Error(`Internal error, size mismatch: downloadSize: ${o}, copySize: ${a}, newSize: ${s}`);
    return n.info(`Full: ${qs(s)}, To download: ${qs(o)} (${Math.round(o / (s / 100))}%)`), this.downloadFile(i);
  }
  downloadFile(t) {
    const r = [], n = () => Promise.all(r.map((i) => (0, qi.close)(i.descriptor).catch((o) => {
      this.logger.error(`cannot close file "${i.path}": ${o}`);
    })));
    return this.doDownloadFile(t, r).then(n).catch((i) => n().catch((o) => {
      try {
        this.logger.error(`cannot close files: ${o}`);
      } catch (a) {
        try {
          console.error(a);
        } catch {
        }
      }
      throw i;
    }).then(() => {
      throw i;
    }));
  }
  async doDownloadFile(t, r) {
    const n = await (0, qi.open)(this.options.oldFile, "r");
    r.push({ descriptor: n, path: this.options.oldFile });
    const i = await (0, qi.open)(this.options.newFile, "w");
    r.push({ descriptor: i, path: this.options.newFile });
    const o = (0, Jv.createWriteStream)(this.options.newFile, { fd: i });
    await new Promise((a, s) => {
      const l = [];
      let m;
      if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
        const T = [];
        let S = 0;
        for (const x of t)
          x.kind === wn.OperationKind.DOWNLOAD && (T.push(x.end - x.start), S += x.end - x.start);
        const D = {
          expectedByteCounts: T,
          grandTotal: S
        };
        m = new ew.ProgressDifferentialDownloadCallbackTransform(D, this.options.cancellationToken, this.options.onProgress), l.push(m);
      }
      const c = new mr.DigestTransform(this.blockAwareFileInfo.sha512);
      c.isValidateOnEnd = !1, l.push(c), o.on("finish", () => {
        o.close(() => {
          r.splice(1, 1);
          try {
            c.validate();
          } catch (T) {
            s(T);
            return;
          }
          a(void 0);
        });
      }), l.push(o);
      let f = null;
      for (const T of l)
        T.on("error", s), f == null ? f = T : f = f.pipe(T);
      const h = l[0];
      let g;
      if (this.options.isUseMultipleRangeRequest) {
        g = (0, Hs.executeTasksUsingMultipleRangeRequests)(this, t, h, n, s), g(0);
        return;
      }
      let _ = 0, y = null;
      this.logger.info(`Differential download: ${this.options.newUrl}`);
      const A = this.createRequestOptions();
      A.redirect = "manual", g = (T) => {
        var S, D;
        if (T >= t.length) {
          this.fileMetadataBuffer != null && h.write(this.fileMetadataBuffer), h.end();
          return;
        }
        const x = t[T++];
        if (x.kind === wn.OperationKind.COPY) {
          m && m.beginFileCopy(), (0, Qv.copyData)(x, h, n, s, () => g(T));
          return;
        }
        const Z = `bytes=${x.start}-${x.end - 1}`;
        A.headers.range = Z, (D = (S = this.logger) === null || S === void 0 ? void 0 : S.debug) === null || D === void 0 || D.call(S, `download range: ${Z}`), m && m.beginRangeDownload();
        const ae = this.httpExecutor.createRequest(A, (Y) => {
          Y.on("error", s), Y.on("aborted", () => {
            s(new Error("response has been aborted by the server"));
          }), Y.statusCode >= 400 && s((0, mr.createHttpError)(Y)), Y.pipe(h, {
            end: !1
          }), Y.once("end", () => {
            m && m.endRangeDownload(), ++_ === 100 ? (_ = 0, setTimeout(() => g(T), 1e3)) : g(T);
          });
        });
        ae.on("redirect", (Y, Ne, E) => {
          this.logger.info(`Redirect to ${rw(E)}`), y = E, (0, mr.configureRequestUrl)(new Zv.URL(y), A), ae.followRedirect();
        }), this.httpExecutor.addErrorAndTimeoutHandlers(ae, s), ae.end();
      }, g(0);
    });
  }
  async readRemoteBytes(t, r) {
    const n = Buffer.allocUnsafe(r + 1 - t), i = this.createRequestOptions();
    i.headers.range = `bytes=${t}-${r}`;
    let o = 0;
    if (await this.request(i, (a) => {
      a.copy(n, o), o += a.length;
    }), o !== n.length)
      throw new Error(`Received data length ${o} is not equal to expected ${n.length}`);
    return n;
  }
  request(t, r) {
    return new Promise((n, i) => {
      const o = this.httpExecutor.createRequest(t, (a) => {
        (0, Hs.checkIsRangesSupported)(a, i) && (a.on("error", i), a.on("aborted", () => {
          i(new Error("response has been aborted by the server"));
        }), a.on("data", r), a.on("end", () => n()));
      });
      this.httpExecutor.addErrorAndTimeoutHandlers(o, i), o.end();
    });
  }
}
zr.DifferentialDownloader = tw;
function qs(e, t = " KB") {
  return new Intl.NumberFormat("en").format((e / 1024).toFixed(2)) + t;
}
function rw(e) {
  const t = e.indexOf("?");
  return t < 0 ? e : e.substring(0, t);
}
Object.defineProperty(si, "__esModule", { value: !0 });
si.GenericDifferentialDownloader = void 0;
const nw = zr;
class iw extends nw.DifferentialDownloader {
  download(t, r) {
    return this.doDownload(t, r);
  }
}
si.GenericDifferentialDownloader = iw;
var yt = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.UpdaterSignal = e.UPDATE_DOWNLOADED = e.DOWNLOAD_PROGRESS = e.CancellationToken = void 0, e.addHandler = n;
  const t = he;
  Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
    return t.CancellationToken;
  } }), e.DOWNLOAD_PROGRESS = "download-progress", e.UPDATE_DOWNLOADED = "update-downloaded";
  class r {
    constructor(o) {
      this.emitter = o;
    }
    /**
     * Emitted when an authenticating proxy is [asking for user credentials](https://github.com/electron/electron/blob/master/docs/api/client-request.md#event-login).
     */
    login(o) {
      n(this.emitter, "login", o);
    }
    progress(o) {
      n(this.emitter, e.DOWNLOAD_PROGRESS, o);
    }
    updateDownloaded(o) {
      n(this.emitter, e.UPDATE_DOWNLOADED, o);
    }
    updateCancelled(o) {
      n(this.emitter, "update-cancelled", o);
    }
  }
  e.UpdaterSignal = r;
  function n(i, o, a) {
    i.on(o, a);
  }
})(yt);
Object.defineProperty(ft, "__esModule", { value: !0 });
ft.NoOpLogger = ft.AppUpdater = void 0;
const Ae = he, ow = Mr, aw = jn, sw = ul, jt = Et, lw = Ee, Gi = Kn, Tt = ne, $t = lu, Gs = Wr, cw = ri, Vs = cu, uw = Yr, Vi = ni, fw = dl, dw = Le, hw = si, Ht = yt;
class qo extends sw.EventEmitter {
  /**
   * Get the update channel. Doesn't return `channel` from the update configuration, only if was previously set.
   */
  get channel() {
    return this._channel;
  }
  /**
   * Set the update channel. Overrides `channel` in the update configuration.
   *
   * `allowDowngrade` will be automatically set to `true`. If this behavior is not suitable for you, simple set `allowDowngrade` explicitly after.
   */
  set channel(t) {
    if (this._channel != null) {
      if (typeof t != "string")
        throw (0, Ae.newError)(`Channel must be a string, but got: ${t}`, "ERR_UPDATER_INVALID_CHANNEL");
      if (t.length === 0)
        throw (0, Ae.newError)("Channel must be not an empty string", "ERR_UPDATER_INVALID_CHANNEL");
    }
    this._channel = t, this.allowDowngrade = !0;
  }
  /**
   *  Shortcut for explicitly adding auth tokens to request headers
   */
  addAuthHeader(t) {
    this.requestHeaders = Object.assign({}, this.requestHeaders, {
      authorization: t
    });
  }
  // noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
  get netSession() {
    return (0, Vs.getNetSession)();
  }
  /**
   * The logger. You can pass [electron-log](https://github.com/megahertz/electron-log), [winston](https://github.com/winstonjs/winston) or another logger with the following interface: `{ info(), warn(), error() }`.
   * Set it to `null` if you would like to disable a logging feature.
   */
  get logger() {
    return this._logger;
  }
  set logger(t) {
    this._logger = t ?? new Eu();
  }
  // noinspection JSUnusedGlobalSymbols
  /**
   * test only
   * @private
   */
  set updateConfigPath(t) {
    this.clientPromise = null, this._appUpdateConfigPath = t, this.configOnDisk = new Gi.Lazy(() => this.loadUpdateConfig());
  }
  /**
   * Allows developer to override default logic for determining if an update is supported.
   * The default logic compares the `UpdateInfo` minimum system version against the `os.release()` with `semver` package
   */
  get isUpdateSupported() {
    return this._isUpdateSupported;
  }
  set isUpdateSupported(t) {
    t && (this._isUpdateSupported = t);
  }
  constructor(t, r) {
    super(), this.autoDownload = !0, this.autoInstallOnAppQuit = !0, this.autoRunAppAfterInstall = !0, this.allowPrerelease = !1, this.fullChangelog = !1, this.allowDowngrade = !1, this.disableWebInstaller = !1, this.disableDifferentialDownload = !1, this.forceDevUpdateConfig = !1, this._channel = null, this.downloadedUpdateHelper = null, this.requestHeaders = null, this._logger = console, this.signals = new Ht.UpdaterSignal(this), this._appUpdateConfigPath = null, this._isUpdateSupported = (o) => this.checkIfUpdateSupported(o), this.clientPromise = null, this.stagingUserIdPromise = new Gi.Lazy(() => this.getOrCreateStagingUserId()), this.configOnDisk = new Gi.Lazy(() => this.loadUpdateConfig()), this.checkForUpdatesPromise = null, this.downloadPromise = null, this.updateInfoAndProvider = null, this._testOnlyOptions = null, this.on("error", (o) => {
      this._logger.error(`Error: ${o.stack || o.message}`);
    }), r == null ? (this.app = new cw.ElectronAppAdapter(), this.httpExecutor = new Vs.ElectronHttpExecutor((o, a) => this.emit("login", o, a))) : (this.app = r, this.httpExecutor = null);
    const n = this.app.version, i = (0, $t.parse)(n);
    if (i == null)
      throw (0, Ae.newError)(`App version is not a valid semver version: "${n}"`, "ERR_UPDATER_INVALID_VERSION");
    this.currentVersion = i, this.allowPrerelease = pw(i), t != null && (this.setFeedURL(t), typeof t != "string" && t.requestHeaders && (this.requestHeaders = t.requestHeaders));
  }
  //noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
  getFeedURL() {
    return "Deprecated. Do not use it.";
  }
  /**
   * Configure update provider. If value is `string`, [GenericServerOptions](./publish.md#genericserveroptions) will be set with value as `url`.
   * @param options If you want to override configuration in the `app-update.yml`.
   */
  setFeedURL(t) {
    const r = this.createProviderRuntimeOptions();
    let n;
    typeof t == "string" ? n = new uw.GenericProvider({ provider: "generic", url: t }, this, {
      ...r,
      isUseMultipleRangeRequest: (0, Vi.isUrlProbablySupportMultiRangeRequests)(t)
    }) : n = (0, Vi.createClient)(t, this, r), this.clientPromise = Promise.resolve(n);
  }
  /**
   * Asks the server whether there is an update.
   * @returns null if the updater is disabled, otherwise info about the latest version
   */
  checkForUpdates() {
    if (!this.isUpdaterActive())
      return Promise.resolve(null);
    let t = this.checkForUpdatesPromise;
    if (t != null)
      return this._logger.info("Checking for update (already in progress)"), t;
    const r = () => this.checkForUpdatesPromise = null;
    return this._logger.info("Checking for update"), t = this.doCheckForUpdates().then((n) => (r(), n)).catch((n) => {
      throw r(), this.emit("error", n, `Cannot check for updates: ${(n.stack || n).toString()}`), n;
    }), this.checkForUpdatesPromise = t, t;
  }
  isUpdaterActive() {
    return this.app.isPackaged || this.forceDevUpdateConfig ? !0 : (this._logger.info("Skip checkForUpdates because application is not packed and dev update config is not forced"), !1);
  }
  // noinspection JSUnusedGlobalSymbols
  checkForUpdatesAndNotify(t) {
    return this.checkForUpdates().then((r) => r != null && r.downloadPromise ? (r.downloadPromise.then(() => {
      const n = qo.formatDownloadNotification(r.updateInfo.version, this.app.name, t);
      new Pt.Notification(n).show();
    }), r) : (this._logger.debug != null && this._logger.debug("checkForUpdatesAndNotify called, downloadPromise is null"), r));
  }
  static formatDownloadNotification(t, r, n) {
    return n == null && (n = {
      title: "A new update is ready to install",
      body: "{appName} version {version} has been downloaded and will be automatically installed on exit"
    }), n = {
      title: n.title.replace("{appName}", r).replace("{version}", t),
      body: n.body.replace("{appName}", r).replace("{version}", t)
    }, n;
  }
  async isStagingMatch(t) {
    const r = t.stagingPercentage;
    let n = r;
    if (n == null)
      return !0;
    if (n = parseInt(n, 10), isNaN(n))
      return this._logger.warn(`Staging percentage is NaN: ${r}`), !0;
    n = n / 100;
    const i = await this.stagingUserIdPromise.value, a = Ae.UUID.parse(i).readUInt32BE(12) / 4294967295;
    return this._logger.info(`Staging percentage: ${n}, percentage: ${a}, user id: ${i}`), a < n;
  }
  computeFinalHeaders(t) {
    return this.requestHeaders != null && Object.assign(t, this.requestHeaders), t;
  }
  async isUpdateAvailable(t) {
    const r = (0, $t.parse)(t.version);
    if (r == null)
      throw (0, Ae.newError)(`This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "${t.version}"`, "ERR_UPDATER_INVALID_VERSION");
    const n = this.currentVersion;
    if ((0, $t.eq)(r, n) || !await Promise.resolve(this.isUpdateSupported(t)) || !await this.isStagingMatch(t))
      return !1;
    const o = (0, $t.gt)(r, n), a = (0, $t.lt)(r, n);
    return o ? !0 : this.allowDowngrade && a;
  }
  checkIfUpdateSupported(t) {
    const r = t == null ? void 0 : t.minimumSystemVersion, n = (0, aw.release)();
    if (r)
      try {
        if ((0, $t.lt)(n, r))
          return this._logger.info(`Current OS version ${n} is less than the minimum OS version required ${r} for version ${n}`), !1;
      } catch (i) {
        this._logger.warn(`Failed to compare current OS version(${n}) with minimum OS version(${r}): ${(i.message || i).toString()}`);
      }
    return !0;
  }
  async getUpdateInfoAndProvider() {
    await this.app.whenReady(), this.clientPromise == null && (this.clientPromise = this.configOnDisk.value.then((n) => (0, Vi.createClient)(n, this, this.createProviderRuntimeOptions())));
    const t = await this.clientPromise, r = await this.stagingUserIdPromise.value;
    return t.setRequestHeaders(this.computeFinalHeaders({ "x-user-staging-id": r })), {
      info: await t.getLatestVersion(),
      provider: t
    };
  }
  createProviderRuntimeOptions() {
    return {
      isUseMultipleRangeRequest: !0,
      platform: this._testOnlyOptions == null ? process.platform : this._testOnlyOptions.platform,
      executor: this.httpExecutor
    };
  }
  async doCheckForUpdates() {
    this.emit("checking-for-update");
    const t = await this.getUpdateInfoAndProvider(), r = t.info;
    if (!await this.isUpdateAvailable(r))
      return this._logger.info(`Update for version ${this.currentVersion.format()} is not available (latest version: ${r.version}, downgrade is ${this.allowDowngrade ? "allowed" : "disallowed"}).`), this.emit("update-not-available", r), {
        isUpdateAvailable: !1,
        versionInfo: r,
        updateInfo: r
      };
    this.updateInfoAndProvider = t, this.onUpdateAvailable(r);
    const n = new Ae.CancellationToken();
    return {
      isUpdateAvailable: !0,
      versionInfo: r,
      updateInfo: r,
      cancellationToken: n,
      downloadPromise: this.autoDownload ? this.downloadUpdate(n) : null
    };
  }
  onUpdateAvailable(t) {
    this._logger.info(`Found version ${t.version} (url: ${(0, Ae.asArray)(t.files).map((r) => r.url).join(", ")})`), this.emit("update-available", t);
  }
  /**
   * Start downloading update manually. You can use this method if `autoDownload` option is set to `false`.
   * @returns {Promise<Array<string>>} Paths to downloaded files.
   */
  downloadUpdate(t = new Ae.CancellationToken()) {
    const r = this.updateInfoAndProvider;
    if (r == null) {
      const i = new Error("Please check update first");
      return this.dispatchError(i), Promise.reject(i);
    }
    if (this.downloadPromise != null)
      return this._logger.info("Downloading update (already in progress)"), this.downloadPromise;
    this._logger.info(`Downloading update from ${(0, Ae.asArray)(r.info.files).map((i) => i.url).join(", ")}`);
    const n = (i) => {
      if (!(i instanceof Ae.CancellationError))
        try {
          this.dispatchError(i);
        } catch (o) {
          this._logger.warn(`Cannot dispatch error event: ${o.stack || o}`);
        }
      return i;
    };
    return this.downloadPromise = this.doDownloadUpdate({
      updateInfoAndProvider: r,
      requestHeaders: this.computeRequestHeaders(r.provider),
      cancellationToken: t,
      disableWebInstaller: this.disableWebInstaller,
      disableDifferentialDownload: this.disableDifferentialDownload
    }).catch((i) => {
      throw n(i);
    }).finally(() => {
      this.downloadPromise = null;
    }), this.downloadPromise;
  }
  dispatchError(t) {
    this.emit("error", t, (t.stack || t).toString());
  }
  dispatchUpdateDownloaded(t) {
    this.emit(Ht.UPDATE_DOWNLOADED, t);
  }
  async loadUpdateConfig() {
    return this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath), (0, lw.load)(await (0, jt.readFile)(this._appUpdateConfigPath, "utf-8"));
  }
  computeRequestHeaders(t) {
    const r = t.fileExtraDownloadHeaders;
    if (r != null) {
      const n = this.requestHeaders;
      return n == null ? r : {
        ...r,
        ...n
      };
    }
    return this.computeFinalHeaders({ accept: "*/*" });
  }
  async getOrCreateStagingUserId() {
    const t = Tt.join(this.app.userDataPath, ".updaterId");
    try {
      const n = await (0, jt.readFile)(t, "utf-8");
      if (Ae.UUID.check(n))
        return n;
      this._logger.warn(`Staging user id file exists, but content was invalid: ${n}`);
    } catch (n) {
      n.code !== "ENOENT" && this._logger.warn(`Couldn't read staging user ID, creating a blank one: ${n}`);
    }
    const r = Ae.UUID.v5((0, ow.randomBytes)(4096), Ae.UUID.OID);
    this._logger.info(`Generated new staging user ID: ${r}`);
    try {
      await (0, jt.outputFile)(t, r);
    } catch (n) {
      this._logger.warn(`Couldn't write out staging user ID: ${n}`);
    }
    return r;
  }
  /** @internal */
  get isAddNoCacheQuery() {
    const t = this.requestHeaders;
    if (t == null)
      return !0;
    for (const r of Object.keys(t)) {
      const n = r.toLowerCase();
      if (n === "authorization" || n === "private-token")
        return !1;
    }
    return !0;
  }
  async getOrCreateDownloadHelper() {
    let t = this.downloadedUpdateHelper;
    if (t == null) {
      const r = (await this.configOnDisk.value).updaterCacheDirName, n = this._logger;
      r == null && n.error("updaterCacheDirName is not specified in app-update.yml Was app build using at least electron-builder 20.34.0?");
      const i = Tt.join(this.app.baseCachePath, r || this.app.name);
      n.debug != null && n.debug(`updater cache dir: ${i}`), t = new Gs.DownloadedUpdateHelper(i), this.downloadedUpdateHelper = t;
    }
    return t;
  }
  async executeDownload(t) {
    const r = t.fileInfo, n = {
      headers: t.downloadUpdateOptions.requestHeaders,
      cancellationToken: t.downloadUpdateOptions.cancellationToken,
      sha2: r.info.sha2,
      sha512: r.info.sha512
    };
    this.listenerCount(Ht.DOWNLOAD_PROGRESS) > 0 && (n.onProgress = (S) => this.emit(Ht.DOWNLOAD_PROGRESS, S));
    const i = t.downloadUpdateOptions.updateInfoAndProvider.info, o = i.version, a = r.packageInfo;
    function s() {
      const S = decodeURIComponent(t.fileInfo.url.pathname);
      return S.endsWith(`.${t.fileExtension}`) ? Tt.basename(S) : t.fileInfo.info.url;
    }
    const l = await this.getOrCreateDownloadHelper(), m = l.cacheDirForPendingUpdate;
    await (0, jt.mkdir)(m, { recursive: !0 });
    const c = s();
    let f = Tt.join(m, c);
    const h = a == null ? null : Tt.join(m, `package-${o}${Tt.extname(a.path) || ".7z"}`), g = async (S) => (await l.setDownloadedFile(f, h, i, r, c, S), await t.done({
      ...i,
      downloadedFile: f
    }), h == null ? [f] : [f, h]), _ = this._logger, y = await l.validateDownloadedPath(f, i, r, _);
    if (y != null)
      return f = y, await g(!1);
    const A = async () => (await l.clear().catch(() => {
    }), await (0, jt.unlink)(f).catch(() => {
    })), T = await (0, Gs.createTempUpdateFile)(`temp-${c}`, m, _);
    try {
      await t.task(T, n, h, A), await (0, Ae.retry)(() => (0, jt.rename)(T, f), 60, 500, 0, 0, (S) => S instanceof Error && /^EBUSY:/.test(S.message));
    } catch (S) {
      throw await A(), S instanceof Ae.CancellationError && (_.info("cancelled"), this.emit("update-cancelled", i)), S;
    }
    return _.info(`New version ${o} has been downloaded to ${f}`), await g(!0);
  }
  async differentialDownloadInstaller(t, r, n, i, o) {
    try {
      if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload)
        return !0;
      const a = (0, dw.blockmapFiles)(t.url, this.app.version, r.updateInfoAndProvider.info.version);
      this._logger.info(`Download block maps (old: "${a[0]}", new: ${a[1]})`);
      const s = async (c) => {
        const f = await this.httpExecutor.downloadToBuffer(c, {
          headers: r.requestHeaders,
          cancellationToken: r.cancellationToken
        });
        if (f == null || f.length === 0)
          throw new Error(`Blockmap "${c.href}" is empty`);
        try {
          return JSON.parse((0, fw.gunzipSync)(f).toString());
        } catch (h) {
          throw new Error(`Cannot parse blockmap "${c.href}", error: ${h}`);
        }
      }, l = {
        newUrl: t.url,
        oldFile: Tt.join(this.downloadedUpdateHelper.cacheDir, o),
        logger: this._logger,
        newFile: n,
        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
        requestHeaders: r.requestHeaders,
        cancellationToken: r.cancellationToken
      };
      this.listenerCount(Ht.DOWNLOAD_PROGRESS) > 0 && (l.onProgress = (c) => this.emit(Ht.DOWNLOAD_PROGRESS, c));
      const m = await Promise.all(a.map((c) => s(c)));
      return await new hw.GenericDifferentialDownloader(t.info, this.httpExecutor, l).download(m[0], m[1]), !1;
    } catch (a) {
      if (this._logger.error(`Cannot download differentially, fallback to full download: ${a.stack || a}`), this._testOnlyOptions != null)
        throw a;
      return !0;
    }
  }
}
ft.AppUpdater = qo;
function pw(e) {
  const t = (0, $t.prerelease)(e);
  return t != null && t.length > 0;
}
class Eu {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  info(t) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  warn(t) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error(t) {
  }
}
ft.NoOpLogger = Eu;
Object.defineProperty(Ze, "__esModule", { value: !0 });
Ze.BaseUpdater = void 0;
const Ws = Bn, mw = ft;
class gw extends mw.AppUpdater {
  constructor(t, r) {
    super(t, r), this.quitAndInstallCalled = !1, this.quitHandlerAdded = !1;
  }
  quitAndInstall(t = !1, r = !1) {
    this._logger.info("Install on explicit quitAndInstall"), this.install(t, t ? r : this.autoRunAppAfterInstall) ? setImmediate(() => {
      Pt.autoUpdater.emit("before-quit-for-update"), this.app.quit();
    }) : this.quitAndInstallCalled = !1;
  }
  executeDownload(t) {
    return super.executeDownload({
      ...t,
      done: (r) => (this.dispatchUpdateDownloaded(r), this.addQuitHandler(), Promise.resolve())
    });
  }
  get installerPath() {
    return this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.file;
  }
  // must be sync (because quit even handler is not async)
  install(t = !1, r = !1) {
    if (this.quitAndInstallCalled)
      return this._logger.warn("install call ignored: quitAndInstallCalled is set to true"), !1;
    const n = this.downloadedUpdateHelper, i = this.installerPath, o = n == null ? null : n.downloadedFileInfo;
    if (i == null || o == null)
      return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
    this.quitAndInstallCalled = !0;
    try {
      return this._logger.info(`Install: isSilent: ${t}, isForceRunAfter: ${r}`), this.doInstall({
        isSilent: t,
        isForceRunAfter: r,
        isAdminRightsRequired: o.isAdminRightsRequired
      });
    } catch (a) {
      return this.dispatchError(a), !1;
    }
  }
  addQuitHandler() {
    this.quitHandlerAdded || !this.autoInstallOnAppQuit || (this.quitHandlerAdded = !0, this.app.onQuit((t) => {
      if (this.quitAndInstallCalled) {
        this._logger.info("Update installer has already been triggered. Quitting application.");
        return;
      }
      if (!this.autoInstallOnAppQuit) {
        this._logger.info("Update will not be installed on quit because autoInstallOnAppQuit is set to false.");
        return;
      }
      if (t !== 0) {
        this._logger.info(`Update will be not installed on quit because application is quitting with exit code ${t}`);
        return;
      }
      this._logger.info("Auto install update on quit"), this.install(!0, !1);
    }));
  }
  wrapSudo() {
    const { name: t } = this.app, r = `"${t} would like to update"`, n = this.spawnSyncLog("which gksudo || which kdesudo || which pkexec || which beesu"), i = [n];
    return /kdesudo/i.test(n) ? (i.push("--comment", r), i.push("-c")) : /gksudo/i.test(n) ? i.push("--message", r) : /pkexec/i.test(n) && i.push("--disable-internal-agent"), i.join(" ");
  }
  spawnSyncLog(t, r = [], n = {}) {
    this._logger.info(`Executing: ${t} with args: ${r}`);
    const i = (0, Ws.spawnSync)(t, r, {
      env: { ...process.env, ...n },
      encoding: "utf-8",
      shell: !0
    }), { error: o, status: a, stdout: s, stderr: l } = i;
    if (o != null)
      throw this._logger.error(l), o;
    if (a != null && a !== 0)
      throw this._logger.error(l), new Error(`Command ${t} exited with code ${a}`);
    return s.trim();
  }
  /**
   * This handles both node 8 and node 10 way of emitting error when spawning a process
   *   - node 8: Throws the error
   *   - node 10: Emit the error(Need to listen with on)
   */
  // https://github.com/electron-userland/electron-builder/issues/1129
  // Node 8 sends errors: https://nodejs.org/dist/latest-v8.x/docs/api/errors.html#errors_common_system_errors
  async spawnLog(t, r = [], n = void 0, i = "ignore") {
    return this._logger.info(`Executing: ${t} with args: ${r}`), new Promise((o, a) => {
      try {
        const s = { stdio: i, env: n, detached: !0 }, l = (0, Ws.spawn)(t, r, s);
        l.on("error", (m) => {
          a(m);
        }), l.unref(), l.pid !== void 0 && o(!0);
      } catch (s) {
        a(s);
      }
    });
  }
}
Ze.BaseUpdater = gw;
var Nr = {}, Xr = {};
Object.defineProperty(Xr, "__esModule", { value: !0 });
Xr.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
const qt = Et, Ew = zr, yw = dl;
class vw extends Ew.DifferentialDownloader {
  async download() {
    const t = this.blockAwareFileInfo, r = t.size, n = r - (t.blockMapSize + 4);
    this.fileMetadataBuffer = await this.readRemoteBytes(n, r - 1);
    const i = yu(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
    await this.doDownload(await ww(this.options.oldFile), i);
  }
}
Xr.FileWithEmbeddedBlockMapDifferentialDownloader = vw;
function yu(e) {
  return JSON.parse((0, yw.inflateRawSync)(e).toString());
}
async function ww(e) {
  const t = await (0, qt.open)(e, "r");
  try {
    const r = (await (0, qt.fstat)(t)).size, n = Buffer.allocUnsafe(4);
    await (0, qt.read)(t, n, 0, n.length, r - n.length);
    const i = Buffer.allocUnsafe(n.readUInt32BE(0));
    return await (0, qt.read)(t, i, 0, i.length, r - n.length - i.length), await (0, qt.close)(t), yu(i);
  } catch (r) {
    throw await (0, qt.close)(t), r;
  }
}
Object.defineProperty(Nr, "__esModule", { value: !0 });
Nr.AppImageUpdater = void 0;
const Ys = he, zs = Bn, _w = Et, Aw = gt, gr = ne, Sw = Ze, Tw = Xr, Cw = ce, Xs = yt;
class $w extends Sw.BaseUpdater {
  constructor(t, r) {
    super(t, r);
  }
  isUpdaterActive() {
    return process.env.APPIMAGE == null ? (process.env.SNAP == null ? this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage") : this._logger.info("SNAP env is defined, updater is disabled"), !1) : super.isUpdaterActive();
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, Cw.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "AppImage", ["rpm", "deb", "pacman"]);
    return this.executeDownload({
      fileExtension: "AppImage",
      fileInfo: n,
      downloadUpdateOptions: t,
      task: async (i, o) => {
        const a = process.env.APPIMAGE;
        if (a == null)
          throw (0, Ys.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
        (t.disableDifferentialDownload || await this.downloadDifferential(n, a, i, r, t)) && await this.httpExecutor.download(n.url, i, o), await (0, _w.chmod)(i, 493);
      }
    });
  }
  async downloadDifferential(t, r, n, i, o) {
    try {
      const a = {
        newUrl: t.url,
        oldFile: r,
        logger: this._logger,
        newFile: n,
        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
        requestHeaders: o.requestHeaders,
        cancellationToken: o.cancellationToken
      };
      return this.listenerCount(Xs.DOWNLOAD_PROGRESS) > 0 && (a.onProgress = (s) => this.emit(Xs.DOWNLOAD_PROGRESS, s)), await new Tw.FileWithEmbeddedBlockMapDifferentialDownloader(t.info, this.httpExecutor, a).download(), !1;
    } catch (a) {
      return this._logger.error(`Cannot download differentially, fallback to full download: ${a.stack || a}`), process.platform === "linux";
    }
  }
  doInstall(t) {
    const r = process.env.APPIMAGE;
    if (r == null)
      throw (0, Ys.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
    (0, Aw.unlinkSync)(r);
    let n;
    const i = gr.basename(r), o = this.installerPath;
    if (o == null)
      return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
    gr.basename(o) === i || !/\d+\.\d+\.\d+/.test(i) ? n = r : n = gr.join(gr.dirname(r), gr.basename(o)), (0, zs.execFileSync)("mv", ["-f", o, n]), n !== r && this.emit("appimage-filename-updated", n);
    const a = {
      ...process.env,
      APPIMAGE_SILENT_INSTALL: "true"
    };
    return t.isForceRunAfter ? this.spawnLog(n, [], a) : (a.APPIMAGE_EXIT_AFTER_INSTALL = "true", (0, zs.execFileSync)(n, [], { env: a })), !0;
  }
}
Nr.AppImageUpdater = $w;
var Dr = {};
Object.defineProperty(Dr, "__esModule", { value: !0 });
Dr.DebUpdater = void 0;
const bw = Ze, Ow = ce, Ks = yt;
class Iw extends bw.BaseUpdater {
  constructor(t, r) {
    super(t, r);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, Ow.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "deb", ["AppImage", "rpm", "pacman"]);
    return this.executeDownload({
      fileExtension: "deb",
      fileInfo: n,
      downloadUpdateOptions: t,
      task: async (i, o) => {
        this.listenerCount(Ks.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (a) => this.emit(Ks.DOWNLOAD_PROGRESS, a)), await this.httpExecutor.download(n.url, i, o);
      }
    });
  }
  get installerPath() {
    var t, r;
    return (r = (t = super.installerPath) === null || t === void 0 ? void 0 : t.replace(/ /g, "\\ ")) !== null && r !== void 0 ? r : null;
  }
  doInstall(t) {
    const r = this.wrapSudo(), n = /pkexec/i.test(r) ? "" : '"', i = this.installerPath;
    if (i == null)
      return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
    const o = ["dpkg", "-i", i, "||", "apt-get", "install", "-f", "-y"];
    return this.spawnSyncLog(r, [`${n}/bin/bash`, "-c", `'${o.join(" ")}'${n}`]), t.isForceRunAfter && this.app.relaunch(), !0;
  }
}
Dr.DebUpdater = Iw;
var Fr = {};
Object.defineProperty(Fr, "__esModule", { value: !0 });
Fr.PacmanUpdater = void 0;
const Rw = Ze, Js = yt, Pw = ce;
class Nw extends Rw.BaseUpdater {
  constructor(t, r) {
    super(t, r);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, Pw.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "pacman", ["AppImage", "deb", "rpm"]);
    return this.executeDownload({
      fileExtension: "pacman",
      fileInfo: n,
      downloadUpdateOptions: t,
      task: async (i, o) => {
        this.listenerCount(Js.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (a) => this.emit(Js.DOWNLOAD_PROGRESS, a)), await this.httpExecutor.download(n.url, i, o);
      }
    });
  }
  get installerPath() {
    var t, r;
    return (r = (t = super.installerPath) === null || t === void 0 ? void 0 : t.replace(/ /g, "\\ ")) !== null && r !== void 0 ? r : null;
  }
  doInstall(t) {
    const r = this.wrapSudo(), n = /pkexec/i.test(r) ? "" : '"', i = this.installerPath;
    if (i == null)
      return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
    const o = ["pacman", "-U", "--noconfirm", i];
    return this.spawnSyncLog(r, [`${n}/bin/bash`, "-c", `'${o.join(" ")}'${n}`]), t.isForceRunAfter && this.app.relaunch(), !0;
  }
}
Fr.PacmanUpdater = Nw;
var xr = {};
Object.defineProperty(xr, "__esModule", { value: !0 });
xr.RpmUpdater = void 0;
const Dw = Ze, Qs = yt, Fw = ce;
class xw extends Dw.BaseUpdater {
  constructor(t, r) {
    super(t, r);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, Fw.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "rpm", ["AppImage", "deb", "pacman"]);
    return this.executeDownload({
      fileExtension: "rpm",
      fileInfo: n,
      downloadUpdateOptions: t,
      task: async (i, o) => {
        this.listenerCount(Qs.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (a) => this.emit(Qs.DOWNLOAD_PROGRESS, a)), await this.httpExecutor.download(n.url, i, o);
      }
    });
  }
  get installerPath() {
    var t, r;
    return (r = (t = super.installerPath) === null || t === void 0 ? void 0 : t.replace(/ /g, "\\ ")) !== null && r !== void 0 ? r : null;
  }
  doInstall(t) {
    const r = this.wrapSudo(), n = /pkexec/i.test(r) ? "" : '"', i = this.spawnSyncLog("which zypper"), o = this.installerPath;
    if (o == null)
      return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
    let a;
    return i ? a = [i, "--no-refresh", "install", "--allow-unsigned-rpm", "-y", "-f", o] : a = [this.spawnSyncLog("which dnf || which yum"), "-y", "install", o], this.spawnSyncLog(r, [`${n}/bin/bash`, "-c", `'${a.join(" ")}'${n}`]), t.isForceRunAfter && this.app.relaunch(), !0;
  }
}
xr.RpmUpdater = xw;
var Lr = {};
Object.defineProperty(Lr, "__esModule", { value: !0 });
Lr.MacUpdater = void 0;
const Zs = he, Wi = Et, Lw = gt, el = ne, Uw = Of, kw = ft, Mw = ce, tl = Bn, rl = Mr;
class Bw extends kw.AppUpdater {
  constructor(t, r) {
    super(t, r), this.nativeUpdater = Pt.autoUpdater, this.squirrelDownloadedUpdate = !1, this.nativeUpdater.on("error", (n) => {
      this._logger.warn(n), this.emit("error", n);
    }), this.nativeUpdater.on("update-downloaded", () => {
      this.squirrelDownloadedUpdate = !0, this.debug("nativeUpdater.update-downloaded");
    });
  }
  debug(t) {
    this._logger.debug != null && this._logger.debug(t);
  }
  closeServerIfExists() {
    this.server && (this.debug("Closing proxy server"), this.server.close((t) => {
      t && this.debug("proxy server wasn't already open, probably attempted closing again as a safety check before quit");
    }));
  }
  async doDownloadUpdate(t) {
    let r = t.updateInfoAndProvider.provider.resolveFiles(t.updateInfoAndProvider.info);
    const n = this._logger, i = "sysctl.proc_translated";
    let o = !1;
    try {
      this.debug("Checking for macOS Rosetta environment"), o = (0, tl.execFileSync)("sysctl", [i], { encoding: "utf8" }).includes(`${i}: 1`), n.info(`Checked for macOS Rosetta environment (isRosetta=${o})`);
    } catch (f) {
      n.warn(`sysctl shell command to check for macOS Rosetta environment failed: ${f}`);
    }
    let a = !1;
    try {
      this.debug("Checking for arm64 in uname");
      const h = (0, tl.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
      n.info(`Checked 'uname -a': arm64=${h}`), a = a || h;
    } catch (f) {
      n.warn(`uname shell command to check for arm64 failed: ${f}`);
    }
    a = a || process.arch === "arm64" || o;
    const s = (f) => {
      var h;
      return f.url.pathname.includes("arm64") || ((h = f.info.url) === null || h === void 0 ? void 0 : h.includes("arm64"));
    };
    a && r.some(s) ? r = r.filter((f) => a === s(f)) : r = r.filter((f) => !s(f));
    const l = (0, Mw.findFile)(r, "zip", ["pkg", "dmg"]);
    if (l == null)
      throw (0, Zs.newError)(`ZIP file not provided: ${(0, Zs.safeStringifyJson)(r)}`, "ERR_UPDATER_ZIP_FILE_NOT_FOUND");
    const m = t.updateInfoAndProvider.provider, c = "update.zip";
    return this.executeDownload({
      fileExtension: "zip",
      fileInfo: l,
      downloadUpdateOptions: t,
      task: async (f, h) => {
        const g = el.join(this.downloadedUpdateHelper.cacheDir, c), _ = () => (0, Wi.pathExistsSync)(g) ? !t.disableDifferentialDownload : (n.info("Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"), !1);
        let y = !0;
        _() && (y = await this.differentialDownloadInstaller(l, t, f, m, c)), y && await this.httpExecutor.download(l.url, f, h);
      },
      done: async (f) => {
        if (!t.disableDifferentialDownload)
          try {
            const h = el.join(this.downloadedUpdateHelper.cacheDir, c);
            await (0, Wi.copyFile)(f.downloadedFile, h);
          } catch (h) {
            this._logger.warn(`Unable to copy file for caching for future differential downloads: ${h.message}`);
          }
        return this.updateDownloaded(l, f);
      }
    });
  }
  async updateDownloaded(t, r) {
    var n;
    const i = r.downloadedFile, o = (n = t.info.size) !== null && n !== void 0 ? n : (await (0, Wi.stat)(i)).size, a = this._logger, s = `fileToProxy=${t.url.href}`;
    this.closeServerIfExists(), this.debug(`Creating proxy server for native Squirrel.Mac (${s})`), this.server = (0, Uw.createServer)(), this.debug(`Proxy server for native Squirrel.Mac is created (${s})`), this.server.on("close", () => {
      a.info(`Proxy server for native Squirrel.Mac is closed (${s})`);
    });
    const l = (m) => {
      const c = m.address();
      return typeof c == "string" ? c : `http://127.0.0.1:${c == null ? void 0 : c.port}`;
    };
    return await new Promise((m, c) => {
      const f = (0, rl.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"), h = Buffer.from(`autoupdater:${f}`, "ascii"), g = `/${(0, rl.randomBytes)(64).toString("hex")}.zip`;
      this.server.on("request", (_, y) => {
        const A = _.url;
        if (a.info(`${A} requested`), A === "/") {
          if (!_.headers.authorization || _.headers.authorization.indexOf("Basic ") === -1) {
            y.statusCode = 401, y.statusMessage = "Invalid Authentication Credentials", y.end(), a.warn("No authenthication info");
            return;
          }
          const D = _.headers.authorization.split(" ")[1], x = Buffer.from(D, "base64").toString("ascii"), [Z, ae] = x.split(":");
          if (Z !== "autoupdater" || ae !== f) {
            y.statusCode = 401, y.statusMessage = "Invalid Authentication Credentials", y.end(), a.warn("Invalid authenthication credentials");
            return;
          }
          const Y = Buffer.from(`{ "url": "${l(this.server)}${g}" }`);
          y.writeHead(200, { "Content-Type": "application/json", "Content-Length": Y.length }), y.end(Y);
          return;
        }
        if (!A.startsWith(g)) {
          a.warn(`${A} requested, but not supported`), y.writeHead(404), y.end();
          return;
        }
        a.info(`${g} requested by Squirrel.Mac, pipe ${i}`);
        let T = !1;
        y.on("finish", () => {
          T || (this.nativeUpdater.removeListener("error", c), m([]));
        });
        const S = (0, Lw.createReadStream)(i);
        S.on("error", (D) => {
          try {
            y.end();
          } catch (x) {
            a.warn(`cannot end response: ${x}`);
          }
          T = !0, this.nativeUpdater.removeListener("error", c), c(new Error(`Cannot pipe "${i}": ${D}`));
        }), y.writeHead(200, {
          "Content-Type": "application/zip",
          "Content-Length": o
        }), S.pipe(y);
      }), this.debug(`Proxy server for native Squirrel.Mac is starting to listen (${s})`), this.server.listen(0, "127.0.0.1", () => {
        this.debug(`Proxy server for native Squirrel.Mac is listening (address=${l(this.server)}, ${s})`), this.nativeUpdater.setFeedURL({
          url: l(this.server),
          headers: {
            "Cache-Control": "no-cache",
            Authorization: `Basic ${h.toString("base64")}`
          }
        }), this.dispatchUpdateDownloaded(r), this.autoInstallOnAppQuit ? (this.nativeUpdater.once("error", c), this.nativeUpdater.checkForUpdates()) : m([]);
      });
    });
  }
  handleUpdateDownloaded() {
    this.autoRunAppAfterInstall ? this.nativeUpdater.quitAndInstall() : this.app.quit(), this.closeServerIfExists();
  }
  quitAndInstall() {
    this.squirrelDownloadedUpdate ? this.handleUpdateDownloaded() : (this.nativeUpdater.on("update-downloaded", () => this.handleUpdateDownloaded()), this.autoInstallOnAppQuit || this.nativeUpdater.checkForUpdates());
  }
}
Lr.MacUpdater = Bw;
var Ur = {}, Go = {};
Object.defineProperty(Go, "__esModule", { value: !0 });
Go.verifySignature = Hw;
const nl = he, vu = Bn, jw = jn, il = ne;
function Hw(e, t, r) {
  return new Promise((n, i) => {
    const o = t.replace(/'/g, "''");
    r.info(`Verifying signature ${o}`), (0, vu.execFile)('set "PSModulePath=" & chcp 65001 >NUL & powershell.exe', ["-NoProfile", "-NonInteractive", "-InputFormat", "None", "-Command", `"Get-AuthenticodeSignature -LiteralPath '${o}' | ConvertTo-Json -Compress"`], {
      shell: !0,
      timeout: 20 * 1e3
    }, (a, s, l) => {
      var m;
      try {
        if (a != null || l) {
          Yi(r, a, l, i), n(null);
          return;
        }
        const c = qw(s);
        if (c.Status === 0) {
          try {
            const _ = il.normalize(c.Path), y = il.normalize(t);
            if (r.info(`LiteralPath: ${_}. Update Path: ${y}`), _ !== y) {
              Yi(r, new Error(`LiteralPath of ${_} is different than ${y}`), l, i), n(null);
              return;
            }
          } catch (_) {
            r.warn(`Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ${(m = _.message) !== null && m !== void 0 ? m : _.stack}`);
          }
          const h = (0, nl.parseDn)(c.SignerCertificate.Subject);
          let g = !1;
          for (const _ of e) {
            const y = (0, nl.parseDn)(_);
            if (y.size ? g = Array.from(y.keys()).every((T) => y.get(T) === h.get(T)) : _ === h.get("CN") && (r.warn(`Signature validated using only CN ${_}. Please add your full Distinguished Name (DN) to publisherNames configuration`), g = !0), g) {
              n(null);
              return;
            }
          }
        }
        const f = `publisherNames: ${e.join(" | ")}, raw info: ` + JSON.stringify(c, (h, g) => h === "RawData" ? void 0 : g, 2);
        r.warn(`Sign verification failed, installer signed with incorrect certificate: ${f}`), n(f);
      } catch (c) {
        Yi(r, c, null, i), n(null);
        return;
      }
    });
  });
}
function qw(e) {
  const t = JSON.parse(e);
  delete t.PrivateKey, delete t.IsOSBinary, delete t.SignatureType;
  const r = t.SignerCertificate;
  return r != null && (delete r.Archived, delete r.Extensions, delete r.Handle, delete r.HasPrivateKey, delete r.SubjectName), t;
}
function Yi(e, t, r, n) {
  if (Gw()) {
    e.warn(`Cannot execute Get-AuthenticodeSignature: ${t || r}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  try {
    (0, vu.execFileSync)("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", "ConvertTo-Json test"], { timeout: 10 * 1e3 });
  } catch (i) {
    e.warn(`Cannot execute ConvertTo-Json: ${i.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  t != null && n(t), r && n(new Error(`Cannot execute Get-AuthenticodeSignature, stderr: ${r}. Failing signature validation due to unknown stderr.`));
}
function Gw() {
  const e = jw.release();
  return e.startsWith("6.") && !e.startsWith("6.3");
}
Object.defineProperty(Ur, "__esModule", { value: !0 });
Ur.NsisUpdater = void 0;
const _n = he, ol = ne, Vw = Ze, Ww = Xr, al = yt, Yw = ce, zw = Et, Xw = Go, sl = rr;
class Kw extends Vw.BaseUpdater {
  constructor(t, r) {
    super(t, r), this._verifyUpdateCodeSignature = (n, i) => (0, Xw.verifySignature)(n, i, this._logger);
  }
  /**
   * The verifyUpdateCodeSignature. You can pass [win-verify-signature](https://github.com/beyondkmp/win-verify-trust) or another custom verify function: ` (publisherName: string[], path: string) => Promise<string | null>`.
   * The default verify function uses [windowsExecutableCodeSignatureVerifier](https://github.com/electron-userland/electron-builder/blob/master/packages/electron-updater/src/windowsExecutableCodeSignatureVerifier.ts)
   */
  get verifyUpdateCodeSignature() {
    return this._verifyUpdateCodeSignature;
  }
  set verifyUpdateCodeSignature(t) {
    t && (this._verifyUpdateCodeSignature = t);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, Yw.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "exe");
    return this.executeDownload({
      fileExtension: "exe",
      downloadUpdateOptions: t,
      fileInfo: n,
      task: async (i, o, a, s) => {
        const l = n.packageInfo, m = l != null && a != null;
        if (m && t.disableWebInstaller)
          throw (0, _n.newError)(`Unable to download new version ${t.updateInfoAndProvider.info.version}. Web Installers are disabled`, "ERR_UPDATER_WEB_INSTALLER_DISABLED");
        !m && !t.disableWebInstaller && this._logger.warn("disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version."), (m || t.disableDifferentialDownload || await this.differentialDownloadInstaller(n, t, i, r, _n.CURRENT_APP_INSTALLER_FILE_NAME)) && await this.httpExecutor.download(n.url, i, o);
        const c = await this.verifySignature(i);
        if (c != null)
          throw await s(), (0, _n.newError)(`New version ${t.updateInfoAndProvider.info.version} is not signed by the application owner: ${c}`, "ERR_UPDATER_INVALID_SIGNATURE");
        if (m && await this.differentialDownloadWebPackage(t, l, a, r))
          try {
            await this.httpExecutor.download(new sl.URL(l.path), a, {
              headers: t.requestHeaders,
              cancellationToken: t.cancellationToken,
              sha512: l.sha512
            });
          } catch (f) {
            try {
              await (0, zw.unlink)(a);
            } catch {
            }
            throw f;
          }
      }
    });
  }
  // $certificateInfo = (Get-AuthenticodeSignature 'xxx\yyy.exe'
  // | where {$_.Status.Equals([System.Management.Automation.SignatureStatus]::Valid) -and $_.SignerCertificate.Subject.Contains("CN=siemens.com")})
  // | Out-String ; if ($certificateInfo) { exit 0 } else { exit 1 }
  async verifySignature(t) {
    let r;
    try {
      if (r = (await this.configOnDisk.value).publisherName, r == null)
        return null;
    } catch (n) {
      if (n.code === "ENOENT")
        return null;
      throw n;
    }
    return await this._verifyUpdateCodeSignature(Array.isArray(r) ? r : [r], t);
  }
  doInstall(t) {
    const r = this.installerPath;
    if (r == null)
      return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
    const n = ["--updated"];
    t.isSilent && n.push("/S"), t.isForceRunAfter && n.push("--force-run"), this.installDirectory && n.push(`/D=${this.installDirectory}`);
    const i = this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.packageFile;
    i != null && n.push(`--package-file=${i}`);
    const o = () => {
      this.spawnLog(ol.join(process.resourcesPath, "elevate.exe"), [r].concat(n)).catch((a) => this.dispatchError(a));
    };
    return t.isAdminRightsRequired ? (this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe"), o(), !0) : (this.spawnLog(r, n).catch((a) => {
      const s = a.code;
      this._logger.info(`Cannot run installer: error code: ${s}, error message: "${a.message}", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT`), s === "UNKNOWN" || s === "EACCES" ? o() : s === "ENOENT" ? Pt.shell.openPath(r).catch((l) => this.dispatchError(l)) : this.dispatchError(a);
    }), !0);
  }
  async differentialDownloadWebPackage(t, r, n, i) {
    if (r.blockMapSize == null)
      return !0;
    try {
      const o = {
        newUrl: new sl.URL(r.path),
        oldFile: ol.join(this.downloadedUpdateHelper.cacheDir, _n.CURRENT_APP_PACKAGE_FILE_NAME),
        logger: this._logger,
        newFile: n,
        requestHeaders: this.requestHeaders,
        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
        cancellationToken: t.cancellationToken
      };
      this.listenerCount(al.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (a) => this.emit(al.DOWNLOAD_PROGRESS, a)), await new Ww.FileWithEmbeddedBlockMapDifferentialDownloader(r, this.httpExecutor, o).download();
    } catch (o) {
      return this._logger.error(`Cannot download differentially, fallback to full download: ${o.stack || o}`), process.platform === "win32";
    }
    return !1;
  }
}
Ur.NsisUpdater = Kw;
(function(e) {
  var t = Se && Se.__createBinding || (Object.create ? function(A, T, S, D) {
    D === void 0 && (D = S);
    var x = Object.getOwnPropertyDescriptor(T, S);
    (!x || ("get" in x ? !T.__esModule : x.writable || x.configurable)) && (x = { enumerable: !0, get: function() {
      return T[S];
    } }), Object.defineProperty(A, D, x);
  } : function(A, T, S, D) {
    D === void 0 && (D = S), A[D] = T[S];
  }), r = Se && Se.__exportStar || function(A, T) {
    for (var S in A) S !== "default" && !Object.prototype.hasOwnProperty.call(T, S) && t(T, A, S);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.NsisUpdater = e.MacUpdater = e.RpmUpdater = e.PacmanUpdater = e.DebUpdater = e.AppImageUpdater = e.Provider = e.NoOpLogger = e.AppUpdater = e.BaseUpdater = void 0;
  const n = Et, i = ne;
  var o = Ze;
  Object.defineProperty(e, "BaseUpdater", { enumerable: !0, get: function() {
    return o.BaseUpdater;
  } });
  var a = ft;
  Object.defineProperty(e, "AppUpdater", { enumerable: !0, get: function() {
    return a.AppUpdater;
  } }), Object.defineProperty(e, "NoOpLogger", { enumerable: !0, get: function() {
    return a.NoOpLogger;
  } });
  var s = ce;
  Object.defineProperty(e, "Provider", { enumerable: !0, get: function() {
    return s.Provider;
  } });
  var l = Nr;
  Object.defineProperty(e, "AppImageUpdater", { enumerable: !0, get: function() {
    return l.AppImageUpdater;
  } });
  var m = Dr;
  Object.defineProperty(e, "DebUpdater", { enumerable: !0, get: function() {
    return m.DebUpdater;
  } });
  var c = Fr;
  Object.defineProperty(e, "PacmanUpdater", { enumerable: !0, get: function() {
    return c.PacmanUpdater;
  } });
  var f = xr;
  Object.defineProperty(e, "RpmUpdater", { enumerable: !0, get: function() {
    return f.RpmUpdater;
  } });
  var h = Lr;
  Object.defineProperty(e, "MacUpdater", { enumerable: !0, get: function() {
    return h.MacUpdater;
  } });
  var g = Ur;
  Object.defineProperty(e, "NsisUpdater", { enumerable: !0, get: function() {
    return g.NsisUpdater;
  } }), r(yt, e);
  let _;
  function y() {
    if (process.platform === "win32")
      _ = new Ur.NsisUpdater();
    else if (process.platform === "darwin")
      _ = new Lr.MacUpdater();
    else {
      _ = new Nr.AppImageUpdater();
      try {
        const A = i.join(process.resourcesPath, "package-type");
        if (!(0, n.existsSync)(A))
          return _;
        console.info("Checking for beta autoupdate feature for deb/rpm distributions");
        const T = (0, n.readFileSync)(A).toString().trim();
        switch (console.info("Found package-type:", T), T) {
          case "deb":
            _ = new Dr.DebUpdater();
            break;
          case "rpm":
            _ = new xr.RpmUpdater();
            break;
          case "pacman":
            _ = new Fr.PacmanUpdater();
            break;
          default:
            break;
        }
      } catch (A) {
        console.warn("Unable to detect 'package-type' for autoUpdater (beta rpm/deb support). If you'd like to expand support, please consider contributing to electron-builder", A.message);
      }
    }
    return _;
  }
  Object.defineProperty(e, "autoUpdater", {
    enumerable: !0,
    get: () => _ || y()
  });
})(Je);
const uo = ct.dirname(Cf(import.meta.url));
process.env.APP_ROOT = ct.join(uo, "..");
const fo = process.env.VITE_DEV_SERVER_URL, m_ = ct.join(process.env.APP_ROOT, "dist-electron"), wu = ct.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = fo ? ct.join(process.env.APP_ROOT, "public") : wu;
let B = null;
function Vo(e) {
  const t = {
    width: (e == null ? void 0 : e.width) ?? 1600,
    height: (e == null ? void 0 : e.height) ?? 1080,
    ...e && { x: e.x, y: e.y },
    icon: ct.join(uo, "..", "src", "assets", "icons", "arve_icon.ico"),
    // Windows
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: "#ffffff00",
      symbolColor: "#aaa",
      height: 31
    },
    webPreferences: {
      preload: ct.join(uo, "preload.mjs"),
      nodeIntegration: !1,
      contextIsolation: !0
    }
  };
  B = new ll(t), B.setMenuBarVisibility(!1), fo ? B.loadURL(fo) : B.loadFile(ct.join(wu, "index.html")), B.webContents.on("did-finish-load", () => {
    B == null || B.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), B.on("maximize", () => B == null ? void 0 : B.webContents.send("window-state-changed", !0)), B.on("unmaximize", () => B == null ? void 0 : B.webContents.send("window-state-changed", !1));
}
Tf.on("updated", () => {
  if (!B) return;
  const e = B.getBounds();
  B.close(), B = null, Vo(e);
});
Mn.on("minimize", () => B == null ? void 0 : B.minimize());
Mn.on("maximize", () => {
  B != null && B.isMaximized() ? B.unmaximize() : B == null || B.maximize();
});
Mn.on("close", () => B == null ? void 0 : B.close());
$n.on("window-all-closed", () => {
  process.platform !== "darwin" && ($n.quit(), B = null);
});
$n.on("activate", () => {
  ll.getAllWindows().length === 0 && Vo();
});
$n.whenReady().then(() => {
  Vo(), Je.autoUpdater.checkForUpdatesAndNotify(), Je.autoUpdater.on("update-available", () => {
    B == null || B.webContents.send("update_available");
  }), Je.autoUpdater.on("update-downloaded", () => {
    B == null || B.webContents.send("update_downloaded");
  }), Je.autoUpdater.on("error", (e) => {
    B == null || B.webContents.send("update_error", e);
  });
});
Mn.on("restart_app", () => {
  Je.autoUpdater.quitAndInstall();
});
Je.autoUpdater.autoDownload = !0;
Je.autoUpdater.autoInstallOnAppQuit = !0;
Je.autoUpdater.setFeedURL({
  provider: "github",
  owner: "damir-zuy",
  repo: "Arve"
  // optional: specify the URL of your release feed if it's not on GitHub
  // url: 'https://your-server.com/updates'
});
export {
  m_ as MAIN_DIST,
  wu as RENDERER_DIST,
  fo as VITE_DEV_SERVER_URL
};
