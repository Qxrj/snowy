/* Loads ?src=<game url> straight into an iframe (e.g. https://username.github.io/directory/game-name).
   Hosts allowed: anything ending in one of these. Add more if you host games elsewhere. */
const ALLOWED_HOSTS = ["github.io"];

const params = new URLSearchParams(location.search);
const wrap = document.getElementById("wrap");
const status = document.getElementById("status");
const fsBtn = document.getElementById("fs");
const exitBtn = document.getElementById("exit-fs");
document.getElementById("game-name").textContent = params.get("name") || "Game";

/* ---------------- Fullscreen ---------------- */
function nativeFsElement() {
  return document.fullscreenElement || document.webkitFullscreenElement || null;
}
function isFs() {
  return nativeFsElement() === wrap || wrap.classList.contains("pseudo-fs");
}
let frame = null, gameUrl = "", L = null;

/* The game loads ONCE at full-screen size (never reloaded). The iframe is then
   scaled to fit the area it is in, so switching fullscreen just rescales it. */
function mountFrame() {
  if (!gameUrl || frame) return;
  L = {
    w: Math.max(screen.width, wrap.clientWidth),
    h: Math.max(screen.height, wrap.clientHeight)
  };
  frame = document.createElement("iframe");
  frame.setAttribute("sandbox", "allow-scripts allow-same-origin allow-forms allow-pointer-lock allow-popups allow-modals allow-downloads");
  frame.setAttribute("allow", "fullscreen; autoplay; gamepad");
  frame.setAttribute("allowfullscreen", "");
  frame.style.cssText =
    "position:absolute;left:0;top:0;border:0;transform-origin:0 0;" +
    "width:" + L.w + "px;height:" + L.h + "px";
  frame.onload = () => { const st = document.getElementById("status"); if (st) st.remove(); };
  frame.src = gameUrl;
  wrap.appendChild(frame);
  fit();
}

function fit() {
  if (!frame || !L) return;
  const cw = wrap.clientWidth, ch = wrap.clientHeight;
  if (!cw || !ch) return;
  let sx = cw / L.w, sy = ch / L.h, tx = 0, ty = 0;
  if (Math.abs(sx / sy - 1) > 0.08) {          // very different shape: keep proportions
    const k = Math.min(sx, sy);
    tx = (cw - L.w * k) / 2; ty = (ch - L.h * k) / 2;
    sx = sy = k;
  }                                              // otherwise fill the area completely
  frame.style.transform = "translate(" + tx + "px," + ty + "px) scale(" + sx + "," + sy + ")";
}
new ResizeObserver(fit).observe(wrap);
window.addEventListener("resize", fit);

function syncFs() {
  const on = isFs();
  wrap.classList.toggle("is-fs", on);
  fsBtn.textContent = on ? "Exit Fullscreen" : "Fullscreen";
  fit();
}

function pseudoFs(on) {          // CSS fallback: covers the whole window
  wrap.classList.toggle("pseudo-fs", on);
  document.body.style.overflow = on ? "hidden" : "";
  syncFs();
}
function enterFs() {
  const req = wrap.requestFullscreen || wrap.webkitRequestFullscreen;
  if (!req) return pseudoFs(true);
  try {
    const p = req.call(wrap);
    if (p && p.catch) p.catch(() => pseudoFs(true));
  } catch (e) { pseudoFs(true); }
}
function exitFs() {
  if (wrap.classList.contains("pseudo-fs")) return pseudoFs(false);
  const ex = document.exitFullscreen || document.webkitExitFullscreen;
  if (ex) ex.call(document);
}
function toggleFs() { isFs() ? exitFs() : enterFs(); }

fsBtn.addEventListener("click", toggleFs);
exitBtn.addEventListener("click", exitFs);
document.addEventListener("fullscreenchange", syncFs);
document.addEventListener("webkitfullscreenchange", syncFs);
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && wrap.classList.contains("pseudo-fs")) pseudoFs(false);
});

/* ---------------- Load the game ---------------- */
function fail(msg) { status.textContent = msg; }

function cleanSrc(v) {
  return (v || "").trim().replace(/^["'\u201c\u201d]+|["'\u201c\u201d]+$/g, "");
}

(function load() {
  const src = cleanSrc(params.get("src"));
  if (!src) return fail("No game selected. Go back and pick one.");

  let url;
  try { url = new URL(src); } catch (e) { return fail("That isn't a valid URL."); }

  const hostOk = ALLOWED_HOSTS.some(h => url.hostname === h || url.hostname.endsWith("." + h));
  if (url.protocol !== "https:" || !hostOk)
    return fail("That game URL isn't allowed. It must be an https URL on: " + ALLOWED_HOSTS.join(", "));

  gameUrl = url.href;
  mountFrame();
})();
