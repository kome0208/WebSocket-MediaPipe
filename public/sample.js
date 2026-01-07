// viewer.js

let particles = []; // 粒子の配列

// WebSocket 接続
const ws = new WebSocket(`wss://${location.host}`);
ws.onopen = () => console.log("WS connected (viewer)");
ws.onmessage = (e) => {
  const pos = JSON.parse(e.data);

  // 送信値 → 画面座標
  const x = (1 - pos.x) * windowWidth * 1.1;
  let y = pos.y * windowHeight * 1.1;
  y = y - (windowHeight * 0.4);


  // 通常粒子
  particles.push(new Particle(x, y));

  // 逆粒子（上下左右反転・輪郭のみ）
  particles.push(new GyakuParticle(x, y));
};

// =====================
//  通常 Particle
// =====================
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.life = 60;
    this.size = random(10, 40);

    // 色設定（基本白・たまにカラー）
    if (random(1) < 0.9) {
      this.color = [255, 255, 255, 255];
    } else {
      const r = random(20, 255);
      const g = random(20, 255);
      const b = random(20, 255);
      this.color = [r, g, b, 255];
    }

    // 周囲3つの粒子オフセット
    this.offsets = [];
    for (let i = 0; i < 3; i++) {
      this.offsets.push({
        ox: random(-20, 20),
        oy: random(-20, 20),
      });
    }
  }

  update() {
    this.life--;
    this.color[3] = map(this.life, 0, 60, 0, 255); // フェードアウト
  }

  draw() {
    noStroke();
    fill(...this.color);

    // 中心
    ellipse(this.x, this.y, this.size);

    // 周囲3つ
    for (const o of this.offsets) {
      ellipse(this.x + o.ox, this.y + o.oy, this.size);
    }
  }

  isDead() {
    return this.life <= 0;
  }
}

// =====================
//  逆 Particle（上下左右反転＋輪郭）
// =====================
class GyakuParticle {
  constructor(x, y) {

    // ★ 同じスケール空間で 上下左右反転 ★
    this.x = windowWidth - x;
    this.y = windowHeight - y;

    this.life = 60;
    this.size = random(10, 40);

    // 輪郭線（白寄りグレー）
    this.strokeColor = [200, 200, 200, 255];

    // 周囲3つの粒子オフセット
    this.offsets = [];
    for (let i = 0; i < 3; i++) {
      this.offsets.push({
        ox: random(-20, 20),
        oy: random(-20, 20),
      });
    }
  }

  update() {
    this.life--;
    this.strokeColor[3] = map(this.life, 0, 60, 0, 255); // フェードアウト
  }

  draw() {
    noFill();                  // ← 塗りなし
    stroke(...this.strokeColor);
    strokeWeight(2);

    // 中心
    ellipse(this.x, this.y, this.size);

    // 周囲3つ
    for (const o of this.offsets) {
      ellipse(this.x + o.ox, this.y + o.oy, this.size);
    }
  }

  isDead() {
    return this.life <= 0;
  }
}

// =====================
// p5.js main loop
// =====================
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
}

function draw() {
  background(0, 40); // 残像

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.update();
    p.draw();
    if (p.isDead()) particles.splice(i, 1);
  }
}
