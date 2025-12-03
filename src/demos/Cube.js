import * as THREE from 'three';

export class Cube {
    constructor(scene, camera) {
        this.scene = scene;
        this.camera = camera;
        this.camera.position.set(0, 0, 5);

        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshNormalMaterial(); // 这种材质颜色随法线方向变化，很好看

        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh);
    }

    update() {
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.01;
    }

    dispose() {
        this.mesh.geometry.dispose();
        this.mesh.material.dispose();
    }
}