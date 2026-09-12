/**
 * CINEMATIC REALITY SIMULATOR 2D ENGINE
 * 
 * Features:
 * - Dynamic Cinematic Camera (zoom, pan, shake, rotation tilt)
 * - Living Animated Responsive Environments (Space, Jurassic, Ocean, Skyline, Bakery, etc.)
 * - 7-Phase Cause-and-Effect Storyboard Sequencer
 * - Interactive physics, dragging, tossing, and particle pooling
 */

class RealityEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.entities = [];
    this.particles = [];
    this.width = 0;
    this.height = 0;
    this.dpr = window.devicePixelRatio || 1;
    this.lastTime = performance.now();

    // Cinematic Camera State
    this.camera = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      zoom: 1.0,
      targetZoom: 1.0,
      rotation: 0,
      targetRotation: 0,
      shake: 0,
      shakeDecay: 0.88
    };

    // Current Active Scenario & Storyboard
    this.currentEnvironment = 'living_room';
    this.environmentTimer = 0;
    this.activeStoryboard = null;
    this.storyboardPhaseIndex = 0;
    this.storyboardPhaseTime = 0;

    // Mouse & Touch interaction state
    this.mouse = {
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      isDown: false,
      inside: false,
      draggedEntity: null,
      dragOffsetX: 0,
      dragOffsetY: 0
    };

    this.initCanvasSize();
    this.bindEvents();
    this.loop = this.loop.bind(this);
    requestAnimationFrame(this.loop);
  }

  initCanvasSize() {
    const rect = this.canvas.getBoundingClientRect();
    const parent = this.canvas.parentElement;
    const parentRect = parent ? parent.getBoundingClientRect() : null;
    this.width = rect.width || (parentRect ? parentRect.width : 0) || 820;
    this.height = rect.height || (parentRect ? parentRect.height : 0) || 460;
    this.canvas.width = Math.round(this.width * this.dpr);
    this.canvas.height = Math.round(this.height * this.dpr);
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(this.dpr, this.dpr);
  }

  bindEvents() {
    window.addEventListener('resize', () => this.initCanvasSize());

    const getPos = (evt) => {
      const rect = this.canvas.getBoundingClientRect();
      const clientX = evt.touches ? evt.touches[0].clientX : evt.clientX;
      const clientY = evt.touches ? evt.touches[0].clientY : evt.clientY;
      // Reverse camera transform to get world space
      const screenX = clientX - rect.left;
      const screenY = clientY - rect.top;
      const worldX = (screenX - this.width * 0.5) / this.camera.zoom + this.width * 0.5 - this.camera.x;
      const worldY = (screenY - this.height * 0.5) / this.camera.zoom + this.height * 0.5 - this.camera.y;
      return { x: worldX, y: worldY };
    };

    const onPointerDown = (evt) => {
      const pos = getPos(evt);
      this.mouse.x = pos.x;
      this.mouse.y = pos.y;
      this.mouse.isDown = true;
      this.mouse.inside = true;

      for (let i = this.entities.length - 1; i >= 0; i--) {
        const e = this.entities[i];
        const dx = pos.x - e.x;
        const dy = pos.y - e.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < Math.max(e.width, e.height) * 0.55) {
          this.mouse.draggedEntity = e;
          e.isDragging = true;
          this.mouse.dragOffsetX = dx;
          this.mouse.dragOffsetY = dy;
          e.vx = 0;
          e.vy = 0;

          window.soundEngine.playPop(1.15);
          this.interactWithEntity(e);

          this.entities.splice(i, 1);
          this.entities.push(e);
          break;
        }
      }
    };

    const onPointerMove = (evt) => {
      const pos = getPos(evt);
      this.mouse.vx = pos.x - this.mouse.x;
      this.mouse.vy = pos.y - this.mouse.y;
      this.mouse.x = pos.x;
      this.mouse.y = pos.y;
      this.mouse.inside = true;

      if (this.mouse.draggedEntity) {
        const e = this.mouse.draggedEntity;
        e.x = pos.x - this.mouse.dragOffsetX;
        e.y = pos.y - this.mouse.dragOffsetY;
      }
    };

    const onPointerUp = () => {
      if (this.mouse.draggedEntity) {
        const e = this.mouse.draggedEntity;
        e.isDragging = false;
        e.vx = this.mouse.vx * 0.7;
        e.vy = this.mouse.vy * 0.7;
        this.mouse.draggedEntity = null;
      }
      this.mouse.isDown = false;
    };

    this.canvas.addEventListener('mousedown', onPointerDown);
    this.canvas.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    this.canvas.addEventListener('touchstart', (e) => { e.preventDefault(); onPointerDown(e); }, { passive: false });
    this.canvas.addEventListener('touchmove', (e) => { e.preventDefault(); onPointerMove(e); }, { passive: false });
    window.addEventListener('touchend', onPointerUp);

    this.canvas.addEventListener('mouseleave', () => { this.mouse.inside = false; });
  }

  // Interactive Clicks on Entities
  interactWithEntity(entity) {
    if (entity.archetype === 'yesterday_biriyani' || entity.archetype === 'homework_pizza' || entity.archetype === 'raining_cookies') {
      entity.bitesCount = (entity.bitesCount || 0) + 1;
      window.soundEngine.playPop(1.3);
      this.spawnCrumbBurst(entity.x, entity.y, '#F39C12');
      this.spawnFloatingText(entity.x, entity.y - entity.height * 0.4, '🍲 YUMMY!');
      this.shakeScreen(4);
    } else if (entity.archetype === 'moon' || entity.archetype === 'eat_the_moon') {
      entity.bitesCount = (entity.bitesCount || 0) + 1;
      window.soundEngine.playToyPiano(880, 0.4);
      this.spawnCrumbBurst(entity.x, entity.y, '#FFF9D2');
      this.spawnFloatingText(entity.x, entity.y - entity.height * 0.4, '🌙 CRUNCH!');
      this.shakeScreen(3);
    } else if (entity.archetype === 'dinosaur') {
      window.soundEngine.playStomp();
      this.spawnFloatingText(entity.x, entity.y - entity.height * 0.4, '🦖 RAWR!');
      this.shakeScreen(8);
    } else if (entity.archetype === 'chair_dinosaur_wedding') {
      window.soundEngine.playToyPiano(1046.5, 0.6);
      this.spawnFloatingText(entity.x, entity.y - entity.height * 0.4, '💒 JUST MARRIED!');
      this.spawnConfettiBurst(entity.x, entity.y);
    } else {
      entity.scaleX = 1.25;
      entity.scaleY = 0.8;
      window.soundEngine.playPop(1.0);
      this.spawnFloatingText(entity.x, entity.y - entity.height * 0.4, '✨ HELLO!');
    }
  }

  // Launch a 7-Phase Cinematic Storyboard
  startStoryboard(storyboard, environment) {
    this.activeStoryboard = storyboard;
    this.storyboardPhaseIndex = 0;
    this.storyboardPhaseTime = 0;
    this.currentEnvironment = environment || 'living_room';
    if (this.onPhaseChange && storyboard && storyboard[0]) {
      this.onPhaseChange(1, storyboard[0]);
    }
  }

  setEnvironment(env) {
    this.currentEnvironment = env || 'living_room';
  }

  // Clear existing entities before new scenario
  clearEntities() {
    this.entities = [];
    this.particles = [];
  }

  // Add an entity
  addEntity(config) {
    const sizeLookup = {
      'tiny': { w: 75, h: 75 },
      'pocket-sized': { w: 85, h: 85 },
      'normal': { w: 150, h: 150 },
      'clay_pot_table': { w: 160, h: 150 },
      'dino_sized': { w: 220, h: 180 },
      'room-celestial': { w: 180, h: 180 },
      'family_sized': { w: 170, h: 170 },
      'pillow_soft': { w: 190, h: 130 },
      'room_scaled': { w: 180, h: 170 },
      'colossal': { w: 240, h: 260 }
    };

    const dims = sizeLookup[config.scale] || sizeLookup[config.size] || { w: 150, h: 150 };
    const width = config.width || dims.w;
    const height = config.height || dims.h;

    const entity = {
      id: 'entity_' + Math.random().toString(36).substr(2, 9),
      archetype: config.archetype || 'procedural',
      label: config.label || 'Wonder',
      x: config.x !== undefined ? config.x : (this.width ? this.width * 0.5 : 410),
      y: config.y !== undefined ? config.y : (this.height ? this.height * 0.46 : 220),
      vx: (Math.random() - 0.5) * 2,
      vy: -1.5,
      width: width,
      height: height,
      scaleX: 0.1,
      scaleY: 0.1,
      targetScale: 1.0,
      rotation: 0,
      color: config.color || '#FF7675',
      secondaryColor: config.secondaryColor || '#74B9FF',
      behaviors: config.behaviors || ['float', 'wobble', 'draggable'],
      blinkTimer: Math.random() * 4,
      drawingStrokes: config.drawingStrokes || null,
      drawOffsetX: config.drawOffsetX || 0,
      drawOffsetY: config.drawOffsetY || 0,
      bitesCount: 0,
      isDragging: false
    };

    this.entities.push(entity);
    if (window.soundEngine && window.soundEngine.playMagicChime) {
      window.soundEngine.playMagicChime();
    }
    this.spawnConfettiBurst(entity.x, entity.y);

    return entity;
  }

  // Camera Shake & Control
  shakeScreen(intensity = 6, duration = 0.2) {
    this.camera.shake = Math.max(this.camera.shake, intensity);
  }

  // Universal Particle Spawner
  spawnParticle(config) {
    if (!config) return;
    if (this.particles.length > 300) {
      this.particles.shift();
    }
    this.particles.push(config);
  }

  // Particle Generators
  spawnCrumbBurst(x, y, color) {
    for (let i = 0; i < 8; i++) {
      this.particles.push({
        type: 'crumb',
        x: x + (Math.random() - 0.5) * 40,
        y: y - (Math.random() * 20),
        vx: (Math.random() - 0.5) * 5,
        vy: -2 - Math.random() * 3,
        size: 3 + Math.random() * 3,
        life: 0.8,
        maxLife: 0.8,
        color
      });
    }
  }

  spawnConfettiBurst(x, y) {
    const colors = ['#FF2E93', '#00E5FF', '#FFE100', '#22C55E', '#9747FF'];
    for (let i = 0; i < 24; i++) {
      this.particles.push({
        type: 'confetti',
        x: x + (Math.random() - 0.5) * 60,
        y: y + (Math.random() - 0.5) * 60,
        vx: (Math.random() - 0.5) * 8,
        vy: -3 - Math.random() * 6,
        size: 4 + Math.random() * 4,
        rotation: Math.random() * 6.28,
        rotSpeed: (Math.random() - 0.5) * 10,
        life: 1.2,
        maxLife: 1.2,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }

  spawnFloatingText(x, y, text) {
    this.particles.push({
      type: 'floating_text',
      x,
      y,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -1.6,
      text,
      life: 1.2,
      maxLife: 1.2
    });
  }

  clearReality() {
    this.entities = [];
    this.particles = [];
    this.activeStoryboard = null;
    this.storyboardPhaseIndex = 0;
    this.storyboardPhaseTime = 0;
    this.currentEnvironment = 'living_room';
    this.camera.zoom = 1.0;
    this.camera.targetZoom = 1.0;
    this.camera.x = 0;
    this.camera.y = 0;
    this.camera.targetX = 0;
    this.camera.targetY = 0;
    this.camera.shake = 0;
    if (window.soundEngine && window.soundEngine.playPop) {
      window.soundEngine.playPop(0.8);
    }
  }

  // Animation Frame Loop with Error Boundary
  loop(now) {
    try {
      const dt = Math.min((now - this.lastTime) / 1000, 0.1);
      this.lastTime = now;

      this.update(dt);
      this.render();
    } catch (err) {
      console.error('RealityEngine frame error:', err);
    }

    requestAnimationFrame(this.loop);
  }

  update(dt) {
    if (this.width === 0 || this.height === 0) {
      this.initCanvasSize();
    }
    this.environmentTimer += dt;

    // 1. Process 7-Phase Storyboard if active
    if (this.activeStoryboard && this.storyboardPhaseIndex < this.activeStoryboard.length) {
      const currentPhase = this.activeStoryboard[this.storyboardPhaseIndex];
      this.storyboardPhaseTime += dt;

      // Apply camera from current phase
      if (currentPhase.camera) {
        this.camera.targetZoom = currentPhase.camera.zoom || 1.0;
        this.camera.targetX = currentPhase.camera.panX || 0;
        this.camera.targetY = currentPhase.camera.panY || 0;
        if (currentPhase.camera.shake > 0) {
          this.camera.shake = Math.max(this.camera.shake, currentPhase.camera.shake);
        }
      }

      // Check phase transition
      if (this.storyboardPhaseTime >= currentPhase.duration) {
        this.storyboardPhaseTime = 0;
        this.storyboardPhaseIndex++;

        // Trigger Phase Effects
        if (this.storyboardPhaseIndex === 3) {
          // Phase 4: INTERACTION_CAUSES_REACTION
          this.shakeScreen(7);
          this.spawnConfettiBurst(this.width * 0.5, this.height * 0.45);
        } else if (this.storyboardPhaseIndex === 4) {
          // Phase 5: ENVIRONMENT_RESPONDS
          for (let i = 0; i < 12; i++) {
            this.spawnParticle({
              type: 'starlight',
              x: this.width * 0.5 + (Math.random() - 0.5) * 180,
              y: this.height * 0.45 + (Math.random() - 0.5) * 120,
              vx: (Math.random() - 0.5) * 2,
              vy: -1 - Math.random() * 2,
              size: 3 + Math.random() * 3,
              life: 1.4,
              maxLife: 1.4,
              color: '#FFE100'
            });
          }
        }

        if (window.soundEngine && window.soundEngine.playBureauType) {
          window.soundEngine.playBureauType();
        }

        // Notify listener of phase change
        if (this.activeStoryboard && this.storyboardPhaseIndex < this.activeStoryboard.length) {
          if (this.onPhaseChange) {
            this.onPhaseChange(this.storyboardPhaseIndex + 1, this.activeStoryboard[this.storyboardPhaseIndex]);
          }
        }

        // Check if finished
        if (this.storyboardPhaseIndex >= this.activeStoryboard.length) {
          this.activeStoryboard = null;
          this.camera.targetZoom = 1.0;
          this.camera.targetX = 0;
          this.camera.targetY = 0;
          if (this.onPhaseChange) {
            this.onPhaseChange(7, null);
          }
        }
      }
    }

    // 2. Smooth Camera Easing & Shake Decay
    this.camera.x += (this.camera.targetX - this.camera.x) * 0.1;
    this.camera.y += (this.camera.targetY - this.camera.y) * 0.1;
    this.camera.zoom += (this.camera.targetZoom - this.camera.zoom) * 0.1;

    if (this.camera.shake > 0.1) {
      this.camera.shake *= this.camera.shakeDecay;
    } else {
      this.camera.shake = 0;
    }

    // 3. Update Entities
    for (let i = 0; i < this.entities.length; i++) {
      const e = this.entities[i];
      e.scaleX += (e.targetScale - e.scaleX) * 0.15;
      e.scaleY += (e.targetScale - e.scaleY) * 0.15;
      e.blinkTimer = (e.blinkTimer || 0) + dt;

      if (e.behaviors && Array.isArray(e.behaviors)) {
        e.behaviors.forEach(behaviorName => {
          if (Behaviors[behaviorName]) Behaviors[behaviorName](e, dt, this);
        });
      }

      if (!e.isDragging) {
        e.x += e.vx;
        e.y += e.vy;
        e.vx *= 0.95;
        e.vy *= 0.95;

        const padX = e.width * 0.45;
        const padY = e.height * 0.45;
        if (e.x < padX) { e.x = padX; e.vx *= -0.6; }
        if (e.x > this.width - padX) { e.x = this.width - padX; e.vx *= -0.6; }
        if (e.y < padY + 10) { e.y = padY + 10; e.vy *= -0.6; }
        if (e.y > this.height - padY - 10) { e.y = this.height - padY - 10; e.vy *= -0.6; }
      }
    }

    // 4. Update Particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life -= dt;
      if (p.life <= 0) {
        this.particles.splice(i, 1);
        continue;
      }
      p.x += p.vx || 0;
      p.y += p.vy || 0;
      if (p.rotSpeed) p.rotation = (p.rotation || 0) + p.rotSpeed * dt;
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.ctx.save();

    // 1. Apply Dynamic Camera Transforms
    const cx = this.width * 0.5;
    const cy = this.height * 0.5;
    this.ctx.translate(cx, cy);

    if (this.camera.shake > 0.1) {
      const ox = (Math.random() - 0.5) * this.camera.shake * 2;
      const oy = (Math.random() - 0.5) * this.camera.shake * 2;
      this.ctx.translate(ox, oy);
    }

    this.ctx.scale(this.camera.zoom, this.camera.zoom);
    this.ctx.translate(-cx + this.camera.x, -cy + this.camera.y);

    // 2. Render Living Animated Environment Backdrop
    this.renderEnvironmentBackdrop(this.ctx);

    // 3. Render Impossible Entities
    this.entities.forEach(e => {
      this.ctx.save();
      this.ctx.translate(e.x, e.y);
      this.ctx.scale(e.scaleX, e.scaleY);
      this.ctx.rotate(e.rotation || 0);

      const renderer = VisualRenderers[e.archetype] || VisualRenderers.procedural;
      renderer(this.ctx, e);
      this.ctx.restore();
    });

    // 4. Render Particles
    this.particles.forEach(p => {
      const alpha = Math.max(0, p.life / p.maxLife);
      this.ctx.save();
      this.ctx.globalAlpha = alpha;

      if (p.type === 'confetti') {
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate(p.rotation || 0);
        this.ctx.fillStyle = p.color;
        this.ctx.fillRect(-p.size, -p.size * 0.5, p.size * 2, p.size);
      } else if (p.type === 'crumb') {
        this.ctx.fillStyle = p.color || '#F39C12';
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fill();
      } else if (p.type === 'calendar') {
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate(p.rotation || 0);
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.strokeStyle = '#2C3437';
        this.ctx.lineWidth = 1.5;
        this.ctx.fillRect(-22, -14, 44, 28);
        this.ctx.strokeRect(-22, -14, 44, 28);
        this.ctx.fillStyle = '#C0392B';
        this.ctx.fillRect(-22, -14, 44, 6);
        this.ctx.fillStyle = '#2C3437';
        this.ctx.font = 'bold 8px "Space Mono", monospace';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(p.text || 'YESTERDAY', 0, 7);
      } else if (p.type === 'raindrop') {
        this.ctx.fillStyle = p.color || '#4FC3F7';
        this.ctx.beginPath();
        this.ctx.ellipse(p.x, p.y, p.size * 0.7, p.size * 2.2, 0, 0, Math.PI * 2);
        this.ctx.fill();
      } else if (p.type === 'dust') {
        this.ctx.fillStyle = p.color || 'rgba(255, 255, 255, 0.4)';
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fill();
      } else if (p.type === 'spice') {
        this.ctx.font = '16px serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(p.symbol || '✨', p.x, p.y);
      } else if (p.type === 'starlight' || p.type === 'sparkle') {
        this.ctx.fillStyle = p.color || '#FFE100';
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fill();
      } else if (p.type === 'floating_text') {
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.strokeStyle = '#000000';
        this.ctx.lineWidth = 3;
        this.ctx.font = 'bold 16px "Rubik", sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.strokeText(p.text, p.x, p.y);
        this.ctx.fillText(p.text, p.x, p.y);
      }

      this.ctx.restore();
    });

    this.ctx.restore();
  }

  // Living Environment Background Renderers (Full Living Worlds)
  renderEnvironmentBackdrop(ctx) {
    const w = this.width;
    const h = this.height;
    const t = this.environmentTimer;

    // A. Space / Lunar ("I want to eat the moon")
    if (this.currentEnvironment === 'space_lunar') {
      // Cosmic Deep Space Gradient with glowing purple nebulae
      const spaceGrad = ctx.createLinearGradient(0, 0, 0, h);
      spaceGrad.addColorStop(0, '#04050E');
      spaceGrad.addColorStop(0.65, '#0E0926');
      spaceGrad.addColorStop(1, '#1A0B3B');
      ctx.fillStyle = spaceGrad;
      ctx.fillRect(0, 0, w, h);

      // Glowing Nebulae Cloud
      const nebGrad = ctx.createRadialGradient(w * 0.4, h * 0.35, 30, w * 0.4, h * 0.35, w * 0.6);
      nebGrad.addColorStop(0, 'rgba(192, 38, 211, 0.28)');
      nebGrad.addColorStop(0.5, 'rgba(59, 130, 246, 0.18)');
      nebGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = nebGrad;
      ctx.fillRect(0, 0, w, h);

      // Twinkling Parallax Stars
      ctx.fillStyle = '#FFFFFF';
      for (let i = 0; i < 45; i++) {
        const sx = (Math.sin(i * 99 + 1) * 0.5 + 0.5) * w;
        const sy = (Math.cos(i * 37 + 2) * 0.5 + 0.5) * (h * 0.72);
        const radius = 0.8 + (Math.sin(t * 2 + i) * 0.5 + 0.5) * 1.5;
        const alpha = 0.3 + (Math.sin(t * 3 + i * 2) * 0.5 + 0.5) * 0.7;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(sx, sy, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Distant Radiant Earth with Atmosphere & Continents
      const earthX = w * 0.82;
      const earthY = h * 0.22;
      const earthR = 34;

      // Atmospheric Glow
      const earthGlow = ctx.createRadialGradient(earthX, earthY, earthR * 0.8, earthX, earthY, earthR * 1.7);
      earthGlow.addColorStop(0, 'rgba(56, 189, 248, 0.4)');
      earthGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = earthGlow;
      ctx.beginPath();
      ctx.arc(earthX, earthY, earthR * 1.7, 0, Math.PI * 2);
      ctx.fill();

      // Earth Globe (Ocean Blue)
      ctx.fillStyle = '#1D4ED8';
      ctx.beginPath();
      ctx.arc(earthX, earthY, earthR, 0, Math.PI * 2);
      ctx.fill();

      // Green Continents
      ctx.fillStyle = '#22C55E';
      ctx.beginPath();
      ctx.arc(earthX - 8, earthY - 6, 12, 0, Math.PI * 2);
      ctx.arc(earthX + 10, earthY + 4, 10, 0, Math.PI * 2);
      ctx.arc(earthX - 4, earthY + 12, 8, 0, Math.PI * 2);
      ctx.fill();

      // Swirling White Clouds
      ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
      ctx.beginPath();
      ctx.ellipse(earthX - 2, earthY - 8, 16, 4, 0.3, 0, Math.PI * 2);
      ctx.ellipse(earthX + 4, earthY + 8, 14, 3, -0.2, 0, Math.PI * 2);
      ctx.fill();

      // Earth Shadow
      ctx.fillStyle = 'rgba(3, 7, 18, 0.6)';
      ctx.beginPath();
      ctx.arc(earthX + 8, earthY, earthR, -Math.PI * 0.5, Math.PI * 0.5);
      ctx.fill();

      // Lunar Surface Ground with Craters
      const groundH = h * 0.28;
      const moonGroundGrad = ctx.createLinearGradient(0, h - groundH, 0, h);
      moonGroundGrad.addColorStop(0, '#64748B');
      moonGroundGrad.addColorStop(0.5, '#475569');
      moonGroundGrad.addColorStop(1, '#334155');
      ctx.fillStyle = moonGroundGrad;
      ctx.beginPath();
      ctx.moveTo(0, h);
      ctx.lineTo(0, h - groundH + 15);
      // Gentle undulating lunar hill
      for (let x = 0; x <= w; x += 40) {
        const y = (h - groundH + 15) + Math.sin(x * 0.008 + 1) * 14;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.closePath();
      ctx.fill();

      // Lunar Craters on the ground
      const craters = [
        { x: w * 0.15, y: h - 35, rx: 22, ry: 8 },
        { x: w * 0.42, y: h - 50, rx: 32, ry: 10 },
        { x: w * 0.74, y: h - 30, rx: 26, ry: 9 },
        { x: w * 0.88, y: h - 65, rx: 18, ry: 6 }
      ];
      craters.forEach(cr => {
        ctx.fillStyle = '#1E293B';
        ctx.beginPath();
        ctx.ellipse(cr.x, cr.y, cr.rx, cr.ry, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#94A3B8';
        ctx.lineWidth = 1.8;
        ctx.stroke();
      });

      // Little Planted Space Flag
      ctx.strokeStyle = '#CBD5E1';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(w * 0.28, h - 55);
      ctx.lineTo(w * 0.28, h - 95);
      ctx.stroke();
      ctx.fillStyle = '#EF4444';
      ctx.fillRect(w * 0.28, h - 95, 20, 13);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 9px sans-serif';
      ctx.fillText('★', w * 0.28 + 6, h - 85);
    }

    // B. Temporal Wormhole ("Yesterday's Biriyani" / Malayalam Dining Room)
    else if (this.currentEnvironment === 'temporal_wormhole') {
      // Warm Kerala Dining Room Wall
      const wallGrad = ctx.createLinearGradient(0, 0, 0, h);
      wallGrad.addColorStop(0, '#3F1D38');
      wallGrad.addColorStop(0.65, '#581C87');
      wallGrad.addColorStop(1, '#2E1065');
      ctx.fillStyle = wallGrad;
      ctx.fillRect(0, 0, w, h);

      // Spinning Golden Time Vortex Clock in Center Background
      ctx.save();
      ctx.translate(w * 0.5, h * 0.42);
      ctx.rotate(t * 0.8);
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.28)';
      ctx.lineWidth = 4;
      ctx.setLineDash([20, 14]);
      for (let r = 60; r <= 360; r += 55) {
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();

      // Flying "YESTERDAY" Calendar Leaves through the time rift
      for (let i = 0; i < 8; i++) {
        const angle = t * 1.5 + (i * Math.PI * 0.25);
        const dist = 90 + Math.sin(t * 2 + i) * 45;
        const px = w * 0.5 + Math.cos(angle) * dist * 1.8;
        const py = h * 0.42 + Math.sin(angle) * dist;
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(angle * 1.2);
        ctx.fillStyle = '#FFFBEB';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1.5;
        ctx.fillRect(-16, -12, 32, 24);
        ctx.strokeRect(-16, -12, 32, 24);
        ctx.fillStyle = '#DC2626';
        ctx.fillRect(-16, -12, 32, 7);
        ctx.fillStyle = '#1E293B';
        ctx.font = 'bold 8px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('YESTERDAY', 0, 7);
        ctx.restore();
      }

      // Wooden Dining Table Surface in Foreground
      const tableTop = h * 0.68;
      const woodGrad = ctx.createLinearGradient(0, tableTop, 0, h);
      woodGrad.addColorStop(0, '#78350F');
      woodGrad.addColorStop(0.4, '#92400E');
      woodGrad.addColorStop(1, '#451A03');
      ctx.fillStyle = woodGrad;
      ctx.fillRect(0, tableTop, w, h - tableTop);

      // Table Edge Rim Highlight
      ctx.strokeStyle = '#B45309';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, tableTop);
      ctx.lineTo(w, tableTop);
      ctx.stroke();

      // Fresh Green Banana / Plantain Leaf on the table
      ctx.fillStyle = '#16A34A';
      ctx.beginPath();
      ctx.ellipse(w * 0.5, tableTop + 55, w * 0.38, 48, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#14532D';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Central Leaf Rib Vein
      ctx.strokeStyle = '#4ADE80';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(w * 0.15, tableTop + 55);
      ctx.lineTo(w * 0.85, tableTop + 55);
      ctx.stroke();

      // Traditional Side Condiments (Lemon wedge, Salt, Pickle)
      ctx.fillStyle = '#FDE047'; // Lemon
      ctx.beginPath();
      ctx.arc(w * 0.22, tableTop + 42, 10, 0, Math.PI);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#991B1B'; // Mango Pickle
      ctx.beginPath();
      ctx.arc(w * 0.28, tableTop + 45, 8, 0, Math.PI * 2);
      ctx.fill();
    }

    // C. Wedding Chapel ("Make my chair marry a dinosaur")
    else if (this.currentEnvironment === 'wedding_chapel') {
      // Cathedral Interior Walls
      const chapelGrad = ctx.createLinearGradient(0, 0, 0, h);
      chapelGrad.addColorStop(0, '#1E1B4B');
      chapelGrad.addColorStop(0.65, '#312E81');
      chapelGrad.addColorStop(1, '#4338CA');
      ctx.fillStyle = chapelGrad;
      ctx.fillRect(0, 0, w, h);

      // Large Radiant Stained-Glass Rose Window in Center
      const winX = w * 0.5;
      const winY = h * 0.32;
      const winR = 75;

      // Jewel Light Beams
      const beamGrad = ctx.createRadialGradient(winX, winY, 20, winX, winY, w * 0.7);
      beamGrad.addColorStop(0, 'rgba(244, 114, 182, 0.4)');
      beamGrad.addColorStop(0.4, 'rgba(251, 191, 36, 0.25)');
      beamGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = beamGrad;
      ctx.beginPath();
      ctx.arc(winX, winY, w * 0.65, 0, Math.PI * 2);
      ctx.fill();

      // Stained Glass Frame
      ctx.fillStyle = '#0F172A';
      ctx.beginPath();
      ctx.arc(winX, winY, winR + 6, 0, Math.PI * 2);
      ctx.fill();

      // Stained Glass Colorful Petals
      const glassColors = ['#EF4444', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#06B6D4', '#EAB308'];
      for (let i = 0; i < 8; i++) {
        ctx.fillStyle = glassColors[i];
        ctx.beginPath();
        const a1 = (i * Math.PI) / 4;
        const a2 = ((i + 1) * Math.PI) / 4;
        ctx.moveTo(winX, winY);
        ctx.arc(winX, winY, winR, a1, a2);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }

      // Golden Rose Window Center
      ctx.fillStyle = '#FBBF24';
      ctx.beginPath();
      ctx.arc(winX, winY, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Romantic Floral Wedding Archway with Roses
      ctx.strokeStyle = '#22C55E';
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.arc(winX, h * 0.54, 155, Math.PI, 0);
      ctx.stroke();

      // Blooming Pink & White Roses along the arch
      for (let a = Math.PI; a <= Math.PI * 2; a += 0.22) {
        const rx = winX + Math.cos(a) * 155;
        const ry = h * 0.54 + Math.sin(a) * 155;
        ctx.fillStyle = Math.sin(a * 4) > 0 ? '#FB7185' : '#FFFFFF';
        ctx.beginPath();
        ctx.arc(rx, ry, 11, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Red Wedding Carpet Aisle
      ctx.fillStyle = '#BE123C';
      ctx.beginPath();
      ctx.moveTo(w * 0.36, h);
      ctx.lineTo(w * 0.44, h * 0.65);
      ctx.lineTo(w * 0.56, h * 0.65);
      ctx.lineTo(w * 0.64, h);
      ctx.closePath();
      ctx.fill();

      // Gold Carpet Trim
      ctx.strokeStyle = '#FBBF24';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Rose Petals on Carpet
      for (let p = 0; p < 12; p++) {
        const px = w * 0.42 + Math.sin(p * 23) * (w * 0.08);
        const py = h * 0.68 + (p * 18);
        ctx.fillStyle = '#FDA4AF';
        ctx.beginPath();
        ctx.ellipse(px, py, 4, 3, p, 0, Math.PI * 2);
        ctx.fill();
      }

      // Guest Critters in Pews (Bunny on left, Teddy Bear on right)
      ctx.font = '28px sans-serif';
      ctx.fillText('🐰', w * 0.16, h * 0.72);
      ctx.fillText('🧸', w * 0.82, h * 0.72);
      ctx.fillText('🐧', w * 0.22, h * 0.76);
      ctx.fillText('🐱', w * 0.76, h * 0.76);
    }

    // D. Giant City Skyline ("I want to be a giant")
    else if (this.currentEnvironment === 'giant_skyline') {
      // Twilight Sky
      const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
      skyGrad.addColorStop(0, '#0F172A');
      skyGrad.addColorStop(0.5, '#1E293B');
      skyGrad.addColorStop(0.85, '#E11D48');
      skyGrad.addColorStop(1, '#F59E0B');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h);

      // Stars in upper sky
      ctx.fillStyle = '#FFFFFF';
      for (let s = 0; s < 25; s++) {
        const sx = (Math.sin(s * 77) * 0.5 + 0.5) * w;
        const sy = (Math.cos(s * 41) * 0.5 + 0.5) * (h * 0.4);
        ctx.fillRect(sx, sy, 2, 2);
      }

      // Distant Horizon Skyscrapers (Layer 1 - Dark Silhouette)
      ctx.fillStyle = '#0F172A';
      for (let x = 0; x < w; x += 28) {
        const bh = 90 + Math.sin(x * 0.04) * 50;
        ctx.fillRect(x, h - bh - 70, 26, bh + 70);
      }

      // Foreground Skyscrapers (Layer 2 - Illuminated with glowing windows)
      const bldgWidth = 42;
      for (let x = 8; x < w; x += bldgWidth + 10) {
        const bh = 110 + Math.sin(x * 0.03 + 2) * 60;
        ctx.fillStyle = '#1E293B';
        ctx.fillRect(x, h - bh, bldgWidth, bh);
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, h - bh, bldgWidth, bh);

        // Blinking Red Roof Beacon Light
        ctx.fillStyle = Math.sin(t * 4 + x) > 0 ? '#EF4444' : '#7F1D1D';
        ctx.beginPath();
        ctx.arc(x + bldgWidth * 0.5, h - bh - 6, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#CBD5E1';
        ctx.beginPath();
        ctx.moveTo(x + bldgWidth * 0.5, h - bh);
        ctx.lineTo(x + bldgWidth * 0.5, h - bh - 6);
        ctx.stroke();

        // Glowing Windows
        for (let wy = h - bh + 10; wy < h - 20; wy += 14) {
          ctx.fillStyle = Math.sin(wy * x) > -0.2 ? '#FDE047' : '#38BDF8';
          ctx.fillRect(x + 6, wy, 10, 8);
          ctx.fillRect(x + 22, wy, 10, 8);
        }
      }

      // Ground Highway with Moving Cars
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, h - 26, w, 26);
      ctx.strokeStyle = '#E2E8F0';
      ctx.setLineDash([12, 10]);
      ctx.beginPath();
      ctx.moveTo(0, h - 13);
      ctx.lineTo(w, h - 13);
      ctx.stroke();
      ctx.setLineDash([]);

      // Moving Headlights & Taillights
      for (let c = 0; c < 5; c++) {
        const carX = ((t * 80 + c * (w / 5)) % (w + 60)) - 30;
        // Yellow Headlight
        ctx.fillStyle = '#FEF08A';
        ctx.beginPath();
        ctx.arc(carX, h - 13, 3.5, 0, Math.PI * 2);
        ctx.fill();
        // Red Taillight
        ctx.fillStyle = '#EF4444';
        ctx.beginPath();
        ctx.arc(carX - 14, h - 13, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Knee-level Cartoon Cloud Drifting through the city
      const cloudX = ((t * 25) % (w + 140)) - 70;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.beginPath();
      ctx.arc(cloudX, h * 0.58, 22, 0, Math.PI * 2);
      ctx.arc(cloudX + 22, h * 0.54, 28, 0, Math.PI * 2);
      ctx.arc(cloudX + 48, h * 0.58, 20, 0, Math.PI * 2);
      ctx.fill();
    }

    // E. Ocean Depths ("I want to drink the ocean")
    else if (this.currentEnvironment === 'ocean_depths') {
      // Shifting Tropical Turquoise to Deep Ocean Gradient
      const oceanGrad = ctx.createLinearGradient(0, 0, 0, h);
      oceanGrad.addColorStop(0, '#06B6D4');
      oceanGrad.addColorStop(0.3, '#0284C7');
      oceanGrad.addColorStop(0.8, '#0369A1');
      oceanGrad.addColorStop(1, '#082F49');
      ctx.fillStyle = oceanGrad;
      ctx.fillRect(0, 0, w, h);

      // Shimmering Sunlight Caustics Beams
      ctx.save();
      for (let b = 0; b < 6; b++) {
        const bx = (b * (w / 5)) + Math.sin(t * 1.2 + b) * 20;
        const bGrad = ctx.createLinearGradient(bx, 0, bx + 30, h);
        bGrad.addColorStop(0, 'rgba(255, 255, 255, 0.28)');
        bGrad.addColorStop(0.7, 'rgba(255, 255, 255, 0.08)');
        bGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = bGrad;
        ctx.beginPath();
        ctx.moveTo(bx, 0);
        ctx.lineTo(bx + 40, 0);
        ctx.lineTo(bx + 110, h);
        ctx.lineTo(bx + 40, h);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      // Rolling Animated Ocean Waves at Top
      ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      for (let x = 0; x <= w; x += 20) {
        const y = 14 + Math.sin(x * 0.03 + t * 3) * 6;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, 0);
      ctx.closePath();
      ctx.fill();

      // Sandy Seabed with Corals
      const seaBedTop = h * 0.78;
      const sandGrad = ctx.createLinearGradient(0, seaBedTop, 0, h);
      sandGrad.addColorStop(0, '#F59E0B');
      sandGrad.addColorStop(1, '#B45309');
      ctx.fillStyle = sandGrad;
      ctx.beginPath();
      ctx.moveTo(0, h);
      ctx.lineTo(0, seaBedTop);
      for (let x = 0; x <= w; x += 40) {
        ctx.lineTo(x, seaBedTop + Math.sin(x * 0.02) * 8);
      }
      ctx.lineTo(w, h);
      ctx.closePath();
      ctx.fill();

      // Swaying Sea Kelp Forests
      ctx.strokeStyle = '#10B981';
      ctx.lineWidth = 6;
      ctx.lineCap = 'round';
      for (let k = 15; k < w; k += 45) {
        ctx.beginPath();
        ctx.moveTo(k, h);
        const kh = 70 + Math.sin(k) * 35;
        const sway = Math.sin(t * 2 + k * 0.1) * 14;
        ctx.quadraticCurveTo(k + sway, h - kh * 0.5, k + sway * 1.5, h - kh);
        ctx.stroke();
      }

      // Swimming School of Tropical Fish
      for (let f = 0; f < 5; f++) {
        const fishX = ((t * 45 + f * 42) % (w + 80)) - 40;
        const fishY = h * 0.35 + Math.sin(t * 3 + f) * 16 + (f * 18);
        ctx.fillStyle = f % 2 === 0 ? '#F97316' : '#FDE047'; // Clownfish / Tang
        ctx.beginPath();
        ctx.ellipse(fishX, fishY, 11, 6, 0, 0, Math.PI * 2);
        ctx.fill();
        // Tail Fin
        ctx.beginPath();
        ctx.moveTo(fishX - 9, fishY);
        ctx.lineTo(fishX - 16, fishY - 6);
        ctx.lineTo(fishX - 16, fishY + 6);
        ctx.closePath();
        ctx.fill();
      }

      // Rising Bubble Streams
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 1;
      for (let b = 0; b < 10; b++) {
        const bx = (b * (w / 9)) + Math.sin(t * 2 + b) * 8;
        const by = ((h - (t * 55 + b * 45)) % h + h) % h;
        const br = 3 + (b % 4);
        ctx.beginPath();
        ctx.arc(bx, by, br, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
    }

    // F. Homework into Pizza Classroom Desk
    else if (this.currentEnvironment === 'homework_pizza' || this.currentEnvironment === 'pizza_kitchen') {
      // Cozy Classroom Wall
      ctx.fillStyle = '#334155';
      ctx.fillRect(0, 0, w, h);

      // Blackboard in Background with Math Chalk Doodles
      ctx.fillStyle = '#064E3B';
      ctx.fillRect(w * 0.1, h * 0.08, w * 0.8, h * 0.45);
      ctx.strokeStyle = '#D97706';
      ctx.lineWidth = 6;
      ctx.strokeRect(w * 0.1, h * 0.08, w * 0.8, h * 0.45);

      // Chalk Text on Blackboard
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.font = 'bold 18px "Patrick Hand", cursive';
      ctx.fillText('MATH EXAM: ALGEBRA & FRACTIONS', w * 0.16, h * 0.2);
      ctx.font = '15px monospace';
      ctx.fillText('x² + y² = 🍕', w * 0.18, h * 0.28);
      ctx.fillText('HOMEWORK = DELICIOUS', w * 0.18, h * 0.36);

      // Student Desk Surface in Foreground
      const deskTop = h * 0.65;
      ctx.fillStyle = '#D97706';
      ctx.fillRect(0, deskTop, w, h - deskTop);
      ctx.strokeStyle = '#92400E';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, deskTop);
      ctx.lineTo(w, deskTop);
      ctx.stroke();

      // Pencils and Sharpener on Desk
      ctx.fillStyle = '#FDE047';
      ctx.fillRect(w * 0.15, deskTop + 18, 55, 7);
      ctx.fillStyle = '#EC4899'; // Eraser
      ctx.fillRect(w * 0.15, deskTop + 18, 12, 7);
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.moveTo(w * 0.15 + 55, deskTop + 18);
      ctx.lineTo(w * 0.15 + 65, deskTop + 21.5);
      ctx.lineTo(w * 0.15 + 55, deskTop + 25);
      ctx.fill();
    }

    // G. Default / Procedural Playground
    else {
      // Playful Dynamic Stage Horizon
      const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
      bgGrad.addColorStop(0, '#0F172A');
      bgGrad.addColorStop(0.65, '#1E293B');
      bgGrad.addColorStop(1, '#090D16');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Glowing Center Spotlight
      const spotGrad = ctx.createRadialGradient(w * 0.5, h * 0.5, 40, w * 0.5, h * 0.5, w * 0.65);
      spotGrad.addColorStop(0, 'rgba(255, 43, 109, 0.18)');
      spotGrad.addColorStop(0.5, 'rgba(0, 229, 255, 0.12)');
      spotGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = spotGrad;
      ctx.fillRect(0, 0, w, h);

      // Subtle Stage Horizon Ground Line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, h * 0.78);
      ctx.lineTo(w, h * 0.78);
      ctx.stroke();
    }
  }

  // High-Resolution Snapshot Generator for Certified Image Cards
  takeSnapshot() {
    try {
      return this.canvas.toDataURL('image/png');
    } catch (e) {
      console.warn('Canvas snapshot error:', e);
      return null;
    }
  }
}

window.RealityEngine = RealityEngine;
