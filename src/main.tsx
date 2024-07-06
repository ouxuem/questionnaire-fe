import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'virtual:uno.css'
import '@unocss/reset/normalize.css'
import zhCN from 'antd/locale/zh_CN'
import { ConfigProvider } from 'antd'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>
)


