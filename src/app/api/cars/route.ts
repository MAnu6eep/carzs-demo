import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';
import { z } from 'zod';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const brand = searchParams.get('brand') || undefined;
    const model = searchParams.get('model') || undefined;
    const fuelType = searchParams.get('fuelType') || undefined;
    const transmission = searchParams.get('transmission') || undefined;
    const bodyType = searchParams.get('bodyType') || undefined;
    const location = searchParams.get('location') || undefined;
    const status = searchParams.get('status') || undefined;
    const isFeatured = searchParams.get('isFeatured') === 'true' ? true : undefined;

    const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;
    const minYear = searchParams.get('minYear') ? Number(searchParams.get('minYear')) : undefined;
    const maxKm = searchParams.get('maxKm') ? Number(searchParams.get('maxKm')) : undefined;
    const search = searchParams.get('search') || undefined;

    const sortBy = searchParams.get('sortBy') || 'newest'; // newest, price_asc, price_desc, km_asc, year_desc

    const where: any = {};

    if (brand && brand !== 'All') where.brand = brand;
    if (model && model !== 'All') where.model = { contains: model };
    if (fuelType && fuelType !== 'All') where.fuelType = fuelType;
    if (transmission && transmission !== 'All') where.transmission = transmission;
    if (bodyType && bodyType !== 'All') where.bodyType = bodyType;
    if (location && location !== 'All') where.location = location;
    if (status) where.status = status;
    if (isFeatured !== undefined) where.isFeatured = isFeatured;

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }

    if (minYear !== undefined) {
      where.year = { gte: minYear };
    }

    if (maxKm !== undefined) {
      where.kmDriven = { lte: maxKm };
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { brand: { contains: search } },
        { model: { contains: search } },
        { variant: { contains: search } },
      ];
    }

    let orderBy: any = { createdAt: 'desc' };
    if (sortBy === 'price_asc') orderBy = { price: 'asc' };
    if (sortBy === 'price_desc') orderBy = { price: 'desc' };
    if (sortBy === 'km_asc') orderBy = { kmDriven: 'asc' };
    if (sortBy === 'year_desc') orderBy = { year: 'desc' };

    const cars = await prisma.car.findMany({
      where,
      orderBy,
      include: {
        images: {
          orderBy: { displayOrder: 'asc' },
        },
        inspection: true,
      },
    });

    return NextResponse.json({ cars, count: cars.length });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to fetch cars' }, { status: 500 });
  }
}

const carCreateSchema = z.object({
  title: z.string().min(3),
  brand: z.string().min(1),
  model: z.string().min(1),
  variant: z.string().min(1),
  year: z.number().int().min(2000),
  price: z.number().int().positive(),
  kmDriven: z.number().int().nonnegative(),
  fuelType: z.string(),
  transmission: z.string(),
  bodyType: z.string(),
  owners: z.number().int().default(1),
  location: z.string(),
  color: z.string().optional(),
  registrationYear: z.number().int(),
  engineCc: z.number().int().optional(),
  maxPower: z.string().optional(),
  insurance: z.string().optional(),
  status: z.enum(['AVAILABLE', 'RESERVED', 'SOLD']).default('AVAILABLE'),
  isFeatured: z.boolean().default(false),
  description: z.string().optional(),
  imageUrls: z.array(z.string()).min(1, 'At least 1 image is required'),
  features: z.array(z.string()).optional(),
  inspection: z.object({
    overallScore: z.number().default(9.0),
    engineScore: z.number().default(9.0),
    exteriorScore: z.number().default(9.0),
    interiorScore: z.number().default(9.0),
    tyresScore: z.number().default(9.0),
    brakesScore: z.number().default(9.0),
    electricalScore: z.number().default(9.0),
    acScore: z.number().default(9.0),
    suspensionScore: z.number().default(9.0),
    summaryNotes: z.string().optional(),
  }).optional(),
});

export async function POST(req: Request) {
  try {
    const authUser = await getAuthUser();
    if (!authUser || authUser.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 403 });
    }

    const body = await req.json();
    const parsed = carCreateSchema.parse(body);

    const car = await prisma.car.create({
      data: {
        title: parsed.title,
        brand: parsed.brand,
        model: parsed.model,
        variant: parsed.variant,
        year: parsed.year,
        price: parsed.price,
        kmDriven: parsed.kmDriven,
        fuelType: parsed.fuelType,
        transmission: parsed.transmission,
        bodyType: parsed.bodyType,
        owners: parsed.owners,
        location: parsed.location,
        color: parsed.color || null,
        registrationYear: parsed.registrationYear,
        engineCc: parsed.engineCc || null,
        maxPower: parsed.maxPower || null,
        insurance: parsed.insurance || null,
        status: parsed.status,
        isFeatured: parsed.isFeatured,
        description: parsed.description || null,
        images: {
          create: parsed.imageUrls.map((url, idx) => ({
            url,
            isPrimary: idx === 0,
            displayOrder: idx,
          })),
        },
        features: {
          create: (parsed.features || []).map(f => ({ name: f, category: 'Key Features' })),
        },
        inspection: parsed.inspection ? {
          create: {
            overallScore: parsed.inspection.overallScore,
            engineScore: parsed.inspection.engineScore,
            exteriorScore: parsed.inspection.exteriorScore,
            interiorScore: parsed.inspection.interiorScore,
            tyresScore: parsed.inspection.tyresScore,
            brakesScore: parsed.inspection.brakesScore,
            electricalScore: parsed.inspection.electricalScore,
            acScore: parsed.inspection.acScore,
            suspensionScore: parsed.inspection.suspensionScore,
            summaryNotes: parsed.inspection.summaryNotes || 'Vehicle thoroughly inspected.',
          }
        } : undefined,
      },
      include: {
        images: true,
        features: true,
        inspection: true,
      }
    });

    return NextResponse.json({ car, message: 'Car created successfully' }, { status: 201 });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
