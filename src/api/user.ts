import { resDataType } from './axios'
import { request } from './request'

export const api_user_login = (username: string, password: string,remember:boolean): Promise<resDataType> => {
  return request({
    url: '/auth',
    method: 'post',
    data: {
      username,
      password,
      remember
    },
  })
}

export const api_user_info = (): Promise<resDataType> => {
  return request({
    url: '/user/info',
    method: 'get',
  })
}

export const api_user_register = (username: string, password: string, nickname?: string): Promise<resDataType> => {
  return request({
    url: '/user/register',
    method: 'post',
    data: {
      username,
      password,
      nickname: nickname || username,
    },
  })
}

