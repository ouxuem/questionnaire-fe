import React, { useState } from 'react'
import { useComponentListStore } from '../../../store/componentList'
import { Button, Input, Space, message } from 'antd'
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import SortableContainer from '../../../components/DragSortable/SortableContainer'
import SortableItem from '../../../components/DragSortable/SortableItem'
const Layers: React.FC = () => {
  const { moveComponent, changeComponentHidden, changeComponentLocked, changeComponentTitle, componentList = [], selectedId, changeSelectedId } = useComponentListStore()
  const [changeTitleId, setChangeTitleId] = useState('')
  const handleTitleClick = (fe_id: string) => {
    const component = componentList.find((item) => item.fe_id === fe_id)
    if (component && component.isHidden) {
      message.info('不能显示隐藏的组件')
      return
    }
    if (fe_id !== selectedId) {
      changeSelectedId(fe_id)
      setChangeTitleId('')
      return
    }
    setChangeTitleId(fe_id)
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value.trim()
    if (newTitle === '') {
      return
    }
    if (!selectedId) return
    changeComponentTitle(selectedId, newTitle)
  }
  const changeHidden = (fe_id: string, isHidden: boolean) => {
    changeComponentHidden(fe_id, isHidden)
  }
  const changeLocked = (fe_id: string) => {
    changeComponentLocked(fe_id)
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
      {componentList.map((item) => {
        const { fe_id, title, isHidden, isLocked } = item
        return (
          <SortableItem key={fe_id} id={fe_id}>
            <div flex="~" py="6" border="b-solid 1 b-[rgba(0,0,0,.06)]">
              <div onClick={() => handleTitleClick(fe_id)} color={`${fe_id === selectedId && '#1890ff'}`} className="line-height-[2]" flex="auto">
                {fe_id === changeTitleId ? <Input onChange={handleTitleChange} onPressEnter={() => setChangeTitleId('')} onBlur={() => setChangeTitleId('')} value={title} /> : <>{title}</>}
              </div>
              <div w="50" text-align="end">
                <Space>
                  <Button
                    onClick={() => changeHidden(fe_id, !isHidden)}
                    hover="opacity-100"
                    shape="circle"
                    size="small"
                    className={`${!isHidden ? 'opacity-20' : ''}`}
                    type={isHidden ? 'primary' : 'text'}
                    icon={<EyeInvisibleOutlined />}
                  />
                  <Button
                    onClick={() => changeLocked(fe_id)}
                    hover="opacity-100"
                    shape="circle"
                    size="small"
                    className={`${!isLocked ? 'opacity-20' : ''}`}
                    type={isLocked ? 'primary' : 'text'}
                    icon={<LockOutlined />}
                  />
                </Space>
              </div>
            </div>
          </SortableItem>
        )
      })}
    </SortableContainer>
  )
}

export default Layers
