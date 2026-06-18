import { BUSINESS, GOLD, DARK_BG, CREAM } from '../lib/business-data';

export function NCFooter() {
  const waHref = `https://wa.me/${BUSINESS.whatsapp}`;
  return (
    <footer
      className="py-12 px-6 md:px-12 text-center border-t"
      style={{ background: DARK_BG, borderColor: `${GOLD}18` }}
    >
      <div className="max-w-4xl mx-auto">
        <p style={{ fontFamily: 'Tajawal, sans-serif', color: GOLD, fontSize: 22, fontWeight: 700 }}>
          {BUSINESS.nameAr}
        </p>
        <p style={{ fontFamily: 'Cormorant Garamond, serif', color: `${CREAM}60`, fontSize: 13, letterSpacing: '0.3em', marginTop: 4 }}>
          {BUSINESS.nameEn.toUpperCase()}
        </p>
        <p style={{ fontFamily: 'DM Sans, sans-serif', color: `${CREAM}40`, fontSize: 12, marginTop: 16 }}>
          {BUSINESS.address} ·{' '}
          <a href={waHref} target="_blank" rel="noopener noreferrer" style={{ color: `${GOLD}80` }}>
            {BUSINESS.phone}
          </a>
        </p>
        <p style={{ fontFamily: 'DM Sans, sans-serif', color: `${CREAM}25`, fontSize: 11, marginTop: 24 }}>
          © {new Date().getFullYear()} {BUSINESS.nameEn}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
