/**
 * SOS BEACON- Web Audio Siren Synthesizer
 * Generates realistic emergency siren profiles client-side via native Web Audio API.
 * Profiles:
 *  - Police Wail
 *  - Air Raid
 *  - Pulsing Alarm
 *  - Hi-Lo European
 */

class SirenSynthesizer {
  constructor() {
    this.ctx = null;
    this.currentProfile = null;
    this.oscillator = null;
    this.modulator = null;
    this.gainNode = null;
    this.pulseInterval = null;
    this.hiloInterval = null;
    this.isPlaying = false;
    this.analyser = null;
    this.dataArray = null;
    this.animFrame = null;
    this.onStateChangeCallbacks = [];
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  subscribe(callback) {
    this.onStateChangeCallbacks.push(callback);
  }

  notify(state) {
    this.onStateChangeCallbacks.forEach(cb => cb(state));
  }

  stop() {
    if (this.pulseInterval) {
      clearInterval(this.pulseInterval);
      this.pulseInterval = null;
    }
    if (this.hiloInterval) {
      clearInterval(this.hiloInterval);
      this.hiloInterval = null;
    }
    if (this.oscillator) {
      try {
        this.oscillator.stop();
        this.oscillator.disconnect();
      } catch (e) { }
      this.oscillator = null;
    }
    if (this.modulator) {
      try {
        this.modulator.stop();
        this.modulator.disconnect();
      } catch (e) { }
      this.modulator = null;
    }
    if (this.gainNode) {
      try {
        this.gainNode.disconnect();
      } catch (e) { }
      this.gainNode = null;
    }
    if (this.animFrame) {
      cancelAnimationFrame(this.animFrame);
      this.animFrame = null;
    }

    this.isPlaying = false;
    const prev = this.currentProfile;
    this.currentProfile = null;
    this.notify({ isPlaying: false, activeProfile: null, prevProfile: prev });
  }

  play(profileKey) {
    this.init();

    // If already playing the same profile, toggle off
    if (this.isPlaying && this.currentProfile === profileKey) {
      this.stop();
      return;
    }

    // Stop any existing sound
    this.stop();

    const t = this.ctx.currentTime;
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0.001, t);
    // Safe volume
    this.gainNode.gain.exponentialRampToValueAtTime(0.22, t + 0.1);

    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 64;
    this.gainNode.connect(this.analyser);
    this.analyser.connect(this.ctx.destination);

    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);

    switch (profileKey) {
      case 'police':
        this._playPoliceWail(t);
        break;
      case 'airraid':
        this._playAirRaid(t);
        break;
      case 'pulsing':
        this._playPulsing(t);
        break;
      case 'hilo':
        this._playHiLo(t);
        break;
      default:
        this.stop();
        return;
    }

    this.isPlaying = true;
    this.currentProfile = profileKey;
    this.notify({ isPlaying: true, activeProfile: profileKey });
    this._startVisualizer();
  }

  _playPoliceWail(t) {
    this.oscillator = this.ctx.createOscillator();
    this.oscillator.type = 'sawtooth';

    // Frequency modulator for smooth pitch sweep (650Hz to 1350Hz)
    this.modulator = this.ctx.createOscillator();
    this.modulator.type = 'sine';
    this.modulator.frequency.setValueAtTime(0.35, t); // ~3-second cycle

    const modGain = this.ctx.createGain();
    modGain.gain.setValueAtTime(350, t); // +/- 350 Hz sweep

    this.oscillator.frequency.setValueAtTime(950, t);
    this.modulator.connect(modGain);
    modGain.connect(this.oscillator.frequency);

    this.oscillator.connect(this.gainNode);
    this.modulator.start(t);
    this.oscillator.start(t);
  }

  _playAirRaid(t) {
    this.oscillator = this.ctx.createOscillator();
    this.oscillator.type = 'triangle';

    // Heavy slow siren sweep (380Hz to 780Hz)
    this.modulator = this.ctx.createOscillator();
    this.modulator.type = 'sine';
    this.modulator.frequency.setValueAtTime(0.18, t); // ~5-second slow cycle

    const modGain = this.ctx.createGain();
    modGain.gain.setValueAtTime(200, t);

    this.oscillator.frequency.setValueAtTime(560, t);
    this.modulator.connect(modGain);
    modGain.connect(this.oscillator.frequency);

    this.oscillator.connect(this.gainNode);
    this.modulator.start(t);
    this.oscillator.start(t);
  }

  _playPulsing(t) {
    this.oscillator = this.ctx.createOscillator();
    this.oscillator.type = 'square';
    this.oscillator.frequency.setValueAtTime(1100, t);
    this.oscillator.connect(this.gainNode);
    this.oscillator.start(t);

    let on = true;
    this.pulseInterval = setInterval(() => {
      if (!this.gainNode || !this.ctx) return;
      const now = this.ctx.currentTime;
      on = !on;
      this.gainNode.gain.cancelScheduledValues(now);
      this.gainNode.gain.setValueAtTime(on ? 0.22 : 0.001, now);
    }, 130);
  }

  _playHiLo(t) {
    this.oscillator = this.ctx.createOscillator();
    this.oscillator.type = 'sawtooth';
    this.oscillator.frequency.setValueAtTime(880, t);
    this.oscillator.connect(this.gainNode);
    this.oscillator.start(t);

    let high = true;
    this.hiloInterval = setInterval(() => {
      if (!this.oscillator || !this.ctx) return;
      const now = this.ctx.currentTime;
      high = !high;
      this.oscillator.frequency.setValueAtTime(high ? 880 : 660, now);
    }, 450);
  }

  _startVisualizer() {
    const update = () => {
      if (!this.isPlaying || !this.analyser) return;
      this.analyser.getByteFrequencyData(this.dataArray);
      let sum = 0;
      for (let i = 0; i < this.dataArray.length; i++) {
        sum += this.dataArray[i];
      }
      const avg = sum / this.dataArray.length;
      const waveElem = document.getElementById('sirenVisualizer');
      if (waveElem) {
        const bars = waveElem.querySelectorAll('.wave-bar');
        bars.forEach((bar, idx) => {
          const val = (this.dataArray[idx * 2] || avg) / 255;
          bar.style.transform = `scaleY(${Math.max(0.15, val * 1.5)})`;
        });
      }
      this.animFrame = requestAnimationFrame(update);
    };
    this.animFrame = requestAnimationFrame(update);
  }
}

window.sirenSynth = new SirenSynthesizer();
