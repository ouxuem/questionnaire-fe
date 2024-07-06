import React from 'react'
import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import { MANAGE_LIST_URL } from '../router'
const NotFound: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉，您访问的页面不存在"
      extra={
        <Button onClick={() => navigate(MANAGE_LIST_URL)} type="primary">
          返回首页
        </Button>
      }
    />
  )
}

export default NotFound
