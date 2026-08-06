export type GalleryCategory = 'all' | 'entrance' | 'hall' | 'rooms' | 'views'

export interface GalleryImage {
  src: string
  alt: {
    it: string
    en: string
  }
  category: Exclude<GalleryCategory, 'all'>
}

export const galleryCategories: { key: GalleryCategory; label: { it: string; en: string } }[] = [
  { key: 'all', label: { it: 'Tutte', en: 'All' } },
  { key: 'entrance', label: { it: 'Ingresso', en: 'Entrance' } },
  { key: 'hall', label: { it: 'Hall & Colazione', en: 'Hall & Breakfast' } },
  { key: 'rooms', label: { it: 'Camere', en: 'Rooms' } },
  { key: 'views', label: { it: 'Vista', en: 'Views' } },
]

export const galleryImages: GalleryImage[] = [
  // Ingresso
  {
    src: '/media/images/galleria-ingresso-01.jpg',
    alt: { it: 'Ingresso dell\'Albergo Al Gobbo', en: 'Entrance of Albergo Al Gobbo' },
    category: 'entrance',
  },
  {
    src: '/media/images/galleria-ingresso-02.jpg',
    alt: { it: 'La piazzetta di notte', en: 'The small square at night' },
    category: 'entrance',
  },
  {
    src: '/media/images/galleria-ingresso-03.jpg',
    alt: { it: 'Facciata dell\'albergo', en: 'Hotel facade' },
    category: 'entrance',
  },
  {
    src: '/media/images/galleria-ingresso-04.jpg',
    alt: { it: 'Dettaglio dell\'ingresso', en: 'Entrance detail' },
    category: 'entrance',
  },
  {
    src: '/media/images/galleria-ingresso-05.jpg',
    alt: { it: 'Ingresso dell\'albergo', en: 'Hotel entrance' },
    category: 'entrance',
  },
  {
    src: '/media/images/galleria-ingresso-06.jpg',
    alt: { it: 'Porta d\'ingresso', en: 'Front door' },
    category: 'entrance',
  },
  // Hall e colazione
  {
    src: '/media/images/galleria-hall-01.jpg',
    alt: { it: 'Hall dell\'albergo', en: 'Hotel hall' },
    category: 'hall',
  },
  {
    src: '/media/images/galleria-hall-02.jpg',
    alt: { it: 'La reception', en: 'The reception' },
    category: 'hall',
  },
  {
    src: '/media/images/galleria-hall-03.jpg',
    alt: { it: 'Angolo della hall', en: 'Hall corner' },
    category: 'hall',
  },
  {
    src: '/media/images/galleria-hall-04.jpg',
    alt: { it: 'Dettagli della hall', en: 'Hall details' },
    category: 'hall',
  },
  {
    src: '/media/images/galleria-hall-05.jpg',
    alt: { it: 'Hall con divano', en: 'Hall with sofa' },
    category: 'hall',
  },
  {
    src: '/media/images/galleria-hall-06.jpg',
    alt: { it: 'Spazio comune della hall', en: 'Common hall area' },
    category: 'hall',
  },
  {
    src: '/media/images/galleria-hall-07.jpg',
    alt: { it: 'Sala colazione', en: 'Breakfast room' },
    category: 'hall',
  },
  {
    src: '/media/images/galleria-hall-08.jpg',
    alt: { it: 'Tavola della colazione', en: 'Breakfast table' },
    category: 'hall',
  },
  {
    src: '/media/images/galleria-hall-09.jpg',
    alt: { it: 'Colazione continentale', en: 'Continental breakfast' },
    category: 'hall',
  },
  // Camere
  {
    src: '/media/images/galleria-camere-01.jpg',
    alt: { it: 'Camera in toni seppia', en: 'Room in sepia tones' },
    category: 'rooms',
  },
  {
    src: '/media/images/galleria-camere-02.jpg',
    alt: { it: 'Camera doppia', en: 'Double room' },
    category: 'rooms',
  },
  {
    src: '/media/images/galleria-camere-03.jpg',
    alt: { it: 'Interno camera', en: 'Room interior' },
    category: 'rooms',
  },
  {
    src: '/media/images/galleria-camere-04.jpg',
    alt: { it: 'Camera con letto matrimoniale', en: 'Room with double bed' },
    category: 'rooms',
  },
  {
    src: '/media/images/galleria-camere-05.jpg',
    alt: { it: 'Dettaglio camera', en: 'Room detail' },
    category: 'rooms',
  },
  {
    src: '/media/images/galleria-camere-06.jpg',
    alt: { it: 'Camera Comfort', en: 'Comfort room' },
    category: 'rooms',
  },
  // Vista
  {
    src: '/media/images/galleria-vista-01.jpg',
    alt: { it: 'Vista sul campo', en: 'View of the square' },
    category: 'views',
  },
  {
    src: '/media/images/galleria-vista-02.jpg',
    alt: { it: 'Calle veneziana', en: 'Venetian alley' },
    category: 'views',
  },
  {
    src: '/media/images/galleria-vista-03.jpg',
    alt: { it: 'Vista dalla camera', en: 'View from the room' },
    category: 'views',
  },
  {
    src: '/media/images/galleria-vista-04.jpg',
    alt: { it: 'Scorcio sul Campo San Geremia', en: 'Glimpse of Campo San Geremia' },
    category: 'views',
  },
  {
    src: '/media/images/galleria-vista-05.jpg',
    alt: { it: 'Panorama veneziano', en: 'Venetian panorama' },
    category: 'views',
  },
  {
    src: '/media/images/galleria-vista-06.jpg',
    alt: { it: 'Vista dai piani superiori', en: 'View from the upper floors' },
    category: 'views',
  },
]
