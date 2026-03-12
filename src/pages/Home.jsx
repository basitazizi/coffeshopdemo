const css = `
  .hero-circle-l { animation: float 5s ease-in-out infinite; }
  .hero-circle-r { animation: float 5s ease-in-out infinite 0.8s; }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
  .order-btn:hover { background: var(--amber-dark) !important; transform: scale(1.04); }
  .feature-card:hover { transform: translateY(-6px); background: rgba(212,137,74,0.1) !important; }
  .feature-card:hover .feature-icon { background: var(--amber) !important; color: #fff !important; }

  @media (max-width: 900px) {
    .hero-grid { grid-template-columns: 1fr !important; gap: 28px !important; padding: 0 16px !important; }
    .hero-left, .hero-right { justify-content: center !important; padding: 0 !important; }
    .hero-center { padding: 0 !important; min-width: 0 !important; }
  }

  @media (max-width: 700px) {
    .stats-bar { flex-wrap: wrap !important; gap: 24px !important; padding: 22px 16px !important; }
    .features-grid { grid-template-columns: 1fr !important; }
    .menu-preview-grid { grid-template-columns: 1fr !important; }
    .site-footer { padding: 40px 16px 28px !important; }
    .footer-top { flex-direction: column !important; gap: 22px !important; }
    .footer-bottom { flex-direction: column !important; gap: 10px !important; align-items: flex-start !important; }
  }
`;

export default function Home({ onNavigate }) {
  return (
    <>
      <style>{css}</style>

      {/* ─── HERO ─── */}
      <section style={{
        minHeight: '100vh', background: 'var(--teal)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
        paddingTop: '68px',
      }}>
        {/* Top horizontal rule */}
        <div style={{ position: 'absolute', top: '110px', left: 0, right: 0, height: '1px', background: 'rgba(245,240,232,0.12)' }} />
        {/* Bottom horizontal rule */}
        <div style={{ position: 'absolute', bottom: '90px', left: 0, right: 0, height: '1px', background: 'rgba(245,240,232,0.12)' }} />

        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', width: '100%', maxWidth: '1300px', padding: '0 clamp(16px, 6vw, 60px)', gap: '0' }}>

          {/* Left circular image */}
          <div className="hero-circle-l hero-left" style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '20px', position: 'relative' }}>
            {/* Decorative outer ring */}
            <div style={{ position: 'relative', width: 'min(320px, 78vw)', height: 'min(320px, 78vw)' }}>
              {/* Outer ring decorative */}
              <div style={{
                position: 'absolute', inset: '-20px',
                borderRadius: '50%',
                border: '1px solid rgba(245,240,232,0.2)',
              }} />
              {/* Dot top */}
              <div style={{ position: 'absolute', top: '-22px', left: '50%', transform: 'translateX(-50%)', width: '10px', height: '10px', borderRadius: '50%', background: 'var(--white)' }} />
              {/* Dot bottom */}
              <div style={{ position: 'absolute', bottom: '-22px', left: '50%', transform: 'translateX(-50%)', width: '10px', height: '10px', borderRadius: '50%', background: 'var(--white)' }} />
              {/* Amber ring */}
              <div style={{
                position: 'absolute', inset: '0',
                borderRadius: '50%',
                border: '10px solid var(--amber)',
              }} />
              {/* Photo */}
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=600&fit=crop&q=85"
                alt="Coffee"
                style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Center text */}
          <div className="hero-center" style={{ textAlign: 'center', padding: '0 60px', maxWidth: '520px', margin: '0 auto' }}>
            <p style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300, fontSize: '1.05rem', color: 'rgba(245,240,232,0.7)', letterSpacing: '0.1em', marginBottom: '12px' }} className="fade-up">
              The Best
            </p>
            <h1 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(4rem, 7vw, 7rem)',
              fontWeight: 700, color: 'var(--white)',
              lineHeight: 0.95, marginBottom: '4px',
            }} className="fade-up-2">
              Coffee
            </h1>
            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 400, fontStyle: 'italic',
              color: 'var(--white)', marginBottom: '28px',
            }} className="fade-up-3">
              For You
            </h2>
            <p style={{
              fontFamily: 'Lato, sans-serif', fontWeight: 300,
              fontSize: '0.9rem', color: 'rgba(245,240,232,0.6)',
              lineHeight: 1.8, marginBottom: '32px',
              maxWidth: '320px', margin: '0 auto 32px',
            }} className="fade-up-3">
              Specialty coffee crafted with passion, served in a space where every sip tells a story.
            </p>
            <button
              className="order-btn fade-up-4"
              onClick={() => onNavigate('menu')}
              style={{
                padding: '14px 44px', border: 'none', borderRadius: '999px',
                background: 'var(--amber)', color: '#fff',
                fontFamily: 'Lato, sans-serif', fontWeight: 700,
                fontSize: '0.85rem', letterSpacing: '0.14em',
                textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.25s',
              }}
            >Order Now</button>

            {/* Logo emblem */}
            <div style={{ marginTop: '48px' }}>
              <div style={{ fontSize: '1.6rem', marginBottom: '4px' }}>☕</div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '0.95rem', color: 'rgba(245,240,232,0.5)', letterSpacing: '0.08em' }}>Coffee Expresso</div>
            </div>
          </div>

          {/* Right circular image */}
          <div className="hero-circle-r hero-right" style={{ display: 'flex', justifyContent: 'flex-start', paddingLeft: '20px' }}>
            <div style={{ position: 'relative', width: 'min(320px, 78vw)', height: 'min(320px, 78vw)' }}>
              <div style={{ position: 'absolute', inset: '-20px', borderRadius: '50%', border: '1px solid rgba(245,240,232,0.2)' }} />
              <div style={{ position: 'absolute', top: '-22px', left: '50%', transform: 'translateX(-50%)', width: '10px', height: '10px', borderRadius: '50%', background: 'var(--white)' }} />
              <div style={{ position: 'absolute', bottom: '-22px', left: '50%', transform: 'translateX(-50%)', width: '10px', height: '10px', borderRadius: '50%', background: 'var(--white)' }} />
              <div style={{ position: 'absolute', inset: '0', borderRadius: '50%', border: '10px solid var(--amber)' }} />
              <img
                src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=600&fit=crop&q=85"
                alt="Coffee latte"
                style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <div className="stats-bar" style={{ background: 'var(--teal-dark)', padding: '32px clamp(16px, 6vw, 80px)', display: 'flex', justifyContent: 'center', gap: 'clamp(22px, 6vw, 80px)', borderTop: '1px solid rgba(212,137,74,0.25)', borderBottom: '1px solid rgba(212,137,74,0.25)' }}>
        {[['12+', 'Origin Blends'], ['⭐ 4.9', 'Google Rating'], ['6 AM', 'We Open'], ['3 Min', 'Avg Wait']].map(([val, label]) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: 'var(--amber)' }}>{val}</div>
            <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.4)', marginTop: '4px' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* ─── FEATURES SECTION ─── */}
      <section style={{ background: 'var(--teal)', padding: 'clamp(60px, 10vw, 100px) clamp(16px, 6vw, 80px)' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300, fontSize: '0.8rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '12px' }}>Why Choose Us</p>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '3rem', color: 'var(--cream)', lineHeight: 1.1 }}>
            Crafted with<br /><em>care and passion</em>
          </h2>
        </div>
        <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', maxWidth: '900px', margin: '0 auto' }}>
          {[
            { icon: '🌱', title: 'Single Origin', desc: 'Every bean sourced directly from small farms we trust and visit personally.' },
            { icon: '🔥', title: 'Freshly Roasted', desc: 'Roasted in-house weekly. You taste the difference in every single cup.' },
            { icon: '☕', title: 'Expert Baristas', desc: 'Our team trains for months to pull the perfect shot, every time.' },
          ].map(f => (
            <div key={f.title} className="feature-card" style={{
              background: 'rgba(255,255,255,0.04)', borderRadius: '16px',
              padding: '36px 28px', textAlign: 'center',
              border: '1px solid rgba(212,137,74,0.15)',
              transition: 'all 0.3s',
            }}>
              <div className="feature-icon" style={{
                width: '60px', height: '60px', borderRadius: '50%',
                background: 'rgba(212,137,74,0.12)', border: '1.5px solid rgba(212,137,74,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.6rem', margin: '0 auto 20px', transition: 'all 0.3s',
              }}>{f.icon}</div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', color: 'var(--cream)', marginBottom: '10px' }}>{f.title}</h3>
              <p style={{ fontFamily: 'Lato, sans-serif', fontSize: '0.88rem', color: 'rgba(245,240,232,0.55)', lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── MENU PREVIEW ─── */}
      <section style={{ background: 'var(--teal-dark)', padding: 'clamp(60px, 10vw, 100px) clamp(16px, 6vw, 80px)', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, var(--amber), transparent)' }} />
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300, fontSize: '0.8rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '12px' }}>What We Serve</p>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '3rem', color: 'var(--cream)' }}>Our Signature Menu</h2>
        </div>
        <div className="menu-preview-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '32px', maxWidth: '1100px', margin: '0 auto 48px' }}>
          {[
            { img: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=600&h=500&fit=crop&q=85', cat: 'Hot Coffee', label: 'Cappuccino', price: 'from $4.50' },
            { img: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&h=500&fit=crop&q=85', cat: 'Cold Coffee', label: 'Cold Brew', price: 'from $4.75' },
            { img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&h=500&fit=crop&q=85', cat: 'Sweets', label: 'Butter Croissant', price: 'from $3.25' },
          ].map(item => (
            <div key={item.label} onClick={() => onNavigate('menu')} style={{ cursor: 'pointer', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(212,137,74,0.2)', transition: 'transform 0.3s, box-shadow 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ height: '220px', overflow: 'hidden' }}>
                <img src={item.img} alt={item.label} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }} />
              </div>
              <div style={{ padding: '20px 22px', background: 'rgba(255,255,255,0.04)' }}>
                <p style={{ fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '4px' }}>{item.cat}</p>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', color: 'var(--cream)', marginBottom: '4px' }}>{item.label}</h3>
                <p style={{ fontSize: '0.85rem', color: 'rgba(245,240,232,0.5)' }}>{item.price}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center' }}>
          <button onClick={() => onNavigate('menu')} style={{
            padding: '14px 48px', border: '1.5px solid var(--amber)',
            borderRadius: '999px', background: 'transparent', color: 'var(--amber)',
            fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: '0.85rem',
            letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--amber)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--amber)'; }}
          >View Full Menu</button>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, var(--amber), transparent)' }} />
      </section>

      {/* FOOTER */}
      <footer className="site-footer" style={{ background: 'var(--teal-dark)', padding: '48px clamp(16px, 6vw, 80px) 32px', borderTop: '1px solid rgba(212,137,74,0.2)' }}>
        <div className="footer-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px', gap: '24px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', color: 'var(--amber)', marginBottom: '8px' }}>Coffee Expresso</div>
            <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300, fontSize: '0.88rem', color: 'rgba(245,240,232,0.45)', lineHeight: 1.8 }}>
              123 Brew Street, San Diego, CA 92101<br />
              (619) 555-0199 · hello@coffeeexpresso.com
            </div>
          </div>
          <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300, fontSize: '0.88rem', color: 'rgba(245,240,232,0.45)', lineHeight: 1.8, textAlign: 'left' }}>
            Mon – Fri: 6:00 AM – 8:00 PM<br />
            Sat – Sun: 7:00 AM – 9:00 PM
          </div>
        </div>
        <div className="footer-bottom" style={{ borderTop: '1px solid rgba(212,137,74,0.15)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'rgba(245,240,232,0.3)', fontFamily: 'Lato, sans-serif' }}>
          <span>© 2026 Coffee Expresso. All rights reserved.</span>
          <span>Staff: <span style={{ cursor: 'pointer', textDecoration: 'underline', color: 'rgba(212,137,74,0.4)' }} onClick={() => window._navigateKitchen && window._navigateKitchen()}>Kitchen Display</span></span>
        </div>
      </footer>
    </>
  );
}
