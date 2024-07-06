import { CopyOutlined, DeleteOutlined, EditOutlined, ExclamationCircleOutlined, LineChartOutlined, StarOutlined } from '@ant-design/icons'
import { Button, Divider, Space, Tag, Popconfirm, Modal, message, Tooltip } from 'antd'
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { api_q_copyQuestion, api_q_updateQuestion } from '../api/question'
import { useRequest } from 'ahooks'

type QuestionCardProps = {
  id: string
  title: string
  isStar: boolean
  isPublished: boolean
  answerCount: number
  createdAt: string
  refresh?: () => void
}

const QuestionCard: React.FC<QuestionCardProps> = ({ id, title, isStar, isPublished, answerCount, createdAt, refresh }) => {
  const navigate = useNavigate()
  const [isStarState, setIsStarState] = useState(isStar)
  const [isDeletedState, setIsDeletedState] = useState(false)
  const [isPublishedState, setIsPublishedState] = useState(isPublished)
  const [answerCountState, setAnswerCountState] = useState(answerCount)
  // 通用的更新问卷函数
  const useUpdateQuestion = (updateField: string) => {
    return useRequest(
      async (value: boolean) => {
        await api_q_updateQuestion(id, { [updateField]: value })
      },
      {
        manual: true,
        onSuccess: (_, [value]) => {
          if (updateField === 'isDeleted') {
            if (refresh) {
              refresh()
            } else {
              setIsDeletedState(true)
            }
            message.success('删除成功')
          } else if (updateField === 'isStar') {
            setIsStarState(value)
            message.success('操作成功')
          } else if (updateField === 'isPublished') {
            if (refresh) {
              refresh()
            } else {
              setIsPublishedState(value)
              setAnswerCountState(0)
            }
            message.success(value ? '发布成功' : '取消发布成功')
          }
        },
      }
    )
  }

  const { run: updateDelete, loading: deleteQuestionLoading } = useUpdateQuestion('isDeleted')
  const { run: updateStar, loading: updateStarLoading } = useUpdateQuestion('isStar')
  const { run: updatePublish, loading: updatePublishLoading } = useUpdateQuestion('isPublished')

  const del = () => {
    Modal.confirm({
      title: '确认删除该问卷？',
      onOk: () => updateDelete(true),
      icon: <ExclamationCircleOutlined />,
      okText: '确定',
      cancelText: '取消',
    })
  }

  // 取消发布

  const cancelPublish = () => {
    Modal.confirm({
      title: '取消发布将失去所有答卷，确认取消发布？',
      onOk: () => updatePublish(false),
      icon: <ExclamationCircleOutlined />,
      okText: '确定',
      cancelText: '取消',
    })
  }

  const { run: copyQuestion, loading: copyQuestionLoading } = useRequest(
    async () => {
      const res = await api_q_copyQuestion(id)
      return res
    },
    {
      manual: true,
      onSuccess: (res: any) => {
        navigate(`/detail/edit/${res.id}`)
        message.success('复制成功')
      },
    }
  )

  if (isDeletedState) return null
  return (
    <div mb="20" p="12" border="rounded-3" bg="#fff" hover="shadow-[0_4px_10px_#e8e8e8]">
      <div flex="~">
        <div flex="1">
          <Link to={isPublishedState ? `/detail/stat/${id}` : `/detail/edit/${id}`}>
            <Space>
              {isStarState && <StarOutlined color="yellow" />}
              {title}
            </Space>
          </Link>
        </div>
        <div flex="1" text-align="right" font-size="12">
          <Space>
            {isPublishedState ? (
              <Button loading={updatePublishLoading} onClick={cancelPublish} danger size="small">
                取消发布
              </Button>
            ) : (
              <Tag>未发布</Tag>
            )}
            <span>答卷：{answerCountState}</span>
            <span>{createdAt}</span>
          </Space>
        </div>
      </div>
      <Divider className="my-12" />
      <div flex="~">
        <div flex="1">
          <Space>
            {isPublishedState ? (
              <>
                <Tooltip title="已发布问卷暂不支持编辑">
                  <Button disabled type="text" size="small" icon={<EditOutlined />}>
                    编辑问卷
                  </Button>
                </Tooltip>
              </>
            ) : (
              <Button onClick={() => navigate(`/detail/edit/${id}`)} type="text" size="small" icon={<EditOutlined />}>
                编辑问卷
              </Button>
            )}
            <Button disabled={!isPublishedState} onClick={() => navigate(`/detail/stat/${id}`)} type="text" size="small" icon={<LineChartOutlined />}>
              数据统计
            </Button>
          </Space>
        </div>
        <div flex="1" text-align="right">
          <Space>
            <Button loading={updateStarLoading} onClick={() => updateStar(!isStarState)} type="text" size="small" icon={<StarOutlined />}>
              {isStarState ? '取消标星' : '标星'}
            </Button>
            <Popconfirm title="确认复制该问卷？" onConfirm={copyQuestion} okText="确定" cancelText="取消">
              <Button loading={copyQuestionLoading} type="text" size="small" icon={<CopyOutlined />}>
                复制
              </Button>
            </Popconfirm>
            <Button loading={deleteQuestionLoading} onClick={del} type="text" size="small" icon={<DeleteOutlined />}>
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
