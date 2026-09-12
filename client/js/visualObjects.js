/**
 * VISUAL OBJECTS RENDERER
 * 
 * Handcrafted Canvas renderers for all scenarios and archetypes:
 * - Yesterday's Biriyani (steaming clay pot with time-portal)
 * - Turn My Homework Into Pizza (test papers morphing into pizza slice)
 * - Make a Penguin Fly (aviator penguin with glider wings)
 * - Make it Rain Cookies (golden chocolate chip cookie with cookie shower)
 * - Make My Chair Marry a Dinosaur (chair bride & T-Rex groom in matrimony)
 * - Hug a Cloud (super plush cuddly cloud with open hug arms)
 * - Eat the Moon / The Moon (lunar sphere with bite mark & craters)
 * - Friendly Dinosaur (stomping T-Rex)
 * - Touchable Rainbow
 * - Tiny Flying Elephant
 * - Pocket Sun
 * - Giant Character (towering boots over miniature city skyline)
 * - Living User Crayon Drawing (with animated cursor-tracking googly eyes)
 * - Rich Procedural Entity Synthesizer (for any arbitrary child logic)
 */

const VisualRenderers = {

  // 1. YESTERDAY'S BIRIYANI
  yesterday_biriyani(ctx, e) {
    const w = e.width;
    const h = e.height;

    // Spinning Temporal Portal Ring
    ctx.save();
    ctx.rotate(e.timeWarpAngle || 0);
    ctx.strokeStyle = 'rgba(255, 188, 66, 0.45)';
    ctx.lineWidth = 4;
    ctx.setLineDash([12, 8]);
    ctx.beginPath();
    ctx.arc(0, 0, w * 0.65, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // Terracotta Clay Pot Base
    ctx.save();
    ctx.fillStyle = '#C0392B';
    ctx.beginPath();
    ctx.ellipse(0, h * 0.1, w * 0.46, h * 0.36, 0, 0, Math.PI);
    ctx.fill();
    ctx.lineWidth = 3.5;
    ctx.strokeStyle = '#2C3437';
    ctx.stroke();

    // Rim
    ctx.fillStyle = '#A93226';
    ctx.beginPath();
    ctx.ellipse(0, h * 0.08, w * 0.46, h * 0.14, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Biriyani Rice Mound
    ctx.fillStyle = '#F39C12';
    ctx.beginPath();
    ctx.ellipse(0, h * 0.02, w * 0.4, h * 0.22, 0, Math.PI, 0);
    ctx.fill();
    ctx.stroke();

    // Spices & Fried Onions
    ctx.fillStyle = '#6E2C00';
    for (let i = -3; i <= 3; i++) {
      ctx.fillRect(i * 10 - 4, -h * 0.08 + Math.abs(i) * 3, 7, 2.5);
    }
    
    // Golden Boiled Egg
    ctx.fillStyle = '#F4D03F';
    ctx.beginPath();
    ctx.ellipse(12, -h * 0.06, 12, 9, 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Fresh Mint
    ctx.fillStyle = '#27AE60';
    ctx.beginPath();
    ctx.arc(-14, -h * 0.1, 7, 0, Math.PI * 2);
    ctx.arc(-18, -h * 0.14, 5, 0, Math.PI * 2);
    ctx.fill();

    // Smile & Eyes on the pot
    VisualRenderers._drawCuteFace(ctx, 0, h * 0.22, 10, e.blinkTimer);

    if (e.bitesCount > 0) {
      ctx.fillStyle = '#D35400';
      ctx.font = 'bold 12px "Space Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`${e.bitesCount} YUMMY BITES TAKEN!`, 0, h * 0.52);
    }
    ctx.restore();
  },

  // 2. TURN MY HOMEWORK INTO PIZZA
  homework_pizza(ctx, e) {
    const w = e.width * 0.55;
    const h = e.height * 0.55;

    ctx.save();
    // Homework Paper peeking out from crust
    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = '#2C3437';
    ctx.lineWidth = 2.5;
    ctx.fillRect(-w * 0.7, -h * 0.8, w * 0.9, h * 0.5);
    ctx.strokeRect(-w * 0.7, -h * 0.8, w * 0.9, h * 0.5);

    // Blue lined paper & Red "A+" grade scribbles
    ctx.strokeStyle = '#38BDF8';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 3; i++) {
      ctx.beginPath();
      ctx.moveTo(-w * 0.65, -h * 0.8 + i * 8);
      ctx.lineTo(-w * 0.05, -h * 0.8 + i * 8);
      ctx.stroke();
    }
    ctx.fillStyle = '#EF4444';
    ctx.font = 'bold 14px "Patrick Hand", cursive';
    ctx.fillText('A+ 100%', -w * 0.6, -h * 0.45);

    // Giant Triangle Pizza Slice
    ctx.fillStyle = '#F39C12'; // Crust
    ctx.beginPath();
    ctx.moveTo(0, h * 0.8);
    ctx.lineTo(-w * 0.8, -h * 0.5);
    ctx.quadraticCurveTo(0, -h * 0.65, w * 0.8, -h * 0.5);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#2C3437';
    ctx.lineWidth = 3.5;
    ctx.stroke();

    // Melted Mozzarella Cheese Layer
    ctx.fillStyle = '#FFD166';
    ctx.beginPath();
    ctx.moveTo(0, h * 0.7);
    ctx.lineTo(-w * 0.68, -h * 0.38);
    ctx.quadraticCurveTo(0, -h * 0.48, w * 0.68, -h * 0.38);
    ctx.closePath();
    ctx.fill();

    // Pepperoni Slices
    const pepperonis = [
      { x: -14, y: -h * 0.1, r: 11 },
      { x: 18, y: -h * 0.15, r: 12 },
      { x: 0, y: h * 0.25, r: 10 }
    ];
    ctx.fillStyle = '#C0392B';
    pepperonis.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });

    // Cute Cheerful Face on the cheese
    VisualRenderers._drawCuteFace(ctx, 0, -h * 0.05, 10, e.blinkTimer);
    ctx.restore();
  },

  // 3. MAKE A PENGUIN FLY
  flying_penguin(ctx, e) {
    const w = e.width * 0.48;
    const h = e.height * 0.48;

    ctx.save();
    // Glider Wings
    const wingFlap = Math.sin(e.wingTimer || 0) * 0.3;
    ctx.save();
    ctx.rotate(wingFlap);
    ctx.fillStyle = '#E67E22'; // Wooden Glider wings
    ctx.strokeStyle = '#2C3437';
    ctx.lineWidth = 3;
    ctx.fillRect(-w * 1.1, -h * 0.2, w * 2.2, 16);
    ctx.strokeRect(-w * 1.1, -h * 0.2, w * 2.2, 16);
    ctx.restore();

    // Penguin Black Body
    ctx.fillStyle = '#2C3E50';
    ctx.strokeStyle = '#2C3437';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.ellipse(0, 0, w * 0.55, h * 0.7, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // White Belly
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.ellipse(0, h * 0.1, w * 0.38, h * 0.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Aviator Leather Helmet
    ctx.fillStyle = '#8B4513';
    ctx.beginPath();
    ctx.arc(0, -h * 0.3, w * 0.52, Math.PI, 0);
    ctx.fill();
    ctx.stroke();

    // Aviator Goggles
    ctx.fillStyle = '#00E5FF';
    ctx.strokeStyle = '#2C3437';
    ctx.lineWidth = 2.5;
    ctx.fillRect(-18, -h * 0.4, 16, 14);
    ctx.fillRect(2, -h * 0.4, 16, 14);
    ctx.strokeRect(-18, -h * 0.4, 16, 14);
    ctx.strokeRect(2, -h * 0.4, 16, 14);

    // Orange Beak
    ctx.fillStyle = '#F39C12';
    ctx.beginPath();
    ctx.moveTo(-7, -h * 0.15);
    ctx.lineTo(7, -h * 0.15);
    ctx.lineTo(0, -h * 0.02);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Orange Webbed Feet
    ctx.fillStyle = '#F39C12';
    ctx.fillRect(-w * 0.3, h * 0.65, 14, 8);
    ctx.fillRect(w * 0.1, h * 0.65, 14, 8);
    ctx.strokeRect(-w * 0.3, h * 0.65, 14, 8);
    ctx.strokeRect(w * 0.1, h * 0.65, 14, 8);
    ctx.restore();
  },

  // 4. MAKE IT RAIN COOKIES
  raining_cookies(ctx, e) {
    const r = e.width * 0.42;

    ctx.save();
    // Giant Golden Baked Cookie
    ctx.fillStyle = '#D35400';
    ctx.strokeStyle = '#2C3437';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Texture
    ctx.fillStyle = '#E67E22';
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.85, 0, Math.PI * 2);
    ctx.fill();

    // Melted Chocolate Chips
    const chips = [
      { x: -r * 0.45, y: -r * 0.35, s: 7 },
      { x: r * 0.35, y: -r * 0.4, s: 8 },
      { x: -r * 0.4, y: r * 0.35, s: 8 },
      { x: r * 0.4, y: r * 0.3, s: 9 },
      { x: -r * 0.1, y: -r * 0.5, s: 6 },
      { x: r * 0.1, y: r * 0.45, s: 7 }
    ];
    ctx.fillStyle = '#3E2723';
    chips.forEach(c => {
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.s, 0, Math.PI * 2);
      ctx.fill();
    });

    // Cute Munching Smile
    VisualRenderers._drawCuteFace(ctx, 0, 0, 11, e.blinkTimer);

    // Comic Bite Mark on top right
    ctx.fillStyle = '#0B0D13'; // Matches dark engine background
    ctx.beginPath();
    ctx.arc(r * 0.85, -r * 0.65, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  },

  // 5. MAKE MY CHAIR MARRY A DINOSAUR
  chair_dinosaur_wedding(ctx, e) {
    const w = e.width * 0.5;
    const h = e.height * 0.5;

    ctx.save();
    // --- THE BRIDE: CHAIR WITH VEIL ---
    ctx.save();
    ctx.translate(-w * 0.45, 0);

    // White Lace Bridal Veil
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.strokeStyle = '#2C3437';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-16, -h * 0.7);
    ctx.lineTo(16, -h * 0.7);
    ctx.lineTo(24, h * 0.3);
    ctx.lineTo(-24, h * 0.3);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Wooden School Chair
    ctx.fillStyle = '#D35400';
    ctx.strokeStyle = '#2C3437';
    ctx.lineWidth = 3;
    // Chair Back
    ctx.fillRect(-14, -h * 0.6, 28, 30);
    ctx.strokeRect(-14, -h * 0.6, 28, 30);
    // Chair Seat
    ctx.fillRect(-18, -h * 0.1, 36, 12);
    ctx.strokeRect(-18, -h * 0.1, 36, 12);
    // Chair Legs
    ctx.fillRect(-16, 2, 6, 36);
    ctx.fillRect(10, 2, 6, 36);
    ctx.strokeRect(-16, 2, 6, 36);
    ctx.strokeRect(10, 2, 6, 36);

    // Bride Tiara / Pink Ribbon
    ctx.fillStyle = '#FF4081';
    ctx.fillRect(-10, -h * 0.65, 20, 5);

    // Cute Blushing Face on the chair back
    VisualRenderers._drawCuteFace(ctx, 0, -h * 0.35, 7, e.blinkTimer);
    ctx.restore();

    // --- THE GROOM: DINOSAUR IN TUXEDO ---
    ctx.save();
    ctx.translate(w * 0.45, 0);

    // Dino Body (Green)
    ctx.fillStyle = '#2ECC71';
    ctx.strokeStyle = '#2C3437';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(0, h * 0.05, 22, 28, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Dino Head
    ctx.beginPath();
    ctx.ellipse(8, -h * 0.35, 18, 14, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Black Groom Top Hat
    ctx.fillStyle = '#1A1E24';
    ctx.fillRect(-2, -h * 0.72, 20, 18);
    ctx.strokeRect(-2, -h * 0.72, 20, 18);
    ctx.fillRect(-8, -h * 0.54, 32, 5);
    ctx.strokeRect(-8, -h * 0.54, 32, 5);

    // Black Bowtie
    ctx.fillStyle = '#1A1E24';
    ctx.beginPath();
    ctx.moveTo(2, -h * 0.15);
    ctx.lineTo(12, -h * 0.22);
    ctx.lineTo(12, -h * 0.08);
    ctx.closePath();
    ctx.moveTo(2, -h * 0.15);
    ctx.lineTo(-8, -h * 0.22);
    ctx.lineTo(-8, -h * 0.08);
    ctx.closePath();
    ctx.fill();

    // Flower Bouquet
    ctx.fillStyle = '#E91E63';
    ctx.beginPath();
    ctx.arc(-10, h * 0.1, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Groom Smiling Eye
    ctx.fillStyle = '#2C3437';
    ctx.beginPath();
    ctx.arc(14, -h * 0.38, 3.5, 0, Math.PI * 2);
    ctx.fill();

    // Pink Cheeks
    ctx.fillStyle = '#FF80AB';
    ctx.beginPath();
    ctx.arc(6, -h * 0.28, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // Floating Wedding Heart between them
    ctx.fillStyle = '#FF2E93';
    ctx.font = '24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('💖', 0, -h * 0.2);
    ctx.restore();
  },

  // 6. HUG A CLOUD
  huggable_cloud(ctx, e) {
    const w = e.width * 0.5;
    const h = e.height * 0.35;

    ctx.save();
    // Super Plush Cloud Body
    ctx.fillStyle = '#E1F5FE';
    ctx.strokeStyle = '#2C3437';
    ctx.lineWidth = 3.5;

    ctx.beginPath();
    ctx.arc(-w * 0.5, h * 0.1, h * 0.8, 0, Math.PI * 2);
    ctx.arc(-w * 0.15, -h * 0.5, h * 0.95, 0, Math.PI * 2);
    ctx.arc(w * 0.35, -h * 0.3, h * 0.85, 0, Math.PI * 2);
    ctx.arc(w * 0.55, h * 0.15, h * 0.7, 0, Math.PI * 2);
    ctx.rect(-w * 0.5, -h * 0.1, w * 1.05, h * 0.95);
    ctx.fill();
    ctx.stroke();

    // Cute Blushing Pink Cheeks
    ctx.fillStyle = '#FF80AB';
    ctx.beginPath();
    ctx.arc(-22, 6, 8, 0, Math.PI * 2);
    ctx.arc(22, 6, 8, 0, Math.PI * 2);
    ctx.fill();

    // Big Hugging Arms
    ctx.strokeStyle = '#2C3437';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.arc(-w * 0.65, 0, 18, 0.4, Math.PI * 0.85, true);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(w * 0.65, 0, 18, Math.PI * 0.6, 2.7);
    ctx.stroke();

    // Happy Cute Face
    VisualRenderers._drawCuteFace(ctx, 0, 0, 11, e.blinkTimer);
    ctx.restore();
  },

  // 7. EAT THE MOON / THE MOON
  eat_the_moon(ctx, e) {
    VisualRenderers.moon(ctx, e);

    // Floating Cute Child Astronaut with Space Spoon!
    const r = e.width * 0.45;
    ctx.save();
    const astroX = r * 1.12;
    const astroY = -r * 0.32 + Math.sin((e.blinkTimer || 0) * 2.5) * 8;
    ctx.translate(astroX, astroY);

    // Astronaut White Suit
    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;
    // Body
    ctx.beginPath();
    ctx.ellipse(0, 16, 14, 16, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Cute Helmet
    ctx.beginPath();
    ctx.arc(0, -6, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Cyan Reflective Visor with Face
    ctx.fillStyle = '#38BDF8';
    ctx.beginPath();
    ctx.ellipse(0, -6, 14, 11, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#0284C7';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Cheerful Smile inside visor
    ctx.fillStyle = '#0F172A';
    ctx.beginPath();
    ctx.arc(0, -4, 5, 0, Math.PI);
    ctx.stroke();
    // Eyes
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(-5, -8, 2, 0, Math.PI * 2);
    ctx.arc(5, -8, 2, 0, Math.PI * 2);
    ctx.fill();

    // Holding Big Golden Spoon
    ctx.fillStyle = '#FBBF24';
    ctx.beginPath();
    ctx.ellipse(-14, 2, 8, 5, 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-14, 2);
    ctx.lineTo(-24, 12);
    ctx.stroke();

    // Cheerful Floating Speech / Crumb
    ctx.fillStyle = '#FDE047';
    ctx.font = 'bold 11px monospace';
    ctx.fillText('YUM! ★', -12, -28);

    ctx.restore();
  },

  moon(ctx, e) {
    const r = e.width * 0.45;

    ctx.save();
    // Glowing Lunar Halo
    const grad = ctx.createRadialGradient(0, 0, r * 0.6, 0, 0, r * 1.35);
    grad.addColorStop(0, 'rgba(255, 249, 210, 0.6)');
    grad.addColorStop(1, 'rgba(255, 249, 210, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, 0, r * 1.35, 0, Math.PI * 2);
    ctx.fill();

    // Moon Body (Soft Golden Cream)
    ctx.fillStyle = '#FFF3B0';
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 3.5;
    ctx.strokeStyle = '#2C3437';
    ctx.stroke();

    // Lunar Craters
    ctx.fillStyle = '#F5DE7A';
    const craters = [
      { x: -r * 0.45, y: -r * 0.3, s: 12 },
      { x: r * 0.48, y: -r * 0.25, s: 9 },
      { x: -r * 0.35, y: r * 0.45, s: 15 },
      { x: r * 0.38, y: r * 0.4, s: 11 }
    ];
    craters.forEach(c => {
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.s, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(44, 52, 55, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    // If request was "eat the moon" -> show comic bite marks!
    if (e.archetype === 'eat_the_moon' || (e.bitesCount && e.bitesCount > 0)) {
      ctx.fillStyle = '#0E0926'; // Deep space background cut
      ctx.beginPath();
      ctx.arc(r * 0.95, -r * 0.5, 26, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#2C3437';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Cheese crumbs
      ctx.fillStyle = '#FFE100';
      ctx.fillRect(r * 0.9, -r * 0.35, 4, 4);
      ctx.fillRect(r * 0.8, -r * 0.25, 3, 3);
      ctx.fillRect(r * 1.05, -r * 0.4, 5, 5);

      // Cute Little Band-aid on the Moon
      ctx.fillStyle = '#FB923C';
      ctx.fillRect(r * 0.65, -r * 0.6, 26, 12);
      ctx.strokeStyle = '#9A3412';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(r * 0.65, -r * 0.6, 26, 12);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(r * 0.74, -r * 0.58, 8, 8);
    }

    // Gentle Moon Face
    VisualRenderers._drawCuteFace(ctx, 0, 0, 12, e.blinkTimer);
    ctx.restore();
  },

  // 8. FRIENDLY DINOSAUR
  dinosaur(ctx, e) {
    const w = e.width;
    const h = e.height;

    ctx.save();
    const walkTilt = (e.walkCycle || 0) * 0.12;
    ctx.rotate(walkTilt);

    ctx.fillStyle = '#2ECC71';
    ctx.lineWidth = 3.5;
    ctx.strokeStyle = '#2C3437';

    // Tail
    ctx.beginPath();
    ctx.moveTo(-w * 0.2, h * 0.1);
    ctx.quadraticCurveTo(-w * 0.55, h * 0.25, -w * 0.5, h * 0.05);
    ctx.quadraticCurveTo(-w * 0.35, 0, -w * 0.1, -h * 0.05);
    ctx.fill();
    ctx.stroke();

    // Round Chubby Body
    ctx.beginPath();
    ctx.ellipse(0, h * 0.05, w * 0.3, h * 0.35, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Big Head & Snout
    ctx.beginPath();
    ctx.ellipse(w * 0.22, -h * 0.28, w * 0.22, h * 0.18, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Back Spikes
    ctx.fillStyle = '#F39C12';
    for (let i = 0; i < 4; i++) {
      const sx = -w * 0.18 + i * 14;
      const sy = -h * 0.24 + Math.abs(i - 1.5) * 6;
      ctx.beginPath();
      ctx.moveTo(sx - 6, sy);
      ctx.lineTo(sx, sy - 12);
      ctx.lineTo(sx + 6, sy);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    // Tiny Dino Arms
    ctx.fillStyle = '#27AE60';
    ctx.beginPath();
    ctx.ellipse(w * 0.14, -h * 0.04, 9, 5, 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Big Eye
    ctx.fillStyle = '#2C3437';
    ctx.beginPath();
    ctx.arc(w * 0.28, -h * 0.32, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(w * 0.27, -h * 0.34, 2, 0, Math.PI * 2);
    ctx.fill();

    // Smile
    ctx.strokeStyle = '#2C3437';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(w * 0.32, -h * 0.22, 8, 0.1, Math.PI * 0.7);
    ctx.stroke();

    // Feet
    ctx.fillStyle = '#27AE60';
    ctx.fillRect(-w * 0.15, h * 0.35, 16, 12);
    ctx.fillRect(w * 0.05, h * 0.35, 16, 12);
    ctx.strokeRect(-w * 0.15, h * 0.35, 16, 12);
    ctx.strokeRect(w * 0.05, h * 0.35, 16, 12);
    ctx.restore();
  },

  // 9. THE CLOUD
  cloud(ctx, e) {
    VisualRenderers.huggable_cloud(ctx, e);
  },

  // 10. TOUCHABLE RAINBOW
  rainbow(ctx, e) {
    const r = e.width * 0.45;
    const colors = ['#FF5964', '#FB5607', '#FFBC42', '#38B000', '#35A7FF', '#4361EE', '#9B5DE5'];
    const bandWidth = 7;

    ctx.save();
    colors.forEach((col, idx) => {
      ctx.strokeStyle = col;
      ctx.lineWidth = bandWidth;
      ctx.beginPath();
      ctx.arc(0, r * 0.4, r - idx * bandWidth, Math.PI, 0, false);
      ctx.stroke();
    });

    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = '#2C3437';
    ctx.lineWidth = 3;
    [-r + 14, r - 14].forEach(cx => {
      ctx.beginPath();
      ctx.arc(cx, r * 0.4, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });

    VisualRenderers._drawCuteFace(ctx, 0, r * 0.1, 9, e.blinkTimer);
    ctx.restore();
  },

  // 11. GIANT CHARACTER
  giant_character(ctx, e) {
    const w = e.width;
    const h = e.height;

    ctx.save();
    // Huge Denim Jeans Legs extending up off screen
    ctx.fillStyle = '#2563EB';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 4;
    ctx.fillRect(-w * 0.35, -h * 0.8, w * 0.3, h * 1.1);
    ctx.fillRect(w * 0.05, -h * 0.8, w * 0.3, h * 1.1);
    ctx.strokeRect(-w * 0.35, -h * 0.8, w * 0.3, h * 1.1);
    ctx.strokeRect(w * 0.05, -h * 0.8, w * 0.3, h * 1.1);

    // Belt / Stitch Details
    ctx.strokeStyle = '#FBBF24';
    ctx.lineWidth = 2.5;
    ctx.setLineDash([6, 4]);
    ctx.strokeRect(-w * 0.33, -h * 0.78, w * 0.26, h * 1.05);
    ctx.strokeRect(w * 0.07, -h * 0.78, w * 0.26, h * 1.05);
    ctx.setLineDash([]);

    // Big Red Boots with Soles and Yellow Laces
    ctx.fillStyle = '#DC2626';
    ctx.fillRect(-w * 0.45, h * 0.3, w * 0.4, h * 0.22);
    ctx.fillRect(w * 0.05, h * 0.3, w * 0.4, h * 0.22);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 4;
    ctx.strokeRect(-w * 0.45, h * 0.3, w * 0.4, h * 0.22);
    ctx.strokeRect(w * 0.05, h * 0.3, w * 0.4, h * 0.22);

    // Boot Soles
    ctx.fillStyle = '#1E293B';
    ctx.fillRect(-w * 0.47, h * 0.5, w * 0.43, 9);
    ctx.fillRect(w * 0.03, h * 0.5, w * 0.43, 9);
    ctx.strokeRect(-w * 0.47, h * 0.5, w * 0.43, 9);
    ctx.strokeRect(w * 0.03, h * 0.5, w * 0.43, 9);

    // Yellow Laces
    ctx.strokeStyle = '#FBBF24';
    ctx.lineWidth = 3;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(-w * 0.35, h * 0.34 + i * 8);
      ctx.lineTo(-w * 0.15, h * 0.34 + i * 8);
      ctx.moveTo(w * 0.15, h * 0.34 + i * 8);
      ctx.lineTo(w * 0.35, h * 0.34 + i * 8);
      ctx.stroke();
    }

    // Stomping Ground Shockwave Rings
    ctx.strokeStyle = 'rgba(255, 225, 0, 0.7)';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.ellipse(0, h * 0.52, w * 0.65, 14, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Funny tiny speech bubble from city: "WHOA HE'S HUGE!"
    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(-55, h * 0.14, 110, 24, 6);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 10px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('🏢 GIANT ALERT! 🚨', 0, h * 0.14 + 16);

    ctx.restore();
  },

  // 12. TINY FLYING ELEPHANT
  flying_elephant(ctx, e) {
    const w = e.width * 0.5;
    const h = e.height * 0.5;

    ctx.save();
    ctx.fillStyle = '#BDC3C7';
    ctx.strokeStyle = '#2C3437';
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.ellipse(0, 0, w * 0.55, h * 0.45, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Flapping Giant Ear
    ctx.save();
    const wingFlap = Math.sin(e.wingTimer || 0) * 0.45;
    ctx.translate(-w * 0.1, -h * 0.1);
    ctx.rotate(wingFlap);
    ctx.fillStyle = '#E8DAEF';
    ctx.beginPath();
    ctx.ellipse(-w * 0.3, 0, w * 0.45, h * 0.4, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // Curly Trunk
    ctx.fillStyle = '#BDC3C7';
    ctx.beginPath();
    ctx.moveTo(w * 0.4, 0);
    ctx.quadraticCurveTo(w * 0.8, -h * 0.1, w * 0.7, -h * 0.35);
    ctx.quadraticCurveTo(w * 0.55, -h * 0.3, w * 0.45, -h * 0.15);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Cute Eye
    ctx.fillStyle = '#2C3437';
    ctx.beginPath();
    ctx.arc(w * 0.25, -h * 0.12, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  },

  // 13. POCKET SUN
  pocket_sun(ctx, e) {
    const r = e.width * 0.38;

    ctx.save();
    ctx.fillStyle = '#F39C12';
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2 + (e.pulseTimer || 0) * 0.5;
      const x1 = Math.cos(angle) * (r * 1.05);
      const y1 = Math.sin(angle) * (r * 1.05);
      const x2 = Math.cos(angle) * (r * 1.38);
      const y2 = Math.sin(angle) * (r * 1.38);
      ctx.lineWidth = 5;
      ctx.strokeStyle = '#F39C12';
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    ctx.fillStyle = '#FFD166';
    ctx.strokeStyle = '#2C3437';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#1A1E24';
    ctx.fillRect(-r * 0.65, -r * 0.25, r * 0.55, r * 0.35);
    ctx.fillRect(r * 0.1, -r * 0.25, r * 0.55, r * 0.35);

    ctx.strokeStyle = '#2C3437';
    ctx.beginPath();
    ctx.arc(0, r * 0.25, r * 0.3, 0.2, Math.PI - 0.2);
    ctx.stroke();
    ctx.restore();
  },

  // 14. GIANT DOG BIGGER THAN A HOUSE
  giant_dog(ctx, e) {
    const w = e.width * 0.5;
    const h = e.height * 0.5;

    ctx.save();
    // Colossal Dog Head & Body
    ctx.fillStyle = '#F59E0B'; // Golden retriever
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.ellipse(0, -h * 0.1, w * 0.7, h * 0.65, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Floppy Ears
    ctx.fillStyle = '#D97706';
    ctx.beginPath();
    ctx.ellipse(-w * 0.65, -h * 0.1, 18, 38, -0.2, 0, Math.PI * 2);
    ctx.ellipse(w * 0.65, -h * 0.1, 18, 38, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Snout & Nose
    ctx.fillStyle = '#FDE68A';
    ctx.beginPath();
    ctx.ellipse(0, h * 0.15, 24, 18, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(0, h * 0.08, 9, 0, Math.PI * 2);
    ctx.fill();

    // Happy Tongue
    ctx.fillStyle = '#FF2E93';
    ctx.beginPath();
    ctx.arc(0, h * 0.28, 12, 0, Math.PI);
    ctx.fill();
    ctx.stroke();

    // Eyes
    VisualRenderers._drawCuteFace(ctx, 0, -h * 0.18, 11, e.blinkTimer);

    // Tiny Dollhouse below paws
    ctx.fillStyle = '#EF4444'; // Red roof
    ctx.fillRect(-18, h * 0.55, 36, 26);
    ctx.strokeRect(-18, h * 0.55, 36, 26);
    ctx.fillStyle = '#FEF08A'; // Yellow door
    ctx.fillRect(-6, h * 0.68, 12, 13);
    ctx.restore();
  },

  // 15. ZERO GRAVITY DRIFT
  zero_gravity(ctx, e) {
    const t = e.floatTimer || 0;
    ctx.save();
    // Floating Alarm Clock
    ctx.fillStyle = '#EF4444';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(-40 + Math.sin(t) * 10, -20 + Math.cos(t) * 10, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Floating Notebook
    ctx.fillStyle = '#38BDF8';
    ctx.fillRect(20 + Math.cos(t) * 12, -30 + Math.sin(t) * 12, 32, 40);
    ctx.strokeRect(20 + Math.cos(t) * 12, -30 + Math.sin(t) * 12, 32, 40);

    // Floating Apple
    ctx.fillStyle = '#22C55E';
    ctx.beginPath();
    ctx.arc(0 + Math.sin(t * 1.5) * 15, 35 + Math.cos(t * 1.5) * 15, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  },

  // 16. SPOON VS DINOSAUR DUEL
  spoon_dinosaur_duel(ctx, e) {
    const w = e.width * 0.5;
    const h = e.height * 0.5;
    ctx.save();
    // Valiant Silver Teaspoon with knight helmet
    ctx.save();
    ctx.translate(-w * 0.45, 0);
    ctx.fillStyle = '#E2E8F0';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 3;
    // Spoon bowl
    ctx.beginPath();
    ctx.ellipse(0, -20, 16, 24, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    // Spoon handle
    ctx.fillRect(-3, 4, 6, 44);
    ctx.strokeRect(-3, 4, 6, 44);
    // Toothpick Sword
    ctx.strokeStyle = '#FFD600';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(12, 0);
    ctx.lineTo(34, -18);
    ctx.stroke();
    VisualRenderers._drawCuteFace(ctx, 0, -20, 6, e.blinkTimer);
    ctx.restore();

    // T-Rex parrying
    ctx.save();
    ctx.translate(w * 0.4, 0);
    VisualRenderers.dinosaur(ctx, e);
    ctx.restore();
    ctx.restore();
  },

  // 17. DRINK THE OCEAN
  drink_ocean(ctx, e) {
    const w = e.width * 0.5;
    const h = e.height * 0.5;
    ctx.save();
    // Giant Red/White Striped Drinking Straw
    ctx.strokeStyle = '#EF4444';
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(-w * 0.6, -h * 0.8);
    ctx.lineTo(0, h * 0.2);
    ctx.stroke();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 10;
    ctx.setLineDash([12, 12]);
    ctx.beginPath();
    ctx.moveTo(-w * 0.6, -h * 0.8);
    ctx.lineTo(0, h * 0.2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Fish wearing sunglasses!
    ctx.fillStyle = '#F97316';
    ctx.beginPath();
    ctx.ellipse(20, h * 0.4, 18, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#000'; // sunglasses
    ctx.fillRect(16, h * 0.35, 12, 6);
    ctx.restore();
  },

  // 18. LIVING CRAYON DRAWING
  living_drawing(ctx, e) {
    if (e.drawingStrokes && e.drawingStrokes.length > 0) {
      ctx.save();
      e.drawingStrokes.forEach(stroke => {
        if (!stroke.points || stroke.points.length < 2) return;
        ctx.strokeStyle = stroke.color || '#2C3437';
        ctx.lineWidth = stroke.size || 8;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(stroke.points[0].x - e.drawOffsetX, stroke.points[0].y - e.drawOffsetY);
        for (let i = 1; i < stroke.points.length; i++) {
          ctx.lineTo(stroke.points[i].x - e.drawOffsetX, stroke.points[i].y - e.drawOffsetY);
        }
        ctx.stroke();
      });

      VisualRenderers._drawGooglyEyes(ctx, 0, -e.height * 0.1, 14, e);
      ctx.restore();
    } else {
      VisualRenderers.procedural(ctx, e);
    }
  },

  // 15. RICH PROCEDURAL ENTITY SYNTHESIZER
  procedural(ctx, e) {
    const w = e.width * 0.45;
    const h = e.height * 0.45;

    ctx.save();
    ctx.fillStyle = e.color || '#FF7675';
    ctx.strokeStyle = '#2C3437';
    ctx.lineWidth = 3.5;

    ctx.beginPath();
    ctx.roundRect(-w, -h, w * 2, h * 2, 22);
    ctx.fill();
    ctx.stroke();

    // Belly
    ctx.fillStyle = e.secondaryColor || '#FAB1A0';
    ctx.beginPath();
    ctx.ellipse(0, h * 0.25, w * 0.65, h * 0.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Face
    VisualRenderers._drawCuteFace(ctx, 0, -h * 0.15, 11, e.blinkTimer);

    // Label
    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2.5;
    ctx.font = 'bold 13px "Rubik", sans-serif';
    ctx.textAlign = 'center';
    ctx.strokeText(e.label || 'Magic Thing', 0, h + 20);
    ctx.fillText(e.label || 'Magic Thing', 0, h + 20);
    ctx.restore();
  },

  _drawCuteFace(ctx, x, y, size = 10, blinkTimer = 0) {
    const isBlinking = (blinkTimer % 4.0) > 3.85;

    ctx.fillStyle = '#2C3437';
    ctx.strokeStyle = '#2C3437';
    ctx.lineWidth = 2.5;

    if (isBlinking) {
      ctx.beginPath();
      ctx.arc(x - size * 1.3, y, size * 0.7, 0.1, Math.PI - 0.1);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x + size * 1.3, y, size * 0.7, 0.1, Math.PI - 0.1);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x - size * 1.3, y, size * 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x + size * 1.3, y, size * 0.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(x - size * 1.4, y - size * 0.18, size * 0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x + size * 1.2, y - size * 0.18, size * 0.2, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.beginPath();
    ctx.arc(x, y + size * 0.7, size * 0.6, 0.1, Math.PI - 0.1);
    ctx.stroke();
  },

  _drawGooglyEyes(ctx, x, y, size = 14, entity) {
    const eyeSpacing = size * 1.6;

    [-eyeSpacing, eyeSpacing].forEach(offsetX => {
      ctx.fillStyle = '#FFFFFF';
      ctx.strokeStyle = '#2C3437';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(x + offsetX, y, size, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      const pupilOffset = Math.sin((entity.floatTimer || 0) * 2) * 3;
      ctx.fillStyle = '#2C3437';
      ctx.beginPath();
      ctx.arc(x + offsetX + pupilOffset, y + 2, size * 0.45, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(x + offsetX + pupilOffset - 2, y, size * 0.15, 0, Math.PI * 2);
      ctx.fill();
    });
  }
};

window.VisualRenderers = VisualRenderers;
