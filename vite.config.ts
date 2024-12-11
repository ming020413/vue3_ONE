import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueSetupExtend from 'unplugin-vue-setup-extend-plus/vite'

//vant所需依赖
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueSetupExtend({
      enableAutoExpose: true
    }),
    // vueDevTools(),
    // vant按需导入
    AutoImport({
      resolvers: [VantResolver()],
    }),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  //解决import导入下的@问题
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.vue', '.mjs'],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
})




