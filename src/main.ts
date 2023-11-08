import {Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh} from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

let scene: Scene, camera: PerspectiveCamera, renderer: WebGLRenderer, controls: OrbitControls 

let canvas = document.querySelector<HTMLDivElement>("#app")!

function main() {
  init()
  drawGeometry()
  animate()
}

function init() {
  scene = new Scene()
  camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  renderer = new WebGLRenderer({canvas})
  controls = new OrbitControls(camera, renderer.domElement)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function drawGeometry() {
  const geometry = new BoxGeometry(1, 1, 1)
  const material = new MeshBasicMaterial({color: 0xf05400})
  const cube = new Mesh(geometry, material)
  scene.add(cube)
  camera.position.z = 5;
}

function animate() {
  requestAnimationFrame(animate)
  controls.update()

  renderer.render(scene, camera)
}

main()


