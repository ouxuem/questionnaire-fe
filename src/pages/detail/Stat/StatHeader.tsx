import { CopyOutlined, LeftOutlined, QrcodeOutlined } from '@ant-design/icons'
import { Popover, Button, Input, InputRef, Space, Tooltip, Typography, message } from 'antd'
import React, { useMemo, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { usePageInfoStore } from '../../../store/pageInfo'
import QRCode from 'qrcode.react'
const StatHeader: React.FC = () => {
  const navigate = useNavigate()
  const { title, isPublished } = usePageInfoStore()
  const { id = '' } = useParams()
  const url_input_ref = useRef<InputRef>(null)
  const copy_url = () => {
    const elem = url_input_ref.current
    if (elem == null) return
    elem.select()
    document.execCommand('copy')
    message.success('复制成功')
  }

  const link_and_QRcode_element = useMemo(() => {
    if (!isPublished) {
      return null
    }
    const protocol = window.location.protocol
    const hostname = window.location.hostname
    const url = `${protocol}//${hostname}:3000/question/${id}`
    const QR_code_element = (
      <div text-align="center">
        <QRCode renderAs="svg" value={url} size={150}></QRCode>
      </div>
    )
    return (
      <Space>
        <Input value={url} w="300" ref={url_input_ref} />
        <Tooltip title="复制链接">
          <Button onClick={copy_url} shape="circle" icon={<CopyOutlined />} />
        </Tooltip>
        <Popover content={QR_code_element}>
          <Button shape="circle" icon={<QrcodeOutlined />} />
        </Popover>
      </Space>
    )
  }, [id, isPublished])

  return (
    <div bg="#fff" border="b-solid 1 b-[#e8e8e8]" py="12">
      <div flex="~" mx="24">
        <div flex="1">
          <Space>
            <Button onClick={() => navigate(-1)} type="link" icon={<LeftOutlined />}>
              返回
            </Button>
            <Typography.Title text="!18" mb="!0" line-height="!1">
              {title}
            </Typography.Title>
          </Space>
        </div>
        <div flex="1" text-align="center">
          {link_and_QRcode_element}
        </div>
        <div flex="1" text-align="right">
          <Button onClick={() => navigate(`/detail/edit/${id}`)} type="primary">
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  )
}

export default StatHeader
