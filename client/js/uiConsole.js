/**
 * SERIOUS REALITY ALTERATION BUREAU & TOAST CONTROLLER
 * 
 * Manages the deadpan typewriter sequence and harmless side effect notifications.
 */

class UIConsole {
  constructor() {
    this.modal = document.getElementById('bureau-modal');
    this.terminal = document.getElementById('bureau-terminal');
    this.progressFill = document.getElementById('bureau-progress-fill');
    this.stampArea = document.getElementById('bureau-stamp-area');
    this.caseIdEl = document.getElementById('case-file-id');
    this.statusText = document.getElementById('bureau-status-text');

    // Toast elements
    this.toast = document.getElementById('side-effect-banner');
    this.toastSummary = document.getElementById('toast-summary');
    this.toastSideEffect = document.getElementById('toast-side-effect');
    this.toastSideText = document.getElementById('toast-side-text');
    this.toastClose = document.getElementById('toast-close-btn');

    this.bindEvents();
  }

  bindEvents() {
    if (this.toastClose) {
      this.toastClose.addEventListener('click', () => {
        this.hideSideEffectToast();
      });
    }
  }

  // Play the serious bureaucratic reality alteration sequence
  async playBureauSequence(logLines) {
    return new Promise(resolve => {
      this.modal.classList.add('open');
      this.terminal.innerHTML = '';
      this.progressFill.style.width = '0%';
      this.stampArea.classList.remove('stamped');
      this.statusText.textContent = 'ANALYZING CHILD LOGIC...';
      
      const caseNumber = Math.floor(1000 + Math.random() * 9000);
      this.caseIdEl.textContent = `CASE #${caseNumber}-OK`;

      let lineIdx = 0;
      const totalLines = logLines.length;

      const printNextLine = () => {
        if (lineIdx >= totalLines) {
          // Finished all lines, trigger stamp and close
          this.progressFill.style.width = '100%';
          this.statusText.textContent = 'DECISION FINALIZED: REALITY COMMITTED.';
          
          setTimeout(() => {
            this.stampArea.classList.add('stamped');
            window.soundEngine.playStamp();

            setTimeout(() => {
              this.modal.classList.remove('open');
              resolve();
            }, 600);
          }, 350);
          return;
        }

        const line = logLines[lineIdx];
        const lineEl = document.createElement('div');
        
        if (line.includes('DECISION: Okay.')) {
          lineEl.className = 'line-highlight';
        } else if (line.includes('PHYSICAL POSSIBILITY') || line.includes('TEMPORAL LOGIC')) {
          lineEl.className = 'line-warning';
        }

        this.terminal.appendChild(lineEl);
        window.soundEngine.playBureauType();

        // Type line characters
        let charIdx = 0;
        const typeChar = () => {
          if (charIdx < line.length) {
            lineEl.textContent += line[charIdx];
            charIdx++;
            setTimeout(typeChar, 12);
          } else {
            lineIdx++;
            const pct = Math.round((lineIdx / totalLines) * 90);
            this.progressFill.style.width = `${pct}%`;
            setTimeout(printNextLine, 140);
          }
        };

        typeChar();
      };

      printNextLine();
    });
  }

  // Show Harmless Side Effect Toast
  showSideEffectToast(summary, sideEffect) {
    if (!this.toast) return;

    this.toastSummary.textContent = summary || 'Reality alteration completed.';
    if (sideEffect) {
      this.toastSideEffect.style.display = 'block';
      this.toastSideText.textContent = sideEffect;
    } else {
      this.toastSideEffect.style.display = 'none';
    }

    this.toast.classList.add('show');

    // Auto-dismiss after 7 seconds
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.hideSideEffectToast();
    }, 7000);
  }

  hideSideEffectToast() {
    if (this.toast) {
      this.toast.classList.remove('show');
    }
  }
}

window.UIConsole = UIConsole;
