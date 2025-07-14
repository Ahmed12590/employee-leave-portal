// src/app/api/admin/attendance/route.ts

import { NextResponse } from 'next/server'
import { prisma }      from '@/lib/prisma'

export async function GET() {
  // Grab every attendance record, newest first, including the user who did it
  const records = await prisma.attendance.findMany({
    include: {
      user: {
        select: { id: true, name: true }  
      }
    },
    orderBy: { date: 'desc' },
  })

  // Shape them for the client
  const data = records.map(r => ({
    id:       r.id,
    date:     r.date.toISOString().slice(0,10),
    checkIn:  r.checkIn?.toISOString()  || null,
    checkOut: r.checkOut?.toISOString() || null,
    user:     r.user,
  }))

  return NextResponse.json(data)
}
