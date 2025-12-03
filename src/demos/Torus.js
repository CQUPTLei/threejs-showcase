import * as THREE from 'three';

export class Torus {
    constructor(scene, camera) {
        this.scene = scene;
        this.camera = camera;
        this.camera.position.set(0, 0, 20);

        this.rings = [];
        const count = 20;

        for(let i=0; i<count; i++) {
            const geometry = new THREE.TorusGeometry(3 + i * 0.5, 0.05, 16, 100);
            // 不同的颜色
            const color = new THREE.Color().setHSL(i / count, 1, 0.5);
            const material = new THREE.MeshBasicMaterial({ color: color });
            
            const mesh = new THREE.Mesh(geometry, material);
            mesh.rotation.x = (Math.random() - 0.5) * Math.PI;
            mesh.rotation.y = (Math.random() - 0.5) * Math.PI;
            
            this.scene.add(mesh);
            this.rings.push({ mesh, speed: (Math.random() - 0.5) * 0.02 });
        }
    }

    update() {
        this.rings.forEach(item => {
            item.mesh.rotation.x += item.speed;
            item.mesh.rotation.y += item.speed;
        });
        // 摄像机稍微前后移动
        this.camera.position.z = 20 + Math.sin(Date.now() * 0.001) * 5;
    }

    dispose() {
        this.rings.forEach(item => {
            this.scene.remove(item.mesh);
            item.mesh.geometry.dispose();
            item.mesh.material.dispose();
        });
    }
}