function setDarkModeIntensity(intensity) {
  const invertValue = intensity / 100;
  const style = document.getElementById('dark-reader-style');
  if (style) {
    style.textContent = `
      html { filter: invert(${invertValue}) hue-rotate(180deg) !important; }
      img, video, iframe, canvas, picture, svg image {
        filter: invert(${invertValue}) hue-rotate(180deg) !important;
      }
    `;
  } else {
    const el = document.createElement('style');
    el.id = 'dark-reader-style';
    el.textContent = `
      html { filter: invert(${invertValue}) hue-rotate(180deg) !important; }
      img, video, iframe, canvas, picture, svg image {
        filter: invert(${invertValue}) hue-rotate(180deg) !important;
      }
    `;
    document.head.appendChild(el);
  }
  return true;
}

function toggleDarkMode(intensity = 100) {
  const style = document.getElementById('dark-reader-style');
  if (style) {
    style.remove();
    return false;
  }
  const invertValue = intensity / 100;
  const el = document.createElement('style');
  el.id = 'dark-reader-style';
  el.textContent = `
    html { filter: invert(${invertValue}) hue-rotate(180deg) !important; }
    img, video, iframe, canvas, picture, svg image {
      filter: invert(${invertValue}) hue-rotate(180deg) !important;
    }
  `;
  document.head.appendChild(el);
  return true;
}

const btn = document.getElementById('toggle');
const slider = document.getElementById('intensity-slider');
const intensityDisplay = document.getElementById('intensity-display');
const intensityControl = document.getElementById('intensity-control');

function updateUI(isActive, intensity) {
  btn.textContent = isActive ? `Dark Mode: ON (${intensity}%)` : 'Dark Mode: OFF';
  if (isActive) {
    intensityControl.classList.remove('hidden');
    chrome.action.setIcon({ path: 'icons/bulb-dark.svg' });
  } else {
    intensityControl.classList.add('hidden');
    chrome.action.setIcon({ path: 'icons/bulb-lit.svg' });
  }
}

// Auto-enable dark mode when popup opens if it isn't already on
chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
  chrome.scripting.executeScript(
    { target: { tabId: tab.id }, func: () => !!document.getElementById('dark-reader-style') },
    ([{ result: isActive }]) => {
      if (!isActive) {
        const currentIntensity = parseInt(slider.value);
        chrome.scripting.executeScript(
          { target: { tabId: tab.id }, func: toggleDarkMode, args: [currentIntensity] },
          ([{ result }]) => updateUI(result, currentIntensity)
        );
      } else {
        updateUI(true, parseInt(slider.value));
      }
    }
  );
});

// Button click handler - manual toggle
btn.addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    const currentIntensity = parseInt(slider.value);
    chrome.scripting.executeScript(
      { target: { tabId: tab.id }, func: toggleDarkMode, args: [currentIntensity] },
      ([{ result }]) => updateUI(result, currentIntensity)
    );
  });
});

// Slider input handler - real-time intensity adjustment
slider.addEventListener('input', (e) => {
  const intensity = parseInt(e.target.value);
  intensityDisplay.textContent = `${intensity}%`;
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    chrome.scripting.executeScript(
      { target: { tabId: tab.id }, func: setDarkModeIntensity, args: [intensity] },
      ([{ result }]) => {
        if (result) btn.textContent = `Dark Mode: ON (${intensity}%)`;
      }
    );
  });
});
