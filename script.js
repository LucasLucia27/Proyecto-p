// ================== ESCENA BASE ==================
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
);

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 180;

// ================== FONDO DE ESTRELLAS ==================
const starGeometry = new THREE.BufferGeometry();
const starVertices = [];

for (let i = 0; i < 12000; i++) {
    starVertices.push(
        (Math.random() - 0.5) * 1500,
        (Math.random() - 0.5) * 1500,
        (Math.random() - 0.5) * 1500
    );
}

starGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(starVertices, 3)
);

const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 1.2
});

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// ================== CORAZÓN DE PARTÍCULAS ==================
const heartVertices = [];

for (let t = 0; t < Math.PI * 2; t += 0.03) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y =
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t);

    heartVertices.push(x * 2, y * 2, 0);
}

const heartGeometry = new THREE.BufferGeometry();
heartGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(heartVertices, 3)
);

const heartMaterial = new THREE.PointsMaterial({
    color: 0xff8bd6,
    size: 2
});

const heartPoints = new THREE.Points(heartGeometry, heartMaterial);
scene.add(heartPoints);

// ================== PARTÍCULAS BRILLANTES (SPARKLES en HTML) ==================
for (let i = 0; i < 300; i++) {
    const s = document.createElement("div");
    s.className = "sparkle";
    s.style.left = Math.random() * 100 + "vw";
    s.style.top = Math.random() * 100 + "vh";
    s.style.animationDelay = Math.random() * 4 + "s";
    document.body.appendChild(s);
}

// ================== MÚSICA ==================
const music = document.getElementById("music");
const startBtn = document.getElementById("start");

startBtn.onclick = () => {
    music.play().catch(() => {
        console.log("No se pudo reproducir automáticamente.");
    });
    startBtn.style.display = "none";

    // Mostrar el popup
    popup.classList.add("show");

    // Ocultarlo solo después de unos segundos
    setTimeout(() => {
        popup.classList.remove("show");
    }, 10000000); // 4000ms = 4 segundos visible
};

// ================== PANTALLA DE INTRO ==================
const intro = document.getElementById("intro");
const enterBtn = document.getElementById("enter");

enterBtn.onclick = () => {
    music.play().catch(() => {});
    intro.style.opacity = "0";
    setTimeout(() => intro.remove(), 1000);
};

// ================== CÁMARA QUE SE MUEVE CON EL MOUSE ==================
let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX / window.innerWidth) - 0.5;
    mouseY = (e.clientY / window.innerHeight) - 0.5;
});

// Soporte para celular (touch)
document.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    if (!touch) return;
    mouseX = (touch.clientX / window.innerWidth) - 0.5;
    mouseY = (touch.clientY / window.innerHeight) - 0.5;
});

// ================== RESPONSIVE (ajusta al cambiar tamaño de ventana) ==================
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ================== ANIMACIÓN ==================
function animate() {
    requestAnimationFrame(animate);

    stars.rotation.y += 0.0005;
    heartPoints.rotation.y += 0.003;

    camera.position.x += (mouseX * 25 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 25 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

animate();