document.addEventListener('DOMContentLoaded', async () => {
  const startBtn = document.getElementById('startBtn');
  const resetBtn = document.getElementById('resetBtn');
  const enableFilter = document.getElementById('enableFilter');
  const filterSection = document.getElementById('filterSection');
  const statusDiv = document.getElementById('status');

  const settings = await chrome.storage.local.get(['enableFilter', 'includeKeywords', 'excludeKeywords', 'minConnections', 'autoScroll', 'processed', 'accepted', 'rejected']);

  document.getElementById('enableFilter').checked = settings.enableFilter !== false;
  document.getElementById('autoScroll').checked = settings.autoScroll !== false;
  document.getElementById('includeKeywords').value = settings.includeKeywords || '';
  document.getElementById('excludeKeywords').value = settings.excludeKeywords || '';
  document.getElementById('minConnections').value = settings.minConnections || 0;

  document.getElementById('processed').textContent = settings.processed || 0;
  document.getElementById('accepted').textContent = settings.accepted || 0;
  document.getElementById('rejected').textContent = settings.rejected || 0;

  enableFilter.addEventListener('change', (e) => {
    filterSection.style.opacity = e.target.checked ? '1' : '0.5';
    filterSection.style.pointerEvents = e.target.checked ? 'auto' : 'none';
  });

  filterSection.style.opacity = enableFilter.checked ? '1' : '0.5';
  filterSection.style.pointerEvents = enableFilter.checked ? 'auto' : 'none';

  document.getElementById('includeKeywords').addEventListener('change', async (e) => {
    await chrome.storage.local.set({ includeKeywords: e.target.value });
  });

  document.getElementById('excludeKeywords').addEventListener('change', async (e) => {
    await chrome.storage.local.set({ excludeKeywords: e.target.value });
  });

  document.getElementById('minConnections').addEventListener('change', async (e) => {
    await chrome.storage.local.set({ minConnections: parseInt(e.target.value) });
  });

  document.getElementById('autoScroll').addEventListener('change', async (e) => {
    await chrome.storage.local.set({ autoScroll: e.target.checked });
  });

  startBtn.addEventListener('click', async () => {
    await chrome.storage.local.set({
      enableFilter: enableFilter.checked,
      includeKeywords: document.getElementById('includeKeywords').value,
      excludeKeywords: document.getElementById('excludeKeywords').value,
      minConnections: parseInt(document.getElementById('minConnections').value),
      autoScroll: document.getElementById('autoScroll').checked
    });

    showStatus('Starting auto-accept process...', 'info');
    startBtn.disabled = true;

    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.tabs.sendMessage(tabs[0].id, { action: 'startAutoAccept' }, (response) => {
      if (chrome.runtime.lastError) {
        showStatus('Error: Not on LinkedIn invitation manager page', 'error');
        startBtn.disabled = false;
      }
    });
  });

  resetBtn.addEventListener('click', async () => {
    await chrome.storage.local.set({ processed: 0, accepted: 0, rejected: 0 });
    document.getElementById('processed').textContent = 0;
    document.getElementById('accepted').textContent = 0;
    document.getElementById('rejected').textContent = 0;
    showStatus('Statistics reset', 'success');
  });

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'updateStats') {
      document.getElementById('processed').textContent = request.processed;
      document.getElementById('accepted').textContent = request.accepted;
      document.getElementById('rejected').textContent = request.rejected;
    } else if (request.type === 'status') {
      showStatus(request.message, request.level);
    }
  });

  function showStatus(message, level = 'info') {
    statusDiv.textContent = message;
    statusDiv.className = `status active ${level}`;
    setTimeout(() => { statusDiv.classList.remove('active'); }, 4000);
  }
});
