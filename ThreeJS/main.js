// 64225763 - COS3712 - CG - 2025 - Assessment 2 (PART1)
// Werner Brown

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { AnimationMixer } from 'three';

const canvas = document.getElementById("experience-canvas");
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

const scene = new THREE.Scene();
const loader = new GLTFLoader();

const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
const controls = new OrbitControls(camera, canvas);

const sun = new THREE.DirectionalLight(0xffffff, 1.5);
const light = new THREE.DirectionalLight(0xFFFFFF);
const clock = new THREE.Clock();

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

let mixer;

// SCENE //
scene.background = new THREE.Color(0x111111);
// // // //

// Global light //
light.position.set(-50, -50, -12);
light.intensity = 0.1;
light.castShadow = false;

scene.add(light);
// This makes the shadows and dark spots of the buildings look a little less dark
// Making it better visually and more pleasing to the eye
// // // // // // 

// Sunlight //
sun.castShadow = true;
sun.position.set(15, 30, 5);
sun.shadow.camera.left = -20;
sun.shadow.camera.right = 20;
sun.shadow.camera.top = 20;
sun.shadow.camera.bottom = -20;
sun.shadow.normalBias = 0.2;
sun.shadow.intensity = 0.5;
sun.shadow.mapSize.height = 4096;
sun.shadow.mapSize.width = 4096;

scene.add(sun);
// // // // //

// CAMERA  // 
camera.position.z = 30;
camera.position.x = 30;
camera.position.y = 20;

// CAMERA CONTROLS //
controls.update();
// // // // // // //

// RENDERER //
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.VSMShadowMap;
// // // // // 


// LOADER //
loader.load('Scene8.glb', function (glb) {
    const model = glb.scene;
    const animations = glb.animations;

    model.traverse(child => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    })
    scene.add(glb.scene);

    mixer = new THREE.AnimationMixer(model);
    animations.forEach((clip) => {
        mixer.clipAction(clip).play();
    });

}, undefined, function (error) {
    console.error(error);
});
// // // // 

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

    const delta = clock.getDelta();
    if (mixer) mixer.update(delta);

}
renderer.setAnimationLoop(animate);

