import { useKeyPress } from 'ahooks'
import { useComponentListStore } from '../store/componentList'

/** 判断activeElement是否有效 */
const isActiveElementValid = () => {
  const activeElement = document.activeElement
  // if (activeElement === document.body) {
  //   return true
  // }

  // 使用了dnd-kit
  if (activeElement === document.body) {
    return true
  }
  if (activeElement?.matches('div[role="button"]')) {
    return true
  }
  return false
}

/** 绑定快捷键 */
const useBindCanvasKeyPress = () => {
  const { moveComponentUpOrDown, selectNextComponent, pasteComponent, copySelectedComponent, deleteSelectedComponent, selectPrevComponent } = useComponentListStore()
  const { undo, redo } = useComponentListStore.temporal.getState()
  // 删除组件
  useKeyPress(['backspace', 'delete'], () => {
    if (!isActiveElementValid()) {
      return
    }
    deleteSelectedComponent()
  })
  // 复制组件
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (!isActiveElementValid()) {
      return
    }
    copySelectedComponent()
  })
  // 粘贴组件
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (!isActiveElementValid()) {
      return
    }
    pasteComponent()
  })
  // 选中上一个
  useKeyPress(
    ['uparrow'],
    () => {
      if (!isActiveElementValid()) {
        return
      }
      selectPrevComponent()
    },
    {
      exactMatch: true,
    }
  )
  // 选中下一个
  useKeyPress(
    ['downarrow'],
    () => {
      if (!isActiveElementValid()) {
        return
      }
      selectNextComponent()
    },
    {
      exactMatch: true,
    }
  )
  /** 上移 */
  useKeyPress(
    ['ctrl.uparrow'],
    () => {
      if (!isActiveElementValid()) {
        return
      }
      moveComponentUpOrDown('up')
    },
    {
      exactMatch: true,
    }
  )
  /** 下移 */
  useKeyPress(
    ['ctrl.downarrow'],
    () => {
      if (!isActiveElementValid()) {
        return
      }
      moveComponentUpOrDown('down')
    },
    {
      exactMatch: true,
    }
  )

  /** 撤销 */
  useKeyPress(
    ['ctrl.z', 'meta.z'],
    () => {
      if (!isActiveElementValid()) {
        return
      }
      // 撤销
      undo()
    },
    {
      exactMatch: true,
    }
  )

  /** 重做 */
  useKeyPress(
    ['ctrl.shift.z', 'meta.shift.z'],
    () => {
      if (!isActiveElementValid()) {
        return
      }
      redo()
    },
    {
      exactMatch: true,
    }
  )
}

export default useBindCanvasKeyPress
