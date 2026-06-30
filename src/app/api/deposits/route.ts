import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { generateDepositNumber } from '@/lib/utils';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { amount, paymentMethod } = await req.json();

    if (!amount || amount < 10000) {
      return NextResponse.json(
        { message: 'Minimum deposit Rp 10.000' },
        { status: 400 }
      );
    }

    const deposit = await prisma.deposit.create({
      data: {
        userId: session.user.id,
        depositNumber: generateDepositNumber(),
        amount: parseFloat(amount),
        paymentMethod,
        status: 'PENDING',
      },
    });

    return NextResponse.json(
      { success: true, data: deposit },
      { status: 201 }
    );
  } catch (error) {
    console.error('Deposit error:', error);
    return NextResponse.json(
      { message: 'Failed to create deposit' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const deposits = await prisma.deposit.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    return NextResponse.json({ success: true, data: deposits });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch deposits' },
      { status: 500 }
    );
  }
}
