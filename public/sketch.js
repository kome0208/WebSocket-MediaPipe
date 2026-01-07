let x = 0;
let y = 0;
let z = 10;

// WebSocket 接続
const ws = new WebSocket(`wss://${location.host}`);
ws.onopen = () => console.log("WS connected (viewer)");
ws.onmessage = (e) => {
  const pos = JSON.parse(e.data);

  // 送信値 → 画面座標変換
  x = (1 - pos.x) * windowWidth * 1.1;
  y = pos.y * windowHeight * 1.1 - windowHeight * 0.4;
};

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  ellipse(x, y, z);
}
