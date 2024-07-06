import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import React, { useEffect, useState } from 'react'
import ComponentProp from './ComponentProp'
import PageSetting from './PageSetting'
import { useComponentListStore } from '../../../store/componentList'
enum TAB_KEYS {
  PROP = 'prop',
  SETTING = 'setting',
}

/** 右侧面板 */
const RightPanel: React.FC = () => {
  const { selectedId } = useComponentListStore()
  const [activeKey, setActiveKey] = useState(TAB_KEYS.PROP)
  useEffect(() => {
    
    if (selectedId) {
      setActiveKey(TAB_KEYS.PROP)
    } else {
      setActiveKey(TAB_KEYS.SETTING)
    }
  }, [selectedId])
  const tabsItems = [
    {
      key: TAB_KEYS.PROP,
      label: '属性',
      children: <ComponentProp />,
      icon: <FileTextOutlined />,
    },
    {
      key: TAB_KEYS.SETTING,
      label: '页面设置',
      children: <PageSetting />,
      icon: <SettingOutlined />,
    },
  ]
  return (
    <div>
      <Tabs activeKey={activeKey} items={tabsItems} />
    </div>
  )
}

export default RightPanel
