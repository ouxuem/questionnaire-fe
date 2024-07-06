import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
export type CheckboxStatComponentProps = {
  stat: Array<{
    name: string
    count: number
  }>
}
const StatComponent: React.FC<CheckboxStatComponentProps> = ({ stat }) => {
  return (
    <div w="300" h="400">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart margin={{ top: 5, right: 30, left: 0, bottom: 5 }} width={400} height={300} data={stat}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default StatComponent
