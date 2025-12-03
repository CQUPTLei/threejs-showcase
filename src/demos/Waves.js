import * as THREE from 'three';

export class Waves {
    constructor(scene, camera) {
        this.scene = scene;
        this.camera = camera;
        this.camera.position.set(0, 15, 30);
        this.camera.lookAt(0, 0, 0);

        // 几何体：分段多一点，动作更细腻
        const geometry = new THREE.PlaneGeometry(60, 60, 50, 50);
        
        // 材质：赛博朋克网格风格
        const material = new THREE.MeshBasicMaterial({
            color: 0x00ffff,
            wireframe: true,
            transparent: true,
            opacity: 0.3
        });

        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.rotation.x = -Math.PI / 2;
        this.scene.add(this.mesh);

        // 加一个底部发光的平面，增加层次
        const planeGeo = new THREE.PlaneGeometry(60, 60);
        const planeMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const plane = new THREE.Mesh(planeGeo, planeMat);
        plane.rotation.x = -Math.PI / 2;
        plane.position.y = -0.1;
        this.scene.add(plane);

        this.clock = new THREE.Clock();
    }

    update() {
        const time = this.clock.getElapsedTime();
        const positions = this.mesh.geometry.attributes.position;

        for (let i = 0; i < positions.count; i++) {
            const x = positions.getX(i);
            const y = positions.getY(i);
            
            // 复杂的波浪算法：叠加多个正弦波
            const z = Math.sin(x * 0.3 + time) * 2 + Math.cos(y * 0.2 + time) * 1.5;
            positions.setZ(i, z);
        }
        positions.needsUpdate = true;
        
        // 整体轻微旋转
        this.mesh.rotation.z += 0.001;
    }

    dispose() {
        this.mesh.geometry.dispose();
        this.mesh.material.dispose();
    }
}