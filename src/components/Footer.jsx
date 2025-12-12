import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8 mt-20">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        <div>
          <h2 className="text-2xl font-black text-white mb-4 tracking-widest">METARFLOW</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            The trusted platform for finding your perfect home, whether you're buying, renting, or selling.
          </p>
        </div>
        
        {['Quick Links', 'Resources'].map((head, idx) => (
          <div key={idx}>
            <h3 className="text-lg font-bold text-gold mb-4">{head}</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-gold transition">About Us</a></li>
              <li><a href="#" className="hover:text-gold transition">Services</a></li>
              <li><a href="#" className="hover:text-gold transition">Contact</a></li>
            </ul>
          </div>
        ))}

        <div>
          <h3 className="text-lg font-bold text-gold mb-4">Newsletter</h3>
          <input type="email" placeholder="Enter email" className="w-full px-4 py-3 rounded bg-white/10 border border-gray-700 text-white focus:border-gold outline-none mb-3" />
          <button className="w-full bg-gold hover:bg-goldHover text-black font-bold py-3 rounded transition bg-white border-black hover:bg-red-500 hover:text-white">Subscribe</button>
        </div>
      </div>
      <div className="text-center text-gray-600 text-xs border-t border-gray-800 pt-8">
        &copy; 2024 Metarflow. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;