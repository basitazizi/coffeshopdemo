import { useState } from 'react';
import { categories, menuItems } from '../data/menuData';
import ItemModal from '../components/ItemModal';

const css = `
  .item-card { transition: transform 0.25s, box-shadow 0.25s; }
  .item-card:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(0,0,0,0.35) !important; }
  .item-card:hover .item-img { transform: scale(1.06); }
  .item-img { transition: transform 0.4s ease; }
  .cat-tab { transition: all 0.2s; }
  .cat-tab:hover { color: var(--amber) !important; border-color: var(--amber) !important; }
  .add-btn:hover { background: var(--amber) !important; color: #fff !important; border-color: var(--amber) !important; }

  @media (max-width: 700px) {
    .menu-hero-pad { padding: 44px 16px 36px !important; }
    .menu-tabs { justify-content: flex-start !important; padding: 0 8px !important; overflow-x: auto !important; }
    .menu-tabs::-webkit-scrollbar { display: none; }
    .cat-tab { padding: 14px 16px !important; font-size: 0.72rem !important; letter-spacing: 0.1em !important; }
    .cat-thumb { width: 40px !important; height: 40px !important; }
    .menu-header { padding: 28px 16px 22px !important; flex-wrap: wrap !important; }
    .menu-grid { padding: 0 16px 56px !important; grid-template-columns: 1fr !important; max-width: 100% !important; }
    .menu-bottom-line { margin: 0 16px !important; }
  }

  @media (min-width: 701px) and (max-width: 1024px) {
    .menu-hero-pad { padding: 56px 32px 46px !important; }
    .menu-tabs { padding: 0 24px !important; }
    .cat-tab { padding: 18px 26px !important; }
    .menu-header { padding: 40px 32px 28px !important; }
    .menu-grid { padding: 0 32px 72px !important; grid-template-columns: repeat(2, 1fr) !important; max-width: 1200px !important; }
    .menu-bottom-line { margin: 0 32px !important; }
  }
`;

const catImages = {
  hot:    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&h=200&fit=crop&q=80',
  cold:   'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=200&h=200&fit=crop&q=80',
  sweets: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=200&h=200&fit=crop&q=80',
};

export default function MenuPage() {
  const [activeCat, setActiveCat] = useState('hot');
  const [selectedItem, setSelectedItem] = useState(null);
  const items = menuItems[activeCat] || [];
  const activeCatData = categories.find(c => c.id === activeCat);

  return (
    <>
      <style>{css}</style>

      {/* Hero */}
      <div style={{
        background: 'var(--teal)', paddingTop: '68px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative horizontal lines */}
        <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(212,137,74,0.4), transparent)' }} />
        <div className="menu-hero-pad" style={{ padding: '64px clamp(16px, 6vw, 80px) 52px', textAlign: 'center', position: 'relative' }}>
          <p style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300, fontSize: '0.78rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '12px' }}>
            Fresh Made Daily
          </p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.8rem,6vw,4.5rem)', color: 'var(--cream)', lineHeight: 1 }}>
            Our <em>Menu</em>
          </h1>
          <p style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300, color: 'rgba(245,240,232,0.55)', maxWidth: '440px', margin: '16px auto 0', lineHeight: 1.75 }}>
            Every item crafted to order. Choose your category, pick your favourite, and customise it just the way you like.
          </p>
        </div>
        <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(212,137,74,0.4), transparent)' }} />
      </div>

      {/* Category Tabs */}
      <div className="menu-tabs" style={{
        position: 'sticky', top: '68px', zIndex: 100,
        background: 'var(--teal-dark)',
        borderBottom: '1px solid rgba(212,137,74,0.2)',
        display: 'flex', justifyContent: 'center', gap: '0',
        padding: '0 clamp(12px, 6vw, 80px)',
      }}>
        {categories.map(cat => (
          <button key={cat.id} className="cat-tab" onClick={() => setActiveCat(cat.id)} style={{
            padding: '20px 48px',
            border: 'none',
            borderBottom: `3px solid ${activeCat === cat.id ? 'var(--amber)' : 'transparent'}`,
            background: 'transparent',
            fontFamily: 'Lato, sans-serif', fontWeight: 700,
            fontSize: '0.82rem', letterSpacing: '0.14em', textTransform: 'uppercase',
            color: activeCat === cat.id ? 'var(--amber)' : 'rgba(245,240,232,0.4)',
            cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
          }}>
            {/* Small thumbnail */}
            <div className="cat-thumb" style={{
              width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden',
              border: `2px solid ${activeCat === cat.id ? 'var(--amber)' : 'rgba(212,137,74,0.2)'}`,
              transition: 'border-color 0.2s',
            }}>
              <img src={catImages[cat.id]} alt={cat.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Section Header */}
      <div className="menu-header" style={{ background: 'var(--teal)', padding: '48px clamp(16px, 6vw, 80px) 32px', display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ width: '56px', height: '56px', borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(212,137,74,0.5)', flexShrink: 0 }}>
          <img src={catImages[activeCat]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div>
          <p style={{ fontFamily: 'Lato, sans-serif', fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '2px' }}>Explore</p>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: 'var(--cream)' }}>{activeCatData?.label}</h2>
        </div>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, rgba(212,137,74,0.3), transparent)' }} />
        <p style={{ fontFamily: 'Lato, sans-serif', fontSize: '0.78rem', color: 'rgba(245,240,232,0.35)' }}>{items.length} items</p>
      </div>

      {/* Items Grid — 3 per row */}
      <div className="menu-grid" style={{
        background: 'var(--teal)',
        padding: '0 clamp(16px, 6vw, 80px) 80px',
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px',
        maxWidth: '1200px', margin: '0 auto',
      }}>
        {items.map(item => (
          <div key={item.id} className="item-card" onClick={() => setSelectedItem(item)} style={{
            background: 'rgba(13,53,40,0.5)', borderRadius: '18px',
            overflow: 'hidden', cursor: 'pointer',
            border: '1px solid rgba(212,137,74,0.15)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          }}>
            {/* Image */}
            <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
              <img className="item-img" src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              {/* Gradient overlay */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,53,40,0.6) 0%, transparent 50%)' }} />
              {item.badge && (
                <div style={{
                  position: 'absolute', top: '14px', right: '14px',
                  background: 'var(--amber)', color: '#fff', borderRadius: '999px',
                  padding: '4px 14px', fontSize: '0.68rem', fontWeight: 700,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                }}>★ {item.badge}</div>
              )}
            </div>

            {/* Content */}
            <div style={{ padding: '20px 20px 22px' }}>
              <p style={{ fontFamily: 'Lato, sans-serif', fontSize: '0.7rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '4px' }}>{item.tagline}</p>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.25rem', color: 'var(--cream)', marginBottom: '6px' }}>{item.name}</h3>
              <p style={{ fontFamily: 'Lato, sans-serif', fontSize: '0.83rem', color: 'rgba(245,240,232,0.5)', lineHeight: 1.6, marginBottom: '18px', fontWeight: 300 }}>
                {item.desc.length > 80 ? item.desc.slice(0, 80) + '…' : item.desc}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', color: 'var(--amber)' }}>
                  from ${item.basePrice.toFixed(2)}
                </span>
                <button className="add-btn" style={{
                  padding: '8px 20px',
                  border: '1.5px solid rgba(212,137,74,0.5)',
                  borderRadius: '999px', background: 'transparent',
                  color: 'rgba(245,240,232,0.7)',
                  fontFamily: 'Lato, sans-serif', fontWeight: 700,
                  fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}>+ Add</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom decorative line */}
      <div className="menu-bottom-line" style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(212,137,74,0.3), transparent)', margin: '0 clamp(16px, 6vw, 80px)' }} />

      {selectedItem && <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </>
  );
}
