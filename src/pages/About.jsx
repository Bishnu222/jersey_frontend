import React from 'react';

export default function About() {
  return (
    <div className="max-w-2xl mx-auto py-16 px-6 text-center">
      <h1 className="text-4xl font-extrabold text-green-800 mb-6">About JerseyShop</h1>
      <p className="text-lg text-gray-700 mb-6">
        JerseyShop is your one-stop destination for authentic football jerseys and fan gear. We are passionate about the beautiful game and committed to bringing you the latest and greatest kits from your favorite clubs and national teams.
      </p>
      <p className="text-md text-gray-600 mb-4">
        Our mission is to make it easy and affordable for fans to show their support, whether you're cheering from the stands or from your living room. We offer a wide selection, fast shipping, and top-notch customer service.
      </p>
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-green-700 mb-2">Contact Us</h2>
        <p>Email: <a href="mailto:support@jerseyshop.com" className="text-blue-600 hover:underline">support@jerseyshop.com</a></p>
        <p>Phone: +1-800-FOOTBALL</p>
      </div>
      <div className="mt-10 text-gray-400 text-sm">&copy; {new Date().getFullYear()} JerseyShop. All rights reserved.</div>
    </div>
  );
} 