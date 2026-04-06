/**
 * Zero-asset Web Audio API synthesis engine for high-end UI sound design.
 * Generates tactile clicks, ticks, and pops purely through math.
 */

class UIAudio {
  private ctx: AudioContext | null = null;
  private initialized = false;
  private soundEnabled = true;

  init() {
    if (!this.initialized && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.initialized = true;
      }
    }
    // Resume context if browser suspended it due to autoplay policies
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleSound(force?: boolean) {
    this.soundEnabled = force !== undefined ? force : !this.soundEnabled;
    return this.soundEnabled;
  }

  // A crisp, subtle high-frequency glass "tick" for hover interactions
  playHoverTick() {
    if (!this.ctx || !this.soundEnabled || this.ctx.state !== 'running') return;
    
    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(this.ctx.destination);
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.05);
    
    // Fast attack and release for a tight click
    gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.04, this.ctx.currentTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.05);
    
    osc.start(this.ctx.currentTime);
    osc.stop(this.ctx.currentTime + 0.06);
  }

  // A deep, satisfying sub-bass "thud" for confirming clicks or opening modals
  playClickPop() {
    if (!this.ctx || !this.soundEnabled || this.ctx.state !== 'running') return;
    
    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(this.ctx.destination);
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(200, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.15);
    
    gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.15, this.ctx.currentTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
    
    osc.start(this.ctx.currentTime);
    osc.stop(this.ctx.currentTime + 0.16);
  }
}

export const uiAudio = new UIAudio();
