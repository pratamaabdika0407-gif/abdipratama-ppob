import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const [totalUsers, totalTransactions, totalDeposits, totalCommissions] = await Promise.all([
      prisma.user.count(),
      prisma.transaction.count(),
      prisma.deposit.count(),
      prisma.commission.count(),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        totalUsers,
        totalTransactions,
        totalDeposits,
        totalCommissions,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch overview' },
      { status: 500 }
    );
  }
}