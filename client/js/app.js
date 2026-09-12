/**
 * ENIKK INNALE THINNANAM
 * Where Goo Goo Gaa Comes to Life.
 * 
 * Main Application Orchestrator (Figma Dashboard Synchronized)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Engines
  const realityEngine = new RealityEngine('reality-canvas');
  const uiConsole = new UIConsole();
  const drawingEngine = new DrawingEngine('drawing-pad', realityEngine, uiConsole);

  // 2. DOM Elements
  const form = document.getElementById('reality-form');
  const input = document.getElementById('reality-input');
  const btnMakeReal = document.getElementById('btn-make-real');
  const btnClearReality = document.getElementById('btn-clear-reality');
  const btnMusicToggle = document.getElementById('btn-music-toggle');
  const btnSoundToggle = document.getElementById('btn-sound-toggle');
  const btnAbout = document.getElementById('btn-about');
  const btnCloseAbout = document.getElementById('btn-close-about');
  const btnBackToPlay = document.getElementById('btn-back-to-play');
  const aboutModal = document.getElementById('about-modal');
  const classicsCloud = document.getElementById('classics-cloud');
  const btnOpenDrawingHeader = document.getElementById('btn-open-drawing-header');
  const brandHomeBtn = document.getElementById('brand-home-btn');

  // Dashboard HUD elements
  const engineActivePrompt = document.getElementById('engine-active-prompt');
  const engineProcessingLabel = document.getElementById('engine-processing-label');
  const engineStatusBadgeText = document.getElementById('engine-status-badge-text');
  const statRealityStatus = document.getElementById('stat-reality-status');
  const statRealityIntegrity = document.getElementById('stat-reality-integrity');
  const statAbsurdity = document.getElementById('stat-absurdity');
  const timelineSteps = document.querySelectorAll('.timeline-step');
  const labLogList = document.getElementById('laboratory-log-list');

  // Metrics bars
  const barPhysicsStab = document.getElementById('bar-physics-stab');
  const valPhysicsStab = document.getElementById('val-physics-stab');
  const barLogicCoh = document.getElementById('bar-logic-coh');
  const valLogicCoh = document.getElementById('val-logic-coh');
  const barRealityInteg = document.getElementById('bar-reality-integ');
  const valRealityInteg = document.getElementById('val-reality-integ');
  const barAbsurdityLvl = document.getElementById('bar-absurdity-lvl');
  const valAbsurdityLvl = document.getElementById('val-absurdity-lvl');

  // 3. Childlike Impossible Requests Placeholder Carousel
  const placeholders = [
    'I want to be a giant',
    'I want to eat yesterday\'s biriyani',
    'I want to eat the moon',
    'I want a cloud in my room',
    'I want a dinosaur',
    'I want to touch a rainbow',
    'Turn my homework into pizza',
    'Make a penguin fly',
    'Make my chair marry a dinosaur',
    'I want the sun in my pocket'
  ];

  let placeholderIdx = 0;
  setInterval(() => {
    if (document.activeElement !== input && input.value.trim() === '') {
      placeholderIdx = (placeholderIdx + 1) % placeholders.length;
      input.setAttribute('placeholder', placeholders[placeholderIdx]);
    }
  }, 3500);

  // Animate Event Timeline sequentially
  async function animateTimeline() {
    for (let i = 0; i < timelineSteps.length; i++) {
      const step = timelineSteps[i];
      timelineSteps.forEach(s => s.classList.remove('step-active'));
      step.classList.add('step-active');
      window.soundEngine.playBureauType();
      await new Promise(r => setTimeout(r, 160));
      step.classList.remove('step-active');
      step.classList.add('step-done');
    }
  }

  // Update Metrics Dashboard with random playful values
  function updateMetricsDashboard(promptText) {
    const physicsVal = Math.floor(10 + Math.random() * 25);
    const logicVal = Math.floor(4 + Math.random() * 18);
    const integrityVal = Math.floor(30 + Math.random() * 35);
    const absurdityVal = Math.floor(88 + Math.random() * 12);

    valPhysicsStab.textContent = `${physicsVal}%`;
    barPhysicsStab.style.width = `${physicsVal}%`;

    valLogicCoh.textContent = `${logicVal}%`;
    barLogicCoh.style.width = `${logicVal}%`;

    valRealityInteg.textContent = `${integrityVal}%`;
    barRealityInteg.style.width = `${integrityVal}%`;
    statRealityIntegrity.textContent = `${integrityVal}%`;

    valAbsurdityLvl.textContent = `${absurdityVal}%`;
    barAbsurdityLvl.style.width = `${absurdityVal}%`;
    statAbsurdity.textContent = absurdityVal > 95 ? 'CRITICAL' : 'ELEVATED';

    // Add to Laboratory Log
    if (labLogList) {
      const newEntry = document.createElement('div');
      newEntry.className = 'log-entry';
      const badgeColors = ['badge-red', 'badge-orange', 'badge-yellow', 'badge-green', 'badge-blue'];
      const color = badgeColors[Math.floor(Math.random() * badgeColors.length)];
      newEntry.innerHTML = `
        <span class="log-badge ${color}">★</span>
        <span class="log-text">"${promptText.replace(/["]/g, '')}"</span>
      `;
      labLogList.insertBefore(newEntry, labLogList.firstChild);
      if (labLogList.children.length > 7) {
        labLogList.removeChild(labLogList.lastChild);
      }
    }
  }

  // Wire realityEngine onPhaseChange to Event Timeline
  realityEngine.onPhaseChange = (phaseIndex, phase) => {
    timelineSteps.forEach((s, idx) => {
      s.classList.remove('step-active');
      if (idx < phaseIndex - 1) {
        s.classList.add('step-done');
      } else if (idx === phaseIndex - 1) {
        s.classList.add('step-active');
      } else {
        s.classList.remove('step-done');
      }
    });
  };

  // 4. Request Submission Handler
  async function handleRealityRequest(promptText) {
    const text = (promptText || input.value || '').trim();
    if (!text) return;

    input.value = '';
    btnMakeReal.disabled = true;

    // Reset timeline visually
    timelineSteps.forEach(s => {
      s.classList.remove('step-active', 'step-done');
    });

    // Update Display HUD to processing
    engineProcessingLabel.textContent = 'PROCESSING REQUEST';
    engineActivePrompt.textContent = `"${text}"`;
    engineStatusBadgeText.textContent = 'ALTERING REALITY...';
    statRealityStatus.textContent = 'CRITICAL FLUTTER';
    statRealityStatus.className = 'term-val val-pink';

    // Scroll engine into view smoothly if user is at top
    const engineSection = document.querySelector('.reality-engine-section');
    if (engineSection) {
      engineSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    try {
      // Step 1: Send to Reality Bureau API
      const apiPromise = fetch('/api/alter-reality', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: text })
      }).then(r => r.json());

      // Concurrently run initial request timeline animation
      const [data] = await Promise.all([apiPromise, animateTimeline()]);

      // Step 2: Run Serious Bureaucratic Typewriter Modal Sequence
      await uiConsole.playBureauSequence(data.bureaucraticLog);

      // Cleanly clear previous scenario entities before starting new world
      realityEngine.clearEntities();

      // Trigger Cinematic Storyboard & Living Environment
      if (data.storyboard) {
        realityEngine.startStoryboard(data.storyboard, data.environment);
      } else {
        realityEngine.setEnvironment(data.environment);
      }

      // Step 3: Spawn Impossible Entity in Reality Sandbox
      realityEngine.addEntity({
        archetype: data.archetype,
        object: data.object || data.target,
        label: data.visualConfig ? data.visualConfig.label : (data.target || 'Impossible Thing'),
        size: data.size || 'normal',
        scale: data.scale || 'normal',
        color: data.visualConfig ? data.visualConfig.color : '#FF7675',
        secondaryColor: data.visualConfig ? data.visualConfig.secondaryColor : '#74B9FF',
        behaviors: data.behaviors || ['float', 'wobble', 'draggable']
      });

      // Update Dashboard & Metrics
      updateMetricsDashboard(text);
      engineProcessingLabel.textContent = 'REQUEST COMPLETED';
      engineStatusBadgeText.textContent = 'REALITY RESTORED. FOR NOW.';
      statRealityStatus.textContent = 'UNSTABLE (NORMAL)';
      statRealityStatus.className = 'term-val val-unstable';

      // Step 4: Show Harmless Side Effect Toast
      uiConsole.showSideEffectToast(data.completionSummary, data.sideEffect);

      // Step 5: Automatically generate and certify Scenario Snapshot Image
      setTimeout(() => {
        captureScenarioSnapshot(text);
      }, 450);

    } catch (err) {
      console.error('Reality error:', err);
      uiConsole.showSideEffectToast(
        'Reality alteration stabilized.',
        'Your imagination has exceeded standard physical budgets, but we accommodated it anyway.'
      );
      engineStatusBadgeText.textContent = 'REALITY RESTORED. FOR NOW.';
    } finally {
      btnMakeReal.disabled = false;
    }
  }

  // Form Submit Event
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    handleRealityRequest(input.value);
  });

  // Enter key in textarea triggers submit (Shift+Enter for newline)
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleRealityRequest(input.value);
    }
  });

  // Classics Pills Cloud Click Handler
  if (classicsCloud) {
    classicsCloud.addEventListener('click', (e) => {
      const pill = e.target.closest('.classic-pill');
      if (pill) {
        const prompt = pill.getAttribute('data-prompt');
        if (prompt) {
          window.soundEngine.playPop(1.1);
          handleRealityRequest(prompt);
        }
      }
    });
  }

  // Header Draw button & inline Draw button
  if (btnOpenDrawingHeader) {
    btnOpenDrawingHeader.addEventListener('click', () => {
      drawingEngine.open();
      window.soundEngine.playPop(1.1);
    });
  }

  // Clear / Reset Reality
  if (btnClearReality) {
    btnClearReality.addEventListener('click', () => {
      realityEngine.clearReality();
      uiConsole.showSideEffectToast('Reality reset.', 'All impossible things have returned to bedtime story archives.');
      engineActivePrompt.textContent = '"Reality is currently calm."';
    });
  }

  // Audio Toggles
  if (btnMusicToggle) {
    btnMusicToggle.addEventListener('click', () => {
      const isActive = window.soundEngine.toggleMusic();
      if (isActive) {
        btnMusicToggle.classList.add('active');
        btnMusicToggle.innerHTML = '<span>🎵 Music: ON</span>';
      } else {
        btnMusicToggle.classList.remove('active');
        btnMusicToggle.innerHTML = '<span>🎵 Music: OFF</span>';
      }
    });
  }

  if (btnSoundToggle) {
    btnSoundToggle.addEventListener('click', () => {
      const isEnabled = window.soundEngine.toggleSFX();
      if (isEnabled) {
        btnSoundToggle.classList.add('active');
        btnSoundToggle.innerHTML = '<span>🔔 SFX: ON</span>';
      } else {
        btnSoundToggle.classList.remove('active');
        btnSoundToggle.innerHTML = '<span>🔔 SFX: OFF</span>';
      }
    });
  }

  // -------------------------------------------------------------
  // REALITY SNAPSHOT & CERTIFIED STORYBOOK IMAGE GENERATOR
  // -------------------------------------------------------------
  let latestSnapshotUrl = null;
  let latestPromptText = 'Yesterday\'s Biriyani';

  function captureScenarioSnapshot(promptText) {
    latestPromptText = promptText || 'Altered Reality';
    latestSnapshotUrl = realityEngine.takeSnapshot();
    const hint = document.getElementById('snapshot-status-hint');
    if (hint) {
      hint.textContent = `★ Generated: "${latestPromptText}" • Certified by Reality Bureau`;
    }
    const polaroidImg = document.getElementById('polaroid-image');
    if (polaroidImg && latestSnapshotUrl) {
      polaroidImg.src = latestSnapshotUrl;
    }
  }

  const btnViewSnapshot = document.getElementById('btn-view-snapshot');
  const btnDownloadSnapshot = document.getElementById('btn-download-snapshot');
  const snapshotModal = document.getElementById('snapshot-modal');
  const btnCloseSnapshot = document.getElementById('btn-close-snapshot');
  const btnModalCloseSnapshot = document.getElementById('btn-modal-close-snapshot');
  const btnModalDownloadSnapshot = document.getElementById('btn-modal-download-snapshot');
  const polaroidTitle = document.getElementById('polaroid-title');
  const polaroidMeta = document.getElementById('polaroid-meta');

  function openSnapshotModal() {
    if (!latestSnapshotUrl) {
      captureScenarioSnapshot(latestPromptText);
    }
    if (polaroidTitle) polaroidTitle.textContent = `"${latestPromptText}"`;
    if (polaroidMeta) {
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      polaroidMeta.textContent = `REALITY BUREAU ARCHIVE • ${timeStr} • 100% AUTHENTIC`;
    }
    const polaroidImg = document.getElementById('polaroid-image');
    if (polaroidImg && latestSnapshotUrl) {
      polaroidImg.src = latestSnapshotUrl;
    }
    if (snapshotModal) {
      snapshotModal.classList.add('open');
      window.soundEngine.playPop(1.2);
    }
  }

  function closeSnapshotModal() {
    if (snapshotModal) {
      snapshotModal.classList.remove('open');
      window.soundEngine.playPop(0.9);
    }
  }

  function downloadSnapshot() {
    if (!latestSnapshotUrl) {
      captureScenarioSnapshot(latestPromptText);
    }
    if (!latestSnapshotUrl) return;

    const link = document.createElement('a');
    link.download = `reality-snapshot-${Date.now()}.png`;
    link.href = latestSnapshotUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.soundEngine.playPop(1.5);
  }

  if (btnViewSnapshot) btnViewSnapshot.addEventListener('click', openSnapshotModal);
  if (btnDownloadSnapshot) btnDownloadSnapshot.addEventListener('click', downloadSnapshot);
  if (btnModalDownloadSnapshot) btnModalDownloadSnapshot.addEventListener('click', downloadSnapshot);
  if (btnCloseSnapshot) btnCloseSnapshot.addEventListener('click', closeSnapshotModal);
  if (btnModalCloseSnapshot) btnModalCloseSnapshot.addEventListener('click', closeSnapshotModal);

  // About / Philosophy Modal
  const openAbout = () => {
    aboutModal.classList.add('open');
    window.soundEngine.playPop(1.1);
  };
  const closeAbout = () => {
    aboutModal.classList.remove('open');
    window.soundEngine.playPop(0.9);
  };

  const btnAboutHeader = document.getElementById('btn-about');
  if (btnAboutHeader) btnAboutHeader.addEventListener('click', openAbout);
  const floatingAboutBtn = document.getElementById('floating-about-btn');
  if (floatingAboutBtn) floatingAboutBtn.addEventListener('click', openAbout);
  if (btnCloseAbout) btnCloseAbout.addEventListener('click', closeAbout);
  if (btnBackToPlay) btnBackToPlay.addEventListener('click', closeAbout);

  if (brandHomeBtn) {
    brandHomeBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }



  // Unlock Audio context on first click
  const unlockAudio = () => {
    window.soundEngine.ensureAudio();
    window.removeEventListener('pointerdown', unlockAudio);
    window.removeEventListener('keydown', unlockAudio);
  };
  window.addEventListener('pointerdown', unlockAudio);
  window.addEventListener('keydown', unlockAudio);
});
