# 小小畫家學習樂園 V1.7.30｜GitHub Pages 正式上線版

這是可直接部署到 GitHub Pages 的乾淨正式包。

## 目前內容
- 200 張彩色教材：`assets/guides-color-clean/`
- 200 張黑白線稿：`assets/guides-outline-clean/`
- 7 種畫具：鉛筆、蠟筆、畫筆、水彩筆、色筆、噴筆、橡皮擦
- 圓形顏色挑選盤與明暗控制
- 橡皮擦圓形擦拭範圍提示
- 底圖透明度 0%～100%，預設 15%
- 多圖層、文字塗寫、英文／中文發音、作品收藏
- iPad／iPad mini／Apple Pencil 操作穩定性修正
- PWA 與 Service Worker；教材圖片採使用時逐步快取

## GitHub Pages 上傳
1. 解壓縮本 ZIP。
2. 將解壓後「第一層」的所有檔案與資料夾，上傳到 GitHub Repository 根目錄。
3. Repository 內應直接看見 `index.html`，不要再多包一層資料夾。
4. GitHub → Settings → Pages → Build and deployment。
5. Source 選 `Deploy from a branch`，Branch 選正式分支（通常 `main`），Folder 選 `/(root)`。
6. 儲存後等待 GitHub Pages 完成部署。

## 正式根目錄結構
```text
index.html
styles.css
app.js
lineart.js
sw.js
manifest.webmanifest
.nojekyll
README.md
ATTRIBUTION.md
icons/
assets/
  guides-color-clean/      200 PNG
  guides-outline-clean/    200 PNG
  overview/                2 PNG
  ui/                      首頁 UI 圖片
```

## 更新注意
若 GitHub 上傳新版後 iPad 仍看到舊畫面，先重新整理；主畫面 PWA 若仍持有舊快取，可完全關閉後重開。V1.7.30 的 Service Worker cache key 已獨立版本化。

## 本正式包已移除
- QA / 測試報告
- 歷史版本預覽圖
- 開發腳本
- 暫存檔
- 舊版修正紀錄

功能程式碼未做高風險壓縮或混淆，保留可讀性，方便後續維護。
