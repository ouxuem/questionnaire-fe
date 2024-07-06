import React, { useCallback } from 'react'
import { ComponentConfigType, componentConfigGroup } from '../../../components/QuestionComponents'
import { Typography } from 'antd'
import { useComponentListStore } from '../../../store/componentList'
import { nanoid } from 'nanoid'
/** 生成组件 */
const genComponent = (config: ComponentConfigType) => {
  const { title, type, Component, defaultProps } = config
  const { addComponent } = useComponentListStore()

  const handleClick = useCallback(() => {
    addComponent({ fe_id: nanoid(), title, type, props: defaultProps })
  }, [])
  return (
    <div key={type} onClick={handleClick} hover="border-[#d9d9d9]" cursor="pointer" bg="#fff" border="1px solid #fff rounded-3" p="12">
      <div className="pointer-events-none">
        <Component />
      </div>
    </div>
  )
}
const ComponentLib: React.FC = () => {
  return (
    <div>
      {componentConfigGroup.map((item, index) => {
        return (
          <div key={item.groupId}>
            <Typography.Title mt={`${index > 0 ? 20 : 0}`} text="!16" level={3}>
              {item.groupName}
            </Typography.Title>
            <div>{item.components.map((c) => genComponent(c))}</div>
          </div>
        )
      })}
    </div>
  )
}

export default ComponentLib
