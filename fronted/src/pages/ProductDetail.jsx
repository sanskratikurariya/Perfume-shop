import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { FaShareAlt, FaStar, FaPaperPlane } from 'react-icons/fa';
import ProductGallery from '../components/ProductGallery';
import Navbar from '../components/Navbar';

import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState('');
  const [shareUrl, setShareUrl] = useState('');
  const [touchStartX, setTouchStartX] = useState(null);

  // Create axios instance (optional)
  const api = axios.create({
    baseURL: '/api', // replace with your actual API base URL if needed
  });

  useEffect(() => {
    // Fetch product details
    api.get(`/products/${id}`)
      .then((res) => {
        // Add currentImage property
        setProduct({ ...res.data, currentImage: 0 });
      })
      .catch((err) => {
        console.error('Error fetching product:', err);
      });

    // Fetch reviews
    api.get(`/reviews/${id}`)
      .then((res) => setReviews(res.data))
      .catch((err) => {
        console.error('Error fetching reviews:', err);
      });

    // Set share URL
    setShareUrl(window.location.href);
  }, [id]);

  const handleReviewSubmit = () => {
    if (!comment.trim()) return;

    api.post(`/reviews/${id}`, {
      username: 'User',
      comment,
      rating: 5,
    })
      .then((res) => {
        setReviews((prevReviews) => [...prevReviews, res.data]);
        setComment('');
      })
      .catch((err) => {
        console.error('Error submitting review:', err);
        alert('Failed to submit review. Please try again.');
      });
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null || !product || !product.images) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;

    if (Math.abs(deltaX) > 50) {
      const newIndex =
        deltaX < 0
          ? product.currentImage === product.images.length - 1
            ? 0
            : product.currentImage + 1
          : product.currentImage === 0
            ? product.images.length - 1
            : product.currentImage - 1;

      setProduct((prev) => ({ ...prev, currentImage: newIndex }));
    }
    setTouchStartX(null);
  };

  if (!product)
    return (
      <div className="p-8 text-center text-lg font-semibold text-gray-600">
        Loading product details...
      </div>
    );

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-12 bg-white shadow-md rounded-lg">
        {/* Product Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-gray-800 text-center">
          {product.name}
        </h2>

        {/* Product Image with Touch Events */}
        <div
          className="relative mb-10 flex justify-center items-center"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <ProductGallery images={product.images} />
        </div>

        {/* Product Info & Share Button */}
        <div className="md:flex md:space-x-12 mb-10">
          <div className="flex-1 mb-8 md:mb-0">
            <p className="text-gray-700 mb-4 text-lg line-clamp-2">{product.description}</p>

            {/* Sizes */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Available Sizes</h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 border border-gray-300 rounded-full text-gray-700 bg-gray-50 shadow-sm hover:bg-gray-100 transition cursor-pointer"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="text-3xl font-bold text-pink-600 mb-4">
              ${product.price.toFixed(2)}
            </div>
          </div>

          {/* Share Button */}
          <div className="flex items-center justify-center md:justify-end">
            <button
              className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg shadow-lg transition-transform hover:scale-105 cursor-pointer"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: product.name, url: shareUrl });
                } else {
                  navigator.clipboard.writeText(shareUrl);
                  alert('URL copied to clipboard!');
                }
              }}
            >
              <FaShareAlt className="text-xl" />
              <span className="font-semibold">Share</span>
            </button>
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800 border-b border-gray-300 pb-2">
            Customer Reviews
          </h3>
          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet. Be the first to share your thoughts!</p>
          ) : (
            <div className="space-y-4 mt-4">
              {reviews.map((r, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition"
                >
                  {/* Stars */}
                  <div className="flex items-center mb-2 space-x-1 text-yellow-400">
                    {[...Array(r.rating || 5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  {/* Username */}
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 text-sm">{r.username}</span>
                  </div>
                  {/* Comment */}
                  <p className="text-gray-700">{r.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Review Form */}
        <div className="border-t border-gray-300 pt-8">
          <h4 className="text-xl font-semibold mb-4 text-gray-800">Write a Review</h4>
          <textarea
            className="w-full h-32 p-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            placeholder="Share your experience..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            onClick={handleReviewSubmit}
            className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg shadow-lg transition-transform hover:scale-105 cursor-pointer"
          >
            <FaPaperPlane />
            Submit Review
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;