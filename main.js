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

  // 2. Wireframe Torus Knot (Reduced geometry complexity)
  const geometry = new THREE.TorusKnotGeometry(10, 3, 64, 8);
  const material = new THREE.MeshBasicMaterial({ 
    color: 0x00f5a0, 
    wireframe: true,
    transparent: true,
    opacity: 0.15
  });
  const torusKnot = new THREE.Mesh(geometry, material);
  torusKnot.position.z = -15; // Push it to the background
  scene.add(torusKnot);

  // 3. Lighting (Ambient Soft Glow)
  const pointLight = new THREE.PointLight(0x00c3ff, 2, 50);
  pointLight.position.set(0, 0, 10);
  scene.add(pointLight);

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
    
    // Optional: could re-evaluate particle count on resize, but usually not necessary
  });

  // Animation Loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Rotate torus knot
    torusKnot.rotation.x = elapsedTime * 0.1;
    torusKnot.rotation.y = elapsedTime * 0.15;

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
