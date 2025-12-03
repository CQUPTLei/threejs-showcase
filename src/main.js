import { Engine } from './Engine.js';
import { Galaxy } from './demos/Galaxy.js';
import { Waves } from './demos/Waves.js';
import { Metal } from './demos/Metal.js';
import { Torus } from './demos/Torus.js';
import { Crystals } from './demos/Crystals.js';

const engine = new Engine('canvas-container');
const header = document.getElementById('main-header');
const cards = document.querySelectorAll('.demo-card');

const demoList = [
    { key: 'galaxy', Class: Galaxy },
    { key: 'waves', Class: Waves },
    { key: 'metal', Class: Metal },
    { key: 'torus', Class: Torus },
    { key: 'crystals', Class: Crystals }
];

let currentIndex = 0;
let isAnimating = false;
let isFirstSwitch = true; // 标记是否是第一次切换

function activateDemo(index) {
    if (index < 0 || index >= demoList.length) return;
    
    currentIndex = index;
    const item = demoList[index];

    // 切换 3D 场景
    engine.switchDemo(item.Class);

    // 切换 UI 状态
    cards.forEach(card => card.classList.remove('active'));
    const activeCard = document.querySelector(`.demo-card[data-demo="${item.key}"]`);
    if (activeCard) activeCard.classList.add('active');

    // 处理 Header 动画：如果是第一次，我们延迟触发，给用户看文字的时间
    if (isFirstSwitch) {
        // 设置一个 2500ms (2.5秒) 的定时器，时间到了再把标题收起来
        setTimeout(() => {
            header.classList.remove('header-initial');
            header.classList.add('header-minimized');
        }, 2500); 
        
        isFirstSwitch = false;
    }
}

// 初始化
activateDemo(0);

// --- 事件监听 ---

cards.forEach((card, index) => {
    card.addEventListener('click', () => {
        // 如果用户在开场动画没结束前就点击了，立即收起标题
        if (header.classList.contains('header-initial')) {
             header.classList.remove('header-initial');
             header.classList.add('header-minimized');
        }
        activateDemo(index);
    });
});

let scrollTimeout;
window.addEventListener('wheel', (event) => {
    event.preventDefault();
    if (isAnimating) return;

    if (Math.abs(event.deltaY) > 30) {
        isAnimating = true;
        
        // 如果滚轮触发时，标题还是大的，也强制收起
        if (header.classList.contains('header-initial')) {
             header.classList.remove('header-initial');
             header.classList.add('header-minimized');
        }

        if (event.deltaY > 0) {
            activateDemo((currentIndex + 1) % demoList.length);
        } else {
            activateDemo((currentIndex - 1 + demoList.length) % demoList.length);
        }

        setTimeout(() => {
            isAnimating = false;
        }, 800);
    }
}, { passive: false });