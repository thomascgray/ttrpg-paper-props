// Screenshots one handout from the running dev server as a transparent PNG,
// for the selector thumbnails in public/handout_examples/. Uses a fresh
// headless Chrome profile, so the handout renders with its config defaults.
//
// bun scripts/handout-thumbnail.ts <route> <css selector> <out.png> [paddingPx]
// Pass the route without a leading slash: Git Bash rewrites "/chalkboard" into
// a Windows path before the script sees it.
// bun scripts/handout-thumbnail.ts chalkboard '[style*="aspect-ratio"]' public/handout_examples/chalkboard.png

const [route, selector, out, padArg] = process.argv.slice(2);
const url = `http://localhost:5173/${route.replace(/^\/+/, "")}`;
const pad = Number(padArg ?? 30);
// Random port so a leftover Chrome from an earlier run is never reused
const port = 9300 + Math.floor(Math.random() * 600);
const profile = `${process.env.TEMP}\\thumb-chrome-${Date.now()}`;

const chrome = Bun.spawn(
  [
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "--headless=new",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profile}`,
    "--window-size=1400,1000",
    "--hide-scrollbars",
    "about:blank",
  ],
  { stdout: "ignore", stderr: "ignore" }
);

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

let wsUrl = "";
for (let i = 0; i < 50 && !wsUrl; i++) {
  try {
    const tabs = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
    wsUrl = tabs.find((t: any) => t.type === "page")?.webSocketDebuggerUrl;
  } catch {}
  if (!wsUrl) await sleep(200);
}

const ws = new WebSocket(wsUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0;
const pending = new Map<number, (v: any) => void>();
ws.onmessage = (e) => {
  const msg = JSON.parse(e.data as string);
  if (msg.id && pending.has(msg.id)) pending.get(msg.id)!(msg);
};
const send = (method: string, params: any = {}) =>
  new Promise<any>((resolve) => {
    const n = ++id;
    pending.set(n, resolve);
    ws.send(JSON.stringify({ id: n, method, params }));
  });

await send("Page.enable");
await send("Page.navigate", { url });

const evalJs = async (expression: string) =>
  (await send("Runtime.evaluate", { expression, returnByValue: true })).result
    ?.result?.value;

// A fresh profile has to seed IndexedDB before the handout renders, so wait
// for the element, then give fonts and images a moment to settle
for (let i = 0; i < 75; i++) {
  if (await evalJs(`!!document.querySelector(${JSON.stringify(selector)})`))
    break;
  await sleep(200);
}
await evalJs("document.fonts.ready.then(() => true)");
await sleep(1500);

const rect = await evalJs(`(() => {
  const el = document.querySelector(${JSON.stringify(selector)});
  if (!el) return null;
  // Clear every ancestor background so only the handout is opaque
  for (let n = el.parentElement; n; n = n.parentElement) {
    n.style.setProperty("background", "none", "important");
  }
  document.querySelectorAll("img").forEach((img) => {
    if (!el.contains(img)) img.style.visibility = "hidden";
  });
  const r = el.getBoundingClientRect();
  return { x: r.x, y: r.y, width: r.width, height: r.height };
})()`);

if (!rect) {
  console.error("selector not found");
} else {
  await send("Emulation.setDefaultBackgroundColorOverride", {
    color: { r: 0, g: 0, b: 0, a: 0 },
  });
  await sleep(500);
  const shot = await send("Page.captureScreenshot", {
    format: "png",
    clip: {
      x: rect.x - pad,
      y: rect.y - pad,
      width: rect.width + pad * 2,
      height: rect.height + pad * 2,
      scale: 1.5,
    },
  });
  await Bun.write(out, Buffer.from(shot.result.data, "base64"));
  console.log("saved", out, rect);
}

ws.close();
chrome.kill();
