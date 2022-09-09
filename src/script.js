/////////////////////////////////////////////////////////////////////////
///// IMPORT
import './main.css'
import * as THREE from 'three'
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

/////////////////////////////////////////////////////////////////////////
//// LOADING MANAGER

const loadingManager = new THREE.LoadingManager()

const progressBar = document.querySelector('#progress-bar');

loadingManager.onProgress = function(url, loaded, total) {
    progressBar.value = (loaded / total ) * 100;
}

const progressBarContainer = document.querySelector('.progress-bar-container')

loadingManager.onLoad = function() {
    progressBarContainer.style.display = 'none';
}

/////////////////////////////////////////////////////////////////////////
//// DRACO LOADER TO LOAD DRACO COMPRESSED MODELS FROM BLENDER
const dracoLoader = new DRACOLoader()
const loader = new GLTFLoader(loadingManager)
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
dracoLoader.setDecoderConfig({ type: 'js' })
loader.setDRACOLoader(dracoLoader)

/////////////////////////////////////////////////////////////////////////
///// DIV CONTAINER CREATION TO HOLD THREEJS EXPERIENCE
const container = document.createElement('div')
document.body.appendChild(container)

/////////////////////////////////////////////////////////////////////////
///// SCENE CREATION
const scene = new THREE.Scene()
scene.background = new THREE.Color('#c8f0f9')

/////////////////////////////////////////////////////////////////////////
///// RENDERER CONFIG
const renderer = new THREE.WebGLRenderer({ antialias: true}) // turn on antialias
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) //set pixel ratio
renderer.setSize(window.innerWidth, window.innerHeight) // make it full screen
renderer.outputEncoding = THREE.sRGBEncoding // set color encoding
container.appendChild(renderer.domElement) // add the renderer to html div

/////////////////////////////////////////////////////////////////////////
///// CAMERAS CONFIG
const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 100)
camera.position.set(34,16,-20)
scene.add(camera)

/////////////////////////////////////////////////////////////////////////
///// MAKE EXPERIENCE FULL SCREEN
window.addEventListener('resize', () => {
    const width = window.innerWidth
    const height = window.innerHeight
    camera.aspect = width / height
    camera.updateProjectionMatrix()

    renderer.setSize(width, height)
    renderer.setPixelRatio(2)
})

/////////////////////////////////////////////////////////////////////////
///// CREATE ORBIT CONTROLS
const controls = new OrbitControls(camera, renderer.domElement)

/////////////////////////////////////////////////////////////////////////
///// SCENE LIGHTS
const ambient = new THREE.AmbientLight(0xa0a0fc, 0.7)
scene.add(ambient)

const sunLight = new THREE.DirectionalLight(0xe8c37b, 1)
sunLight.position.set(-40,75,14)
scene.add(sunLight)

const sunsetLight = new THREE.DirectionalLight ( 0xff5566, 1)
sunsetLight.position.set(-5, 10, 0)
sunsetLight.castShadow = false

scene.add( sunsetLight );

/////////////////////////////////////////////////////////////////////////
///// LOADING GLB/GLTF MODELS

    // ISLAND
        loader.load('models/gltf/island_fbx_gltf.glb', function (island) {
            island.scene.scale.set(100,100,100)
            island.scene.receiveShadow = true;

            scene.add(island.scene)
        })

    // TREES
        loader.load('models/gltf/tree.glb', function(tree) {
            tree.scene.scale.set(.1,.1,.1)
            tree.scene.position.y = 2;
            tree.scene.position.x = 6;
            tree.scene.position.z = 7;

            tree.scene.castShadow = true;

            scene.add(tree.scene)
        })

        loader.load('models/gltf/tree.glb', function(tree2) {
            tree2.scene.scale.set(.1,.1,.1)
            tree2.scene.position.y = 2;
            tree2.scene.position.x = 4;
            tree2.scene.position.z = 11;

            scene.add(tree2.scene)
        })

        loader.load('models/gltf/tree.glb', function(tree3) {
            tree3.scene.scale.set(.15,.15,.15)
            tree3.scene.position.y = 2;
            tree3.scene.position.x = 2;
            tree3.scene.position.z = 11;

            scene.add(tree3.scene)
        })

        loader.load('models/gltf/tree.glb', function(tree4) {
            tree4.scene.scale.set(.17,.17,.17)
            tree4.scene.position.y = 2;
            tree4.scene.position.x = -5;
            tree4.scene.position.z = -9;

            scene.add(tree4.scene)
        })

    // MOUNTAIN
        loader.load('models/gltf/LowPolyMountain.glb', function(mountain) {
            mountain.scene.scale.set(.3,.3,.3)

            mountain.scene.position.y = 2
            mountain.scene.position.x = -3.5
            mountain.scene.position.z = -2

            scene.add(mountain.scene)
        })

    // FIRE
        loader.load('models/gltf/army_campfire_01.glb', function(fire) {
            fire.scene.scale.set(.8,.8,.8)

            fire.scene.position.y = 2
            fire.scene.position.x = 1
            fire.scene.position.z = 4

            scene.add(fire.scene)
        })

    // CLOUDS
        const cloud = loader.load('models/gltf/cloud.glb', (cloud) => {
            cloud = cloud.scene;
            cloud.scale.set(.7,.7,.7)

            cloud.position.x = -2
            cloud.position.y = 10
            cloud.position.z = 0

            ///////////////// TWEEN LOOP VIA CHAINS
            let target0 = new THREE.Vector3(-2,10,0);
            let target1 = new THREE.Vector3(-2.5,10,1);
            
            let t1 = new TWEEN.Tween(cloud.position) 
                .to(target1, 5000)
                .easing(TWEEN.Easing.Sinusoidal.InOut)

            let t2 = new TWEEN.Tween(cloud.position)
                .to(target0, 4000)
                .easing(TWEEN.Easing.Sinusoidal.InOut)

            t1.chain(t2)
            t2.chain(t1)
            t1.start();
            
            cloud.rotateY(120)
            scene.add(cloud)
        })

        loader.load('models/gltf/cloud.glb', (cloud2) => {
            cloud2 = cloud2.scene
            cloud2.scale.set(.7,.7,.7)

            cloud2.position.x = 0
            cloud2.position.y = 7
            cloud2.position.z = 10

            let target0 = new THREE.Vector3(0,7,10);
            let target1 = new THREE.Vector3(1,7,9);
            
            let t1 = new TWEEN.Tween(cloud2.position) 
                .to(target1, 4000)
                .easing(TWEEN.Easing.Sinusoidal.InOut)

            let t2 = new TWEEN.Tween(cloud2.position)
                .to(target0, 3000)
                .easing(TWEEN.Easing.Sinusoidal.InOut)

            t1.chain(t2)
            t2.chain(t1)
            t1.start();

            cloud2.rotateY(120)
            scene.add(cloud2)
        })

        loader.load('models/gltf/cloud.glb', (cloud3) => {
            cloud3.scene.scale.set(.5,.5,.5)

            cloud3.scene.position.x = -3
            cloud3.scene.position.y = 8
            cloud3.scene.position.z = 8

            cloud3.scene.rotateY(120)

            scene.add(cloud3.scene)
        })


/////////////////////////////////////////////////////////////////////////
//// INTRO CAMERA ANIMATION USING TWEEN
function introAnimation() {
    controls.enabled = false //disable orbit controls to animate the camera
    
    new TWEEN.Tween(camera.position.set(26,4,-35 )).to({ // from camera position
        x: 25, //desired x position to go
        y: 20, //desired y position to go
        z: 20 //desired z position to go
    }, 6500) // time take to animate
    .delay(1000).easing(TWEEN.Easing.Quartic.InOut).start() // define delay, easing
    .onComplete(function () { //on finish animation
        controls.enabled = true //enable orbit controls
        setOrbitControlsLimits() //enable controls limits
        TWEEN.remove(this) // remove the animation from memory
    })
}

// introAnimation() // call intro animation on start

/////////////////////////////////////////////////////////////////////////
//// DEFINE ORBIT CONTROLS LIMITS
function setOrbitControlsLimits(){
    controls.enableDamping = true
    controls.dampingFactor = 0.04
    controls.minDistance = 5
    controls.maxDistance = 60
    controls.enableRotate = true
    controls.enableZoom = true
    controls.maxPolarAngle = Math.PI /2.5
}


const clock = new THREE.Clock()
/////////////////////////////////////////////////////////////////////////
//// RENDER LOOP FUNCTION
function renderLoop() {
    const elapsedTime = clock.getElapsedTime()

    TWEEN.update() // update animations

    controls.update() // update orbit controls

    renderer.render(scene, camera) // render the scene using the camera

    requestAnimationFrame(renderLoop) //loop the render function
    
}

renderLoop() //start rendering