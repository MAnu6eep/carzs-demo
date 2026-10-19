import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const authUser = await getAuthUser();
    if (!authUser || authUser.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 403 });
    }

    const { status, notes } = await req.json();

    const enquiry = await prisma.enquiry.update({
      where: { id: params.id },
      data: {
        status: status !== undefined ? status : undefined,
        notes: notes !== undefined ? notes : undefined,
      },
    });

    return NextResponse.json({ enquiry, message: 'Enquiry updated' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to update enquiry' }, { status: 500 });
  }
}
