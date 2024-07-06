import { CheckOutlined, EditOutlined, LeftOutlined } from '@ant-design/icons'
import { Button, Input, Space, Typography, message } from 'antd'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import EditToolBar from './EditToolBar'
import { usePageInfoStore } from '../../../store/pageInfo'
import { useComponentListStore } from '../../../store/componentList'
import { useDebounceEffect, useKeyPress, useRequest } from 'ahooks'
import { api_q_autoSaveQuestion, api_q_updateQuestion } from '../../../api/question'

const TitleEdit: React.FC = () => {
  const { title, setPageTitle } = usePageInfoStore()
  const [editState, setEditState] = useState(false)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value.trim()
    if (!newTitle) {
      return
    }
    setPageTitle(newTitle) // 更新页面标题
  }
  if (editState) {
    return <Input onChange={handleChange} onBlur={() => setEditState(false)} onPressEnter={() => setEditState(false)} value={title} />
  }
  return (
    <Space>
      <Typography.Title className="!text-18 !mb-0 !leading-[1]">{title}</Typography.Title>
      <Button onClick={() => setEditState(true)} type="text" icon={<EditOutlined />} />
    </Space>
  )
}

const SaveButton: React.FC<{ initialize_loading: boolean }> = ({ initialize_loading }) => {
  const { title, css, js, desc } = usePageInfoStore()
  const { componentList = [] } = useComponentListStore()
  const { id } = useParams()

  // 手动保存
  const { run: manualSave, loading: manualLoading } = useRequest(
    async () => {
      if (!id) return
      await api_q_updateQuestion(id, { title, css, js, desc, componentList })
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('保存成功')
      },
    }
  )

  const { loading, run: save } = useRequest(
    async () => {
      if (!id) return
      await api_q_autoSaveQuestion(id, { title, css, js, desc, componentList })
    },
    { manual: true }
  )
  useKeyPress(['ctrl.s', 'meta.s'], (e: KeyboardEvent) => {
    e.preventDefault()
    if (!manualLoading) {
      manualSave()
    }
  })
  useDebounceEffect(
    () => {
      if (!initialize_loading) {
        save()
      }
    },
    [title, css, js, desc, componentList],
    { wait: 1000 }
  )
  return (
    <Button loading={loading || manualLoading} onClick={manualSave} icon={<CheckOutlined />}>
      保存
    </Button>
  )
}

/** 发布按钮组件 */
const PublishButton: React.FC = () => {
  const navigate = useNavigate()
  const { title, css, js, desc } = usePageInfoStore()
  const { componentList = [] } = useComponentListStore()
  const { id } = useParams()
  const { loading, run: publish } = useRequest(
    async () => {
      if (!id) return
      await api_q_updateQuestion(id, { title, css, js, desc, componentList, isPublished: true })
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('发布成功')
        navigate('/detail/stat/' + id)
      },
    }
  )
  return (
    <Button onClick={publish} loading={loading} type="primary">
      发布
    </Button>
  )
}

type EditHeaderProps = {
  loading: boolean
}
/** 问卷编辑页头部 */
const EditHeader: React.FC<EditHeaderProps> = ({ loading }) => {
  const navigate = useNavigate()
  return (
    <div py="12" bg="#fff" border="b-solid 1 b-[#e8e8e8]">
      <div flex="~" mx="24">
        <div flex="1">
          <Space>
            <Button onClick={() => navigate(-1)} icon={<LeftOutlined />} type="link">
              返回
            </Button>
            <TitleEdit />
          </Space>
        </div>
        <div flex="1" text-align="center">
          <EditToolBar />
        </div>
        <div flex="1" text-align="right">
          <Space>
            <SaveButton initialize_loading={loading} />
            <PublishButton />
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader
