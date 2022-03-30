
// �}�E�X�|�C���^�[�̋L�q
let cursor = document.getElementById('cursor');//�J�[�\����div�擾
//�J�[�\����div�^�O���}�E�X�ɒǏ]������
document.addEventListener('mousemove' , function(e){
  cursor.style.transform = 'translate(' + e.clientX + 'px,' +e.clientY + 'px)';
});
//�^�C�g���z�o�[���ɃN���X�ǉ�
let title = document.getElementById('splash-logo')
  title.addEventListener('mouseover',function(){
    cursor.classList.add('cursor--hover');
  });
  title.addEventListener('mouseout',function(){
    cursor.classList.remove('cursor--hover');
  });

//splash-logo���N���b�N������main��display��flex�ɂ���
const splashLogo = document.getElementById('splash-logo')
splashLogo.addEventListener('click',()=>{
  document.getElementById('main').classList.toggle("main");
  document.getElementById('body').classList.toggle("body")
});


//ランダムな文字をつくる//rのfrom to を外に
function r(from, to) {
  return ~~(Math.random() * (to - from + 1) + from);
}

function pick() {//rのfromが0 to(argumentsのlengthから-1)
  return arguments[r(0, arguments.length - 1)];
}

function getChar() {
  return String.fromCharCode(pick(//の戻り値を設定
    r(0x3041, 0x30ff),
    r(0x2000, 0x206f),
    r(0x0020, 0x003f)
  ));
}
function loop(fn, delay) {
  let stamp = Date.now();//今の時刻
  function _loop() {
    if (Date.now() - stamp >= delay) {//今の時刻-今の時刻 delay以上
      fn(); stamp = Date.now();
    }
    requestAnimationFrame(_loop);//_loopをrequestAnimationFrame
  }
  requestAnimationFrame(_loop);
}
class Char {//span作るclass
  constructor() {
    this.element = document.createElement('span');//span
    this.mutate();
  }
  mutate() {
    this.element.textContent = getChar();//elementをtextContent
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

const mojimoji = ['aaaaa'];

const main = document.querySelector('main');
for (let i = 0; i < 50; ++i) {
  new Rain({ target: main, row: 100 });
};

//Topへ更新して戻る
$(function() {
  $('html,body').animate({ scrollTop: 0 }, '1');
});

//隠しコマンド
let typeText = "matrix"
let type_i = 0;
let type_l = typeText.length;
let adio = new Audio('img/01.mp3');

window.addEventListener('keydown' , push_Keydown)
function push_Keydown(e){
  let keyCode = e.key;
  if (typeText.charAt(type_i) == keyCode){
    console.log(keyCode)
    type_i++;
    console.log('ok')
  
  if (type_l-type_i ===0){
    console.log('yes')
   //styleの追加
    document.getElementById('main').style.cssText = "opacity:0";
    document.getElementById('max').classList.add('maxcahnge')
    //必要のない要素は消す
    document.getElementById('splash-logo').style.cssText = "opacity:0"
    document.getElementById('about').style.cssText = "opacity:0"
    document.getElementById('mtext').style.cssText = "opacity:0"
    document.getElementById('member').style.cssText = "opacity:0"
    document.getElementById('contact').style.cssText = "opacity:0"
    //スクロールTopへ
    window.scrollTo({
      top:0,
      behavior: "smooth"
    });
    adio.play();
    adio.loop = true;
  };
  };
};
