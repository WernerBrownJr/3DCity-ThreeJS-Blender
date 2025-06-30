// 64225763 - COS3712 - CG - 2025 - Assessment 2 (PART1)
// Werner Brown

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const canvas = document.getElementById("experience-canvas");

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.VSMShadowMap;

// Loader //
const loader = new GLTFLoader();
loader.load('Scene_revised04.glb', function (glb) {
    glb.scene.traverse(child => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            console.log(child);
        }
    })
    scene.add(glb.scene);

}, undefined, function (error) {

    console.error(error);

});
// // // // 

// Global light //

// Add something to make scene brighter

// // // // // // 

// Sunlight //

const sun = new THREE.DirectionalLight(0xffffff, 1.5);
sun.castShadow = true;
sun.position.set(50, 200, 30);
sun.shadow.camera.left = -20;
sun.shadow.camera.right = 20;
sun.shadow.camera.top = 20;
sun.shadow.camera.bottom = -20;
sun.shadow.normalBias = 0.2;
scene.add(sun);

// // // // //

// CAMERA  // 
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.z = 30;
camera.position.x = 30;
camera.position.y = 20;

// CAMERA CONTROLS //
const controls = new OrbitControls(camera, canvas);
controls.update();

// // // // // // // 

function handleResize() {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
}

window.addEventListener("resize", handleResize);

function animate() {
    renderer.render(scene, camera);

    // vehicle animation
}
renderer.setAnimationLoop(animate);

function copChaseAnimate() {

}