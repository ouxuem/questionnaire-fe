import { useParams } from 'react-router-dom'
import { api_q_getQuestion } from '../api/question'
import { useRequest } from 'ahooks'
import { useEffect } from 'react'
import { useComponentListStore } from '../store/componentList'
import { usePageInfoStore } from '../store/pageInfo'
/** 获取编辑页面数据 */
const useLoadQuestionData = () => {
  const resetComponents = useComponentListStore((state) => state.resetComponents)
  const { resetPageInfo } = usePageInfoStore()
  const { id = '' } = useParams()

  const { loading, data, error, run } = useRequest(
    async (id: string) => {
      if (!id) throw new Error('没有问卷ID')
      const res = await api_q_getQuestion(id)
      return res
    },
    {
      manual: true,
    }
  )

  useEffect(() => {
    run(id)
  }, [id])

  useEffect(() => {
    if (!data) return
    const { answerCount = 0, title = '', componentList = [], desc = '', js = '', css = '', isPublished = false } = data
    let selectedId = ''
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id
    }
    resetComponents({ componentList, selectedId, copiedComponent: null, answerCount })
    resetPageInfo({ title, desc, js, css, isPublished })
  }, [data])

  return { loading, error }
}

export default useLoadQuestionData
