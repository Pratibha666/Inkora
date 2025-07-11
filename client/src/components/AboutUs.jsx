import React from 'react';

const AboutUs = () => {
  return (
    <div className="flex items-center justify-between mt-20 mb-30">
      <div className="mb-10 w-[50%]">
        <h2 className="text-4xl font-serif font-bold text-pink-900 mb-6">
          About Inkora
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Welcome to <span className="font-semibold text-rose-900">Inkora</span> - your gateway to a world of stories.
          At Inkora, we believe in the magic of books and their power to inspire, entertain, and transform lives.
          Our carefully curated collection spans across timeless classics, contemporary bestsellers, and hidden literary gems.
        </p>
        <p className="mt-4 text-lg text-gray-700 leading-relaxed">
          Whether you're looking for adventure, romance, mystery, or knowledge, Inkora is here to help you discover your next great read.
          Join our community of book lovers and embark on endless reading journeys.
        </p>
      </div>

      <div className="flex justify-center">
        <img
          src="https://images.stockcake.com/public/9/a/5/9a55b22b-68cf-4170-98e3-875bb9914fba_large/magical-reading-night-stockcake.jpg"
          alt="Magical Reading Night"
          className="rounded-lg shadow-lg max-w-full h-auto"
        />
      </div>
    </div>
  );
};

export default AboutUs;
