import React, { useState } from 'react'
import { api_s_getQuestionStatList } from '../../../api/stat'
import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'
import { Table, Typography, Pagination } from 'antd'
import LoadingSpin from '../../../components/LoadingSpin'
import { useComponentListStore } from '../../../store/componentList'

type PageStatProps = {
  selected_component_id: string
  set_selected_component_id: (id: string) => void
  set_selected_component_type: (type: string) => void
}
const PageStat: React.FC<PageStatProps> = ({ selected_component_id, set_selected_component_id, set_selected_component_type }) => {
  const { componentList = [] } = useComponentListStore()
  const { id = '' } = useParams()
  const [total, set_total] = useState(0)
  const [list, set_list] = useState([])
  const [page, set_page] = useState(1)
  const [page_size, set_page_size] = useState(10)
  const { loading } = useRequest(
    async () => {
      const res = await api_s_getQuestionStatList(id, { page, pageSize: page_size })
      return res
    },
    {
      onSuccess: (data) => {
        const { total, list } = data
        set_total(total)
        set_list(list)
      },
      refreshDeps: [page, page_size, id],
    }
  )

  const columns = componentList.map((item) => {
    const { fe_id, title, props = {}, type } = item
    const col_title = props.title || title
    return {
      dataIndex: fe_id,
      title: (
        <div
          onClick={() => {
            set_selected_component_id(fe_id)
            set_selected_component_type(type)
          }}
          cursor="pointer"
        >
          <span color={fe_id === selected_component_id ? '#1890ff' : ''}>{col_title}</span>
        </div>
      ),
    }
  })

  const data_source = list.map((item: any) => {
    return {
      ...item,
      key: item.id,
    }
  })
  const table_element = (
    <>
      <Table columns={columns} dataSource={data_source} pagination={false} />
      <div text-align="center" mt="18">
        <Pagination
          onShowSizeChange={(page, size) => {
            set_page(page)
            set_page_size(size)
          }}
          total={total}
          pageSize={page_size}
          current={page}
          onChange={(page) => set_page(page)}
        />
      </div>
    </>
  )
  return (
    <div>
      <Typography.Title level={3}>答卷数量：{!loading && total}</Typography.Title>
      {loading && <LoadingSpin isCenter={true} />}
      {!loading && table_element}
    </div>
  )
}

export default PageStat
