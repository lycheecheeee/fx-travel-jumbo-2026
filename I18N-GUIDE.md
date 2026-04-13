# 動態 i18n 翻譯系統使用指南

## 🎯 核心原則：**零 Hard Code**

所有翻譯內容都存放在外部 JSON 文件中，JavaScript 代碼不包含任何硬編譯的翻譯文本。

---

## 📁 文件結構

```
project/
├── js/
│   └── i18n-dynamic.js      # 動態 i18n 引擎（無 hard code）
├── translations.json         # 翻譯內容（可替換為 API）
└── minisite-interactive-ver33.html
```

---

## 🚀 快速開始

### 1. HTML 中使用 `data-i18n` 屬性

```html
<!-- 基本用法 -->
<h1 data-i18n="hero.title"></h1>
<p data-i18n="hero.subtitle"></p>

<!-- 支持 HTML 內容 -->
<div data-i18n="intro.description"></div>
<!-- intro.description: "旅行記賬<br>分帳專家" -->

<!-- Placeholder 翻譯 -->
<input type="text" data-i18n-placeholder="form.name.placeholder" />

<!-- Aria-label 翻譯 -->
<button data-i18n-aria="nav.download" aria-label="免費下載"></button>
```

### 2. 語言切換按鈕

```html
<!-- 語言選擇器 -->
<button class="lang-btn" data-lang="zh-TW">繁體中文</button>
<button class="lang-btn" data-lang="zh-CN">简体中文</button>
<button class="lang-btn" data-lang="en">English</button>
<button class="lang-btn" data-lang="ja">日本語</button>
<button class="lang-btn" data-lang="ko">한국어</button>
```

---

## 🔧 進階用法

### 從 API 加載翻譯（推薦生產環境）

```javascript
// 從後端 API 加載翻譯
await window.i18n.loadTranslations('https://api.example.com/translations/zh-TW', 'zh-TW');

// 或從 CDN 加載
await window.i18n.loadTranslations('https://cdn.example.com/i18n/en.json', 'en');
```

### 監聽語言變化事件

```javascript
// 方法 1: 使用自定義事件
window.addEventListener('languageChanged', (e) => {
  console.log('Language changed to:', e.detail.language);
  // 執行自定義邏輯
});

// 方法 2: 添加觀察者
window.i18n.addObserver((lang) => {
  console.log('Current language:', lang);
  // 更新第三方組件
});
```

### 手動獲取翻譯

```javascript
// 獲取當前語言
const currentLang = window.i18n.getCurrentLang();

// 獲取翻譯（如果存在）
const translation = window.i18n.getTranslation('nav.features');

// 切換語言
window.i18n.setLanguage('en');
```

---

## 📝 翻譯文件格式 (translations.json)

```json
{
  "zh-TW": {
    "brand.name": "外遊象寶",
    "nav.features": "核心功能",
    "hero.title": "旅行記賬分帳 · 即時匯率換算"
  },
  "en": {
    "brand.name": "FX Travel Jumbo",
    "nav.features": "Core Features",
    "hero.title": "Travel Expense Tracking & Currency Exchange"
  }
}
```

**重要：** 
- ✅ 翻譯內容只在 JSON 文件中
- ❌ JavaScript 代碼中沒有任何 hard code 文本
- ✅ 可以輕鬆替換為 API 調用
- ✅ 支持按需加載（lazy loading）

---

## 🌍 支持的語言

| 代碼 | 語言 | 備註 |
|------|------|------|
| `zh-TW` | 繁體中文 | 默認語言 |
| `zh-CN` | 简体中文 | |
| `en` | English | |
| `ja` | 日本語 | |
| `ko` | 한국어 | |

---

## ⚙️ 自動功能

1. **瀏覽器語言檢測**：自動檢測用戶瀏覽器語言設置
2. **LocalStorage 保存**：記住用戶的語言偏好
3. **平滑過渡**：切換語言時自動更新所有 `data-i18n` 元素
4. **降級處理**：如果翻譯不存在，顯示原始 key（不會崩潰）

---

## 🎨 自定義樣式

語言按鈕會自動應用以下樣式：

**激活狀態：**
```css
background: rgba(123,47,190,0.3);
border-color: rgba(123,47,190,0.6);
color: white;
font-weight: 700;
```

**非激活狀態：**
```css
background: transparent;
border-color: rgba(255,255,255,0.2);
color: rgba(255,255,255,0.6);
font-weight: 500;
```

---

## 🔍 調試技巧

```javascript
// 查看當前語言
console.log(window.i18n.getCurrentLang());

// 查看所有支持的語言
console.log(window.i18n.getSupportedLangs());

// 檢查翻譯是否已加載
console.log(window.i18n.translations);

// 強制重新加載翻譯
await window.i18n.loadTranslations('translations.json', 'zh-TW');
```

---

## 🚫 常見錯誤

### ❌ 錯誤做法（Hard Code）

```javascript
// 不要在 JS 中 hard code 翻譯
const translations = {
  'zh-TW': {
    'nav.home': '首頁'  // ❌ Hard coded!
  }
};
```

### ✅ 正確做法（動態加載）

```javascript
// 從外部文件/API 加載
await window.i18n.loadTranslations('translations.json', 'zh-TW');
```

---

## 📦 生產環境建議

1. **使用 CDN**：將 `translations.json` 放在 CDN 上加速加載
2. **按需加載**：只加載用戶選擇的語言，減少初始加載時間
3. **版本控制**：為翻譯文件添加版本號，避免緩存問題
   ```javascript
   await window.i18n.loadTranslations('translations.json?v=1.2.3', 'en');
   ```
4. **錯誤處理**：提供降級方案，確保翻譯加載失敗時頁面仍能正常工作

---

## 🤝 貢獻指南

要添加新語言或更新翻譯：

1. 編輯 `translations.json` 文件
2. 添加新的語言代碼和對應的翻譯
3. 在 HTML 中添加對應的語言按鈕
4. 測試語言切換功能

**無需修改任何 JavaScript 代碼！** ✨

---

## 📞 技術支持

如有問題，請檢查：
1. 瀏覽器控制台是否有錯誤信息
2. `translations.json` 文件格式是否正確
3. 網絡請求是否成功加載翻譯文件
4. `data-i18n` 屬性是否正確設置

---

**核心理念：內容與代碼分離，零 Hard Code，完全動態化！** 🎉
