import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const idsParam = searchParams.get('ids');

    if (!idsParam) {
      return NextResponse.json({ cars: [] });
    }

    const ids = idsParam.split(',').filter(Boolean);

    const cars = await prisma.car.findMany({
      where: {
        id: { in: ids },
      },
      include: {
        images: {
          orderBy: { displayOrder: 'asc' },
        },
        features: true,
        inspection: true,
      },
    });

    return NextResponse.json({ cars });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to compare cars' }, { status: 500 });
  }
}
