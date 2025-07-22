import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Info, Home as HomeIcon, Shirt } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-700 via-green-900 to-black flex flex-col">
      {/* Header/Nav */}
      <nav className="flex items-center justify-between px-8 py-4 bg-black/80 shadow-lg z-10">
        <div className="flex items-center gap-3">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6e/Football_%28soccer_ball%29.svg" alt="Football Logo" className="w-10 h-10" />
          <span className="text-2xl font-bold text-white tracking-wider">JerseyShop</span>
        </div>
        <ul className="flex gap-8 text-lg font-semibold">
          <li><Link to="/" className="flex items-center gap-1 text-white hover:text-yellow-400 transition"><HomeIcon size={20}/> Home</Link></li>
          <li><Link to="/products" className="flex items-center gap-1 text-white hover:text-yellow-400 transition"><Shirt size={20}/> Products</Link></li>
          <li><Link to="/normal/order" className="flex items-center gap-1 text-white hover:text-yellow-400 transition"><ShoppingCart size={20}/> Cart</Link></li>
          <li><Link to="/normal/dashboard" className="flex items-center gap-1 text-white hover:text-yellow-400 transition"><User size={20}/> Profile</Link></li>
          <li><Link to="/about" className="flex items-center gap-1 text-white hover:text-yellow-400 transition"><Info size={20}/> About Us</Link></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col md:flex-row items-center justify-center gap-12 px-8 py-16">
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg">
            Welcome to <span className="text-yellow-400">JerseyShop</span>
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Your one-stop shop for authentic football jerseys! Explore the latest kits, legendary classics, and exclusive deals. Gear up and show your passion for the beautiful game.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <button
              onClick={() => navigate('/products')}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-3 rounded-full shadow-lg text-lg transition"
            >
              Shop Jerseys
            </button>
            <button
              onClick={() => navigate('/about')}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3 rounded-full border border-white/30 text-lg transition"
            >
              Learn More
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center gap-6">
          <img
            src="https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg?auto=compress&w=600&q=80"
            alt="Football Jerseys"
            className="rounded-2xl shadow-2xl w-80 h-80 object-cover border-4 border-yellow-400"
          />
          <div className="flex gap-4 mt-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/8/8c/2018_FIFA_World_Cup_Russia_logo.svg" alt="World Cup" className="w-12 h-12" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6e/Football_%28soccer_ball%29.svg" alt="Football" className="w-12 h-12" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2e/UEFA_Champions_League_logo_2.svg" alt="Champions League" className="w-12 h-12" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/80 text-gray-300 text-center py-4 mt-auto">
        <span>&copy; {new Date().getFullYear()} JerseyShop. All rights reserved. | Made for football fans ⚽</span>
      </footer>
    </div>
  );
}