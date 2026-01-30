import { MoodStat, Snack } from './types';

// Helper images for gallery filling
const GALLERY_FILLERS = {
  drink: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80',
  sweet: 'https://images.unsplash.com/photo-1559598467-f8b76c8155d0?auto=format&fit=crop&w=800&q=80',
  savory: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=800&q=80',
  healthy: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80'
};

const withGallery = (snack: Omit<Snack, 'gallery'>): Snack => ({
  ...snack,
  gallery: [
    snack.image,
    GALLERY_FILLERS[snack.category] || snack.image,
    // Add a 3rd lifestyle image based on category
    snack.category === 'drink' ? 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80' :
    snack.category === 'sweet' ? 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80' :
    snack.category === 'savory' ? 'https://images.unsplash.com/photo-1566453838073-1959582c816e?auto=format&fit=crop&w=800&q=80' :
    'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80'
  ]
});

export const SNACKS: Snack[] = [
  withGallery({
    id: '1',
    name: 'Lavender Chamomile Tea',
    description: 'A soothing warm hug in a cup to melt away stress.',
    price: 3.50,
    calories: 5,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    category: 'drink',
    moodTags: ['stressed', 'anxious', 'tired'],
    rating: 4.8,
    reviews: 124,
    offer: 'Best Seller'
  }),
  withGallery({
    id: '2',
    name: 'Dark Chocolate Almonds',
    description: 'Crunchy, sweet, and rich in magnesium for brain power.',
    price: 4.25,
    calories: 210,
    image: 'https://images.unsplash.com/photo-1603569283847-aa295f0d016a?auto=format&fit=crop&w=800&q=80',
    category: 'sweet',
    moodTags: ['bored', 'hungry', 'sad'],
    rating: 4.5,
    reviews: 89
  }),
  withGallery({
    id: '3',
    name: 'Sparkling Yuzu Water',
    description: 'Refreshing citrus bubbles to wake up your senses.',
    price: 2.75,
    calories: 15,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
    category: 'drink',
    moodTags: ['tired', 'hot', 'sluggish'],
    rating: 4.9,
    reviews: 56,
    offer: 'New'
  }),
  withGallery({
    id: '4',
    name: 'Wasabi Peas',
    description: 'A spicy kick to snap you out of the afternoon fog.',
    price: 3.00,
    calories: 140,
    image: 'https://images.unsplash.com/photo-1592394533824-9440e5d68530?auto=format&fit=crop&w=800&q=80',
    category: 'savory',
    moodTags: ['bored', 'sleepy', 'adventurous'],
    rating: 4.2,
    reviews: 34
  }),
  withGallery({
    id: '5',
    name: 'Fresh Berry Pot',
    description: 'Nature’s candy. Sweet, tart, and full of antioxidants.',
    price: 5.50,
    calories: 85,
    image: 'https://images.unsplash.com/photo-1596524430615-b46475ddff6e?auto=format&fit=crop&w=800&q=80',
    category: 'healthy',
    moodTags: ['health-conscious', 'light', 'refreshing'],
    rating: 4.7,
    reviews: 210,
    offer: 'Fresh Daily'
  }),
  withGallery({
    id: '6',
    name: 'Warm Matcha Latte',
    description: 'Steady energy without the coffee jitters.',
    price: 4.75,
    calories: 120,
    image: 'https://images.unsplash.com/photo-1536256263959-bd70a4080503?auto=format&fit=crop&w=800&q=80',
    category: 'drink',
    moodTags: ['focused', 'calm', 'working'],
    rating: 4.6,
    reviews: 145
  }),
  withGallery({
    id: '7',
    name: 'Artisan Pretzel Knots',
    description: 'Satisfyingly salty and crunchy comfort food.',
    price: 3.25,
    calories: 180,
    image: 'https://images.unsplash.com/photo-1599321955726-e04842093e03?auto=format&fit=crop&w=800&q=80',
    category: 'savory',
    moodTags: ['hungry', 'frustrated', 'comfort'],
    rating: 4.4,
    reviews: 78
  }),
  withGallery({
    id: '8',
    name: 'Greek Yogurt Parfait',
    description: 'Creamy protein boost with honey and granola.',
    price: 5.75,
    calories: 250,
    image: 'https://images.unsplash.com/photo-1594916847841-3b7c4d5d4d38?auto=format&fit=crop&w=800&q=80',
    category: 'healthy',
    moodTags: ['hungry', 'focused', 'morning'],
    rating: 4.6,
    reviews: 92
  }),
  withGallery({
    id: '9',
    name: 'Iced Hibiscus Tea',
    description: 'Tart, floral, and deeply hydrating.',
    price: 3.25,
    calories: 10,
    image: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?auto=format&fit=crop&w=800&q=80',
    category: 'drink',
    moodTags: ['hot', 'thirsty', 'refreshing'],
    rating: 4.3,
    reviews: 45
  }),
  withGallery({
    id: '10',
    name: 'Spicy Roasted Chickpeas',
    description: 'A crunchy, savory protein snack with a smoky kick.',
    price: 3.50,
    calories: 130,
    image: 'https://images.unsplash.com/photo-1584587722650-1845bb73628e?auto=format&fit=crop&w=800&q=80',
    category: 'savory',
    moodTags: ['bored', 'savory', 'crunchy'],
    rating: 4.1,
    reviews: 28,
    offer: 'Protein Packed'
  }),
  withGallery({
    id: '11',
    name: 'Sea Salt Dark Choc Cookie',
    description: 'Decadent, rich, and perfect for an emotional rescue.',
    price: 2.95,
    calories: 190,
    image: 'https://images.unsplash.com/photo-1618923850107-d1a234d3a63e?auto=format&fit=crop&w=800&q=80',
    category: 'sweet',
    moodTags: ['sad', 'treat', 'reward'],
    rating: 4.9,
    reviews: 312,
    offer: 'Staff Pick'
  }),
  withGallery({
    id: '12',
    name: 'Fresh Coconut Water',
    description: 'Pure hydration straight from the tropics.',
    price: 4.00,
    calories: 45,
    image: 'https://images.unsplash.com/photo-1623595119742-ca21626b4aaa?auto=format&fit=crop&w=800&q=80',
    category: 'drink',
    moodTags: ['dehydrated', 'tired', 'hangover'],
    rating: 4.7,
    reviews: 67
  }),
  withGallery({
    id: '13',
    name: 'Apple & Almond Butter',
    description: 'Crisp green apple slices with creamy nut butter.',
    price: 4.50,
    calories: 200,
    image: 'https://images.unsplash.com/photo-1632120092490-6750058e3783?auto=format&fit=crop&w=800&q=80',
    category: 'healthy',
    moodTags: ['hungry', 'light', 'energy'],
    rating: 4.8,
    reviews: 156
  }),
  withGallery({
    id: '14',
    name: 'Steamed Edamame',
    description: 'Lightly salted soy beans for a mindful, protein-packed break.',
    price: 3.75,
    calories: 100,
    image: 'https://images.unsplash.com/photo-1615486511484-92e172cc416d?auto=format&fit=crop&w=800&q=80',
    category: 'savory',
    moodTags: ['healthy', 'bored', 'fidgety'],
    rating: 4.6,
    reviews: 42
  }),
  withGallery({
    id: '15',
    name: 'Golden Turmeric Latte',
    description: 'Anti-inflammatory sunshine in a cup with almond milk.',
    price: 4.95,
    calories: 140,
    image: 'https://images.unsplash.com/photo-1605613398327-142809e07f7c?auto=format&fit=crop&w=800&q=80',
    category: 'drink',
    moodTags: ['sick', 'cold', 'cozy'],
    rating: 4.7,
    reviews: 81
  }),
  withGallery({
    id: '16',
    name: 'Choc Covered Espresso Beans',
    description: 'Chocolate-covered caffeine kicks for emergencies only.',
    price: 3.95,
    calories: 180,
    image: 'https://images.unsplash.com/photo-1550523824-2c7bb24269cb?auto=format&fit=crop&w=800&q=80',
    category: 'sweet',
    moodTags: ['tired', 'deadline', 'panic'],
    rating: 4.8,
    reviews: 203,
    offer: 'Energy Boost'
  }),
  withGallery({
    id: '17',
    name: 'Instant Miso Soup',
    description: 'Warm, savory broth to settle your stomach and mind.',
    price: 2.50,
    calories: 35,
    image: 'https://images.unsplash.com/photo-1590457375252-87564d3663b6?auto=format&fit=crop&w=800&q=80',
    category: 'savory',
    moodTags: ['cold', 'stressed', 'comfort'],
    rating: 4.5,
    reviews: 64
  }),
  withGallery({
    id: '18',
    name: 'Power Trail Mix',
    description: 'Nuts, seeds, and dried fruit for sustained brain function.',
    price: 4.50,
    calories: 220,
    image: 'https://images.unsplash.com/photo-1596726662767-3c588a449557?auto=format&fit=crop&w=800&q=80',
    category: 'healthy',
    moodTags: ['hungry', 'focused', 'energy'],
    rating: 4.4,
    reviews: 112
  }),
  withGallery({
    id: '19',
    name: 'Jasmine Pearl Tea',
    description: 'Watch the pearls unfurl as you breathe in the floral aroma.',
    price: 3.75,
    calories: 0,
    image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&w=800&q=80',
    category: 'drink',
    moodTags: ['anxious', 'elegant', 'calm'],
    rating: 4.9,
    reviews: 95
  }),
  withGallery({
    id: '20',
    name: 'Chili Lime Mango',
    description: 'Dried mango slices with a zesty spice blend.',
    price: 4.00,
    calories: 120,
    image: 'https://images.unsplash.com/photo-1596662951482-0c4ba74a6df6?auto=format&fit=crop&w=800&q=80',
    category: 'sweet',
    moodTags: ['bored', 'spicy', 'adventurous'],
    rating: 4.3,
    reviews: 76
  }),
  withGallery({
    id: '21',
    name: 'Ginger Lemon Shot',
    description: 'A concentrated immunity booster to wake up your system.',
    price: 3.50,
    calories: 25,
    image: 'https://images.unsplash.com/photo-1601625463687-25541fb72060?auto=format&fit=crop&w=800&q=80',
    category: 'drink',
    moodTags: ['sick', 'sluggish', 'health-conscious'],
    rating: 4.6,
    reviews: 134,
    offer: 'Immunity'
  }),
  withGallery({
    id: '22',
    name: 'Peanut Butter Energy Balls',
    description: 'Oats, peanut butter, and flax seeds rolled into bite-sized fuel.',
    price: 3.95,
    calories: 190,
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80',
    category: 'healthy',
    moodTags: ['hungry', 'workout', 'protein'],
    rating: 4.7,
    reviews: 88
  }),
  withGallery({
    id: '23',
    name: 'Sparkling Elderflower Pressé',
    description: 'Light, floral bubbles that feel like a celebration.',
    price: 3.25,
    calories: 60,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    category: 'drink',
    moodTags: ['happy', 'light', 'thirsty'],
    rating: 4.8,
    reviews: 156
  }),
  withGallery({
    id: '24',
    name: 'Red Velvet Cupcake',
    description: 'A rich cocoa treat topped with smooth cream cheese frosting.',
    price: 3.95,
    calories: 250,
    image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00bc4b?auto=format&fit=crop&w=800&q=80',
    category: 'sweet',
    moodTags: ['indulgent', 'sweet', 'reward'],
    rating: 4.9,
    reviews: 210,
    offer: 'Sweet Deal'
  }),
  withGallery({
    id: '25',
    name: 'Seaweed Crisps',
    description: 'Roasted seaweed sheets lightly salted with sesame oil.',
    price: 2.25,
    calories: 30,
    image: 'https://images.unsplash.com/photo-1620916669932-d17b5c873a4b?auto=format&fit=crop&w=800&q=80',
    category: 'savory',
    moodTags: ['light', 'salty', 'crunchy'],
    rating: 4.4,
    reviews: 55
  }),
  withGallery({
    id: '26',
    name: 'Matcha Mochi',
    description: 'Soft, chewy rice cakes filled with sweet red bean paste.',
    price: 4.50,
    calories: 180,
    image: 'https://images.unsplash.com/photo-1629851722839-847243c2243d?auto=format&fit=crop&w=800&q=80',
    category: 'sweet',
    moodTags: ['calm', 'sweet', 'chewy'],
    rating: 4.7,
    reviews: 132,
    offer: 'New'
  }),
  withGallery({
    id: '27',
    name: 'Vanilla Protein Shake',
    description: 'Smooth, creamy plant-based protein for recovery.',
    price: 5.50,
    calories: 160,
    image: 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&w=800&q=80',
    category: 'drink',
    moodTags: ['workout', 'hungry', 'healthy'],
    rating: 4.5,
    reviews: 98
  }),
  withGallery({
    id: '28',
    name: 'Sourdough Toast & Avocado',
    description: 'Artisan toast topped with smashed avocado and chili flakes.',
    price: 6.50,
    calories: 280,
    image: 'https://images.unsplash.com/photo-1588137372308-15f75323ca8d?auto=format&fit=crop&w=800&q=80',
    category: 'healthy',
    moodTags: ['hungry', 'meal', 'savory'],
    rating: 4.8,
    reviews: 176
  }),
  withGallery({
    id: '29',
    name: 'Caramel Waffle',
    description: 'Warm, gooey caramel sandwiched between thin waffles.',
    price: 2.75,
    calories: 160,
    image: 'https://images.unsplash.com/photo-1562912644-d3621415050f?auto=format&fit=crop&w=800&q=80',
    category: 'sweet',
    moodTags: ['comfort', 'coffee-break', 'sweet'],
    rating: 4.6,
    reviews: 211
  }),
  withGallery({
    id: '30',
    name: 'Spicy Tuna Onigiri',
    description: 'Japanese rice ball wrapped in nori with spicy tuna filling.',
    price: 4.25,
    calories: 210,
    image: 'https://images.unsplash.com/photo-1582236528892-75d1b7029322?auto=format&fit=crop&w=800&q=80',
    category: 'savory',
    moodTags: ['hungry', 'umami', 'lunch'],
    rating: 4.8,
    reviews: 340,
    offer: 'Best Seller'
  }),
  withGallery({
    id: '31',
    name: 'Lemon Poppyseed Muffin',
    description: 'Zesty lemon muffin dotted with crunchy poppyseeds.',
    price: 3.50,
    calories: 320,
    image: 'https://images.unsplash.com/photo-1563829023-eb568132cb08?auto=format&fit=crop&w=800&q=80',
    category: 'sweet',
    moodTags: ['breakfast', 'comfort', 'sweet'],
    rating: 4.3,
    reviews: 87
  }),
  withGallery({
    id: '32',
    name: 'Earl Grey Tea',
    description: 'Black tea infused with the oil of bergamot.',
    price: 3.00,
    calories: 0,
    image: 'https://images.unsplash.com/photo-1571598506841-326946d33306?auto=format&fit=crop&w=800&q=80',
    category: 'drink',
    moodTags: ['classic', 'focused', 'warm'],
    rating: 4.6,
    reviews: 156
  }),
  withGallery({
    id: '33',
    name: 'Vegetable Gyoza',
    description: 'Pan-fried dumplings filled with cabbage and mushroom.',
    price: 5.25,
    calories: 240,
    image: 'https://images.unsplash.com/photo-1605333202969-9f5c292023d8?auto=format&fit=crop&w=800&q=80',
    category: 'savory',
    moodTags: ['hungry', 'savory', 'hot'],
    rating: 4.7,
    reviews: 198
  }),
  withGallery({
    id: '34',
    name: 'Strawberry Daifuku',
    description: 'Fresh strawberry covered in red bean paste and soft mochi.',
    price: 4.95,
    calories: 150,
    image: 'https://images.unsplash.com/photo-1615820468087-0b1a32976d8b?auto=format&fit=crop&w=800&q=80',
    category: 'sweet',
    moodTags: ['delicate', 'sweet', 'fruit'],
    rating: 4.9,
    reviews: 112
  }),
  withGallery({
    id: '35',
    name: 'Banana Bread Slice',
    description: 'Moist, dense banana bread toasted with butter.',
    price: 3.75,
    calories: 290,
    image: 'https://images.unsplash.com/photo-1616462740266-9b0d6255167f?auto=format&fit=crop&w=800&q=80',
    category: 'sweet',
    moodTags: ['comfort', 'filling', 'home'],
    rating: 4.7,
    reviews: 245
  }),
  withGallery({
    id: '36',
    name: 'Pistachio Gelato Cup',
    description: 'Creamy, authentic Italian gelato with roasted pistachios.',
    price: 5.50,
    calories: 220,
    image: 'https://images.unsplash.com/photo-1555529733-0e670560f7e1?auto=format&fit=crop&w=800&q=80',
    category: 'sweet',
    moodTags: ['treat', 'hot', 'luxury'],
    rating: 4.8,
    reviews: 178,
    offer: 'Cool Down'
  }),
  withGallery({
    id: '37',
    name: 'Cheese & Charcuterie Box',
    description: 'Selection of artisanal cheese, cured meat, and crackers.',
    price: 8.50,
    calories: 350,
    image: 'https://images.unsplash.com/photo-1596708608823-380d60d3d5f8?auto=format&fit=crop&w=800&q=80',
    category: 'savory',
    moodTags: ['hungry', 'premium', 'meal'],
    rating: 4.8,
    reviews: 65,
    offer: 'Premium'
  }),
  withGallery({
    id: '38',
    name: 'Aloe Vera Juice',
    description: 'Hydrating drink with soothing aloe vera pulp.',
    price: 3.25,
    calories: 60,
    image: 'https://images.unsplash.com/photo-1549488497-2964b0d0c35b?auto=format&fit=crop&w=800&q=80',
    category: 'drink',
    moodTags: ['refreshing', 'health', 'thirst'],
    rating: 4.2,
    reviews: 45
  }),
  withGallery({
    id: '39',
    name: 'Kale Chips',
    description: 'Baked kale leaves seasoned with nutritional yeast.',
    price: 4.00,
    calories: 110,
    image: 'https://images.unsplash.com/photo-1522013894723-5e75525547bd?auto=format&fit=crop&w=800&q=80',
    category: 'healthy',
    moodTags: ['crunchy', 'salty', 'guilt-free'],
    rating: 4.3,
    reviews: 78,
    offer: '20% Off'
  }),
  withGallery({
    id: '40',
    name: 'Cinnamon Pretzels',
    description: 'Soft pretzels dusted with cinnamon sugar.',
    price: 3.50,
    calories: 280,
    image: 'https://images.unsplash.com/photo-1616428795558-73238914b4de?auto=format&fit=crop&w=800&q=80',
    category: 'sweet',
    moodTags: ['warm', 'sweet', 'comfort'],
    rating: 4.6,
    reviews: 122
  }),
  withGallery({
    id: '41',
    name: 'Mini Quiche',
    description: 'Egg, spinach, and cheese in a flaky pastry shell.',
    price: 4.25,
    calories: 210,
    image: 'https://images.unsplash.com/photo-1621251765239-012921509a25?auto=format&fit=crop&w=800&q=80',
    category: 'savory',
    moodTags: ['hungry', 'savory', 'warm'],
    rating: 4.5,
    reviews: 90
  }),
  withGallery({
    id: '42',
    name: 'Falafel Box',
    description: 'Crispy chickpea balls with tahini dip.',
    price: 5.75,
    calories: 320,
    image: 'https://images.unsplash.com/photo-1593001874117-c99c800e3eb7?auto=format&fit=crop&w=800&q=80',
    category: 'healthy',
    moodTags: ['hungry', 'meal', 'vegan'],
    rating: 4.7,
    reviews: 145
  }),
  withGallery({
    id: '43',
    name: 'Tiramisu Jar',
    description: 'Layers of espresso-soaked ladyfingers and mascarpone.',
    price: 6.00,
    calories: 350,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80',
    category: 'sweet',
    moodTags: ['indulgent', 'sweet', 'coffee'],
    rating: 4.9,
    reviews: 201,
    offer: 'Indulge'
  }),
  withGallery({
    id: '44',
    name: 'Oolong Tea',
    description: 'Traditional Chinese tea with diverse flavor notes.',
    price: 3.50,
    calories: 0,
    image: 'https://images.unsplash.com/photo-1571598715830-58c05562762a?auto=format&fit=crop&w=800&q=80',
    category: 'drink',
    moodTags: ['calm', 'focused', 'traditional'],
    rating: 4.6,
    reviews: 67
  }),
  withGallery({
    id: '45',
    name: 'Chocolate Croissant',
    description: 'Buttery, flaky pastry filled with dark chocolate batons.',
    price: 3.95,
    calories: 310,
    image: 'https://images.unsplash.com/photo-1549117646-9b16524388cc?auto=format&fit=crop&w=800&q=80',
    category: 'sweet',
    moodTags: ['morning', 'comfort', 'french'],
    rating: 4.8,
    reviews: 312
  }),
  withGallery({
    id: '46',
    name: 'Roasted Pumpkin Seeds',
    description: 'Crunchy seeds seasoned with sea salt and paprika.',
    price: 3.00,
    calories: 160,
    image: 'https://images.unsplash.com/photo-1574853039775-470081d69d0d?auto=format&fit=crop&w=800&q=80',
    category: 'healthy',
    moodTags: ['snack', 'crunchy', 'salty'],
    rating: 4.3,
    reviews: 56
  }),
  withGallery({
    id: '47',
    name: 'Caprese Salad Cup',
    description: 'Cherry tomatoes, mozzarella balls, and fresh basil.',
    price: 4.95,
    calories: 180,
    image: 'https://images.unsplash.com/photo-1529312266912-b33cf6227e2f?auto=format&fit=crop&w=800&q=80',
    category: 'healthy',
    moodTags: ['fresh', 'light', 'savory'],
    rating: 4.6,
    reviews: 98
  }),
  withGallery({
    id: '48',
    name: 'Bubble Tea',
    description: 'Milk tea with chewy tapioca pearls and brown sugar.',
    price: 5.50,
    calories: 350,
    image: 'https://images.unsplash.com/photo-1558963836-398df5b302c3?auto=format&fit=crop&w=800&q=80',
    category: 'drink',
    moodTags: ['fun', 'sweet', 'chewy'],
    rating: 4.8,
    reviews: 450,
    offer: 'Trending'
  }),
  withGallery({
    id: '49',
    name: 'Churros w/ Dip',
    description: 'Fried dough pastry dusted in sugar with chocolate dip.',
    price: 4.50,
    calories: 380,
    image: 'https://images.unsplash.com/photo-1624371414361-e670edf4898d?auto=format&fit=crop&w=800&q=80',
    category: 'sweet',
    moodTags: ['hot', 'sweet', 'shareable'],
    rating: 4.7,
    reviews: 213
  }),
  withGallery({
    id: '50',
    name: 'Salted Caramel Popcorn',
    description: 'Gourmet popcorn coated in rich salted caramel.',
    price: 3.75,
    calories: 240,
    image: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&w=800&q=80',
    category: 'sweet',
    moodTags: ['movie', 'sweet', 'salty'],
    rating: 4.6,
    reviews: 189
  })
];

export const MOOD_STATS: MoodStat[] = [
  { name: 'Stressed', value: 35, fill: '#f87171' }, // Red-400
  { name: 'Bored', value: 25, fill: '#fbbf24' }, // Amber-400
  { name: 'Tired', value: 20, fill: '#a8a29e' }, // Stone-400
  { name: 'Focused', value: 20, fill: '#4ade80' }, // Green-400
];

export const CALM_QUOTES = [
  "Take a deep breath. You're doing great.",
  "Pause. Reset. Continue.",
  "Nourish your mind, not just your body.",
  "The work will be there. Take a moment for you.",
];

export const COUPONS = [
  { code: 'RESET10', label: '10% Off Ritual', discount: 0.10 },
  { code: 'CALM20', label: '20% Off Bundle', discount: 0.20 },
];