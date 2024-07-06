import { Pagination } from 'antd'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

type ListPageProps = {
  total: number
}

const ListPage: React.FC<ListPageProps> = ({ total }) => {
  const [current, setCurrent] = useState(2)
  const [pageSize, setPageSize] = useState(10)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '') || 1
    setCurrent(page)
    const pageSize = parseInt(searchParams.get('pageSize') || '') || 10
    setPageSize(pageSize)
  }, [searchParams])
  return (
    <Pagination
      onChange={(page, pageSize) => {
        searchParams.set('page', page.toString())
        searchParams.set('pageSize', pageSize.toString())
        navigate({
          pathname,
          search: searchParams.toString(),
        })
      }}
      current={current}
      pageSize={pageSize}
      total={total}
    />
  )
}

export default ListPage
