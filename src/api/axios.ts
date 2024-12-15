import { util_getRefreshToken, util_getToken, util_setToken } from './../utils/user-token'
import { message } from 'antd'
import axios, { AxiosRequestConfig } from 'axios'
// 定义获取当前路径的函数
const getCurrentPath = () => {
  return window.location.pathname
}
type PendingTask = {
  config: AxiosRequestConfig
  resolve: Function
}

export type resType = {
  code: number
  msg?: string
  data?: resDataType
}

export type resDataType = {
  [key: string]: any
}
let refreshing = false
const queue: PendingTask[] = []

const axiosInstance = axios.create({
  // baseURL: 'http://127.0.0.1:3005/api',
  // hq
  // baseURL: 'http://192.168.31.219:5001/api',
  // nest
  baseURL: 'http://116.198.237.82/api',
  timeout: 10 * 1000,
})

const refreshToken = async () => {
  const res: any = await axiosInstance.get('/auth/refresh', {
    params: {
      refreshToken: util_getRefreshToken(),
    },
  })
  util_setToken(res.access_token)
  return res
}

axiosInstance.interceptors.request.use(function (config) {
  const access_token = util_getToken()
  if (access_token) {
    config.headers.authorization = 'Bearer ' + access_token
  }
  return config
})

axiosInstance.interceptors.response.use(
  async (response) => {
    const res = (response.data || {}) as resType
    const { code, msg, data } = res
    const { config } = response
    if (code === 401) {
      if (refreshing) {
        return new Promise((resolve) => {
          queue.push({
            config,
            resolve,
          })
        })
      }

      if (!config.url?.includes('/auth/refresh')) {
        refreshing = true
        const res = await refreshToken()
        refreshing = false
        if (res) {
          queue.forEach(({ config, resolve }) => {
            resolve(axiosInstance(config))
          })
          queue.length = 0
          return axiosInstance(config)
        } else {
          if (getCurrentPath() !== '/login') {
            setTimeout(() => {
              window.location.href = '/login'
            }, 1000)
          }
        }
      }
    }
    if (code !== 0) {
      // 错误提示
      if (msg) {
        message.error(msg)
      }
      return Promise.reject(new Error(msg))
    }
    return data as any
  },
  async (error) => {
    if (!error.response) {
      return Promise.reject(error)
    }
    message.error(error.response.data.msg || '请求失败')
    return Promise.reject(new Error('请求失败'))
  }
)

export default axiosInstance
