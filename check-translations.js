const fs = require('fs');
const path = require('path');

console.log('\n🔍 FX Travel Jumbo - 翻译完整性检查工具\n');
console.log('=' .repeat(60));

// 读取HTML文件
const htmlPath = path.join(__dirname, 'minisite-interactive.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

// 提取所有data-i18n属性
const i18nRegex = /data-i18n="([^"]+)"/g;
const matches = [...htmlContent.matchAll(i18nRegex)];
const allKeys = [...new Set(matches.map(m => m[1]))]; // 去重

console.log(`\n📋 找到 ${allKeys.length} 个唯一的i18n键:\n`);
allKeys.forEach((key, index) => {
  console.log(`  ${(index + 1).toString().padStart(2, ' ')}. ${key}`);
});

// 检查translations对象中的每个语言
const langs = ['zh-TW', 'zh-CN', 'en', 'ja', 'ko'];
const langNames = {
  'zh-TW': '🇭🇰 繁體中文',
  'zh-CN': '🇨🇳 简体中文',
  'en': '🇬🇧 English',
  'ja': '🇯🇵 日本語',
  'ko': '🇰🇷 한국어'
};

console.log('\n' + '='.repeat(60));
console.log('\n📊 各语言翻译完整性检查:\n');

let totalMissing = 0;
let allComplete = true;

langs.forEach(lang => {
  const missing = [];
  
  allKeys.forEach(key => {
    // 构建正则表达式来查找该语言的该键
    // 格式: 'key': 'value' 或 "key": "value"
    const keyPattern = new RegExp(
      `["']${key.replace(/\./g, '\\.')}["']\\s*:\\s*["']([^"']*)["']`,
      'g'
    );
    
    // 检查是否在对应语言块中存在
    const langPattern = new RegExp(
      `["']${lang}["']\\s*:\\s*{([\\s\\S]*?)}\\s*,?\\s*(?=["'])`,
      'g'
    );
    
    const langMatch = htmlContent.match(langPattern);
    if (langMatch) {
      const langBlock = langMatch[0];
      const hasKey = langBlock.includes(`'${key}'`) || langBlock.includes(`"${key}"`);
      
      if (!hasKey) {
        missing.push(key);
      }
    } else {
      missing.push(key);
    }
  });
  
  if (missing.length > 0) {
    allComplete = false;
    totalMissing += missing.length;
    console.log(`❌ ${langNames[lang]} (${lang})`);
    console.log(`   缺失 ${missing.length} 个翻译:`);
    missing.forEach(key => {
      console.log(`      • ${key}`);
    });
    console.log('');
  } else {
    console.log(`✅ ${langNames[lang]} (${lang}) - 完整`);
  }
});

console.log('\n' + '='.repeat(60));

if (allComplete) {
  console.log('\n🎉 恭喜!所有语言的翻译都完整!\n');
} else {
  console.log(`\n⚠️  发现 ${totalMissing} 个缺失的翻译,请补充。\n`);
}

console.log('✨ 检查完成!\n');
