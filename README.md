# 小小畫家學習樂園 V1.7.37｜全螢幕實際執行回歸修正版

本版以 V1.7.36 為基礎，針對「點全螢幕後畫面像當機」進行實際瀏覽器執行、操作與回歸測試後修正。

## V1.7.37 核心修正
- 修正全螢幕層 `inset:auto!important` 覆蓋 JavaScript `top:0` 的問題。舊版全螢幕層實際被放到頁面下方，而原頁面又被鎖住，因此看起來像整個系統當機。
- 全螢幕層改為 `position:fixed; inset:0`，Canvas 真正從 viewport 左上角 `(0,0)` 鋪滿整個畫面。
- 保留 V1.7.36 的浮動 `🖌️ 筆觸` 工具、右下角 Undo／Redo／完成收藏，以及 100% 全螢幕畫布。
- 保留全螢幕 `🎨 畫畫`／`✍️ 寫字` 雙模式；發音不放入全螢幕。
- 英文練習依字數放大，中文與注音維持單列全寬大字設計。
- 手機展開調色盤後，7 種畫具與 10 個常用色均完整顯示於視窗內。

## 實際執行回歸項目
已使用瀏覽器自動化實際執行並操作以下流程：
- 桌機 1440×900
- iPad 橫向 1180×820（觸控模式）
- iPad 直向 820×1180（觸控模式）
- 手機 390×844（觸控模式）

實際操作包含：進入教材、開啟全螢幕、在 Canvas 上拖動畫筆、Undo／Redo、筆觸工具展開／收合、調色盤展開、畫畫／寫字切換、ABC／中文／注音切換、返回畫畫、離開全螢幕。修正後未偵測到 JavaScript page error／console error。

> 測試是在 Chromium 的桌機／觸控 viewport 模擬中執行，並非實體 iPad Safari；iPad Safari 仍建議上線後做最後一次實機確認。

## GitHub 更新方式
如果 GitHub 已經有 V1.7.36 與 400 張教材圖片，只需要覆蓋以下 7 個檔案：

```text
index.html
styles.css
app.js
sw.js
manifest.webmanifest
README.md
CORE_SHA256.txt
```

教材圖片與 `lineart.js` 不需要重新上傳。

## 快取注意
覆蓋 GitHub 後若 iPad／手機仍看到舊版，請完全關閉 Safari 分頁或主畫面 PWA 後重新開啟。本版已更新 Service Worker cache key。
