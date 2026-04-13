import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const Login = ({ setIsAuth }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isRegister ? '/api/register' : '/api/login';
      console.log('嘗試連接後端:', `http://localhost:54321${endpoint}`);
      const res = await axios.post(`http://localhost:54321${endpoint}`, { username, password });
      
      if (!isRegister) {
        localStorage.setItem('token', res.data.token);
        setIsAuth(true);
      } else {
        alert('註冊成功！請立即登入');
        setIsRegister(false);
      }
    } catch (err) {
      console.error('錯誤詳情:', err);
      if (err.code === 'ERR_NETWORK') {
        alert('無法連接後端服務！\n\n請確認：\n1. 後端服務是否運行於端口 54321\n2. 終端機顯示 "✅ 後端服務已啟動"');
      } else {
        alert(isRegister ? '註冊失敗：' + (err.response?.data?.error || '未知錯誤') : '登入失敗：' + (err.response?.data?.error || '用戶名或密碼錯誤'));
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-lg border border-primary/30 p-8 rounded-2xl w-full max-w-md shadow-2xl">
        <h2 className="text-3xl font-black text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-secondary">
          外遊象寶 FX Jumbo
        </h2>
        <input 
          type="text" 
          placeholder="用戶名" 
          className="w-full p-4 mb-4 bg-dark/50 border border-primary/20 rounded-xl focus:border-secondary outline-none transition-all text-white"
          value={username} 
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input 
          type="password" 
          placeholder="密碼" 
          className="w-full p-4 mb-6 bg-dark/50 border border-primary/20 rounded-xl focus:border-secondary outline-none transition-all text-white"
          value={password} 
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button className="w-full py-4 bg-gradient-to-r from-primary to-secondary rounded-xl font-bold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 text-white">
          {isRegister ? '立即註冊' : '立即登入體驗'}
        </button>
        <p className="text-center mt-4 text-white/60 cursor-pointer hover:text-white transition-colors" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? '已有帳號？立即登入' : '未有帳號？立即註冊'}
        </p>
      </form>
    </motion.div>
  );
};

export default Login;
