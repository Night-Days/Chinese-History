import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// GitHub Pages 项目站点地址为 https://<user>.github.io/<repo>/
// 构建时带上子路径（可用 BASE_PATH 覆盖），开发时仍以根路径运行。
const REPO_NAME = 'Chinese-History'
const BUILD_BASE = process.env.BASE_PATH || `/${REPO_NAME}/`

export default defineConfig(({ command }) => ({
  base: command === 'build' ? BUILD_BASE : '/',
  plugins: [vue()],
  server: {
    port: 5173,
    host: '127.0.0.1',
  },
  build: {
    target: 'es2018',
    assetsInlineLimit: 4096,
  },
}))
