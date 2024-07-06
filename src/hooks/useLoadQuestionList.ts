import { useSearchParams } from 'react-router-dom'
import { api_q_getQuestionList } from '../api/question'
import { useRequest } from 'ahooks'
import { LIST_SEARCH_PARAM } from '../constant'

type optionType = {
  isStar: boolean
  isDeleted: boolean
}

/** 搜索问卷列表  */
const useLoadQuestionList = (options: Partial<optionType> = {}) => {
  const { isStar, isDeleted } = options
  const [searchParams] = useSearchParams()
  const { loading, data, error ,refresh} = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_PARAM) || ''
      const page = parseInt(searchParams.get('page') || '') || 1
      const pageSize = parseInt(searchParams.get('pageSize') || '') || 10
      const res = await api_q_getQuestionList({ keyword, isStar, isDeleted, page, pageSize })
      return res
    },
    {
      refreshDeps: [searchParams],
    }
  )

  return { loading, data, error,refresh }
}

export default useLoadQuestionList
