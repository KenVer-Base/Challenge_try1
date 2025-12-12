import React, { useState } from "react";
import PropertyCard from "../components/PropertyCard";
import { properties } from "../data/mockData";

const Dashboard = () => {
  const [search, setSearch] = useState("");

  const filtered = properties.filter((item) =>
    item.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="font-sans">
      {/* HERO */}
      <header className="py-24 px-6 text-center bg-white">
        <h1 className="text-5xl md:text-6xl font-black text-black mb-6 leading-tight">
          Build Your Dream Home
          <br />
          <span className="text-gold">Live the Lifestyle.</span>
        </h1>

        <p className="text-grey max-w-2xl mx-auto mb-10 text-lg">
          Realize your dream home. We craft spaces that are functional,
          inspiring joy, tranquility, and connection.
        </p>

        {/* SEARCH BAR */}
        <div className="max-w-lg mx-auto flex items-center gap-2 bg-white p-2 rounded-full shadow-card border border-gray-200">
          <input
            type="text"
            placeholder="Search location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-6 outline-none text-dark bg-transparent"
          />
          <button className="bg-black text-white hover:bg-gray-700 px-8 py-3 rounded-full font-bold transition-all shadow-lg shadow-gold/30">
            Search
          </button>
        </div>
      </header>

      {/* STATS */}
      <section className="py-12 border-y border-gray-100 bg-gray-50/50">
        <div className="container mx-auto flex justify-center gap-10 md:gap-20 text-center flex-wrap">
          {[
            { num: "750+", label: "Homes Built" },
            { num: "200+", label: "Expert Staff" },
            { num: "50+", label: "Awards Won" },
          ].map((stat, idx) => (
            <div key={idx}>
              <h3 className="text-4xl font-black text-black">{stat.num}</h3>
              <p className="text-gold font-bold uppercase tracking-wider text-xs mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PROPERTY LIST */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-black mb-2">For Rent</h2>
        <p className="text-grey mb-10">
          Find the property that defines your lifestyle
        </p>

        {filtered.length === 0 ? (
          <p className="text-center text-grey py-10">
            No properties found for "{search}"
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((item) => (
              <PropertyCard key={item.id} property={item} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
