import "./style.css";

import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import heart from "./shapes/heart";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicecPixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

const geometry = new THREE.TetrahedronGeometry(5, 0);
const material = new THREE.MeshStandardMaterial({
  color: 0x001f5f,
});
const tetrahedron = new THREE.Mesh(geometry, material);

scene.add(tetrahedron);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
const ambLight = new THREE.AmbientLight(0xffffff);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);

scene.add(pointLight, ambLight, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

// function randomFlakes() {
//   // const geometry = new THREE.RingGeometry(2,1,10,6,0,6);
//   const geometry = new THREE.SphereGeometry(0.25, 24, 24);
//   const material = new THREE.MeshStandardMaterial({ color: 0xC2E032 });
//   const flake = new THREE.Mesh( geometry, material );

//   const[x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100));

//   flake.position.set(x,y,z);
//   scene.add(flake);
// }

function randomHearts() {

  const[x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100));

  heart.position.set(x,y,z);
  scene.add(heart);
}

Array(200).fill().forEach(randomHearts);
console.log(heart);

const worldTexture =  new THREE.TextureLoader().load('../pictures/dalleWorld.jpg');
scene.background = worldTexture;

//infinite loop to constantly rerender
function animate() {
  requestAnimationFrame(animate);
  tetrahedron.rotation.x += 0.002;
  tetrahedron.rotation.y += 0.004;
  tetrahedron.rotation.z += 0.003;
  controls.update();
  renderer.render(scene, camera);
}

animate();
