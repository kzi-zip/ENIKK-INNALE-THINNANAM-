/**
 * CRAYON DRAWING STUDIO & LIFE GIVER
 * 
 * Allows users to draw arbitrary doodles with crayon textures,
 * then packages the strokes and brings them to life in the Reality Sandbox.
 */

class DrawingEngine {
  constructor(canvasId, realityEngine, uiConsole) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.realityEngine = realityEngine;
    this.uiConsole = uiConsole;
    this.modal = document.getElementById('drawing-modal');

    this.currentColor = '#FF5964';
    this.currentSize = 14;
    this.isDrawing = false;
    this.strokes = [];
    this.currentStroke = null;

    this.initCanvas();
    this.bindEvents();
  }

  initCanvas() {
    this.canvas.width = 600;
    this.canvas.height = 420;
    this.clearPad();
  }

  clearPad() {
    this.strokes = [];
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  bindEvents() {
    // Open & Close Modal triggers
    const btnOpen = document.getElementById('btn-open-drawing');
    const btnClose = document.getElementById('btn-close-drawing');
    const btnClear = document.getElementById('btn-clear-drawing');
    const btnAnimate = document.getElementById('btn-animate-drawing');

    if (btnOpen) {
      btnOpen.addEventListener('click', () => {
        this.open();
        window.soundEngine.playPop(1.1);
      });
    }

    if (btnClose) {
      btnClose.addEventListener('click', () => {
        this.close();
        window.soundEngine.playPop(0.9);
      });
    }

    if (btnClear) {
      btnClear.addEventListener('click', () => {
        this.clearPad();
        window.soundEngine.playPop(0.7);
      });
    }

    if (btnAnimate) {
      btnAnimate.addEventListener('click', () => {
        this.makeDrawingReal();
      });
    }

    // Color Swatches
    const swatches = document.querySelectorAll('.swatch');
    swatches.forEach(swatch => {
      swatch.addEventListener('click', () => {
        swatches.forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
        const col = swatch.getAttribute('data-color');
        if (col === 'eraser') {
          this.currentColor = '#FFFFFF';
        } else {
          this.currentColor = col;
        }
        window.soundEngine.playPop(1.3);
      });
    });

    // Brush Sizes
    const sizeBtns = document.querySelectorAll('.size-btn');
    sizeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sizeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentSize = parseInt(btn.getAttribute('data-size'), 10);
        window.soundEngine.playPop(1.2);
      });
    });

    // Drawing Canvas pointer events
    const getPos = (evt) => {
      const rect = this.canvas.getBoundingClientRect();
      const scaleX = this.canvas.width / rect.width;
      const scaleY = this.canvas.height / rect.height;
      const clientX = evt.touches ? evt.touches[0].clientX : evt.clientX;
      const clientY = evt.touches ? evt.touches[0].clientY : evt.clientY;
      return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY
      };
    };

    const startDraw = (evt) => {
      this.isDrawing = true;
      const pos = getPos(evt);
      this.currentStroke = {
        color: this.currentColor,
        size: this.currentSize,
        points: [pos]
      };
      this.strokes.push(this.currentStroke);

      this.ctx.beginPath();
      this.ctx.moveTo(pos.x, pos.y);
      this.ctx.lineCap = 'round';
      this.ctx.lineJoin = 'round';
      this.ctx.strokeStyle = this.currentColor;
      this.ctx.lineWidth = this.currentSize;
    };

    const moveDraw = (evt) => {
      if (!this.isDrawing) return;
      const pos = getPos(evt);
      this.currentStroke.points.push(pos);
      this.ctx.lineTo(pos.x, pos.y);
      this.ctx.stroke();
    };

    const stopDraw = () => {
      this.isDrawing = false;
    };

    this.canvas.addEventListener('mousedown', startDraw);
    this.canvas.addEventListener('mousemove', moveDraw);
    window.addEventListener('mouseup', stopDraw);

    this.canvas.addEventListener('touchstart', (e) => { e.preventDefault(); startDraw(e); }, { passive: false });
    this.canvas.addEventListener('touchmove', (e) => { e.preventDefault(); moveDraw(e); }, { passive: false });
    window.addEventListener('touchend', stopDraw);
  }

  open() {
    this.modal.classList.add('open');
  }

  close() {
    this.modal.classList.remove('open');
  }

  // Transform drawing into a living reality entity!
  async makeDrawingReal() {
    if (this.strokes.length === 0) {
      alert('Draw something first with your crayons! ✨');
      return;
    }

    // Compute stroke bounding box and center
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    this.strokes.forEach(stroke => {
      stroke.points.forEach(pt => {
        if (pt.x < minX) minX = pt.x;
        if (pt.x > maxX) maxX = pt.x;
        if (pt.y < minY) minY = pt.y;
        if (pt.y > maxY) maxY = pt.y;
      });
    });

    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;
    const width = Math.max(80, maxX - minX);
    const height = Math.max(80, maxY - minY);

    this.close();

    // Initiate Serious Reality Bureau sequence
    const bureauLog = [
      'REQUEST RECEIVED',
      'ANALYZING CHILD LOGIC...',
      'OBJECT: HAND-DRAWN SKETCH',
      'ACTION: DETACH FROM PAPER AND WALK',
      'PHYSICAL POSSIBILITY: 0.00000%',
      'DECISION: Okay.',
      'INITIATING REALITY ALTERATION...'
    ];

    await this.uiConsole.playBureauSequence(bureauLog);

    // Add living drawing entity to reality engine
    this.realityEngine.addEntity({
      archetype: 'living_drawing',
      label: 'My Living Drawing',
      size: 'normal',
      drawingStrokes: JSON.parse(JSON.stringify(this.strokes)),
      drawOffsetX: centerX,
      drawOffsetY: centerY,
      width: width,
      height: height,
      behaviors: ['wobble', 'float', 'bounce', 'followCursor', 'draggable']
    });

    // Show completion toast
    this.uiConsole.showSideEffectToast(
      'Drawing successfully animated.',
      'Erasers are suddenly experiencing existential guilt.'
    );

    this.clearPad();
  }
}

window.DrawingEngine = DrawingEngine;
