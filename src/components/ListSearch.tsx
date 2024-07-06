import { Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { LIST_SEARCH_PARAM } from '../constant'

const ListSearch: React.FC = () => {
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  useEffect(() => {
    const currentValue = searchParams.get(LIST_SEARCH_PARAM) || ''
    setSearchValue(currentValue)
  }, [searchParams])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }
  const handleSearch = (value: string) => {
    navigate({
      pathname,
      search: `${LIST_SEARCH_PARAM}=${value}`,
    })
  }
  return (
    <div>
      <Input.Search allowClear size="large" value={searchValue} className="w-260" placeholder="请输入关键字" onChange={handleChange} onSearch={handleSearch} />
    </div>
  )
}

export default ListSearch
