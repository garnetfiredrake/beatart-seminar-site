# BEATART Seminar Site - macOS 本地開發環境設定指南

此說明文件協助您在 MacBook (macOS) 電腦上建立本地開發環境。**請勿直接在 Google Drive 同步目錄內進行開發**，否則會造成大量的 CPU 消耗、同步鎖定錯誤，或原生套件平台不一致的衝突。

---

## 步驟 1：安裝與切換 Node.js 版本

本專案鎖定使用 **Node.js v20 (LTS)**。建議在 macOS 上使用 `nvm` 管理 Node 版本：

1. **安裝 NVM**：
   - 開啟終端機 (Terminal) 並安裝 [nvm](https://github.com/nvm-sh/nvm)：
     ```bash
     curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
     ```
   - 重新載入設定檔或重新開啟終端機。
2. **安裝並使用 Node 20**：
   - 在專案根目錄下，因為有 `.nvmrc` 檔案，您可以直接執行：
     ```bash
     nvm install
     nvm use
     ```
3. **確認安裝成功**：
   - 執行 `node -v`，確認輸出為 `v20.x.x`。

---

## 步驟 2：Clone 程式碼至本地硬碟

請將開發用的程式碼移至 macOS 本地磁碟（如家目錄下的 Dev 資料夾），切勿在 Google Drive 內直接進行開發。

1. **在本機建立開發目錄**：
   ```bash
   mkdir -p ~/Dev
   cd ~/Dev
   ```
2. **Clone 專案**：
   ```bash
   git clone <您的 Git 倉庫 URL> beatart-seminar-site
   cd beatart-seminar-site
   ```

---

## 步驟 3：安裝依賴與啟動

1. **安裝平台專屬套件**：
   - 使用 `npm run setup` 安裝 macOS 平台對應的原生編譯器（如 `esbuild` 的 macOS 版本）：
     ```bash
     npm run setup
     ```
2. **啟動開發伺服器**：
   - 專案已配置為自訂埠口 `5180`：
     ```bash
     npm run dev
     ```
   - 開啟瀏覽器存取：[http://127.0.0.1:5180/](http://127.0.0.1:5180/)

---

## 步驟 4：日常同步與交付

1. **程式碼變更**：
   - 請一律使用 `git commit` 與 `git push` 同步程式碼，避免使用雲端硬碟自動同步程式碼檔案。
2. **打包與交付**：
   - 當需要交付網頁成品時，在本地執行：
     ```bash
     npm run build
     ```
   - 將輸出的 `dist` 資料夾打包，複製到您的 Google Drive 同步資料夾下的 `handoff/builds/` 目錄中。
