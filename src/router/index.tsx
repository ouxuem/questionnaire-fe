import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import ManageLayout from '../layouts/ManageLayout'
import QuestionLayout from '../layouts/QuestionLayout'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import NotFound from '../pages/NotFound'
import { lazy, ReactNode, Suspense } from 'react'

// 路由懒加载
const Edit = lazy(() => import('../pages/detail/Edit'))
const Stat = lazy(() => import('../pages/detail/Stat'))
const Star = lazy(() => import('../pages/manage/Star'))
const Trash = lazy(() => import('../pages/manage/Trash'))
const List = lazy(() => import('../pages/manage/List'))

import LoadingSpin from '../components/LoadingSpin'

const lazyComponent = (element: ReactNode): ReactNode => {
  return <Suspense fallback={<LoadingSpin isCenter={true} />}>{element}</Suspense>
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: lazyComponent(<Home />),
      },
      {
        path: 'login',
        element: lazyComponent(<Login />),
      },
      {
        path: 'register',
        element: lazyComponent(<Register />),
      },
      {
        path: 'manage',
        element: <ManageLayout />,
        children: [
          {
            path: 'list',
            element: lazyComponent(<List />),
          },
          {
            path: 'trash',
            element: lazyComponent(<Trash />),
          },
          {
            path: 'star',
            element: lazyComponent(<Star />),
          },
        ],
      },
      {
        path: '*',
        element: lazyComponent(<NotFound />),
      },
    ],
  },
  {
    path: 'detail',
    element: <QuestionLayout />,
    children: [
      {
        path: 'edit/:id',
        element: lazyComponent(<Edit />),
      },
      {
        path: 'stat/:id',
        element: lazyComponent(<Stat />),
      },
    ],
  },
])
export default router

export const LOGIN_URL = '/login'
export const REGISTER_URL = '/register'
export const MANAGE_LIST_URL = '/manage/list'
export const HOME_URL = '/'





// 登录页能获取info接口
// 时不时会跳到登录页
// 编辑点击发布页面会闪烁一秒的未发布
