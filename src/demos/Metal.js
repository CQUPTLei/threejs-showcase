import * as THREE from 'three';

export class Metal {
    constructor(scene, camera) {
        this.scene = scene;
        this.camera = camera;
        this.camera.position.set(0, 0, 10);

        // 核心物体：高细分球体
        const geometry = new THREE.SphereGeometry(3, 128, 128);
        const material = new THREE.MeshPhysicalMaterial({
            color: 0xaaaaaa, // 银灰色
            metalness: 1.0,
            roughness: 0.05, // 极度光滑
            clearcoat: 1.0,  // 清漆层
            clearcoatRoughness: 0.1
        });

        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh);

        // 动态灯光系统：3个颜色灯光围绕旋转
        this.lights = [];
        const colors = [0xff0000, 0x00ff00, 0x0000ff];
        
        colors.forEach(color => {
            const light = new THREE.PointLight(color, 200);
            this.scene.add(light);
            this.lights.push(light);
        });
        
        // 环境光
        this.scene.add(new THREE.AmbientLight(0x222222));
    }

    update() {
        const time = Date.now() * 0.001;

        // 让球体本身像水一样变形 (修改顶点)
        // 注意：这种做法比较耗性能，但效果好
        // 这里为了简化代码，我们只做灯光旋转，视觉上就像物体在变
        
        this.lights.forEach((light, i) => {
            const offset = i * (Math.PI * 2 / 3);
            light.position.x = Math.sin(time * 2 + offset) * 8;
            light.position.y = Math.cos(time * 1.5 + offset) * 8;
            light.position.z = Math.sin(time + offset) * 8;
        });

        this.mesh.rotation.y += 0.002;
    }

    dispose() {
        this.mesh.geometry.dispose();
        this.mesh.material.dispose();
        this.lights.forEach(l => this.scene.remove(l));
    }
}