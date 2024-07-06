import React from 'react'
import { useComponentListStore } from '../../../store/componentList'
import { getComponentConfigByType } from '../../../components/QuestionComponents'

type ComponentListProps = {
  selected_component_id: string
  set_selected_component_id: (id: string) => void
  set_selected_component_type: (type: string) => void
}
const ComponentList: React.FC<ComponentListProps> = ({ selected_component_id, set_selected_component_id, set_selected_component_type }) => {
  const { componentList = [] } = useComponentListStore()
  return (
    <div min-h="100%" overflow-y="auto" bg="#fff">
      {componentList
        .filter((c) => !c.isHidden)
        .map((item) => {
          const { fe_id, props, type } = item

          const component_config = getComponentConfigByType(type)
          if (component_config == null) return null
          const { Component } = component_config

          return (
            <div
              hover="border-[#d9d9d9]"
              border-color={`${fe_id === selected_component_id && '#1890ff'}`}
              py="12"
              px="6"
              m="12"
              border="1px solid #fff rounded-3"
              key={fe_id}
              onClick={() => {
                set_selected_component_id(fe_id)
                set_selected_component_type(type)
              }}
            >
              <div className="pointer-events-none opacity-[0.8]">
                <Component {...props} />
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default ComponentList
