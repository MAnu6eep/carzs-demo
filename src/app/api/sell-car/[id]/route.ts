import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const authUser = await getAuthUser();
    if (!authUser || authUser.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 403 });
    }

    const { status } = await req.json();

    const lead = await prisma.sellCarLead.update({
      where: { id: params.id },
      data: { status },
    });

    return NextResponse.json({ lead, message: 'Sell lead status updated' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to update lead' }, { status: 500 });
  }
}
