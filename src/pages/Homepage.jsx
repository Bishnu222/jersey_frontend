import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthProvider';
import heroJersey from '../assets/hero-jersey.png';
import springSale from '../assets/spring-sale.png';
import homeImg from '../assets/home.png';
import logo from '../assets/logo.jpg';

export default function Home() {
  const navigate = useNavigate();
  const { loading, user } = useContext(AuthContext);
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
                onClick={() => user ? navigate('/products') : navigate('/login')}
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
        {/* Removed Shop Now button overlay */}
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-green-900 via-black to-green-800 text-gray-200 mt-auto pt-8 pb-4 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          {/* Logo and Brand */}
          <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
            <img src={logo} alt="JerseyShop Logo" className="w-16 h-16 rounded-full shadow-lg mb-2 border-2 border-green-500" />
            <span className="text-2xl font-extrabold tracking-wide text-green-400">JerseyShop</span>
            <span className="text-xs text-gray-400 mt-1">For true football fans ⚽</span>
          </div>
          {/* Navigation */}
          <nav className="flex flex-col items-center gap-2 text-lg font-medium">
            <a href="/" className="hover:text-green-400 transition">Home</a>
            <a href="/about" className="hover:text-green-400 transition">About</a>
          </nav>
          {/* Social Media */}
          <div className="flex flex-col items-center gap-2">
            <span className="font-semibold mb-1">Follow us</span>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-pink-400">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7"><path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.056 1.97.24 2.43.41.59.22 1.01.48 1.45.92.44.44.7.86.92 1.45.17.46.354 1.26.41 2.43.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.41 2.43-.22.59-.48 1.01-.92 1.45-.44.44-.7-.86-.92-1.45-.17-.46-.354-1.26-.41-2.43C2.212 15.784 2.2 15.4 2.2 12s.012-3.584.07-4.85c.056-1.17.24-1.97.41-2.43.22-.59.48-1.01.92-1.45.44-.44.86-.7 1.45-.92.46-.17 1.26-.354 2.43-.41C8.416 2.212 8.8 2.2 12 2.2zm0-2.2C8.736 0 8.332.013 7.052.072 5.77.13 4.73.31 3.89.6c-.84.29-1.54.68-2.23 1.37C.68 2.66.29 3.36 0 4.2c-.29.84-.47 1.88-.53 3.16C-.013 8.332 0 8.736 0 12c0 3.264.013 3.668.072 4.948.058 1.282.24 2.322.53 3.162.29.84.68 1.54 1.37 2.23.69.69 1.39 1.08 2.23 1.37.84.29 1.88.47 3.16.53C8.332 23.987 8.736 24 12 24s3.668-.013 4.948-.072c1.282-.058 2.322-.24 3.162-.53.84-.29 1.54-.68 2.23-1.37.69-.69 1.08-1.39 1.37-2.23.29-.84.47-1.88.53-3.16.059-1.28.072-1.684.072-4.948 0-3.264-.013-3.668-.072-4.948-.058-1.282-.24-2.322-.53-3.162-.29-.84-.68-1.54-1.37-2.23-.69-.69-1.39-1.08-2.23-1.37-.84-.29-1.88-.47-3.16-.53C15.668.013 15.264 0 12 0z"/><path d="M12 5.838A6.162 6.162 0 1 0 12 18.162 6.162 6.162 0 1 0 12 5.838zm0 10.162A4 4 0 1 1 12 8a4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-blue-400">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24H12.82v-9.294H9.692V11.01h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.312h3.587l-.467 3.696h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-blue-300">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7"><path d="M24 4.557a9.83 9.83 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.916 4.916 0 0 0-8.38 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.856 2.01-.857 3.17 0 2.188 1.115 4.117 2.823 5.254a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.057 0 14.009-7.496 14.009-13.986 0-.21-.005-.423-.015-.633A9.936 9.936 0 0 0 24 4.557z"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-green-800 mt-8 pt-4 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} JerseyShop. All rights reserved.
        </div>
      </footer>
    </div>
  );
}