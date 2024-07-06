import { Spin } from 'antd'
import React from 'react'

type Props = {
  marginTop?: string
  isLarge?: boolean
  isCenter?: boolean
}
const LoadingSpin: React.FC<Props> = ({ marginTop, isLarge, isCenter }) => {
  const centerStyle: React.CSSProperties = isCenter
    ? {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }
    : {}
  return (
    <div
      style={{
        textAlign: 'center',
        marginTop: marginTop,
        ...centerStyle,
      }}
    >
      <Spin size={isLarge ? 'large' : 'default'} />
    </div>
  )
}

export default LoadingSpin
