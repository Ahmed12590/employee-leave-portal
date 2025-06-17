import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
  }

  // ✅ Yeh line yahan lagani hai
  const token = jwt.sign(
  {
    userId: user.id,
    role: user.role,
    name: user.name, // yeh line add karo
  },
  process.env.JWT_SECRET!,
  { expiresIn: '7d' }
);


  return NextResponse.json({ token, userId: user.id }, { status: 200 });
}
