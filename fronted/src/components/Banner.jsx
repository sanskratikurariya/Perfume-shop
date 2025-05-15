import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  'https://pngimg.com/uploads/perfume/perfume_PNG10293.png',
  'https://www.picng.com/upload/perfume/png_perfume_90448.png',
  'https://www.pngarts.com/files/4/Luxury-Perfume-PNG-Free-Download.png',
];

const flowers = [
  'https://static.vecteezy.com/system/resources/previews/022/993/705/original/realistic-cherry-blossom-branch-cherry-blossom-with-pink-sakura-flower-japanese-cherry-blossom-sakura-branch-with-blooming-watercolor-flower-pink-watercolor-cherry-flower-free-png.png',
  'https://www.pngplay.com/wp-content/uploads/15/Spring-Cherry-Blossoms-PNG-HD-Quality.png',
];

function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-[27%] h-[26%] bg-white font-sans overflow-hidden">

    
      <motion.img
        src={flowers[0]}
        alt="Flower Top Left"
        initial={{ opacity: 0, y: -30, x: -30 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 1 }}
        className="absolute top-0 left-0 w-24 md:w-72 lg:w-72 object-contain z-10 pointer-events-none"
      />

   
      <motion.img
        src={flowers[1]}
        alt="Flower Bottom Right"
        initial={{ opacity: 0, y: 30, x: 30 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 1.2 }}
        className="absolute bottom-0 right-0 w-28 md:w-64 lg:w-64 object-contain z-10 pointer-events-none"
      />

  \
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto px-6 md:px-16 py-12 gap-10 items-center relative z-20">

     
        <div className="flex-1 flex justify-center md:justify-start">
          <div className="relative w-96 h-96 md:w-[500px] md:h-[400px]">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                alt={`Perfume ${currentIndex + 1}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.8 }}
                className="absolute top-0 left-0 w-full h-full object-contain"
              />
            </AnimatePresence>
          </div>
        </div>

 
        <div className="flex-1 flex flex-col items-center md:items-start max-w-xl text-center md:text-left">
          <h2 className="text-3xl md:text-6xl font-extrabold text-gray-900 mb-4">
            Discover the Art of <span  className='text-pink-400'> Fragrance</span>
          </h2>
          <p className="text-lg md:text-xl font-medium text-pink-700 mb-4">
            Step into a world where elegance meets emotion. Our luxurious perfumes are crafted to leave a lasting impression.
          </p>
          <p className="text-lg md:text-xl font-medium text-pink-700">
            Elevate your presence with scents that speak your story—timeless, unforgettable, and uniquely yours.
          </p>

        </div>
      </div>
    </div>
  );
}

export default Banner;
