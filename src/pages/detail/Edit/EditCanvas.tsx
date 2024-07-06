import React from 'react'
import { ComponentInfoType, useComponentListStore } from '../../../store/componentList'
import { getComponentConfigByType } from '../../../components/QuestionComponents'
import useBindCanvasKeyPress from '../../../hooks/useBindCanvasKeyPress'
import SortableContainer from '../../../components/DragSortable/SortableContainer'
import SortableItem from '../../../components/DragSortable/SortableItem'
import LoadingSpin from '../../../components/LoadingSpin'
export type EditCanvasProps = {
  loading: boolean
}

const genComponent = (componentInfo: ComponentInfoType) => {
  const { type, props } = componentInfo
  const componentConfig = getComponentConfigByType(type)
  if (componentConfig == null) {
    return null
  }
  const { Component } = componentConfig
  return <Component {...props} />
}
const EditCanvas: React.FC<EditCanvasProps> = ({ loading }) => {
  useBindCanvasKeyPress()
  const { componentList = [], changeSelectedId, selectedId, moveComponent } = useComponentListStore()
  const handleClick = (e: React.MouseEvent, id: string) => {
    // 阻止冒泡
    e.stopPropagation()
    changeSelectedId(id)
  }
  if (loading) {
    return <LoadingSpin isCenter={true} />
  }

  const componentWithId = componentList.map((item) => {
    return {
      ...item,
      id: item.fe_id,
    }
  })

  const handleSortEnd = (oldIndex: number, newIndex: number) => {
    moveComponent(oldIndex, newIndex)
  }

  return (
    <SortableContainer items={componentWithId} onDragEnd={handleSortEnd}>
      <div bg="#fff" min-h="100%" overflow="hidden">
        {componentList
          .filter((item) => !item.isHidden)
          .map((item) => {
            const { fe_id, isLocked } = item
            return (
              <SortableItem key={fe_id} id={fe_id}>
                <div
                  onClick={(e) => handleClick(e, fe_id)}
                  hover="border-[#d9d9d9]"
                  className={`question-component ${fe_id === selectedId ? 'click-component' : ''} ${isLocked ? 'Locked-component' : ''}`}
                >
                  <div className="pointer-events-none">{genComponent(item)}</div>
                </div>
              </SortableItem>
            )
          })}
      </div>
    </SortableContainer>
  )
}

export default EditCanvas
