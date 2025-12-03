import * as THREE from 'three';

/**
 * 引擎类：负责管理 Three.js 的基础设施
 * 包括：场景、相机、渲染器、动画循环
 */
export class Engine {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        
        // 1. 创建场景
        this.scene = new THREE.Scene();
        // 添加一点基础雾气，让远处物体渐隐，增加深邃感
        this.scene.fog = new THREE.FogExp2(0x000000, 0.002);

        // 2. 创建相机 (透视相机)
        this.camera = new THREE.PerspectiveCamera(
            75, // 视野角度
            window.innerWidth / window.innerHeight, // 宽高比
            0.1, // 近截面
            1000 // 远截面
        );
        this.camera.position.z = 30;

        // 3. 创建渲染器
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true, // 抗锯齿
            alpha: true // 允许背景透明
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // 优化移动端性能
        this.container.appendChild(this.renderer.domElement);

        // 当前正在运行的 Demo 实例
        this.currentDemo = null;

        // 绑定窗口调整事件
        window.addEventListener('resize', this.onWindowResize.bind(this));

        // 开始循环
        this.animate();
    }

    // 切换演示场景的核心逻辑
    switchDemo(DemoClass) {
        // 1. 清理旧场景
        if (this.currentDemo) {
            if (typeof this.currentDemo.dispose === 'function') {
                this.currentDemo.dispose(); // 调用 demo 自带的清理函数
            }
            // 移除旧 demo 添加的所有物体 (这里简单处理，实际项目可能需要更精细的移除)
            while(this.scene.children.length > 0){ 
                this.scene.remove(this.scene.children[0]); 
            }
        }

        // 2. 初始化新场景
        // 重新添加灯光等公共设施（如果 demo 不自己管理灯光的话，这里先简单全部清空再由 demo 自己加）
        
        this.currentDemo = new DemoClass(this.scene, this.camera);
        console.log(`场景已切换`);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        // 如果有 demo 实例，调用它的更新函数
        if (this.currentDemo && typeof this.currentDemo.update === 'function') {
            this.currentDemo.update();
        }

        this.renderer.render(this.scene, this.camera);
    }
}