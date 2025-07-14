import { NextResponse } from 'next/server'
import { prisma }      from '@/lib/prisma'

export async function POST(req: Request) {
  const { userId } = await req.json()
  const today = new Date(new Date().toISOString().slice(0,10))

  const record = await prisma.attendance.update({
    where: { userId_date: { userId, date: today } },
    data:  { checkOut: new Date() },
  })

  return NextResponse.json(record)
}
