/**
 * @description 存储、获取token'
 */

const TOKEN_KEY = 'access_token'
const REFRESH_KEY = 'refresh_token'

export const util_setToken = (access_token?: string, refresh_token?: string) => {
  if (access_token) {
    localStorage.setItem(TOKEN_KEY, access_token)
  }

  if (refresh_token) {
    localStorage.setItem(REFRESH_KEY, refresh_token)
  }
}

export const util_getToken = () => {
  return localStorage.getItem(TOKEN_KEY) || ''
}

export const util_getRefreshToken = () => {
  return localStorage.getItem(REFRESH_KEY) || ''
}

export const util_removeToken = () => {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(REFRESH_KEY)
}
