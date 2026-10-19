import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

export async function GET() {
  try {
    const authUser = await getAuthUser();
    if (!authUser || authUser.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 403 });
    }

    const totalCars = await prisma.car.count();
    const availableCars = await prisma.car.count({ where: { status: 'AVAILABLE' } });
    const reservedCars = await prisma.car.count({ where: { status: 'RESERVED' } });
    const soldCars = await prisma.car.count({ where: { status: 'SOLD' } });

    const newEnquiries = await prisma.enquiry.count({ where: { status: 'PENDING' } });
    const upcomingBookings = await prisma.testDriveBooking.count({ where: { status: 'PENDING' } });
    const newSellLeads = await prisma.sellCarLead.count({ where: { status: 'NEW' } });
    const totalCustomers = await prisma.user.count({ where: { role: 'customer' } });

    // Fuel breakdown
    const fuelGroup = await prisma.car.groupBy({
      by: ['fuelType'],
      _count: { id: true },
    });

    // Brand breakdown
    const brandGroup = await prisma.car.groupBy({
      by: ['brand'],
      _count: { id: true },
    });

    return NextResponse.json({
      stats: {
        totalCars,
        availableCars,
        reservedCars,
        soldCars,
        newEnquiries,
        upcomingBookings,
        newSellLeads,
        totalCustomers,
      },
      fuelBreakdown: fuelGroup.map(g => ({ name: g.fuelType, count: g._count.id })),
      brandBreakdown: brandGroup.map(g => ({ name: g.brand, count: g._count.id })),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to fetch admin stats' }, { status: 500 });
  }
}
