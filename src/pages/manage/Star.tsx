import React from 'react'
import QuestionCard from '../../components/QuestionCard'
import { useTitle } from 'ahooks'

import { Empty, Typography } from 'antd'
import ListSearch from '../../components/ListSearch'
import useLoadQuestionList from '../../hooks/useLoadQuestionList'
import ListPage from '../../components/ListPage'
import LoadingSpin from '../../components/LoadingSpin'
const Star: React.FC = () => {
  useTitle('浅浅问卷 - 星标问卷')
  const { loading, data = {}, refresh } = useLoadQuestionList({ isStar: true })
  const { list = [], total = 0 } = data
  return (
    <>
      <div flex="~" mb="20">
        <div flex="1">
          <Typography.Title level={3}>星标问卷</Typography.Title>
        </div>
        <div flex="1" text-align="right">
          <ListSearch />
        </div>
      </div>
      <div mb="20">
        {loading && <LoadingSpin isLarge={true} />}
        {!loading && list.length === 0 && <Empty description="暂无数据"></Empty>}
        {!loading &&
          list.length > 0 &&
          list.map((question: any) => {
            const { id } = question
            return <QuestionCard key={id} {...question} refresh={refresh} />
          })}
      </div>
      {!loading && (
        <div flex="~" justify="center">
          <ListPage total={total} />
        </div>
      )}
    </>
  )
}

export default Star
