/**
 * MODULAR COMBINABLE BEHAVIORS SYSTEM
 * 
 * Behaviors operate on entities every frame.
 * An entity can combine multiple behaviors (e.g. cloud + float + rain + draggable).
 */

const Behaviors = {
  // Gentle hovering floating wave
  float(entity, dt, sim) {
    if (entity.isDragging) return;
    entity.floatTimer = (entity.floatTimer || Math.random() * 10) + dt * 2.2;
    entity.targetOffsetY = Math.sin(entity.floatTimer) * (entity.floatAmplitude || 14);
    entity.vy += (entity.targetOffsetY - (entity.currentOffsetY || 0)) * 0.08;
    entity.currentOffsetY = (entity.currentOffsetY || 0) + (entity.targetOffsetY - (entity.currentOffsetY || 0)) * 0.1;
  },

  // Flapping / flying wandering motion
  fly(entity, dt, sim) {
    if (entity.isDragging) return;
    entity.wingTimer = (entity.wingTimer || 0) + dt * 14;
    entity.wingAngle = Math.sin(entity.wingTimer) * 0.35;

    // Gentle wandering drift
    entity.driftTimer = (entity.driftTimer || Math.random() * 10) + dt * 0.8;
    entity.vx += Math.cos(entity.driftTimer) * 0.25;
    entity.vy += Math.sin(entity.driftTimer * 1.3) * 0.2;
  },

  // Orbit around center or cursor
  orbit(entity, dt, sim) {
    if (entity.isDragging) return;
    entity.orbitAngle = (entity.orbitAngle || Math.random() * 6.28) + dt * 0.9;
    const targetX = sim.mouse.inside ? sim.mouse.x : sim.width * 0.5;
    const targetY = sim.mouse.inside ? sim.mouse.y : sim.height * 0.4;
    const radius = entity.orbitRadius || 180;

    const desiredX = targetX + Math.cos(entity.orbitAngle) * radius;
    const desiredY = targetY + Math.sin(entity.orbitAngle) * radius;

    entity.vx += (desiredX - entity.x) * 0.04;
    entity.vy += (desiredY - entity.y) * 0.04;
  },

  // Attracted to cursor smoothly
  followCursor(entity, dt, sim) {
    if (entity.isDragging || !sim.mouse.inside) return;
    const dx = sim.mouse.x - entity.x;
    const dy = sim.mouse.y - entity.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 80) {
      entity.vx += (dx / dist) * 0.35;
      entity.vy += (dy / dist) * 0.35;
    }
  },

  // Jelly-like squash and stretch wobble
  wobble(entity, dt, sim) {
    entity.wobbleTimer = (entity.wobbleTimer || 0) + dt * 3.5;
    entity.scaleX = 1 + Math.sin(entity.wobbleTimer) * 0.05;
    entity.scaleY = 1 - Math.sin(entity.wobbleTimer) * 0.05;
  },

  // Soft rhythmic breathing pulse
  pulse(entity, dt, sim) {
    entity.pulseTimer = (entity.pulseTimer || 0) + dt * 2.5;
    const s = 1 + Math.sin(entity.pulseTimer) * 0.08;
    entity.scaleX = s;
    entity.scaleY = s;
  },

  // Rain precipitation from cloud
  rain(entity, dt, sim) {
    entity.rainTimer = (entity.rainTimer || 0) + dt;
    if (entity.rainTimer > 0.09) {
      entity.rainTimer = 0;
      sim.spawnParticle({
        type: 'raindrop',
        x: entity.x + (Math.random() - 0.5) * (entity.width * 0.75),
        y: entity.y + entity.height * 0.45,
        vx: (Math.random() - 0.5) * 0.5,
        vy: 4 + Math.random() * 4,
        size: 3 + Math.random() * 2,
        life: 1.2,
        maxLife: 1.2,
        color: '#4FC3F7'
      });
      if (Math.random() < 0.15) {
        window.soundEngine.playRaindrop();
      }
    }
  },

  // Ground stomping footsteps for dinosaur / giant
  stomp(entity, dt, sim) {
    if (entity.isDragging) return;
    entity.stompTimer = (entity.stompTimer || 0) + dt * 2.4;
    entity.walkCycle = Math.sin(entity.stompTimer);

    // Stomp impact at bottom of cycle
    if (entity.walkCycle < -0.92 && !entity.hasStompedThisStep) {
      entity.hasStompedThisStep = true;
      sim.shakeScreen(4, 0.15);
      window.soundEngine.playStomp();
      
      // Spawn dust puff
      for (let i = 0; i < 4; i++) {
        sim.spawnParticle({
          type: 'dust',
          x: entity.x + (Math.random() - 0.5) * 40,
          y: entity.y + entity.height * 0.48,
          vx: (Math.random() - 0.5) * 3,
          vy: -Math.random() * 2,
          size: 4 + Math.random() * 5,
          life: 0.5,
          maxLife: 0.5,
          color: 'rgba(150, 150, 150, 0.4)'
        });
      }
    } else if (entity.walkCycle > 0) {
      entity.hasStompedThisStep = false;
    }
  },

  // Temporal distortion & spinning calendar leaves for yesterday's biriyani
  timeWarp(entity, dt, sim) {
    entity.timeWarpAngle = (entity.timeWarpAngle || 0) + dt * 1.5;
    entity.calendarTimer = (entity.calendarTimer || 0) + dt;

    if (entity.calendarTimer > 0.45) {
      entity.calendarTimer = 0;
      sim.spawnParticle({
        type: 'calendar',
        text: 'YESTERDAY',
        x: entity.x + (Math.random() - 0.5) * 60,
        y: entity.y + (Math.random() - 0.5) * 30,
        vx: (Math.random() - 0.5) * 2,
        vy: -1.5 - Math.random() * 2,
        rotation: (Math.random() - 0.5) * 0.5,
        rotSpeed: (Math.random() - 0.5) * 2,
        life: 2.0,
        maxLife: 2.0
      });
    }

    // Aroma spices steam
    entity.steamTimer = (entity.steamTimer || 0) + dt;
    if (entity.steamTimer > 0.2) {
      entity.steamTimer = 0;
      sim.spawnParticle({
        type: 'spice',
        symbol: ['✨', '🌿', '🌶️', '⭐'][Math.floor(Math.random() * 4)],
        x: entity.x + (Math.random() - 0.5) * 40,
        y: entity.y - entity.height * 0.35,
        vx: (Math.random() - 0.5) * 0.8,
        vy: -1.8 - Math.random() * 1.2,
        life: 1.4,
        maxLife: 1.4
      });
    }
  },

  // Gravitational attraction for the Moon
  gravitationalPull(entity, dt, sim) {
    entity.starEmitTimer = (entity.starEmitTimer || 0) + dt;
    if (entity.starEmitTimer > 0.35) {
      entity.starEmitTimer = 0;
      sim.spawnParticle({
        type: 'starlight',
        x: entity.x + (Math.random() - 0.5) * 160,
        y: entity.y + (Math.random() - 0.5) * 160,
        vx: 0,
        vy: 0,
        size: 3 + Math.random() * 3,
        life: 1.0,
        maxLife: 1.0,
        color: '#FFF9D2'
      });
    }
  },

  // Sparkle trail for flying creatures & rainbows
  sparkleTrail(entity, dt, sim) {
    entity.sparkleTimer = (entity.sparkleTimer || 0) + dt;
    if (entity.sparkleTimer > 0.15) {
      entity.sparkleTimer = 0;
      sim.spawnParticle({
        type: 'sparkle',
        x: entity.x + (Math.random() - 0.5) * 30,
        y: entity.y + (Math.random() - 0.5) * 30,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        size: 4 + Math.random() * 4,
        life: 0.8,
        maxLife: 0.8,
        color: '#FFBC42'
      });
    }
  },

  // Bouncy hop for living drawings & lively creatures
  bounce(entity, dt, sim) {
    if (entity.isDragging) return;
    entity.bounceTimer = (entity.bounceTimer || Math.random() * 5) + dt * 4;
    entity.vy += Math.sin(entity.bounceTimer) * 0.25;
  },

  // Interactive bites click listener flag
  interactiveBites(entity, dt, sim) {
    // Entity is configured for tasty bites interaction
  }
};

window.Behaviors = Behaviors;
