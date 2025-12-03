import * as THREE from 'three';

export class Galaxy {
    constructor(scene, camera) {
        this.scene = scene;
        this.camera = camera;
        this.camera.position.set(0, 3, 12);
        
        const params = {
            count: 10000,
            size: 0.05,
            radius: 10,
            branches: 5,
            spin: 1.5,
            randomness: 0.5,
            randomnessPower: 3,
            insideColor: '#ff6030',
            outsideColor: '#1b3984'
        };

        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(params.count * 3);
        const colors = new Float32Array(params.count * 3);
        const colorInside = new THREE.Color(params.insideColor);
        const colorOutside = new THREE.Color(params.outsideColor);

        for(let i=0; i<params.count; i++) {
            const i3 = i*3;
            const radius = Math.random() * params.radius;
            const spinAngle = radius * params.spin;
            const branchAngle = (i % params.branches) / params.branches * Math.PI * 2;

            const randomX = Math.pow(Math.random(), params.randomnessPower) * (Math.random()<0.5?1:-1) * params.randomness * radius;
            const randomY = Math.pow(Math.random(), params.randomnessPower) * (Math.random()<0.5?1:-1) * params.randomness * radius;
            const randomZ = Math.pow(Math.random(), params.randomnessPower) * (Math.random()<0.5?1:-1) * params.randomness * radius;

            positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
            positions[i3+1] = randomY;
            positions[i3+2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

            const mixedColor = colorInside.clone();
            mixedColor.lerp(colorOutside, radius / params.radius);
            colors[i3] = mixedColor.r;
            colors[i3+1] = mixedColor.g;
            colors[i3+2] = mixedColor.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: params.size,
            sizeAttenuation: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true
        });

        this.points = new THREE.Points(geometry, material);
        this.scene.add(this.points);
    }

    update() {
        this.points.rotation.y += 0.001;
        // 缓慢的摄像机呼吸感
        this.camera.position.y = 3 + Math.sin(Date.now() * 0.0005) * 1;
    }

    dispose() {
        this.scene.remove(this.points);
        this.points.geometry.dispose();
        this.points.material.dispose();
    }
}