// マウスポインターの記述
let cursor = document.getElementById('cursor');//カーソルのdiv取得
//カーソルのdivタグをマウスに追従させる
document.addEventListener('mousemove' , function(e){
  cursor.style.transform = 'translate(' + e.clientX + 'px,' +e.clientY + 'px)';
});
//タイトルホバー時にクラス追加
let title = document.getElementById('splash-logo')
  title.addEventListener('mouseover',function(){
    cursor.classList.add('cursor--hover');
  });
  title.addEventListener('mouseout',function(){
    cursor.classList.remove('cursor--hover');
  });

//splash-logoをクリックしたらmainのdisplayをflexにする
const splashLogo = document.getElementById('splash-logo')
splashLogo.addEventListener('click',()=>{
  document.getElementById('main').classList.toggle("main");
  document.getElementById('body').classList.toggle("body")
});


//ランダムな文字を作るための関数
function r(from, to) {
  return ~~(Math.random() * (to - from + 1) + from);
}

function pick() {//rに渡す引数の数から-1
  return arguments[r(0, arguments.length - 1)];
}

function getChar() {
  return String.fromCharCode(pick(//utf16のランダムな文字列を生成
    r(0x3041, 0x30ff),
    r(0x2000, 0x206f),
    r(0x0020, 0x003f)
  ));
}
function loop(fn, delay) {
  let stamp = Date.now();//日付の取得
  function _loop() {
    if (Date.now() - stamp >= delay) {
      fn(); stamp = Date.now();
    }
    requestAnimationFrame(_loop);
  }
  requestAnimationFrame(_loop);
}
class Char {
  constructor() {
    this.element = document.createElement('span');//spanの生成
    this.mutate();
  }
  mutate() {
    this.element.textContent = getChar();//elementのtextContent取得
  }
}
class Trail {
  constructor(list = [], options) {
    this.list = list;
    this.options = Object.assign(
      { size: 10, offset: 0 }, options
    );
    this.body = [];
    this.move();
  }
  traverse(fn) {
    this.body.forEach((n, i) => {
      let last = (i == this.body.length - 1);
      if (n) fn(n, i, last);
    });
  }
  move() {
    this.body = [];
    let { offset, size } = this.options;
    for (let i = 0; i < size; ++i) {
      let item = this.list[offset + i - size + 1];
      this.body.push(item);
    }
    this.options.offset = 
      (offset + 1) % (this.list.length + size - 1);
  }
}
class Rain {
  constructor({ target, row }) {
    this.element = document.createElement('p');
    this.build(row);
    if (target) {
      target.appendChild(this.element);
    }
    this.drop();
  }
  build(row = 20) {
    let root = document.createDocumentFragment();
    let chars = [];
    for (let i = 0; i < row; ++i) {
      let c = new Char();
      root.appendChild(c.element);
      chars.push(c);
      if (Math.random() < .5) {
        loop(() => c.mutate(), r(1e3, 5e3));
      }
    }
    this.trail = new Trail(chars, { 
      size: r(10, 30), offset: r(0, 100) 
    });
    this.element.appendChild(root); 
  }
  drop() {
    let trail = this.trail;
    let len = trail.body.length;
    let delay = r(10, 100);
    loop(() => {
      trail.move();
      trail.traverse((c, i, last) => {
        c.element.style = `
          color: hsl(136, 100%, ${85 / len * (i + 1)}%)
        `;
        if (last) {
          c.mutate();
          c.element.style = `
            color: hsl(136, 100%, 85%);
            text-shadow:
              0 0 .5em #fff,
              0 0 .5em currentColor;
          `;
        }
      });
    }, delay);
  }
}

const main = document.querySelector('main');
for (let i = 0; i < 50; ++i) {
  new Rain({ target: main, row: 100 });
};

//リロード時にスクロールTOPに戻す
$(function() {
  $('html,body').animate({ scrollTop: 0 }, '1');
});
