import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

type RouteParams = {
  params: {
    id: string;
  };
};

export async function GET(req: NextRequest, { params }: RouteParams) {
  const userId = parseInt(params.id);

  const leaves = await prisma.leave.findMany({
    where: { userId },
  });

  return NextResponse.json(leaves);
}

export async function POST(req: NextRequest, { params }: RouteParams) {
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