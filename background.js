chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setIcon({ path: 'icons/bulb-lit.svg' });
});

chrome.runtime.onStartup.addListener(() => {
  chrome.action.setIcon({ path: 'icons/bulb-lit.svg' });
});
