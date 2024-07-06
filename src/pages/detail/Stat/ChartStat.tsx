import { Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { api_s_getComponentStat } from '../../../api/stat'
import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'
import { getComponentConfigByType } from '../../../components/QuestionComponents'

type ChartStatProps = {
  selected_component_id: string
  selected_component_type: string
}

const ChartStat: React.FC<ChartStatProps> = ({ selected_component_id, selected_component_type }) => {
  const { id = '' } = useParams()
  const [stat, set_stat] = useState([])
  const { run } = useRequest(async (question_id, component_id) => await api_s_getComponentStat(question_id, component_id), {
    manual: true,
    onSuccess: (data) => {

      set_stat(data.stat)
    },
  })
  useEffect(() => {
    if (selected_component_id) {
      run(id, selected_component_id)
    }
  }, [id, selected_component_id])

  const generate_stat_chart = () => {
    if (!selected_component_id) {
      return <div>未选中组件</div>
    }
    const { StatComponent } = getComponentConfigByType(selected_component_type) || {}
    if (StatComponent == null) {
      return <div>暂不支持该组件的统计图表</div>
    }
    return <StatComponent stat={stat} />
  }
  return (
    <>
      <Typography.Title level={3}>图表统计</Typography.Title>
      <div>{generate_stat_chart()}</div>
    </>
  )
}

export default ChartStat
