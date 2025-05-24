
// Використовуємо тільки локальні товари
export const fetchProductsFromAPI = async () => {
  // Імітуємо завантаження на 1 секунду, щоб показати LoadingSpinner з анімацією
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getDefaultProducts());
    }, 1000);
  });
};

const getDefaultProducts = () => [
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    description: 'Смартфон Apple iPhone 15 Pro Max 256GB Natural Titanium. Титановий корпус, 48 Мп основна камера, потужний процесор A17 Pro, супутниковий звязок для екстрених випадків.',
    price: 69999,
    image: 'https://content.rozetka.com.ua/goods/images/big/364623744.jpg',
    category: 'smartphones',
    rating: { rate: 4.9, count: 583 },
    specifications: {
      display: '6.7" OLED',
      processor: 'Apple A17 Pro',
      camera: '48 Мп + 12 Мп + 12 Мп',
      battery: '4441 мАг'
    }
  },
  {
    id: 2,
    name: 'Samsung Galaxy S23 Ultra',
    description: 'Смартфон Samsung Galaxy S23 Ultra 12/512GB Green. Революційна 200 Мп камера, S Pen, 6.8" Dynamic AMOLED 2X дисплей з частотою оновлення 120 Гц.',
    price: 54999,
    image: 'https://content1.rozetka.com.ua/goods/images/big/310649358.jpg',
    category: 'smartphones',
    rating: { rate: 4.8, count: 412 },
    specifications: {
      display: '6.8" Dynamic AMOLED 2X',
      processor: 'Snapdragon 8 Gen 2',
      camera: '200 Мп + 12 Мп + 10 Мп + 10 Мп',
      battery: '5000 мАг'
    }
  },
  {
    id: 3,
    name: 'MacBook Air M3',
    description: 'Ноутбук Apple MacBook Air 13" M3 8/256GB Space Gray. Новий революційний чіп M3, великий дисплей Liquid Retina з технологією True Tone та неймовірна автономність до 18 годин.',
    price: 52999,
    image: 'https://content1.rozetka.com.ua/goods/images/big/523986570.jpg',
    category: 'laptops',
    rating: { rate: 4.9, count: 372 },
    specifications: {
      display: '13.6" Liquid Retina',
      processor: 'Apple M3',
      ram: '8 ГБ',
      storage: '256 ГБ SSD'
    }
  },
  {
    id: 4,
    name: 'iPad Pro 12.9" M4',
    description: 'Планшет Apple iPad Pro 12.9" M4 Chip 1TB Wi-Fi Space Black. Ультратонкий дизайн, революційний чіп Apple M4, OLED-дисплей з підтримкою ProMotion та P3 wide color.',
    price: 76999,
    image: 'https://content.rozetka.com.ua/goods/images/big_tile/433552835.jpg',
    category: 'tablets',
    rating: { rate: 4.7, count: 291 },
    specifications: {
      display: '12.9" Liquid Retina XDR',
      processor: 'Apple M4',
      ram: '16 ГБ',
      storage: '1 ТБ'
    }
  },
  {
    id: 5,
    name: 'AirPods Pro 2',
    description: 'Навушники Apple AirPods Pro 2 with MagSafe Case (USB-C). Активне шумопоглинання, режим прозорості, просторовий звук з динамічним відстеженням рухів голови.',
    price: 11499,
    image: 'https://content.rozetka.com.ua/goods/images/big/365137070.jpg',
    category: 'headphones',
    rating: { rate: 4.8, count: 650 },
    specifications: {
      type: 'TWS',
      battery: 'до 6 годин',
      connectivity: 'Bluetooth 5.3',
      features: 'ANC, Transparency Mode, Spatial Audio'
    }
  },
  {
    id: 6,
    name: 'Sony WH-1000XM5',
    description: 'Навушники Sony WH-1000XM5 Silver. Преміальні бездротові навушники з найкращим у класі шумозаглушенням, 8 мікрофонами та технологією обробки звуку DSEE Extreme.',
    price: 13999,
    image: 'https://content2.rozetka.com.ua/goods/images/big/372627779.jpg',
    category: 'headphones',
    rating: { rate: 4.9, count: 389 },
    specifications: {
      type: 'Over-ear',
      battery: 'до 30 годин',
      connectivity: 'Bluetooth 5.2, NFC',
      features: 'ANC, DSEE Extreme, LDAC'
    }
  },
  {
    id: 7,
    name: 'PlayStation 5 Slim',
    description: 'Ігрова консоль Sony PlayStation 5 Slim (PS5) 1TB + DualSense. Нова версія з меншими габаритами, світлими панелями та можливістю приєднання Ultra HD Blu-ray дисковода.',
    price: 24999,
    image: 'https://content2.rozetka.com.ua/goods/images/big/391885922.jpg',
    category: 'gaming',
    rating: { rate: 4.8, count: 732 },
    specifications: {
      processor: 'AMD Zen 2 (8 ядер)',
      gpu: 'AMD RDNA 2 10.3 TFLOPS',
      ram: '16 ГБ GDDR6',
      storage: '1 ТБ SSD'
    }
  },
  {
    id: 8,
    name: 'Apple Watch Ultra 2',
    description: 'Смарт-годинник Apple Watch Ultra 2 GPS + Cellular 49mm Titanium Case with Orange/Beige Trail Loop. Надміцний корпус з титану, режим "Нічний", надточний GPS та автономність до 36 годин.',
    price: 39999,
    image: 'https://content1.rozetka.com.ua/goods/images/big_tile/468890086.jpg',
    category: 'smartwatches',
    rating: { rate: 4.7, count: 248 },
    specifications: {
      display: '1.92" Retina Always-On',
      processor: 'Apple S9',
      battery: 'до 36 годин',
      features: 'GPS, LTE, датчик кисню, ЕКГ'
    }
  },
  {
    id: 9,
    name: 'Dyson V15 Detect Absolute',
    description: 'Пилосос Dyson V15 Detect Absolute. Потужний пилосос з лазерним виявленням пилу, технологією піємуо-акустичного зондування та розумною підтримкою на основі ШІ.',
    price: 32999,
    image: 'https://content2.rozetka.com.ua/goods/images/big_tile/482843281.jpg',
    category: 'appliances',
    rating: { rate: 4.6, count: 187 },
    specifications: {
      power: '240 AW',
      runtime: 'до 60 хвилин',
      weight: '3.1 кг',
      features: 'лазерне підсвічування, LCD-дисплей'
    }
  },
  {
    id: 10,
    name: 'Samsung Odyssey G9',
    description: 'Монітор Samsung Odyssey G9 LC49G95TSSIXCI. Вигнутий ігровий монітор з роздільною здатністю DQHD, частотою оновлення 240 Гц, і технологією квантових точок.',
    price: 47999,
    image: 'https://content2.rozetka.com.ua/goods/images/big_tile/346793468.jpg',
    category: 'monitors',
    rating: { rate: 4.8, count: 142 },
    specifications: {
      display: '49" Super Ultra-Wide',
      resolution: '5120x1440',
      refreshRate: '240 Гц',
      responsetime: '1 мс GTG'
    }
  }
];