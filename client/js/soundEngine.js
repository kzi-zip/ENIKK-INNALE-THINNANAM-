/**
 * CHILDHOOD SOUND SYNTHESIZER ENGINE
 * 
 * Uses 100% pure Web Audio API synthesis.
 * Zero external audio file dependencies.
 * Produces charming toy piano, music box lullaby, magic alteration sweeps,
 * rain droplets, pops, and gentle thuds.
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.sfxEnabled = true;
    this.musicEnabled = false;
    this.musicInterval = null;
    this.volume = 0.25;
    this.initAudioContext();
  }

  initAudioContext() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext && !this.ctx) {
      this.ctx = new AudioContext();
    }
  }

  ensureAudio() {
    if (!this.ctx) this.initAudioContext();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Toy Piano note (soft bell harmonic spectrum)
  playToyPiano(freq = 523.25, duration = 0.4) {
    if (!this.sfxEnabled) return;
    this.ensureAudio();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Fundamental (triangle) + subtle bell harmonic (sine at 3x)
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, t);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 3.01, t);

    gain.gain.setValueAtTime(this.volume * 0.45, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + duration);
    osc2.stop(t + duration);
  }

  // Magic Reality Alteration Shimmer (Crystalline ascending chime)
  playMagicChime() {
    if (!this.sfxEnabled) return;
    this.ensureAudio();
    if (!this.ctx) return;

    // Arpeggio notes: C5, E5, G5, B5, C6, E6
    const notes = [523.25, 659.25, 783.99, 987.77, 1046.50, 1318.51];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playToyPiano(freq, 0.6);
      }, idx * 75);
    });
  }

  // Soft Pop for clicks, bites, and interaction
  playPop(pitchModifier = 1.0) {
    if (!this.sfxEnabled) return;
    this.ensureAudio();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const startFreq = 420 * pitchModifier;
    osc.frequency.setValueAtTime(startFreq, t);
    osc.frequency.exponentialRampToValueAtTime(80, t + 0.08);

    gain.gain.setValueAtTime(this.volume * 0.4, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.08);
  }

  // Gentle Dino Stomp Thud
  playStomp() {
    if (!this.sfxEnabled) return;
    this.ensureAudio();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(110, t);
    osc.frequency.exponentialRampToValueAtTime(38, t + 0.18);

    gain.gain.setValueAtTime(this.volume * 0.5, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.2);
  }

  // Typewriter bleep for Serious Reality Bureau readout
  playBureauType() {
    if (!this.sfxEnabled) return;
    this.ensureAudio();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(750 + (Math.random() * 80 - 40), t);

    gain.gain.setValueAtTime(this.volume * 0.08, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.035);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.035);
  }

  // Official Stamp Thump
  playStamp() {
    if (!this.sfxEnabled) return;
    this.ensureAudio();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, t);
    osc.frequency.exponentialRampToValueAtTime(60, t + 0.15);

    gain.gain.setValueAtTime(this.volume * 0.6, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.18);
  }

  // Gentle Raindrop tap
  playRaindrop() {
    if (!this.sfxEnabled) return;
    this.ensureAudio();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    const freq = 1200 + Math.random() * 600;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.6, t + 0.04);

    gain.gain.setValueAtTime(this.volume * 0.09, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.04);
  }

  // Music Box Lullaby (Gentle 4-bar calming childhood progression)
  startMusicBox() {
    this.musicEnabled = true;
    this.ensureAudio();

    if (this.musicInterval) clearInterval(this.musicInterval);

    // Warm, peaceful pentatonic notes (Twinkle / Brahms lullaby vibe)
    const melody = [
      { note: 523.25, time: 0 },    // C5
      { note: 659.25, time: 500 },  // E5
      { note: 783.99, time: 1000 }, // G5
      { note: 659.25, time: 1500 }, // E5
      { note: 880.00, time: 2000 }, // A5
      { note: 783.99, time: 2500 }, // G5
      { note: 659.25, time: 3000 }, // E5
      { note: 587.33, time: 3500 }, // D5

      { note: 523.25, time: 4000 }, // C5
      { note: 659.25, time: 4500 }, // E5
      { note: 783.99, time: 5000 }, // G5
      { note: 1046.50, time: 5500 },// C6
      { note: 880.00, time: 6000 }, // A5
      { note: 783.99, time: 6500 }, // G5
      { note: 659.25, time: 7000 }, // E5
      { note: 523.25, time: 7500 }  // C5
    ];

    const loopLength = 8000;
    const playLoop = () => {
      if (!this.musicEnabled) return;
      melody.forEach(item => {
        setTimeout(() => {
          if (this.musicEnabled) {
            this.playToyPiano(item.note, 0.7);
          }
        }, item.time);
      });
    };

    playLoop();
    this.musicInterval = setInterval(playLoop, loopLength);
  }

  stopMusicBox() {
    this.musicEnabled = false;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }

  toggleMusic() {
    if (this.musicEnabled) {
      this.stopMusicBox();
      return false;
    } else {
      this.startMusicBox();
      return true;
    }
  }

  toggleSFX() {
    this.sfxEnabled = !this.sfxEnabled;
    return this.sfxEnabled;
  }
}

window.soundEngine = new SoundEngine();
