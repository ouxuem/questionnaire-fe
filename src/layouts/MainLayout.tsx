import React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import Logo from '../components/Logo'
import UserInfo from '../components/UserInfo'
import useLoadUserInfo from '../hooks/useLoadUserInfo'
import useNavPage from '../hooks/useNavPage'
import LoadingSpin from '../components/LoadingSpin'
const { Header, Footer, Content } = Layout
const MainLayout: React.FC = ({}) => {
  const { waitingUserInfo } = useLoadUserInfo()
  useNavPage(waitingUserInfo)

  return (
    <Layout>
      <Header px="24" py="0">
        <div className="float-left">
          <Logo />
        </div>
        <div className="float-right">
          <UserInfo />
        </div>
      </Header>
      <Layout className="min-h[calc(100vh-135px)]">
        <Content>{waitingUserInfo ? <LoadingSpin isCenter={true} isLarge={true} /> : <Outlet />}</Content>
      </Layout>
      <Footer text-align="center" bg="#f7f7f7" border="t-solid 1 t-[#e8e8e8]">
        浅浅问卷 &copy; 2024 - present . Created by OXM
      </Footer>
    </Layout>
  )
}

export default MainLayout
