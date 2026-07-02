import { motion } from "framer-motion";

const ProductReviews = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 bg-white dark:bg-gray-800 transition-colors duration-300">
      <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-8 text-center">
        Reviews for Popular Clothing And Accessories
      </h1>

      {/* Product Cards Container */}
      <div className="space-y-10">
        {/* First Product */}
        <motion.div
          className="border-b border-gray-200 dark:border-gray-700 pb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Product Image */}
            <div className="w-20 sm:w-32 lg:w-32 h-20 sm:h-48 lg:h-32">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROT4e8gZhEe3K_CbQWzWYIZ8D4fOSxmALANw&s"
                alt="Black Trouser"
                className="w-full object-fit rounded-lg shadow-lg transition-transform transform hover:scale-105"
              />
            </div>

            {/* Product Info Container */}
            <div className="flex flex-col md:flex-row gap-8 w-full">
              {/* Product Details */}
              <div className="w-full md:w-1/3">
                <div className="mb-3">
                  <span className="text-xl text-gray-800 dark:text-gray-100 font-medium">
                    COMBRAIDED Slim Fit Men Black Trouser
                  </span>
                </div>

                {/* Rating Badge */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full flex items-center">
                    3.9 ★
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    2,66,706 Ratings & 15,141 Reviews
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl text-gray-800 dark:text-gray-100 font-semibold">
                    ₹299
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-lg">
                    80% off
                  </span>
                </div>

                {/* Product Info */}
                <div className="text-gray-500 dark:text-gray-400 text-sm space-y-1">
                  <div>Casual/Trouser</div>
                  <div>Pack of 1</div>
                  <div>Slim Fit</div>
                </div>
              </div>

              {/* Reviews Grid */}
              <div className="grid md:grid-cols-2 gap-6 w-full md:w-2/3">
                {/* Most Helpful Review */}
                <div className="w-full">
                  <div className="text-gray-500 dark:text-gray-400 text-xs mb-2">
                    Most Helpful Review
                  </div>
                  <div className="border rounded-lg p-4 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                        4 ★
                      </span>
                      <span className="text-gray-800 dark:text-gray-100 font-medium">
                        Value-for-money
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                      At this price it's good. But in the summer time, it boils
                      your egg 😳
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-gray-500 dark:text-gray-400 text-xs">
                      <span>Vivek Bhat</span>
                      <span className="flex items-center gap-1">
                        <span className="bg-gray-100 dark:bg-gray-700 rounded-full p-0.5">
                          ✓
                        </span>
                        Certified Buyer
                      </span>
                      <span>12 months ago</span>
                    </div>
                  </div>
                </div>

                {/* Recent Review */}
                <div className="w-full">
                  <div className="text-gray-500 dark:text-gray-400 text-xs mb-2">
                    Recent Review
                  </div>
                  <div className="border rounded-lg p-4 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                        4 ★
                      </span>
                      <span className="text-gray-800 dark:text-gray-100 font-medium">
                        Just wow!
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                      Nice 👍 better than expectations 🌹 thank you Faith & Fast
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-gray-500 dark:text-gray-400 text-xs">
                      <span>Puneeth Puni</span>
                      <span className="flex items-center gap-1">
                        <span className="bg-gray-100 dark:bg-gray-700 rounded-full p-0.5">
                          ✓
                        </span>
                        Certified Buyer
                      </span>
                      <span>Today</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Add marquee effect */}
        <div className="marquee text-center mt-6">
          <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Check out our latest collection with amazing discounts and offers!
          </p>
        </div>
      </div>

      <style jsx>{`
        .marquee {
          width: 100%;
          overflow: hidden;
          position: relative;
        }

        .marquee p {
          display: inline-block;
          white-space: nowrap;
          position: absolute;
          animation: marquee 10s linear infinite;
        }

        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
};

export default ProductReviews;
