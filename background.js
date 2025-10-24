// Background script to intercept XLS file downloads

// Listen for download events
chrome.downloads.onDeterminingFilename.addListener((downloadItem, suggest) => {
  // Check if the file is an XLS or XLSX file
  const filename = downloadItem.filename.toLowerCase();
  const isXlsFile = filename.endsWith('.xls') || 
                    filename.endsWith('.xlsx') || 
                    filename.endsWith('.xlsm') || 
                    filename.endsWith('.xlsb');
  
  if (isXlsFile) {
    console.log('XLS file detected:', downloadItem.filename);
    
    // Store information about the intercepted download
    storeDownloadInfo(downloadItem);
    
    // Allow the download to proceed normally
    suggest({ filename: downloadItem.filename });
  }
});

// Store download information in chrome.storage
async function storeDownloadInfo(downloadItem) {
  try {
    // Get existing stored downloads
    const result = await chrome.storage.local.get(['xlsDownloads']);
    const xlsDownloads = result.xlsDownloads || [];
    
    // Add new download info
    const downloadInfo = {
      id: downloadItem.id,
      filename: downloadItem.filename,
      url: downloadItem.url,
      fileSize: downloadItem.fileSize,
      mime: downloadItem.mime,
      startTime: downloadItem.startTime,
      timestamp: Date.now()
    };
    
    xlsDownloads.unshift(downloadInfo); // Add to beginning of array
    
    // Keep only the last 100 downloads
    if (xlsDownloads.length > 100) {
      xlsDownloads.splice(100);
    }
    
    // Save back to storage
    await chrome.storage.local.set({ xlsDownloads });
    
    console.log('Stored XLS download info:', downloadInfo);
    
    // Update badge to show number of stored files
    chrome.action.setBadgeText({ text: xlsDownloads.length.toString() });
    chrome.action.setBadgeBackgroundColor({ color: '#4CAF50' });
  } catch (error) {
    console.error('Error storing download info:', error);
  }
}

// Initialize badge on startup
chrome.runtime.onStartup.addListener(async () => {
  const result = await chrome.storage.local.get(['xlsDownloads']);
  const xlsDownloads = result.xlsDownloads || [];
  chrome.action.setBadgeText({ text: xlsDownloads.length.toString() });
  chrome.action.setBadgeBackgroundColor({ color: '#4CAF50' });
});

// Initialize badge on installation
chrome.runtime.onInstalled.addListener(async () => {
  const result = await chrome.storage.local.get(['xlsDownloads']);
  const xlsDownloads = result.xlsDownloads || [];
  chrome.action.setBadgeText({ text: xlsDownloads.length.toString() });
  chrome.action.setBadgeBackgroundColor({ color: '#4CAF50' });
});
