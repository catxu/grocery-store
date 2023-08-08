import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'

import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(
  {
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "src")
      }
    },
    plugins: [WindiCSS(), vue()],
    server: {
      proxy: {
        '/admin': {
          target: 'http://127.0.0.1:8803',
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/admin/, '/admin')
        }
      }
    }
  }
)
