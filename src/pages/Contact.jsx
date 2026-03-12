import { useState } from 'react';

const inputStyle = (filled) => ({
  width: '100%', padding: '14px 18px',
  background: 'rgba(255,255,255,0.05)',
  border: `1.5px solid ${filled ? 'var(--amber)' : 'rgba(212,137,74,0.2)'}`,
  borderRadius: '10px', color: 'var(--cream)',
  fontFamily: 'Lato, sans-serif', fontWeight: 400, fontSize: '0.95rem',
  outline: 'none', transition: 'border 0.2s',
});

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  return (
    <>
      {/* Hero */}
      <div style={{ background: 'var(--teal)', paddingTop: '68px' }}>
        <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(212,137,74,0.4), transparent)' }} />
        <div style={{ padding: '72px 80px 60px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300, fontSize: '0.78rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '12px' }}>Come Visit</p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '4rem', color: 'var(--cream)' }}>
            About <em>Us</em>
          </h1>
          <p style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300, color: 'rgba(245,240,232,0.55)', maxWidth: '400px', margin: '16px auto 0', lineHeight: 1.75 }}>
            We'd love to meet you. Come in, say hello, or drop us a note.
          </p>
        </div>
        <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(212,137,74,0.4), transparent)' }} />
      </div>

      {/* Content */}
      <div style={{ background: 'var(--teal)', padding: '80px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', maxWidth: '1100px', margin: '0 auto' }}>

        {/* Left: Info */}
        <div>
          {/* Big circular photo */}
          <div style={{ position: 'relative', width: '320px', height: '320px', margin: '0 auto 48px' }}>
            <div style={{ position: 'absolute', inset: '-16px', borderRadius: '50%', border: '1px solid rgba(245,240,232,0.12)' }} />
            <div style={{ position: 'absolute', top: '-18px', left: '50%', transform: 'translateX(-50%)', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--white)' }} />
            <div style={{ position: 'absolute', bottom: '-18px', left: '50%', transform: 'translateX(-50%)', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--white)' }} />
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '8px solid var(--amber)' }} />
            <img
              src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=600&h=600&fit=crop&q=85"
              alt="Our cafe"
              style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
            />
          </div>

          {/* Info cards */}
          {[
            { icon: '📍', title: 'Location', lines: ['123 Brew Street', 'San Diego, CA 92101'] },
            { icon: '🕐', title: 'Hours', lines: ['Mon–Fri: 6:00 AM – 8:00 PM', 'Sat–Sun: 7:00 AM – 9:00 PM'] },
            { icon: '📞', title: 'Phone', lines: ['(619) 555-0199'] },
            { icon: '✉️', title: 'Email', lines: ['hello@coffeeexpresso.com'] },
          ].map(card => (
            <div key={card.title} style={{
              display: 'flex', gap: '16px', marginBottom: '20px',
              padding: '20px', borderRadius: '14px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(212,137,74,0.15)',
              alignItems: 'flex-start',
            }}>
              <div style={{ fontSize: '1.4rem', flexShrink: 0, marginTop: '2px' }}>{card.icon}</div>
              <div>
                <p style={{ fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '4px' }}>{card.title}</p>
                {card.lines.map(l => <p key={l} style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300, fontSize: '0.9rem', color: 'rgba(245,240,232,0.6)', lineHeight: 1.7 }}>{l}</p>)}
              </div>
            </div>
          ))}
        </div>

        {/* Right: Form */}
        <div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', color: 'var(--cream)', marginBottom: '8px' }}>Send a Message</h2>
          <p style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300, color: 'rgba(245,240,232,0.5)', fontSize: '0.9rem', marginBottom: '36px', lineHeight: 1.7 }}>
            Questions about catering, events, or anything else? We read every message personally.
          </p>

          {sent ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', background: 'rgba(212,137,74,0.08)', borderRadius: '16px', border: '1px solid rgba(212,137,74,0.25)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>☕</div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', color: 'var(--amber)', marginBottom: '8px' }}>Message Sent!</h3>
              <p style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300, color: 'rgba(245,240,232,0.55)', fontSize: '0.9rem' }}>We'll be in touch within 24 hours.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { key: 'name', label: 'Your Name', type: 'text', placeholder: 'Alex Johnson' },
                { key: 'email', label: 'Email', type: 'email', placeholder: 'alex@email.com' },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ display: 'block', fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '8px' }}>{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} style={inputStyle(form[f.key])} />
                </div>
              ))}
              <div>
                <label style={{ display: 'block', fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '8px' }}>Message</label>
                <textarea placeholder="Tell us how we can help..." rows={5} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} style={{ ...inputStyle(form.message), resize: 'none' }} />
              </div>
              <button
                onClick={() => { if (form.name && form.email && form.message) setSent(true); }}
                disabled={!form.name || !form.email || !form.message}
                style={{
                  padding: '15px', border: 'none', borderRadius: '10px',
                  background: (form.name && form.email && form.message) ? 'var(--amber)' : 'rgba(212,137,74,0.2)',
                  color: (form.name && form.email && form.message) ? '#fff' : 'rgba(245,240,232,0.3)',
                  fontFamily: 'Playfair Display, serif', fontSize: '1.05rem',
                  cursor: (form.name && form.email && form.message) ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { if (form.name && form.email && form.message) e.currentTarget.style.background = 'var(--amber-dark)'; }}
                onMouseLeave={e => { if (form.name && form.email && form.message) e.currentTarget.style.background = 'var(--amber)'; }}
              >Send Message →</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
