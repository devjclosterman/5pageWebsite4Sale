const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('globe-container').appendChild(renderer.domElement);

// Earth
const geometry = new THREE.SphereGeometry(1, 32, 32);
const texture = new THREE.TextureLoader().load('earth_texture.jpg'); // you'll need to add this image
const material = new THREE.MeshBasicMaterial({ map: texture });
const earth = new THREE.Mesh(geometry, material);
scene.add(earth);

// Stars
const starGeometry = new THREE.BufferGeometry();
const starCount = 1000;
const starVertices = [];

for (let i = 0; i < starCount; i++) {
starVertices.push(
(Math.random() - 0.5) * 2000,
(Math.random() - 0.5) * 2000,
-Math.random() * 1000
);
}
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });
const starField = new THREE.Points(starGeometry, starMaterial);
scene.add(starField);

// Animation loop
function animate() {
requestAnimationFrame(animate);
earth.rotation.y += 0.001;
renderer.render(scene, camera);
}
animate();