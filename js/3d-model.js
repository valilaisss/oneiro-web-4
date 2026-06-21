let controls;

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('model-container');
    if (!container) return;
    const valX = document.getElementById('coord-x');
    const valY = document.getElementById('coord-y');
    const valZ = document.getElementById('coord-z');
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(3, 2, 5);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
    backLight.position.set(-2, 1, -3);
    scene.add(backLight);
    
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    controls.enableRotate = true;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    
    const loader = new THREE.GLTFLoader();
    loader.load('assets/model-of-bed2.glb',
        (gltf) => {
            console.log('Модель загружена!');
            gltf.scene.rotation.y = Math.PI;
            scene.add(gltf.scene);
            
            const box = new THREE.Box3().setFromObject(gltf.scene);
            const center = box.getCenter(new THREE.Vector3());
            
            camera.position.set(2.822, 1.171, -1.330);
            camera.lookAt(center);
            controls.target.copy(center);
            controls.update();
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + '% загружено');
        },
        (error) => {
            console.error('Ошибка загрузки модели:', error);
        }
    );
    
    function animate() {
        requestAnimationFrame(animate);
        controls.update(); 
        
        if (valX && valY && valZ) {
            valX.textContent = camera.position.x.toFixed(3);
            valY.textContent = camera.position.y.toFixed(3);
            valZ.textContent = camera.position.z.toFixed(3);
        }
        
        renderer.render(scene, camera);
    }
    animate();
    
    window.addEventListener('resize', () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
});