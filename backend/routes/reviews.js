
const express = require('express');
const router = express.Router();
const Review = require('../models/Review');


router.get('/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reviews' });
  }
});


router.post('/:productId', async (req, res) => {
  try {
    const review = new Review({
      ...req.body,
      productId: req.params.productId,
    });
    await review.save();
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: 'Error saving review' });
  }
});

module.exports = router;