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

    let enquiries;
    if (authUser.role === 'admin') {
      enquiries = await prisma.enquiry.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
          car: {
            include: { images: true },
          },
        },
      });
    } else {
      enquiries = await prisma.enquiry.findMany({
        where: { userId: authUser.id },
        orderBy: { createdAt: 'desc' },
        include: {
          car: {
            include: { images: true },
          },
        },
      });
    }

    return NextResponse.json({ enquiries });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to fetch enquiries' }, { status: 500 });
  }
}

const enquirySchema = z.object({
  carId: z.string(),
  customerName: z.string().min(2),
  customerPhone: z.string().min(10),
  customerEmail: z.string().email(),
  message: z.string().min(3),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = enquirySchema.parse(body);
    const authUser = await getAuthUser();

    const car = await prisma.car.findUnique({ where: { id: parsed.carId } });
    if (!car) {
      return NextResponse.json({ error: 'Car not found' }, { status: 404 });
    }

    const enquiry = await prisma.enquiry.create({
      data: {
        carId: parsed.carId,
        userId: authUser ? authUser.id : null,
        customerName: parsed.customerName,
        customerPhone: parsed.customerPhone,
        customerEmail: parsed.customerEmail,
        message: parsed.message,
        status: 'PENDING',
      },
      include: {
        car: true,
      },
    });

    return NextResponse.json({
      enquiry,
      message: 'Enquiry submitted! Our car expert will contact you shortly.',
    }, { status: 201 });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: err.message || 'Failed to submit enquiry' }, { status: 500 });
  }
}
