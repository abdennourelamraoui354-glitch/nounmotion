// ── SWAP THIS FILE WITH REAL CLIENT DATA ──────────────────────────────────────
// Phase 1: paste the Google Maps URL, fill in the fields below, done.

export const BUSINESS = {
  slug: 'celestia-dental',
  niche: 'dental' as const,

  // Identity
  nameEn: 'Celestia Dental Centre',
  nameAr: 'سيليستيا للأسنان',
  taglineEn: 'Precision. Artistry. Confidence.',
  taglineAr: 'دقة. فن. ثقة.',
  descEn:
    "Kuwait City's premier cosmetic and restorative dental practice — where clinical excellence meets an elevated patient experience. Trusted by 8,000+ patients across the Gulf.",
  descAr:
    'عيادة الأسنان التجميلية والترميمية الأولى في الكويت — حيث يلتقي التميز السريري بتجربة مريض راقية. موثوق بها من أكثر من 8,000 مريض في الخليج.',

  // Location (swap with real Maps data)
  city: 'Kuwait City, Kuwait',
  address: 'Block 12, Salem Al Mubarak Street, Salmiya',
  phone: '+965 0000 0000',
  whatsapp: '+96500000000',        // ← replace with real number
  rating: 4.9,
  reviews: 1340,
  established: 2008,

  hours: {
    weekdays: 'Sat–Thu  9:00 AM – 9:00 PM',
    weekend: 'Friday  4:00 PM – 9:00 PM',
    emergency: '24-hour emergency line available',
  },

  marqueeItems: [
    'CELESTIA DENTAL',
    'سيليستيا للأسنان',
    'IMPLANTS',
    'زراعة الأسنان',
    'WHITENING',
    'تبييض الأسنان',
    'INVISALIGN',
    'تقويم شفاف',
    'COSMETIC',
    'أسنان تجميلية',
    'TRUSTED · 8,000+ PATIENTS',
    'SINCE 2008',
    'KUWAIT · GCC',
  ],

  orbitLabels: [
    { en: 'Implants',    ar: 'زراعة' },
    { en: 'Whitening',   ar: 'تبييض' },
    { en: 'Invisalign',  ar: 'تقويم' },
    { en: 'Veneers',     ar: 'قشرة' },
    { en: 'Pediatric',   ar: 'أطفال' },
    { en: 'Emergency',   ar: 'طوارئ' },
  ],

  services: [
    {
      id: 1,
      nameEn: 'Dental Implants',
      nameAr: 'زراعة الأسنان',
      descEn: 'Permanent, natural-looking replacements. Premium titanium implants with a 15-year guarantee.',
      descAr: 'بدائل دائمة وطبيعية المظهر. غرسات تيتانيوم بضمان 15 عاماً.',
      icon: '⬡',
      size: 'large',
      color: '#0EA5A9',
    },
    {
      id: 2,
      nameEn: 'Smile Design',
      nameAr: 'تصميم الابتسامة',
      descEn: 'Hollywood Smile & veneers crafted to your facial geometry.',
      descAr: 'ابتسامة هوليوود والقشرة مصممة لتناسب ملامح وجهك.',
      icon: '◈',
      size: 'small',
      color: '#7C3AED',
    },
    {
      id: 3,
      nameEn: 'Orthodontics',
      nameAr: 'تقويم الأسنان',
      descEn: 'Invisalign Diamond Provider — clear aligners, visible results in 6 months.',
      descAr: 'موفر Invisalign Diamond — نتائج واضحة خلال 6 أشهر.',
      icon: '◇',
      size: 'small',
      color: '#0EA5A9',
    },
    {
      id: 4,
      nameEn: 'Whitening',
      nameAr: 'تبييض الأسنان',
      descEn: 'Professional Zoom whitening — 8 shades brighter in one session.',
      descAr: 'تبييض Zoom الاحترافي — 8 درجات أفتح في جلسة واحدة.',
      icon: '✦',
      size: 'small',
      color: '#F59E0B',
    },
    {
      id: 5,
      nameEn: 'Pediatric Care',
      nameAr: 'طب أسنان الأطفال',
      descEn: 'A gentle, fear-free environment designed for children 2–16.',
      descAr: 'بيئة لطيفة وخالية من الخوف مصممة للأطفال من 2-16 عاماً.',
      icon: '○',
      size: 'small',
      color: '#EC4899',
    },
    {
      id: 6,
      nameEn: '24h Emergency',
      nameAr: 'طوارئ ٢٤ساعة',
      descEn: 'Same-day pain relief. Our emergency line is always open.',
      descAr: 'تخفيف الألم في نفس اليوم. خط الطوارئ مفتوح دائماً.',
      icon: '◉',
      size: 'small',
      color: '#EF4444',
    },
  ],

  story: [
    {
      year: '2008',
      titleEn: 'Founded',
      titleAr: 'التأسيس',
      textEn: 'Opened in Salmiya with a single vision: to make world-class dental care accessible to Kuwait City.',
      textAr: 'افتُتحت في السالمية برؤية واحدة: جعل رعاية الأسنان على مستوى عالمي في متناول أهل الكويت.',
    },
    {
      year: '2015',
      titleEn: 'Digital Upgrade',
      titleAr: 'التحول الرقمي',
      textEn: 'Invested in 3D cone-beam CT, digital smile design, and same-day crown technology.',
      textAr: 'استثمرنا في أشعة CT ثلاثية الأبعاد، تصميم الابتسامة الرقمي، وتقنية التيجان في نفس اليوم.',
    },
    {
      year: '2024',
      titleEn: 'Celestia Today',
      titleAr: 'اليوم',
      textEn: '8,000+ patients, 12 specialists, a 4.9-star reputation — and the same founding commitment to your smile.',
      textAr: 'أكثر من 8,000 مريض، 12 متخصصاً، وتقييم 4.9 نجمة — ونفس الالتزام بابتسامتك.',
    },
  ],

  testimonials: [
    {
      nameEn: 'Noor Al-Rashidi',
      nameAr: 'نور الراشدي',
      textEn: 'My implants look completely natural. The team was professional and the results exceeded every expectation.',
      textAr: 'غرساتي تبدو طبيعية تماماً. الفريق كان محترفاً والنتائج فاقت كل توقعاتي.',
      rating: 5,
      service: 'Dental Implants',
    },
    {
      nameEn: 'Faisal Al-Mutairi',
      nameAr: 'فيصل المطيري',
      textEn: 'Invisalign in 7 months. Zero pain, zero embarrassment at work. Best decision of my life.',
      textAr: 'إنفيزالاين في 7 أشهر. صفر ألم، صفر إحراج في العمل. أفضل قرار في حياتي.',
      rating: 5,
      service: 'Invisalign',
    },
    {
      nameEn: 'Sarah Al-Amer',
      nameAr: 'سارة العامر',
      textEn: 'Smile design that transformed my confidence. The digital preview made me trust the process immediately.',
      textAr: 'تصميم ابتسامة غيّر ثقتي بنفسي. المعاينة الرقمية جعلتني أثق بالعملية فوراً.',
      rating: 5,
      service: 'Smile Design',
    },
  ],

  galleryImages: [
    { src: '/images/nounmotion/02-dental-clinic-hero.jpg', caption: 'The Clinic' },
    { src: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80', caption: 'Treatment Suite' },
    { src: 'https://images.unsplash.com/photo-1588776814546-1ffedce698d8?w=800&q=80', caption: 'Consultation' },
    { src: 'https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?w=800&q=80', caption: 'Digital X-Ray' },
    { src: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=800&q=80', caption: 'Results' },
  ],

  heroSlides: [
    {
      img: '/images/nounmotion/02-dental-clinic-hero.jpg',
      headlineEn: 'YOUR SMILE\nREINVENTED',
      headlineAr: 'ابتسامتك\nمن جديد',
      subEn: "Kuwait City's most trusted cosmetic dental centre",
      subAr: 'مركز الأسنان التجميلي الأكثر ثقةً في الكويت',
    },
  ],

  mapsEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3479.0!2d48.0796!3d29.3117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDE4JzQyLjEiTiA0OMKwMDQnNDYuNiJF!5e0!3m2!1sen!2skw!4v1718000000000!5m2!1sen!2skw',
}

export const TEAL = '#0EA5A9'
export const TEAL_LIGHT = '#22D3D8'
export const TEAL_DARK = '#0C7377'
export const BG = '#F8FAFB'
export const DARK = '#0D1117'
export const MUTED = '#6B7280'
