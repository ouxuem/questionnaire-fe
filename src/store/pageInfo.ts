import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export type PageInfoState = {
  title: string
  desc?: string
  js?: string
  css?: string
  isPublished?: boolean
}

type Action = {
  /** 初始化页面信息 */
  resetPageInfo: (data: PageInfoState) => void
  /** 设置页面标题 */
  setPageTitle: (title: string) => void
}

export const usePageInfoStore = create<PageInfoState & Action>()(
  immer((set) => ({
    title: '',
    desc: '',
    js: '',
    css: '',
    resetPageInfo: (data) => {
      set((state) => {
        state.title = data.title
        state.desc = data.desc
        state.js = data.js
        state.css = data.css
        state.isPublished = data.isPublished
      })
    },
    setPageTitle: (data) => {
      set((state) => {
        state.title = data
      })
    },
  }))
)
