import { useEffect, useState } from 'react'
import { useUserStore } from '../store/user'
import { api_user_info } from '../api/user'
import { useRequest } from 'ahooks'
const useLoadUserInfo = () => {
  const [waitingUserInfo, setWaitingUserInfo] = useState(true)
  const { username, login } = useUserStore((state) => ({
    username: state.username,
    login: state.login,
  }))
  const { run } = useRequest(api_user_info, {
    manual: true,
    onSuccess: (res) => {
      const { username, nickname } = res
      login({ username, nickname })
    },
    onFinally: () => {
      setWaitingUserInfo(false)
    },
  })

  useEffect(() => {
    if (username) {
      setWaitingUserInfo(false)
      return
    }
    run()
  }, [username])

  return { waitingUserInfo }
}

export default useLoadUserInfo
