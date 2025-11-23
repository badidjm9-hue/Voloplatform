const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@hotelbooking.com' },
    update: {},
    create: {
      email: 'admin@hotelbooking.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
      isVerified: true,
    },
  });

  // Create test user
  const userPassword = await bcrypt.hash('user123', 12);
  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      password: userPassword,
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1234567890',
      role: 'CUSTOMER',
      isVerified: true,
    },
  });

  // Create amenities
  const amenities = [
    { name: 'Free WiFi', description: 'High-speed internet access throughout the property', icon: 'Wifi', category: 'INTERNET' },
    { name: 'Parking', description: 'On-site parking available', icon: 'Car', category: 'PARKING' },
    { name: 'Swimming Pool', description: 'Outdoor pool for guests', icon: 'Pool', category: 'POOL' },
    { name: 'Fitness Center', description: '24/7 gym access', icon: 'Dumbbell', category: 'FITNESS' },
    { name: 'Restaurant', description: 'On-site dining options', icon: 'UtensilsCrossed', category: 'FOOD_DRINK' },
    { name: 'Room Service', description: '24/7 room service available', icon: 'Bell', category: 'SERVICES' },
    { name: 'Business Center', description: 'Business facilities and meeting rooms', icon: 'Briefcase', category: 'BUSINESS' },
    { name: 'Pet Friendly', description: 'Pets allowed with restrictions', icon: 'Dog', category: 'PETS' },
    { name: 'Air Conditioning', description: 'Climate control in all rooms', icon: 'Wind', category: 'GENERAL' },
    { name: 'Laundry Service', description: 'Self-service and valet laundry', icon: 'Shirt', category: 'SERVICES' },
    { name: 'Concierge', description: '24/7 concierge services', icon: 'Users', category: 'SERVICES' },
    { name: 'Spa', description: 'Full-service spa treatments', icon: 'Sparkles', category: 'ENTERTAINMENT' },
    { name: 'Airport Shuttle', description: 'Complimentary airport transportation', icon: 'Plane', category: 'TRANSPORTATION' },
    { name: 'Beach Access', description: 'Direct beach access', icon: 'Waves', category: 'GENERAL' },
    { name: 'Bar', description: 'On-site bar and lounge', icon: 'Wine', category: 'FOOD_DRINK' },
  ];

  for (const amenity of amenities) {
    await prisma.amenity.upsert({
      where: { name: amenity.name },
      update: {},
      create: amenity,
    });
  }

  // Create sample hotels
  const hotels = [
    {
      name: 'Grand Plaza Hotel',
      slug: 'grand-plaza-hotel',
      description: 'Luxury hotel in the heart of downtown with stunning city views and world-class amenities.',
      shortDescription: 'Luxury downtown hotel with city views',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      postalCode: '10001',
      latitude: 40.7589,
      longitude: -73.9851,
      phone: '+1-555-0123',
      email: 'info@grandplaza.com',
      website: 'https://grandplaza.com',
      starRating: 5,
      propertyType: 'HOTEL',
      isFeatured: true,
      cancellationPolicy: 'Free cancellation up to 24 hours before check-in',
    },
    {
      name: 'Beachside Resort & Spa',
      slug: 'beachside-resort-spa',
      description: 'Beachfront resort offering relaxation, adventure, and luxury dining experiences.',
      shortDescription: 'Beachfront luxury resort',
      address: '456 Ocean Drive',
      city: 'Miami',
      state: 'FL',
      country: 'USA',
      postalCode: '33139',
      latitude: 25.7617,
      longitude: -80.1918,
      phone: '+1-555-0456',
      email: 'reservations@beachside.com',
      website: 'https://beachside.com',
      starRating: 4,
      propertyType: 'RESORT',
      isFeatured: true,
      cancellationPolicy: 'Free cancellation up to 48 hours before check-in',
    },
    {
      name: 'Mountain View Lodge',
      slug: 'mountain-view-lodge',
      description: 'Cozy mountain retreat with hiking trails, spa services, and gourmet dining.',
      shortDescription: 'Cozy mountain retreat',
      address: '789 Mountain Road',
      city: 'Aspen',
      state: 'CO',
      country: 'USA',
      postalCode: '81611',
      latitude: 39.1911,
      longitude: -106.8175,
      phone: '+1-555-0789',
      email: 'stay@mountainview.com',
      website: 'https://mountainview.com',
      starRating: 3,
      propertyType: 'BOUTIQUE',
      isFeatured: false,
      cancellationPolicy: 'Free cancellation up to 72 hours before check-in',
    },
    {
      name: 'Urban Business Hotel',
      slug: 'urban-business-hotel',
      description: 'Modern business hotel in the financial district with state-of-the-art meeting facilities.',
      shortDescription: 'Modern business hotel',
      address: '321 Business Ave',
      city: 'Chicago',
      state: 'IL',
      country: 'USA',
      postalCode: '60601',
      latitude: 41.8781,
      longitude: -87.6298,
      phone: '+1-555-0321',
      email: 'business@urbanhotel.com',
      website: 'https://urbanhotel.com',
      starRating: 4,
      propertyType: 'BUSINESS',
      isFeatured: false,
      cancellationPolicy: 'Free cancellation up to 24 hours before check-in',
    },
    {
      name: 'Historic Grand Hotel',
      slug: 'historic-grand-hotel',
      description: 'Elegant historic hotel restored to its original grandeur with modern conveniences.',
      shortDescription: 'Historic luxury hotel',
      address: '555 Heritage Lane',
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
      postalCode: '94102',
      latitude: 37.7749,
      longitude: -122.4194,
      phone: '+1-555-0555',
      email: 'reservations@historichotel.com',
      website: 'https://historichotel.com',
      starRating: 5,
      propertyType: 'BOUTIQUE',
      isFeatured: true,
      cancellationPolicy: 'Free cancellation up to 48 hours before check-in',
    },
  ];

  for (const hotelData of hotels) {
    const hotel = await prisma.hotel.upsert({
      where: { slug: hotelData.slug },
      update: {},
      create: hotelData,
    });

    // Add amenities to hotel
    const amenityList = await prisma.amenity.findMany();
    const randomAmenities = amenityList.slice(0, Math.floor(Math.random() * 10) + 5);
    
    for (const amenity of randomAmenities) {
      await prisma.hotelAmenity.upsert({
        where: {
          hotelId_amenityId: {
            hotelId: hotel.id,
            amenityId: amenity.id,
          },
        },
        update: {},
        create: {
          hotelId: hotel.id,
          amenityId: amenity.id,
        },
      });
    }

    // Create room types for each hotel
    const roomTypes = ['STANDARD', 'DELUXE', 'SUITE'];
    const roomNames = ['Standard Room', 'Deluxe Room', 'Executive Suite'];
    
    for (let i = 0; i < roomTypes.length; i++) {
      const room = await prisma.room.upsert({
        where: {
          hotelId_name: {
            hotelId: hotel.id,
            name: roomNames[i],
          },
        },
        update: {},
        create: {
          hotelId: hotel.id,
          name: roomNames[i],
          description: `Comfortable ${roomNames[i].toLowerCase()} with modern amenities`,
          roomType: roomTypes[i],
          size: 25 + (i * 15), // Different sizes
          maxOccupancy: 2 + i, // Different occupancy
          bedType: i === 2 ? 'King Bed' : 'Queen Bed',
          amenities: ['Free WiFi', 'Air Conditioning', 'Room Service'],
          basePrice: 150 + (i * 50), // Different pricing
          totalRooms: 10 + i,
          availableRooms: 8 + i,
        },
      });

      // Create availability for next 30 days
      const today = new Date();
      for (let day = 0; day < 30; day++) {
        const date = new Date(today);
        date.setDate(date.getDate() + day);
        
        const basePrice = 150 + (i * 50);
        const weekendMultiplier = [0, 6].includes(date.getDay()) ? 1.2 : 1;
        const price = basePrice * weekendMultiplier;
        
        await prisma.availability.upsert({
          where: {
            hotelId_roomId_date: {
              hotelId: hotel.id,
              roomId: room.id,
              date: date,
            },
          },
          update: {
            price,
            availableRooms: Math.floor(Math.random() * 5) + 1,
          },
          create: {
            hotelId: hotel.id,
            roomId: room.id,
            date,
            price,
            availableRooms: Math.floor(Math.random() * 5) + 1,
          },
        });
      }
    }

    // Create policies
    await prisma.policy.upsert({
      where: {
        hotelId_type: {
          hotelId: hotel.id,
          type: 'CANCELLATION',
        },
      },
      update: {},
      create: {
        hotelId: hotel.id,
        type: 'CANCELLATION',
        title: 'Cancellation Policy',
        description: hotel.cancellationPolicy,
        rules: {
          free_cancellation_hours: hotel.cancellationPolicy.includes('24 hours') ? 24 : 
                                   hotel.cancellationPolicy.includes('48 hours') ? 48 : 72,
          late_cancellation_fee: 50,
          no_show_fee: 100,
        },
      },
    });

    // Create sample images
    const sampleImages = [
      {
        url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        altText: `${hotel.name} exterior`,
        isPrimary: true,
      },
      {
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        altText: `${hotel.name} lobby`,
        isPrimary: false,
      },
      {
        url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        altText: `${hotel.name} room`,
        isPrimary: false,
      },
    ];

    for (const imageData of sampleImages) {
      await prisma.image.upsert({
        where: {
          hotelId_url: {
            hotelId: hotel.id,
            url: imageData.url,
          },
        },
        update: {},
        create: {
          hotelId: hotel.id,
          ...imageData,
        },
      });
    }
  }

  // Create user preferences
  await prisma.userPreference.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      language: 'en',
      currency: 'USD',
      timezone: 'America/New_York',
    },
  });

  // Create sample settings
  const settings = [
    {
      key: 'site_settings',
      value: {
        siteName: 'Hotel Booking Platform',
        siteDescription: 'Find and book hotels worldwide',
        defaultCurrency: 'USD',
        supportedLanguages: ['en', 'ar', 'fr', 'es'],
        commissionRate: 0.15,
      },
    },
    {
      key: 'api_settings',
      value: {
        rateHawk: { enabled: true, priority: 1 },
        amadeus: { enabled: true, priority: 2 },
        expedia: { enabled: true, priority: 3 },
      },
    },
  ];

  for (const setting of settings) {
    await prisma.settings.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }

  console.log('✅ Database seeded successfully!');
  console.log(`👤 Admin user created: admin@hotelbooking.com / admin123`);
  console.log(`👤 Test user created: user@example.com / user123`);
  console.log(`🏨 Created ${hotels.length} sample hotels with rooms and availability`);
  console.log(`⭐ Created ${amenities.length} amenities`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });