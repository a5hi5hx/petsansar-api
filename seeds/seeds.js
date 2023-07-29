const petSeeds = [
    {
      name: "Comfy Memory Foam Pet Bed",
      description: "Orthopedic memory foam bed for maximum comfort and support.",
      price: 3500,
      category: "64c23397ba294ef50cce9338", // Assuming this ObjectId represents the "Pet Beds" category.
      brand: "PetFusion",
      image: [
        "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690618756/petsansar/61lI19sFakL._AC_SX679__wv2z0f.jpg",
        "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690618793/petsansar/614YyY3ZBPL._AC_SX679__jdk0gx.jpg",
      ],
      quantity: 20,
      discount: 10, // 10% discount on the product.
      keywords: ["pet bed", "memory foam", "orthopedic", "comfortable", "dog bed"],
    },
    {
      name: "Luxury Plush Cat Bed",
      description: "Soft and cozy plush bed for cats to lounge in style.",
      price: 1800,
      category: "64c23397ba294ef50cce9338", // Assuming this ObjectId represents the "Pet Beds" category.
      brand: "FelineHaven",
      image: [
    "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690618936/petsansar/71UuIUAM5SL_g96xae.jpg",    
    "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690619113/petsansar/61h-D1FHIML._AC_UF1000_1000_QL80__bifj42.jpg"    
    ],
      quantity: 15,
      keywords: ["cat bed", "plush", "cozy", "cat furniture", "cat lounge"],
    },
    {
      name: "Elevated Cooling Dog Bed",
      description: "Breathable and elevated bed to keep dogs cool during hot days.",
      price: 2900,
      category: "64c23397ba294ef50cce9338", // Assuming this ObjectId represents the "Pet Beds" category.
      brand: "CoolPaws",
      image: [
        "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690619202/petsansar/6c9915db-b526-42d4-9532-5b58065ffb62.86e27a6ca23849a3e7c08e24aab94bd0_ocujhq.jpg",
    "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690619202/petsansar/714JLpeJ-bL_bivzdw.jpg"
    ],
      quantity: 12,
      keywords: ["dog bed", "cooling", "elevated", "breathable", "summer"],
    },
    {
      name: "Cozy Donut-Shaped Pet Bed",
      description: "Round and soft bed perfect for pets who love to curl up.",
      price: 2500,
      category: "64c23397ba294ef50cce9338", // Assuming this ObjectId represents the "Pet Beds" category.
      brand: "SnuggleSpot",
      image: [
    "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690619312/petsansar/81n7foznoHL_shigfl.jpg",
    "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690619312/petsansar/81LWWzMOIZL_ddrers.jpg"   
    ],
      quantity: 18,
      keywords: ["donut bed", "round bed", "cozy", "small pets", "dog bed"],
    },
    {
        name: "Deluxe Multi-Level Cat Condo",
        description: "Spacious and luxurious multi-level condo for cats to play and rest.",
        price: 5500,
        category: "64c233e9ba294ef50cce933a", // Assuming this ObjectId represents the "Pet Condos" category.
        brand: "PurrfectHaven",
        image: [
        "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690619456/petsansar/foobrues-cat-trees-scratch-posts-lsy-p23169196-64_600_xmvbin.jpg",
        "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690619456/petsansar/c46b4d2f-825b-4b2c-98d4-7d9b7520591b.1b760716fe5b29a1818f4a52fcdee7fa_azcfqw.jpg"
        ],
        quantity: 10,
        keywords: ["cat condo", "multi-level", "luxurious", "cat furniture", "spacious"],
      },
      {
        name: "Cozy Hammock Cat Condo",
        description: "Compact and cozy condo with a built-in hammock for feline relaxation.",
        price: 2600,
        category: "64c233e9ba294ef50cce933a", // Assuming this ObjectId represents the "Pet Condos" category.
        brand: "LazyWhiskers",
        image: [
     "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690620165/petsansar/81WXfKOhI8L._AC_UF1000_1000_QL80__metvep.jpg",
     "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690620164/petsansar/71nScReHXjL_ln4zdg.jpg"
        ],
        quantity: 15,
        keywords: ["cat condo", "hammock", "cozy", "small pets", "cat furniture"],
      },
      {
        name: "Premium Dog Condo",
        description: "Luxurious condo suite with separate resting and play areas for dogs.",
        price: 6800,
        category: "64c233e9ba294ef50cce933a", // Assuming this ObjectId represents the "Pet Condos" category.
        brand: "CanineHaven",
        image: [
            "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690620366/petsansar/0066154103345_cxrrnr.jpg",
            "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690620365/petsansar/small-doghouse-w-patio_irywdh.jpg"
        ],
        quantity: 8,
        keywords: ["dog condo", "luxury suite", "spacious", "dog furniture", "play area"],
      },
      {
        name: "Modular Small Animal Condo",
        description: "Customizable modular condo for small animals to explore and play.",
        price: 1800,
        category: "64c233e9ba294ef50cce933a", // Assuming this ObjectId represents the "Pet Condos" category.
        brand: "CritterSpace",
        image: [
        "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690620410/petsansar/81IvIZ7Hf-L_mqa7rw.jpg",
        "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690620409/petsansar/81ftSnVNzhL._AC_UF1000_1000_QL80__rd5xgk.jpg"
        ],
        quantity: 20,
        keywords: ["small animal condo", "modular", "customizable", "hamster", "guinea pig"],
      },
      {
        name: "Outdoor Cat Condo Enclosure",
        description: "Safe and spacious outdoor enclosure for cats to enjoy the outdoors.",
        price: 3200,
        category: "64c233e9ba294ef50cce933a", // Assuming this ObjectId represents the "Pet Condos" category.
        brand: "CatioParadise",
        image: [
        "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690620471/petsansar/GUEST_99e5464a-2884-4841-b720-589a21e76314_zrpje0.jpg",
         "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690620470/petsansar/910EzPSP0AL._AC_UL600_SR600_600__vhlghl.jpg"
        ],
        quantity: 12,
        keywords: ["outdoor cat enclosure", "catio", "spacious", "safe", "outdoor furniture"],
      },
      {
        name: "Heavy-Duty Dog Crate",
        description: "Sturdy and secure dog crate for safe containment.",
        price: 4200,
        category: "64c23437ba294ef50cce933c", // Assuming this ObjectId represents the "Pet Kennels and Crates" category.
        brand: "GuardianCrate",
        image: [
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690620519/petsansar/71H6Ft6Q5pL_fwctot.jpg",
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690620519/petsansar/71XtYgBomQL_yxjyy8.jpg"
        ],
        quantity: 10,
        keywords: ["dog crate", "heavy-duty", "secure", "dog containment", "metal crate"],
      },
      {
        name: "Cozy Travel Pet Kennel",
        description: "Comfortable and portable kennel for pets on the go.",
        price: 2800,
        category: "64c23437ba294ef50cce933c", // Assuming this ObjectId represents the "Pet Kennels and Crates" category.
        brand: "PetTraveler",
        image: [
        "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690620571/petsansar/s-l1200_esoekv.webp",
        "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690620570/petsansar/71IO9GVYjoL._AC_UF1000_1000_QL80__oi5s0v.jpg" 
        ],
        quantity: 15,
        keywords: ["pet kennel", "travel kennel", "portable", "pet carrier", "small pets"],
      },
      {
        name: "Convertible Pet Playpen",
        description: "Versatile playpen that easily transforms into a pet crate.",
        price: 3200,
        category: "64c23437ba294ef50cce933c", // Assuming this ObjectId represents the "Pet Kennels and Crates" category.
        brand: "CratePlay",
        image: [
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690620630/petsansar/51k3XaJ5zVL._AC_UF1000_1000_QL80__y18gm7.jpg",
        "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690620645/petsansar/94908-Convertible-Playpen_M6-Divider_fkclne.jpg"
        ],
        quantity: 8,
        keywords: ["pet playpen", "convertible crate", "versatile", "dog crate", "play area"],
      },
      {
        name: "Cat Condo with Built-In Crate",
        description: "Innovative cat condo with an integrated private crate.",
        price: 3800,
        category: "64c23437ba294ef50cce933c", // Assuming this ObjectId represents the "Pet Kennels and Crates" category.
        brand: "CrateMeow",
        image: [
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690620709/petsansar/71Lo-TSnSyL._AC_UF1000_1000_QL80__fok6sn.jpg",
        "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690620709/petsansar/61dMpt_WeXL._AC_UF1000_1000_QL80__yewqdr.jpg"
        ],
        quantity: 12,
        keywords: ["cat condo", "integrated crate", "innovative", "cat furniture", "cat crate"],
      },
      {
        name: "Soft-Sided Pet Carrier",
        description: "Cozy and portable carrier for small pets during travel.",
        price: 2000,
        category: "64c23437ba294ef50cce933c", // Assuming this ObjectId represents the "Pet Kennels and Crates" category.
        brand: "CozyCarry",
        image: [
        "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690620794/petsansar/1671477453-51SuloXw-L._SL500_.jpg_shavmf.jpg",
        "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690620794/petsansar/H67f3595068734bd5bb43d9d0deefa25bE_rrh763.jpg"  
        ],
        quantity: 18,
        keywords: ["pet carrier", "soft-sided crate", "portable", "small pets", "travel crate"],
      },
      {
        name: "Adjustable Height Grooming Table",
        description: "Sturdy grooming table with adjustable height for easy pet grooming.",
        price: 5500,
        category: "64c23b69756b67a1f4266b7d", // Assuming this ObjectId represents the "Pet Grooming Tables" category.
        brand: "GroomMaster",
        image: [
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690620854/petsansar/61GbTkzEOAL_afqkft.jpg",
        "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690620854/petsansar/FT812HA_s0vjpb.jpg"
       ],
        quantity: 10,
        keywords: ["grooming table", "adjustable height", "sturdy", "pet grooming", "dog grooming"],
      },
      {
        name: "Expandable Pet Gate",
        description: "Versatile and expandable pet gate for restricting pet access.",
        price: 3200,
        category: "64c234ebba294ef50cce9340", // Assuming this ObjectId represents the "Pet Gates and Fences" category.
        brand: "ExpandGuard",
        image: [
        "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690620940/petsansar/FSX18-2-400x396_r2t9qz.jpg",
    "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690620939/petsansar/FSX24-1_pzew7d.jpg" 
    ],
        quantity: 10,
        keywords: ["pet gate", "expandable gate", "pet fence", "pet access control", "adjustable gate"],
      },
      {
        name: "Retractable Pet Fence",
        description: "Convenient and retractable fence for creating a pet-safe area.",
        price: 3800,
        category: "64c234ebba294ef50cce9340", // Assuming this ObjectId represents the "Pet Gates and Fences" category.
        brand: "SafeZone",
        image: [
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/dibbpfwlprn62nb9dnjd.jpg",
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/izkzwmeg1tsu5oehcqxc.jpg",
        ],
        quantity: 8,
        keywords: ["pet fence", "retractable fence", "pet safety", "outdoor pet area", "portable fence"],
      },
      {
        name: "Wooden Dog Gate with Door",
        description: "Elegant wooden dog gate with a built-in door for easy access.",
        price: 4500,
        category: "64c234ebba294ef50cce9340", // Assuming this ObjectId represents the "Pet Gates and Fences" category.
        brand: "WoodPaws",
        image: [
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/izkzwmeg1tsu5oehcqxc.jpg",
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/dibbpfwlprn62nb9dnjd.jpg",
        ],
        quantity: 12,
        keywords: ["dog gate", "wooden gate", "pet door", "pet access", "indoor pet gate"],
      },
      {
        name: "Interactive Treat Dispensing Toy",
        description: "Engaging toy that dispenses treats to keep pets entertained.",
        price: 650,
        category: "64c2380785ba7445c53209ae", // Assuming this ObjectId represents the "Pet Toys" category.
        brand: "PuzzlePaws",
        image: [
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/izkzwmeg1tsu5oehcqxc.jpg",
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/dibbpfwlprn62nb9dnjd.jpg",
        ],
        quantity: 20,
        keywords: ["interactive toy", "treat dispenser", "dog toy", "puzzle toy", "mental stimulation"],
      },
      {
        name: "Feather Teaser Wand",
        description: "Exciting wand toy with feathers to engage and entertain cats.",
        price: 350,
        category: "64c2380785ba7445c53209ae", // Assuming this ObjectId represents the "Pet Toys" category.
        brand: "FelineFrenzy",
        image: [
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/dibbpfwlprn62nb9dnjd.jpg",
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/izkzwmeg1tsu5oehcqxc.jpg",
        ],
        quantity: 15,
        keywords: ["feather toy", "teaser wand", "cat toy", "interactive play", "cat entertainment"],
      },
      {
        name: "Chewable Rope Toy Set",
        description: "Durable rope toys for dogs to satisfy their chewing instincts.",
        price: 550,
        category: "64c2380785ba7445c53209ae", // Assuming this ObjectId represents the "Pet Toys" category.
        brand: "RopeRover",
        image: [
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/izkzwmeg1tsu5oehcqxc.jpg",
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/dibbpfwlprn62nb9dnjd.jpg",
        ],
        quantity: 18,
        keywords: ["rope toy", "chew toy", "dog toy", "durable", "dog dental care"],
      },
      {
        name: "Squeaky Plush Toy Collection",
        description: "Soft and squeaky plush toys in various shapes for dogs to enjoy.",
        price: 450,
        category: "64c2380785ba7445c53209ae", // Assuming this ObjectId represents the "Pet Toys" category.
        brand: "PlushPaws",
        image: [
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/dibbpfwlprn62nb9dnjd.jpg",
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/izkzwmeg1tsu5oehcqxc.jpg",
        ],
        quantity: 12,
        keywords: ["plush toy", "squeaky toy", "dog toy", "soft toy", "dog entertainment"],
      },
      {
        name: "Interactive Laser Pointer",
        description: "Fun laser pointer toy to engage cats in playful chasing.",
        price: 250,
        category: "64c2380785ba7445c53209ae", // Assuming this ObjectId represents the "Pet Toys" category.
        brand: "LaserPaws",
        image: [
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/izkzwmeg1tsu5oehcqxc.jpg",
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/dibbpfwlprn62nb9dnjd.jpg",
        ],
        quantity: 22,
        keywords: ["laser pointer", "interactive toy", "cat toy", "playful chasing", "cat entertainment"],
      },
      {
        name: "Grain-Free Chicken Dog Food",
        description: "Nutritious and delicious grain-free chicken formula for dogs.",
        price: 1250,
        category: "64c2386685ba7445c53209b0", // Assuming this ObjectId represents the "Pet Food" category.
        brand: "HealthyPaws",
        image: [
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/izkzwmeg1tsu5oehcqxc.jpg",
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/dibbpfwlprn62nb9dnjd.jpg",
        ],
        quantity: 30,
        keywords: ["dog food", "grain-free", "chicken formula", "nutritious", "healthy"],
      },
      {
        name: "Salmon and Sweet Potato Cat Food",
        description: "Tasty and nutritious cat food with salmon and sweet potato.",
        price: 980,
        category: "64c2386685ba7445c53209b0", // Assuming this ObjectId represents the "Pet Food" category.
        brand: "WhiskerDelight",
        image: [
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/dibbpfwlprn62nb9dnjd.jpg",
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/izkzwmeg1tsu5oehcqxc.jpg",
        ],
        quantity: 25,
        keywords: ["cat food", "salmon formula", "sweet potato", "tasty", "nutritious"],
      },
      {
        name: "Small Breed Puppy Food",
        description: "Specially formulated food for small breed puppies.",
        price: 1450,
        category: "64c2386685ba7445c53209b0", // Assuming this ObjectId represents the "Pet Food" category.
        brand: "PuppyTails",
        image: [
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/izkzwmeg1tsu5oehcqxc.jpg",
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/dibbpfwlprn62nb9dnjd.jpg",
        ],
        quantity: 20,
        keywords: ["puppy food", "small breed formula", "nutritious", "healthy", "puppy care"],
      },
      {
        name: "Senior Cat Food",
        description: "Balanced and nutritious food for senior cats.",
        price: 1050,
        category: "64c2386685ba7445c53209b0", // Assuming this ObjectId represents the "Pet Food" category.
        brand: "SeniorWhiskers",
        image: [
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/dibbpfwlprn62nb9dnjd.jpg",
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/izkzwmeg1tsu5oehcqxc.jpg",
        ],
        quantity: 18,
        keywords: ["cat food", "senior formula", "balanced nutrition", "mature cat care"],
      },
      {
        name: "Wild Caught Fish Cat Food",
        description: "High-quality cat food made with wild-caught fish.",
        price: 1150,
        category: "64c2386685ba7445c53209b0", // Assuming this ObjectId represents the "Pet Food" category.
        brand: "FishyFeast",
        image: [
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/izkzwmeg1tsu5oehcqxc.jpg",
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/dibbpfwlprn62nb9dnjd.jpg",
        ],
        quantity: 22,
        keywords: ["cat food", "fish formula", "wild-caught", "high-quality", "cat nutrition"],
      },
      {
        name: "Large Breed Dog Food",
        description: "Nutrient-rich food specially formulated for large breed dogs.",
        price: 1350,
        category: "64c2386685ba7445c53209b0", // Assuming this ObjectId represents the "Pet Food" category.
        brand: "BigPaws",
        image: [
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/dibbpfwlprn62nb9dnjd.jpg",
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/izkzwmeg1tsu5oehcqxc.jpg",
        ],
        quantity: 28,
        keywords: ["dog food", "large breed formula", "nutrient-rich", "healthy", "big dogs"],
      },
      {
        name: "All-Natural Rabbit Pellets",
        description: "High-fiber rabbit pellets made from all-natural ingredients.",
        price: 450,
        category: "64c2386685ba7445c53209b0", // Assuming this ObjectId represents the "Pet Food" category.
        brand: "HoppyBunny",
        image: [
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/izkzwmeg1tsu5oehcqxc.jpg",
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/dibbpfwlprn62nb9dnjd.jpg",
        ],
        quantity: 35,
        keywords: ["rabbit food", "rabbit pellets", "all-natural", "high-fiber", "rabbit nutrition"],
      },
      {
        name: "Grain-Free Turkey and Duck Cat Food",
        description: "Wholesome grain-free cat food with turkey and duck.",
        price: 1050,
        category: "64c2386685ba7445c53209b0", // Assuming this ObjectId represents the "Pet Food" category.
        brand: "TurkeyDuckDelight",
        image: [
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/dibbpfwlprn62nb9dnjd.jpg",
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/izkzwmeg1tsu5oehcqxc.jpg",
        ],
        quantity: 24,
        keywords: ["cat food", "grain-free", "turkey and duck formula", "wholesome", "cat nutrition"],
      },
      {
        name: "Small Animal Treat Mix",
        description: "Delicious treat mix for small animals like hamsters and guinea pigs.",
        price: 250,
        category: "64c2386685ba7445c53209b0", // Assuming this ObjectId represents the "Pet Food" category.
        brand: "TinyTreats",
        image: [
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/izkzwmeg1tsu5oehcqxc.jpg",
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/dibbpfwlprn62nb9dnjd.jpg",
        ],
        quantity: 40,
        keywords: ["small animal treats", "hamster treats", "guinea pig treats", "delicious mix"],
      },
      {
        name: "Sensitive Stomach Dog Food",
        description: "Gentle formula for dogs with sensitive stomachs.",
        price: 1280,
        category: "64c2386685ba7445c53209b0", // Assuming this ObjectId represents the "Pet Food" category.
        brand: "GentleDigest",
        image: [
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/dibbpfwlprn62nb9dnjd.jpg",
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/izkzwmeg1tsu5oehcqxc.jpg",
        ],
        quantity: 18,
        keywords: ["dog food", "sensitive stomach formula", "gentle on digestion", "dog nutrition"],
      },
      {
        name: "Pet First Aid Kit",
        description: "Comprehensive first aid kit for pets, including bandages, antiseptic wipes, and more.",
        price: 850,
        category: "64c23aa0756b67a1f4266b7b", // Assuming this ObjectId represents the "Pet First Aid Kits and Amenities" category.
        brand: "SafePaws",
        image: [
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/izkzwmeg1tsu5oehcqxc.jpg",
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/dibbpfwlprn62nb9dnjd.jpg",
        ],
        quantity: 15,
        keywords: ["pet first aid kit", "pet emergency", "bandages", "antiseptic wipes", "pet safety"],
      },
      {
        name: "Pet Grooming Scissors Set",
        description: "Professional grooming scissors set for trimming pet fur.",
        price: 680,
        category: "64c23aa0756b67a1f4266b7b", // Assuming this ObjectId represents the "Pet First Aid Kits and Amenities" category.
        brand: "GroomPro",
        image: [
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/dibbpfwlprn62nb9dnjd.jpg",
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/izkzwmeg1tsu5oehcqxc.jpg",
        ],
        quantity: 10,
        keywords: ["pet grooming scissors", "trimming pet fur", "pet grooming", "pet care"],
      },
      {
        name: "Pet Poop Bag Dispenser",
        description: "Convenient dispenser for carrying pet poop bags during walks.",
        price: 250,
        category: "64c23aa0756b67a1f4266b7b", // Assuming this ObjectId represents the "Pet First Aid Kits and Amenities" category.
        brand: "CleanPaws",
        image: [
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/izkzwmeg1tsu5oehcqxc.jpg",
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/dibbpfwlprn62nb9dnjd.jpg",
        ],
        quantity: 20,
        keywords: ["poop bag dispenser", "pet waste bags", "pet cleanup", "dog walking"],
      },
      {
        name: "Pet Toothbrush and Toothpaste Set",
        description: "Complete set for maintaining your pet's dental hygiene.",
        price: 350,
        category: "64c23aa0756b67a1f4266b7b", // Assuming this ObjectId represents the "Pet First Aid Kits and Amenities" category.
        brand: "DentalCare",
        image: [
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/dibbpfwlprn62nb9dnjd.jpg",
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/izkzwmeg1tsu5oehcqxc.jpg",
        ],
        quantity: 12,
        keywords: ["pet toothbrush", "pet toothpaste", "dental care", "pet hygiene"],
      },
      {
        name: "Pet Travel Water Bottle",
        description: "Leak-proof water bottle for keeping your pet hydrated on the go.",
        price: 580,
        category: "64c23aa0756b67a1f4266b7b", // Assuming this ObjectId represents the "Pet First Aid Kits and Amenities" category.
        brand: "HydraPets",
        image: [
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/izkzwmeg1tsu5oehcqxc.jpg",
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/dibbpfwlprn62nb9dnjd.jpg",
        ],
        quantity: 18,
        keywords: ["pet water bottle", "travel water dispenser", "pet hydration", "on-the-go"],
      },
      {
        name: "Stainless Steel Dog Bowl",
        description: "Durable stainless steel dog bowl for food or water.",
        price: 350,
        category: "64c23a4d756b67a1f4266b79", // Assuming this ObjectId represents the "Pet Bowls and Feeders" category.
        brand: "SteelPaws",
        image: [
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/izkzwmeg1tsu5oehcqxc.jpg",
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/dibbpfwlprn62nb9dnjd.jpg",
        ],
        quantity: 20,
        keywords: ["dog bowl", "stainless steel bowl", "durable", "food and water bowl", "pet feeding"],
      },
      {
        name: "Raised Cat Feeder",
        description: "Elevated cat feeder to promote better posture during meals.",
        price: 480,
        category: "64c23a4d756b67a1f4266b79", // Assuming this ObjectId represents the "Pet Bowls and Feeders" category.
        brand: "ElevateMeow",
        image: [
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/dibbpfwlprn62nb9dnjd.jpg",
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/izkzwmeg1tsu5oehcqxc.jpg",
        ],
        quantity: 15,
        keywords: ["cat feeder", "raised feeder", "elevated feeding", "cat food bowl", "posture support"],
      },
      {
        name: "Slow Feeder Dog Bowl",
        description: "Special slow feeder bowl to prevent fast eating and promote digestion.",
        price: 580,
        category: "64c23a4d756b67a1f4266b79", // Assuming this ObjectId represents the "Pet Bowls and Feeders" category.
        brand: "SlowMunch",
        image: [
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/dibbpfwlprn62nb9dnjd.jpg",
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/izkzwmeg1tsu5oehcqxc.jpg",
        ],
        quantity: 12,
        keywords: ["dog bowl", "slow feeder", "anti-gulping bowl", "slow eating", "healthy digestion"],
      },
      {
        name: "Automatic Water Dispenser",
        description: "Continuous water supply with an automatic pet water dispenser.",
        price: 890,
        category: "64c23a4d756b67a1f4266b79", // Assuming this ObjectId represents the "Pet Bowls and Feeders" category.
        brand: "AutoHydrate",
        image: [
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/izkzwmeg1tsu5oehcqxc.jpg",
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/dibbpfwlprn62nb9dnjd.jpg",
        ],
        quantity: 10,
        keywords: ["automatic water dispenser", "pet water bowl", "continuous water supply", "hydration"],
      },
      {
        name: "Slow Feeder Dog Bowl",
        description: "Special slow feeder bowl to prevent fast eating and promote digestion.",
        price: 580,
        category: "64c23a4d756b67a1f4266b79", // Assuming this ObjectId represents the "Pet Bowls and Feeders" category.
        brand: "SlowMunch",
        image: [
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/dibbpfwlprn62nb9dnjd.jpg",
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/izkzwmeg1tsu5oehcqxc.jpg",
        ],
        quantity: 12,
        keywords: ["dog bowl", "slow feeder", "anti-gulping bowl", "slow eating", "healthy digestion"],
      },
      {
        name: "Automatic Water Dispenser",
        description: "Continuous water supply with an automatic pet water dispenser.",
        price: 890,
        category: "64c23a4d756b67a1f4266b79", // Assuming this ObjectId represents the "Pet Bowls and Feeders" category.
        brand: "AutoHydrate",
        image: [
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/izkzwmeg1tsu5oehcqxc.jpg",
          "https://res.cloudinary.com/ds1swdnv8/image/upload/v1690617095/petsansar/dibbpfwlprn62nb9dnjd.jpg",
        ],
        quantity: 10,
        keywords: ["automatic water dispenser", "pet water bowl", "continuous water supply", "hydration"],
      },
      
    // Add more seed data for other pet beds if needed.
  ];
  
  module.exports = petSeeds;
  