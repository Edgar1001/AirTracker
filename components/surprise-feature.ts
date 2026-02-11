/**
 * Surprise Feature Configuration
 * 
 * This module contains all the configuration for the surprise/easter egg feature.
 * To disable the feature entirely, set SURPRISE_ENABLED to false.
 * To remove the feature completely, delete this file and search for 
 * "SURPRISE_FEATURE" comments in index.tsx to remove the related code.
 */

export const SURPRISE_ENABLED = true;

// Multiple surprise configurations
export const SURPRISE_CONFIGS = [
  {
    // First surprise
    triggerCode: '17081988',
    location: {
      lat: 60.235887,
      lon: 24.993528,
    },
    message: 'Psst come here!<br>Something waits for you...',
    icon: '🕵️',
    modalTitle: '🕵️ This is your only tip for now:',
    modalText: 'Come to this location',
    showCoords: true,
    scratchReveal: null,
  },
  {
    // Second surprise
    triggerCode: '11091990',
    location: {
      lat: 60.234228,
      lon: 25.007512,
    },
    message: 'Time to get back home!',
    icon: '🕵️',
    modalTitle: '🎉 You did very well so far!!',
    modalText: 'Once back, look under the TV closet to keep the game.',
    showCoords: false,
    scratchReveal: 'Fibonacci sequence',
  },
];

// Keep SURPRISE_CONFIG for backwards compatibility (first config)
export const SURPRISE_CONFIG = SURPRISE_CONFIGS[0];

// CSS styles for the surprise feature (injected into WebView)
export const SURPRISE_STYLES = `
  .surprise-icon {
    font-size: 36px;
    animation: pulse 1s ease-in-out infinite;
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
  }
  .surprise-popup .leaflet-popup-content-wrapper {
    background: linear-gradient(135deg, #ff6b6b, #f7c948, #4fd1c5, #a66cff);
    color: #0e1116;
    font-weight: bold;
    border: none;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  }
  .surprise-popup .leaflet-popup-content {
    margin: 8px 12px;
    font-size: 14px;
  }
  .surprise-popup .leaflet-popup-tip {
    background: #a66cff;
  }
  .surprise-tooltip-content {
    cursor: pointer;
    text-align: center;
  }
  .surprise-tooltip-content:active {
    transform: scale(0.95);
  }
  .surprise-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    animation: fadeIn 0.3s ease-out;
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .surprise-modal {
    background: linear-gradient(135deg, #1a1a2e, #16213e);
    border: 2px solid #4fd1c5;
    border-radius: 16px;
    padding: 24px 32px;
    width: 280px;
    max-width: 90%;
    text-align: center;
    box-shadow: 0 20px 60px rgba(79, 209, 197, 0.3);
    animation: slideUp 0.3s ease-out;
  }
  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  .surprise-modal-title {
    color: #f7c948;
    font-size: 18px;
    margin-bottom: 16px;
    text-shadow: 0 2px 10px rgba(247, 201, 72, 0.3);
  }
  .surprise-modal-coords {
    color: #4fd1c5;
    font-size: 16px;
    font-family: monospace;
    background: rgba(79, 209, 197, 0.1);
    padding: 12px 16px;
    border-radius: 8px;
    margin: 12px 0;
    border: 1px solid rgba(79, 209, 197, 0.3);
  }
  .scratch-container {
    position: relative;
    width: 220px;
    height: 50px;
    margin: 12px auto;
    border-radius: 8px;
    overflow: hidden;
    border: 2px solid #f7c948;
  }
  .scratch-reveal {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #4fd1c5, #a66cff);
    color: #0e1116;
    font-size: 14px;
    font-weight: bold;
    font-family: monospace;
  }
  .scratch-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: crosshair;
  }
  .scratch-hint {
    font-size: 11px;
    color: #888;
    margin-top: 4px;
  }
  .surprise-modal-buttons {
    display: flex;
    gap: 30px;
    justify-content: center;
    margin-top: 16px;
    flex-wrap: wrap;
  }
  .surprise-modal-close {
    background: linear-gradient(135deg, #ff6b6b, #a66cff);
    color: white;
    border: none;
    padding: 10px 24px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    margin: 0 10px;
  }
  .surprise-modal-close:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(166, 108, 255, 0.4);
  }
  .surprise-modal-help {
    background: linear-gradient(135deg, #4fd1c5, #38b2ac);
    color: white;
    border: none;
    padding: 10px 24px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    margin: 0 10px;
  }
  .surprise-modal-help:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(79, 209, 197, 0.4);
  }
  .pupi-icon {
    font-size: 36px;
    animation: wave 1s ease-in-out infinite;
  }
  @keyframes wave {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(15deg); }
    75% { transform: rotate(-15deg); }
  }
  .rating-container {
    margin: 16px 0;
  }
  .rating-buttons {
    display: flex;
    gap: 8px;
    justify-content: center;
    margin-top: 8px;
  }
  .rating-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid #4fd1c5;
    background: transparent;
    color: #4fd1c5;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;
  }
  .rating-btn:hover, .rating-btn.selected {
    background: #4fd1c5;
    color: #0e1116;
  }
  .final-code {
    color: #f7c948;
    font-size: 20px;
    font-family: monospace;
    margin-top: 12px;
    padding: 10px;
    background: rgba(247, 201, 72, 0.1);
    border-radius: 8px;
    border: 1px solid rgba(247, 201, 72, 0.3);
  }
`;

// JavaScript code for the surprise feature (injected into WebView)
export const SURPRISE_SCRIPTS = (icon: string) => `
  let surpriseMarker = null;
  let surprisePopup = null;
  let surpriseLat = null;
  let surpriseLon = null;
  let surpriseModalTitle = '';
  let surpriseModalText = '';
  let surpriseShowCoords = true;
  let surpriseScratchReveal = null;

  function initScratchCard() {
    const canvas = document.getElementById('scratch-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    // Draw scratch cover
    ctx.fillStyle = '#888888';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add "SCRATCH HERE" text
    ctx.fillStyle = '#555555';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SCRATCH HERE', canvas.width / 2, canvas.height / 2);
    
    let isDrawing = false;
    
    function scratch(x, y) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI * 2);
      ctx.fill();
    }
    
    function getPos(e) {
      const rect = canvas.getBoundingClientRect();
      if (e.touches) {
        return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
      }
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
    
    canvas.addEventListener('mousedown', (e) => { isDrawing = true; const pos = getPos(e); scratch(pos.x, pos.y); });
    canvas.addEventListener('mousemove', (e) => { if (isDrawing) { const pos = getPos(e); scratch(pos.x, pos.y); } });
    canvas.addEventListener('mouseup', () => { isDrawing = false; });
    canvas.addEventListener('mouseleave', () => { isDrawing = false; });
    
    canvas.addEventListener('touchstart', (e) => { e.preventDefault(); isDrawing = true; const pos = getPos(e); scratch(pos.x, pos.y); });
    canvas.addEventListener('touchmove', (e) => { e.preventDefault(); if (isDrawing) { const pos = getPos(e); scratch(pos.x, pos.y); } });
    canvas.addEventListener('touchend', () => { isDrawing = false; });
  }

  function showSurpriseModal() {
    if (document.getElementById('surprise-modal-overlay')) return;
    
    const overlay = document.createElement('div');
    overlay.id = 'surprise-modal-overlay';
    overlay.className = 'surprise-modal-overlay';
    
    let contentHtml = '';
    if (surpriseShowCoords) {
      contentHtml = '<div class="surprise-modal-coords">' + surpriseLat + ', ' + surpriseLon + '</div>';
    } else if (surpriseScratchReveal) {
      contentHtml = '<div style="color: #e0e0e0; margin: 12px 0; font-size: 13px;">To open the mysterious object you would need a code which will provide you the whole key-word to open it.<br><br>The first letter is A and is associated with digit 0.<br>Your only hint is right below.</div><div class="scratch-container"><div class="scratch-reveal">' + surpriseScratchReveal + '</div><canvas id="scratch-canvas" class="scratch-canvas"></canvas></div>';
    }
    
    const showHelpBtn = surpriseScratchReveal ? '<button class="surprise-modal-help" id="surprise-help-btn">Pupi, I need help</button>' : '';
    
    overlay.innerHTML = \`
      <div class="surprise-modal">
        <div class="surprise-modal-title">\${surpriseModalTitle}</div>
        <div style="color: #e0e0e0; margin-bottom: 8px;">\${surpriseModalText}</div>
        \${contentHtml}
        <div style="display: flex; flex-direction: row; justify-content: center; align-items: center; margin-top: 16px;">
          <button class="surprise-modal-close" id="surprise-close-btn" style="margin-right: 20px;">Got it!</button>
          \${showHelpBtn}
        </div>
      </div>
    \`;
    document.body.appendChild(overlay);
    
    // Add event listeners after adding to DOM
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeSurpriseModal();
    });
    document.getElementById('surprise-close-btn').addEventListener('click', closeSurpriseModal);
    
    const helpBtn = document.getElementById('surprise-help-btn');
    if (helpBtn) {
      helpBtn.addEventListener('click', showPupiHelp);
    }
    
    // Initialize scratch card if present
    if (surpriseScratchReveal) {
      setTimeout(initScratchCard, 100);
    }
  }

  function closeSurpriseModal() {
    const overlay = document.getElementById('surprise-modal-overlay');
    if (overlay) {
      overlay.remove();
    }
  }

  function goBackToSurprise() {
    // Remove pupi marker and popup
    if (pupiMarker) {
      map.removeLayer(pupiMarker);
      pupiMarker = null;
    }
    if (pupiPopup) {
      map.removeLayer(pupiPopup);
      pupiPopup = null;
    }
    // Go back to the surprise location (Time to get back home)
    if (surpriseLat && surpriseLon) {
      map.setView([surpriseLat, surpriseLon], 15, { animate: true });
    }
  }

  let pupiMarker = null;
  let pupiPopup = null;

  function showPupiHelp() {
    closeSurpriseModal();
    
    // Antarctica coordinates
    const pupiLat = -82.8628;
    const pupiLon = 135.0000;
    
    if (pupiMarker) {
      map.removeLayer(pupiMarker);
    }
    if (pupiPopup) {
      map.removeLayer(pupiPopup);
    }
    
    const pupiIcon = L.divIcon({
      className: '',
      html: '<div class="pupi-icon">🧑</div>',
      iconSize: [36, 36],
      iconAnchor: [18, 18]
    });
    
    pupiMarker = L.marker([pupiLat, pupiLon], { icon: pupiIcon }).addTo(map);
    
    const popupContent = '<div class="surprise-tooltip-content" onclick="showPupiModal()">Here I am to help you!</div>';
    pupiPopup = L.popup({
      closeButton: false,
      autoClose: false,
      closeOnEscapeKey: false,
      closeOnClick: false,
      className: 'surprise-popup',
      offset: [0, -10]
    })
    .setLatLng([pupiLat, pupiLon])
    .setContent(popupContent)
    .openOn(map);
    
    map.setView([pupiLat, pupiLon], 4, { animate: true });
  }

  function showPupiModal() {
    if (document.getElementById('surprise-modal-overlay')) return;
    
    const overlay = document.createElement('div');
    overlay.id = 'surprise-modal-overlay';
    overlay.className = 'surprise-modal-overlay';
    overlay.innerHTML = \`
      <div class="surprise-modal">
        <div class="surprise-modal-title">🧑 Pupi is here to help!</div>
        <div style="color: #e0e0e0; margin-bottom: 8px;">Here I am to help you!</div>
        <div class="rating-container">
          <div style="color: #e0e0e0; font-size: 13px;">Before giving it to you, you should rank your boyfriend's sense of humor from 0 to 5:</div>
          <div class="rating-buttons">
            <button class="rating-btn" data-rating="0">0</button>
            <button class="rating-btn" data-rating="1">1</button>
            <button class="rating-btn" data-rating="2">2</button>
            <button class="rating-btn" data-rating="3">3</button>
            <button class="rating-btn" data-rating="4">4</button>
            <button class="rating-btn" data-rating="5">5</button>
          </div>
          <div id="final-code-display"></div>
        </div>
        <div class="surprise-modal-buttons">
          <button class="surprise-modal-close" id="surprise-close-btn">Thanks Pupi!</button>
        </div>
      </div>
    \`;
    document.body.appendChild(overlay);
    
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeSurpriseModal();
    });
    document.getElementById('surprise-close-btn').addEventListener('click', () => {
      closeSurpriseModal();
      goBackToSurprise();
    });
    
    // Add rating button listeners
    const ratingBtns = document.querySelectorAll('.rating-btn');
    ratingBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        ratingBtns.forEach(b => b.classList.remove('selected'));
        e.target.classList.add('selected');
        const rating = e.target.getAttribute('data-rating');
        const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
        const lastLetter = letters[parseInt(rating)] || 'F';
        document.getElementById('final-code-display').innerHTML = '<div class="final-code">Complete code: <strong>ABBCD' + lastLetter + '</strong></div>';
      });
    });
  }

  function showSurprise(lat, lon, message, modalTitle, modalText, showCoords, scratchReveal) {
    if (surpriseMarker) {
      map.removeLayer(surpriseMarker);
    }
    if (surprisePopup) {
      map.removeLayer(surprisePopup);
    }
    // Also clear pupi if showing new surprise
    if (pupiMarker) {
      map.removeLayer(pupiMarker);
      pupiMarker = null;
    }
    if (pupiPopup) {
      map.removeLayer(pupiPopup);
      pupiPopup = null;
    }
    surpriseLat = lat;
    surpriseLon = lon;
    surpriseModalTitle = modalTitle || '🕵️ This is your only tip for now:';
    surpriseShowCoords = showCoords !== false;
    surpriseScratchReveal = scratchReveal || null;
    surpriseModalText = modalText || 'Come to this location';
    const markerIcon = L.divIcon({
      className: '',
      html: '<div class="surprise-icon">${icon}</div>',
      iconSize: [36, 36],
      iconAnchor: [18, 18]
    });
    surpriseMarker = L.marker([lat, lon], { icon: markerIcon }).addTo(map);
    
    // Create a custom clickable popup instead of tooltip
    const popupContent = '<div class="surprise-tooltip-content" onclick="showSurpriseModal()">' + message + '</div>';
    surprisePopup = L.popup({
      closeButton: false,
      autoClose: false,
      closeOnEscapeKey: false,
      closeOnClick: false,
      className: 'surprise-popup',
      offset: [0, -10]
    })
    .setLatLng([lat, lon])
    .setContent(popupContent)
    .openOn(map);
    
    map.setView([lat, lon], 15, { animate: true });
  }

  function hideSurprise() {
    if (surpriseMarker) {
      map.removeLayer(surpriseMarker);
      surpriseMarker = null;
    }
    if (surprisePopup) {
      map.removeLayer(surprisePopup);
      surprisePopup = null;
    }
    closeSurpriseModal();
  }
`;

// Message handler code for the surprise feature
export const SURPRISE_MESSAGE_HANDLERS = `
  if (data.type === 'surprise') showSurprise(data.lat, data.lon, data.message, data.modalTitle, data.modalText, data.showCoords, data.scratchReveal);
  if (data.type === 'hideSurprise') hideSurprise();
`;

/**
 * Helper function to find which surprise config matches the input
 */
export function findSurpriseConfig(input: string) {
  if (!SURPRISE_ENABLED) return null;
  return SURPRISE_CONFIGS.find(config => input.trim() === config.triggerCode) || null;
}

/**
 * Helper function to check if the input matches any surprise trigger code
 */
export function isSurpriseTrigger(input: string): boolean {
  return findSurpriseConfig(input) !== null;
}

/**
 * Get the surprise message payload to send to WebView for a specific config
 */
export function getSurprisePayload(input?: string) {
  const config = input ? findSurpriseConfig(input) : SURPRISE_CONFIG;
  if (!config) return null;
  return {
    type: 'surprise',
    lat: config.location.lat,
    lon: config.location.lon,
    message: config.message,
    modalTitle: config.modalTitle,
    modalText: config.modalText,
    showCoords: config.showCoords,
    scratchReveal: config.scratchReveal,
  };
}
