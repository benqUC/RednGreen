
title = "RED N GREEN";

description = `
      [Tap]  Turn
      
Collect Green, avoid Red 
`;

characters = [
  `
llllll
ll l l
ll l l
llllll
 l  l
 l  l
    `,
  `
llllll
ll l l
ll l l
llllll
ll  ll
    `,
    `
    l
    l
    l
    l
   lll
    l
   `,
`
llllll
llllll
llllll
llllll
    `,    
];

const gamesize = {
  WIDTH: 200,
  HEIGHT: 100
};

options = {
  theme: "dark",
  viewSize: {x:gamesize.WIDTH, y:gamesize.HEIGHT},
  isPlayingBgm: true,
  isReplayEnabled: true,
  seed: 1,
};

/** @type {{x: number, height: number, speed: number}[]} */

let x;
let vx;
let animTicks;


let enemies;
let currentEnemySpeed;
let friendly;
let currFriendlySpeed;

function update() {
  if (!ticks) {
    bamboos = [];
    nextBambooTicks = 0;
    x = 190;
    vx = 1;
    avx = 0;
    animTicks = 0;
    speedBambooTicks = 5;
    enemies = [];
    friendly = [];
  }
  color("black");
  if (input.isJustPressed) {
    play("select");
    vx *= -1;
  }
  x = wrap(x + vx * difficulty * (1 + avx), -3, 200);
  avx *= 0.9;
  animTicks += difficulty;

  char(
    input.isPressed ? "b" : addWithCharCode("a", floor(animTicks / 20) % 2),
    x,
    87,
    {
      mirror: { x: vx },
    }
  );

  if (enemies.length === 0) {
    currentEnemySpeed = rnd(1, 1.1) * difficulty;
    for (let i = 0; i < 10; i++) {
        const posX = rnd(0, gamesize.WIDTH);
        // const posX = rnd(gamesize.WIDTH, 100);
        // const posY = rnd(12.5, 45);
        const posY = -rnd(i * gamesize.HEIGHT * 0.1);
        enemies.push({ pos: vec(posX, posY) })
    }
  }

  remove(enemies, (e) => {
    e.pos.y += currentEnemySpeed;
    color("red");
    char("c", e.pos);
    
    redCollide = char('c',e.pos).isColliding.char.a;
    if(redCollide){
      play("hit");
      end();
    }
    redCollide1 = char('c',e.pos).isColliding.char.b;
    if(redCollide){
      play("hit");
      end();
    }
    return (e.pos.y > gamesize.HEIGHT);
  });

  if (friendly.length === 0) {
    currFriendlySpeed = rnd(1, 1.1) * difficulty;
    for (let i = 0; i < 2; i++) {
        const posX = rnd(0, gamesize.WIDTH);
        const posY = -rnd(i * gamesize.HEIGHT * 0.1);
        friendly.push({ pos: vec(posX, posY) })
    }
  }
  remove(friendly, (f) => {
    f.pos.y += currFriendlySpeed;
    color("green");
    char("d", f.pos);
    
    friendlyCollide = char('d',f.pos).isColliding.char.a;
    if(friendlyCollide){
      addScore(1);
      play("coin");
    }
    friendlyCollide1 = char('d',f.pos).isColliding.char.b;
    if(friendlyCollide1){
      addScore(1);
      play("coin");
    }
    
    return (f.pos.y > gamesize.HEIGHT);
  });
  color("purple");
  rect(0, 90, 200, 10);
}

addEventListener("load", onLoad); 