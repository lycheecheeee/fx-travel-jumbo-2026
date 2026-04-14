# 外遊象寶 FX Travel Jumbo - Minisite V3 独立版本

## 📁 文件结构

```
minisite-v3-standalone/
├── index.html              # 主页面
├── translations.json       # 多语言翻译文件
├── manifest.json          # PWA 配置文件
└── assets/                # 所有资源文件
    ├── app-icon/          # 应用图标
    ├── jumbo-gif/         # 吉祥物动画
    ├── sounds/            # 音效文件
    ├── Section 1_Hero video/  # Hero 视频
    ├── Section 2_highlight/   # 亮点展示
    ├── Section 3_Core Feature/ # 核心功能
    └── ...其他资源
```

## 🚀 使用方法

### 本地预览
```bash
# 使用任意 HTTP 服务器
npx http-server -p 8080

# 或使用 Python
python -m http.server 8080

# 或使用 Node.js
node server/index.js
```

然后在浏览器中访问：`http://localhost:8080`

### 直接打开
也可以直接在浏览器中打开 `index.html` 文件，但某些功能（如音频、PWA）可能需要 HTTP 服务器才能正常工作。

## ✨ 特性

- ✅ 完整的国际化支持（i18n）
- ✅ 自定义光标效果
- ✅ 滚动进度条
- ✅ 粒子系统动画
- ✅ 视差滚动效果
- ✅ 涟漪点击效果
- ✅ 滚动触发动画
- ✅ FAQ 折叠面板
- ✅ 响应式设计
- ✅ PWA 支持

## 🎨 技术栈

- HTML5
- CSS3 (Grid, Flexbox, Animations)
- Vanilla JavaScript (ES6+)
- 无外部依赖（除 Google Fonts）

## 📝 注意事项

1. 所有资源路径已调整为相对路径，确保可以独立运行
2. 音频和视频资源已包含在 assets 文件夹中
3. 翻译文件已复制到根目录
4. PWA manifest 已配置

## 🔧 修改建议

如需修改内容：
- 文本内容：编辑 `translations.json`
- 样式：编辑 `index.html` 中的 `<style>` 标签
- 功能：编辑 `index.html` 中的 `<script>` 标签

## 📄 版本信息

- 版本：v3.0-super-creative
- 构建日期：2026-04-14
- 来源：从主项目归档提取
