import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const car = await prisma.car.findUnique({
      where: { id: params.id },
      include: {
        images: {
          orderBy: { displayOrder: 'asc' },
        },
        features: true,
        inspection: true,
      },
    });

    if (!car) {
      return NextResponse.json({ error: 'Car not found' }, { status: 404 });
    }

    return NextResponse.json({ car });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to fetch car' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const authUser = await getAuthUser();
    if (!authUser || authUser.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 403 });
    }

    const body = await req.json();

    const car = await prisma.car.update({
      where: { id: params.id },
      data: {
        title: body.title,
        brand: body.brand,
        model: body.model,
        variant: body.variant,
        year: body.year,
        price: body.price,
        kmDriven: body.kmDriven,
        fuelType: body.fuelType,
        transmission: body.transmission,
        bodyType: body.bodyType,
        owners: body.owners,
        location: body.location,
        color: body.color,
        registrationYear: body.registrationYear,
        engineCc: body.engineCc,
        maxPower: body.maxPower,
        insurance: body.insurance,
        status: body.status,
        isFeatured: body.isFeatured,
        description: body.description,
      },
      include: {
        images: true,
        features: true,
        inspection: true,
      }
    });

    return NextResponse.json({ car, message: 'Car updated successfully' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to update car' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const authUser = await getAuthUser();
    if (!authUser || authUser.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 403 });
    }

    await prisma.car.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Car deleted successfully' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to delete car' }, { status: 500 });
  }
}
