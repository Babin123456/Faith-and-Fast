import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaRightLong } from "react-icons/fa6";

const ProductCard = ({ product }) => {
  const imageUrl = product.images?.[0]?.url || "/fallback-image.jpg";

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="border rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800 hover:shadow-xl transition duration-300"
    >
      <Link to={`/product/${product._id}`} className="block relative">
        <img
          src={imageUrl}
          alt={product.name || "Product Image"}
          className="w-full h-40 sm:h-64 object-cover"
          onError={(e) => (e.target.src = "/fallback-image.jpg")}
        />
        {product.stock <= 0 && (
          <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-lg uppercase tracking-wider">
            Out of Stock
          </span>
        )}
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-semibold">
          {product.name || "Unnamed Product"}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          ₹{" "}
          {(
            product?.price -
            product?.price * (product?.discount / 100)
          ).toLocaleString() ?? "N/A"}
        </p>
        <Link
          to={`/product/${product._id}`}
          className="mt-2 flex text-yellow-500 dark:text-red-600 font-medium gap-2"
        >
          View Details <FaRightLong size={16} className=" mt-1.5" />
        </Link>
      </div>
    </motion.div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string,
    stock: PropTypes.number,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    discount: PropTypes.number,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
};

export default ProductCard;
