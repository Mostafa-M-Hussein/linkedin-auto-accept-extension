let stats = { processed: 0, accepted: 0, rejected: 0 };

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'startAutoAccept') {
    startAutoAccept();
    sendResponse({ success: true });
  }
});

async function startAutoAccept() {
  const settings = await chrome.storage.local.get(['enableFilter', 'includeKeywords', 'excludeKeywords', 'minConnections', 'autoScroll']);

  const includeKeywords = (settings.includeKeywords || '').split(',').map(k => k.trim().toLowerCase()).filter(k => k);
  const excludeKeywords = (settings.excludeKeywords || '').split(',').map(k => k.trim().toLowerCase()).filter(k => k);
  const minConnections = settings.minConnections || 0;
  const shouldAutoScroll = settings.autoScroll !== false;

  notifyPopup('Starting process...', 'info');

  if (shouldAutoScroll) {
    notifyPopup('Scrolling to load all invitations...', 'info');
    const mainElement = document.querySelector('main') || document.body;
    for (let i = 0; i < 25; i++) {
      mainElement.scrollTop = mainElement.scrollHeight;
      await sleep(400);
    }
    mainElement.scrollTop = 0;
    await sleep(1000);
  }

  await processAllInvitations(settings.enableFilter !== false, includeKeywords, excludeKeywords, minConnections);
}

async function processAllInvitations(enableFilter, includeKeywords, excludeKeywords, minConnections) {
  let continueProcessing = true;

  while (continueProcessing) {
    const invitationCards = Array.from(document.querySelectorAll('[data-test-id="invitation-card"]'));

    if (invitationCards.length === 0) {
      notifyPopup('✅ All invitations processed!', 'success');
      await updateStats();
      continueProcessing = false;
      break;
    }

    for (const card of invitationCards) {
      const profileText = card.innerText.toLowerCase();
      const acceptBtn = card.querySelector('button[aria-label*="Accept"]');

      if (!acceptBtn) continue;

      stats.processed++;

      let shouldAccept = true;

      if (enableFilter) {
        if (includeKeywords.length > 0) {
          shouldAccept = includeKeywords.some(keyword => profileText.includes(keyword));
        }

        if (shouldAccept && excludeKeywords.length > 0) {
          shouldAccept = !excludeKeywords.some(keyword => profileText.includes(keyword));
        }

        if (shouldAccept && minConnections > 0) {
          const connectionMatch = profileText.match(/(\d+)\s+mutual\s+connections/i);
          const mutualConnections = connectionMatch ? parseInt(connectionMatch[1]) : 0;
          shouldAccept = mutualConnections >= minConnections;
        }
      }

      if (shouldAccept) {
        acceptBtn.click();
        stats.accepted++;
        notifyPopup(`Accepted: ${stats.accepted}`, 'info');
      } else {
        stats.rejected++;
      }

      await updateStats();
      await sleep(700);
    }

    await sleep(2000);
  }
}

async function updateStats() {
  await chrome.storage.local.set(stats);
  chrome.runtime.sendMessage({ type: 'updateStats', ...stats }).catch(() => {});
}

function notifyPopup(message, level = 'info') {
  chrome.runtime.sendMessage({ type: 'status', message, level }).catch(() => {});
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
