/**
 * ALI GLOBAL TRAVEL & TOURS SDN. BHD.
 * Data Store Layer - Unified API, LocalStorage, and Static Embedded Fallback
 */

const DEFAULT_DB = {
  "settings": {
    "companyName": "ALI GLOBAL TRAVEL & TOURS SDN. BHD.",
    "tagline": "Your Trusted Travel Partner",
    "specialisation": "Inbound Tour Specialist",
    "description": "Travel Agency in Malaysia",
    "ssm": "202601003654 (1665751-M)",
    "motac": "L/N 13304",
    "contactPerson": "Mr Ali",
    "primaryPhone": "+60 16-500 6972",
    "primaryWhatsApp": "60165006972",
    "secondaryPhone": "+60 14-644 4896",
    "secondaryWhatsApp": "60146444896",
    "email": "info@ali-global-travel.com",
    "address": "No. 11, Tingkat 1, Jalan Bunga Raya 2, Taman Bunga Raya, Bandar Baru Salak Tinggi, Sepang, Selangor 43900, Malaysia.",
    "mapsUrl": "https://maps.app.goo.gl/JWqYCemmRky8yJWR8?g_st=iwb",
    "instagram": "https://www.instagram.com/ali_globaltravel_tours",
    "instagramHandle": "@ali_globaltravel_tours",
    "heroTitle": "Explore Malaysia with Us",
    "heroSubtitle": "Your Trusted Travel Partner",
    "heroDescription": "Discover Malaysia with Ali Global Travel & Tours Sdn. Bhd. We arrange private tours, group holidays, airport transfers and customised sightseeing trips for international and local guests. Whether you are travelling with family, friends or a large group, let us help you plan a memorable Malaysian holiday.",
    "facebook": "https://www.facebook.com/aliglobaltravel",
    "tiktok": "https://www.tiktok.com/@aliglobaltravel"
  },
  "destinations": [
    {
      "id": "kuala-lumpur",
      "name": "Kuala Lumpur",
      "image": "assets/images/destinations/kuala-lumpur.jpg",
      "tagline": "Iconic Skyline & Modern Heritage",
      "description": "Malaysia's buzzing capital, home to the magnificent PETRONAS Twin Towers, vibrant street markets, and modern shopping paradises.",
      "tourId": "tour-01"
    },
    {
      "id": "putrajaya",
      "name": "Putrajaya",
      "image": "assets/images/destinations/putrajaya.jpg",
      "tagline": "Architectural Marvel & Garden City",
      "description": "Marvel at stunning pink domes of Putra Mosque, majestic bridges, and serene lakeside cruises in Malaysia's federal administrative center.",
      "tourId": "tour-11"
    },
    {
      "id": "genting-highlands",
      "name": "Genting Highlands",
      "image": "assets/images/destinations/genting-highlands.jpg",
      "tagline": "Mountain Entertainment & Cool Breezes",
      "description": "A thrilling mountain resort with cable car rides, world-class indoor and outdoor theme parks, and cool highland mist.",
      "tourId": "tour-04"
    },
    {
      "id": "batu-caves",
      "name": "Batu Caves",
      "image": "assets/images/destinations/batu-caves-murugan.jpg",
      "tagline": "Sacred Limestone Caves & Golden Murugan",
      "description": "Scale the iconic 272 rainbow steps under the gaze of the towering 140-foot golden Lord Murugan statue into ancient limestone caverns.",
      "tourId": "tour-04"
    },
    {
      "id": "cameron-highlands",
      "name": "Cameron Highlands",
      "image": "assets/images/destinations/cameron-highlands.jpg",
      "tagline": "Rolling Tea Plantations & Strawberry Farms",
      "description": "Escape to refreshing mountain air, vast BOH tea plantations, fresh strawberry orchards, flower gardens, and the enchanted Mossy Forest.",
      "tourId": "tour-05"
    },
    {
      "id": "melaka",
      "name": "Melaka",
      "image": "assets/images/destinations/melaka.jpg",
      "tagline": "UNESCO World Heritage & Colonial History",
      "description": "Step back through centuries of Portuguese, Dutch, and British history at Dutch Square, Jonker Street, and A Famosa.",
      "tourId": "tour-03"
    },
    {
      "id": "kuala-selangor",
      "name": "Kuala Selangor",
      "image": "assets/images/destinations/kuala-selangor-nature.jpg",
      "tagline": "Firefly Sanctuaries & Coastal Wonder",
      "description": "Experience magical night boat rides amidst thousands of synchronised fireflies, historic Bukit Melawati, and pristine Sky Mirror tides.",
      "tourId": "tour-09"
    },
    {
      "id": "ipoh",
      "name": "Ipoh",
      "image": "assets/images/destinations/ipoh.jpg",
      "tagline": "Colonial Charm & Culinary Capital",
      "description": "Famous for aromatic white coffee, historic Concubine Lane, British colonial architecture, and majestic limestone cave temples.",
      "tourId": "tour-08"
    },
    {
      "id": "penang",
      "name": "Penang",
      "image": "assets/images/destinations/penang.jpg",
      "tagline": "Pearl of the Orient & World-Renowned Street Food",
      "description": "Explore UNESCO George Town street art, historic clan jetties, Kek Lok Si Temple, and unbeatable hawker gastronomy.",
      "tourId": "tour-07"
    },
    {
      "id": "johor-bahru",
      "name": "Johor Bahru",
      "image": "assets/images/destinations/johor-bahru.jpg",
      "tagline": "Southern Gateway & Family Theme Parks",
      "description": "Rich heritage streets, royal mosques, premier duty-free outlet shopping, and family adventures at LEGOLAND Malaysia.",
      "tourId": "tour-06"
    },
    {
      "id": "langkawi",
      "name": "Langkawi",
      "image": "assets/images/destinations/langkawi-beach.jpg",
      "tagline": "Jewel of Kedah & Tropical Island Paradise",
      "description": "Turquoise waters, iconic Langkawi SkyBridge, eagle feeding boat tours, pristine beaches, and duty-free shopping delights.",
      "tourId": "tour-10"
    }
  ],
  "tours": [
    {
      "id": "tour-01",
      "number": "TOUR 01",
      "title": "Kuala Lumpur City Tour",
      "category": "city",
      "image": "assets/images/packages/kl-1.jpg",
      "gallery": [
        { "src": "assets/images/packages/kl-1.jpg", "caption": "PETRONAS Twin Towers" },
        { "src": "assets/images/packages/kl-2.jpg", "caption": "KL Tower Skyline" },
        { "src": "assets/images/packages/kl-3.jpg", "caption": "Thean Hou Temple" },
        { "src": "assets/images/packages/kl-4.jpg", "caption": "Chinatown & Central Market" }
      ],
      "intro": "Discover the iconic landmarks, cultural attractions and vibrant city life of Kuala Lumpur.",
      "landmarks": [
        "PETRONAS Twin Towers (KLCC)",
        "KL Tower",
        "National Monument (Tugu Negara)",
        "Dataran Merdeka (Merdeka Square)",
        "Sultan Abdul Samad Building",
        "Istana Negara (exterior)"
      ],
      "culture": [
        "National Mosque",
        "Thean Hou Temple",
        "Central Market",
        "Petaling Street"
      ],
      "optionalShopping": [
        "Suria KLCC",
        "Pavilion Kuala Lumpur",
        "Berjaya Times Square"
      ],
      "optionalThemeParks": [
        "Ask us about a separate Sunway Lagoon day trip in Bandar Sunway"
      ],
      "priceNote": "Contact us for pricing and availability",
      "featured": true,
      "enabled": true
    },
    {
      "id": "tour-02",
      "number": "TOUR 02",
      "title": "Kuala Lumpur Shopping Tour",
      "category": "city",
      "image": "assets/images/destinations/central-market.jpg",
      "gallery": [
        { "src": "assets/images/destinations/central-market.jpg", "caption": "Central Market Pasar Seni" },
        { "src": "assets/images/packages/kl-4.jpg", "caption": "Petaling Street Chinatown" },
        { "src": "assets/images/packages/kl-1.jpg", "caption": "Suria KLCC Malls" },
        { "src": "assets/images/destinations/kl-shopping.jpg", "caption": "Pavilion & Shopping Districts" }
      ],
      "intro": "Enjoy a shopping experience across Kuala Lumpur's famous shopping destinations, fashion streets and souvenir markets.",
      "landmarks": [
        "Pavilion Kuala Lumpur",
        "Suria KLCC",
        "The Exchange TRX",
        "Mid Valley Megamall"
      ],
      "culture": [
        "Jalan Masjid India",
        "Jalan Tuanku Abdul Rahman",
        "Central Market",
        "Petaling Street"
      ],
      "optionalShopping": [
        "Mitsui Outlet Park KLIA Sepang"
      ],
      "optionalThemeParks": [],
      "priceNote": "Contact us for pricing and availability",
      "featured": false,
      "enabled": true
    },
    {
      "id": "tour-03",
      "number": "TOUR 03",
      "title": "Melaka Heritage Tour",
      "category": "heritage",
      "image": "assets/images/packages/melaka-1.jpg",
      "gallery": [
        { "src": "assets/images/packages/melaka-1.jpg", "caption": "Dutch Square Red Square" },
        { "src": "assets/images/packages/melaka-3.jpg", "caption": "A Famosa Fortress" },
        { "src": "assets/images/packages/melaka-2.jpg", "caption": "Melaka River & Jonker Walk" },
        { "src": "assets/images/packages/melaka-4.jpg", "caption": "Melaka Straits Mosque" }
      ],
      "intro": "Explore the historical streets, cultural landmarks and heritage attractions of Melaka.",
      "landmarks": [
        "Dutch Square (Red Square)",
        "Christ Church Melaka",
        "A Famosa",
        "St. Paul's Hill"
      ],
      "culture": [
        "Jonker Street",
        "Cheng Hoon Teng Temple",
        "Melaka River waterfront",
        "Maritime Museum"
      ],
      "optionalShopping": [],
      "optionalThemeParks": [
        "Melaka River Cruise",
        "Melaka Straits Mosque"
      ],
      "priceNote": "Contact us for pricing and availability",
      "featured": true,
      "enabled": true
    },
    {
      "id": "tour-04",
      "number": "TOUR 04",
      "title": "Genting Highlands & Batu Caves Tour",
      "category": "nature",
      "image": "assets/images/packages/genting-3.jpg",
      "gallery": [
        { "src": "assets/images/packages/genting-3.jpg", "caption": "Batu Caves 140ft Golden Murugan" },
        { "src": "assets/images/packages/genting-1.jpg", "caption": "Awana SkyWay Cable Car" },
        { "src": "assets/images/packages/genting-4.jpg", "caption": "Chin Swee Caves Temple" },
        { "src": "assets/images/packages/genting-2.jpg", "caption": "Genting Misty Peaks" }
      ],
      "intro": "Experience the colourful Batu Caves and the beautiful mountain attractions of Genting Highlands.",
      "landmarks": [
        "Golden Lord Murugan statue & Colourful staircase",
        "Main Temple Cave",
        "Awana SkyWay cable car",
        "Chin Swee Caves Temple",
        "SkyAvenue",
        "Genting Highlands Premium Outlets"
      ],
      "culture": [
        "Chin Swee Caves Temple & Pagoda",
        "Limestone cave shrines"
      ],
      "optionalShopping": [
        "Genting Highlands Premium Outlets"
      ],
      "optionalThemeParks": [
        "Genting SkyWorlds Outdoor Theme Park",
        "Skytropolis Indoor Theme Park"
      ],
      "priceNote": "Contact us for pricing and availability",
      "featured": true,
      "enabled": true
    },
    {
      "id": "tour-05",
      "number": "TOUR 05",
      "title": "Cameron Highlands Tour",
      "category": "nature",
      "image": "assets/images/packages/cameron-1.jpg",
      "gallery": [
        { "src": "assets/images/packages/cameron-1.jpg", "caption": "BOH Tea Sungei Palas" },
        { "src": "assets/images/packages/cameron-2.jpg", "caption": "Cameron Valley Tea House" },
        { "src": "assets/images/packages/cameron-3.jpg", "caption": "Fresh Strawberry Farm" },
        { "src": "assets/images/packages/cameron-4.jpg", "caption": "Flora Park & Mossy Forest" }
      ],
      "intro": "Enjoy the refreshing mountain atmosphere, beautiful tea plantations and scenic gardens of Cameron Highlands.",
      "landmarks": [
        "BOH Tea Centre at Sungei Palas",
        "Cameron Valley Tea House",
        "Cameron Flora Park"
      ],
      "culture": [
        "Fresh Strawberry Farm",
        "Kea Farm Market",
        "Cameron Highlands Butterfly Farm"
      ],
      "optionalShopping": [
        "Kea Farm local produce market"
      ],
      "optionalThemeParks": [
        "Mossy Forest (subject to access and weather)"
      ],
      "priceNote": "Contact us for pricing and availability",
      "featured": true,
      "enabled": true
    },
    {
      "id": "tour-06",
      "number": "TOUR 06",
      "title": "Johor Bahru Tour",
      "category": "heritage",
      "image": "assets/images/destinations/johor-bahru.jpg",
      "gallery": [
        { "src": "assets/images/destinations/johor-bahru.jpg", "caption": "Sultan Abu Bakar State Mosque" }
      ],
      "intro": "Discover Johor Bahru's heritage landmarks, shopping attractions and family destinations.",
      "landmarks": [
        "Sultan Abu Bakar State Mosque",
        "Jalan Tan Hiok Nee Heritage Street",
        "Johor Bahru Old Chinese Temple",
        "Danga Bay"
      ],
      "culture": [
        "Jalan Tan Hiok Nee cultural cafes & bakeries",
        "Johor heritage trail"
      ],
      "optionalShopping": [
        "Johor Bahru City Square",
        "The Mall, Mid Valley Southkey",
        "Johor Premium Outlets"
      ],
      "optionalThemeParks": [
        "LEGOLAND Malaysia in Iskandar Puteri"
      ],
      "priceNote": "Contact us for pricing and availability",
      "featured": false,
      "enabled": true
    },
    {
      "id": "tour-07",
      "number": "TOUR 07",
      "title": "Penang Tour",
      "category": "heritage",
      "image": "assets/images/packages/penang-2.jpg",
      "gallery": [
        { "src": "assets/images/packages/penang-2.jpg", "caption": "Kek Lok Si Temple" },
        { "src": "assets/images/packages/penang-1.jpg", "caption": "George Town Street Art" },
        { "src": "assets/images/packages/penang-3.jpg", "caption": "Chew Jetty Waterfront" },
        { "src": "assets/images/packages/penang-4.jpg", "caption": "Batu Ferringhi Coast" }
      ],
      "intro": "Explore the cultural heritage, scenic attractions and famous food destinations of Penang.",
      "landmarks": [
        "George Town Street Art around Armenian Street",
        "Khoo Kongsi clan house",
        "Chew Jetty historic waterfront",
        "Little India"
      ],
      "culture": [
        "Kek Lok Si Temple",
        "Penang Hill funicular & scenic lookout",
        "Waterfront near Fort Cornwallis"
      ],
      "optionalShopping": [
        "Batu Ferringhi night market"
      ],
      "optionalThemeParks": [
        "Penang Nasi Kandar Food Trail",
        "Entopia by Penang Butterfly Farm"
      ],
      "priceNote": "Contact us for pricing and availability",
      "featured": true,
      "enabled": true
    },
    {
      "id": "tour-08",
      "number": "TOUR 08",
      "title": "Ipoh Tour",
      "category": "heritage",
      "image": "assets/images/destinations/ipoh.jpg",
      "gallery": [
        { "src": "assets/images/destinations/ipoh.jpg", "caption": "Concubine Lane Heritage" }
      ],
      "intro": "Discover Ipoh's colonial architecture, historic streets, cave temples and famous local flavours.",
      "landmarks": [
        "Ipoh Railway Station (Taj Mahal of Ipoh)",
        "Concubine Lane",
        "Kong Heng Square",
        "Birch Memorial Clock Tower"
      ],
      "culture": [
        "Kek Lok Tong Cave Temple",
        "Perak Tong Cave Temple",
        "Qing Xin Ling Leisure & Cultural Village (subject to availability)"
      ],
      "optionalShopping": [
        "Ipoh famous confectionery and pastry shops"
      ],
      "optionalThemeParks": [
        "Ipoh White Coffee tasting",
        "Bean sprout chicken dining experience"
      ],
      "priceNote": "Contact us for pricing and availability",
      "featured": false,
      "enabled": true
    },
    {
      "id": "tour-09",
      "number": "TOUR 09",
      "title": "Kuala Selangor Tour",
      "category": "nature",
      "image": "assets/images/destinations/kuala-selangor.jpg",
      "gallery": [
        { "src": "assets/images/destinations/kuala-selangor.jpg", "caption": "Bukit Melawati & Fort" },
        { "src": "assets/images/destinations/kuala-selangor-nature.jpg", "caption": "Mangroves & Nature Park" }
      ],
      "intro": "Enjoy nature, coastal scenery and memorable evening experiences in Kuala Selangor.",
      "landmarks": [
        "Bukit Melawati historic lighthouse & silvered leaf monkeys",
        "Kuala Selangor Nature Park",
        "Pasir Penambang fishing village"
      ],
      "culture": [
        "Riverside fresh seafood feast",
        "Firefly boat ride experience"
      ],
      "optionalShopping": [
        "Local dried seafood market"
      ],
      "optionalThemeParks": [
        "Sky Mirror (subject to tides and weather)",
        "Eagle watching boat tour"
      ],
      "priceNote": "Contact us for pricing and availability",
      "featured": false,
      "enabled": true
    },
    {
      "id": "tour-10",
      "number": "TOUR 10",
      "title": "Langkawi Tour",
      "category": "beach",
      "image": "assets/images/packages/langkawi-1.jpg",
      "gallery": [
        { "src": "assets/images/packages/langkawi-1.jpg", "caption": "Langkawi SkyBridge" },
        { "src": "assets/images/packages/langkawi-2.jpg", "caption": "Eagle Square Dataran Lang" },
        { "src": "assets/images/packages/langkawi-3.jpg", "caption": "Kilim Mangrove Safari" },
        { "src": "assets/images/packages/langkawi-4.jpg", "caption": "Pantai Cenang Beach" }
      ],
      "intro": "Explore Langkawi's beautiful beaches, scenic cable car rides, island attractions and nature experiences.",
      "landmarks": [
        "Langkawi SkyCab cable car",
        "SkyBridge panoramic suspension bridge",
        "Oriental Village",
        "Eagle Square (Dataran Lang)",
        "Pantai Cenang beach"
      ],
      "culture": [
        "Underwater World Langkawi",
        "Kuah duty-free shopping hubs"
      ],
      "optionalShopping": [
        "Kuah Town duty-free complexes"
      ],
      "optionalThemeParks": [
        "Kilim Geoforest Park mangrove boat tour",
        "Island-hopping boat tour to Pulau Dayang Bunting and Pulau Beras Basah"
      ],
      "priceNote": "Contact us for pricing and availability",
      "featured": true,
      "enabled": true
    },
    {
      "id": "tour-11",
      "number": "TOUR 11",
      "title": "Putrajaya Tour",
      "category": "city",
      "image": "assets/images/packages/putrajaya-1.jpg",
      "gallery": [
        { "src": "assets/images/packages/putrajaya-1.jpg", "caption": "Putra Mosque Pink Dome" },
        { "src": "assets/images/packages/putrajaya-2.jpg", "caption": "Seri Wawasan Bridge" },
        { "src": "assets/images/packages/putrajaya-3.jpg", "caption": "Perdana Putra Complex" },
        { "src": "assets/images/packages/putrajaya-4.jpg", "caption": "Putrajaya Lake Cruise" }
      ],
      "intro": "Discover Putrajaya's beautiful architecture, impressive bridges, lakeside scenery and iconic landmarks.",
      "landmarks": [
        "Putra Mosque (Pink Mosque)",
        "Putra Square (Dataran Putra)",
        "Perdana Putra (Prime Minister's Office exterior)",
        "Seri Wawasan Bridge",
        "Putrajaya lakeside promenade"
      ],
      "culture": [
        "Putrajaya Botanical Garden",
        "Lakeside architectural sightseeing"
      ],
      "optionalShopping": [
        "Alamanda Shopping Centre or IOI City Mall Putrajaya"
      ],
      "optionalThemeParks": [
        "Putrajaya Lake Cruise"
      ],
      "priceNote": "Contact us for pricing and availability",
      "featured": true,
      "enabled": true
    }
  ],
  "vehicles": [
    {
      "id": "v-44-bus",
      "name": "44-Seater Tour Bus",
      "capacity": "44 Passengers",
      "description": "Ideal for large tourist groups, corporate trips and organised group travel. Equipped with high-deck panoramic windows, comfortable reclining seats, professional sound system, luggage compartment, and experienced licensed driver.",
      "image": "assets/images/vehicles/vehicle-3.jpg",
      "features": ["44 Ergonomic Reclining Seats", "Full Air-Conditioning", "Huge Luggage Compartment", "Microphone & Audio System", "Licensed Tourist Bus Captain"]
    },
    {
      "id": "v-18-van",
      "name": "18-Seater High-Roof Van",
      "capacity": "18 Passengers",
      "description": "Suitable for medium-sized groups, family holidays and private sightseeing trips. High-roof space, ample luggage capacity, and smooth ride quality across city and interstate highways.",
      "image": "assets/images/vehicles/vehicle-4.jpg",
      "features": ["18 High-Roof Seats", "Dual Air-Conditioning", "Spacious Aisle", "Dedicated Luggage Area", "Courteous Professional Driver"]
    },
    {
      "id": "v-44-coach",
      "name": "44-Seater Tour Bus",
      "capacity": "44 Passengers",
      "description": "Spacious, fully air-conditioned tourist coach ideal for large holiday groups, interstate travel, and airport delegations across Malaysia.",
      "image": "assets/images/vehicles/vehicle-5.jpg",
      "features": ["44 Reclining Seats", "Cold Climate Control", "Large Luggage Storage", "USB Charging Ports", "Licensed Bus Captain"]
    },
    {
      "id": "v-18-white-van",
      "name": "18-Seater White Tour Van",
      "capacity": "18 Passengers",
      "description": "Modern white touring van perfect for medium-sized groups, private family holidays, and convenient KLIA/KLIA2 airport transfers.",
      "image": "assets/images/vehicles/vehicle-2.jpg",
      "features": ["18 Comfortable Seats", "Ultra-Smooth Ride", "Rear AC Vents", "Spacious Luggage Area", "Airport Transfer Specialist"]
    },
    {
      "id": "v-18-starex",
      "name": "Hyundai Starex – 18-Seater",
      "capacity": "18 Passengers",
      "description": "A convenient and luxurious choice for tour groups, VIP delegations, and private family travel arrangements throughout Peninsular Malaysia.",
      "image": "assets/images/vehicles/vehicle-7.jpg",
      "features": ["18 Executive Seats", "Ultra-Smooth Suspension", "Rear AC Vents", "Tinted Privacy Windows", "Airport Transfer Specialist"]
    }
  ],
  "gallery": [
    {
      "id": "gal-c1",
      "title": "International Tourist Group Welcomed in Malaysia",
      "category": "customers",
      "categoryName": "Guest Experiences",
      "image": "assets/images/customers/customer-1.jpg"
    },
    {
      "id": "gal-c2",
      "title": "Happy Traveler Sightseeing Tour",
      "category": "customers",
      "categoryName": "Guest Experiences",
      "image": "assets/images/customers/customer-2.jpg"
    },
    {
      "id": "gal-c3",
      "title": "Private Family Holiday Excursion in Malaysia",
      "category": "tours",
      "categoryName": "Group Tours",
      "image": "assets/images/customers/customer-3.jpg"
    },
    {
      "id": "gal-c4",
      "title": "Tour Delegates Scenic Group Moment",
      "category": "tours",
      "categoryName": "Group Tours",
      "image": "assets/images/customers/customer-4.jpg"
    },
    {
      "id": "gal-c5",
      "title": "Smiling Guests at Malaysian Cultural Landmark",
      "category": "customers",
      "categoryName": "Guest Experiences",
      "image": "assets/images/customers/customer-5.jpg"
    },
    {
      "id": "gal-c6",
      "title": "Delighted Tour Group Exploring Together",
      "category": "customers",
      "categoryName": "Guest Experiences",
      "image": "assets/images/customers/customer-6.jpg"
    },
    {
      "id": "gal-c7",
      "title": "Custom Inbound Tour Group Holiday",
      "category": "tours",
      "categoryName": "Group Tours",
      "image": "assets/images/customers/customer-7.jpg"
    },
    {
      "id": "gal-v1",
      "title": "Modern Tourist Fleet - Front View",
      "category": "transport",
      "categoryName": "Transportation",
      "image": "assets/images/vehicles/vehicle-1.jpg"
    },
    {
      "id": "gal-v2",
      "title": "Pristine White Passenger Tour Van",
      "category": "transport",
      "categoryName": "Transportation",
      "image": "assets/images/vehicles/vehicle-2.jpg"
    },
    {
      "id": "gal-v3",
      "title": "44-Seater Luxury Tour Bus Charter",
      "category": "transport",
      "categoryName": "Transportation",
      "image": "assets/images/vehicles/vehicle-3.jpg"
    },
    {
      "id": "gal-v4",
      "title": "High-Roof 18-Seater Tour Van",
      "category": "transport",
      "categoryName": "Transportation",
      "image": "assets/images/vehicles/vehicle-4.jpg"
    },
    {
      "id": "gal-v5",
      "title": "44-Seater Group Tour Bus",
      "category": "transport",
      "categoryName": "Transportation",
      "image": "assets/images/vehicles/vehicle-5.jpg"
    },
    {
      "id": "gal-v6",
      "title": "Clean, Sanitized Passenger Cabin & Seating",
      "category": "transport",
      "categoryName": "Transportation",
      "image": "assets/images/vehicles/vehicle-6.jpg"
    },
    {
      "id": "gal-v7",
      "title": "Hyundai Starex 18-Seater Executive MPV",
      "category": "transport",
      "categoryName": "Transportation",
      "image": "assets/images/vehicles/vehicle-7.jpg"
    },
    {
      "id": "gal-v8",
      "title": "Fleet Ready for Interstate Long-Distance Travel",
      "category": "transport",
      "categoryName": "Transportation",
      "image": "assets/images/vehicles/vehicle-8.jpg"
    },
    {
      "id": "gal-ticket-poster",
      "title": "Official Attraction Tickets & Tour Packages",
      "category": "attractions",
      "categoryName": "Attractions & Sightseeing",
      "image": "assets/images/attractions/attraction-tickets-poster.jpg"
    },
    {
      "id": "gal-chinatown",
      "title": "Petaling Street Chinatown, Kuala Lumpur",
      "category": "attractions",
      "categoryName": "Attractions & Sightseeing",
      "image": "assets/images/packages/kl-4.jpg"
    },
    {
      "id": "gal-central-market",
      "title": "Central Market (Pasar Seni), Kuala Lumpur",
      "category": "attractions",
      "categoryName": "Attractions & Sightseeing",
      "image": "assets/images/destinations/central-market.jpg"
    },
    {
      "id": "gal-ipoh",
      "title": "Concubine Lane Heritage Street, Ipoh",
      "category": "destinations",
      "categoryName": "Malaysia Destinations",
      "image": "assets/images/destinations/ipoh.jpg"
    },
    {
      "id": "gal-kuala-selangor",
      "title": "Bukit Melawati Nature & Fortress, Kuala Selangor",
      "category": "destinations",
      "categoryName": "Malaysia Destinations",
      "image": "assets/images/destinations/kuala-selangor.jpg"
    },
    {
      "id": "gal-penang-art",
      "title": "George Town Heritage Street Art, Penang",
      "category": "attractions",
      "categoryName": "Attractions & Sightseeing",
      "image": "assets/images/packages/penang-1.jpg"
    },
    {
      "id": "gal-aquaria",
      "title": "Aquaria KLCC Oceanarium Tunnel",
      "category": "attractions",
      "categoryName": "Attractions & Sightseeing",
      "image": "assets/images/attractions/aquaria-klcc.jpg"
    },
    {
      "id": "gal-bird-park",
      "title": "KL Bird Park Hornbill & Aviary",
      "category": "attractions",
      "categoryName": "Attractions & Sightseeing",
      "image": "assets/images/attractions/kl-bird-park.jpg"
    },
    {
      "id": "gal-d1",
      "title": "PETRONAS Twin Towers, Kuala Lumpur",
      "category": "destinations",
      "categoryName": "Malaysia Destinations",
      "image": "assets/images/destinations/kuala-lumpur.jpg"
    },
    {
      "id": "gal-d2",
      "title": "Putra Mosque & Waterfront, Putrajaya",
      "category": "destinations",
      "categoryName": "Malaysia Destinations",
      "image": "assets/images/destinations/putrajaya.jpg"
    },
    {
      "id": "gal-d3",
      "title": "Batu Caves Golden Murugan & Rainbow Stairs",
      "category": "attractions",
      "categoryName": "Attractions & Sightseeing",
      "image": "assets/images/destinations/batu-caves-murugan.jpg"
    },
    {
      "id": "gal-d4",
      "title": "Emerald BOH Tea Plantations, Cameron Highlands",
      "category": "destinations",
      "categoryName": "Malaysia Destinations",
      "image": "assets/images/destinations/cameron-highlands.jpg"
    },
    {
      "id": "gal-d5",
      "title": "Historic Dutch Red Square, Melaka",
      "category": "attractions",
      "categoryName": "Attractions & Sightseeing",
      "image": "assets/images/destinations/melaka.jpg"
    },
    {
      "id": "gal-d6",
      "title": "Tropical Beach Haven, Langkawi",
      "category": "destinations",
      "categoryName": "Malaysia Destinations",
      "image": "assets/images/destinations/langkawi-beach.jpg"
    }
  ],
  "enquiries": []
};

const Store = (function () {
  const STORAGE_KEY = 'ali_global_travel_data_v5';
  let isApiAvailable = false;
  let cache = null;

  async function checkApi() {
    return false;
  }

  async function init() {
    const local = localStorage.getItem(STORAGE_KEY);
    if (local) {
      try {
        cache = JSON.parse(local);
      } catch (e) {
        cache = null;
      }
    }
    if (!cache) {
      // Initialize with embedded DEFAULT_DB
      cache = JSON.parse(JSON.stringify(DEFAULT_DB));
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
      } catch (e) {}
    }
    return cache;
  }

  function getLocalData() {
    if (!cache) {
      const local = localStorage.getItem(STORAGE_KEY);
      if (local) {
        try { cache = JSON.parse(local); } catch (e) {}
      }
    }
    return cache || DEFAULT_DB;
  }

  function saveLocalData(data) {
    cache = data;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {}
  }

  return {
    init,

    async getSettings() {
      if (isApiAvailable) {
        try {
          const res = await fetch('/api/settings');
          if (res.ok) return await res.json();
        } catch (e) {}
      }
      return getLocalData().settings || DEFAULT_DB.settings;
    },

    async updateSettings(settings) {
      if (isApiAvailable) {
        try {
          const res = await fetch('/api/settings', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(settings)
          });
          if (res.ok) {
            const result = await res.json();
            const data = getLocalData();
            data.settings = result.settings;
            saveLocalData(data);
            return result.settings;
          }
        } catch (e) {}
      }
      const data = getLocalData();
      data.settings = { ...data.settings, ...settings };
      saveLocalData(data);
      return data.settings;
    },

    async getDestinations() {
      if (isApiAvailable) {
        try {
          const res = await fetch('/api/destinations');
          if (res.ok) return await res.json();
        } catch (e) {}
      }
      return getLocalData().destinations || DEFAULT_DB.destinations;
    },

    async saveDestination(dest) {
      if (isApiAvailable) {
        try {
          const isEdit = !!dest.id && (await this.getDestinations()).some(d => d.id === dest.id);
          const url = isEdit ? `/api/destinations/${dest.id}` : '/api/destinations';
          const method = isEdit ? 'PUT' : 'POST';
          const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dest)
          });
          if (res.ok) {
            await checkApi();
            return await res.json();
          }
        } catch (e) {}
      }
      const data = getLocalData();
      data.destinations = data.destinations || [];
      const idx = data.destinations.findIndex(d => d.id === dest.id);
      if (idx !== -1) {
        data.destinations[idx] = { ...data.destinations[idx], ...dest };
      } else {
        dest.id = dest.id || 'dest-' + Date.now();
        data.destinations.push(dest);
      }
      saveLocalData(data);
      return dest;
    },

    async deleteDestination(id) {
      if (isApiAvailable) {
        try {
          const res = await fetch(`/api/destinations/${id}`, { method: 'DELETE' });
          if (res.ok) {
            await checkApi();
            return true;
          }
        } catch (e) {}
      }
      const data = getLocalData();
      data.destinations = (data.destinations || []).filter(d => d.id !== id);
      saveLocalData(data);
      return true;
    },

    async getTours() {
      if (isApiAvailable) {
        try {
          const res = await fetch('/api/tours');
          if (res.ok) return await res.json();
        } catch (e) {}
      }
      return getLocalData().tours || DEFAULT_DB.tours;
    },

    async getTourById(id) {
      const tours = await this.getTours();
      return tours.find(t => t.id === id || t.number.toLowerCase() === id.toLowerCase());
    },

    async saveTour(tour) {
      if (isApiAvailable) {
        try {
          const tours = await this.getTours();
          const isEdit = !!tour.id && tours.some(t => t.id === tour.id);
          const url = isEdit ? `/api/tours/${tour.id}` : '/api/tours';
          const method = isEdit ? 'PUT' : 'POST';
          const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tour)
          });
          if (res.ok) {
            await checkApi();
            return await res.json();
          }
        } catch (e) {}
      }
      const data = getLocalData();
      data.tours = data.tours || [];
      const idx = data.tours.findIndex(t => t.id === tour.id);
      if (idx !== -1) {
        data.tours[idx] = { ...data.tours[idx], ...tour };
      } else {
        tour.id = tour.id || 'tour-' + Date.now();
        data.tours.push(tour);
      }
      saveLocalData(data);
      return tour;
    },

    async deleteTour(id) {
      if (isApiAvailable) {
        try {
          const res = await fetch(`/api/tours/${id}`, { method: 'DELETE' });
          if (res.ok) {
            await checkApi();
            return true;
          }
        } catch (e) {}
      }
      const data = getLocalData();
      data.tours = (data.tours || []).filter(t => t.id !== id);
      saveLocalData(data);
      return true;
    },

    async getVehicles() {
      if (isApiAvailable) {
        try {
          const res = await fetch('/api/vehicles');
          if (res.ok) return await res.json();
        } catch (e) {}
      }
      return getLocalData().vehicles || DEFAULT_DB.vehicles;
    },

    async saveVehicle(vehicle) {
      if (isApiAvailable) {
        try {
          const vehicles = await this.getVehicles();
          const isEdit = !!vehicle.id && vehicles.some(v => v.id === vehicle.id);
          const url = isEdit ? `/api/vehicles/${vehicle.id}` : '/api/vehicles';
          const method = isEdit ? 'PUT' : 'POST';
          const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(vehicle)
          });
          if (res.ok) {
            await checkApi();
            return await res.json();
          }
        } catch (e) {}
      }
      const data = getLocalData();
      data.vehicles = data.vehicles || [];
      const idx = data.vehicles.findIndex(v => v.id === vehicle.id);
      if (idx !== -1) {
        data.vehicles[idx] = { ...data.vehicles[idx], ...vehicle };
      } else {
        vehicle.id = vehicle.id || 'v-' + Date.now();
        data.vehicles.push(vehicle);
      }
      saveLocalData(data);
      return vehicle;
    },

    async deleteVehicle(id) {
      if (isApiAvailable) {
        try {
          const res = await fetch(`/api/vehicles/${id}`, { method: 'DELETE' });
          if (res.ok) {
            await checkApi();
            return true;
          }
        } catch (e) {}
      }
      const data = getLocalData();
      data.vehicles = (data.vehicles || []).filter(v => v.id !== id);
      saveLocalData(data);
      return true;
    },

    async getGallery() {
      if (isApiAvailable) {
        try {
          const res = await fetch('/api/gallery');
          if (res.ok) return await res.json();
        } catch (e) {}
      }
      return getLocalData().gallery || DEFAULT_DB.gallery;
    },

    async addGalleryItem(item) {
      if (isApiAvailable) {
        try {
          const res = await fetch('/api/gallery', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
          });
          if (res.ok) {
            await checkApi();
            return await res.json();
          }
        } catch (e) {}
      }
      const data = getLocalData();
      data.gallery = data.gallery || [];
      item.id = item.id || 'gal-' + Date.now();
      data.gallery.unshift(item);
      saveLocalData(data);
      return item;
    },

    async deleteGalleryItem(id) {
      if (isApiAvailable) {
        try {
          const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
          if (res.ok) {
            await checkApi();
            return true;
          }
        } catch (e) {}
      }
      const data = getLocalData();
      data.gallery = (data.gallery || []).filter(g => g.id !== id);
      saveLocalData(data);
      return true;
    },

    async getEnquiries() {
      if (isApiAvailable) {
        try {
          const res = await fetch('/api/enquiries');
          if (res.ok) return await res.json();
        } catch (e) {}
      }
      return getLocalData().enquiries || [];
    },

    async addEnquiry(enquiry) {
      if (isApiAvailable) {
        try {
          const res = await fetch('/api/enquiries', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(enquiry)
          });
          if (res.ok) {
            const result = await res.json();
            await checkApi();
            return result;
          }
        } catch (e) {}
      }
      const data = getLocalData();
      data.enquiries = data.enquiries || [];
      const newEnq = {
        id: 'enq-' + Date.now(),
        createdAt: new Date().toISOString(),
        status: 'New',
        ...enquiry
      };
      data.enquiries.unshift(newEnq);
      saveLocalData(data);
      return { success: true, enquiry: newEnq };
    },

    async updateEnquiry(id, updates) {
      if (isApiAvailable) {
        try {
          const res = await fetch(`/api/enquiries/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates)
          });
          if (res.ok) {
            await checkApi();
            return await res.json();
          }
        } catch (e) {}
      }
      const data = getLocalData();
      data.enquiries = data.enquiries || [];
      const idx = data.enquiries.findIndex(e => e.id === id);
      if (idx !== -1) {
        data.enquiries[idx] = { ...data.enquiries[idx], ...updates };
        saveLocalData(data);
        return data.enquiries[idx];
      }
      return null;
    },

    async deleteEnquiry(id) {
      if (isApiAvailable) {
        try {
          const res = await fetch(`/api/enquiries/${id}`, { method: 'DELETE' });
          if (res.ok) {
            await checkApi();
            return true;
          }
        } catch (e) {}
      }
      const data = getLocalData();
      data.enquiries = (data.enquiries || []).filter(e => e.id !== id);
      saveLocalData(data);
      return true;
    },

    async uploadImage(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async () => {
          const dataUrl = reader.result;
          if (isApiAvailable) {
            try {
              const res = await fetch('/api/upload', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ dataUrl, filename: file.name })
              });
              const json = await res.json();
              if (json.success && json.url) {
                return resolve(json.url);
              }
            } catch (err) {
              console.warn('Server upload failed, falling back to data URL', err);
            }
          }
          resolve(dataUrl);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    },

    createWhatsAppUrl(text, phone = '60165006972') {
      const cleanPhone = phone.replace(/[^0-9]/g, '');
      const encoded = encodeURIComponent(text);
      return `https://wa.me/${cleanPhone}?text=${encoded}`;
    }
  };
})();

if (typeof window !== 'undefined') {
  window.Store = Store;
  document.addEventListener('DOMContentLoaded', () => {
    Store.init();
  });
}
