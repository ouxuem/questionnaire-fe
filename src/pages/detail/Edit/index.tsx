import React from 'react'
import EditCanvas from './EditCanvas'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import { useComponentListStore } from '../../../store/componentList'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import EditHeader from './EditHeader'
import { useTitle } from 'ahooks'
import { usePageInfoStore } from '../../../store/pageInfo'

const Edit: React.FC = () => {
  const { loading } = useLoadQuestionData()
  const { changeSelectedId } = useComponentListStore()
  const { title } = usePageInfoStore()
  useTitle(`问卷编辑 - ${title}`)
  const clearSelectedId = () => {
    changeSelectedId('')
  }

  // flex="auto"
  return (
    <div flex="~ col" h="100vh" bg="#f0f2f5">
      <div bg="#fff">
        <EditHeader loading={loading} />
      </div>
      <div py="12" flex="auto">
        <div mx="24" flex="~" h="100%">
          {/* 左边 */}
          <div w="295" bg="#fff" px="12">
            <LeftPanel />
          </div>
          {/* 中 */}

          <div onClick={() => clearSelectedId()} flex="1 ~ items-center justify-center" overflow="hidden">
            <div shadow="[0_2px_10px_#0000001f]" overflow="auto" w="400" h="712">
              <EditCanvas loading={loading} />
            </div>
          </div>

          {/* 右边 */}
          <div w="300" bg="#fff" px="12">
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit
