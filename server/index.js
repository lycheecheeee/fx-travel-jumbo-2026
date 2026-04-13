import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 54321;
const SECRET_KEY = process.env.JWT_SECRET || 'jumbo-fx-secret-2026';

app.use(cors());
app.use(express.json());

// Mock Database
const users = [];

// Auto-create test account on startup
(async () => {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  users.push({ username: 'admin', password: hashedPassword });
  console.log('🔑 預設測試帳號已創建: admin / admin123');
})();

// Register Endpoint
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ error: '用戶已存在' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.status(201).json({ message: '註冊成功' });
});

// Login Endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: '憑證無效' });
  }

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '24h' });
  res.json({ token, username });
});

// Protected Data Endpoint
app.get('/api/features', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(403).json({ error: '需要登入' });

  try {
    jwt.verify(token, SECRET_KEY);
    res.json({
      core: [
        { icon: '📸', title: '一鍵拍照翻譯及轉換匯率', desc: '收據、餐單、價錢牌，簡單用手機拍拍，即時 OCR 掃描翻譯外文及辨識金額與貨幣，即時轉換成港元 (HKD) 或所需貨幣，一個 App 搞定！' },
        { icon: '👯', title: '朋友旅行多人分賬', desc: '多人旅行最怕計死數。無論是 朋友旅費 AA 制、室友分賬 (Roommate Payment) 還是 多人分賬 (Split Bill)，系統都會自動計算每人應付金額。' },
        { icon: '💱', title: '即時匯率 + 到價提示', desc: '支援全球多國貨幣，提供即時匯率 (Exchange Rate) 更新；更可設定目標匯價，到價即通知，出發前換錢更划算！' },
        { icon: '📒', title: '智能記帳與預算回顧', desc: '由出發前預算，旅途中記帳，到回程後結算。不用再寫手帳，象寶幫您處理好所有財務明細與支出分析。' }
      ],
      other: [
        { title: '最新天氣預報', desc: '開啟位置服務，即可即時顯示所在地區未來 3 天天氣概況，清楚掌握陰晴變化。' },
        { title: '象寶遊樂園', desc: '匯聚最新優惠活動及旅行相關資訊，讓您在享受記帳功能的同時，輕鬆發現更多旅行好去處。' },
        { title: '日常記帳', desc: '外遊象寶不只適用於旅行，即使日常消費，同樣方便好用。個人日常開支記錄，輕鬆管理。' },
        { title: '外幣小錢包', desc: '專為外幣管理而設，清楚記錄每一筆外幣兌換及支出，系統自動幫您計算結餘。' },
        { title: '轉數快二維碼快速結算', desc: '與朋友計算好分賬後，只需在象寶內一鍵生成個人轉數快二維碼，快捷又安全。' }
      ]
    });
  } catch (err) {
    res.status(401).json({ error: 'Token 失效' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ 後端服務已啟動於 http://localhost:${PORT}`);
});
