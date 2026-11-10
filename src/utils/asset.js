/**
 * 资源路径工具
 * GitHub Pages 部署在 /<repo>/ 子路径下，不能写死以 / 开头的绝对路径。
 * 这里统一拼接 Vite 的 BASE_URL（开发时为 /，构建时为 /Chinese-History/）。
 */
const BASE = import.meta.env.BASE_URL || '/'

export function asset(path) {
  return `${BASE}${String(path || '').replace(/^\/+/, '')}`
}

export default asset
