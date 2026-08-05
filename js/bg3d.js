/* ==========================================================================
   BG3D.JS — Three.js Futuristic AI / Cybersecurity 3D Background Engine
   Author: Sharanya N Portfolio
   ========================================================================== */

"use strict";

(function () {
  // Check if Three.js is available
  if (typeof THREE === "undefined") {
    console.warn("Three.js not loaded. 3D background skipped.");
    return;
  }

  // Configuration Constants
  const CONFIG = {
    colors: {
      cyan: 0x00e5ff,
      purple: 0x7c3aed,
      blue: 0x3b82f6,
      darkBlue: 0x050816,
      lightAmbient: 0x0a1128,
    },
    desktop: {
      particleCount: 130,
      maxConnections: 350,
      connectionDistance: 2.3,
      spherePos: { x: 2.5, y: 0.3, z: -0.5 },
      sphereRadius: 1.6,
    },
    mobile: {
      particleCount: 45,
      maxConnections: 90,
      connectionDistance: 1.8,
      spherePos: { x: 0, y: 1.0, z: -1.2 },
      sphereRadius: 1.3,
    },
    bounds: { x: 9.5, y: 6.5, z: 3.5 },
  };

  // State
  let canvas, renderer, scene, camera;
  let particleMesh, particleGeo, particlePositions, particleVelocities, particleColors;
  let linesMesh, linesGeo, linesPositions, linesColors;
  let profileSphereGroup, outerSphere, innerSphere, orbitalRing;
  let cyanLight, purpleLight;
  let floatingShapes = [];
  let animFrameId = null;
  let isPaused = false;
  let isReducedMotion = false;
  let isProfileHovered = false;
  let hoverGlowLerp = 0;

  // Mouse & Parallax
  let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;
  let isMobile = windowWidth < 992;

  /* ==========================================================================
     TEXTURE GENERATOR (Procedural Circular Glow Sprite)
     ========================================================================== */
  function createParticleTexture() {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.2, "rgba(0, 229, 255, 0.9)");
    gradient.addColorStop(0.5, "rgba(124, 58, 237, 0.4)");
    gradient.addColorStop(1, "rgba(5, 8, 22, 0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  /* ==========================================================================
     INITIALIZATION
     ========================================================================== */
  function init() {
    canvas = document.getElementById("bg3d-canvas");
    if (!canvas) {
      // Create canvas if not present in DOM
      canvas = document.createElement("canvas");
      canvas.id = "bg3d-canvas";
      const bgContainer = document.querySelector(".background") || document.body;
      bgContainer.prepend(canvas);
    }

    // Check reduced motion preference
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    isReducedMotion = motionQuery.matches;
    motionQuery.addEventListener("change", (e) => {
      isReducedMotion = e.matches;
    });

    // 1. Renderer Setup
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(windowWidth, windowHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;

    // 2. Scene & Camera Setup
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(CONFIG.colors.darkBlue, 0.045);

    camera = new THREE.PerspectiveCamera(55, windowWidth / windowHeight, 0.1, 100);
    camera.position.z = 7.0;

    // 3. Lighting
    setupLights();

    // 4. Scene Objects
    createProfileSphere();
    createNeuralWeb();
    createFloatingShapes();

    // 5. Event Listeners
    bindEvents();

    // 6. Start Render Loop
    if (!isPaused) {
      animate();
    }
  }

  /* ==========================================================================
     LIGHTING
     ========================================================================== */
  function setupLights() {
    const ambientLight = new THREE.AmbientLight(CONFIG.colors.lightAmbient, 1.4);
    scene.add(ambientLight);

    // Cyan Accent Light (Left-Center)
    cyanLight = new THREE.PointLight(CONFIG.colors.cyan, 2.6, 25);
    cyanLight.position.set(-4.5, 2.0, 2.0);
    scene.add(cyanLight);

    // Purple Rim Light (Right-Top behind profile)
    purpleLight = new THREE.PointLight(CONFIG.colors.purple, 3.2, 25);
    purpleLight.position.set(4.0, 3.0, 0.5);
    scene.add(purpleLight);

    // Subtle Blue Directional Fill
    const dirLight = new THREE.DirectionalLight(CONFIG.colors.blue, 0.75);
    dirLight.position.set(0, -3, 3);
    scene.add(dirLight);
  }

  /* ==========================================================================
     HOLOGRAPHIC PROFILE SPHERE
     ========================================================================== */
  function createProfileSphere() {
    profileSphereGroup = new THREE.Group();
    const settings = isMobile ? CONFIG.mobile : CONFIG.desktop;
    profileSphereGroup.position.set(settings.spherePos.x, settings.spherePos.y, settings.spherePos.z);

    const radius = settings.sphereRadius;

    // Outer Wireframe Sphere
    const outerGeo = new THREE.IcosahedronGeometry(radius, 2);
    const outerMat = new THREE.MeshBasicMaterial({
      color: CONFIG.colors.cyan,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    outerSphere = new THREE.Mesh(outerGeo, outerMat);
    profileSphereGroup.add(outerSphere);

    // Inner Glowing Core Polyhedron
    const innerGeo = new THREE.IcosahedronGeometry(radius * 0.75, 1);
    const innerMat = new THREE.MeshBasicMaterial({
      color: CONFIG.colors.purple,
      wireframe: true,
      transparent: true,
      opacity: 0.24,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    innerSphere = new THREE.Mesh(innerGeo, innerMat);
    profileSphereGroup.add(innerSphere);

    // Orbiting Cyber Particle Ring
    const ringCount = 60;
    const ringGeo = new THREE.BufferGeometry();
    const ringPositions = new Float32Array(ringCount * 3);
    const ringColors = new Float32Array(ringCount * 3);
    const ringRadius = radius * 1.35;

    const cyanC = new THREE.Color(CONFIG.colors.cyan);
    const purpleC = new THREE.Color(CONFIG.colors.purple);

    for (let i = 0; i < ringCount; i++) {
      const theta = (i / ringCount) * Math.PI * 2;
      ringPositions[i * 3] = Math.cos(theta) * ringRadius;
      ringPositions[i * 3 + 1] = Math.sin(theta) * ringRadius * 0.4;
      ringPositions[i * 3 + 2] = Math.sin(theta) * ringRadius;

      const mixed = cyanC.clone().lerp(purpleC, (Math.sin(theta) + 1) / 2);
      ringColors[i * 3] = mixed.r;
      ringColors[i * 3 + 1] = mixed.g;
      ringColors[i * 3 + 2] = mixed.b;
    }

    ringGeo.setAttribute("position", new THREE.BufferAttribute(ringPositions, 3));
    ringGeo.setAttribute("color", new THREE.BufferAttribute(ringColors, 3));

    const ringMat = new THREE.PointsMaterial({
      size: 0.08,
      map: createParticleTexture(),
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    orbitalRing = new THREE.Points(ringGeo, ringMat);
    orbitalRing.rotation.x = Math.PI * 0.28;
    orbitalRing.rotation.y = Math.PI * 0.15;
    profileSphereGroup.add(orbitalRing);

    scene.add(profileSphereGroup);
  }

  /* ==========================================================================
     NEURAL NETWORK PARTICLES & CONNECTION LINES
     ========================================================================== */
  function createNeuralWeb() {
    const settings = isMobile ? CONFIG.mobile : CONFIG.desktop;
    const count = settings.particleCount;

    // 1. Particles
    particleGeo = new THREE.BufferGeometry();
    particlePositions = new Float32Array(count * 3);
    particleVelocities = [];
    particleColors = new Float32Array(count * 3);

    const palette = [
      new THREE.Color(CONFIG.colors.cyan),
      new THREE.Color(CONFIG.colors.purple),
      new THREE.Color(CONFIG.colors.blue),
      new THREE.Color(0xa855f7),
      new THREE.Color(0x38bdf8),
    ];

    for (let i = 0; i < count; i++) {
      // Distribute evenly across bounds
      particlePositions[i * 3] = (Math.random() - 0.5) * CONFIG.bounds.x * 2;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * CONFIG.bounds.y * 2;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * CONFIG.bounds.z * 2;

      // Gentle drift velocity
      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.0035,
        y: (Math.random() - 0.5) * 0.0035,
        z: (Math.random() - 0.5) * 0.0025,
      });

      const color = palette[Math.floor(Math.random() * palette.length)];
      particleColors[i * 3] = color.r;
      particleColors[i * 3 + 1] = color.g;
      particleColors[i * 3 + 2] = color.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: isMobile ? 0.13 : 0.16,
      map: createParticleTexture(),
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    particleMesh = new THREE.Points(particleGeo, particleMat);
    scene.add(particleMesh);

    // 2. Neural Connection Lines
    const maxConnections = settings.maxConnections;
    linesPositions = new Float32Array(maxConnections * 2 * 3);
    linesColors = new Float32Array(maxConnections * 2 * 3);

    linesGeo = new THREE.BufferGeometry();
    linesGeo.setAttribute("position", new THREE.BufferAttribute(linesPositions, 3));
    linesGeo.setAttribute("color", new THREE.BufferAttribute(linesColors, 3));

    const linesMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    linesMesh = new THREE.LineSegments(linesGeo, linesMat);
    scene.add(linesMesh);
  }

  /* ==========================================================================
     FLOATING GEOMETRIC CYBER SHAPES
     ========================================================================== */
  function createFloatingShapes() {
    const shapeConfigs = [
      {
        geo: new THREE.IcosahedronGeometry(0.55, 0),
        color: CONFIG.colors.cyan,
        pos: [-5.0, 2.5, -1.8],
        rotSpeed: { x: 0.002, y: 0.003, z: 0.001 },
        floatPhase: 0,
      },
      {
        geo: new THREE.BoxGeometry(0.65, 0.65, 0.65),
        color: CONFIG.colors.purple,
        pos: [-5.8, -2.4, -1.0],
        rotSpeed: { x: 0.0015, y: -0.002, z: 0.0025 },
        floatPhase: Math.PI * 0.5,
      },
      {
        geo: new THREE.OctahedronGeometry(0.6, 0),
        color: CONFIG.colors.blue,
        pos: [5.2, -2.8, -1.5],
        rotSpeed: { x: -0.002, y: 0.0025, z: 0.001 },
        floatPhase: Math.PI * 1.0,
      },
      {
        geo: new THREE.TetrahedronGeometry(0.5, 0),
        color: 0xa855f7,
        pos: [4.2, 3.2, -2.2],
        rotSpeed: { x: 0.0025, y: -0.002, z: 0.0015 },
        floatPhase: Math.PI * 1.5,
      },
      {
        geo: new THREE.DodecahedronGeometry(0.42, 0),
        color: 0x38bdf8,
        pos: [-2.0, -3.4, -0.5],
        rotSpeed: { x: -0.0015, y: -0.002, z: 0.002 },
        floatPhase: Math.PI * 0.75,
      },
    ];

    shapeConfigs.forEach((cfg) => {
      const mat = new THREE.MeshBasicMaterial({
        color: cfg.color,
        wireframe: true,
        transparent: true,
        opacity: 0.22,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const mesh = new THREE.Mesh(cfg.geo, mat);
      mesh.position.set(cfg.pos[0], cfg.pos[1], cfg.pos[2]);

      floatingShapes.push({
        mesh,
        baseY: cfg.pos[1],
        rotSpeed: cfg.rotSpeed,
        floatPhase: cfg.floatPhase,
      });

      scene.add(mesh);
    });
  }

  /* ==========================================================================
     INTERACTIONS & EVENT BINDINGS
     ========================================================================== */
  function bindEvents() {
    // Mouse Move Parallax
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Window Resize
    window.addEventListener("resize", onWindowResize, { passive: true });

    // Visibility Change (Pause RAF when tab hidden to conserve GPU & battery)
    document.addEventListener("visibilitychange", onVisibilityChange);

    // Profile Image Hover Excitation
    setupProfileHover();
  }

  function onMouseMove(e) {
    mouse.targetX = (e.clientX / windowWidth) * 2 - 1;
    mouse.targetY = -(e.clientY / windowHeight) * 2 + 1;
  }

  function setupProfileHover() {
    const profileTargets = document.querySelectorAll(".profile-wrapper, .profile-circle, .hero-right");
    profileTargets.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        isProfileHovered = true;
      });
      el.addEventListener("mouseleave", () => {
        isProfileHovered = false;
      });
    });
  }

  function onVisibilityChange() {
    if (document.hidden) {
      isPaused = true;
      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
        animFrameId = null;
      }
    } else {
      isPaused = false;
      if (!animFrameId) {
        animate();
      }
    }
  }

  function onWindowResize() {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    isMobile = windowWidth < 992;

    camera.aspect = windowWidth / windowHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(windowWidth, windowHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // Update profile sphere target position
    if (profileSphereGroup) {
      const settings = isMobile ? CONFIG.mobile : CONFIG.desktop;
      profileSphereGroup.position.set(settings.spherePos.x, settings.spherePos.y, settings.spherePos.z);
      const targetScale = settings.sphereRadius / CONFIG.desktop.sphereRadius;
      profileSphereGroup.scale.set(targetScale, targetScale, targetScale);
    }
  }

  /* ==========================================================================
     MAIN ANIMATION & RENDER LOOP
     ========================================================================== */
  function animate() {
    if (isPaused) return;

    animFrameId = requestAnimationFrame(animate);

    const time = performance.now() * 0.001;

    // 1. Mouse Parallax Smoothing (Damped Lerp)
    if (!isReducedMotion) {
      mouse.x += (mouse.targetX - mouse.x) * 0.045;
      mouse.y += (mouse.targetY - mouse.y) * 0.045;

      camera.position.x = mouse.x * 0.45;
      camera.position.y = mouse.y * 0.35;
      camera.lookAt(0, 0, 0);

      scene.rotation.y = mouse.x * 0.035;
      scene.rotation.x = -mouse.y * 0.025;
    }

    // 2. Profile Sphere Animation & Hover Reaction
    if (profileSphereGroup) {
      if (!isReducedMotion) {
        outerSphere.rotation.x += 0.0018;
        outerSphere.rotation.y += 0.0025;
        innerSphere.rotation.x -= 0.003;
        innerSphere.rotation.y += 0.002;
        orbitalRing.rotation.z += 0.004;
      }

      // Smooth hover scale & intensity interpolation
      const targetHover = isProfileHovered ? 1.0 : 0.0;
      hoverGlowLerp += (targetHover - hoverGlowLerp) * 0.08;

      const baseScale = isMobile
        ? CONFIG.mobile.sphereRadius / CONFIG.desktop.sphereRadius
        : 1.0;
      const currentScale = baseScale * (1.0 + hoverGlowLerp * 0.16);
      profileSphereGroup.scale.set(currentScale, currentScale, currentScale);

      outerSphere.material.opacity = 0.18 + hoverGlowLerp * 0.22;
      innerSphere.material.opacity = 0.24 + hoverGlowLerp * 0.3;
      orbitalRing.material.opacity = 0.65 + hoverGlowLerp * 0.35;

      if (purpleLight) {
        purpleLight.intensity = 3.2 + hoverGlowLerp * 2.0;
      }
    }

    // 3. Update Neural Particles & Connections
    updateParticlesAndLines(time);

    // 4. Update Floating Polyhedra
    if (!isReducedMotion) {
      floatingShapes.forEach((shape) => {
        shape.mesh.rotation.x += shape.rotSpeed.x;
        shape.mesh.rotation.y += shape.rotSpeed.y;
        shape.mesh.rotation.z += shape.rotSpeed.z;
        shape.mesh.position.y = shape.baseY + Math.sin(time * 0.8 + shape.floatPhase) * 0.22;
      });
    }

    // 5. Render Scene
    renderer.render(scene, camera);
  }

  function updateParticlesAndLines(time) {
    if (!particlePositions || !linesPositions) return;

    const settings = isMobile ? CONFIG.mobile : CONFIG.desktop;
    const count = settings.particleCount;
    const maxDist = settings.connectionDistance;
    const maxDistSq = maxDist * maxDist;
    const maxConnections = settings.maxConnections;

    // A. Update particle positions with subtle drift
    if (!isReducedMotion) {
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        particlePositions[i3] += particleVelocities[i].x;
        particlePositions[i3 + 1] += particleVelocities[i].y;
        particlePositions[i3 + 2] += particleVelocities[i].z;

        // Bounce within cyber boundaries
        if (Math.abs(particlePositions[i3]) > CONFIG.bounds.x) particleVelocities[i].x *= -1;
        if (Math.abs(particlePositions[i3 + 1]) > CONFIG.bounds.y) particleVelocities[i].y *= -1;
        if (Math.abs(particlePositions[i3 + 2]) > CONFIG.bounds.z) particleVelocities[i].z *= -1;
      }
      particleGeo.attributes.position.needsUpdate = true;
    }

    // B. Calculate dynamic connection lines
    let connectionCount = 0;
    let lineVertIdx = 0;

    for (let i = 0; i < count; i++) {
      if (connectionCount >= maxConnections) break;

      const i3 = i * 3;
      const x1 = particlePositions[i3];
      const y1 = particlePositions[i3 + 1];
      const z1 = particlePositions[i3 + 2];

      const r1 = particleColors[i3];
      const g1 = particleColors[i3 + 1];
      const b1 = particleColors[i3 + 2];

      for (let j = i + 1; j < count; j++) {
        if (connectionCount >= maxConnections) break;

        const j3 = j * 3;
        const dx = x1 - particlePositions[j3];
        const dy = y1 - particlePositions[j3 + 1];
        const dz = z1 - particlePositions[j3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < maxDistSq) {
          const alpha = 1.0 - Math.sqrt(distSq) / maxDist;

          // Vertex 1
          linesPositions[lineVertIdx] = x1;
          linesPositions[lineVertIdx + 1] = y1;
          linesPositions[lineVertIdx + 2] = z1;
          linesColors[lineVertIdx] = r1 * alpha;
          linesColors[lineVertIdx + 1] = g1 * alpha;
          linesColors[lineVertIdx + 2] = b1 * alpha;
          lineVertIdx += 3;

          // Vertex 2
          linesPositions[lineVertIdx] = particlePositions[j3];
          linesPositions[lineVertIdx + 1] = particlePositions[j3 + 1];
          linesPositions[lineVertIdx + 2] = particlePositions[j3 + 2];
          linesColors[lineVertIdx] = particleColors[j3] * alpha;
          linesColors[lineVertIdx + 1] = particleColors[j3 + 1] * alpha;
          linesColors[lineVertIdx + 2] = particleColors[j3 + 2] * alpha;
          lineVertIdx += 3;

          connectionCount++;
        }
      }
    }

    linesGeo.setDrawRange(0, connectionCount * 2);
    linesGeo.attributes.position.needsUpdate = true;
    linesGeo.attributes.color.needsUpdate = true;
  }

  /* ==========================================================================
     AUTO-INITIALIZATION ON DOM READY
     ========================================================================== */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Expose optional control API on window
  window.Portfolio3D = {
    pause: () => {
      isPaused = true;
      if (animFrameId) cancelAnimationFrame(animFrameId);
    },
    resume: () => {
      if (isPaused) {
        isPaused = false;
        animate();
      }
    },
    triggerHover: (hovered) => {
      isProfileHovered = Boolean(hovered);
    },
  };
})();
