/* Smooth, subtle snowfall. Works standalone and is also injected into loaded games. */
(function () {
  if (window.__snowy) return;
  window.__snowy = true;

  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  var c = document.createElement("canvas");
  c.setAttribute("data-snowy", "1");
  c.style.cssText = "position:fixed;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:-1";
  (document.body || document.documentElement).appendChild(c);

  var x = c.getContext("2d"), W, H, D, flakes = [];

  function make(randomY) {
    var r = Math.random() * 2.6 + 0.8;
    return {
      x: Math.random() * W,
      y: randomY ? Math.random() * H : -10,
      r: r,
      v: 14 + r * 9,                       // px/second: slow and gentle
      a: Math.random() * Math.PI * 2,
      s: Math.random() * 0.6 + 0.2,        // sway speed
      sw: Math.random() * 14 + 6,          // sway amount
      o: 0.25 + Math.random() * 0.4        // opacity
    };
  }

  function size() {
    D = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    c.width = W * D; c.height = H * D;
    x.setTransform(D, 0, 0, D, 0, 0);
    var n = Math.round(Math.min(110, Math.max(35, (W * H) / 14000)));
    while (flakes.length < n) flakes.push(make(true));
    flakes.length = n;
  }

  var last = performance.now();
  function frame(t) {
    var dt = Math.min((t - last) / 1000, 0.05); last = t;
    x.clearRect(0, 0, W, H);
    x.fillStyle = "#fff";
    for (var i = 0; i < flakes.length; i++) {
      var f = flakes[i];
      f.y += f.v * dt; f.a += f.s * dt;
      if (f.y > H + 10) { flakes[i] = make(false); continue; }
      x.globalAlpha = f.o;
      x.beginPath();
      x.arc(f.x + Math.sin(f.a) * f.sw, f.y, f.r, 0, 6.2832);
      x.fill();
    }
    x.globalAlpha = 1;
    if (!reduce) requestAnimationFrame(frame);
  }

  window.addEventListener("resize", size);
  size();
  requestAnimationFrame(frame);
})();
