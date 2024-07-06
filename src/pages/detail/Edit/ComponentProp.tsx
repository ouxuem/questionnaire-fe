import React from 'react'
import { useComponentListStore } from '../../../store/componentList'
import { ComponentPropsType, getComponentConfigByType } from '../../../components/QuestionComponents'

const NoSelected: React.FC = () => {
  return <div text-align="center">未选中组件</div>
}
/** 属性编辑器组件 */
const ComponentProp: React.FC = () => {
  // 获取selectedId 并渲染对应组件
  const { componentList = [], selectedId, changeComponentProps } = useComponentListStore()
  const selectedComponent = componentList.find((item) => item.fe_id === selectedId)
  if (selectedComponent == null) {
    return <NoSelected />
  }
  const { type, props, isLocked, isHidden } = selectedComponent
  const componentConfig = getComponentConfigByType(type)
  if (componentConfig == null) {
    return <NoSelected />
  }
  const { PropComponent } = componentConfig
  const changeProps = (newProps: ComponentPropsType) => {
    // 在这里统一触发修改选中组件信息
    if (selectedComponent == null) {
      return
    }
    const { fe_id } = selectedComponent
    changeComponentProps(fe_id, newProps)
  }
  return <PropComponent {...props} onChange={changeProps} disabled={isLocked || isHidden} />
}

export default ComponentProp
