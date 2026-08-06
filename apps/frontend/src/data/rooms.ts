export interface Room {
  id: string
  slug: string
  name: { it: string; en: string }
  description: { it: string; en: string }
  images: string[]
  capacity: { adults: number; children: number; total: number }
  bedType: { it: string; en: string }
  bathroom: { it: string; en: string }
  services: string[]
  priceFrom: number
  sqm?: number
}

export const rooms: Room[] = [
  {
    id: 'comfort-ac',
    slug: 'comfort-ac',
    name: {
      it: 'Comfort AC',
      en: 'Comfort AC',
    },
    description: {
      it: 'Camera doppia spaziosa con aria condizionata, bagno privato, WiFi gratuito e tutti i comfort per il tuo soggiorno veneziano.',
      en: 'Spacious double room with air conditioning, private bathroom, free WiFi and all the comforts for your Venetian stay.',
    },
    images: ['/media/images/camera-comfort2-4-algobbo.jpg'],
    capacity: { adults: 2, children: 0, total: 2 },
    bedType: {
      it: 'Letto matrimoniale o due letti singoli',
      en: 'Double bed or two single beds',
    },
    bathroom: {
      it: 'Bagno privato',
      en: 'Private bathroom',
    },
    services: ['wifi', 'ac', 'bathroom', 'heating'],
    priceFrom: 95,
    sqm: 16,
  },
  {
    id: 'standard-double',
    slug: 'standard-double',
    name: {
      it: 'Standard Doppia',
      en: 'Standard Double',
    },
    description: {
      it: 'Camera doppia accogliente con bagno privato, ideale per coppie o amici che vogliono scoprire Venezia senza rinunciare al comfort.',
      en: 'Cozy double room with private bathroom, ideal for couples or friends who want to discover Venice without sacrificing comfort.',
    },
    images: ['/media/images/hall-algobbo.jpg'],
    capacity: { adults: 2, children: 0, total: 2 },
    bedType: {
      it: 'Letto matrimoniale o due letti singoli',
      en: 'Double bed or two single beds',
    },
    bathroom: {
      it: 'Bagno privato',
      en: 'Private bathroom',
    },
    services: ['wifi', 'bathroom', 'heating'],
    priceFrom: 80,
    sqm: 14,
  },
  {
    id: 'basic-ac',
    slug: 'basic-ac',
    name: {
      it: 'Basic con AC',
      en: 'Basic with AC',
    },
    description: {
      it: 'Camera doppia economica con aria condizionata e wc esterno: una scelta pratica per chi cerca semplicità a prezzo contenuto.',
      en: 'Budget double room with air conditioning and external WC: a practical choice for those seeking simplicity at an affordable price.',
    },
    images: ['/media/images/hall-algobbo2.jpg'],
    capacity: { adults: 2, children: 0, total: 2 },
    bedType: {
      it: 'Letto matrimoniale o due letti singoli',
      en: 'Double bed or two single beds',
    },
    bathroom: {
      it: 'WC esterno',
      en: 'External WC',
    },
    services: ['wifi', 'ac', 'heating'],
    priceFrom: 70,
    sqm: 12,
  },
  {
    id: 'economy-double',
    slug: 'economy-double',
    name: {
      it: 'Economy Doppia',
      en: 'Economy Double',
    },
    description: {
      it: 'Soluzione economica per due persone, perfetta per chi desidera scoprire Venezia spendendo poco senza rinunciare alla pulizia e all\'accoglienza.',
      en: 'Budget solution for two people, perfect for those who want to discover Venice on a budget without giving up cleanliness and hospitality.',
    },
    images: ['/media/images/economy-db-9-2.jpg'],
    capacity: { adults: 2, children: 0, total: 2 },
    bedType: {
      it: 'Letto matrimoniale o due letti singoli',
      en: 'Double bed or two single beds',
    },
    bathroom: {
      it: 'Bagno privato',
      en: 'Private bathroom',
    },
    services: ['wifi', 'heating'],
    priceFrom: 55,
    sqm: 11,
  },
  {
    id: 'standard-single',
    slug: 'standard-single',
    name: {
      it: 'Standard Singola',
      en: 'Standard Single',
    },
    description: {
      it: 'Camera singola con bagno privato, ideale per viaggiatori indipendenti che cercano una sistemazione centrale e confortevole.',
      en: 'Single room with private bathroom, ideal for independent travellers looking for a central and comfortable accommodation.',
    },
    images: ['/media/images/camera-standard-singola-cop.jpg'],
    capacity: { adults: 1, children: 0, total: 1 },
    bedType: {
      it: 'Letto singolo',
      en: 'Single bed',
    },
    bathroom: {
      it: 'Bagno privato',
      en: 'Private bathroom',
    },
    services: ['wifi', 'bathroom', 'heating'],
    priceFrom: 65,
    sqm: 10,
  },
  {
    id: 'economy-single',
    slug: 'economy-single',
    name: {
      it: 'Economy Singola',
      en: 'Economy Single',
    },
    description: {
      it: 'Camera singola economica con bagno condiviso, una scelta funzionale per chi viaggia da solo e cerca il massimo risparmio.',
      en: 'Budget single room with shared bathroom, a functional choice for solo travellers looking for maximum savings.',
    },
    images: ['/media/images/hall-algobbo2.jpg'],
    capacity: { adults: 1, children: 0, total: 1 },
    bedType: {
      it: 'Letto singolo',
      en: 'Single bed',
    },
    bathroom: {
      it: 'Bagno condiviso',
      en: 'Shared bathroom',
    },
    services: ['wifi', 'heating'],
    priceFrom: 45,
    sqm: 9,
  },
]

export function getRoomBySlug(slug: string): Room | undefined {
  return rooms.find((room) => room.slug === slug)
}

export function getRoomById(id: string): Room | undefined {
  return rooms.find((room) => room.id === id)
}
