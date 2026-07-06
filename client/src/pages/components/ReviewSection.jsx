import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axiosInstance from "@/api";
import ReviewCard from "./ReviewCard";

const ProductReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/api/review/popular")
      .then((res) => {
        if (res.data && res.data.success) {
          setReviews(res.data.reviews || []);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch popular reviews:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const fallbackReviews = [
    {
      productId: "1",
      productName: "Slim Fit Men Black Trouser",
      userName: "Vivek Bhat",
      rating: 4,
      comment: "At this price it's good. Very comfortable fabric.",
      createdAt: new Date().toISOString(),
    },
    {
      productId: "2",
      productName: "Casual Premium Men Shirt",
      userName: "Puneeth Puni",
      rating: 5,
      comment: "Nice! Better than expectations. Perfect fit.",
      createdAt: new Date().toISOString(),
    },
  ];

  const displayedReviews = reviews.length > 0 ? reviews : fallbackReviews;

  return (
    <div className="max-w-6xl mx-auto p-4 bg-white dark:bg-gray-800 transition-colors duration-300">
      <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-8 text-center">
        Reviews for Popular Clothing And Accessories
      </h1>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {displayedReviews.map((review, idx) => (
            <motion.div
              key={review.reviewId || idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <ReviewCard review={review} />
            </motion.div>
          ))}
        </div>
      )}

      {/* Add marquee effect */}
      <div className="marquee text-center mt-12 bg-yellow-50 dark:bg-gray-700 py-3 rounded-lg">
        <p className="text-lg font-semibold text-gray-850 dark:text-gray-150">
          Check out our latest collection with amazing discounts and offers!
        </p>
      </div>
    </div>
  );
};

export default ProductReviews;
