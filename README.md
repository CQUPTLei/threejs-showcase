
# Three.js Visual Lab (视觉实验室)

这是一个基于 **Three.js** 和 **Vite** 构建的高性能 3D 视觉演示项目。

本项目展示了如何将 WebGL 3D 场景与现代 Web UI 无缝结合。通过鼠标滚轮或点击卡片，用户可以在多个高定 3D 场景（如粒子星系、赛博地形、液态金属等）之间流畅切换，体验沉浸式的视觉效果。

## ✨ 特性

- **沉浸式开场**：优雅的文字动画与 3D 背景结合。
- **高性能渲染**：基于 Three.js 的程序化生成（Procedural Generation）场景。
- **流畅交互**：支持鼠标滚轮（Scroll）防抖切换场景。
- **现代 UI**：使用 Tailwind CSS 构建的磨砂玻璃（Glassmorphism）风格界面。
- **模块化架构**：每个 3D 演示独立封装，易于扩展和维护。

## 🛠️ 技术栈

- **核心库**: [Three.js](https://threejs.org/)
- **构建工具**: [Vite](https://vitejs.dev/)
- **样式**: [Tailwind CSS](https://tailwindcss.com/)
- **语言**: JavaScript (ES6+)

## 🚀 快速开始

你需要先安装 [Node.js](https://nodejs.org/) (推荐 v16+)。

### 1. 克隆项目

```bash
git clone git@github.com:CQUPTLei/threejs-showcase.git
cd threejs-showcase
````

### 2\. 安装依赖

```bash
npm install
```

### 3\. 本地开发

启动本地开发服务器，修改代码后浏览器会自动热更新：

```bash
npm run dev
```

启动后，访问终端显示的地址（通常是 `http://localhost:5173`）即可查看效果。

## 📦 打包部署

如果你想将项目部署到服务器或 Vercel/Netlify：

```bash
npm run build
```

构建完成后，生成的静态文件位于 `dist` 目录中。

## 📂 项目结构简述

如果你想修改或添加新的 3D 效果：

  - **`src/Engine.js`**: Three.js 的核心引擎（负责 Scene, Camera, Renderer 初始化）。
  - **`src/demos/`**: 这里存放所有的 3D 演示文件（如 `Galaxy.js`, `Metal.js`）。
      - 想添加新效果？只需在这里新建一个类，并在 `src/main.js` 中引入即可。
  - **`src/main.js`**: 主要的业务逻辑，负责处理 UI 交互和场景切换。

## 🤝 贡献

欢迎提交 Issue 或 Pull Request 来增加更有趣的 3D 效果！

## 📄 License

MIT License

