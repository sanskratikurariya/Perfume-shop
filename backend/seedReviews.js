const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Review = require('./models/Review');
const Product = require('./models/Product');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    return seedReviews();
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

async function seedReviews() {
  try {
    const products = await Product.find();

    if (products.length < 6) {
      throw new Error('At least 6 products are required to link reviews.');
    }

    const reviews = [
      {
        user: 'Aarav Sharma',
        rating: 5,
        comment: 'Absolutely loved the fragrance. Feels premium!',
        productId: products[0]._id,
      },
      {
        user: 'Ishita Verma',
        rating: 4,
        comment: 'Really nice product. Smells great and lasts long.',
        productId: products[1]._id,
      },
      {
        user: 'Rohan Mehta',
        rating: 3,
        comment: 'Decent for the price. Not the best, but good enough.',
        productId: products[2]._id,
      },
      {
        user: 'Sneha Patil',
        rating: 5,
        comment: 'Fresh and elegant! Highly recommended.',
        productId: products[3]._id,
      },
      {
        user: 'Kunal Deshmukh',
        rating: 4,
        comment: 'Nice product. Packaging could be improved.',
        productId: products[4]._id,
      },
      {
        user: 'Priya Nair',
        rating: 5,
        comment: 'One of my favorite scents now. Using it daily!',
        productId: products[5]._id,
      },
    ];

    await Review.deleteMany({});
    await Review.insertMany(reviews);
    console.log('Reviews seeded successfully.');
    mongoose.disconnect();
  } catch (err) {
    console.error('Error seeding reviews:', err);
    mongoose.disconnect();
  }
}
