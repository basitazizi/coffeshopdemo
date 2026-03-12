import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { supabase } from '../lib/supabase';

export default function Cart() {
  const { cart, cartOpen, setCartOpen, removeFromCart, updateQty, clearCart, subtotal, tax, total, itemCount } = useCart();
  const [step, setStep] = useState('cart');
  const [tableNum, setTableNum] = useState('');
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [orderNum, setOrderNum] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = async () => {
    if (!tableNum) return;
    setLoading(true);
    setError(null);

    const num = Math.floor(1000 + Math.random() * 9000);

    const { error: supabaseError } = await supabase.from('coffeshop').insert({
      order_num: num,
      table_num: tableNum,
      customer_name: name || null,
      notes: notes || null,
      items: cart,
      subtotal,
      tax,
      total,
      status: 'New Order',
    });

    setLoading(false);

    if (supabaseError) {
      setError('Failed to send order. Please try again.');
      console.error(supabaseError);
      return;
    }

    setOrderNum(num);
    clearCart();
    setStep('confirmed');
  };

  const reset = () => {
    setStep('cart');
    setTableNum('');
    setName('');
    setNotes('');
    setError(null);
    setCartOpen(false);
  };

  if (!cartOpen) return null;

  const inputStyle = (filled) => ({
    width: '100%', padding: '12px 16px',
    background: 'rgba(255,255,255,0.08)',
    border: `1.5px solid ${filled ? 'var(--amber)' : 'rgba(212,137,74,0.25)'}`,
    borderRadius: '10px', color: 'var(--white)',
    fontFamily: 'Lato, sans-serif', fontWeight: 400, fontSize: '0.95rem',
    outline: 'none', transition: 'border 0.2s',
  });

  return (
      <>
        <div onClick={() => setCartOpen(false)} style={{
          position: 'fixed', inset: 0, background: 'rgba(13,53,40,0.7)',
          zIndex: 300, backdropFilter: 'blur(4px)',
        }} />

        <div style={{
          position: 'fixed', top: 0, right: 0, bottom: 0, width: '440px',
          background: 'var(--teal)', zIndex: 400,
          display: 'flex', flexDirection: 'column',
          boxShadow: '-8px 0 48px rgba(0,0,0,0.4)',
          borderLeft: '1px solid rgba(212,137,74,0.2)',
        }}>
          {/* Header */}
          <div style={{
            padding: '24px 28px', borderBottom: '1px solid rgba(212,137,74,0.2)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            background: 'var(--teal-dark)',
          }}>
            <div>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', color: 'var(--cream)' }}>
                {step === 'cart' ? 'Your Order' : step === 'checkout' ? 'Checkout' : 'Order Confirmed'}
              </h2>
              {step === 'cart' && itemCount > 0 && (
                  <p style={{ color: 'var(--amber)', fontSize: '0.8rem', marginTop: '2px' }}>{itemCount} item{itemCount !== 1 ? 's' : ''}</p>
              )}
            </div>
            <button onClick={() => setCartOpen(false)} style={{
              width: '36px', height: '36px', borderRadius: '50%',
              border: '1.5px solid rgba(212,137,74,0.4)', background: 'transparent',
              color: 'var(--cream)', fontSize: '1rem', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>✕</button>
          </div>

          {/* CART STEP */}
          {step === 'cart' && (
              <>
                <div style={{ flex: 1, overflowY: 'auto', padding: '16px 28px' }}>
                  {cart.length === 0 ? (
                      <div style={{ textAlign: 'center', padding: '70px 0', color: 'rgba(245,240,232,0.4)' }}>
                        <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>☕</div>
                        <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', color: 'rgba(245,240,232,0.5)' }}>Your cup is empty</p>
                        <p style={{ fontSize: '0.85rem', marginTop: '8px' }}>Add something from the menu</p>
                      </div>
                  ) : cart.map(item => (
                      <div key={item.cartId} style={{
                        display: 'flex', gap: '14px', padding: '16px 0',
                        borderBottom: '1px solid rgba(212,137,74,0.12)',
                      }}>
                        <img src={item.img} alt={item.name} style={{
                          width: '68px', height: '68px', borderRadius: '12px',
                          objectFit: 'cover', flexShrink: 0,
                          border: '2px solid rgba(212,137,74,0.3)',
                        }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem', color: 'var(--cream)', marginBottom: '3px' }}>{item.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--amber)', marginBottom: '10px' }}>
                            {[item.size, item.variety, item.flavor !== 'None' ? item.flavor : null].filter(Boolean).join(' · ')}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <button onClick={() => updateQty(item.cartId, -1)} style={{
                                width: '26px', height: '26px', borderRadius: '50%',
                                border: '1.5px solid var(--amber)', background: 'transparent',
                                color: 'var(--amber)', cursor: 'pointer', fontSize: '0.9rem',
                              }}>−</button>
                              <span style={{ color: 'var(--cream)', fontWeight: 700, minWidth: '18px', textAlign: 'center' }}>{item.qty}</span>
                              <button onClick={() => updateQty(item.cartId, 1)} style={{
                                width: '26px', height: '26px', borderRadius: '50%',
                                border: 'none', background: 'var(--amber)',
                                color: '#fff', cursor: 'pointer', fontSize: '0.9rem',
                              }}>+</button>
                            </div>
                            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', color: 'var(--amber)' }}>
                        ${((item.basePrice + item.sizeExtra) * item.qty).toFixed(2)}
                      </span>
                          </div>
                        </div>
                        <button onClick={() => removeFromCart(item.cartId)} style={{
                          background: 'none', border: 'none', color: 'rgba(245,240,232,0.3)',
                          cursor: 'pointer', fontSize: '1rem', padding: '4px', flexShrink: 0,
                        }}>✕</button>
                      </div>
                  ))}
                </div>

                {cart.length > 0 && (
                    <div style={{ padding: '20px 28px', borderTop: '1px solid rgba(212,137,74,0.2)', background: 'var(--teal-dark)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: 'rgba(245,240,232,0.6)', fontSize: '0.85rem' }}>
                        <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', color: 'rgba(245,240,232,0.6)', fontSize: '0.85rem' }}>
                        <span>Tax (8.75%)</span><span>${tax.toFixed(2)}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                        <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', color: 'var(--cream)' }}>Total</span>
                        <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', color: 'var(--amber)' }}>${total.toFixed(2)}</span>
                      </div>
                      <button onClick={() => setStep('checkout')} style={{
                        width: '100%', padding: '15px', border: 'none', borderRadius: '10px',
                        background: 'var(--amber)', color: '#fff',
                        fontFamily: 'Playfair Display, serif', fontSize: '1.05rem',
                        cursor: 'pointer', letterSpacing: '0.04em', transition: 'all 0.2s',
                      }}
                              onMouseEnter={e => e.currentTarget.style.background = 'var(--amber-dark)'}
                              onMouseLeave={e => e.currentTarget.style.background = 'var(--amber)'}
                      >Proceed to Checkout →</button>
                    </div>
                )}
              </>
          )}

          {/* CHECKOUT STEP */}
          {step === 'checkout' && (
              <>
                <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>
                  {/* Mini summary */}
                  <div style={{ background: 'rgba(0,0,0,0.15)', borderRadius: '12px', padding: '16px', marginBottom: '24px', border: '1px solid rgba(212,137,74,0.15)' }}>
                    <p style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '10px' }}>Order Summary</p>
                    {cart.map(item => (
                        <div key={item.cartId} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.87rem' }}>
                          <span style={{ color: 'var(--cream)' }}>{item.qty}× {item.name}{item.size ? ` (${item.size})` : ''}</span>
                          <span style={{ color: 'var(--amber)' }}>${((item.basePrice + item.sizeExtra) * item.qty).toFixed(2)}</span>
                        </div>
                    ))}
                    <div style={{ borderTop: '1px solid rgba(212,137,74,0.15)', marginTop: '10px', paddingTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontFamily: 'Playfair Display, serif', color: 'var(--cream)' }}>Total</span>
                      <span style={{ fontFamily: 'Playfair Display, serif', color: 'var(--amber)' }}>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '8px' }}>Table Number *</label>
                    <input type="text" placeholder="e.g. Table 4" value={tableNum} onChange={e => setTableNum(e.target.value)} style={inputStyle(tableNum)} />
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '8px' }}>Your Name (optional)</label>
                    <input type="text" placeholder="e.g. Sarah" value={name} onChange={e => setName(e.target.value)} style={inputStyle(name)} />
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '8px' }}>Special Notes</label>
                    <textarea placeholder="Allergies, preferences..." value={notes} onChange={e => setNotes(e.target.value)} rows={3} style={{ ...inputStyle(notes), resize: 'none' }} />
                  </div>

                  {/* Error message */}
                  {error && (
                      <div style={{
                        padding: '12px 16px', borderRadius: '10px', marginBottom: '16px',
                        background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.3)',
                        fontSize: '0.85rem', color: '#ff8080',
                      }}>
                        ⚠️ {error}
                      </div>
                  )}

                  <div style={{ padding: '14px', background: 'rgba(212,137,74,0.1)', borderRadius: '10px', fontSize: '0.82rem', color: 'rgba(245,240,232,0.6)', lineHeight: 1.6 }}>
                    💳 Payment is collected at the counter. Your order goes straight to our kitchen!
                  </div>
                </div>

                <div style={{ padding: '20px 28px', borderTop: '1px solid rgba(212,137,74,0.2)', display: 'flex', gap: '12px', background: 'var(--teal-dark)' }}>
                  <button onClick={() => setStep('cart')} disabled={loading} style={{
                    padding: '14px 20px', border: '1.5px solid rgba(212,137,74,0.3)', borderRadius: '10px',
                    background: 'transparent', color: 'var(--cream)', cursor: 'pointer', fontSize: '0.9rem',
                    opacity: loading ? 0.5 : 1,
                  }}>← Back</button>

                  <button onClick={submit} disabled={!tableNum || loading} style={{
                    flex: 1, padding: '14px', border: 'none', borderRadius: '10px',
                    background: tableNum && !loading ? 'var(--amber)' : 'rgba(212,137,74,0.2)',
                    color: tableNum && !loading ? '#fff' : 'rgba(245,240,232,0.3)',
                    fontFamily: 'Playfair Display, serif', fontSize: '1.05rem',
                    cursor: tableNum && !loading ? 'pointer' : 'not-allowed', transition: 'all 0.2s',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  }}>
                    {loading ? (
                        <>
                    <span style={{
                      width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)',
                      borderTopColor: '#fff', borderRadius: '50%',
                      display: 'inline-block', animation: 'spin 0.8s linear infinite',
                    }} />
                          Sending...
                        </>
                    ) : 'Send to Kitchen ☕'}
                  </button>
                </div>
              </>
          )}

          {/* CONFIRMED STEP */}
          {step === 'confirmed' && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 28px', textAlign: 'center' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(212,137,74,0.15)', border: '2px solid var(--amber)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', marginBottom: '24px' }}>✓</div>
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', color: 'var(--cream)', marginBottom: '6px' }}>Order Received!</h2>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '3.5rem', color: 'var(--amber)', marginBottom: '8px' }}>#{orderNum}</div>
                <p style={{ color: 'rgba(245,240,232,0.6)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '32px', maxWidth: '280px' }}>
                  Your order has been sent to our kitchen. Please pay at the counter when your order is ready.
                </p>
                <div style={{ background: 'rgba(212,137,74,0.1)', border: '1px solid rgba(212,137,74,0.3)', borderRadius: '12px', padding: '16px 32px', marginBottom: '28px' }}>
                  <div style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '4px' }}>Table</div>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', color: 'var(--cream)' }}>{tableNum}</div>
                </div>
                <button onClick={reset} style={{
                  width: '100%', padding: '15px', border: '1.5px solid var(--amber)',
                  borderRadius: '10px', background: 'transparent', color: 'var(--amber)',
                  fontFamily: 'Playfair Display, serif', fontSize: '1.05rem', cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'var(--amber)'; e.currentTarget.style.color = '#fff'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--amber)'; }}
                >Order More →</button>
              </div>
          )}
        </div>

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </>
  );
}
