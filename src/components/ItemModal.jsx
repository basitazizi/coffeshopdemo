import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function ItemModal({ item, onClose }) {
  const { addToCart } = useCart();
  const defaultSize = item.sizes?.[Math.floor((item.sizes?.length || 1) / 2)] || item.sizes?.[0] || null;
  const [size, setSize] = useState(defaultSize);
  const [variety, setVariety] = useState(item.varieties?.[0] || null);
  const [flavor, setFlavor] = useState(item.flavors?.[0] || 'None');
  const [qty, setQty] = useState(1);

  const sizeExtra = item.sizePrices?.[size] || 0;
  const unitPrice = item.basePrice + sizeExtra;
  const totalPrice = unitPrice * qty;

  const pillStyle = (active, color = 'var(--amber)') => ({
    padding: '8px 20px', borderRadius: '999px',
    border: `1.5px solid ${active ? color : 'rgba(245,240,232,0.2)'}`,
    background: active ? color : 'transparent',
    color: active ? '#fff' : 'rgba(245,240,232,0.7)',
    fontFamily: 'Lato, sans-serif', fontWeight: 700,
    fontSize: '0.82rem', cursor: 'pointer', transition: 'all 0.2s',
  });

  return (
    <>
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, background: 'rgba(13,53,40,0.75)',
        zIndex: 500, backdropFilter: 'blur(6px)',
      }} />
      <div style={{
        position: 'fixed', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '92%', maxWidth: '560px',
        background: 'var(--teal)',
        borderRadius: '20px', zIndex: 600,
        boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
        border: '1px solid rgba(212,137,74,0.25)',
        maxHeight: '90vh', overflowY: 'auto',
      }}>
        {/* Hero image */}
        <div style={{ position: 'relative', height: '240px', flexShrink: 0 }}>
          <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px 20px 0 0' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(27,94,75,0.7) 0%, transparent 60%)', borderRadius: '20px 20px 0 0' }} />
          {item.badge && (
            <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'var(--amber)', color: '#fff', borderRadius: '999px', padding: '5px 14px', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              ★ {item.badge}
            </div>
          )}
          <button onClick={onClose} style={{
            position: 'absolute', top: '16px', right: '16px',
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'rgba(13,53,40,0.6)', border: '1px solid rgba(245,240,232,0.3)',
            color: '#fff', fontSize: '1rem', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(4px)',
          }}>✕</button>
        </div>

        <div style={{ padding: '24px 28px' }}>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '4px' }}>{item.tagline}</p>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.9rem', color: 'var(--cream)', marginBottom: '4px' }}>{item.name}</h2>
          <p style={{ fontSize: '0.78rem', color: 'rgba(245,240,232,0.45)', marginBottom: '12px' }}>{item.calories}</p>
          <p style={{ color: 'rgba(245,240,232,0.65)', fontSize: '0.9rem', lineHeight: 1.65, marginBottom: '24px' }}>{item.desc}</p>

          {/* Divider */}
          <div style={{ height: '1px', background: 'rgba(212,137,74,0.15)', marginBottom: '20px' }} />

          {/* Size */}
          {item.sizes && (
            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '10px' }}>Size</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                {item.sizes.map(s => (
                  <button key={s} onClick={() => setSize(s)} style={{
                    width: '54px', height: '54px', borderRadius: '50%',
                    border: `1.5px solid ${size === s ? 'var(--amber)' : 'rgba(245,240,232,0.2)'}`,
                    background: size === s ? 'var(--amber)' : 'transparent',
                    color: size === s ? '#fff' : 'rgba(245,240,232,0.7)',
                    fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: '0.85rem',
                    cursor: 'pointer', transition: 'all 0.2s',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {s}
                    {item.sizePrices[s] > 0 && <span style={{ fontSize: '0.5rem', opacity: 0.8 }}>+${item.sizePrices[s].toFixed(2)}</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Variety */}
          {item.varieties?.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '10px' }}>Style</p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {item.varieties.map(v => <button key={v} onClick={() => setVariety(v)} style={pillStyle(variety === v)}>{v}</button>)}
              </div>
            </div>
          )}

          {/* Flavor */}
          {item.flavors?.length > 1 && (
            <div style={{ marginBottom: '24px' }}>
              <p style={{ fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '10px' }}>Flavor</p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {item.flavors.map(f => <button key={f} onClick={() => setFlavor(f)} style={pillStyle(flavor === f, '#7B5EA7')}>{f}</button>)}
              </div>
            </div>
          )}

          <div style={{ height: '1px', background: 'rgba(212,137,74,0.15)', marginBottom: '20px' }} />

          {/* Qty + Add */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '999px', padding: '8px 16px', border: '1px solid rgba(212,137,74,0.2)' }}>
              <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ background: 'none', border: 'none', color: 'var(--amber)', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 700, lineHeight: 1 }}>−</button>
              <span style={{ color: 'var(--cream)', fontWeight: 700, minWidth: '24px', textAlign: 'center' }}>{qty}</span>
              <button onClick={() => setQty(qty + 1)} style={{ background: 'none', border: 'none', color: 'var(--amber)', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 700, lineHeight: 1 }}>+</button>
            </div>
            <button onClick={() => { addToCart(item, { size, variety, flavor }); onClose(); }} style={{
              flex: 1, padding: '15px', border: 'none', borderRadius: '12px',
              background: 'var(--amber)', color: '#fff',
              fontFamily: 'Playfair Display, serif', fontSize: '1.05rem',
              cursor: 'pointer', transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--amber-dark)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--amber)'}
            >
              Add to Order — <span style={{ opacity: 0.85 }}>${totalPrice.toFixed(2)}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
