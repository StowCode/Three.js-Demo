/*
Project is deployed through Vercel.
Use "npm run deploy" to make live changes
*/

/////////////////////////////////////////////////////////////////////////
///// IMPORT
import './main.css'
import * as THREE from 'three'
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js'

const gui = new GUI()

const mixers = []; // Array for animation

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

/// Animation Mixer


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
renderer.shadowMap.enabled = true;

/////////////////////////////////////////////////////////////////////////
///// CAMERAS CONFIG
const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 300)
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
const ambient = new THREE.AmbientLight(0xc883a3, 0.7)
scene.add(ambient)

const sunLight = new THREE.DirectionalLight(0xe8c37b, 1)
sunLight.position.set(-40,75,14)

    // Shadows
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 500; // default
    sunLight.shadow.mapSize.height = 500; // default
    sunLight.shadow.camera.near = 0.5; // default
    sunLight.shadow.camera.far = 500; // default

    sunLight.shadow.camera.top = 20
    sunLight.shadow.camera.right = 50
    sunLight.shadow.camera.bottom = -50
    sunLight.shadow.camera.left = -50

scene.add(sunLight)


const sunsetLight = new THREE.DirectionalLight ( 0xff5566, 1)
sunsetLight.position.set(-5, 10, 0)

scene.add( sunsetLight );

/////////////////////////////////////////////////////////////////////////
///// GEOMETRIES

const rockMaterial = new THREE.MeshPhysicalMaterial({color:0x4d4d4d})

const rockGeometry = new THREE.OctahedronGeometry(3.5,1)
const rock = new THREE.Mesh(rockGeometry, rockMaterial)
    rock.position.y = 2
    rock.position.z = 6
    rock.castShadow = true;
const rock2 = new THREE.Mesh(rockGeometry, rockMaterial)
    rock2.position.y = 2
    rock2.position.z = 5.8
    rock2.position.x = -.9
    rock2.castShadow = true;
const rock3 = new THREE.Mesh(rockGeometry, rockMaterial)
    rock3.position.y = 2
    rock3.position.z = -10
    rock3.position.x = 5.5
    rock3.castShadow= true;

rock.scale.set(.1,.1,.1)
rock2.scale.set(.2,.2,.2)
rock3.scale.set(.2,.2,.2)


scene.add(rock, rock2, rock3)


/////////////////////////////////////////////////////////////////////////
///// LOADING GLB/GLTF MODELS

    // ISLAND
        loader.load('models/gltf/island_fbx_gltf.glb', function (island) {
            island.scene.scale.set(100,100,100)
            island.scene.receiveShadow = true;

            island.scene.traverse(function(model) {
                if(model.isMesh) {
                    model.receiveShadow = true;
                }
            });

            scene.add(island.scene)
        })

    // TREES
        loader.load('models/gltf/tree.glb', function(tree) {
            tree.scene.scale.set(.1,.1,.1)
            tree.scene.position.y = 2;
            tree.scene.position.x = 6;
            tree.scene.position.z = 7;

            tree.scene.traverse(function(model) {
                if(model.isMesh) {
                    model.castShadow = true;
                }
            });

            scene.add(tree.scene)
        })

        loader.load('models/gltf/tree.glb', function(tree2) {
            tree2.scene.scale.set(.1,.1,.1)
            tree2.scene.position.y = 2;
            tree2.scene.position.x = 4;
            tree2.scene.position.z = 11;

            tree2.scene.traverse(function(model) {
                if(model.isMesh) {
                    model.castShadow = true;
                }
            })

            scene.add(tree2.scene)
        })

        loader.load('models/gltf/tree.glb', function(tree3) {
            tree3.scene.scale.set(.15,.15,.15)
            tree3.scene.position.y = 2;
            tree3.scene.position.x = 2;
            tree3.scene.position.z = 11;

            tree3.scene.traverse(function(model) {
                if(model.isMesh) {
                    model.castShadow = true;
                }
            })

            scene.add(tree3.scene)
        })

        loader.load('models/gltf/tree.glb', function(tree4) {
            tree4.scene.scale.set(.17,.17,.17)
            tree4.scene.position.y = 2;
            tree4.scene.position.x = -5;
            tree4.scene.position.z = -9;

            tree4.scene.traverse(function(model) {
                if(model.isMesh) {
                    model.castShadow = true;
                }
            })

            scene.add(tree4.scene)
        })

    // MOUNTAIN
        loader.load('models/gltf/LowPolyMountain.glb', function(mountain) {
            mountain.scene.scale.set(.3,.3,.3)

            mountain.scene.position.y = 2
            mountain.scene.position.x = -3.5
            mountain.scene.position.z = -2

            mountain.scene.traverse(function(model) {
                if(model.isMesh) {
                    model.castShadow = true;
                }
            })

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

            cloud.traverse(function(model) {
                if(model.isMesh) {
                    model.castShadow = true;
                }
            });

            cloud.position.x = -2
            cloud.position.y = 10
            cloud.position.z = 0

            ///////////////// TWEEN LOOP VIA CHAINS
            let target0 = new THREE.Vector3(-2,10,0);
            let target1 = new THREE.Vector3(-1,10,-1);
            
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

            cloud2.traverse(function(model) {
                if(model.isMesh) {
                    model.castShadow = true;
                }
            })

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
            cloud3 = cloud3.scene
            cloud3.scale.set(.5,.5,.5)

            cloud3.position.x = -3
            cloud3.position.y = 8
            cloud3.position.z = 8

            cloud3.traverse(function(model) {
                if(model.isMesh) {
                    model.castShadow = true;
                }
            })

            let target0 = new THREE.Vector3(-3,8,8);
            let target1 = new THREE.Vector3(-2.5,8,7);
            
            let t1 = new TWEEN.Tween(cloud3.position) 
                .to(target1, 4000)
                .easing(TWEEN.Easing.Sinusoidal.InOut)

            let t2 = new TWEEN.Tween(cloud3.position)
                .to(target0, 3000)
                .easing(TWEEN.Easing.Sinusoidal.InOut)

            t1.chain(t2)
            t2.chain(t1)
            t1.start();

            cloud3.rotateY(120)
            scene.add(cloud3)
        })

        // SMOKE

        loader.load('models/gltf/smoke.glb', (gltf) => {
            const smoke = gltf.scene
            smoke.scale.set(1,2,1)
            smoke.position.y = 3
            smoke.position.x = 1
            smoke.position.z = 3.8
            scene.add(smoke)

            const mixer2 = new THREE.AnimationMixer( smoke )
            mixer2.clipAction( gltf.animations[0]).play()
            mixer2.timeScale = 3
        
            console.log(gltf.animations)
            mixers.push(mixer2)

        })

        // BIRDS

        loader.load('models/gltf/birds.glb', (gltf) => {
            const birds = gltf.scene
            birds.scale.set(1,1,1)
            birds.position.y = 5
            birds.position.z = 20

            let target = new THREE.Vector3(4,5,-120)
            let birdTween = new TWEEN.Tween(birds.position) 
            .to(target, 30000)
            .easing(TWEEN.Easing.Sinusoidal.InOut)

            birdTween.start()
            
            birds.traverse(function(model) {
                if(model.isMesh) {
                    model.castShadow = true;
                }
            })

            // Can we make this a bird spawn button?
            scene.add(birds)

            const mixer1 = new THREE.AnimationMixer( birds)
            mixer1.clipAction( gltf.animations[0]).play()
            mixer1.timeScale = 4
        
            console.log(gltf.animations)
            mixers.push(mixer1)

            animate()
        })


/////////////////////////////////////////////////////////////////////////
//// INTRO CAMERA ANIMATION USING TWEEN
function introAnimation() {
    controls.enabled = false //disable orbit controls to animate the camera
    
    new TWEEN.Tween(camera.position.set(26,8,-35 )).to({ // from camera position
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

introAnimation() // call intro animation on start

//////////////////////////////////////////
//// Clickpoint Animations using Tween

function clickpoint1() {
    controls.enabled = false //disable orbit controls to animate the camera
    
    new TWEEN.Tween(camera.position).to({ // from camera position
        x: 25, //desired x position to go
        y: 20, //desired y position to go
        z: 20 //desired z position to go
    }, 4000) // time take to animate
    .delay(0).easing(TWEEN.Easing.Quartic.InOut).start() // define delay, easing
    .onComplete(function () { //on finish animation
        controls.enabled = true //enable orbit controls
        setOrbitControlsLimits() //enable controls limits
        TWEEN.remove(this) // remove the animation from memory
    })
}

document.getElementById('btn1').addEventListener('click', clickpoint1)


function clickpoint2() {
    controls.enabled = false //disable orbit controls to animate the camera
    
    new TWEEN.Tween(camera.position).to({ // from camera position
        x: 10, //desired x position to go
        y: 5, //desired y position to go
        z: 17 //desired z position to go
    }, 4000) // time take to animate
    .delay(0).easing(TWEEN.Easing.Quartic.InOut).start() // define delay, easing
    .onComplete(function () { //on finish animation
        controls.enabled = true //enable orbit controls
        setOrbitControlsLimits() //enable controls limits
        TWEEN.remove(this) // remove the animation from memory
    })
}

document.getElementById('btn2').addEventListener('click', clickpoint2)

/////////////////////////////////////////////////////////////////////////
//// DEFINE ORBIT CONTROLS LIMITS
function setOrbitControlsLimits(){
    controls.enableDamping = true
    controls.dampingFactor = 0.04
    controls.minDistance = 1
    controls.maxDistance = 60
    controls.enableRotate = true
    controls.enableZoom = true
    controls.maxPolarAngle = Math.PI /2.4
}

// create parameters for GUI
var params = {color: sunLight.color.getHex(), color2: ambient.color.getHex(), color3: scene.background.getHex()}


// create a function to be called by GUI
const update = function () {
	var colorObj = new THREE.Color( params.color )
	var colorObj2 = new THREE.Color( params.color2 )
	var colorObj3 = new THREE.Color( params.color3 )
	sunLight.color.set(colorObj)
	ambient.color.set(colorObj2)
	scene.background.set(colorObj3)
}

//////////////////////////////////////////////////
//// GUI CONFIG 

gui.add(sunLight, 'intensity').min(0).max(2).step(0.0001).name('Sun Intensity')
gui.add(sunLight.position, 'x').min(-100).max(100).step(0.00001).name('Sun Position X')
gui.add(sunLight.position, 'y').min(0).max(100).step(0.00001).name('Sun Position Y')
gui.add(sunLight.position, 'z').min(-100).max(100).step(0.00001).name('Sun Position Z')
// gui.addColor(params,'color').name('Light Color').onChange(update)
gui.addColor(params,'color2').name('Ambient color').onChange(update)
// gui.add(ambient, 'intensity').min(0).max(10).step(0.001).name('Ambient intensity')
gui.addColor(params,'color3').name('Sky Color').onChange(update)


//////////////////////////////////////////////////
//// ON MOUSE MOVE TO GET CAMERA POSITION
document.addEventListener('mousemove', (event) => {
    event.preventDefault()

    //console.log(camera.position)

}, false)


const clock = new THREE.Clock()

function animate() {
	requestAnimationFrame( animate );
	// Get the time elapsed since the last frame
	var mixerUpdateDelta = clock.getDelta();
	// Update all the animation frames
	for ( var i = 0; i < mixers.length; ++ i ) {
		mixers[ i ].update( mixerUpdateDelta );
	}		
	renderer.render( scene, camera );
}
/////////////////////////////////////////////////////////////////////////
//// RENDER LOOP FUNCTION
function renderLoop() {
    const elapsedTime = clock.getElapsedTime()

    TWEEN.update() // update movements

    controls.update() // update orbit controls

    renderer.render(scene, camera) // render the scene using the camera

    requestAnimationFrame(renderLoop) //loop the render function
    
}

renderLoop() //start rendering