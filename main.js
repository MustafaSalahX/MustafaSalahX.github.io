// main.js

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initNavbar();
  initMobileMenu();
  initScrollAnimations();
  initThreeJsBackground();
  initGyroscope();
});

// --- Shared Motion State ---
const motionState = {
  x: 0,
  y: 0,
  targetX: 0,
  targetY: 0,
  isGyroActive: false
};

// --- Custom Cursor ---
function initCustomCursor() {
  const cursor = document.querySelector('.cursor');
  if (!cursor) return;

  // Hide default cursor globally
  document.documentElement.style.cursor = 'none';

  // Track mouse movement
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  // Add hover effect for links and buttons
  const interactiveElements = document.querySelectorAll('a, button, .chip, .project-card');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
  });

  // Hide custom cursor on touch-only devices for performance and UX
  // But ensure it stays on if a mouse is being used (fine-tuned pointer)
  if (window.matchMedia("(pointer: coarse)").matches && !window.matchMedia("(pointer: fine)").matches) {
    cursor.style.display = 'none';
    document.documentElement.style.cursor = 'auto'; // Restore default cursor
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => el.style.cursor = 'auto');
  }
}

// --- Navbar Scroll Effect ---
function initNavbar() {
  const navbar = document.getElementById('navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// --- Mobile Menu Toggle ---
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });

    // Close menu when clicking a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
      });
    });
  }
}

// --- Scroll Animations (Intersection Observer) ---
function initScrollAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Stop observing once visible
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => {
    observer.observe(el);
  });
}

// --- Three.js Background ---
function initThreeJsBackground() {
  const container = document.getElementById('canvas-container');
  if (!container || typeof THREE === 'undefined') return;

  // Scene setup
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0a0a0f, 0.001);

  // Camera setup
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 30;

  // Renderer setup
  const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  // Cap pixel ratio to 1 for significant performance boost
  renderer.setPixelRatio(1);
  container.appendChild(renderer.domElement);

  // 1. Particle Field (Dynamically set based on screen width for performance)
  const isMobile = window.innerWidth < 768;
  const particleCount = isMobile ? 500 : 1000;
  const particlesGeometry = new THREE.BufferGeometry();
  const posArray = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i++) {
    // Spread particles over a large volume
    posArray[i] = (Math.random() - 0.5) * 100;
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.05,
    color: 0x00c3ff,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  });

  const particleMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particleMesh);

  // 2. Interactive 3D Computer Model
  const computerGroup = new THREE.Group();

  // Screen Canvas Texture Setup
  const screenCanvas = document.createElement('canvas');
  screenCanvas.width = 1024;
  screenCanvas.height = 640;
  const screenCtx = screenCanvas.getContext('2d');

  function drawScreen(cursorVisible) {
    // Terminal Background
    screenCtx.fillStyle = '#0a0c16';
    screenCtx.fillRect(0, 0, 1024, 640);

    // Terminal Window Bar
    screenCtx.fillStyle = '#131625';
    screenCtx.fillRect(0, 0, 1024, 48);

    // Window control buttons (Red, Yellow, Green)
    screenCtx.fillStyle = '#ff5f56';
    screenCtx.beginPath();
    screenCtx.arc(30, 24, 7, 0, Math.PI * 2);
    screenCtx.fill();

    screenCtx.fillStyle = '#ffbd2e';
    screenCtx.beginPath();
    screenCtx.arc(54, 24, 7, 0, Math.PI * 2);
    screenCtx.fill();

    screenCtx.fillStyle = '#27c93f';
    screenCtx.beginPath();
    screenCtx.arc(78, 24, 7, 0, Math.PI * 2);
    screenCtx.fill();

    // Window Tab Title
    screenCtx.fillStyle = '#8f9bb3';
    screenCtx.font = '600 16px monospace, sans-serif';
    screenCtx.textAlign = 'center';
    screenCtx.fillText('mustafa-salah@dev-workstation: ~/portfolio', 512, 30);

    // Code & Terminal Lines
    screenCtx.textAlign = 'left';
    screenCtx.font = '500 20px monospace, sans-serif';

    const lines = [
      { num: '01', color: '#6272a4', text: '// Mustafa Salah — Full-Stack Software Engineer' },
      { num: '02', color: '#bd93f9', text: 'import { NextJS, NestJS, GraphQL } from "production";' },
      { num: '03', color: '#f8f8f2', text: 'const engineer = new Engineer({' },
      { num: '04', color: '#f1fa8c', text: '  name: "Mustafa Salah",' },
      { num: '05', color: '#50fa7b', text: '  status: "OPEN_TO_WORK",' },
      { num: '06', color: '#8be9fd', text: '  stack: ["Next.js", "NestJS", "PostgreSQL", "Docker"],' },
      { num: '07', color: '#ff79c6', text: '  architecture: "Scalable Microservices & REST"' },
      { num: '08', color: '#f8f8f2', text: '});' },
      { num: '09', color: '#50fa7b', text: 'await engineer.deployHighPerformanceSystem();' },
      { num: '10', color: '#00c3ff', text: '> System initialized: 100% test coverage [OK]' },
      { num: '11', color: '#00f5a0', text: '> Ready on https://mustafasalahx.github.io' + (cursorVisible ? ' █' : '') }
    ];

    let startY = 95;
    const lineHeight = 46;

    lines.forEach((line) => {
      // Line number
      screenCtx.fillStyle = '#3a415a';
      screenCtx.fillText(line.num, 30, startY);

      // Line content
      screenCtx.fillStyle = line.color;
      screenCtx.fillText(line.text, 80, startY);
      startY += lineHeight;
    });

    // Subtle scanlines overlay
    screenCtx.fillStyle = 'rgba(0, 245, 160, 0.02)';
    for (let y = 48; y < 640; y += 4) {
      screenCtx.fillRect(0, y, 1024, 2);
    }
  }

  drawScreen(true);
  const screenTexture = new THREE.CanvasTexture(screenCanvas);
  screenTexture.minFilter = THREE.LinearFilter;
  screenTexture.magFilter = THREE.LinearFilter;

  // Keyboard Canvas Texture Setup
  const kbCanvas = document.createElement('canvas');
  kbCanvas.width = 1024;
  kbCanvas.height = 420;
  const kbCtx = kbCanvas.getContext('2d');

  function drawKeyboard() {
    kbCtx.fillStyle = '#0f111a';
    kbCtx.fillRect(0, 0, 1024, 420);

    // Keyboard well border glow
    kbCtx.strokeStyle = 'rgba(0, 195, 255, 0.2)';
    kbCtx.lineWidth = 2;
    kbCtx.strokeRect(10, 10, 1004, 400);

    // Draw stylized key rows
    const rows = 5;
    const rowHeight = 62;
    const gap = 8;
    const startY = 25;

    for (let r = 0; r < rows; r++) {
      const y = startY + r * (rowHeight + gap);
      const cols = r === 0 ? 14 : (r === 4 ? 8 : 13);
      const totalWidth = 980;
      const keyWidth = (totalWidth - (cols - 1) * gap) / cols;

      for (let c = 0; c < cols; c++) {
        let kw = keyWidth;
        let kx = 22 + c * (keyWidth + gap);

        // Special wide spacebar in bottom row
        if (r === 4) {
          if (c === 3) {
            kw = keyWidth * 3.5;
          } else if (c > 3) {
            kx += keyWidth * 2.5;
          }
        }

        // Keycap body
        kbCtx.fillStyle = '#161926';
        kbCtx.beginPath();
        if (typeof kbCtx.roundRect === 'function') {
          kbCtx.roundRect(kx, y, kw, rowHeight, 4);
        } else {
          kbCtx.rect(kx, y, kw, rowHeight);
        }
        kbCtx.fill();

        // Keycap neon outline
        kbCtx.strokeStyle = 'rgba(0, 195, 255, 0.25)';
        kbCtx.lineWidth = 1.5;
        kbCtx.stroke();

        // Backlight accent for spacebar
        if (r === 4 && c === 3) {
          kbCtx.fillStyle = 'rgba(0, 245, 160, 0.7)';
          kbCtx.fillRect(kx + 20, y + rowHeight / 2 - 1, kw - 40, 2);
        }
      }
    }
  }

  drawKeyboard();
  const kbTexture = new THREE.CanvasTexture(kbCanvas);
  kbTexture.minFilter = THREE.LinearFilter;

  // Back Logo Canvas Texture
  const logoCanvas = document.createElement('canvas');
  logoCanvas.width = 512;
  logoCanvas.height = 512;
  const logoCtx = logoCanvas.getContext('2d');

  function drawLogo() {
    logoCtx.fillStyle = '#10121d';
    logoCtx.fillRect(0, 0, 512, 512);

    // Glowing circle
    logoCtx.strokeStyle = '#00c3ff';
    logoCtx.lineWidth = 8;
    logoCtx.shadowColor = '#00f5a0';
    logoCtx.shadowBlur = 25;
    logoCtx.beginPath();
    logoCtx.arc(256, 256, 120, 0, Math.PI * 2);
    logoCtx.stroke();

    // Monogram text
    logoCtx.fillStyle = '#ffffff';
    logoCtx.font = '800 75px sans-serif';
    logoCtx.textAlign = 'center';
    logoCtx.fillText('MS', 242, 280);

    logoCtx.fillStyle = '#00f5a0';
    logoCtx.fillText('.', 305, 280);
  }

  drawLogo();
  const logoTexture = new THREE.CanvasTexture(logoCanvas);
  logoTexture.minFilter = THREE.LinearFilter;

  // Materials
  const chassisMaterial = new THREE.MeshStandardMaterial({
    color: 0x121420,
    metalness: 0.85,
    roughness: 0.25
  });

  const bezelMaterial = new THREE.MeshStandardMaterial({
    color: 0x0a0b12,
    metalness: 0.5,
    roughness: 0.5
  });

  const edgeMaterial = new THREE.LineBasicMaterial({
    color: 0x00c3ff,
    transparent: true,
    opacity: 0.35
  });

  // Base Assembly
  const baseMesh = new THREE.Mesh(new THREE.BoxGeometry(14, 0.45, 9.6), chassisMaterial);
  const baseEdges = new THREE.LineSegments(new THREE.EdgesGeometry(baseMesh.geometry), edgeMaterial);
  baseMesh.add(baseEdges);
  computerGroup.add(baseMesh);

  // Keyboard Surface
  const kbMaterial = new THREE.MeshBasicMaterial({ map: kbTexture });
  const kbMesh = new THREE.Mesh(new THREE.PlaneGeometry(12.6, 5.2), kbMaterial);
  kbMesh.rotation.x = -Math.PI / 2;
  kbMesh.position.set(0, 0.23, -1.2);
  computerGroup.add(kbMesh);

  // Trackpad
  const trackpadMaterial = new THREE.MeshStandardMaterial({
    color: 0x181a26,
    metalness: 0.4,
    roughness: 0.3
  });
  const trackpadMesh = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.02, 2.8), trackpadMaterial);
  trackpadMesh.position.set(0, 0.23, 2.6);
  const trackpadEdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(trackpadMesh.geometry),
    new THREE.LineBasicMaterial({ color: 0x00f5a0, transparent: true, opacity: 0.4 })
  );
  trackpadMesh.add(trackpadEdges);
  computerGroup.add(trackpadMesh);

  // Hinge
  const hingeMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(0.25, 0.25, 12, 16),
    new THREE.MeshStandardMaterial({ color: 0x1a1d2e, metalness: 0.9, roughness: 0.2 })
  );
  hingeMesh.rotation.z = Math.PI / 2;
  hingeMesh.position.set(0, 0.22, -4.75);
  computerGroup.add(hingeMesh);

  // Screen Lid Group (pivot along hinge at z = -4.75)
  const lidGroup = new THREE.Group();
  lidGroup.position.set(0, 0.22, -4.75);
  lidGroup.rotation.x = -Math.PI * 0.18; // ~112 deg open

  // Lid chassis
  const lidChassis = new THREE.Mesh(new THREE.BoxGeometry(14, 9.2, 0.28), chassisMaterial);
  lidChassis.position.set(0, 4.6, 0);
  const lidEdges = new THREE.LineSegments(new THREE.EdgesGeometry(lidChassis.geometry), edgeMaterial);
  lidChassis.add(lidEdges);
  lidGroup.add(lidChassis);

  // Screen bezel
  const bezelMesh = new THREE.Mesh(new THREE.BoxGeometry(13.6, 8.8, 0.05), bezelMaterial);
  bezelMesh.position.set(0, 4.6, 0.14);
  lidGroup.add(bezelMesh);

  // Active Display Screen
  const screenMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(13.0, 8.2),
    new THREE.MeshBasicMaterial({ map: screenTexture })
  );
  screenMesh.position.set(0, 4.6, 0.17);
  lidGroup.add(screenMesh);

  // Back Logo
  const logoMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(2.8, 2.8),
    new THREE.MeshBasicMaterial({ map: logoTexture, transparent: true })
  );
  logoMesh.position.set(0, 4.6, -0.15);
  logoMesh.rotation.y = Math.PI;
  lidGroup.add(logoMesh);

  computerGroup.add(lidGroup);

  // Initial Computer Placement and Responsive Sizing
  const updateComputerScale = () => {
    const isMobileDevice = window.innerWidth < 768;
    const scale = isMobileDevice ? 0.75 : 1.15;
    computerGroup.scale.set(scale, scale, scale);
    computerGroup.position.set(0, isMobileDevice ? 0 : 0.5, -6);
  };
  updateComputerScale();

  scene.add(computerGroup);

  // 3. Lighting (Dual Neon Accent & Ambient Soft Glow)
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight.position.set(10, 20, 20);
  scene.add(dirLight);

  const pointLight = new THREE.PointLight(0x00c3ff, 2.5, 60);
  pointLight.position.set(-10, 10, 15);
  scene.add(pointLight);

  const neonAccentLight = new THREE.PointLight(0x00f5a0, 1.8, 40);
  neonAccentLight.position.set(12, -5, 10);
  scene.add(neonAccentLight);

  // Interaction State

  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;
  const heroContent = document.querySelector('.hero-content');
  const floatingCode = document.querySelector('.floating-code');

  document.addEventListener('mousemove', (event) => {
    if (!motionState.isGyroActive) {
      motionState.x = (event.clientX - windowHalfX) * 0.001;
      motionState.y = (event.clientY - windowHalfY) * 0.001;
    }
  });

  // Handle Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    updateComputerScale();
  });

  // Animation Loop
  const clock = new THREE.Clock();
  let lastCursorState = true;

  function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // 3D Computer Levitation & Smooth Rotation
    computerGroup.position.y = (window.innerWidth < 768 ? 0 : 0.5) + Math.sin(elapsedTime * 1.0) * 0.5;
    computerGroup.rotation.y = elapsedTime * 0.2;
    computerGroup.rotation.x = 0.25 + Math.sin(elapsedTime * 0.8) * 0.04;
    computerGroup.rotation.z = Math.cos(elapsedTime * 0.7) * 0.03;

    // Terminal cursor blink (every ~500ms)
    const cursorVisible = Math.floor(elapsedTime * 2) % 2 === 0;
    if (cursorVisible !== lastCursorState) {
      lastCursorState = cursorVisible;
      drawScreen(cursorVisible);
      screenTexture.needsUpdate = true;
    }

    // Rotate particle field slowly
    particleMesh.rotation.y = elapsedTime * 0.05;

    // Smoothly ease mouse/gyro target
    motionState.targetX += (motionState.x - motionState.targetX) * 0.05;
    motionState.targetY += (motionState.y - motionState.targetY) * 0.05;

    // React to motion: slight tilt of the whole scene
    scene.rotation.x = motionState.targetY * 0.5;
    scene.rotation.y = motionState.targetX * 0.5;

    // Apply CSS Parallax to Hero Content
    if (heroContent) {
      const tx = motionState.targetX * 50; // Max 50px shift
      const ty = motionState.targetY * 50;
      heroContent.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
    }
    
    if (floatingCode && window.innerWidth > 1024) {
      const tx = motionState.targetX * -30; // Inverse direction for depth
      const ty = motionState.targetY * -30;
      floatingCode.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
    }

    renderer.render(scene, camera);
  }

  animate();
}

// --- Gyroscope & OS Detection ---
function initGyroscope() {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const motionToggle = document.getElementById('motion-toggle');
  
  if (!window.DeviceOrientationEvent) return;

  if (isIOS) {
    // Check if permission is needed (iOS 13+)
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      motionToggle.classList.add('visible');
      
      motionToggle.addEventListener('click', () => {
        DeviceOrientationEvent.requestPermission()
          .then(permissionState => {
            if (permissionState === 'granted') {
              startGyro();
              motionToggle.classList.remove('visible');
            }
          })
          .catch(console.error);
      });
    } else {
      // Older iOS or permission already granted
      startGyro();
    }
  } else {
    // Android or other devices: start immediately if orientation is supported
    startGyro();
  }

  function startGyro() {
    window.addEventListener('deviceorientation', (e) => {
      // Only "activate" gyro if we actually receive meaningful data
      if (e.beta !== null && e.gamma !== null) {
        motionState.isGyroActive = true;
        
        // Normalize values
        const x = e.gamma || 0; 
        const y = e.beta || 0;  
        
        motionState.x = Math.max(-1, Math.min(1, x / 20)) * 0.5;
        motionState.y = Math.max(-1, Math.min(1, (y - 45) / 20)) * 0.5;
      }
    });
  }
}
