import React from 'react';
import { Bed, Bath, Maximize } from 'lucide-react';
import { Link } from 'react-router-dom'; // Gunakan Link agar tidak refresh halaman

const PropertyCard = ({ property }) => {
  
  // 1. Fungsi Helper: Format Harga (Angka -> Rupiah/Dollar)
  const formatPrice = (price) => {
    if (!price) return 'Rp 0';
    // Kalau API ngirim string "$500", biarkan saja. Kalau angka, format jadi Rupiah/Dollar
    if (typeof price === 'number') {
        return new Intl.NumberFormat('id-ID', { 
            style: 'currency', 
            currency: 'IDR',
            maximumFractionDigits: 0 
        }).format(price);
    }
    return price;
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300 border border-gray-100 group">
      
      {/* Container Gambar */}
      <div className="relative h-64 overflow-hidden">
        <img 
          // 2. Fallback Image: Jika property.image kosong, pakai gambar placeholder
          src={property.image || 'https://placehold.co/600x400?text=No+Image'} 
          alt={property.title || 'Property'} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=Error'; }} // Jaga-jaga kalau link gambar mati
        />
        
        {/* Tombol Booking */}
        <div className="absolute top-4 left-4">
           {/* Ganti <a> jadi <Link> atau <button> agar area klik lebih nyaman */}
           <button 
             onClick={() => alert(`Booking feature for ${property.title} coming soon!`)}
             className="text-white bg-amber-600 hover:bg-amber-800 text-xs font-bold px-8 py-3 rounded-3xl uppercase tracking-wider transition-colors shadow-lg"
           >
             Booking
           </button>
        </div>
      </div>
      
      {/* Konten Text */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-black mb-1 line-clamp-1">
            {property.title || 'Untitled Property'}
        </h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-1">
            {property.location || 'Location unknown'}
        </p>
        
        {/* Harga */}
        <div className="text-2xl font-extrabold text-amber-500 mb-4">
          {formatPrice(property.price)}
        </div>

        {/* Fasilitas */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-gray-500 text-sm font-medium">
          <div className="flex items-center gap-2">
            <Bed size={18} className="text-black" /> 
            {property.bedrooms || 0} Beds
          </div>
          <div className="flex items-center gap-2">
            <Bath size={18} className="text-black" /> 
            {property.bathrooms || 0} Baths
          </div>
          <div className="flex items-center gap-2">
            <Maximize size={18} className="text-black" /> 
            {property.area || '-'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;