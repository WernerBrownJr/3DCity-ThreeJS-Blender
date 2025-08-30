// 64225763 - COS3712 - CG - 2025 - Assessment 2 (PART1)
// Werner Brown

// Set up so that lights switch off during day
// Switch on during night
// didnt work // 

// Optimize performance // 
// // // // 

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js'
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';

const canvas = document.getElementById("experience-canvas");
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

const scene = new THREE.Scene();
const loader = new GLTFLoader();

const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
const controls = new OrbitControls(camera, canvas);

const sun = new THREE.DirectionalLight(0xffffff, 2);
const light = new THREE.DirectionalLight(0xFFFFFF);
const clock = new THREE.Clock();

RectAreaLightUniformsLib.init();

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

let lightIntensities = {
    streetLights: 5,
    carLights: 3,
    droneSpotLights: 3000
}

let day = true;
let mixer;

let lastTime = 0;
const targetFPS = 30;
const frameInterval = 1000 / targetFPS; // 16.67ms for 60 FPS

// RENDERER //
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.physicallyCorrectLights = true;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.45;
// // // // // 

// Sunlight //
sun.castShadow = true;
sun.intensity = 20;
sun.position.set(45, 20, 45);
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

/// other lights ///
const rectLTecBuilding1 = new THREE.RectAreaLight(0x9700FF, 2, 0.1, 13.5);// in, width, height
rectLTecBuilding1.position.set(1.08, 3, 3.5);
rectLTecBuilding1.lookAt(0, 3.5, 90);
scene.add(rectLTecBuilding1)

const rectLTecBuilding2 = new THREE.RectAreaLight(0x9700FF, 2, 0.1, 13.5);// in, width, height
rectLTecBuilding2.position.set(-1.08, 3, 3.5);
rectLTecBuilding2.lookAt(0, 3.5, 90);
scene.add(rectLTecBuilding2)

const rectLTecBuilding3 = new THREE.RectAreaLight(0x9700FF, 2, 1, 6);// in, width, height
rectLTecBuilding3.position.set(0, 6.5, 3.1);
rectLTecBuilding3.lookAt(0, 6, 90);
scene.add(rectLTecBuilding3)

// // // // // // 

// STREET LIGHTS //
const TrafficRectLight11 = new THREE.RectAreaLight(0xffffff, lightIntensities.streetLights, 3, 3);// in, width, height
TrafficRectLight11.position.set(15.2, 0.7, 15.2);
TrafficRectLight11.lookAt(15.2, -170, 15.2);
scene.add(TrafficRectLight11)

const TrafficRectLight12 = new THREE.RectAreaLight(0xffffff, lightIntensities.streetLights, 3, 3);// in, width, height
TrafficRectLight12.position.set(5.1, 0.7, 15.2);
TrafficRectLight12.lookAt(5.1, -170, 15.2);
scene.add(TrafficRectLight12)

const TrafficRectLight13 = new THREE.RectAreaLight(0xffffff, lightIntensities.streetLights, 3, 3);// in, width, height
TrafficRectLight13.position.set(-5.1, 0.7, 15.2);
TrafficRectLight13.lookAt(-5.1, -170, 15.2);
scene.add(TrafficRectLight13)

const TrafficRectLight14 = new THREE.RectAreaLight(0xffffff, lightIntensities.streetLights, 3, 3);// in, width, height
TrafficRectLight14.position.set(-15.2, 0.7, 15.2);
TrafficRectLight14.lookAt(-15.2, -170, 15.2);
scene.add(TrafficRectLight14)

const TrafficRectLight21 = new THREE.RectAreaLight(0xffffff, lightIntensities.streetLights, 3, 3);// in, width, height
TrafficRectLight21.position.set(15.2, 0.7, 5.1);
TrafficRectLight21.lookAt(15.2, -170, 5.1);
scene.add(TrafficRectLight21)

const TrafficRectLight22 = new THREE.RectAreaLight(0xffffff, lightIntensities.streetLights, 3, 3);// in, width, height
TrafficRectLight22.position.set(5.1, 0.7, 5.1);
TrafficRectLight22.lookAt(5.1, -170, 5.1);
scene.add(TrafficRectLight22)

const TrafficRectLight23 = new THREE.RectAreaLight(0xffffff, lightIntensities.streetLights, 3, 3);// in, width, height
TrafficRectLight23.position.set(-5.1, 0.7, 5.1);
TrafficRectLight23.lookAt(-5.1, -170, 5.1);
scene.add(TrafficRectLight23)

const TrafficRectLight24 = new THREE.RectAreaLight(0xffffff, lightIntensities.streetLights, 3, 3);// in, width, height
TrafficRectLight24.position.set(-15.2, 0.7, 5.1);
TrafficRectLight24.lookAt(-15.2, -170, 5.1);
scene.add(TrafficRectLight24)

const TrafficRectLight31 = new THREE.RectAreaLight(0xffffff, lightIntensities.streetLights, 3, 3);// in, width, height
TrafficRectLight31.position.set(15.2, 0.7, -5.1);
TrafficRectLight31.lookAt(15.2, -170, -5.1);
scene.add(TrafficRectLight31)

const TrafficRectLight32 = new THREE.RectAreaLight(0xffffff, lightIntensities.streetLights, 3, 3);// in, width, height
TrafficRectLight32.position.set(5.1, 0.7, -5.1);
TrafficRectLight32.lookAt(5.1, -170, -5.1);
scene.add(TrafficRectLight32)

const TrafficRectLight33 = new THREE.RectAreaLight(0xffffff, lightIntensities.streetLights, 3, 3);// in, width, height
TrafficRectLight33.position.set(-5.1, 0.7, -5.1);
TrafficRectLight33.lookAt(-5.1, -170, -5.1);
scene.add(TrafficRectLight33)

const TrafficRectLight34 = new THREE.RectAreaLight(0xffffff, lightIntensities.streetLights, 3, 3);// in, width, height
TrafficRectLight34.position.set(-15.2, 0.7, -5.1);
TrafficRectLight34.lookAt(-15.2, -170, -5.1);
scene.add(TrafficRectLight34)

const TrafficRectLight41 = new THREE.RectAreaLight(0xffffff, lightIntensities.streetLights, 3, 3);// in, width, height
TrafficRectLight41.position.set(15.2, 0.7, -15.2);
TrafficRectLight41.lookAt(15.2, -170, -15.2);
scene.add(TrafficRectLight41)

const TrafficRectLight42 = new THREE.RectAreaLight(0xffffff, lightIntensities.streetLights, 3, 3);// in, width, height
TrafficRectLight42.position.set(5.1, 0.7, -15.2);
TrafficRectLight42.lookAt(5.1, -170, -15.2);
scene.add(TrafficRectLight42)

const TrafficRectLight43 = new THREE.RectAreaLight(0xffffff, lightIntensities.streetLights, 3, 3);// in, width, height
TrafficRectLight43.position.set(-5.1, 0.7, -15.2);
TrafficRectLight43.lookAt(-5.1, -170, -15.2);
scene.add(TrafficRectLight43)

const TrafficRectLight44 = new THREE.RectAreaLight(0xffffff, lightIntensities.streetLights, 3, 3);// in, width, height
TrafficRectLight44.position.set(-15.2, 0.7, -15.2);
TrafficRectLight44.lookAt(-15.2, -170, -15.2);
scene.add(TrafficRectLight44)
// // // // // // 

// const rectLightHelper = new RectAreaLightHelper(TrafficRectLight43);
// TrafficRectLight43.add(rectLightHelper);
/// /// /// /// ///

// CAMERA  // 
camera.position.z = 30;
camera.position.x = 30;
camera.position.y = 20;

// CAMERA CONTROLS //
controls.update();
// // // // // // //

// LOADER FOR GLTF SCENE//
loader.load('SceneBasicTextures8.glb', function (glb) {
    const model = glb.scene;
    const animations = glb.animations;

    // shadows have biggest impact, fix that
    model.traverse(child => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    })

    // manipulate lights
    model.traverse(child => {
        if (child.isLight && child.type === 'PointLight') {
            // eats 20% GPU usage when using these shadows, they are unnecessary
            // if (child.name === 'PLCar01L') {
            //     child.castShadow = true;
            // }
            // if (child.name === 'PLCar02L') {
            //     child.castShadow = true;
            // }
            // if (child.name === 'PLCar03L') {
            //     child.castShadow = true;
            // }
            // if (child.name === 'PLCar01R') {
            //     child.castShadow = true;
            // }
            // if (child.name === 'PLCar02R') {
            //     child.castShadow = true;
            // }
            // if (child.name === 'PLCar03R') {
            //     child.castShadow = true;
            // }
            //Enable shadow casting for each _MOVING_ point light

            child.distance = 5;
            // child.shadow.mapSize.width = 256; // Shadow resolution (512-2048; balance quality vs. performance)
            // child.shadow.mapSize.height = 256;
            // child.shadow.camera.near = 0.1; // Adjust based on your scene scale
            // child.shadow.camera.far = 100; // Match light’s effective range (tweak if too short/long)
            // child.shadow.bias = -0.0001; // Reduce shadow acne (adjust if artifacts appear)

            child.intensity = lightIntensities.carLights;
        }
        if (child.type === 'SpotLight') {
            child.intensity = lightIntensities.droneSpotLights;
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

// LOADER FOR ENVIRONMENT MAP //
new RGBELoader().load('daySky1K.hdr', (environmentMap) => {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = environmentMap;
    scene.environment = environmentMap;
})

// // // //

function handleResize() {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
}

window.addEventListener("resize", handleResize);

function animate(currentTime) {
    const deltaTime = currentTime - lastTime;
    if (deltaTime >= frameInterval) {
        renderer.render(scene, camera);

        const delta = clock.getDelta();
        if (mixer) mixer.update(delta);

        lastTime = currentTime - (deltaTime % frameInterval);
    }

}
renderer.setAnimationLoop(animate);

document.getElementById("day-night").addEventListener("click", DayNightSwitch, false);

function DayNightSwitch() {
    // make dark/light hdri
    if (day === true) {
        // this whole hdr uses 2GB GPU memory total
        new RGBELoader().load('night-sky-clear.hdr', (environmentMap) => {
            environmentMap.mapping = THREE.EquirectangularReflectionMapping;
            scene.background = environmentMap;
            // this uses about 1GB of GPU memory
            scene.environment = environmentMap;
            sun.intensity = 0;
            day = false;
        })
    }
    if (day === false) {
        new RGBELoader().load('daySky1K.hdr', (environmentMap) => {
            environmentMap.mapping = THREE.EquirectangularReflectionMapping;
            scene.background = environmentMap;
            scene.environment = environmentMap;
            sun.intensity = 20;
            day = true;
        })
    }
}

// Error notes
// Error: Fragment shader texture image units count exceeds MAX_TEXTURE_IMAGE_UNITS(16)
// This means that to many active lights are passed to the gpu
// Fix: Remove the number of active lights that require dynamic shadow casting aka moving lights

// export error
// fix: Select items and gradually export until covers whole scene or until running into export error
