import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const FeatureCard = ({ item, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
    whileHover={{ scale: 1.03, rotate: 1, boxShadow: "0px 15px 40px rgba(123, 47, 190, 0.5)" }}
    whileTap={{ scale: 0.98 }}
    className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl cursor-pointer group"
  >
    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
    <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
  </motion.div>
);

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // 直接使用本地數據，無需 API 認證
    const localData = {
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
    };
    
    // 模擬網絡延遲，展示載入動畫
    setTimeout(() => {
      setData(localData);
    }, 500);
  }, []);

  if (!data) return <div className="text-center mt-20 text-xl">載入象寶數據中...</div>;

  return (
    <div className="min-h-screen pb-20 bg-gradient-to-br from-[#1a0b2e] to-[#2d1b4e] text-white">
      <header className="p-6 flex justify-between items-center border-b border-white/10 backdrop-blur-sm sticky top-0 z-50">
        <h1 className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-pink-400">
          FX Travel Jumbo
        </h1>
      </header>

      <main className="container mx-auto px-4 mt-12">
        <section className="text-center mb-16">
          <motion.h2 
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            className="text-4xl md:text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-primary to-secondary"
          >
            核心功能
          </motion.h2>
          <p className="text-white/60 text-xl">你需要的，象寶都有</p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {data.core.map((item, idx) => <FeatureCard key={idx} item={item} index={idx} />)}
        </div>

        <section className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">其他實用功能</h2>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.other.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + idx * 0.1 }}
              whileHover={{ backgroundColor: "rgba(123, 47, 190, 0.2)" }}
              className="bg-white/5 border border-white/10 p-6 rounded-xl"
            >
              <h4 className="text-secondary font-bold mb-2">【{item.title}】</h4>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
