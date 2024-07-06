import React, { useState } from 'react'
import { useRequest, useTitle } from 'ahooks'
import { Empty, Typography, Table, TableColumnsType, Tag, Space, Button, Modal, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import ListSearch from '../../components/ListSearch'
import useLoadQuestionList from '../../hooks/useLoadQuestionList'
import ListPage from '../../components/ListPage'
import { api_q_deleteQuestion, api_q_updateQuestion } from '../../api/question'
import LoadingSpin from '../../components/LoadingSpin'
const Trash: React.FC = () => {
  const { loading: deleteLoading, run: deleteAction } = useRequest(async () => await api_q_deleteQuestion(selectedIds), {
    manual: true,
    onSuccess: () => {
      message.success('删除成功')
      refresh()
      setSelectedIds([])
    },
  })

  const del = () => {
    Modal.confirm({
      title: '确认删除该问卷？',
      content: '删除后将无法恢复，请谨慎操作！',
      onOk: deleteAction,
      icon: <ExclamationCircleOutlined />,
      okText: '确定',
      cancelText: '取消',
    })
  }
  useTitle('浅浅问卷 - 回收站')
  const { loading: recoverLoading, run: recoverAction } = useRequest(
    async () => {
      for await (const id of selectedIds) {
        await api_q_updateQuestion(id, { isDeleted: false })
      }
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('恢复成功')
        refresh()
        setSelectedIds([])
      },
    }
  )
  const { loading, data = {}, refresh } = useLoadQuestionList({ isDeleted: true })
  const { list = [], total = 0 } = data

  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const columns: TableColumnsType = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      render: (isPublished: boolean) => (isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>),
    },
    {
      title: '答卷',
      dataIndex: 'answerCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
    },
  ]
  return (
    <>
      <div flex="~" mb="20">
        <div flex="1">
          <Typography.Title level={3}>回收站</Typography.Title>
        </div>
        <div flex="1" text-align="right">
          <ListSearch />
        </div>
      </div>
      <div mb="20">
        {loading && <LoadingSpin isLarge={true} />}
        {!loading && list.length === 0 && <Empty description="暂无数据"></Empty>}
        {!loading && list.length > 0 && (
          <>
            <div mb="16">
              <Space>
                <Button loading={recoverLoading} onClick={recoverAction} type="primary" disabled={selectedIds.length === 0}>
                  恢复
                </Button>
                <Button loading={deleteLoading} onClick={del} danger disabled={selectedIds.length === 0}>
                  彻底删除
                </Button>
              </Space>
            </div>
            <Table
              rowSelection={{
                type: 'checkbox',
                onChange: (selectedRowKeys) => {
                  setSelectedIds(selectedRowKeys as string[])
                },
              }}
              dataSource={list}
              pagination={false}
              columns={columns}
              rowKey="id"
            />
          </>
        )}
      </div>
      {!loading && (
        <div text-align="center">
          <ListPage total={total} />
        </div>
      )}
    </>
  )
}

export default Trash
