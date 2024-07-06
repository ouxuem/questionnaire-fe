// uno.config.ts
import { defineConfig, presetAttributify, presetUno } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'

export default defineConfig({
  presets: [
    presetAttributify(),
    presetUno(),
    presetRemToPx({
      baseFontSize: 4, // 1rem = 16px
    }),
  ],
  rules: [
    // Your custom rules here
    [
      'question-component',
      {
        margin: '12px',
        border: '1px solid #fff',
        padding: '12px',
        'border-radius': '3px',
      },
    ],
    ['click-component', { 'border-color': '#1890ff !important' }],
    ['Locked-component', { opacity: '0.5', cursor: 'not-allowed' }],
  ],
})
