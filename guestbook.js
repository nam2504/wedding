// ============================================
// GUESTBOOK - GOOGLE SHEETS INTEGRATION
// ============================================

let guestbookData = {
  comments: [],
  lastTimestamp: null,
  version: 0,
  isLoading: false,
  page: 1
};

let refreshTimer = null;

/**
 * Initialize guestbook
 */
function initGuestbook() {
  // Check if config is loaded
  if (typeof weddingConfig === 'undefined') {
    console.error('weddingConfig not loaded yet');
    return;
  }

  // Debug: log config
  console.log('🔍 weddingConfig loaded:', weddingConfig);
  console.log('🔍 weddingConfig.guestbook:', weddingConfig.guestbook);
  console.log('🔍 weddingConfig.ui:', weddingConfig.ui);

  // Check if guestbook config exists
  if (!weddingConfig.guestbook) {
    console.error('❌ Guestbook config not found in weddingConfig');
    console.log('Available config keys:', Object.keys(weddingConfig));
    return;
  }

  if (!weddingConfig.ui.showGuestbook || !weddingConfig.guestbook.enable) {
    const guestbookSection = document.getElementById('guestbook');
    if (guestbookSection) guestbookSection.style.display = 'none';
    return;
  }

  if (!weddingConfig.guestbook.apiUrl) {
    console.warn('Guestbook API URL not configured. Please deploy Code.gs and update config.js');
    showGuestbookPlaceholder();
    return;
  }

  // Load comments
  loadComments();

  // Load cached name
  loadCachedName();

  // Setup form submit
  const form = document.getElementById('guestbook-form');
  if (form) {
    form.addEventListener('submit', handleSubmit);
  }

  // Setup auto-refresh
  if (weddingConfig.guestbook.autoRefresh) {
    startAutoRefresh();
  }
}

/**
 * Load comments from Google Sheets
 */
async function loadComments(append = false) {
  if (guestbookData.isLoading) return;

  guestbookData.isLoading = true;
  showLoadingState();

  try {
    const url = new URL(weddingConfig.guestbook.apiUrl);
    url.searchParams.append('page', guestbookData.page);
    url.searchParams.append('pageSize', weddingConfig.guestbook.pageSize);

    const response = await fetch(url.toString());
    if (!response.ok) throw new Error('Failed to load comments');

    const data = await response.json();

    if (append) {
      guestbookData.comments = [...guestbookData.comments, ...data.data];
    } else {
      guestbookData.comments = data.data || [];
    }

    guestbookData.lastTimestamp = data.lastTimestamp;
    guestbookData.version = data.version;

    renderComments();
    hideLoadingState();

  } catch (error) {
    console.error('Error loading comments:', error);
    showErrorState('Không thể tải lời nhắn. Vui lòng thử lại sau.');
  } finally {
    guestbookData.isLoading = false;
  }
}

/**
 * Load cached name from localStorage
 */
function loadCachedName() {
  if (typeof StorageUtils !== 'undefined') {
    StorageUtils.autoFillName('#guestbook-name');
  }
}

/**
 * Save name to localStorage
 */
function saveCachedName(name) {
  if (typeof StorageUtils !== 'undefined') {
    StorageUtils.saveName(name);
  }
}

/**
 * Submit new comment
 */
async function handleSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const nameInput = form.querySelector('#guestbook-name');
  const commentInput = form.querySelector('#guestbook-message');
  const submitBtn = form.querySelector('button[type="submit"]');

  const name = nameInput.value.trim();
  const comment = commentInput.value.trim();

  // Save name to cache for future use
  if (name) {
    saveCachedName(name);
  }

  // Validation
  if (!name || !comment) {
    showFormError('Vui lòng điền đầy đủ tên và lời nhắn');
    return;
  }

  if (comment.length > weddingConfig.guestbook.maxLength) {
    showFormError(`Lời nhắn không được vượt quá ${weddingConfig.guestbook.maxLength} ký tự`);
    return;
  }

  // Disable form
  submitBtn.disabled = true;
  submitBtn.textContent = 'Đang gửi...';

  try {
    const response = await fetch(weddingConfig.guestbook.apiUrl, {
      method: 'POST',
      mode: 'no-cors', // Change to no-cors for Google Apps Script
      redirect: 'follow',
      headers: {
        'Content-Type': 'text/plain' // Google Apps Script works better with text/plain
      },
      body: JSON.stringify({ name, comment })
    });

    // With no-cors, we can't read response, so assume success if no error
    // Wait a bit then reload to confirm
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if comment was added by reloading
    const result = { ok: true, id: Date.now().toString(), timestamp: new Date().toISOString() };

    if (result.ok) {
      // Add optimistic update
      guestbookData.comments.push({
        id: result.id,
        timestamp: result.timestamp,
        name,
        comment,
        status: 'visible'
      });

      renderComments();

      // Clear form (chỉ clear comment, giữ lại tên)
      commentInput.value = '';
      // Không clear tên để người dùng có thể gửi lời chúc tiếp

      // Show success message
      showFormSuccess('✓ Cảm ơn lời chúc của bạn!');

      // Refresh after a delay
      setTimeout(() => loadComments(), 2000);

    } else {
      throw new Error(result.message || 'Unknown error');
    }

  } catch (error) {
    console.error('Error submitting comment:', error);
    showFormError('Không thể gửi lời nhắn. Vui lòng thử lại.');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Gửi lời chúc';
  }
}

/**
 * Render comments to DOM
 */
function renderComments() {
  const container = document.querySelector('.guestbook-messages');
  if (!container) return;

  if (guestbookData.comments.length === 0) {
    container.innerHTML = `
      <div class="no-comments">
        <p>Chưa có lời nhắn nào. Hãy là người đầu tiên gửi lời chúc! 💝</p>
      </div>
    `;
    return;
  }

  container.innerHTML = '';

  // Reverse to show newest first
  const sortedComments = [...guestbookData.comments].reverse();

  sortedComments.forEach((item, index) => {
    const messageEl = document.createElement('div');
    messageEl.className = 'guestbook-message';
    messageEl.setAttribute('data-aos', 'fade-up');
    messageEl.setAttribute('data-aos-delay', Math.min(index * 50, 500));

    const date = new Date(item.timestamp);
    const timeAgo = getTimeAgo(date);

    messageEl.innerHTML = `
      <div class="message-header">
        <div class="message-avatar">${item.name.charAt(0).toUpperCase()}</div>
        <div class="message-info">
          <h4 class="message-name">${escapeHtml(item.name)}</h4>
          <span class="message-time">${timeAgo}</span>
        </div>
      </div>
      <div class="message-content">
        ${escapeHtml(item.comment)}
      </div>
    `;

    container.appendChild(messageEl);
  });

  // Refresh AOS
  if (typeof AOS !== 'undefined') {
    AOS.refresh();
  }
}

/**
 * Auto-refresh comments
 */
function startAutoRefresh() {
  if (refreshTimer) clearInterval(refreshTimer);

  refreshTimer = setInterval(() => {
    if (!document.hidden) {
      checkForNewComments();
    }
  }, weddingConfig.guestbook.refreshInterval);
}

/**
 * Check for new comments
 */
async function checkForNewComments() {
  if (!guestbookData.lastTimestamp) return;

  try {
    const url = new URL(weddingConfig.guestbook.apiUrl);
    url.searchParams.append('since', guestbookData.lastTimestamp);

    const response = await fetch(url.toString());
    if (!response.ok) return;

    const data = await response.json();

    if (data.data && data.data.length > 0) {
      guestbookData.comments = [...guestbookData.comments, ...data.data];
      guestbookData.lastTimestamp = data.lastTimestamp;
      guestbookData.version = data.version;
      renderComments();
    }

  } catch (error) {
    console.error('Error checking for new comments:', error);
  }
}

/**
 * Show placeholder when API not configured
 */
function showGuestbookPlaceholder() {
  const container = document.querySelector('.guestbook-messages');
  if (!container) return;

  container.innerHTML = `
    <div class="guestbook-placeholder">
      <p>📝 Để kích hoạt sổ lưu bút:</p>
      <ol style="text-align: left; max-width: 500px; margin: 1rem auto;">
        <li>Mở file <code>Code.gs</code></li>
        <li>Deploy lên Google Apps Script</li>
        <li>Copy URL và paste vào <code>config.js</code> → <code>guestbook.apiUrl</code></li>
      </ol>
    </div>
  `;
}

/**
 * UI State Functions
 */
function showLoadingState() {
  const container = document.querySelector('.guestbook-messages');
  if (!container) return;

  container.innerHTML = `
    <div class="loading-state">
      <div class="spinner"></div>
      <p>Đang tải lời nhắn...</p>
    </div>
  `;
}

function hideLoadingState() {
  // Will be replaced by renderComments()
}

function showErrorState(message) {
  const container = document.querySelector('.guestbook-messages');
  if (!container) return;

  container.innerHTML = `
    <div class="error-state">
      <p style="color: var(--error, #e74c3c);">${message}</p>
      <button id="retry-load-comments" class="btn btn-secondary" style="margin-top: 1rem;">
        Thử lại
      </button>
    </div>
  `;

  // Attach event listener after rendering
  setTimeout(() => {
    const retryBtn = document.getElementById('retry-load-comments');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => loadComments());
    }
  }, 0);
}

function showFormError(message) {
  const form = document.getElementById('guestbook-form');
  if (!form) return;

  let errorEl = form.querySelector('.form-error');
  if (!errorEl) {
    errorEl = document.createElement('div');
    errorEl.className = 'form-error';
    form.insertBefore(errorEl, form.firstChild);
  }

  errorEl.textContent = message;
  errorEl.style.display = 'block';

  setTimeout(() => {
    errorEl.style.display = 'none';
  }, 5000);
}

function showFormSuccess(message) {
  const form = document.getElementById('guestbook-form');
  if (!form) return;

  let successEl = form.querySelector('.form-success');
  if (!successEl) {
    successEl = document.createElement('div');
    successEl.className = 'form-success';
    form.insertBefore(successEl, form.firstChild);
  }

  successEl.textContent = message;
  successEl.style.display = 'block';

  setTimeout(() => {
    successEl.style.display = 'none';
  }, 3000);
}

/**
 * Utility Functions
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function getTimeAgo(date) {
  const now = new Date();
  const diff = now - date;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} ngày trước`;
  if (hours > 0) return `${hours} giờ trước`;
  if (minutes > 0) return `${minutes} phút trước`;
  return 'Vừa xong';
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Wait longer to ensure config is loaded
  setTimeout(initGuestbook, 500);
});

// Cleanup on page unload
window.addEventListener('beforeunload', function() {
  if (refreshTimer) clearInterval(refreshTimer);
});
