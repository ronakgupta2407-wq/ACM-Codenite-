import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * Hero3DRobotCanvas
 * A fully interactive, procedural 3D Cartoon Robot ("NiteBot Prime") built with Three.js.
 * Combines Pixar-inspired friendly cartoon aesthetics (expressive glossy visor eyes,
 * smooth rounded chassis, floating jet thrusters) with futuristic cyberpunk robotics
 * (glowing reactor core, holographic data rings, floating geometric cubes, cursor tracking).
 */
export function Hero3DRobotCanvas({ onRobotClick, currentMood = "happy" }) {
  const mountRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [speechText, setSpeechText] = useState("System Online! Welcome to CodeNite 2027 ⚡");
  const [showSpeech, setShowSpeech] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    const width = container.clientWidth || 450;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    const isMobileInit = window.innerWidth < 640;
    camera.position.set(0, 0.4, isMobileInit ? 8.6 : 7.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: window.innerWidth >= 768,
      powerPreference: "low-power",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobileInit ? 1 : 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.appendChild(renderer.domElement);

    // --- Lighting Setup (Studio + Neon Cyberpunk Rim) ---
    const ambientLight = new THREE.AmbientLight(0x0a1936, 1.8);
    scene.add(ambientLight);

    // Key Light (Soft Cyan/White)
    const keyLight = new THREE.DirectionalLight(0xe0f7ff, 2.8);
    keyLight.position.set(4, 6, 6);
    keyLight.castShadow = true;
    scene.add(keyLight);

    // Fill Light (Purple/Violet Neon)
    const fillLight = new THREE.PointLight(0xa855f7, 3.5, 20);
    fillLight.position.set(-5, 2, 4);
    scene.add(fillLight);

    // Rim/Accent Light (Electric Neon Cyan)
    const rimLight = new THREE.PointLight(0x00f0ff, 4.0, 15);
    rimLight.position.set(0, -3, 3);
    scene.add(rimLight);

    // Top Halo Light
    const topLight = new THREE.PointLight(0x38bdf8, 2.5, 12);
    topLight.position.set(0, 5, 2);
    scene.add(topLight);

    // --- Materials (Glossy Cartoon + Cyber Metal) ---
    const whiteChassisMat = new THREE.MeshPhysicalMaterial({
      color: 0xf0f6ff,
      roughness: 0.15,
      metalness: 0.25,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
    });

    const darkAccentMat = new THREE.MeshStandardMaterial({
      color: 0x071126,
      roughness: 0.3,
      metalness: 0.8,
    });

    const cyanGlowMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
    });

    const purpleGlowMat = new THREE.MeshBasicMaterial({
      color: 0xc084fc,
    });

    const amberGlowMat = new THREE.MeshBasicMaterial({
      color: 0xfbbf24,
    });

    const visorMat = new THREE.MeshPhysicalMaterial({
      color: 0x010614,
      roughness: 0.05,
      metalness: 0.9,
      transmission: 0.3,
      thickness: 0.5,
      clearcoat: 1.0,
    });

    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xdbeafe,
      roughness: 0.1,
      metalness: 0.95,
    });

    // --- Master Robot Group ---
    const robotGroup = new THREE.Group();
    scene.add(robotGroup);

    // 1. HEAD GROUP
    const headGroup = new THREE.Group();
    headGroup.position.y = 1.35;
    robotGroup.add(headGroup);

    // Head Chassis (Curved rounded box)
    const headGeo = new THREE.BoxGeometry(1.8, 1.4, 1.3, 4, 4, 4);
    // Round the corners procedurally
    const pos = headGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const v = new THREE.Vector3().fromBufferAttribute(pos, i);
      v.normalize().multiplyScalar(0.95).add(new THREE.Vector3(0, 0, 0));
    }
    headGeo.computeVertexNormals();

    const headMesh = new THREE.Mesh(headGeo, whiteChassisMat);
    headMesh.castShadow = true;
    headGroup.add(headMesh);

    // Head Side Ear Panels (Cyan Glowing Discs)
    const earGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.12, 32);
    const earL = new THREE.Mesh(earGeo, darkAccentMat);
    earL.rotation.z = Math.PI / 2;
    earL.position.set(-0.95, 0, 0);
    headGroup.add(earL);

    const earLGlow = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.14, 32), cyanGlowMat);
    earLGlow.rotation.z = Math.PI / 2;
    earLGlow.position.set(-0.96, 0, 0);
    headGroup.add(earLGlow);

    const earR = new THREE.Mesh(earGeo, darkAccentMat);
    earR.rotation.z = Math.PI / 2;
    earR.position.set(0.95, 0, 0);
    headGroup.add(earR);

    const earRGlow = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.14, 32), cyanGlowMat);
    earRGlow.rotation.z = Math.PI / 2;
    earRGlow.position.set(0.96, 0, 0);
    headGroup.add(earRGlow);

    // Curved Antenna with Glowing Orb
    const antennaStem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.05, 0.7, 16),
      chromeMat
    );
    antennaStem.position.set(0, 0.95, 0);
    headGroup.add(antennaStem);

    const antennaOrb = new THREE.Mesh(new THREE.SphereGeometry(0.16, 24, 24), cyanGlowMat);
    antennaOrb.position.set(0, 1.35, 0);
    headGroup.add(antennaOrb);

    // Visor Screen (Glossy Dark Inset)
    const visorGeo = new THREE.BoxGeometry(1.4, 0.75, 0.3, 16, 16);
    const visorMesh = new THREE.Mesh(visorGeo, visorMat);
    visorMesh.position.set(0, -0.02, 0.62);
    headGroup.add(visorMesh);

    // Eyes Group (Pixar-style expressive cartoon LED Eyes)
    const eyesGroup = new THREE.Group();
    eyesGroup.position.set(0, -0.02, 0.78);
    headGroup.add(eyesGroup);

    // Left & Right Glowing Eyes (Rounded Pills/Capsules)
    const eyeShape = new THREE.Shape();
    const w = 0.18, h = 0.18;
    eyeShape.absarc(-w, 0, 0.14, Math.PI / 2, -Math.PI / 2, true);
    eyeShape.absarc(w, 0, 0.14, -Math.PI / 2, Math.PI / 2, true);

    const eyeGeo = new THREE.ShapeGeometry(eyeShape);

    const eyeL = new THREE.Mesh(eyeGeo, cyanGlowMat);
    eyeL.position.set(-0.35, 0, 0);
    eyesGroup.add(eyeL);

    const eyeR = new THREE.Mesh(eyeGeo, cyanGlowMat);
    eyeR.position.set(0.35, 0, 0);
    eyesGroup.add(eyeR);

    // Visor HUD Smile/Line
    const mouthGeo = new THREE.PlaneGeometry(0.4, 0.04);
    const mouthMesh = new THREE.Mesh(mouthGeo, cyanGlowMat);
    mouthMesh.position.set(0, -0.22, 0);
    eyesGroup.add(mouthMesh);

    // 2. TORSO / BODY
    const torsoGroup = new THREE.Group();
    torsoGroup.position.y = 0;
    robotGroup.add(torsoGroup);

    // Torso Chassis
    const torsoGeo = new THREE.CylinderGeometry(0.9, 0.75, 1.3, 32);
    const torsoMesh = new THREE.Mesh(torsoGeo, whiteChassisMat);
    torsoMesh.castShadow = true;
    torsoGroup.add(torsoMesh);

    // Glowing Chest Reactor Core (Spinning Torus)
    const coreTorusGeo = new THREE.TorusGeometry(0.28, 0.06, 16, 32);
    const coreTorus = new THREE.Mesh(coreTorusGeo, cyanGlowMat);
    coreTorus.position.set(0, 0.15, 0.78);
    torsoGroup.add(coreTorus);

    const coreInner = new THREE.Mesh(new THREE.SphereGeometry(0.16, 24, 24), amberGlowMat);
    coreInner.position.set(0, 0.15, 0.72);
    torsoGroup.add(coreInner);

    // Chest CodeNite Emblem Badge
    const emblemGeo = new THREE.BoxGeometry(0.45, 0.1, 0.06);
    const emblemMesh = new THREE.Mesh(emblemGeo, darkAccentMat);
    emblemMesh.position.set(0, -0.25, 0.82);
    torsoGroup.add(emblemMesh);

    // 3. FLOATING JET THRUSTER (Anti-gravity ring)
    const thrusterGroup = new THREE.Group();
    thrusterGroup.position.y = -0.95;
    robotGroup.add(thrusterGroup);

    const thrusterRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.65, 0.12, 16, 32),
      darkAccentMat
    );
    thrusterRing.rotation.x = Math.PI / 2;
    thrusterGroup.add(thrusterRing);

    const thrusterBeam = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.15, 0.8, 24),
      new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        transparent: true,
        opacity: 0.65,
      })
    );
    thrusterBeam.position.y = -0.45;
    thrusterGroup.add(thrusterBeam);

    // 4. FLOATING ROBOTIC ARMS
    const armLGroup = new THREE.Group();
    armLGroup.position.set(-1.15, 0.2, 0);
    robotGroup.add(armLGroup);

    const armRGroup = new THREE.Group();
    armRGroup.position.set(1.15, 0.2, 0);
    robotGroup.add(armRGroup);

    // Shoulder balls
    const shoulderGeo = new THREE.SphereGeometry(0.24, 24, 24);
    const shoulderL = new THREE.Mesh(shoulderGeo, chromeMat);
    armLGroup.add(shoulderL);
    const shoulderR = new THREE.Mesh(shoulderGeo, chromeMat);
    armRGroup.add(shoulderR);

    // Floating hands (Cute mitten claws)
    const handGeo = new THREE.SphereGeometry(0.28, 24, 24);
    const handL = new THREE.Mesh(handGeo, whiteChassisMat);
    handL.position.set(0, -0.65, 0.15);
    armLGroup.add(handL);

    const handR = new THREE.Mesh(handGeo, whiteChassisMat);
    handR.position.set(0, -0.65, 0.15);
    armRGroup.add(handR);

    // 5. SURROUNDING HOLOGRAPHIC DATA RINGS & FLOATING CUBES
    const holoRing1 = new THREE.Mesh(
      new THREE.TorusGeometry(2.2, 0.02, 16, 64),
      new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.4 })
    );
    holoRing1.rotation.x = Math.PI / 3;
    robotGroup.add(holoRing1);

    const holoRing2 = new THREE.Mesh(
      new THREE.TorusGeometry(1.85, 0.02, 16, 64),
      new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.35 })
    );
    holoRing2.rotation.y = Math.PI / 4;
    holoRing2.rotation.x = Math.PI / 6;
    robotGroup.add(holoRing2);

    // Orbiting mini data cubes
    const numCubes = 5;
    const cubes = [];
    const cubeGeo = new THREE.BoxGeometry(0.18, 0.18, 0.18);
    for (let i = 0; i < numCubes; i++) {
      const cubeMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x00f0ff : 0xc084fc,
        wireframe: true,
      });
      const c = new THREE.Mesh(cubeGeo, cubeMat);
      scene.add(c);
      cubes.push(c);
    }

    // --- Interactive Mouse & Cursor Tracking ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mouse.targetX = THREE.MathUtils.clamp(x, -1, 1);
      mouse.targetY = THREE.MathUtils.clamp(y, -1, 1);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // --- Blinking Animation Timer ---
    let isBlinking = false;
    let blinkTimer = 0;

    // --- Speech Reaction Quotes ---
    const quotes = [
      "⚡ 1500+ Hackers Synced! Are you ready?",
      "🚀 Squad size 4 to 6 confirmed. Let's build!",
      "☕ Midnight caffeine modules fully loaded!",
      "🏆 ₹1,50,000+ Prize Pool detected!",
      "💻 Problem statements dropping soon... Stay alert!",
    ];

    const handleClick = () => {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setSpeechText(randomQuote);
      setShowSpeech(true);

      // Trigger wave animation on right arm
      waveArm = 1.0;

      if (onRobotClick) onRobotClick();
    };

    container.addEventListener("click", handleClick);

    let waveArm = 0;
    const clock = new THREE.Clock();

    // --- Animation Loop ---
    let reqId;
    let lastFrameTime = 0;
    let isRunning = false;
    let isInView = false;
    let isPageVisible = !document.hidden;
    const animate = () => {
      if (!isRunning) return;
      reqId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      if (elapsedTime - lastFrameTime < 1 / 30) return;
      const frameScale = Math.min((elapsedTime - lastFrameTime) * 60, 2);
      lastFrameTime = elapsedTime;

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      // 1. Floating Idle Bobbing
      robotGroup.position.y = Math.sin(elapsedTime * 2.2) * 0.15;
      robotGroup.rotation.y = THREE.MathUtils.lerp(robotGroup.rotation.y, mouse.x * 0.45, 0.05);
      robotGroup.rotation.x = THREE.MathUtils.lerp(robotGroup.rotation.x, -mouse.y * 0.25, 0.05);

      // 2. Head Cursor Tracking (Head turns towards cursor)
      headGroup.rotation.y = THREE.MathUtils.lerp(headGroup.rotation.y, mouse.x * 0.7, 0.08);
      headGroup.rotation.x = THREE.MathUtils.lerp(headGroup.rotation.x, -mouse.y * 0.5, 0.08);

      // Eye pupil shift inside visor
      eyesGroup.position.x = mouse.x * 0.12;
      eyesGroup.position.y = mouse.y * 0.08 - 0.02;

      // 3. Eye Blinking Logic
      blinkTimer += frameScale / 60;
      if (blinkTimer > 3.8) {
        isBlinking = true;
        eyeL.scale.y = 0.1;
        eyeR.scale.y = 0.1;
        if (blinkTimer > 3.98) {
          isBlinking = false;
          eyeL.scale.y = 1.0;
          eyeR.scale.y = 1.0;
          blinkTimer = 0;
        }
      }

      // 4. Chest Reactor Spin & Pulse
      coreTorus.rotation.z += 0.04 * frameScale;
      coreInner.scale.setScalar(1 + Math.sin(elapsedTime * 5) * 0.08);

      // 5. Thruster Plasma Pulse
      thrusterBeam.scale.y = 0.8 + Math.sin(elapsedTime * 15) * 0.2;
      thrusterBeam.scale.x = 0.9 + Math.cos(elapsedTime * 12) * 0.15;
      thrusterBeam.scale.z = thrusterBeam.scale.x;

      // 6. Right Arm Waving Interaction
      if (waveArm > 0.01) {
        armRGroup.position.y = 0.5 + Math.sin(elapsedTime * 12) * 0.1;
        armRGroup.rotation.z = -1.2 + Math.sin(elapsedTime * 14) * 0.4;
        waveArm -= 0.008 * frameScale;
      } else {
        armRGroup.position.y = 0.2 + Math.sin(elapsedTime * 2.2 + 1) * 0.05;
        armRGroup.rotation.z = Math.sin(elapsedTime * 2.2) * 0.08;
      }
      armLGroup.position.y = 0.2 + Math.cos(elapsedTime * 2.2 + 1) * 0.05;
      armLGroup.rotation.z = -Math.sin(elapsedTime * 2.2) * 0.08;

      // 7. Rotating Holographic Rings
      holoRing1.rotation.z += 0.008 * frameScale;
      holoRing1.rotation.y += 0.005 * frameScale;
      holoRing2.rotation.z -= 0.01 * frameScale;
      holoRing2.rotation.x += 0.007 * frameScale;

      // 8. Orbiting Data Cubes
      cubes.forEach((cube, i) => {
        const angle = elapsedTime * 0.8 + (i * Math.PI * 2) / numCubes;
        const radius = 2.4 + (i % 2) * 0.4;
        cube.position.x = Math.cos(angle) * radius;
        cube.position.z = Math.sin(angle) * radius;
        cube.position.y = Math.sin(angle * 2) * 0.7;
        cube.rotation.x += 0.02 * frameScale;
        cube.rotation.y += 0.03 * frameScale;
      });

      renderer.render(scene, camera);
    };

    const updateAnimationState = () => {
      const shouldRun = isInView && isPageVisible;
      if (shouldRun && !isRunning) {
        isRunning = true;
        clock.start();
        lastFrameTime = 0;
        reqId = requestAnimationFrame(animate);
      } else if (!shouldRun && isRunning) {
        isRunning = false;
        cancelAnimationFrame(reqId);
      }
    };
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isInView = entry.isIntersecting;
      updateAnimationState();
    });
    visibilityObserver.observe(container);
    const handleVisibilityChange = () => {
      isPageVisible = !document.hidden;
      updateAnimationState();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio || 1, window.innerWidth < 640 ? 1 : 1.5)
      );
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      visibilityObserver.disconnect();
      container.removeEventListener("click", handleClick);
      isRunning = false;
      cancelAnimationFrame(reqId);
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onRobotClick]);

  return (
    <div className="relative w-full h-[350px] sm:h-[480px] lg:h-[580px] flex items-center justify-center select-none overflow-hidden">
      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="w-full h-full cursor-pointer relative z-10"
        title="Click NiteBot Prime to interact!"
      />

      {/* Floating Pixar-style Interactive Speech Bubble */}
      {showSpeech && (
        <div className="absolute top-1 sm:top-6 right-2 sm:right-6 z-20 max-w-[210px] sm:max-w-[260px] bg-gradient-to-br from-[#0c1938]/95 via-[#08122c]/95 to-[#030617]/98 backdrop-blur-xl border border-cyan-400/50 rounded-2xl p-2.5 sm:p-3.5 shadow-[0_0_25px_rgba(6,182,212,0.35)] animate-bounce-subtle pointer-events-none">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-widest text-cyan-300 uppercase">
              NITEBOT // AI MASCOT
            </span>
          </div>
          <p className="text-[11px] sm:text-xs font-heading font-medium text-slate-200 leading-snug">
            {speechText}
          </p>
          {/* Speech bubble pointer notch */}
          <div className="absolute -bottom-1.5 left-5 w-2.5 h-2.5 bg-[#08122c] border-b border-r border-cyan-400/50 rotate-45" />
        </div>
      )}

      {/* Interactive Micro-hint */}
      <div className="absolute bottom-1 sm:bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-[9px] sm:text-[10px] font-mono text-cyan-300 tracking-wider shadow-sm pointer-events-none whitespace-nowrap">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span>CLICK ME TO CHAT • EYES TRACK CURSOR</span>
      </div>
    </div>
  );
}
