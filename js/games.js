/* ============================================================
   GAME LIST

   BASE_URL is the folder your games live in (your GitHub Pages
   directory). Each game's "path" is added onto the end of it.

   Example:
     BASE_URL = "https://username.github.io/directory/"
     path     = "game-name"
     -> loads   https://username.github.io/directory/game-name

   A game can also use a full URL as its path if it lives somewhere
   else, e.g. "https://otheruser.github.io/other/game/".
   Leave path as "" and the card shows as "coming soon".
   ============================================================ */
const BASE_URL = "https://username.github.io/directory/";

const GAMES = [
  { name: "Game One",   path: "" },
  { name: "Game Two",   path: "" },
  { name: "Game Three", path: "" },
  { name: "Game Four",  path: "" },
  { name: "Game Five",  path: "" },
  { name: "Game Six",   path: "" }
];

function gameUrl(g) {
  if (!g.path) return "";
  if (/^https?:\/\//i.test(g.path)) return g.path;           // full URL given
  return BASE_URL.replace(/\/+$/, "") + "/" + g.path.replace(/^\/+/, "");
}

(function () {
  const grid = document.getElementById("grid");
  if (!grid) return;

  const esc = s => String(s).replace(/[&<>"']/g, m =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));

  grid.innerHTML = GAMES.map(g => {
    const label = `<span class="grad">${esc(g.name)}</span>`;
    const url = gameUrl(g);
    if (!url) return `<div class="card soon" title="Coming soon">${label}</div>`;
    const href = `play.html?src=${encodeURIComponent(url)}&name=${encodeURIComponent(g.name)}`;
    return `<a class="card" href="${href}">${label}</a>`;
  }).join("") || '<p class="empty">No games yet.</p>';
})();
