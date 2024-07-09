import { FormOutlined } from '@ant-design/icons'
import { Space, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useUserStore } from '../store/user'
import { HOME_URL, MANAGE_LIST_URL } from '../router'

const { Title } = Typography
const Logo: React.FC = () => {
  const { username } = useUserStore((state) => ({
    username: state.username,
  }))

  const [pathname, setPathname] = useState(HOME_URL)
  useEffect(() => {
    if (username) {
      setPathname(MANAGE_LIST_URL)
    }
  }, [username])
  return (
    <div w="200" my="12" mx="0" text-align="center" style={{ lineHeight: '1' }}>
      <Link to={pathname}>
        <Space>
          <Title style={{ fontSize: '32px', color: '#f7f7f7' }}>
            <FormOutlined />
          </Title>
          <Title style={{ fontSize: '32px', color: '#f7f7f7' }}>测试浅浅问卷</Title>
        </Space>{' '}
      </Link>
    </div>
  )
}

export default Logo
