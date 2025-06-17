import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const leaves = await prisma.leave.findMany({
    include: { user: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(leaves);
}

export async function PATCH(req: NextRequest) {
  const { id, status } = await req.json();

  const updated = await prisma.leave.update({
    where: { id },
    data: { status },
  });

  return NextResponse.json(updated);
}
