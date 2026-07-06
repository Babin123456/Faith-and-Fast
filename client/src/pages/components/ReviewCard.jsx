import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ReviewCard = ({ review }) => {
  return (
    <div className="border rounded-lg p-4 hover:shadow-xl transition-shadow duration-300 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full font-bold">
            {review.rating} ★
          </span>
          <span className="text-gray-800 dark:text-gray-150 font-semibold text-sm">
            {review.comment ? review.comment.split(" ").slice(0, 3).join(" ") : "Quality"}
          </span>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 italic">
        &ldquo;{review.comment}&rdquo;
      </p>
      <div className="flex flex-wrap items-center justify-between text-gray-500 dark:text-gray-400 text-xs">
        <div className="flex items-center gap-1">
          <span className="font-semibold text-gray-700 dark:text-gray-300">{review.userName}</span>
          <span className="bg-gray-100 dark:bg-gray-700 rounded-full px-1 py-0.2 text-[9px] text-green-600">
            ✓ Certified Buyer
          </span>
        </div>
        <span>{new Date(review.createdAt).toLocaleDateString()}</span>
      </div>
      <div className="mt-3 pt-2 border-t dark:border-gray-700 flex justify-between items-center">
        <span className="text-xs text-gray-500 dark:text-gray-400">Review for:</span>
        <Link to={`/product/${review.productId}`} className="text-xs text-blue-500 hover:underline truncate max-w-[150px]">
          {review.productName}
        </Link>
      </div>
    </div>
  );
};

ReviewCard.propTypes = {
  review: PropTypes.shape({
    productId: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    createdAt: PropTypes.string,
  }).isRequired,
};

export default ReviewCard;
