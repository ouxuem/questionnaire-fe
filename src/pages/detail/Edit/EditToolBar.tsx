import { BlockOutlined, CopyOutlined, DeleteOutlined, DownOutlined, EyeInvisibleOutlined, LockOutlined, RedoOutlined, UndoOutlined, UpOutlined } from '@ant-design/icons'
import { Button, Space, Tooltip } from 'antd'
import React from 'react'
import { useComponentListStore } from '../../../store/componentList'

const EditToolBar: React.FC = () => {
  const { moveComponentUpOrDown, pasteComponent, copiedComponent, copySelectedComponent, deleteSelectedComponent, changeComponentHidden, selectedId, componentList, changeComponentLocked } =
    useComponentListStore()
  const { undo, redo } = useComponentListStore.temporal.getState()
  const handleDelete = () => {
    deleteSelectedComponent()
  }

  const selectedComponent = componentList.find((item) => item.fe_id === selectedId)
  const { isLocked } = selectedComponent || {}
  const length = componentList.length
  const selectIndex = componentList.findIndex((item) => item.fe_id === selectedId)
  const isFirst = selectIndex <= 0
  const isLast = selectIndex + 1 >= length
  /**  隐藏功能 */
  const handleHide = () => {
    changeComponentHidden(selectedId, true)
  }
  /**  锁定功能 */
  const handleLock = () => {
    changeComponentLocked(selectedId)
  }
  /**  复制功能 */
  const handleCopy = () => {
    copySelectedComponent()
  }
  /**  粘贴功能 */
  const handlePaste = () => {
    pasteComponent()
  }
  /** 上移 */
  const moveUp = () => {
    moveComponentUpOrDown('up')
  }
  /** 下移 */
  const moveDown = () => {
    moveComponentUpOrDown('down')
  }
  /** 撤销 */
  const handleUndo = () => {
    undo()
  }
  /** 重做 */
  const handleRedo = () => {
    redo()
  }
  return (
    <Space>
      <Tooltip title="删除">
        <Button onClick={handleDelete} shape="circle" icon={<DeleteOutlined />} />
      </Tooltip>
      <Tooltip title="隐藏">
        <Button onClick={handleHide} shape="circle" icon={<EyeInvisibleOutlined />} />
      </Tooltip>
      <Tooltip title="锁定">
        <Button type={isLocked ? 'primary' : 'default'} onClick={handleLock} shape="circle" icon={<LockOutlined />} />
      </Tooltip>
      <Tooltip title="复制">
        <Button onClick={handleCopy} shape="circle" icon={<CopyOutlined />} />
      </Tooltip>
      <Tooltip title="粘贴">
        <Button disabled={copiedComponent == null} onClick={handlePaste} shape="circle" icon={<BlockOutlined />} />
      </Tooltip>
      <Tooltip title="上移（ctrl+↑）">
        <Button disabled={isFirst} onClick={moveUp} shape="circle" icon={<UpOutlined />} />
      </Tooltip>
      <Tooltip title="下移（ctrl+↓）">
        <Button disabled={isLast} onClick={moveDown} shape="circle" icon={<DownOutlined />} />
      </Tooltip>
      <Tooltip title="撤销">
        <Button onClick={handleUndo} shape="circle" icon={<UndoOutlined />} />
      </Tooltip>
      <Tooltip title="重做">
        <Button onClick={handleRedo} shape="circle" icon={<RedoOutlined />} />
      </Tooltip>
    </Space>
  )
}

export default EditToolBar
