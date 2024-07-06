import { Button, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MANAGE_LIST_URL } from '../router'
import { useRequest } from 'ahooks'
import { api_s_get_Home_count } from '../api/stat'
const Home: React.FC = () => {
  const nav = useNavigate()
  const [statistics, setStatistics] = useState({
    question_total: 0,
    published_question_total: 0,
    answer_count: 0,
  })

  const { run } = useRequest(
    async () => {
      return await api_s_get_Home_count()
    },
    {
      onSuccess: (data: any) => {
        setStatistics(data)
      },
      manual: true,
    }
  )
  useEffect(() => {
    run()
  }, [])
  return (
    <div
      flex="~ col items-center"
      justify="center"
      h="[calc(100vh-145px)]"
      style={{
        backgroundImage: 'linear-gradient(to top, #5ee7df 0%, #b490ca 100%)',
      }}
    >
      <div text-align="center">
        <Typography.Title level={2}>问卷调查 | 在线投票</Typography.Title>
        <Typography.Paragraph>
          已累计创建问卷 {statistics.question_total} 份，发布问卷 {statistics.published_question_total} 份，收到答卷 {statistics.answer_count} 份
        </Typography.Paragraph>
        <div>
          <Button style={{ height: '60px', fontSize: '24px' }} type="primary" onClick={() => nav(MANAGE_LIST_URL)}>
            开始使用
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Home
