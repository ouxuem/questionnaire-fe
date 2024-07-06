import { BarsOutlined, DeleteOutlined, PlusOutlined, StarOutlined } from '@ant-design/icons'
import { Button, Divider, Space, message } from 'antd'
import React from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { api_q_createQuestion } from '../api/question'
import { useRequest } from 'ahooks'
import { MANAGE_LIST_URL } from '../router'
const ManageLayout: React.FC = ({}) => {
  const navigate = useNavigate()

  const { loading, run } = useRequest(api_q_createQuestion, {
    manual: true,
    onSuccess: (res) => {
      navigate(`/detail/edit/${res.id}`)
      message.success('创建成功')
    }
  })
  const { pathname } = useLocation()
  return (
    <div flex="~" w="1200" py="24" px="0" mx="auto" my="0">
      <div w="120">
        <Space direction="vertical">
          <Button loading={loading} onClick={run} type="primary" size="large" icon={<PlusOutlined />}>
            新建问卷
          </Button>
          <Divider style={{ borderTop: 'transparent' }} />
          <Button onClick={() => navigate(MANAGE_LIST_URL)} type={pathname.startsWith(MANAGE_LIST_URL) ? 'default' : 'text'} size="large" icon={<BarsOutlined />}>
            我的问卷
          </Button>
          <Button onClick={() => navigate('/manage/star')} type={pathname.startsWith('/manage/star') ? 'default' : 'text'} size="large" icon={<StarOutlined />}>
            星标问卷
          </Button>
          <Button onClick={() => navigate('/manage/trash')} type={pathname.startsWith('/manage/trash') ? 'default' : 'text'} size="large" icon={<DeleteOutlined />}>
            回收站
          </Button>
        </Space>
      </div>
      <div ml="60" flex="1">
        <Outlet />
      </div>
    </div>
  )
}

export default ManageLayout
