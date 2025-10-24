# 安装指南 / Installation Guide

## 中文安装说明

### 第一步：下载扩展
1. 下载此仓库的所有文件到本地
2. 或者使用 Git 克隆：
   ```bash
   git clone https://github.com/JimmyKodu/StoreXlsDownload.git
   ```

### 第二步：在 Chrome 中加载扩展
1. 打开 Chrome 浏览器
2. 在地址栏输入 `chrome://extensions/` 并按回车
3. 在页面右上角找到并启用"开发者模式"开关
4. 点击"加载已解压的扩展程序"按钮
5. 浏览并选择包含 `manifest.json` 文件的项目文件夹
6. 扩展程序图标会出现在浏览器工具栏中

### 第三步：测试扩展
1. 在浏览器中打开 `test.html` 文件
2. 点击测试链接下载 XLS 文件
3. 观察扩展图标上的徽章数字
4. 点击扩展图标查看下载记录

---

## English Installation Guide

### Step 1: Download the Extension
1. Download all files from this repository to your local machine
2. Or clone using Git:
   ```bash
   git clone https://github.com/JimmyKodu/StoreXlsDownload.git
   ```

### Step 2: Load in Chrome
1. Open Chrome browser
2. Navigate to `chrome://extensions/`
3. Enable "Developer mode" toggle in the top right corner
4. Click "Load unpacked" button
5. Browse and select the project folder containing `manifest.json`
6. The extension icon will appear in your browser toolbar

### Step 3: Test the Extension
1. Open the `test.html` file in your browser
2. Click the test links to download XLS files
3. Observe the badge number on the extension icon
4. Click the extension icon to view download records

---

## 常见问题 / FAQ

### Q: 扩展无法加载？
**A:** 请确保：
- 选择了正确的文件夹（包含 manifest.json）
- Chrome 版本支持 Manifest V3（建议使用最新版）
- 没有其他同名扩展冲突

### Q: Extension won't load?
**A:** Please ensure:
- You selected the correct folder (containing manifest.json)
- Your Chrome version supports Manifest V3 (latest version recommended)
- No conflicting extensions with the same name

### Q: 下载的文件没有被拦截？
**A:** 请检查：
- 扩展是否已启用
- 文件扩展名是否为 .xls, .xlsx, .xlsm 或 .xlsb
- 是否通过浏览器下载功能下载（而不是直接打开）

### Q: Downloads not being intercepted?
**A:** Please check:
- Extension is enabled
- File extension is .xls, .xlsx, .xlsm, or .xlsb
- Downloaded through browser (not opened directly)

---

## 功能截图 / Screenshots

### 弹出窗口界面
待添加实际截图...

### 下载记录列表
待添加实际截图...

---

## 卸载 / Uninstall

如需卸载扩展：
1. 访问 `chrome://extensions/`
2. 找到"XLS Download Manager"
3. 点击"移除"按钮

To uninstall:
1. Go to `chrome://extensions/`
2. Find "XLS Download Manager"
3. Click "Remove" button
