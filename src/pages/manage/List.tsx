import React, { useEffect, useMemo, useRef, useState } from 'react'
import QuestionCard from '../../components/QuestionCard'
import { Empty, Typography } from 'antd'
import ListSearch from '../../components/ListSearch'
import { useTitle, useDebounceFn, useRequest } from 'ahooks'
import { useSearchParams } from 'react-router-dom'
import { api_q_getQuestionList } from '../../api/question'
import LoadingSpin from '../../components/LoadingSpin'
const List: React.FC = () => {
  useTitle('问卷列表')
  const [searchParams] = useSearchParams()
  const [list, setList] = useState([])
  const [page, setPage] = useState(1)
  const [started, setStarted] = useState(false)
  const [total, setTotal] = useState(0)

  const keyword = searchParams.get('keyword') || ''
  useEffect(() => {
    setList([])
    setPage(1)
    setStarted(false)
    setTotal(0)
  }, [keyword])
  const { run: load, loading } = useRequest(
    async () => {
      const res = await api_q_getQuestionList({
        page,
        pageSize: 10,
        keyword,
      })
      return res
    },
    {
      manual: true,
      onSuccess: (res) => {
        const { list: listData, total } = res
        setList(list.concat(listData))
        setTotal(total)
        setPage(page + 1)
      },
    }
  )
  const { run: handleLoadMore } = useDebounceFn(
    () => {
      const e = loadMoreDivRef.current
      if (e === null) {
        return
      }
      const domRect = e.getBoundingClientRect()
      if (domRect === null) {
        return
      }
      const { bottom } = domRect
      if (bottom <= document.body.clientHeight) {
        load()
        setStarted(true)
      }
    },
    { wait: 1000 }
  )

  const haveMore = list.length < total

  useEffect(() => {
    handleLoadMore()
  }, [searchParams])

  useEffect(() => {
    if (haveMore) {
      window.addEventListener('scroll', handleLoadMore)
    }
    return () => {
      window.removeEventListener('scroll', handleLoadMore)
    }
  }, [searchParams, haveMore])

  const loadMoreDivRef = useRef<HTMLDivElement>(null)

  const loadSpin = useMemo(() => {
    if (!started || loading) return <LoadingSpin isLarge={true} />
    if (total === 0) return <Empty description="暂无数据" />
    if (!haveMore) return <span>没有更多了</span>
    return <span>开始加载更多......</span>
  }, [started, loading, total, haveMore])
  return (
    <>
      <div flex="~" mb="20">
        <div flex="1">
          <Typography.Title level={3}>我的问卷</Typography.Title>
        </div>
        <div flex="1" text-align="right">
          <ListSearch />
        </div>
      </div>
      <div mb="20">
        {list.length > 0 &&
          list.map((question: any) => {
            const { id } = question
            return <QuestionCard key={id} {...question} />
          })}
      </div>
      <div text-align="center">
        <div ref={loadMoreDivRef}>{loadSpin}</div>
      </div>
    </>
  )
}

export default List
