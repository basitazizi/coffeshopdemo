import { useCart } from '../context/CartContext';

export default function Navbar({ page, onNavigate }) {
  const { itemCount, setCartOpen } = useCart();

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      background: 'var(--teal-dark)',
      borderBottom: '1px solid rgba(212,137,74,0.3)',
    }}>
      {/* Top decorative line */}
      <div style={{ height: '3px', background: 'linear-gradient(to right, var(--teal-dark), var(--amber), var(--teal-dark))' }} />

      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 60px', height: '68px', maxWidth: '1400px', margin: '0 auto',
      }}>
        {/* Social icons left */}
        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          {['f', 'in', 'w'].map((s, i) => (
            <div key={i} style={{
              width: '32px', height: '32px', borderRadius: '50%',
              border: '1.5px solid rgba(212,137,74,0.5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'var(--amber)',
              fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: '0.7rem',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--amber)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--amber)'; }}
            >{s}</div>
          ))}
        </div>

        {/* Nav links center */}
        <div style={{ display: 'flex', gap: '48px', alignItems: 'center' }}>
          {['home', 'menu', 'contact'].map(l => (
            <button key={l} onClick={() => onNavigate(l)} style={{
              background: 'none', border: 'none',
              fontFamily: 'Lato, sans-serif', fontWeight: 700,
              fontSize: '0.88rem', letterSpacing: '0.12em',
              textTransform: 'capitalize',
              color: page === l ? 'var(--amber)' : 'var(--white)',
              cursor: 'pointer', padding: '4px 0',
              borderBottom: page === l ? '2px solid var(--amber)' : '2px solid transparent',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--amber)'}
              onMouseLeave={e => e.currentTarget.style.color = page === l ? 'var(--amber)' : 'var(--white)'}
            >
              {l === 'home' ? 'Home' : l === 'menu' ? 'Menu' : 'About us'}
            </button>
          ))}
        </div>

        {/* Cart right */}
        <button onClick={() => setCartOpen(true)} style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '10px 24px', border: '1.5px solid var(--amber)',
          borderRadius: '999px', background: 'transparent',
          color: 'var(--white)', cursor: 'pointer',
          fontFamily: 'Lato, sans-serif', fontWeight: 700,
          fontSize: '0.82rem', letterSpacing: '0.08em',
          transition: 'all 0.2s',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--amber)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          Order
          {itemCount > 0 && (
            <span style={{
              background: 'var(--amber)', color: '#fff',
              borderRadius: '999px', padding: '1px 8px',
              fontSize: '0.75rem', fontWeight: 700,
            }}>{itemCount}</span>
          )}
        </button>
      </div>
    </nav>
  );
}
