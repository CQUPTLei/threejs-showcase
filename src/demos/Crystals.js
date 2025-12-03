import * as THREE from 'three';

export class Crystals {
    constructor(scene, camera) {
        this.scene = scene;
        this.camera = camera;
        this.camera.position.set(0, 0, 15);

        // 灯光
        const dirLight = new THREE.DirectionalLight(0xffffff, 3);
        dirLight.position.set(5, 5, 5);
        this.scene.add(dirLight);
        this.scene.add(new THREE.AmbientLight(0x404040));

        this.group = new THREE.Group();
        const geometry = new THREE.OctahedronGeometry(1, 0); // 八面体，像钻石
        const material = new THREE.MeshPhongMaterial({
            color: 0x22c55e,
            shininess: 100,
            flatShading: true
        });

        // 生成一堆小晶体
        for(let i=0; i<50; i++) {
            const mesh = new THREE.Mesh(geometry, material);
            // 随机分布在球体表面
            const r = 4 + Math.random() * 2;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;

            mesh.position.x = r * Math.sin(phi) * Math.cos(theta);
            mesh.position.y = r * Math.sin(phi) * Math.sin(theta);
            mesh.position.z = r * Math.cos(phi);

            mesh.lookAt(0,0,0); // 指向中心
            mesh.scale.setScalar(Math.random() * 0.5 + 0.5);

            this.group.add(mesh);
        }

        // 中心大晶体
        const centerMesh = new THREE.Mesh(new THREE.OctahedronGeometry(2, 0), material);
        this.group.add(centerMesh);

        this.scene.add(this.group);
    }

    update() {
        this.group.rotation.y += 0.005;
        this.group.rotation.x += 0.002;
    }

    dispose() {
        this.scene.remove(this.group);
        // 遍历 group 清理子元素
        this.group.children.forEach(child => {
            child.geometry.dispose();
            child.material.dispose();
        });
    }
}