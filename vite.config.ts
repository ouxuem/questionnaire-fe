import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split'
export default defineConfig({
  plugins: [
    react(),
    UnoCSS(),
    visualizer({
      open: false,
      filename: 'stats.html',
      gzipSize: true,
      brotliSize: true,
      emitFile: false,
    }),
    // chunkSplitPlugin({
    //   strategy: 'default',
    //   customSplitting: {
    //     'react-vendor': [/react/, /react-dom/],
    //     'ant-vendor': [/antd/],
    //   },
    // }),
  ],
})
