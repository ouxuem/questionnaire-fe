import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN_URL } from '../router'
import { UserOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import { util_removeToken } from '../utils/user-token'
import { useUserStore } from '../store/user'
const UserInfo: React.FC = () => {
  const navigate = useNavigate()

  const {
    username,
    nickname,
    logout: storeLogout,
  } = useUserStore((state) => ({
    username: state.username,
    nickname: state.nickname,
    logout: state.logout,
  }))
  const logout = () => {
    storeLogout()
    util_removeToken()
    message.success('退出成功')
    navigate(LOGIN_URL)
  }
  const UserInfo = (
    <>
      <span color="#e8e8e8">
        <UserOutlined />
        {nickname}
      </span>
      <Button type="link" onClick={logout}>
        退出
      </Button>
    </>
  )
  const Login = <Link to={LOGIN_URL}>登录</Link>
  return <div>{username ? UserInfo : Login}</div>
}

export default UserInfo
