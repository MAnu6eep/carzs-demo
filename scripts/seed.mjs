import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting AutoNest DB Seeding...');

  // 1. Process local WhatsApp images into public/images/cars/
  const rootDir = process.cwd();
  const publicCarsDir = path.join(rootDir, 'public', 'images', 'cars');
  if (!fs.existsSync(publicCarsDir)) {
    fs.mkdirSync(publicCarsDir, { recursive: true });
  }

  const files = fs.readdirSync(rootDir);
  const waImages = files.filter(f => f.startsWith('WhatsApp Image') && (f.endsWith('.jpeg') || f.endsWith('.jpg')));

  console.log(`📸 Found ${waImages.length} car photos in root directory.`);

  const copiedImages = [];
  waImages.forEach((imgFile, index) => {
    const ext = path.extname(imgFile);
    const destName = `car-photo-${index + 1}${ext}`;
    const srcPath = path.join(rootDir, imgFile);
    const destPath = path.join(publicCarsDir, destName);
    fs.copyFileSync(srcPath, destPath);
    copiedImages.push(`/images/cars/${destName}`);
  });

  // Fallback high quality unsplash images if needed
  const fallbackImages = [
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1000&q=80'
  ];

  const availableImages = copiedImages.length > 0 ? copiedImages : fallbackImages;

  // Clear existing data
  await prisma.favourite.deleteMany();
  await prisma.testDriveBooking.deleteMany();
  await prisma.enquiry.deleteMany();
  await prisma.sellCarLead.deleteMany();
  await prisma.inspection.deleteMany();
  await prisma.carFeature.deleteMany();
  await prisma.carImage.deleteMany();
  await prisma.car.deleteMany();
  await prisma.user.deleteMany();

  // 2. Create Users
  const passwordHashAdmin = await bcrypt.hash('admin123', 10);
  const passwordHashUser = await bcrypt.hash('demo123', 10);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@autonest.com',
      name: 'AutoNest Admin',
      phone: '+91 98765 43210',
      passwordHash: passwordHashAdmin,
      role: 'admin',
    },
  });

  const customer = await prisma.user.create({
    data: {
      email: 'demo@autonest.com',
      name: 'Rahul Sharma',
      phone: '+91 98123 45678',
      passwordHash: passwordHashUser,
      role: 'customer',
    },
  });

  console.log(`👤 Created Admin (${admin.email}) and Customer (${customer.email})`);

  // 3. Cars dataset (22 realistic cars with realistic details)
  const carsData = [
    {
      title: '2023 Hyundai Creta SX Opt Turbo',
      brand: 'Hyundai',
      model: 'Creta',
      variant: 'SX (O) 1.4 Turbo DCT',
      year: 2023,
      price: 1545000,
      kmDriven: 24500,
      fuelType: 'Petrol',
      transmission: 'Automatic',
      bodyType: 'SUV',
      owners: 1,
      location: 'Bangalore',
      color: 'Titan Grey',
      registrationYear: 2023,
      engineCc: 1353,
      maxPower: '138 bhp',
      insurance: 'Comprehensive valid till March 2027',
      status: 'AVAILABLE',
      isFeatured: true,
      description: 'Single owner, pristine condition Hyundai Creta SX Turbo. Fully loaded with panoramic sunroof, Bose sound system, ventilated seats, and 360-degree camera. Complete dealership service history.',
      overallScore: 9.3,
      engineScore: 9.6,
      exteriorScore: 9.1,
      interiorScore: 9.4,
      tyresScore: 8.9,
      brakesScore: 9.2,
      electricalScore: 9.5,
      acScore: 9.4,
      suspensionScore: 9.1,
      features: ['Panoramic Sunroof', 'Ventilated Front Seats', 'Bose 8-Speaker Audio', '10.25-inch Touchscreen', 'Wireless Charging', 'Air Purifier', '6 Airbags', '360 Camera', 'Drive Modes']
    },
    {
      title: '2022 Kia Seltos GTX Plus Automatic',
      brand: 'Kia',
      model: 'Seltos',
      variant: 'GTX+ 1.5 Diesel AT',
      year: 2022,
      price: 1620000,
      kmDriven: 31000,
      fuelType: 'Diesel',
      transmission: 'Automatic',
      bodyType: 'SUV',
      owners: 1,
      location: 'Hyderabad',
      color: 'Aurora Black Pearl',
      registrationYear: 2022,
      engineCc: 1493,
      maxPower: '113 bhp',
      insurance: 'Comprehensive valid till Oct 2026',
      status: 'AVAILABLE',
      isFeatured: true,
      description: 'Top end Kia Seltos GTX+ Diesel Automatic in rare Aurora Black. Excellent fuel efficiency of 18+ kmpl. Features head-up display, blind view monitor, and GT line red accents.',
      overallScore: 9.1,
      engineScore: 9.4,
      exteriorScore: 9.0,
      interiorScore: 9.2,
      tyresScore: 8.7,
      brakesScore: 9.0,
      electricalScore: 9.3,
      acScore: 9.2,
      suspensionScore: 9.0,
      features: ['Head-Up Display', 'Bose Premium Sound', 'Blind-Spot Monitor', 'Ventilated Seats', '10.25 Touch HD', 'Smart Pure Air Purifier', 'All 4 Disc Brakes', 'Paddle Shifters']
    },
    {
      title: '2023 Tata Nexon EV Max XZ+ Lux',
      brand: 'Tata',
      model: 'Nexon EV',
      variant: 'Max XZ+ Lux 40.5kWh',
      year: 2023,
      price: 1480000,
      kmDriven: 18200,
      fuelType: 'Electric',
      transmission: 'Automatic',
      bodyType: 'SUV',
      owners: 1,
      location: 'Mumbai',
      color: 'Intensi-Teal',
      registrationYear: 2023,
      engineCc: 0,
      maxPower: '141 bhp',
      insurance: 'Zero Dep valid till Jan 2027',
      status: 'AVAILABLE',
      isFeatured: true,
      description: 'Clean eco-friendly long range EV with 350+ km real world range. Fast 7.2 kW AC wall charger included. Battery warranty covered till 2031 or 1,60,000 km.',
      overallScore: 9.5,
      engineScore: 9.8,
      exteriorScore: 9.3,
      interiorScore: 9.5,
      tyresScore: 9.2,
      brakesScore: 9.4,
      electricalScore: 9.7,
      acScore: 9.6,
      suspensionScore: 9.3,
      features: ['40.5 kWh Battery Pack', 'Multi-mode Regen', 'Electronic Parking Brake', 'Wireless Phone Charger', 'Ventilated Seats', 'Jewelled Control Knob', 'Harman Audio']
    },
    {
      title: '2022 Mahindra XUV700 AX7 Luxury Pack AWD',
      brand: 'Mahindra',
      model: 'XUV700',
      variant: 'AX7 Luxury Pack 2.2 Diesel AWD',
      year: 2022,
      price: 2190000,
      kmDriven: 38000,
      fuelType: 'Diesel',
      transmission: 'Automatic',
      bodyType: 'SUV',
      owners: 1,
      location: 'Delhi NCR',
      color: 'Midnight Black',
      registrationYear: 2022,
      engineCc: 2179,
      maxPower: '182 bhp',
      insurance: 'Comprehensive valid till Nov 2026',
      status: 'AVAILABLE',
      isFeatured: true,
      description: 'Flagship Mahindra XUV700 with ADAS Level 2 safety features, Sony 3D Immersive audio, flush door handles, and All-Wheel-Drive capability. Unmatched road presence.',
      overallScore: 9.4,
      engineScore: 9.7,
      exteriorScore: 9.3,
      interiorScore: 9.5,
      tyresScore: 9.0,
      brakesScore: 9.3,
      electricalScore: 9.6,
      acScore: 9.5,
      suspensionScore: 9.2,
      features: ['ADAS Level 2 Autonomous Driving', 'Sony 12-Speaker 3D Audio', 'Skyroof (Largest Sunroof)', 'AWD', '360 Surround View Camera', 'Memory Seats', 'Wireless Apple CarPlay']
    },
    {
      title: '2021 Honda City ZX i-VTEC CVT',
      brand: 'Honda',
      model: 'City',
      variant: 'ZX 1.5 i-VTEC CVT',
      year: 2021,
      price: 1125000,
      kmDriven: 29000,
      fuelType: 'Petrol',
      transmission: 'Automatic',
      bodyType: 'Sedan',
      owners: 1,
      location: 'Pune',
      color: 'Platinum White Pearl',
      registrationYear: 2021,
      engineCc: 1498,
      maxPower: '119 bhp',
      insurance: 'Third Party till Aug 2026',
      status: 'AVAILABLE',
      isFeatured: false,
      description: 'Legendary Japanese executive sedan. Ultra smooth CVT transmission, plush full-leather interior, LaneWatch camera, and full LED array lamps. Serviced exclusively at Honda Dealership.',
      overallScore: 9.2,
      engineScore: 9.5,
      exteriorScore: 9.1,
      interiorScore: 9.3,
      tyresScore: 8.8,
      brakesScore: 9.1,
      electricalScore: 9.3,
      acScore: 9.4,
      suspensionScore: 9.2,
      features: ['Full LED Headlamps', 'LaneWatch Blind Spot Camera', 'Electric Sunroof', '8-inch Touchscreen', 'Leather Upholstery', '6 Airbags', 'Cruise Control', 'Walk Away Auto Lock']
    },
    {
      title: '2022 Maruti Suzuki Swift ZXi Plus AMT',
      brand: 'Maruti Suzuki',
      model: 'Swift',
      variant: 'ZXi+ Dual Tone AMT',
      year: 2022,
      price: 735000,
      kmDriven: 21500,
      fuelType: 'Petrol',
      transmission: 'Automatic',
      bodyType: 'Hatchback',
      owners: 1,
      location: 'Bangalore',
      color: 'Solid Fire Red with Black Roof',
      registrationYear: 2022,
      engineCc: 1197,
      maxPower: '89 bhp',
      insurance: 'Comprehensive valid till June 2026',
      status: 'AVAILABLE',
      isFeatured: false,
      description: 'Zippy city hatchback with dual tone styling, SmartPlay Pro touchscreen with Apple CarPlay/Android Auto, cruise control, and precision AMT transmission.',
      overallScore: 9.0,
      engineScore: 9.2,
      exteriorScore: 9.0,
      interiorScore: 8.9,
      tyresScore: 8.8,
      brakesScore: 8.9,
      electricalScore: 9.1,
      acScore: 9.3,
      suspensionScore: 8.8,
      features: ['Dual Tone Styling', 'Cruise Control', 'Precision AMT', 'SmartPlay Studio', 'Push Start/Stop', 'Precision Alloy Wheels', 'Reverse Camera']
    },
    {
      title: '2021 Toyota Fortuner Legender 4x2 AT',
      brand: 'Toyota',
      model: 'Fortuner',
      variant: 'Legender 2.8 4x2 AT',
      year: 2021,
      price: 3850000,
      kmDriven: 45000,
      fuelType: 'Diesel',
      transmission: 'Automatic',
      bodyType: 'SUV',
      owners: 1,
      location: 'Chennai',
      color: 'Super White Dual Tone',
      registrationYear: 2021,
      engineCc: 2755,
      maxPower: '201 bhp',
      insurance: 'Comprehensive valid till Sept 2026',
      status: 'AVAILABLE',
      isFeatured: true,
      description: 'Unstoppable Toyota Legender with bulletproof 2.8L diesel engine packing 500 Nm torque. Exclusive Legender front fascia, quad-LED headlights, and two-tone black maroon interior.',
      overallScore: 9.6,
      engineScore: 9.9,
      exteriorScore: 9.5,
      interiorScore: 9.4,
      tyresScore: 9.2,
      brakesScore: 9.5,
      electricalScore: 9.6,
      acScore: 9.7,
      suspensionScore: 9.4,
      features: ['Quad LED Headlamps', 'Sequential Turn Signals', 'Wireless Charger', 'Kick-Sensor Power Tailgate', 'JBL 11-Speaker Audio', 'Dual Zone Climate', '7 Airbags']
    },
    {
      title: '2023 Volkswagen Virtus GT 1.5 TSI DSG',
      brand: 'Volkswagen',
      model: 'Virtus',
      variant: 'GT DSG 1.5 TSI Evo',
      year: 2023,
      price: 1680000,
      kmDriven: 14200,
      fuelType: 'Petrol',
      transmission: 'Automatic',
      bodyType: 'Sedan',
      owners: 1,
      location: 'Bangalore',
      color: 'Wild Cherry Red',
      registrationYear: 2023,
      engineCc: 1498,
      maxPower: '148 bhp',
      insurance: 'Zero Dep valid till May 2027',
      status: 'AVAILABLE',
      isFeatured: true,
      description: 'True German performance sedan. 1.5L TSI Active Cylinder Technology paired with 7-speed DSG transmission. 0-100 km/h in 8.9s with 5-star GNCAP safety rating.',
      overallScore: 9.5,
      engineScore: 9.7,
      exteriorScore: 9.6,
      interiorScore: 9.4,
      tyresScore: 9.3,
      brakesScore: 9.5,
      electricalScore: 9.5,
      acScore: 9.2,
      suspensionScore: 9.6,
      features: ['5-Star GNCAP Safety', '7-Speed DSG Transmission', '10.1-inch Wireless Play', 'Digital Cockpit Cluster', 'Red Brake Callipers', 'Ventilated Front Seats', 'Ambient Lighting']
    },
    {
      title: '2022 Mahindra Thar LX 4-Str Hard Top 4x4',
      brand: 'Mahindra',
      model: 'Thar',
      variant: 'LX 2.2 mHawk Diesel 4x4 AT',
      year: 2022,
      price: 1575000,
      kmDriven: 27000,
      fuelType: 'Diesel',
      transmission: 'Automatic',
      bodyType: 'SUV',
      owners: 1,
      location: 'Chandigarh',
      color: 'Galaxy Grey',
      registrationYear: 2022,
      engineCc: 2184,
      maxPower: '130 bhp',
      insurance: 'Comprehensive valid till Feb 2027',
      status: 'AVAILABLE',
      isFeatured: false,
      description: 'Iconic 4x4 off-roader with factory hardtop, automatic transmission, shift-on-the-fly 4WD transfer case, and IP54 washable interiors.',
      overallScore: 9.0,
      engineScore: 9.4,
      exteriorScore: 9.0,
      interiorScore: 8.7,
      tyresScore: 9.1,
      brakesScore: 8.8,
      electricalScore: 9.0,
      acScore: 9.1,
      suspensionScore: 8.9,
      features: ['Shift-on-the-fly 4WD', 'Factory Hardtop', 'Touchscreen Infotainment with Off-Road Stats', 'Roll Cage', '18-inch Alloy Wheels', 'IP54 Water Resistant Interior']
    },
    {
      title: '2023 Skoda Slavia Style 1.0 TSI AT',
      brand: 'Skoda',
      model: 'Slavia',
      variant: 'Style 1.0 TSI Automatic',
      year: 2023,
      price: 1420000,
      kmDriven: 16800,
      fuelType: 'Petrol',
      transmission: 'Automatic',
      bodyType: 'Sedan',
      owners: 1,
      location: 'Ahmedabad',
      color: 'Candy White',
      registrationYear: 2023,
      engineCc: 999,
      maxPower: '114 bhp',
      insurance: 'Comprehensive valid till April 2027',
      status: 'AVAILABLE',
      isFeatured: false,
      description: 'Elegant European styling with class-leading 521 litre boot space and 179mm ground clearance. 5-Star Global NCAP safety rating for adults and children.',
      overallScore: 9.3,
      engineScore: 9.4,
      exteriorScore: 9.4,
      interiorScore: 9.3,
      tyresScore: 9.0,
      brakesScore: 9.2,
      electricalScore: 9.3,
      acScore: 9.1,
      suspensionScore: 9.4,
      features: ['5-Star GNCAP Rating', '521L Boot Capacity', 'Digital Instrument Cluster', 'Subwoofer & 8 Speakers', 'Wireless Apple CarPlay', 'Cooled Glovebox']
    },
    {
      title: '2022 MG Hector Sharp Pro 1.5 Turbo CVT',
      brand: 'MG',
      model: 'Hector',
      variant: 'Sharp Pro 1.5 Petrol CVT',
      year: 2022,
      price: 1690000,
      kmDriven: 33000,
      fuelType: 'Petrol',
      transmission: 'Automatic',
      bodyType: 'SUV',
      owners: 1,
      location: 'Delhi NCR',
      color: 'Argyle Brown',
      registrationYear: 2022,
      engineCc: 1451,
      maxPower: '141 bhp',
      insurance: 'Comprehensive valid till Dec 2026',
      status: 'AVAILABLE',
      isFeatured: false,
      description: 'Feature-packed internet SUV with giant 14-inch HD Portrait touchscreen, dual pane panoramic sunroof, power tailgate, and plush leather interior.',
      overallScore: 9.0,
      engineScore: 9.1,
      exteriorScore: 9.0,
      interiorScore: 9.3,
      tyresScore: 8.7,
      brakesScore: 8.9,
      electricalScore: 9.2,
      acScore: 9.3,
      suspensionScore: 8.8,
      features: ['14-inch HD Portrait Touchscreen', 'Dual-Pane Panoramic Sunroof', 'i-SMART Connected Car Tech', 'Power Tailgate', '360 Camera', 'Infinity Sound System']
    },
    {
      title: '2021 BMW 3 Series 320d Luxury Line',
      brand: 'BMW',
      model: '3 Series',
      variant: '320d Luxury Line 2.0L Diesel',
      year: 2021,
      price: 3650000,
      kmDriven: 41000,
      fuelType: 'Diesel',
      transmission: 'Automatic',
      bodyType: 'Sedan',
      owners: 1,
      location: 'Mumbai',
      color: 'Phytonic Blue',
      registrationYear: 2021,
      engineCc: 1995,
      maxPower: '188 bhp',
      insurance: 'Comprehensive valid till Oct 2026',
      status: 'AVAILABLE',
      isFeatured: true,
      description: 'Ultimate driving machine. 50:50 weight distribution, 8-speed Steptronic transmission, Vernasca leather seats, BMW Live Cockpit Professional, and ambient cabin lighting.',
      overallScore: 9.5,
      engineScore: 9.8,
      exteriorScore: 9.4,
      interiorScore: 9.6,
      tyresScore: 9.0,
      brakesScore: 9.6,
      electricalScore: 9.6,
      acScore: 9.4,
      suspensionScore: 9.5,
      features: ['BMW Live Cockpit Professional', 'Vernasca Leather Seats', '8-Speed Steptronic AT', 'Wireless Apple CarPlay', 'Gesture Control', '3-Zone Climate Control']
    },
    {
      title: '2023 Hyundai Venue SX Dual Tone Petrol',
      brand: 'Hyundai',
      model: 'Venue',
      variant: 'SX 1.2 Kappa MT Dual Tone',
      year: 2023,
      price: 985000,
      kmDriven: 15400,
      fuelType: 'Petrol',
      transmission: 'Manual',
      bodyType: 'SUV',
      owners: 1,
      location: 'Hyderabad',
      color: 'Fiery Red with Phantom Black Roof',
      registrationYear: 2023,
      engineCc: 1197,
      maxPower: '82 bhp',
      insurance: 'Comprehensive valid till March 2027',
      status: 'AVAILABLE',
      isFeatured: false,
      description: 'Compact urban SUV with modern dark chrome parametric grille, sunroof, digital cluster, and Bluelink connected car suite.',
      overallScore: 9.2,
      engineScore: 9.4,
      exteriorScore: 9.3,
      interiorScore: 9.1,
      tyresScore: 9.0,
      brakesScore: 9.1,
      electricalScore: 9.3,
      acScore: 9.4,
      suspensionScore: 9.0,
      features: ['Electric Sunroof', 'Bluelink Connected Car Tech', 'Digital Cluster with Color TFT', '8-inch Touchscreen', 'Rear AC Vents', 'Cornering Lamps']
    },
    {
      title: '2022 Tata Harrier XZA Plus Dark Edition',
      brand: 'Tata',
      model: 'Harrier',
      variant: 'XZA+ Dark Edition 2.0L Kryotec AT',
      year: 2022,
      price: 1890000,
      kmDriven: 34500,
      fuelType: 'Diesel',
      transmission: 'Automatic',
      bodyType: 'SUV',
      owners: 1,
      location: 'Kolkata',
      color: 'Oberon Black',
      registrationYear: 2022,
      engineCc: 1956,
      maxPower: '168 bhp',
      insurance: 'Comprehensive valid till Nov 2026',
      status: 'AVAILABLE',
      isFeatured: false,
      description: 'Mean-looking Dark Edition Harrier built on OMEGA Arc platform derived from Land Rover D8. 9 JBL speakers, panoramic sunroof, and 6-speed Hyundai source automatic gearbox.',
      overallScore: 9.2,
      engineScore: 9.5,
      exteriorScore: 9.3,
      interiorScore: 9.2,
      tyresScore: 8.8,
      brakesScore: 9.1,
      electricalScore: 9.2,
      acScore: 9.3,
      suspensionScore: 9.3,
      features: ['OMEGA Arc Land Rover Architecture', 'JBL 9 Speaker Audio', 'Panoramic Sunroof', 'Blackstone Leather Interior', '18-inch Charcoal Alloys', 'Terrain Response Modes']
    },
    {
      title: '2023 Hyundai Verna SX Opt 1.5 Turbo DCT',
      brand: 'Hyundai',
      model: 'Verna',
      variant: 'SX (O) 1.5 Turbo Petrol DCT',
      year: 2023,
      price: 1640000,
      kmDriven: 11000,
      fuelType: 'Petrol',
      transmission: 'Automatic',
      bodyType: 'Sedan',
      owners: 1,
      location: 'Bangalore',
      color: 'Abyss Black',
      registrationYear: 2023,
      engineCc: 1482,
      maxPower: '158 bhp',
      insurance: 'Comprehensive valid till May 2027',
      status: 'AVAILABLE',
      isFeatured: true,
      description: 'Futuristic fastback sedan with segment-best 160 PS power, horizon LED lightbar, ADAS Level 2 safety suite, and dual integrated 10.25 inch screen cockpit.',
      overallScore: 9.6,
      engineScore: 9.9,
      exteriorScore: 9.5,
      interiorScore: 9.6,
      tyresScore: 9.4,
      brakesScore: 9.5,
      electricalScore: 9.7,
      acScore: 9.5,
      suspensionScore: 9.3,
      features: ['160 PS Turbo Power', 'Level 2 ADAS Safety', 'Horizon Connected LED Lightbar', 'Heated & Ventilated Seats', 'Bose 8-Speaker Audio', 'Switchable Control Console']
    },
    {
      title: '2022 Toyota Urban Cruiser Hyryder V Hybrid',
      brand: 'Toyota',
      model: 'Urban Cruiser Hyryder',
      variant: 'V Strong Hybrid e-CVT',
      year: 2022,
      price: 1780000,
      kmDriven: 22000,
      fuelType: 'Hybrid',
      transmission: 'Automatic',
      bodyType: 'SUV',
      owners: 1,
      location: 'Kochi',
      color: 'Cave Black',
      registrationYear: 2022,
      engineCc: 1490,
      maxPower: '114 bhp',
      insurance: 'Comprehensive valid till Dec 2026',
      status: 'AVAILABLE',
      isFeatured: false,
      description: 'Self-charging Strong Hybrid SUV delivering astonishing real-world mileage of 26+ kmpl. EV mode button for whisper silent city cruising.',
      overallScore: 9.4,
      engineScore: 9.6,
      exteriorScore: 9.3,
      interiorScore: 9.2,
      tyresScore: 9.1,
      brakesScore: 9.4,
      electricalScore: 9.6,
      acScore: 9.5,
      suspensionScore: 9.2,
      features: ['26+ kmpl Fuel Efficiency', 'EV Silent Drive Mode', 'Head-Up Display', 'Panoramic Sunroof', '360 Camera', 'Ventilated Front Seats']
    }
  ];

  console.log(`🚘 Inserting ${carsData.length} seeded vehicles...`);

  for (let i = 0; i < carsData.length; i++) {
    const c = carsData[i];

    // Pick 2 images for each car from our copied local image pool
    const imgIndex1 = (i * 2) % availableImages.length;
    const imgIndex2 = (i * 2 + 1) % availableImages.length;

    const carImages = [
      { url: availableImages[imgIndex1], isPrimary: true, displayOrder: 0 },
      { url: availableImages[imgIndex2], isPrimary: false, displayOrder: 1 },
    ];

    const car = await prisma.car.create({
      data: {
        title: c.title,
        brand: c.brand,
        model: c.model,
        variant: c.variant,
        year: c.year,
        price: c.price,
        kmDriven: c.kmDriven,
        fuelType: c.fuelType,
        transmission: c.transmission,
        bodyType: c.bodyType,
        owners: c.owners,
        location: c.location,
        color: c.color,
        registrationYear: c.registrationYear,
        engineCc: c.engineCc,
        maxPower: c.maxPower,
        insurance: c.insurance,
        status: c.status,
        isFeatured: c.isFeatured,
        description: c.description,
        images: {
          create: carImages
        },
        features: {
          create: c.features.map(f => ({ name: f, category: 'Key Equipment' }))
        },
        inspection: {
          create: {
            overallScore: c.overallScore,
            engineScore: c.engineScore,
            exteriorScore: c.exteriorScore,
            interiorScore: c.interiorScore,
            tyresScore: c.tyresScore,
            brakesScore: c.brakesScore,
            electricalScore: c.electricalScore,
            acScore: c.acScore,
            suspensionScore: c.suspensionScore,
            summaryNotes: `Vehicle passed 200+ point multi-stage inspection with ${c.overallScore}/10 rating. Non-accidental structure, verified odometer reading, zero flood damage.`
          }
        }
      }
    });

    // Add sample enquiry and test drive for first few cars
    if (i < 3) {
      await prisma.testDriveBooking.create({
        data: {
          carId: car.id,
          userId: customer.id,
          customerName: customer.name,
          customerPhone: customer.phone,
          customerEmail: customer.email,
          date: '2026-10-10',
          timeSlot: '11:00 AM - 12:00 PM',
          location: `${c.location} Dealership Hub`,
          status: 'CONFIRMED'
        }
      });

      await prisma.enquiry.create({
        data: {
          carId: car.id,
          userId: customer.id,
          customerName: customer.name,
          customerPhone: customer.phone,
          customerEmail: customer.email,
          message: 'Hi, I am interested in this car. Is it possible to arrange doorstep test drive?',
          status: 'PENDING'
        }
      });

      await prisma.favourite.create({
        data: {
          userId: customer.id,
          carId: car.id
        }
      });
    }
  }

  // Add 2 Sell Car Leads
  await prisma.sellCarLead.create({
    data: {
      brand: 'Honda',
      model: 'Amaze',
      variant: 'VX Diesel MT',
      year: 2020,
      kmDriven: 42000,
      fuelType: 'Diesel',
      transmission: 'Manual',
      owners: 1,
      regLocation: 'Bangalore',
      customerName: 'Amit Patel',
      customerPhone: '+91 99887 76655',
      customerEmail: 'amit.p@example.com',
      city: 'Bangalore',
      notes: 'Car in great condition, looking to sell within 1 week.',
      status: 'NEW'
    }
  });

  await prisma.sellCarLead.create({
    data: {
      brand: 'Maruti Suzuki',
      model: 'Baleno',
      variant: 'Zeta Petrol',
      year: 2021,
      kmDriven: 28000,
      fuelType: 'Petrol',
      transmission: 'Manual',
      owners: 1,
      regLocation: 'Hyderabad',
      customerName: 'Srinivas Rao',
      customerPhone: '+91 98765 11223',
      customerEmail: 'srinivas@example.com',
      city: 'Hyderabad',
      notes: 'Want instant payment evaluation.',
      status: 'IN_PROGRESS'
    }
  });

  console.log('✅ AutoNest DB Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
