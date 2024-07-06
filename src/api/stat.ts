import { resDataType } from './axios'
import { request } from './request'

/** 获取单个问卷答卷统计列表 */
export const api_s_getQuestionStatList = (
  questionId: string,
  option: {
    page: number
    pageSize: number
  }
): Promise<resDataType> => {
  return request({
    url: `/stat/${questionId}`,
    method: 'get',
    params: option,
  })
}

/** 获取单个组件统计数据汇总*/
export const api_s_getComponentStat = (questionId: string, componentID: string): Promise<resDataType> => {
  return request({
    url: `/stat/${questionId}/${componentID}`,
    method: 'get',
  })
}

/** 获取首页数据汇总*/
export const api_s_get_Home_count = (): Promise<resDataType> => {
  return request({
    url: `/stat/questionCount`,
    method: 'post',
  })
}
