import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

export async function GET() {
  try {
    const authUser = await getAuthUser();
    if (!authUser) {
      return NextResponse.json({ favourites: [] });
    }

    const favourites = await prisma.favourite.findMany({
      where: { userId: authUser.id },
      include: {
        car: {
          include: {
            images: { orderBy: { displayOrder: 'asc' } },
            inspection: true,
          },
        },
      },
    });

    return NextResponse.json({ favourites });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to fetch favourites' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const authUser = await getAuthUser();
    if (!authUser) {
      return NextResponse.json({ error: 'Please login to save favourites' }, { status: 401 });
    }

    const { carId } = await req.json();

    const existing = await prisma.favourite.findUnique({
      where: {
        userId_carId: {
          userId: authUser.id,
          carId,
        },
      },
    });

    if (existing) {
      await prisma.favourite.delete({
        where: { id: existing.id },
      });
      return NextResponse.json({ favourited: false, message: 'Removed from favourites' });
    }

    await prisma.favourite.create({
      data: {
        userId: authUser.id,
        carId,
      },
    });

    return NextResponse.json({ favourited: true, message: 'Added to favourites' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to update favourite' }, { status: 500 });
  }
}
