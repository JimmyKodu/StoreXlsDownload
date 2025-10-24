// Popup script to display and manage XLS downloads

let allDownloads = [];

// Initialize popup
document.addEventListener('DOMContentLoaded', async () => {
  await loadDownloads();
  setupEventListeners();
});

// Load downloads from storage
async function loadDownloads() {
  try {
    const result = await chrome.storage.local.get(['xlsDownloads']);
    allDownloads = result.xlsDownloads || [];
    displayDownloads(allDownloads);
  } catch (error) {
    console.error('Error loading downloads:', error);
  }
}

// Display downloads in the UI
function displayDownloads(downloads) {
  const downloadsList = document.getElementById('downloadsList');
  const emptyState = document.getElementById('emptyState');
  const fileCount = document.getElementById('fileCount');
  
  // Update count
  fileCount.textContent = downloads.length;
  
  // Show/hide empty state
  if (downloads.length === 0) {
    downloadsList.innerHTML = '';
    emptyState.classList.add('show');
    return;
  }
  
  emptyState.classList.remove('show');
  
  // Generate HTML for downloads
  downloadsList.innerHTML = downloads.map((download, index) => {
    const date = new Date(download.timestamp);
    const dateStr = date.toLocaleString('zh-CN');
    const fileSize = formatFileSize(download.fileSize);
    
    return `
      <div class="download-item" data-index="${index}">
        <div class="download-item-header">
          <div class="download-filename">${escapeHtml(download.filename)}</div>
          <div class="download-actions">
            <button class="icon-btn open-btn" data-index="${index}" title="在新标签页中打开">
              🔗
            </button>
            <button class="icon-btn delete-btn" data-index="${index}" title="删除">
              🗑️
            </button>
          </div>
        </div>
        <div class="download-info">
          <div class="download-url" title="${escapeHtml(download.url)}">
            ${escapeHtml(download.url)}
          </div>
          <div class="download-meta">
            <span class="badge">${fileSize}</span>
            <span>${dateStr}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
  
  // Attach event listeners to buttons
  attachDownloadListeners();
}

// Attach event listeners to download item buttons
function attachDownloadListeners() {
  // Open buttons
  document.querySelectorAll('.open-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const index = parseInt(e.target.dataset.index);
      openDownload(index);
    });
  });
  
  // Delete buttons
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const index = parseInt(e.target.dataset.index);
      deleteDownload(index);
    });
  });
  
  // Click on item to open
  document.querySelectorAll('.download-item').forEach(item => {
    item.addEventListener('click', (e) => {
      if (!e.target.classList.contains('icon-btn')) {
        const index = parseInt(item.dataset.index);
        openDownload(index);
      }
    });
  });
}

// Setup event listeners
function setupEventListeners() {
  // Clear all button
  document.getElementById('clearAll').addEventListener('click', clearAllDownloads);
  
  // Search input
  document.getElementById('searchInput').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = allDownloads.filter(download => 
      download.filename.toLowerCase().includes(query) ||
      download.url.toLowerCase().includes(query)
    );
    displayDownloads(filtered);
  });
}

// Open download in new tab
function openDownload(index) {
  const download = allDownloads[index];
  if (download && download.url) {
    chrome.tabs.create({ url: download.url });
  }
}

// Delete a single download
async function deleteDownload(index) {
  if (confirm('确定要删除这个下载记录吗？')) {
    allDownloads.splice(index, 1);
    await chrome.storage.local.set({ xlsDownloads: allDownloads });
    displayDownloads(allDownloads);
    
    // Update badge
    chrome.action.setBadgeText({ text: allDownloads.length.toString() });
  }
}

// Clear all downloads
async function clearAllDownloads() {
  if (confirm('确定要清空所有下载记录吗？')) {
    allDownloads = [];
    await chrome.storage.local.set({ xlsDownloads: [] });
    displayDownloads(allDownloads);
    
    // Update badge
    chrome.action.setBadgeText({ text: '0' });
  }
}

// Format file size
function formatFileSize(bytes) {
  if (!bytes || bytes === 0) return '未知大小';
  
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;
  
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  
  return `${size.toFixed(2)} ${units[unitIndex]}`;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
