// src/components/AttendanceChart.tsx
'use client'

import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

interface DataPoint { day: number; hours: number }

export default function AttendanceChart({ userId }: { userId: number }) {
  const [data, setData] = useState<DataPoint[]>([])

  useEffect(() => {
    fetch(`/api/attendance/summary`)
      .then(r => r.json())
      .then((raw: { date: string; hours: number }[]) => {
        setData(raw.map(d => ({
          day: new Date(d.date).getDate(),
          hours: +d.hours.toFixed(2),
        })))
      })
  }, [userId])

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
        <XAxis dataKey="day" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip formatter={val => `${val}h`} />
        <Bar dataKey="hours" fill="#4CAF50" />
      </BarChart>
    </ResponsiveContainer>
  )
}
