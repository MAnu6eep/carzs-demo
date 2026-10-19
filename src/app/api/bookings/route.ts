import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';
import { z } from 'zod';

export async function GET() {
  try {
    const authUser = await getAuthUser();
    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let bookings;
    if (authUser.role === 'admin') {
      bookings = await prisma.testDriveBooking.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
          car: {
            include: { images: true },
          },
        },
      });
    } else {
      bookings = await prisma.testDriveBooking.findMany({
        where: { userId: authUser.id },
        orderBy: { createdAt: 'desc' },
        include: {
          car: {
            include: { images: true },
          },
        },
      });
    }

    return NextResponse.json({ bookings });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to fetch bookings' }, { status: 500 });
  }
}

const bookingSchema = z.object({
  carId: z.string(),
  customerName: z.string().min(2),
  customerPhone: z.string().min(10),
  customerEmail: z.string().email(),
  date: z.string(),
  timeSlot: z.string(),
  location: z.string(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = bookingSchema.parse(body);
    const authUser = await getAuthUser();

    const car = await prisma.car.findUnique({ where: { id: parsed.carId } });
    if (!car) {
      return NextResponse.json({ error: 'Car not found' }, { status: 404 });
    }

    const booking = await prisma.testDriveBooking.create({
      data: {
        carId: parsed.carId,
        userId: authUser ? authUser.id : null,
        customerName: parsed.customerName,
        customerPhone: parsed.customerPhone,
        customerEmail: parsed.customerEmail,
        date: parsed.date,
        timeSlot: parsed.timeSlot,
        location: parsed.location,
        status: 'PENDING',
      },
      include: {
        car: true,
      },
    });

    return NextResponse.json({
      booking,
      message: 'Test drive request submitted successfully! Our representative will call to confirm.',
    }, { status: 201 });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: err.message || 'Failed to create booking' }, { status: 500 });
  }
}
