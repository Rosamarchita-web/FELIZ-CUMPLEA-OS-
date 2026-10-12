// Configuración principal de Three.js
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x030305, 0.012);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 14);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Controles de órbita
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.maxPolarAngle = Math.PI / 2 + 0.1;
controls.minDistance = 5;
controls.maxDistance = 25;

// Iluminación
const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xfff5e6, 1.8);
dirLight.position.set(10, 20, 15);
scene.add(dirLight);

const pointLight = new THREE.PointLight(0xff6b8b, 3, 20);
pointLight.position.set(0, 3, 0);
scene.add(pointLight);

// --- CONSTRUCCIÓN DEL PASTEL 3D DE 19 AÑOS ---
const cakeGroup = new THREE.Group();

// Base inferior
const baseGeo = new THREE.CylinderGeometry(3.2, 3.4, 1.8, 32);
const baseMat = new THREE.MeshStandardMaterial({ color: 0xff6b8b, roughness: 0.3 });
const cakeBase = new THREE.Mesh(baseGeo, baseMat);
cakeBase.position.y = 0.9;
cakeGroup.add(cakeBase);

// Piso superior
const topGeo = new THREE.CylinderGeometry(2.2, 2.4, 1.4, 32);
const topMat = new THREE.MeshStandardMaterial({ color: 0xffb5a7, roughness: 0.3 });
const cakeTop = new THREE.Mesh(topGeo, topMat);
cakeTop.position.y = 2.5;
cakeGroup.add(cakeTop);

// Glaseado
const frostingGeo = new THREE.CylinderGeometry(2.25, 2.25, 0.4, 32);
const frostingMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 });
const frosting = new THREE.Mesh(frostingGeo, frostingMat);
frosting.position.y = 3.0;
cakeGroup.add(frosting);

// Velas
const candlesGroup = new THREE.Group();
const candleGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.2, 16);
const candleMat = new THREE.MeshStandardMaterial({ color: 0x4ea8de, roughness: 0.2 });
const flameMat = new THREE.MeshBasicMaterial({ color: 0xffb703 });

const candleCount = 8;
for (let i = 0; i < candleCount; i++) {
    const angle = (i / candleCount) * Math.PI * 2;
    const radius = 1.3;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    const candle = new THREE.Mesh(candleGeo, candleMat);
    candle.position.set(x, 3.8, z);
    candlesGroup.add(candle);

    const flame = new THREE.Mesh(new THREE.SphereGeometry(0.15, 8, 8), flameMat);
    flame.position.set(x, 4.5, z);
    candlesGroup.add(flame);
}
cakeGroup.add(candlesGroup);

// Número 19
const canvas19 = document.createElement('canvas');
canvas19.width = 256;
canvas19.height = 256;
const ctx19 = canvas19.getContext('2d');
ctx19.fillStyle = '#d90429';
ctx19.font = 'bold 140px Montserrat, sans-serif';
ctx19.textAlign = 'center';
ctx19.textBaseline = 'middle';
ctx19.fillText('19', 128, 128);

const texture19 = new THREE.CanvasTexture(canvas19);
const spriteMat19 = new THREE.SpriteMaterial({ map: texture19, transparent: true });
const sprite19 = new THREE.Sprite(spriteMat19);
sprite19.scale.set(1.8, 1.8, 1.8);
sprite19.position.set(0, 3.9, 0);
cakeGroup.add(sprite19);

scene.add(cakeGroup);

// --- ANILLO ORBITAL DE CORAZONES VENDADOS ---
const orbitHeartsGroup = new THREE.Group();
const orbitHeartCount = 14;
const orbitRadius = 4.8;

function createBandagedHeartTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 128; canvas.height = 128;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#ff3366';
    ctx.beginPath();
    ctx.moveTo(64, 35);
    ctx.bezierCurveTo(64, 15, 20, 15, 20, 55);
    ctx.bezierCurveTo(20, 90, 64, 110, 64, 110);
    ctx.bezierCurveTo(64, 110, 108, 90, 108, 55);
    ctx.bezierCurveTo(108, 15, 64, 15, 64, 35);
    ctx.fill();

    ctx.fillStyle = '#f8f9fa';
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 4;
    ctx.fillRect(25, 45, 78, 22);
    
    ctx.strokeStyle = '#dee2e6';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(25, 45); ctx.lineTo(103, 45);
    ctx.moveTo(25, 67); ctx.lineTo(103, 67);
    ctx.stroke();

    return new THREE.CanvasTexture(canvas);
}

const bandagedHeartTexture = createBandagedHeartTexture();
const bandagedMaterial = new THREE.SpriteMaterial({ map: bandagedHeartTexture });

for (let i = 0; i < orbitHeartCount; i++) {
    const sprite = new THREE.Sprite(bandagedMaterial);
    sprite.scale.set(0.9, 0.9, 0.9);
    orbitHeartsGroup.add(sprite);
}
scene.add(orbitHeartsGroup);

// --- 8 MENSAJES FLOTANTES EN 3D ---
const floatingMessagesGroup = new THREE.Group();
const messagesTexts = [
    "✨ ¡Mucho éxito!", 
    "💖 Te quiero", 
    "🌟 Sonríe siempre", 
    "🎂 ¡Feliz día!", 
    "🚀 A cumplir tus metas", 
    "💫 Sigue brillando", 
    "🎉 ¡Disfruta al 100!", 
    "❤️ Eres increíble",
    " Nunca olvides quien eres",
    " Te quiere tu hermano "
];

function createMessageTexture(text) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    
    // Fondo translúcido elegante estilo tarjeta
    ctx.fillStyle = 'rgba(20, 20, 30, 0.75)';
    ctx.roundRect(10, 10, 492, 108, 20);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 183, 3, 0.6)';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Texto del mensaje
    ctx.fillStyle = '#850a7e';
    ctx.font = 'bold 38px Montserrat, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 256, 64);

    return new THREE.CanvasTexture(canvas);
}

const messageSprites = [];
for (let i = 0; i < messagesTexts.length; i++) {
    const texture = createMessageTexture(messagesTexts[i]);
    const mat = new THREE.SpriteMaterial({ map: texture, transparent: true });
    const sprite = new THREE.Sprite(mat);
    sprite.scale.set(2.8, 0.7, 1);
    
    // Guardar datos individuales para animación flotante orbital
    sprite.userData = {
        baseAngle: (i / messagesTexts.length) * Math.PI * 2,
        radius: 7.0 + (i % 2) * 1.5, // Distancias alternadas desde el centro
        speed: 0.3 + (i % 3) * 0.1,
        yOffset: (i % 2 === 0 ? 1 : -1) * (1.5 + (i * 0.4))
    };
    
    floatingMessagesGroup.add(sprite);
    messageSprites.push(sprite);
}
scene.add(floatingMessagesGroup);

// --- MUCHAS MÁS ESTRELLAS BRILLANTES DE FONDO ---
const starCount = 1000;
const starGeo = new THREE.BufferGeometry();
const starPos = [];
const starColors = [];
const colorChoices = [new THREE.Color(0xfff3b0), new THREE.Color(0x9bf6ff), new THREE.Color(0xffadad), new THREE.Color(0xffffff)];

for (let i = 0; i < starCount; i++) {
    starPos.push((Math.random() - 0.5) * 45, (Math.random() - 0.5) * 35, (Math.random() - 0.5) * 45);
    const col = colorChoices[Math.floor(Math.random() * colorChoices.length)];
    starColors.push(col.r, col.g, col.b);
}

starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));
starGeo.setAttribute('color', new THREE.Float32BufferAttribute(starColors, 3));

const starCanvas = document.createElement('canvas');
starCanvas.width = 32; starCanvas.height = 32;
const sCtx = starCanvas.getContext('2d');
const grad = sCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
grad.addColorStop(0, 'rgba(255,255,255,1)');
grad.addColorStop(0.4, 'rgba(255,230,150,0.8)');
grad.addColorStop(1, 'rgba(103, 126, 228, 0)');
sCtx.fillStyle = grad;
sCtx.fillRect(0,0,32,32);

const starTexture = new THREE.CanvasTexture(starCanvas);
const starMaterial = new THREE.PointsMaterial({
    size: 0.45,
    vertexColors: true,
    map: starTexture,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
});
scene.add(new THREE.Points(starGeo, starMaterial));

// --- POST-PROCESAMIENTO (BRILLO / BLOOM) ---
const renderScene = new THREE.RenderPass(scene, camera);
const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.3, 0.4, 0.8);

const composer = new THREE.EffectComposer(renderer);
composer.addPass(renderScene);
composer.addPass(bloomPass);

// --- ANIMACIÓN PRINCIPAL ---
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Rotación del pastel
    cakeGroup.rotation.y = elapsedTime * 0.4;

    // Animar corazones vendados en órbita
    const children = orbitHeartsGroup.children;
    for (let i = 0; i < children.length; i++) {
        const angle = (i / orbitHeartCount) * Math.PI * 2 + elapsedTime * 0.6;
        const x = Math.cos(angle) * orbitRadius;
        const z = Math.sin(angle) * orbitRadius;
        children[i].position.set(x, Math.sin(elapsedTime * 2 + i) * 0.3 + 1.5, z);
    }

    // Animar los 8 mensajes flotantes alrededor del pastel
    messageSprites.forEach((sprite, idx) => {
        const angle = sprite.userData.baseAngle + elapsedTime * sprite.userData.speed * 0.4;
        const x = Math.cos(angle) * sprite.userData.radius;
        const z = Math.sin(angle) * sprite.userData.radius;
        const y = sprite.userData.yOffset + Math.sin(elapsedTime * 1.5 + idx) * 0.4;
        sprite.position.set(x, y, z);
    });

    // Animar estrellas
    const starPositions = starGeo.attributes.position.array;
    for (let i = 1; i < starPositions.length; i += 3) {
        starPositions[i] -= 0.005;
        if (starPositions[i] < -15) starPositions[i] = 20;
    }
    starGeo.attributes.position.needsUpdate = true;

    controls.update();
    composer.render();
}

animate();

// --- RESPONSIVO ---
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
});