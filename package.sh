#!/bin/bash

# Script to package the Chrome extension for distribution

echo "📦 打包 XLS 下载管理器扩展..."
echo "📦 Packaging XLS Download Manager extension..."
echo ""

# Create a zip file excluding unnecessary files
zip -r StoreXlsDownload.zip \
  manifest.json \
  background.js \
  popup.html \
  popup.css \
  popup.js \
  icons/ \
  README.md \
  -x "*.git*" "*.DS_Store" "test.html" "INSTALLATION.md" "package.sh"

echo ""
if [ $? -eq 0 ]; then
  echo "✅ 打包成功！文件已保存为: StoreXlsDownload.zip"
  echo "✅ Package created successfully: StoreXlsDownload.zip"
  echo ""
  echo "您现在可以："
  echo "You can now:"
  echo "1. 将此 ZIP 文件分发给用户"
  echo "1. Distribute this ZIP file to users"
  echo "2. 上传到 Chrome Web Store"
  echo "2. Upload to Chrome Web Store"
else
  echo "❌ 打包失败"
  echo "❌ Packaging failed"
  exit 1
fi
