/**
 * SOS BEACON- Main Website Controller
 * Handles gallery tabs, mobile drawer, APK download modal,
 * siren audio controls, and interactive SOS simulator.
 */

// ============ CONFIGURATION ============
const CONFIG = {
  version: 'v1.2.0',
  releaseDate: 'September 2026',
  apkSize: '8.4 MB',
  apkFileName: 'SOS-Beacon-v1.2.0-release.apk',
  sha256: '9a7d8c4e5f6b1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b',
  githubUrl: 'https://github.com/dblary/SOS-BEACON-WEBSITE',
  downloadUrl: 'https://github.com/dblary/SOS-BEACON-WEBSITE/releases/latest/download/SOS-Beacon-release.apk'
};

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initGallery();
  initSirenConsole();
  initHelplineSelector();
  initDownloadModal();
  initSosSimulator();
  initFaqAccordion();
});

// ============ MOBILE NAVIGATION ============
function initMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const openBtn = document.getElementById('menuOpen');
  const closeBtn = document.getElementById('menuClose');
  if (!menu || !openBtn) return;

  const open = () => {
    menu.classList.add('open');
    menu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  };

  const close = () => {
    menu.classList.remove('open');
    menu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    openBtn.focus();
  };

  openBtn.addEventListener('click', open);
  if (closeBtn) closeBtn.addEventListener('click', close);
  menu.addEventListener('click', (e) => {
    if (e.target === menu) close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) close();
  });

  menu.querySelectorAll('.mobile-menu__panel a').forEach(a => {
    a.addEventListener('click', close);
  });
}

// ============ SCREENSHOT GALLERY ============
function initGallery() {
  const tabs = document.querySelectorAll('.gallery__tabs button');
  const descItems = document.querySelectorAll('.gallery__desc-item');
  const shot = document.getElementById('galleryShot');
  if (!tabs.length || !shot) return;

  function setActive(key, imgPath) {
    tabs.forEach(t => {
      const isMatch = t.getAttribute('data-tab') === key;
      t.classList.toggle('active', isMatch);
      t.setAttribute('aria-selected', isMatch ? 'true' : 'false');
    });

    descItems.forEach(d => {
      d.classList.toggle('active', d.getAttribute('data-desc') === key);
    });

    if (shot && imgPath) {
      shot.style.opacity = '0';
      setTimeout(() => {
        shot.src = imgPath;
        shot.style.opacity = '1';
      }, 140);
    }
  }

  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      setActive(btn.getAttribute('data-tab'), btn.getAttribute('data-img'));
    });
  });
}

// ============ SIREN SYNTHESIZER CONSOLE ============
function initSirenConsole() {
  const sirenBtns = document.querySelectorAll('.siren-card');
  const stopBtn = document.getElementById('stopAllSirens');
  const statusElem = document.getElementById('sirenStatusText');
  if (!sirenBtns.length) return;

  if (window.sirenSynth) {
    window.sirenSynth.subscribe(state => {
      sirenBtns.forEach(btn => {
        const isCurrent = btn.getAttribute('data-siren') === state.activeProfile;
        btn.classList.toggle('active', isCurrent);
        const iconWrap = btn.querySelector('.siren-icon-wrap');
        if (iconWrap) {
          iconWrap.classList.toggle('pulse', isCurrent);
        }
      });

      if (stopBtn) {
        stopBtn.disabled = !state.isPlaying;
      }

      if (statusElem) {
        if (state.isPlaying) {
          const names = {
            police: 'Police Wail Active (Sweeping 650–1350 Hz)',
            airraid: 'Air Raid Warning Active (Resonant 380–780 Hz)',
            pulsing: 'Pulsing Staccato Alarm Active (1100 Hz Bursts)',
            hilo: 'Hi-Lo European Tone Active (660 / 880 Hz)'
          };
          statusElem.textContent = names[state.activeProfile] || 'Siren Active';
          statusElem.classList.add('active');
        } else {
          statusElem.textContent = 'Audio Standby — Click any profile below to audition.';
          statusElem.classList.remove('active');
        }
      }
    });
  }

  sirenBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const profile = btn.getAttribute('data-siren');
      if (window.sirenSynth) {
        window.sirenSynth.play(profile);
      }
    });
  });

  if (stopBtn) {
    stopBtn.addEventListener('click', () => {
      if (window.sirenSynth) {
        window.sirenSynth.stop();
      }
    });
  }
}

// ============ GLOBAL HELPLINE SELECTOR ============
function initHelplineSelector() {
  const select = document.getElementById('countrySelect');
  const card = document.getElementById('helplineDisplayCard');
  if (!select || !card || !window.EMERGENCY_COUNTRIES) return;

  // Populate countries
  window.EMERGENCY_COUNTRIES.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.code;
    opt.textContent = `${c.flag} ${c.name}`;
    if (c.code === 'US') opt.selected = true;
    select.appendChild(opt);
  });

  function updateCard(code) {
    const country = window.EMERGENCY_COUNTRIES.find(c => c.code === code) || window.EMERGENCY_COUNTRIES[0];
    document.getElementById('hlUniversal').textContent = country.universal;
    document.getElementById('hlPolice').textContent = country.police;
    document.getElementById('hlMedical').textContent = country.medical;
    document.getElementById('hlFire').textContent = country.fire;
    document.getElementById('hlNotes').textContent = country.notes;
    document.getElementById('hlCountryName').textContent = `${country.flag} ${country.name}`;
  }

  select.addEventListener('change', (e) => {
    updateCard(e.target.value);
  });

  // Initial populate
  updateCard('US');
}

// ============ INTERACTIVE SOS SIMULATOR ============
function initSosSimulator() {
  const toggleBtn = document.getElementById('toggleSimBtn');
  const heroPhone = document.getElementById('heroPhone');
  const simView = document.getElementById('heroSimView');
  const shotView = document.getElementById('heroShotView');
  const sosBtn = document.getElementById('simSosTrigger');
  const resetBtn = document.getElementById('simResetTrigger');
  const simCountdown = document.getElementById('simCountdown');
  const simActiveCard = document.getElementById('simActiveCard');
  const simStandbyCard = document.getElementById('simStandbyCard');
  const simPulseRing = document.getElementById('simPulseRing');

  if (!toggleBtn || !simView || !shotView || !sosBtn) return;

  let isSimMode = false;
  let countdownTimer = null;
  let isTriggered = false;

  toggleBtn.addEventListener('click', () => {
    isSimMode = !isSimMode;
    toggleBtn.textContent = isSimMode ? 'View App Screenshot' : 'Try Live Simulator';
    toggleBtn.classList.toggle('active-mode', isSimMode);
    simView.style.display = isSimMode ? 'block' : 'none';
    shotView.style.display = isSimMode ? 'none' : 'block';
  });

  sosBtn.addEventListener('click', () => {
    if (isTriggered) return;

    // Start 3 second arming countdown
    let count = 3;
    sosBtn.classList.add('arming');
    if (simCountdown) {
      simCountdown.style.display = 'block';
      simCountdown.textContent = count;
    }

    countdownTimer = setInterval(() => {
      count--;
      if (count > 0) {
        if (simCountdown) simCountdown.textContent = count;
      } else {
        clearInterval(countdownTimer);
        isTriggered = true;
        sosBtn.classList.remove('arming');
        if (simCountdown) simCountdown.style.display = 'none';
        if (simStandbyCard) simStandbyCard.style.display = 'none';
        if (simActiveCard) simActiveCard.style.display = 'block';
        if (simPulseRing) simPulseRing.classList.add('emergency-active');

        // Optional quick audible confirmation
        if (window.sirenSynth) {
          window.sirenSynth.play('police');
        }
      }
    }, 800);
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (countdownTimer) clearInterval(countdownTimer);
      isTriggered = false;
      sosBtn.classList.remove('arming');
      if (simCountdown) simCountdown.style.display = 'none';
      if (simStandbyCard) simStandbyCard.style.display = 'block';
      if (simActiveCard) simActiveCard.style.display = 'none';
      if (simPulseRing) simPulseRing.classList.remove('emergency-active');
      if (window.sirenSynth) {
        window.sirenSynth.stop();
      }
    });
  }
}

// ============ APK DOWNLOAD & SIDELOADING MODAL ============
function initDownloadModal() {
  const modal = document.getElementById('downloadModal');
  const openBtns = document.querySelectorAll('.open-download-modal');
  const closeBtn = document.getElementById('closeDownloadModal');
  const copyBtn = document.getElementById('copyHashBtn');
  const hashVal = document.getElementById('sha256Value');
  const directDownloadBtn = document.getElementById('directApkDownload');

  if (!modal) return;

  if (hashVal) hashVal.textContent = CONFIG.sha256;
  if (directDownloadBtn) {
    directDownloadBtn.href = CONFIG.downloadUrl;
  }

  const open = (e) => {
    if (e) e.preventDefault();
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  };

  const close = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  openBtns.forEach(btn => btn.addEventListener('click', open));
  if (closeBtn) closeBtn.addEventListener('click', close);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) close();
  });

  if (copyBtn && hashVal) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(CONFIG.sha256).then(() => {
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = `
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          Copied!
        `;
        copyBtn.classList.add('copied');
        setTimeout(() => {
          copyBtn.innerHTML = originalText;
          copyBtn.classList.remove('copied');
        }, 2000);
      });
    });
  }
}

// ============ FAQ ACCORDION ============
function initFaqAccordion() {
  const detailsList = document.querySelectorAll('.faq details');
  detailsList.forEach(detail => {
    detail.addEventListener('toggle', () => {
      if (detail.open) {
        detailsList.forEach(other => {
          if (other !== detail && other.open) {
            other.removeAttribute('open');
          }
        });
      }
    });
  });
}
