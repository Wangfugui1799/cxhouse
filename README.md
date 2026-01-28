# 民宿展示官网 CXHouse

一个简洁优雅的民宿展示官网，采用 React + Vite + TailwindCSS + Supabase 技术栈。

## 🌟 功能特点

- 📹 全屏视频首页
- 📸 图片画廊（支持灯箱浏览）
- 🎬 视频列表展示
- 📞 多种联系方式
- 🗺️ 地图导航
- 🔐 后台管理系统

## 🚀 快速开始

```bash
# 克隆项目
git clone https://github.com/Wangfugui1799/cxhouse.git
cd cxhouse

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env
# 编辑 .env 文件，填入 Supabase 配置

# 启动开发服务器
npm run dev
```

## 📦 环境变量

创建 `.env` 文件：

```env
VITE_SUPABASE_URL=你的Supabase项目URL
VITE_SUPABASE_ANON_KEY=你的Supabase匿名密钥
```

## 🔗 页面路由

| 路径 | 说明 |
|------|------|
| `/` | 首页 |
| `/room` | 房间详情 |
| `/contact` | 联系方式 |
| `/admin` | 后台管理 |

## 🛠️ 技术栈

- React 18
- Vite
- TailwindCSS
- React Router
- Supabase

## 📄 License

MIT
