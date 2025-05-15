const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');


dotenv.config();


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log(' MongoDB connected');
    return seedData();
  })
  .catch((err) => {
    console.error(' MongoDB connection error:', err);
  });


const products = [
  {
    name: 'Velour Bloom',
    description: 'A floral symphony with hints of jasmine and wild rose. Perfect for the romantic soul who embraces timeless grace.',
    price: 29.99,
    images: ['https://img.freepik.com/free-photo/bottle-perfume-with-word-perfume-it_1340-37484.jpg','https://cdn.pixabay.com/photo/2018/08/29/14/47/perfume-3640056_1280.jpg'],
    sizes: ['S', 'M', 'L'],
  },
  {
    name: 'Midnight Noir',
    description: 'Seductive and mysterious. An intoxicating blend of oud, vanilla, and smoky cedar for unforgettable evenings.',
    price: 49.99,
    images: ['https://fimgs.net/mdimg/secundar/o.68105.jpg','https://wallpapercave.com/wp/wp7212961.jpg'],
    sizes: ['M', 'L', 'XL'],
  },
  {
    name: 'Luna Petal',
    description: 'Delicate yet captivating. Notes of peony and white musk deliver an elegant freshness that lingers softly.',
    price: 19.99,
    images: ['https://cdn.pixabay.com/photo/2023/06/01/06/21/perfume-8032808_1280.jpg','https://png.pngtree.com/background/20230425/original/pngtree-water-flower-petals-ladies-perfume-bottle-fashion-photography-advertising-background-picture-image_2477473.jpg'],
    
    sizes: ['XS', 'S'],
  },
  {
    name: 'Amber Royale',
    description: 'A regal fragrance crafted from rare amber and warm spices. A scent that defines royalty in every drop.',
    price: 59.99,
    images: ['https://www.lacentraldelperfume.com/blog/wp-content/uploads/2018/03/perfume-2142824_1920.jpg','https://cdn.pixabay.com/photo/2017/03/14/11/36/perfume-2142792_1280.jpg'],
    sizes: ['L', 'XL'],
  },
  {
    name: 'Citrus Veil',
    description: 'Bright and energizing. A vibrant fusion of Sicilian orange, bergamot, and soft white florals.',
    price: 39.99,
    images: ['https://fimgs.net/mdimg/secundar/o.61366.jpg','https://cdn.pixabay.com/photo/2024/01/09/16/30/perfume-8497908_1280.jpg'],
    sizes: ['M', 'L'],
  },
  {
    name: 'Imperial Essence',
    description: 'Bold and luxurious with refined layers of leather, sandalwood, and dark orchid. Crafted for distinction.',
    price: 89.99,
    images: ['https://fimgs.net/images/secundar/o.39001.jpg','https://cdn.pixabay.com/photo/2017/10/03/12/07/bottle-2812214_1280.jpg'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    name: 'Rose Blush',
    description: 'A soft, feminine aura with a tender bouquet of pink roses and fresh pear. Graceful and forever charming.',
    price: 14.99,
    images: ['https://wallpapercave.com/wp/wp7212961.jpg'],
    sizes: ['XS', 'S'],
  },
];


async function seedData() {
  try {
    await Product.deleteMany({});
    console.log(' Existing products cleared.');

    await Product.insertMany(products);
    console.log(' Products have been seeded successfully.');

    mongoose.disconnect();
  } catch (err) {
    console.error(' Error seeding data:', err);
    mongoose.disconnect();
  }
}
