import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';
import { z } from 'zod';

export async function GET() {
  try {
    const authUser = await getAuthUser();
    if (!authUser || authUser.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 403 });
    }

    const leads = await prisma.sellCarLead.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ leads });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to fetch sell leads' }, { status: 500 });
  }
}

const sellLeadSchema = z.object({
  brand: z.string().min(1),
  model: z.string().min(1),
  variant: z.string().optional(),
  year: z.number().int(),
  kmDriven: z.number().int(),
  fuelType: z.string(),
  transmission: z.string(),
  owners: z.number().int().default(1),
  regLocation: z.string().optional(),
  customerName: z.string().min(2),
  customerPhone: z.string().min(10),
  customerEmail: z.string().email(),
  city: z.string().min(1),
  notes: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = sellLeadSchema.parse(body);

    const lead = await prisma.sellCarLead.create({
      data: {
        brand: parsed.brand,
        model: parsed.model,
        variant: parsed.variant || null,
        year: parsed.year,
        kmDriven: parsed.kmDriven,
        fuelType: parsed.fuelType,
        transmission: parsed.transmission,
        owners: parsed.owners,
        regLocation: parsed.regLocation || null,
        customerName: parsed.customerName,
        customerPhone: parsed.customerPhone,
        customerEmail: parsed.customerEmail,
        city: parsed.city,
        notes: parsed.notes || null,
        status: 'NEW',
      },
    });

    return NextResponse.json({
      lead,
      message: 'Evaluation request received! Our inspection team will call you within 30 minutes.',
    }, { status: 201 });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: err.message || 'Failed to submit valuation request' }, { status: 500 });
  }
}
