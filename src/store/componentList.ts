import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { ComponentPropsType } from '../components/QuestionComponents'
import cloneDeep from 'lodash.clonedeep'
import { nanoid } from 'nanoid'
import { arrayMove } from '@dnd-kit/sortable'
import { temporal } from 'zundo'
export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  props: ComponentPropsType
  isHidden?: boolean
  isLocked?: boolean
  order?:number
}

export type ComponentListState = {
  /** 所有组件 */
  componentList: ComponentInfoType[]
  /** 选中的组件id */
  selectedId: string
  /** 复制的组件 */
  copiedComponent: ComponentInfoType | null
  /** 答卷数量 */
  answerCount: number | undefined
}

type Action = {
  // 设置所有组件
  resetComponents: (data: ComponentListState) => void
  /** 选中组件 */
  changeSelectedId: (id: string) => void
  /** 添加组件 */
  addComponent: (component: ComponentInfoType) => void
  /** 修改组件的属性 */
  changeComponentProps: (fe_id: string, newProps: ComponentPropsType) => void
  /** 删除选中组件 */
  deleteSelectedComponent: () => void
  /** 隐藏显示切换 */
  changeComponentHidden: (fe_id: string, isHidden: boolean) => void
  /** 锁定解锁切换 */
  changeComponentLocked: (fe_id: string) => void
  /** 复制选中组件 */
  copySelectedComponent: () => void
  /** 粘贴组件 */
  pasteComponent: () => void
  /** 选中上一个 */
  selectPrevComponent: () => void
  /** 选中下一个 */
  selectNextComponent: () => void
  /** 修改标题 */
  changeComponentTitle: (fe_id: string, title: string) => void
  /** 移动组件 */
  moveComponent: (oldIndex: number, newIndex: number) => void
  /** 上移或下移动组件 */
  moveComponentUpOrDown: (action: 'up' | 'down') => void
}

/**
 * 获取下一个选中id
 * @param fe_id 当前的id
 * @param componentList 组件列表
 * @returns 下一个选中id
 */
const getNextSelectedId = (fe_id: string, componentList: ComponentInfoType[]) => {
  const visibleComponentList = componentList.filter((item) => !item.isHidden)
  const index = visibleComponentList.findIndex((item) => item.fe_id === fe_id)

  if (index === -1 || visibleComponentList.length <= 1) {
    return ''
  }

  if (index === visibleComponentList.length - 1) {
    return visibleComponentList[index - 1].fe_id
  } else {
    return visibleComponentList[index + 1].fe_id
  }
}

/** 插入新组件 */
const insertNewComponent = (state: ComponentListState, newComponent: ComponentInfoType) => {
  // 获取当前selectedId
  const selectedId = state.selectedId
  const index = state.componentList.findIndex((item) => item.fe_id === selectedId)
  if (index < 0) {
    // 未选中任何组件
    state.componentList.push(newComponent)
  } else {
    // 选中了组件
    state.componentList.splice(index + 1, 0, newComponent)
  }
  // 选中添加的组件
  state.selectedId = newComponent.fe_id
}

export const useComponentListStore = create<ComponentListState & Action>()(
  temporal(
    immer((set) => ({
      componentList: [],
      selectedId: '',
      copiedComponent: null,
      answerCount: undefined,
      resetComponents: (componentList) => {
        set((state) => {
          state.componentList = componentList.componentList
          state.selectedId = componentList.selectedId
        })
      },
      changeSelectedId: (id: string) => {
        set((state) => {
          const prevSelectedId = state.selectedId
          state.selectedId = id
          if (prevSelectedId) {
            const prevComponent = state.componentList.find((item) => item.fe_id === prevSelectedId)
            if (prevComponent) {
              const { props } = prevComponent
              if (Array.isArray(props.options)) {
                props.options = props.options.filter((option) => option.text.trim() !== '' || option.value.trim() !== '')
              }
              if (Array.isArray(props.list)) {
                props.list = props.list.filter((item) => item.text.trim() !== '' || item.value.trim() !== '')
              }
              if (props.title === '') {
                props.title = '未命名问题'
              }
            }
          }
        })
      },
      addComponent: (component: ComponentInfoType) => {
        set((state) => {
          insertNewComponent(state, component)
        })
      },
      changeComponentProps: (fe_id: string, newProps: ComponentPropsType) => {
        set((state) => {
          /** 当前要修改的组件 */
          const curComponent = state.componentList.find((item) => item.fe_id === fe_id)
          if (curComponent) {
            curComponent.props = {
              ...curComponent.props,
              ...newProps,
            }
          }
        })
      },
      deleteSelectedComponent: () => {
        set((state) => {
          // 获取当前selectedId
          const selectedId = state.selectedId
          // 重新计算selectedId
          const newSelectedId = getNextSelectedId(selectedId, state.componentList)
          // 更新selectedId
          state.selectedId = newSelectedId
          // 删除选中组件
          const index = state.componentList.findIndex((item) => item.fe_id === selectedId)
          state.componentList.splice(index, 1)
        })
      },
      changeComponentHidden: (fe_id: string, isHidden: boolean) => {
        set((state) => {
          const { componentList = [] } = state
          let newSelectedId = ''

          if (isHidden) {
            // 隐藏
            newSelectedId = getNextSelectedId(fe_id, componentList)
          } else {
            // 显示
            newSelectedId = fe_id
          }
          state.selectedId = newSelectedId
          const curComponent = componentList.find((item) => item.fe_id === fe_id)
          if (curComponent) {
            curComponent.isHidden = isHidden
          }
        })
      },
      changeComponentLocked: (fe_id: string) => {
        set((state) => {
          const { componentList = [] } = state
          const curComponent = componentList.find((item) => item.fe_id === fe_id)
          if (curComponent) {
            curComponent.isLocked = !curComponent.isLocked
          }
        })
      },
      copySelectedComponent: () => {
        set((state) => {
          const { selectedId, componentList = [] } = state
          // 获取当前选中组件
          const curComponent = componentList.find((item) => item.fe_id === selectedId)
          if (curComponent == null) {
            return
          }
          // 复制当前选中组件使用深拷贝
          state.copiedComponent = cloneDeep(curComponent)
        })
      },
      pasteComponent: () => {
        set((state) => {
          const { copiedComponent } = state
          if (copiedComponent == null) return
          // 把fe_id 修改
          copiedComponent.fe_id = nanoid()
          insertNewComponent(state, copiedComponent)
        })
      },
      selectPrevComponent: () => {
        set((state) => {
          const { selectedId, componentList } = state
          const selectedIndex = componentList.findIndex((item) => item.fe_id === selectedId)
          // 未选中
          if (selectedIndex < 0) {
            return
          }
          // 已经是第一个 无法向上
          if (selectedIndex <= 0) {
            return
          }
          state.selectedId = componentList[selectedIndex - 1].fe_id
        })
      },
      selectNextComponent: () => {
        set((state) => {
          const { selectedId, componentList } = state
          const selectedIndex = componentList.findIndex((item) => item.fe_id === selectedId)
          // 未选中
          if (selectedIndex < 0) {
            return
          }
          // 已经是最后一个 无法向下
          if (selectedIndex + 1 === componentList.length) {
            return
          }
          state.selectedId = componentList[selectedIndex + 1].fe_id
        })
      },
      changeComponentTitle: (fe_id: string, title: string) => {
        set((state) => {
          const { componentList = [] } = state
          const curComponent = componentList.find((item) => item.fe_id === fe_id)
          if (curComponent) {
            curComponent.title = title
          }
        })
      },

      moveComponent: (oldIndex: number, newIndex: number) => {
        set((state) => {
          const { componentList: curComponentList = [] } = state
          state.componentList = arrayMove(curComponentList, oldIndex, newIndex)
        })
      },

      moveComponentUpOrDown: (action: 'up' | 'down') => {
        set((state) => {
          const { selectedId, componentList = [] } = state
          const selectIndex = componentList.findIndex((item) => item.fe_id === selectedId)
          const length = componentList.length
          const isFirst = selectIndex <= 0
          const isLast = selectIndex + 1 >= length
          if (action === 'up' && isFirst) {
            return
          }
          if (action === 'down' && isLast) {
            return
          }
          if (action === 'up') {
            state.componentList = arrayMove(componentList, selectIndex, selectIndex - 1)
          }
          if (action === 'down') {
            state.componentList = arrayMove(componentList, selectIndex, selectIndex + 1)
          }
        })
      },
    })),
    {
      limit: 20,
      partialize: (state) => ({
        componentList: state.componentList.map((component) => ({
          fe_id: component.fe_id,
          type: component.type,
          title: component.title,
          props: component.props,
          isHidden: component.isHidden,
          isLocked: component.isLocked,
        })),
        copiedComponent: state.copiedComponent,
      }),
    }
  )
)
