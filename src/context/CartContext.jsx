import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (item, options) => {
    const sizeExtra = item.sizePrices?.[options.size] || 0;
    const cartItem = {
      cartId: Date.now() + Math.random(),
      id: item.id,
      name: item.name,
      img: item.img,
      basePrice: item.basePrice,
      size: options.size || null,
      sizeExtra,
      variety: options.variety || null,
      flavor: options.flavor || 'None',
      qty: 1,
    };
    setCart(prev => [...prev, cartItem]);
    setCartOpen(true);
  };

  const removeFromCart = (cartId) =>
    setCart(prev => prev.filter(i => i.cartId !== cartId));

  const updateQty = (cartId, delta) =>
    setCart(prev =>
      prev.map(i => {
        if (i.cartId !== cartId) return i;
        const newQty = i.qty + delta;
        return newQty <= 0 ? null : { ...i, qty: newQty };
      }).filter(Boolean)
    );

  const clearCart = () => setCart([]);

  const subtotal = cart.reduce((s, i) => s + (i.basePrice + i.sizeExtra) * i.qty, 0);
  const tax      = subtotal * 0.0875;
  const total    = subtotal + tax;
  const itemCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider value={{
      cart, cartOpen, setCartOpen,
      addToCart, removeFromCart, updateQty, clearCart,
      subtotal, tax, total, itemCount,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
