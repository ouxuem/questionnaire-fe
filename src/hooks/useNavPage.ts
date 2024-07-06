import { useEffect } from 'react'
import { useUserStore } from '../store/user'
import { useLocation, useNavigate } from 'react-router-dom'
import { HOME_URL, LOGIN_URL, REGISTER_URL } from '../router'

const useNavPage = (waitingUserInfo: boolean) => {
  const { username } = useUserStore((state) => ({
    username: state.username,
  }))
  const { pathname } = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    if (waitingUserInfo) return
    // 已登录 不允许访问登录/注册页面
    if (username) {
      if ([REGISTER_URL, LOGIN_URL].includes(pathname)) {
        navigate('manage/list')
      }
      return
    }
    // 未登录 导航到登录页面
    if ([REGISTER_URL, LOGIN_URL, HOME_URL].includes(pathname)) {
      return
    } else {
      navigate(LOGIN_URL)
    }
  }, [waitingUserInfo, username, pathname])
}

export default useNavPage
