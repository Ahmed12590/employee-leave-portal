import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(_: any, { params }: { params: { id: string } }) {
  const userId = parseInt(params.id);
  const leaves = await prisma.leave.findMany({ where: { userId } });
  return NextResponse.json(leaves);
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const userId = parseInt(params.id);
  const body = await req.json();

  const newLeave = await prisma.leave.create({
    data: {
      reason: body.reason,
      fromDate: new Date(body.fromDate),
      toDate: new Date(body.toDate),
      userId,
    },
  });

  return NextResponse.json(newLeave);
}
