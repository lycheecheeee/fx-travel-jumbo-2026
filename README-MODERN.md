# 外遊象寶 FX Travel Jumbo - 現代化全端重構版

## 🚀 技術棧
- **前端**: React 18 + Vite + Tailwind CSS + Framer Motion
- **後端**: Node.js + Express + JWT + bcryptjs
- **動畫**: Framer Motion (stiffness: 100 彈簧物理效果)

## 📦 快速開始

### 1. 安裝依賴
```bash
npm install
```

### 2. 啟動後端服務（端口 54321）
```bash
node server/index.js
```

### 3. 啟動前端開發伺服器（端口 5173）
```bash
npm run dev
```

## 🔐 用戶認證
- 首次使用請先註冊帳號
- JWT Token 自動存儲於 localStorage
- Protected Routes 確保數據安全

## 🎨 設計特色
- Glassmorphism 玻璃擬態設計
- Framer Motion 彈簧物理動畫
- 響應式 Grid 佈局
- 漸變色主題（紫色 #7b2fbe → 粉紅 #ec4899）

## 📁 項目結構
```
├── server/          # Node.js 後端
│   └── index.js     # Express API 服務器
├── src/             # React 前端
│   ├── pages/       # 頁面組件
│   ├── App.jsx      # 主應用
│   └── main.jsx     # 入口文件
├── index-modern.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── .env             # 環境變數
```

## ⚙️ 環境變數
編輯 `.env` 檔案可自定義：
- `PORT`: 後端端口（預設 54321）
- `JWT_SECRET`: JWT 加密金鑰
- `NODE_ENV`: 運行環境

## 🛡️ 安全特性
- bcryptjs 密碼哈希
- JWT Token 驗證
- CORS 跨域保護
- 環境變數隔離敏感數據
