# BEATART Seminar Site - Windows 本地開發環境設定指南

此說明文件協助您在 Windows 電腦上建立本地開發環境。**請勿直接在 Google Drive 資料夾內執行 npm 安裝與啟動服務**，否則會造成同步效能問題或檔案鎖定衝突。

---

## 步驟 1：安裝與切換 Node.js 版本

本專案鎖定使用 **Node.js v20 (LTS)**。建議在 Windows 上使用 `nvm-windows` 管理 Node 版本：

1. **安裝 NVM for Windows**：
   - 下載並安裝 [nvm-windows 最新版本](https://github.com/coreybutler/nvm-windows/releases)。
2. **安裝並使用 Node 20**：
   - 開啟 PowerShell 或是命令提示字元 (cmd) 執行：
     ```powershell
     nvm install 20
     nvm use 20
     ```
3. **確認安裝成功**：
   - 執行 `node -v`，確認輸出為 `v20.x.x`。
   - 執行 `npm -v`，確認 npm 可以正常運作。

---

## 步驟 2：Clone 程式碼至本地磁碟

請勿直接在 Google Drive 同步資料夾內進行日常開發。

1. **在本機建立開發目錄**（例如 `C:\Dev`）：
   ```powershell
   mkdir C:\Dev
   ```
2. **Clone 專案**（假設已將程式碼上傳至 Git 平台）：
   ```powershell
   cd C:\Dev
   git clone <您的 Git 倉庫 URL> beatart-seminar-site
   cd beatart-seminar-site
   ```

---

## 步驟 3：安裝依賴與啟動

1. **執行乾淨安裝**：
   - 利用 `package-lock.json` 鎖定的版本進行安裝，避免與 macOS 電腦的套件衝突：
     ```powershell
     npm run setup
     ```
2. **啟動開發伺服器**：
   - 專案已配置為自訂埠口 `5180`，以避免與其他 Vite 專案衝突：
     ```powershell
     npm run dev
     ```
   - 啟動成功後，於瀏覽器開啟：[http://127.0.0.1:5180/](http://127.0.0.1:5180/)

---

## 步驟 4：日常同步與交付

1. **程式碼變更**：
   - 日常程式碼的變更與儲存請一律使用 `git commit` 與 `git push` 同步至 Git 伺服器。
2. **打包與交付**：
   - 當需要交付最新的建置版本時，於本地執行：
     ```powershell
     npm run build
     ```
   - 將產生的 `dist` 資料夾打包（例如命名為 `dist.zip` 或是最新的日期版本），複製到您的 Google Drive 同步目錄下的 `handoff/builds/` 中。
