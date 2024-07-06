import { AxiosRequestConfig } from 'axios'
import axiosInstance from './axios'

class RequestManager {
  private hasRequest: Set<string>
  private cacheMap: Map<string, { data: any; expiry: number }>

  constructor() {
    this.hasRequest = new Set()
    this.cacheMap = new Map()
  }

  // 生成缓存键
  private generateCacheKey(url: string, params?: any, data?: any): string {
    const paramsString = params ? JSON.stringify(params) : ''
    const dataString = data ? JSON.stringify(data) : ''
    return `${url}?${paramsString}&${dataString}`
  }

  // 检查是否有缓存并且缓存是否过期
  private checkCache(url: string, params?: any, data?: any): any {
    const cacheKey = this.generateCacheKey(url, params, data)
    const cacheEntry = this.cacheMap.get(cacheKey)
    if (cacheEntry) {
      if (cacheEntry.expiry > Date.now()) {
        return cacheEntry.data
      } else {
        // 缓存过期，删除缓存
        this.cacheMap.delete(cacheKey)
      }
    }
    return null
  }

  // 添加请求到正在进行的请求集
  private addRequest(url: string, params?: any, data?: any): boolean {
    const cacheKey = this.generateCacheKey(url, params, data)
    if (this.hasRequest.has(cacheKey)) {
      return false
    }
    this.hasRequest.add(cacheKey)
    return true
  }

  // 移除正在进行的请求
  private removeRequest(url: string, params?: any, data?: any): void {
    const cacheKey = this.generateCacheKey(url, params, data)
    this.hasRequest.delete(cacheKey)
  }

  // 缓存响应，增加过期时间
  private cacheResponse(url: string, params: any, data: any, responseData: any, expiresIn: number = 30000): void {
    const cacheKey = this.generateCacheKey(url, params, data)
    const expiry = Date.now() + expiresIn
    this.cacheMap.set(cacheKey, { data: responseData, expiry })
  }

  public request(config: AxiosRequestConfig<any>): Promise<any> {
    const url = config.url as string
    const params = config.params
    const data = config.data
    const cachedResponse = this.checkCache(url, params, data)
    
    if (cachedResponse) {
      return Promise.resolve(cachedResponse)
    }

    if (!this.addRequest(url, params, data)) {
      return Promise.reject({ msg: '请求重复' })
    }

    return axiosInstance(config)
      .then((res) => {
        this.removeRequest(url, params, data)
        this.cacheResponse(url, params, data, res.data)
        return res
      })
      .catch((error) => {
        this.removeRequest(url, params, data)
        throw error
      })
  }
}

const requestManager = new RequestManager()
const request = requestManager.request.bind(requestManager)

export { request, axiosInstance as initRequest }
