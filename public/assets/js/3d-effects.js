/**
 * SOS BEACON - 3D Interactive Engine
 * Handles smooth LERP-based 3D tilt physics, dynamic specular glare reflections,
 * floating parallax depth layers, and card spotlight tracking.
 */

(function () {
  'use strict';

  // Check user preference for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  document.addEventListener('DOMContentLoaded', () => {
    initHero3DStage();
    initCardSpotlights();
    init3DButtonPresses();
  });

  // ============ HERO 3D PHONE STAGE ============
  function initHero3DStage() {
    const heroSection = document.querySelector('.hero');
    const stage = document.querySelector('.phone-3d-stage');
    const phone = document.getElementById('heroPhone');
    const chipA = document.querySelector('.chip-a');
    const chipB = document.querySelector('.chip-b');
    const glare = document.querySelector('.phone__glare');

    if (!heroSection || !stage || !phone) return;

    // Target and current values for smooth linear interpolation (LERP)
    let targetRotateX = 8;
    let targetRotateY = -12;
    let targetRotateZ = -1.5;
    let currentRotateX = 8;
    let currentRotateY = -12;
    let currentRotateZ = -1.5;

    let targetGlareX = 35;
    let targetGlareY = 25;
    let currentGlareX = 35;
    let currentGlareY = 25;

    let targetChipAX = 0;
    let targetChipAY = 0;
    let targetChipBX = 0;
    let targetChipBY = 0;
    let currentChipAX = 0;
    let currentChipAY = 0;
    let currentChipBX = 0;
    let currentChipBY = 0;

    let isMouseOver = false;
    let idleAngle = 0;
    let animId = null;

    const lerp = (start, end, factor) => start + (end - start) * factor;

    // Mouse movement inside the Hero section
    function onMouseMove(e) {
      isMouseOver = true;
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Normalized coordinates from -1 to 1 (center is 0, 0)
      const normX = (x / rect.width) * 2 - 1;
      const normY = (y / rect.height) * 2 - 1;

      // Constrain rotation angles for clean, sophisticated 3D presentation
      targetRotateY = normX * 18 - 8; // -26deg to +10deg
      targetRotateX = -normY * 16 + 6; // -10deg to +22deg
      targetRotateZ = normX * -3;

      // Specular glare reflection percentage
      targetGlareX = ((normX + 1) / 2) * 100;
      targetGlareY = ((normY + 1) / 2) * 100;

      // Multi-layer parallax for floating stat chips
      targetChipAX = normX * -14;
      targetChipAY = normY * -12;
      targetChipBX = normX * 16;
      targetChipBY = normY * 14;
    }

    function onMouseLeave() {
      isMouseOver = false;
    }

    heroSection.addEventListener('mousemove', onMouseMove, { passive: true });
    heroSection.addEventListener('mouseleave', onMouseLeave, { passive: true });

    // Gyroscope tilt support for mobile devices
    if (window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission !== 'function') {
      window.addEventListener('deviceorientation', (e) => {
        if (e.gamma !== null && e.beta !== null && !isMouseOver) {
          const gamma = Math.max(-30, Math.min(30, e.gamma)); // Left-to-right (-30 to 30)
          const beta = Math.max(15, Math.min(75, e.beta));   // Front-to-back (15 to 75)
          targetRotateY = (gamma / 30) * 14 - 6;
          targetRotateX = ((beta - 45) / 30) * 12 + 6;
        }
      }, { passive: true });
    }

    // Animation Loop
    function render() {
      if (!isMouseOver) {
        // Subtle organic 3D floating breath
        idleAngle += 0.02;
        const breathX = Math.sin(idleAngle) * 2.5;
        const breathY = Math.cos(idleAngle * 0.7) * 3;
        targetRotateX = 8 + breathX;
        targetRotateY = -12 + breathY;
        targetRotateZ = -1.5 + Math.sin(idleAngle * 0.5) * 0.8;

        targetChipAX = Math.sin(idleAngle * 0.8) * 6;
        targetChipAY = Math.cos(idleAngle * 0.8) * 6;
        targetChipBX = -Math.sin(idleAngle * 0.8) * 7;
        targetChipBY = -Math.cos(idleAngle * 0.8) * 7;
      }

      // Smooth LERP (smoothness factor 0.075)
      currentRotateX = lerp(currentRotateX, targetRotateX, 0.075);
      currentRotateY = lerp(currentRotateY, targetRotateY, 0.075);
      currentRotateZ = lerp(currentRotateZ, targetRotateZ, 0.075);

      currentGlareX = lerp(currentGlareX, targetGlareX, 0.1);
      currentGlareY = lerp(currentGlareY, targetGlareY, 0.1);

      currentChipAX = lerp(currentChipAX, targetChipAX, 0.08);
      currentChipAY = lerp(currentChipAY, targetChipAY, 0.08);
      currentChipBX = lerp(currentChipBX, targetChipBX, 0.08);
      currentChipBY = lerp(currentChipBY, targetChipBY, 0.08);

      // Apply 3D transform to phone chassis
      phone.style.transform = `rotateX(${currentRotateX.toFixed(2)}deg) rotateY(${currentRotateY.toFixed(2)}deg) rotateZ(${currentRotateZ.toFixed(2)}deg)`;

      // Dynamic glass glare gradient position
      if (glare) {
        glare.style.background = `radial-gradient(ellipse 260px 380px at ${currentGlareX.toFixed(1)}% ${currentGlareY.toFixed(1)}%, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.04) 40%, transparent 75%)`;
      }

      // Parallax translation for floating chips in 3D space
      if (chipA) {
        chipA.style.transform = `translate3d(${currentChipAX.toFixed(2)}px, ${currentChipAY.toFixed(2)}px, 55px) rotateY(${(-currentRotateY * 0.4).toFixed(1)}deg)`;
      }
      if (chipB) {
        chipB.style.transform = `translate3d(${currentChipBX.toFixed(2)}px, ${currentChipBY.toFixed(2)}px, 70px) rotateY(${(-currentRotateY * 0.4).toFixed(1)}deg)`;
      }

      animId = requestAnimationFrame(render);
    }

    animId = requestAnimationFrame(render);
  }

  // ============ CARD SPECULAR SPOTLIGHTS & 3D TILT ============
  function initCardSpotlights() {
    const cards = document.querySelectorAll('.siren-card, .f-card, .p-badge, .uc-card, .helpline-display-card');

    cards.forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        // Subtle 3D tilt on siren cards and feature cards
        if (card.classList.contains('siren-card') || card.classList.contains('f-card')) {
          const normX = (x / rect.width) * 2 - 1;
          const normY = (y / rect.height) * 2 - 1;
          const tiltX = -normY * 6; // max 6 deg
          const tiltY = normX * 6;
          card.style.transform = `perspective(600px) rotateX(${tiltX.toFixed(1)}deg) rotateY(${tiltY.toFixed(1)}deg) translateZ(8px)`;
        }
      }, { passive: true });

      card.addEventListener('pointerleave', () => {
        if (card.classList.contains('siren-card') || card.classList.contains('f-card')) {
          card.style.transform = '';
        }
      }, { passive: true });
    });
  }

  // ============ 3D BUTTON TACTILE FEEDBACK ============
  function init3DButtonPresses() {
    const sosBtn = document.getElementById('simSosTrigger');
    if (!sosBtn) return;

    sosBtn.addEventListener('mousedown', () => {
      sosBtn.classList.add('pressed');
    });

    const release = () => sosBtn.classList.remove('pressed');
    sosBtn.addEventListener('mouseup', release);
    sosBtn.addEventListener('mouseleave', release);
    sosBtn.addEventListener('touchend', release);
  }
})();
