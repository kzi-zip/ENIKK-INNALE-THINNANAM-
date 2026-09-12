/**
 * LIVING ANIMATED ROAMING DOODLES & CHARACTERS
 * 
 * Creates an active, colorful, joyful playground of cartoon characters
 * roaming across the screen with fluid movement, hover reactions,
 * click particle bursts, and typing enthusiasm!
 */

class BackgroundDoodles {
  constructor() {
    this.container = document.createElement('div');
    this.container.className = 'ambient-doodles-universe';
    this.container.setAttribute('aria-hidden', 'true');
    document.body.prepend(this.container);

    // 16 Lively roaming characters with distinct behaviors and motion paths
    this.characters = [
      { emoji: '🦖', name: 'dino', x: 5, y: 78, vx: 0.6, vy: 0, size: 44, anim: 'roamDino', bounce: true },
      { emoji: '☁️', name: 'cloud', x: 82, y: 12, vx: -0.35, vy: 0.05, size: 48, anim: 'roamFloat' },
      { emoji: '🚀', name: 'rocket', x: 15, y: 35, vx: 0.8, vy: -0.4, size: 38, anim: 'roamRocket' },
      { emoji: '⭐', name: 'star', x: 92, y: 28, vx: 0.2, vy: 0.3, size: 36, anim: 'roamOrbit' },
      { emoji: '🍕', name: 'pizza', x: 88, y: 68, vx: -0.4, vy: -0.2, size: 38, anim: 'roamFloat' },
      { emoji: '🎈', name: 'balloon', x: 74, y: 46, vx: 0.15, vy: -0.5, size: 42, anim: 'roamBalloon' },
      { emoji: '🍩', name: 'donut', x: 8, y: 52, vx: 0.45, vy: 0.3, size: 34, anim: 'roamFloat' },
      { emoji: '🦋', name: 'butterfly', x: 42, y: 16, vx: 0.5, vy: 0.4, size: 32, anim: 'roamButterfly' },
      { emoji: '☀️', name: 'sun', x: 28, y: 8, vx: 0.1, vy: 0.1, size: 44, anim: 'roamFloat' },
      { emoji: '🍌', name: 'banana', x: 94, y: 86, vx: -0.5, vy: 0.2, size: 34, anim: 'roamWiggle' },
      { emoji: '🪐', name: 'saturn', x: 12, y: 88, vx: 0.25, vy: -0.2, size: 40, anim: 'roamFloat' },
      { emoji: '🛸', name: 'ufo', x: 65, y: 22, vx: -0.7, vy: 0.25, size: 38, anim: 'roamRocket' },
      { emoji: '🐱', name: 'cat', x: 3, y: 25, vx: 0.3, vy: -0.15, size: 36, anim: 'roamDino' },
      { emoji: '🍦', name: 'icecream', x: 84, y: 88, vx: -0.2, vy: -0.3, size: 34, anim: 'roamFloat' },
      { emoji: '🤖', name: 'robot', x: 48, y: 92, vx: 0.4, vy: 0, size: 36, anim: 'roamDino' },
      { emoji: '💖', name: 'heart', x: 34, y: 60, vx: 0.3, vy: -0.4, size: 32, anim: 'roamBalloon' }
    ];

    this.elements = [];
    this.init();
    this.bindInteractions();
    this.startWanderLoop();
  }

  init() {
    this.characters.forEach((char, idx) => {
      const el = document.createElement('div');
      el.className = `ambient-doodle doodle-${char.name}`;
      el.textContent = char.emoji;
      el.style.left = `${char.x}vw`;
      el.style.top = `${char.y}vh`;
      el.style.fontSize = `${char.size}px`;
      this.container.appendChild(el);

      this.elements.push({
        el,
        char,
        x: char.x,
        y: char.y,
        vx: char.vx,
        vy: char.vy,
        baseSize: char.size,
        scaleX: 1,
        angle: 0
      });
    });
  }

  startWanderLoop() {
    let lastT = performance.now();

    const updateMotion = (now) => {
      const dt = Math.min(0.1, (now - lastT) / 1000);
      lastT = now;

      this.elements.forEach(item => {
        if (item.isHovered || item.isClicked) return;

        // Position update
        item.x += item.vx * dt * 4;
        item.y += item.vy * dt * 4;

        // Screen edge gentle bounce / wrap
        if (item.x < 1) {
          item.x = 1;
          item.vx = Math.abs(item.vx);
          item.scaleX = 1;
        } else if (item.x > 95) {
          item.x = 95;
          item.vx = -Math.abs(item.vx);
          item.scaleX = -1;
        }

        if (item.y < 4) {
          item.y = 4;
          item.vy = Math.abs(item.vy);
        } else if (item.y > 94) {
          item.y = 94;
          item.vy = -Math.abs(item.vy);
        }

        // Apply gentle walking hop or float
        let bobY = 0;
        if (item.char.bounce) {
          bobY = Math.sin(now * 0.008 + item.x) * 6;
        } else {
          bobY = Math.sin(now * 0.003 + item.y) * 4;
        }

        item.el.style.left = `${item.x}vw`;
        item.el.style.top = `${item.y + (bobY * 0.1)}vh`;
        item.el.style.transform = `scaleX(${item.scaleX}) rotate(${Math.sin(now * 0.002 + item.x) * 8}deg)`;
      });

      requestAnimationFrame(updateMotion);
    };

    requestAnimationFrame(updateMotion);
  }

  spawnClickConfetti(cx, cy) {
    const colors = ['#FF2B6D', '#FFE100', '#00E5FF', '#22C55E', '#9747FF', '#FF6B00'];
    for (let i = 0; i < 12; i++) {
      const p = document.createElement('div');
      p.className = 'doodle-sparkle-particle';
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = 8 + Math.random() * 8;
      p.style.cssText = `
        position: fixed;
        left: ${cx}px;
        top: ${cy}px;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
        border: 1.5px solid #000;
        pointer-events: none;
        z-index: 9999;
        box-shadow: 2px 2px 0 rgba(0,0,0,0.3);
      `;
      document.body.appendChild(p);

      const angle = (Math.PI * 2 * i) / 12 + (Math.random() - 0.5);
      const speed = 60 + Math.random() * 80;
      const targetX = Math.cos(angle) * speed;
      const targetY = Math.sin(angle) * speed;

      p.animate([
        { transform: 'translate(0, 0) scale(1) rotate(0deg)', opacity: 1 },
        { transform: `translate(${targetX}px, ${targetY}px) scale(0.2) rotate(${Math.random() * 360}deg)`, opacity: 0 }
      ], {
        duration: 650,
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
      }).onfinish = () => p.remove();
    }
  }

  bindInteractions() {
    this.elements.forEach(item => {
      const el = item.el;
      const char = item.char;

      // Hover reaction
      el.addEventListener('mouseenter', () => {
        item.isHovered = true;
        el.classList.add('doodle-hovered');
        if (window.soundEngine && window.soundEngine.playPop) {
          window.soundEngine.playPop(1.4);
        }
      });

      el.addEventListener('mouseleave', () => {
        item.isHovered = false;
        el.classList.remove('doodle-hovered');
      });

      // Click reaction
      el.addEventListener('click', (e) => {
        item.isClicked = true;
        if (window.soundEngine && window.soundEngine.playPop) {
          window.soundEngine.playPop(1.6);
        }

        // Spawn colorful confetti explosion at click position
        this.spawnClickConfetti(e.clientX, e.clientY);

        el.classList.add('doodle-clicked');
        setTimeout(() => {
          el.classList.remove('doodle-clicked');
          item.isClicked = false;
        }, 450);
      });
    });

    // Listen to typing in reality input to make all doodles perk up and dance!
    const input = document.getElementById('reality-input');
    if (input) {
      input.addEventListener('input', () => {
        this.container.classList.add('doodles-listening');
        if (this.typingTimeout) clearTimeout(this.typingTimeout);
        this.typingTimeout = setTimeout(() => {
          this.container.classList.remove('doodles-listening');
        }, 1200);
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.backgroundDoodles = new BackgroundDoodles();
});
