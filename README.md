# 小小畫家學習樂園 V1.7.33｜全螢幕畫板與工具列穩定修正版

本版供既有 V1.7.32 GitHub Pages 直接覆蓋更新，不需要重新上傳 400 張教材圖片。

## 本次修正
- 「圖案／底圖」與「圖層」改成小型可收合工具列，預設收合。
- 全螢幕畫板改為獨立固定覆蓋層，進入時把繪圖工作區直接移到 viewport，避免桌機進入後畫布消失。
- iPad 全螢幕按鈕加入 Pointer/Click 雙路徑與防重複觸發，並支援 visualViewport / 旋轉後重新配適畫布。
- 全螢幕畫布依實際可用寬高計算 4:3 尺寸，不再只依賴 CSS dvh 計算。
- 手機調色盤展開後一次顯示 7 種畫具與 10 個常用顏色，不再需要上下／左右捲動。
- 保留全螢幕內「畫畫／寫字／發音」三合一切換、15% 底圖透明度、圓形選色盤與橡皮擦範圍提示。

# 小小畫家學習樂園 V1.7.33｜GitHub Pages 正式上線版

## V1.7.33 本次更新

- 新增「全螢幕畫板」專注模式；iPad / 手機可放大主畫板，進入時調色盤自動收合。
- 主畫板與文字塗寫畫板全面禁止雙擊反白、長按選取與拖曳選取。
- 英文發音改為等待語音清單載入、優先選自然 en-US 英文語音，並阻止前一段中文/英文語音串入下一次播放。
- 200 個英文教材名稱均保留，語音播放前會清理多餘標點；例如 Hot-air balloon 會以 Hot air balloon 播放。
- 英文文字塗寫增加字母間距；注音依每格寬度自動縮放並增加符號間距，避免擠在一起。


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
若 GitHub 上傳新版後 iPad 仍看到舊畫面，先重新整理；主畫面 PWA 若仍持有舊快取，可完全關閉後重開。V1.7.33 的 Service Worker cache key 已獨立版本化。

## 本正式包已移除
- QA / 測試報告
- 歷史版本預覽圖
- 開發腳本
- 暫存檔
- 舊版修正紀錄

功能程式碼未做高風險壓縮或混淆，保留可讀性，方便後續維護。
