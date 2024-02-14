import uni from "@dcloudio/vite-plugin-uni"
import vueJsx from "@vitejs/plugin-vue-jsx"
import { resolve } from "path"
import { defineConfig } from "vite"

export default defineConfig({
  build: {
    target: "es6"
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: resolve(__dirname, "src")
      }
    ]
  },
  server: {
    port: 8890,
    // 选项写法
    proxy: {
      "/pag": {
        target: "https://cdn.tmui.design",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/api/, "/api")
      }
    }
  },
  plugins: [uni(), vueJsx()]
})
