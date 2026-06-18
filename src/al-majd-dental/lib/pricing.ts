// KWD pricing (SAR ÷ 3.75 × 0.082 ≈ SAR ÷ ~12)
// Adjust CURRENCY + TIERS for other markets:
//   AED: multiply KWD × 13.5  |  SAR: multiply KWD × 12

export const CURRENCY = 'KWD'
export const WA_BASE = 'https://wa.me/'

export const TIERS = [
  {
    id: 'starter',
    nameEn: 'Starter',
    nameAr: 'مبتدئ',
    price: 375,
    originalPrice: null,
    highlighted: false,
    deliveryDays: 10,
    revisions: 1,
    features: [
      { en: 'Single-page landing site', ar: 'صفحة هبوط واحدة' },
      { en: 'Mobile-first responsive', ar: 'موبايل أولاً' },
      { en: 'WhatsApp CTA button', ar: 'زر واتساب CTA' },
      { en: 'Google Maps embed', ar: 'خريطة جوجل' },
      { en: '1 revision round', ar: 'جولة تعديل واحدة' },
      { en: 'Basic contact form', ar: 'نموذج اتصال بسيط' },
    ],
    missing: [
      { en: 'Reel animations', ar: 'انيميشن ريل' },
      { en: 'Arabic / English', ar: 'عربي / إنجليزي' },
      { en: 'Bento gallery', ar: 'معرض بينتو' },
      { en: '3D hero element', ar: 'عنصر بطل ثلاثي الأبعاد' },
    ],
    waMessage: (business: string) =>
      `Hello! I'm interested in the Starter website package (375 KWD) for ${business}. Can we schedule a free preview?`,
    badge: null,
  },
  {
    id: 'pro',
    nameEn: 'Pro',
    nameAr: 'برو',
    price: 699,
    originalPrice: 850,
    highlighted: true,
    deliveryDays: 7,
    revisions: 3,
    features: [
      { en: 'Everything in Starter', ar: 'كل شيء في الخطة المبتدئة' },
      { en: 'Reel-quality animations', ar: 'انيميشن بجودة ريل' },
      { en: 'Arabic + English (RTL)', ar: 'عربي + إنجليزي RTL' },
      { en: 'Bento services grid', ar: 'شبكة خدمات بينتو' },
      { en: 'Horizontal gallery', ar: 'معرض أفقي' },
      { en: '3 revision rounds', ar: '3 جولات تعديل' },
      { en: 'Delivered in 7 days', ar: 'تسليم خلال 7 أيام' },
      { en: 'Smooth scroll (Lenis)', ar: 'تمرير سلس' },
    ],
    missing: [
      { en: '3D hero element', ar: 'عنصر بطل ثلاثي الأبعاد' },
      { en: 'Film grain + preloader', ar: 'تأثير حبوب الفيلم' },
      { en: 'SEO optimization', ar: 'تحسين محركات البحث' },
    ],
    waMessage: (business: string) =>
      `Hello! I'm interested in the Pro website package (699 KWD) for ${business}. Can I get a free preview first?`,
    badge: '⭐ Most Popular',
  },
  {
    id: 'premium',
    nameEn: 'Premium',
    nameAr: 'بريميوم',
    price: 1149,
    originalPrice: 1400,
    highlighted: false,
    deliveryDays: 5,
    revisions: 5,
    features: [
      { en: 'Everything in Pro', ar: 'كل شيء في خطة البرو' },
      { en: '3D cinematic hero', ar: 'بطل سينمائي ثلاثي الأبعاد' },
      { en: 'Cinematic preloader', ar: 'شاشة تحميل سينمائية' },
      { en: 'Film grain overlay', ar: 'تراكب حبوب الفيلم' },
      { en: 'Full SEO + meta tags', ar: 'SEO كامل + وسوم Meta' },
      { en: '5 revisions', ar: '5 جولات تعديل' },
      { en: 'Delivered in 5 days', ar: 'تسليم خلال 5 أيام' },
      { en: '30-day support', ar: 'دعم 30 يوماً' },
      { en: 'Analytics setup', ar: 'إعداد التحليلات' },
    ],
    missing: [],
    waMessage: (business: string) =>
      `Hello! I want the Premium package (1,149 KWD) for ${business} — the full cinematic reel experience. When can we start?`,
    badge: 'Full Reel',
  },
]
