# 小小畫家學習樂園 V1.7.46｜GitHub 強制更新修正版

此版專門處理「GitHub 已覆蓋檔案，但 iPad／手機仍顯示舊介面」問題。

## 這版與 V1.7.45 的差異
- `styles.css` 改名為 `styles-v1746.css`
- `app.js` 改名為 `app-v1746.js`
- `index.html` 改用全新檔名，因此瀏覽器無法沿用舊 CSS / JS 快取
- 首次載入 V1.7.46 會清除舊 Cache Storage 並解除舊 Service Worker 註冊
- Service Worker 以 `updateViaCache: none` 重新註冊
- 新增 `VERSION.txt`，可直接確認 GitHub 根目錄是否真的收到新版

## 上傳位置
所有檔案必須直接覆蓋／新增到 Repository 根目錄，`index.html` 必須和 `assets/`、`icons/` 同一層。
