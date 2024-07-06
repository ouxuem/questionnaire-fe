import React from 'react'
import { Outlet } from 'react-router-dom'
import useLoadUserInfo from '../hooks/useLoadUserInfo'
import useNavPage from '../hooks/useNavPage'
import LoadingSpin from '../components/LoadingSpin'

const QuestionLayout: React.FC = () => {
  const { waitingUserInfo } = useLoadUserInfo()
  useNavPage(waitingUserInfo)
  return (
    <div max-h="100vh">
      {waitingUserInfo ? <LoadingSpin isCenter={true} isLarge={true} /> : <Outlet />}
    </div>
  )
}

export default QuestionLayout
