import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

interface PaymentData {
  transactionId: string;
  amount: number;
  paymentMethod: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  referenceNumber?: string;
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const payload: PaymentData = await req.json();

    // Update transaction status
    const transaction = await prisma.transaction.update({
      where: { id: payload.transactionId },
      data: {
        status: payload.status === 'SUCCESS' ? 'SUCCESS' : 'FAILED',
        referenceNumber: payload.referenceNumber,
      },
    });

    return NextResponse.json(
      { success: true, message: 'Payment status updated', data: transaction },
      { status: 200 }
    );
  } catch (error) {
    console.error('Payment webhook error:', error);
    return NextResponse.json(
      { message: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
