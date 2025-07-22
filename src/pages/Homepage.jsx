import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthProvider';
import heroJersey from '../assets/hero-jersey.png';
import springSale from '../assets/spring-sale.png';
import homeImg from '../assets/home.png';

export default function Home() {
  const navigate = useNavigate();
  const { loading } = useContext(AuthContext);
  const [showHome, setShowHome] = useState(false);

  if (loading) {
    return <div className="text-center text-white text-2xl py-20">Loading...</div>;
  }

  // Dot navigation handler
  const handleDotClick = (idx) => setShowHome(idx === 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-700 via-green-900 to-black flex flex-col">
      {/* Hero Section with Dot Navigation */}
      <section className="relative w-full flex flex-col items-center justify-center overflow-hidden" style={{ minHeight: '600px', background: 'white' }}>
        <div className="w-full h-[600px] flex items-center justify-center relative">
          <img
            src={showHome ? homeImg : heroJersey}
            alt={showHome ? 'Home Image' : 'Classic Jersey Hero'}
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center' }}
          />
          {/* Overlay text and button (only on first image) */}
          {!showHome && (
            <div className="absolute left-8 bottom-8 z-10 flex flex-col items-start">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2 drop-shadow-lg">BEST OF CLASSIC.<br />ULTIMATE GRAILS.</h2>
              <button
                onClick={() => navigate('/products')}
                className="bg-white/80 hover:bg-green-700 text-green-900 hover:text-white font-bold px-6 py-2 rounded shadow-lg text-lg transition"
              >
                SHOP NOW →
              </button>
            </div>
          )}
        </div>
        {/* Dot Navigation */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-20">
          {[0, 1].map((idx) => (
            <button
              key={idx}
              onClick={() => handleDotClick(idx)}
              className={`w-5 h-5 rounded-full border-2 ${showHome === (idx === 1) ? 'bg-green-700 border-green-700' : 'bg-white border-gray-400'} transition`}
              aria-label={`Show ${idx === 0 ? 'Jersey' : 'Home'} Image`}
            />
          ))}
        </div>
      </section>

      {/* Sale Banner Section with Spring Sale Image */}
      <section className="relative flex flex-col items-center justify-center py-10 bg-white">
        <img
          src={springSale}
          alt="Spring Sale Banner"
          className="w-full h-[600px] object-cover"
        />
        {/* Overlay Shop Now button */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
          <button
            onClick={() => navigate('/products')}
            className="bg-green-700 hover:bg-green-900 text-white font-bold px-10 py-4 rounded-full shadow-lg text-2xl transition mt-8"
          >
            SHOP NOW
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/80 text-gray-300 text-center py-4 mt-auto">
        <span>&copy; {new Date().getFullYear()} JerseyShop. All rights reserved. | Made for football fans ⚽</span>
      </footer>
    </div>
  );
}