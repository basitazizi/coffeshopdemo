import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import Home from './pages/Home';
import MenuPage from './pages/MenuPage';
import Contact from './pages/Contact';
import KitchenDisplay from './pages/KitchenDisplay';
import './index.css';

export default function App() {
  const [page, setPage] = useState('home');

  const navigate = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Expose kitchen navigation to footer link
  window._navigateKitchen = () => navigate('kitchen');

  if (page === 'kitchen') {
    return <KitchenDisplay onBack={() => navigate('home')} />;
  }

  return (
    <CartProvider>
      <Navbar page={page} onNavigate={navigate} />
      <Cart />
      <div style={{ background: 'var(--teal)', minHeight: '100vh' }}>
        {page === 'home'    && <Home    onNavigate={navigate} />}
        {page === 'menu'    && <MenuPage />}
        {page === 'contact' && <Contact />}
      </div>
    </CartProvider>
  );
}
