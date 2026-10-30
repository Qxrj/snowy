
/* ============================================================
   GAME LIST

   BASE_URL is the folder your games live in.
   Each game's path is added onto the end of it.

   Example:
     BASE_URL = "https://qxrj.github.io/game-file/"
     path     = "2048"
     -> https://qxrj.github.io/game-file/2048

   Full URLs are also supported.
   Leave path as "" for coming soon.
   ============================================================ */

const BASE_URL = "https://qxrj.github.io/game-file/";

const GAMES = [
  { name: "2048", path: "2048" },
  { name: "Basket Ball Stars", path: "Basket-Ball-Stars" },
  { name: "Cookie Clicker", path: "Cookie-Clicker" },
  { name: "Crossy Road", path: "Crossy-Road" },
  { name: "Doge Miner", path: "Doge-Miner" },
  { name: "EmulatorJS", path: "EmulatorJS" },
  { name: "House Of Hazards", path: "House-of-Hazards" },
  { name: "Little Alchemy 2", path: "LittleAlchemy2" },
  { name: "Minecraft 1.5", path: "Minecraft-15" },
  { name: "Monkey Mart", path: "Monkey-Mart" },
  { name: "Plants vs Zombies", path: "PVZ" },
  { name: "Paper.io 2", path: "Paper-io-2" },
  { name: "Run 3", path: "Run3" },
  { name: "Slope", path: "Slope" },
  { name: "Snow Battle.io", path: "Snow-Battle-io" },
  { name: "Snow Rider 3D", path: "Snow-Rider-3d" },
  { name: "Tiny Fishing", path: "Tiny-Fishing" },
  { name: "Tunnel Rush", path: "Tunnel-Rush" },
  { name: "BitLife", path: "bitlife" },
  { name: "Bloxorz", path: "bloxorz" },
  { name: "Bob The Robber 2", path: "bob-the-robber-2" },
  { name: "Bob The Robber 4", path: "bob-the-robber-4" },
  { name: "Brain Test: Tricky Puzzles", path: "brain-test-tricky-puzzles" },
  { name: "CraftMine", path: "craftmine" },
  { name: "Dinosaurs Merge Master", path: "dinosaurs-merge-master" },
  { name: "Drift Boss", path: "drift-boss" },
  { name: "Eggy Car", path: "eggy-car" },
  { name: "Flash", path: "flash" },
  { name: "Gladihoppers", path: "gladihoppers" },
  { name: "Google Snake", path: "google-snake" },
  { name: "Grind Craft", path: "grind-craft" },
  { name: "Idle Ants", path: "idle-ants" },
  { name: "Idle Breakout", path: "idle-breakout" },
  { name: "Idle Digging Tycoon", path: "idle-digging-tycoon" },
  { name: "Idle Lumber Inc", path: "idle-lumber-inc" },
  { name: "Idle Shark", path: "idle-shark" },
  { name: "Idle Tree City", path: "idle-tree-city" },
  { name: "Money Rush", path: "money-rush" },
  { name: "Moto X3M", path: "motox3m" },
  { name: "Mr Bullet", path: "mr-bullet" },
  { name: "Murder", path: "murder" },
  { name: "Red Ball 4", path: "red-ball-4" },
  { name: "Retro Bowl College Football", path: "retro-bowl-college-football" },
  { name: "Retro Bowl", path: "retro-bowl" },
  { name: "Sausage Flipping", path: "sausage-flipping" },
  { name: "Save The Doge", path: "save-the-doge" },
  { name: "Smash Karts V2", path: "smash-karts-v2" },
  { name: "Stickman Hook", path: "stickman-hook" },
  { name: "Subway Surfers San Francisco", path: "subway-surfers-sanfancisc" },
  { name: "Subway Surfers", path: "subway-surfers" },
  { name: "Super Mario 64", path: "supermario64" },
  { name: "Vex 8", path: "vex-8" },
  { name: "Water Color Sort", path: "water-color-sort" },
  { name: "Wordle Unlimited", path: "wordle-unlimited" },
  { name: "Zeepkist Crash 2D", path: "zeepkist-crash-2d" }
];

function gameUrl(g) {
  if (!g.path) return "";
  if (/^https?:\/\//i.test(g.path)) return g.path;

  return BASE_URL.replace(/\/+$/, "") +
    "/" +
    g.path.replace(/^\/+/, "");
}

(function () {
  const grid = document.getElementById("grid");
  if (!grid) return;

  const esc = s => String(s).replace(/[&<>"']/g, m =>
    ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[m])
  );

  grid.innerHTML = GAMES.map(g => {
    const label = `<span class="grad">${esc(g.name)}</span>`;
    const url = gameUrl(g);

    if (!url) {
      return `<div class="card soon" title="Coming soon">${label}</div>`;
    }

    const href =
      `play.html?src=${encodeURIComponent(url)}&name=${encodeURIComponent(g.name)}`;

    return `<a class="card" href="${href}">${label}</a>`;
  }).join("") || '<p class="empty">No games yet.</p>';
})();
