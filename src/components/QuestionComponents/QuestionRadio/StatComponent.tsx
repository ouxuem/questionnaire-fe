import React, { useMemo } from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'
export type RadioStatComponentProps = {
  stat: Array<{
    name: string
    count: number
  }>
}

const stat_colors = [
  '#8884d8',
  '#82ca9d',
  '#ffc658',
  '#ff6384',
  '#a05195',
  '#e6beff',
  '#3cba92',
  '#ffe119',
  '#469990',
  '#f032e6',
  '#911eb4',
  '#4363d8',
  '#fabebe',
  '#008080',
  '#e6194b',
  '#aaffc3',
  '#9A6324',
  '#fffac8',
  '#800000',
  '#aa6e28',
  '#808000',
  '#ffd8b1',
  '#000075',
  '#808080',
  '#ffffff',
  '#000000',
]

const format = (value: number) => {
  return (value * 100).toFixed(2)
}
const StatComponent: React.FC<RadioStatComponentProps> = ({ stat = [] }) => {
  const sum = useMemo(() => {
    let s = 0
    stat.forEach((item) => (s += item.count))
    return s
  }, [stat])
  return (
    <div w="300" h="400">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie label={(i) => `${i.name}: ${format(i.count / sum)}%`} outerRadius={50} fill="#8884d8" cy="50%" cx="50%" dataKey={'count'} data={stat}>
            {stat.map((_, index) => {
              return <Cell key={index} fill={stat_colors[index]} />
            })}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default StatComponent
