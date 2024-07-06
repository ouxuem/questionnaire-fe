import { Tabs } from 'antd'
import React from 'react'
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons'
import ComponentLib from './ComponentLib'
import Layers from './Layers'
const LeftPanel: React.FC = () => {
  const tabsItems = [
    {
      key: 'componentLib',
      label: "组件库",
      children: <ComponentLib/>,
      icon: <AppstoreOutlined />
    },
    {
      key: 'layers',
      label: "图层",
      children: <Layers/>,
      icon: <BarsOutlined />
    },
  ]
  return (
      <Tabs
        defaultActiveKey="componentLib"
        items={tabsItems}
      />
  )
}

export default LeftPanel
