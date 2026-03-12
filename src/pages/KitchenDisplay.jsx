import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const STATUS = {
  'New Order': { bg: 'rgba(212,137,74,0.12)', border: '#D4894A', dot: '#D4894A', label: 'New' },
  'In Progress': { bg: 'rgba(245,197,55,0.08)', border: '#F5C537', dot: '#F5C537', label: 'Cooking' },
  'Ready': { bg: 'rgba(52,199,89,0.08)', border: '#34C759', dot: '#34C759', label: 'Ready' },
};

export default function KitchenDisplay({ onBack }) {
  const [orders, setOrders] = useState([]);

  const load = async () => {
    const { data, error } = await supabase
      .from('coffeshop')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to load orders from Supabase:', error);
      return;
    }

    setOrders(data || []);
  };

  useEffect(() => {
    load();
    const channel = supabase
      .channel('coffeshop')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'coffeshop' }, () => load())
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setStatus = async (id, status) => {
    const { error } = await supabase.from('coffeshop').update({ status }).eq('id', id);
    if (error) console.error('Failed to update order status:', error);
    load();
  };

  const clearReady = async () => {
    const { error } = await supabase.from('coffeshop').delete().eq('status', 'Ready');
    if (error) console.error('Failed to clear ready orders:', error);
    load();
  };

  const formatTime = (iso) => {
    if (!iso) return '';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return '';
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatMoney = (value) => {
    const n = typeof value === 'number' ? value : Number(value || 0);
    return n.toFixed(2);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--teal-dark)', fontFamily: 'Lato, sans-serif' }}>
      {/* Header */}
      <div style={{
        background: '#0a2a1e',
        borderBottom: '2px solid rgba(212,137,74,0.3)',
        padding: '20px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', color: 'var(--amber)' }}>
            Coffee Expresso - <span style={{ fontSize: '1rem', color: 'rgba(245,240,232,0.4)', fontFamily: 'Lato, sans-serif', fontWeight: 300 }}>Kitchen Display</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: 'rgba(245,240,232,0.3)', marginTop: '2px' }}>
            Live updates - {orders.length} active order{orders.length !== 1 ? 's' : ''}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={load} style={{ padding: '10px 20px', background: 'transparent', color: 'rgba(245,240,232,0.4)', border: '1px solid rgba(245,240,232,0.15)', borderRadius: '8px', cursor: 'pointer', fontSize: '0.82rem', fontFamily: 'Lato, sans-serif' }}>
            Refresh
          </button>
          <button onClick={clearReady} style={{ padding: '10px 20px', background: 'rgba(52,199,89,0.1)', color: '#34C759', border: '1px solid rgba(52,199,89,0.3)', borderRadius: '8px', cursor: 'pointer', fontSize: '0.82rem', fontFamily: 'Lato, sans-serif', fontWeight: 700 }}>
            Clear Ready
          </button>
          <button onClick={onBack} style={{ padding: '10px 20px', background: 'rgba(212,137,74,0.1)', color: 'var(--amber)', border: '1px solid rgba(212,137,74,0.3)', borderRadius: '8px', cursor: 'pointer', fontSize: '0.82rem', fontFamily: 'Lato, sans-serif' }}>
            Back to Site
          </button>
        </div>
      </div>

      {/* Status legend */}
      <div style={{ padding: '16px 48px', borderBottom: '1px solid rgba(212,137,74,0.1)', display: 'flex', gap: '24px' }}>
        {Object.entries(STATUS).map(([key, val]) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: val.dot }} />
            <span style={{ fontSize: '0.78rem', color: 'rgba(245,240,232,0.4)', fontWeight: 700 }}>{key}</span>
          </div>
        ))}
      </div>

      {/* Orders */}
      <div style={{ padding: '32px 48px' }}>
        {orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '100px 0', color: 'rgba(245,240,232,0.2)' }}>
            <div style={{ fontSize: '4rem', marginBottom: '16px' }}>Coffee</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: 'rgba(245,240,232,0.2)', marginBottom: '8px' }}>No orders yet</h2>
            <p style={{ fontSize: '0.88rem' }}>Customer orders will appear here automatically</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
            {orders.map((order) => {
              const s = STATUS[order.status] || STATUS['New Order'];
              const items = Array.isArray(order.items) ? order.items : [];
              const time = formatTime(order.created_at);
              const headerLine = [
                order.table_num,
                order.customer_name ? String(order.customer_name) : null,
                time || null,
              ].filter(Boolean).join(' - ');

              return (
                <div key={order.id ?? order.order_num} style={{
                  background: '#0a2a1e', borderRadius: '16px',
                  border: `1.5px solid ${s.border}`,
                  overflow: 'hidden',
                  boxShadow: `0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px ${s.border}20`,
                }}>
                  {/* Card header */}
                  <div style={{ background: s.bg, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${s.border}30` }}>
                    <div>
                      <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.7rem', color: 'var(--cream)' }}>#{order.order_num}</div>
                      <div style={{ fontSize: '0.75rem', color: 'rgba(245,240,232,0.45)', marginTop: '2px', fontWeight: 300 }}>
                        {headerLine}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(10,42,30,0.6)', borderRadius: '999px', padding: '6px 14px', border: `1px solid ${s.border}50` }}>
                      <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: s.dot, animation: order.status === 'New Order' ? 'pulse 1.5s infinite' : 'none' }} />
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: s.dot, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{order.status}</span>
                    </div>
                  </div>

                  {/* Items */}
                  <div style={{ padding: '16px 20px' }}>
                    {items.map((item, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < items.length - 1 ? '1px solid rgba(212,137,74,0.08)' : 'none' }}>
                        <div>
                          <div style={{ fontSize: '0.95rem', color: 'var(--cream)', fontWeight: 700 }}>{item.qty}x {item.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'rgba(245,240,232,0.35)', marginTop: '2px', fontWeight: 300 }}>
                            {[item.size, item.variety, item.flavor !== 'None' ? item.flavor : null].filter(Boolean).join(' - ')}
                          </div>
                        </div>
                        <div style={{ fontFamily: 'Playfair Display, serif', color: 'var(--amber)', fontSize: '0.95rem' }}>
                          ${((item.basePrice + item.sizeExtra) * item.qty).toFixed(2)}
                        </div>
                      </div>
                    ))}

                    {order.notes && (
                      <div style={{ marginTop: '12px', padding: '10px 14px', background: 'rgba(212,137,74,0.08)', borderRadius: '8px', border: '1px solid rgba(212,137,74,0.15)' }}>
                        <div style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '4px', fontWeight: 700 }}>Notes</div>
                        <div style={{ fontSize: '0.85rem', color: 'rgba(245,240,232,0.55)', fontWeight: 300 }}>{order.notes}</div>
                      </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '14px', paddingTop: '14px', borderTop: '1px solid rgba(212,137,74,0.1)' }}>
                      <span style={{ fontFamily: 'Playfair Display, serif', color: 'rgba(245,240,232,0.4)' }}>Total</span>
                      <span style={{ fontFamily: 'Playfair Display, serif', color: 'var(--amber)', fontSize: '1.1rem' }}>${formatMoney(order.total)}</span>
                    </div>
                  </div>

                  {/* Status buttons */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '8px', padding: '0 20px 18px' }}>
                    {Object.entries(STATUS).map(([key, val]) => (
                      <button key={key} onClick={() => setStatus(order.id, key)} style={{
                        padding: '9px 4px', border: 'none', borderRadius: '8px',
                        background: order.status === key ? val.border : 'rgba(255,255,255,0.04)',
                        color: order.status === key ? '#fff' : 'rgba(245,240,232,0.3)',
                        fontFamily: 'Lato, sans-serif', fontWeight: 700,
                        fontSize: '0.72rem', cursor: 'pointer', transition: 'all 0.2s',
                        letterSpacing: '0.04em',
                      }}>{val.label}</button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
    </div>
  );
}
