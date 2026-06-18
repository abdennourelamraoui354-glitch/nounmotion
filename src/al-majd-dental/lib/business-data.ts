// ── عيادة المجد لطب الأسنان — AL MAJD DENTAL CLINIC ──────────────────────────
// Ghubra / South Al Ghubrah, Muscat, Oman · Rating 4.9 ★ (508 reviews)
// Phone: +968 9915 7979 · Opposite Sultan Qaboos Stadium

export const PRIMARY       = '#1A3C5E'   // deep Oman navy
export const PRIMARY_LIGHT = '#2A5F8F'
export const ACCENT        = '#C9A84C'   // warm Omani gold
export const ACCENT_LIGHT  = '#E2C97A'
export const BG            = '#F7F5F0'   // warm cream
export const DARK          = '#0E1E2E'   // deep navy dark
export const MUTED         = '#6B7280'
// aliases used by shared premium-demo components
export const TEAL          = PRIMARY
export const TEAL_LIGHT    = PRIMARY_LIGHT
export const TEAL_DARK     = '#0F2438'

export const BUSINESS = {
  slug: 'al-majd-dental',
  niche: 'dental' as const,

  nameEn: 'Al Majd Dental Clinic',
  nameAr: 'عيادة المجد لطب الأسنان',
  taglineEn: 'Excellence in Every Smile.',
  taglineAr: 'التميز في كل ابتسامة.',
  descEn:
    'One of the best dental clinics in Ghubra, Bousher & Muscat. Trusted by 500+ patients for gentle, precise dental care at fair, transparent prices.',
  descAr:
    'من أفضل عيادات الأسنان في الغبرة وبوشر ومسقط. يثق بها أكثر من 500 مريض لرعاية أسنان لطيفة ودقيقة بأسعار شفافة ومناسبة.',

  city: 'Muscat, Oman',
  neighborhood: 'الغبرة — Ghubra',
  address: 'Flat 101, 1st Floor, Ghubrah Street, South Al Ghubrah, Opposite Sultan Qaboos Stadium, Muscat',
  addressAr: 'شقة 101، الطابق الأول، شارع الغبرة، الغبرة الجنوبية، مقابل ملعب السلطان قابوس، مسقط',
  phone: '+968 9915 7979',
  whatsapp: '+96899157979',
  rating: 4.9,
  reviews: 508,
  established: 2015,
  mapsUrl: 'https://maps.app.goo.gl/RTK1RJofhAAP8jv36',

  hours: {
    weekdays: 'السبت – الخميس   10:00 ص – 1:00 م  ،  4:00 م – 10:00 م',
    weekend:  'الجمعة   4:00 م – 10:00 م',
    note:     'متابعة من الدكتور حتى عبر الواتساب',
  },

  marqueeItems: [
    'عيادة المجد',
    'AL MAJD DENTAL',
    'الغبرة · مسقط',
    'GHUBRA · MUSCAT',
    '٤٫٩ ★ — ٥٠٨ تقييم',
    '4.9 ★ — 508 REVIEWS',
    'زراعة الأسنان',
    'IMPLANTS',
    'تبييض الأسنان',
    'WHITENING',
    'تقويم أسنان',
    'ORTHODONTICS',
    'أسعار ملائمة',
    'FAIR PRICES',
  ],

  orbitLabels: [
    { en: 'Implants',   ar: 'زراعة' },
    { en: 'Whitening',  ar: 'تبييض' },
    { en: 'Braces',     ar: 'تقويم' },
    { en: 'Veneers',    ar: 'قشرة' },
    { en: 'Pediatric',  ar: 'أطفال' },
    { en: 'Root Canal', ar: 'عصب' },
  ],

  services: [
    {
      id: 1,
      nameEn: 'Dental Implants',
      nameAr: 'زراعة الأسنان',
      descEn: 'Permanent, natural-looking replacements with premium titanium implants — restore your smile for life.',
      descAr: 'بدائل دائمة وطبيعية المظهر بغرسات التيتانيوم — ابتسامة للأبد.',
      icon: '⬡',
      size: 'large',
      color: PRIMARY,
    },
    {
      id: 2,
      nameEn: 'Smile Design',
      nameAr: 'تصميم الابتسامة',
      descEn: 'Hollywood smile & veneers tailored to your facial harmony.',
      descAr: 'ابتسامة هوليوود والقشور مصممة لتناسب ملامح وجهك.',
      icon: '◈',
      size: 'small',
      color: ACCENT,
    },
    {
      id: 3,
      nameEn: 'Orthodontics',
      nameAr: 'تقويم الأسنان',
      descEn: 'Clear aligners and traditional braces — visible results you\'ll notice from the first month.',
      descAr: 'تقويم شفاف وتقليدي — نتائج تلاحظها من الشهر الأول.',
      icon: '◇',
      size: 'small',
      color: PRIMARY_LIGHT,
    },
    {
      id: 4,
      nameEn: 'Teeth Whitening',
      nameAr: 'تبييض الأسنان',
      descEn: 'Professional whitening — several shades brighter in a single session.',
      descAr: 'تبييض احترافي — عدة درجات أفتح في جلسة واحدة.',
      icon: '✦',
      size: 'small',
      color: '#C9A84C',
    },
    {
      id: 5,
      nameEn: 'Pediatric Dentistry',
      nameAr: 'طب أسنان الأطفال',
      descEn: 'A gentle, fear-free environment for children — because healthy habits start young.',
      descAr: 'بيئة لطيفة وخالية من الخوف للأطفال — لأن العادات الصحية تبدأ مبكراً.',
      icon: '○',
      size: 'small',
      color: '#EC4899',
    },
    {
      id: 6,
      nameEn: 'Root Canal & Fillings',
      nameAr: 'علاج العصب والحشوات',
      descEn: 'Pain-free root canal treatment and precision fillings using the latest techniques.',
      descAr: 'علاج عصب بلا ألم وحشوات دقيقة بأحدث التقنيات.',
      icon: '◉',
      size: 'small',
      color: '#6366F1',
    },
  ],

  story: [
    {
      year: 'الوصول',
      titleEn: 'Arriving in Ghubra',
      titleAr: 'الوصول إلى الغبرة',
      textEn: 'Step into Al Majd — warm atmosphere, a calm reception, and staff who welcome you with care.',
      textAr: 'ادخل عيادة المجد — أجواء دافئة، استقبال هادئ، وموظفون يرحبون بك باهتمام.',
    },
    {
      year: 'الكشف',
      titleEn: 'Your Consultation',
      titleAr: 'الكشف والاستشارة',
      textEn: 'Dr. Salo takes time to listen, explain, and show you exactly what your treatment will look like.',
      textAr: 'الدكتور سالو يأخذ وقته للاستماع والشرح وإرشادك بدقة لخطة علاجك.',
    },
    {
      year: 'العلاج',
      titleEn: 'Gentle, Precise Care',
      titleAr: 'العلاج الدقيق واللطيف',
      textEn: 'Modern equipment, fair prices, and a doctor who follows up with you even after you leave.',
      textAr: 'معدات حديثة، أسعار ملائمة، ودكتور يتابعك حتى عبر الواتساب بعد الخروج.',
    },
  ],

  testimonials: [
    {
      nameEn: 'M. A.',
      nameAr: 'م. أ.',
      textEn: 'Treatment and care with Dr. Salo is excellent. Prices are fair too. The doctor follows up even over WhatsApp.',
      textAr: 'العلاج والتعامل ممتاز مع الدكتور سالو .. الأسعار ملائمة كذلك .. هناك متابعة من الدكتور حتى عبر الواتساب.',
      rating: 5,
      service: 'Dental Treatment',
    },
    {
      nameEn: 'Safia M.S. Al Rawahi',
      nameAr: 'صفية الرواحي',
      textEn: 'I wanted to share my experience — a truly wonderful clinic. I highly recommend it to everyone in Muscat.',
      textAr: 'السلام عليكم ورحمة الله وبركاته، حبيت أفيدكم من تجربتي — عيادة رائعة بكل المقاييس. أنصح بها بشدة.',
      rating: 5,
      service: 'General Dentistry',
    },
    {
      nameEn: 'Nazik Al Moosawi',
      nameAr: 'نازك الموسوي',
      textEn: 'The cleanliness is excellent, the doctor and assistants are wonderful. I felt completely at ease throughout.',
      textAr: 'من ناحية النظافة ممتازة والدكتور والمساعدات رائعين. شعرت بالراحة التامة طوال الوقت.',
      rating: 5,
      service: 'Dental Care',
    },
  ],

  galleryImages: [
    { src: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=85', caption: 'Treatment Suite' },
    { src: 'https://images.unsplash.com/photo-1588776814546-1ffedce698d8?w=1200&q=85', caption: 'Consultation Room' },
    { src: 'https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?w=1200&q=85', caption: 'Digital X-Ray' },
    { src: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=1200&q=85', caption: 'Smile Results' },
    { src: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=1200&q=85', caption: 'Clinic Interior' },
  ],

  heroSlides: [
    {
      img: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1920&q=90',
      headlineEn: 'YOUR SMILE\nIN GHUBRA',
      headlineAr: 'ابتسامتك\nفي الغبرة',
      subEn: 'One of the best dental clinics in Muscat — trusted by 500+ patients',
      subAr: 'من أفضل عيادات الأسنان في مسقط — يثق بها أكثر من 500 مريض',
    },
    {
      img: 'https://images.unsplash.com/photo-1588776814546-1ffedce698d8?w=1920&q=90',
      headlineEn: 'GENTLE.\nPRECISE.\nTRUSTED.',
      headlineAr: 'لطيف.\nدقيق.\nموثوق.',
      subEn: 'Fair prices · Doctor follow-up · Modern equipment',
      subAr: 'أسعار ملائمة · متابعة من الدكتور · معدات حديثة',
    },
    {
      img: 'https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?w=1920&q=90',
      headlineEn: '4.9 ★\n508 REVIEWS',
      headlineAr: '٤٫٩ ★\n٥٠٨ تقييم',
      subEn: 'Opposite Sultan Qaboos Stadium · South Al Ghubrah · Muscat',
      subAr: 'مقابل ملعب السلطان قابوس · الغبرة الجنوبية · مسقط',
    },
  ],

  mapsEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3655.3!2d58.4043861!3d23.5769012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e91ffaef44bd44b%3A0x9f61a2e0c6782f7d!2z2Yli2KfYr9mMINin2YTZhdis2K8g2YTYt9io2KfZhdiMINin2YTYo9iz2YbYp9mGIEFMIE1BSkQgREVOVEFMIENMSU5JQw!5e0!3m2!1sar!2som!4v1718000000000!5m2!1sar!2som',
}
