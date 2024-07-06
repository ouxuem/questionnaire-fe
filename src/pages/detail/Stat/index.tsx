import React, { useEffect, useMemo, useState } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import { Button, Result } from 'antd'
import { usePageInfoStore } from '../../../store/pageInfo'
import { useNavigate } from 'react-router-dom'
import { useTitle } from 'ahooks'
import StatHeader from './StatHeader'
import ComponentList from './ComponentList'
import PageStat from './PageStat'
import LoadingSpin from '../../../components/LoadingSpin'
import ChartStat from './ChartStat'

const Stat: React.FC = () => {
  const [selected_component_id, set_selected_component_id] = useState('')
  const [selected_component_type, set_selected_component_type] = useState('')
  const navigate = useNavigate()
  const { loading } = useLoadQuestionData()
  const { isPublished, title } = usePageInfoStore()
  useTitle(`问卷统计 - ${title}`)
  const LoadingElement = <LoadingSpin isCenter={true} />
  const [isDataReady, setIsDataReady] = useState(false)
  useEffect(() => {
    if (!loading && isPublished !== undefined) {
      setIsDataReady(true)
    }
  }, [loading, isPublished])

  const content = useMemo(() => {
    if (!isDataReady) {
      return LoadingElement
    }

    if (typeof isPublished === 'boolean' && !isPublished) {
      return (
        <div flex="1">
          <Result
            status="warning"
            title="该问卷尚未发布"
            extra={
              <Button onClick={() => navigate(-1)} type="primary">
                返回
              </Button>
            }
          />
        </div>
      )
    }
    return (
      <>
        <div w="350" mr="24">
          <ComponentList selected_component_id={selected_component_id} set_selected_component_id={set_selected_component_id} set_selected_component_type={set_selected_component_type} />
        </div>
        <div flex="auto" bg="#fff" py="12" px="18">
          <PageStat selected_component_id={selected_component_id} set_selected_component_id={set_selected_component_id} set_selected_component_type={set_selected_component_type} />
        </div>
        <div overflow="hidden" bg="#fff" w="400" ml="24" py="12" px="18">
          <ChartStat selected_component_id={selected_component_id} selected_component_type={selected_component_type} />
        </div>
      </>
    )
  }, [isDataReady, isPublished, navigate, selected_component_id, selected_component_type])
  return (
    <div flex="~ col" bg="#f0f2f5" min-h="100vh">
      <StatHeader />
      <div py="12" flex="auto">
        {loading && LoadingElement}
        {!loading && (
          <div mx="24" flex="~">
            {content}
          </div>
        )}
      </div>
    </div>
  )
}

export default Stat
