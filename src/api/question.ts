import { resDataType } from './axios'
import { request } from './request'

/** 获取单个问卷信息 */
export const api_q_getQuestion = (id: string): Promise<resDataType> => {
  return request({
    url: `/question/${id}`,
    method: 'get',
  })
}

/** 创建问卷 */
export const api_q_createQuestion = (): Promise<resDataType> => {
  return request({
    url: '/question',
    method: 'post',
  })
}

type SearchOption = {
  keyword: string
  isStar: boolean
  isDeleted: boolean
  pageSize: number
  page: number
}

/** 获取问卷列表 */
export const api_q_getQuestionList = (options: Partial<SearchOption> = {}): Promise<resDataType> => {
  return request({
    url: '/question',
    method: 'get',
    params: options,
  })
}

/** 更新单个问卷 */
export const api_q_updateQuestion = (
  id: string,
  options: {
    [key: string]: any
  }
): Promise<resDataType> => {
  return request({
    url: `/question/${id}`,
    method: 'patch',
    data: options,
  })
}

/** 更新单个问卷 */
export const api_q_autoSaveQuestion = (
  id: string,
  options: {
    [key: string]: any
  }
): Promise<resDataType> => {
  return request({
    url: `/question/autosave/${id}`,
    method: 'post',
    data: options,
  })
}

/** 复制问卷 */
export const api_q_copyQuestion = (id: string): Promise<resDataType> => {
  return request({
    url: `/question/copy/${id}`,
    method: 'post',
  })
}

/** 批量彻底删除 */
export const api_q_deleteQuestion = (ids: string[]): Promise<resDataType> => {
  return request({
    url: `/question`,
    method: 'delete',
    data: { ids },
  })
}
