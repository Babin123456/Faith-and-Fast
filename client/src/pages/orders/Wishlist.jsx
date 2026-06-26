import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  deleteWishListItem,
  getWishListItems,
} from "@/store/add-to-wishList/addToWishList";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import WishlistSkeleton from "../components/skeletons/WishlistSkeleton";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const { WishListItems, loading, error } = useSelector(
    (state) => state.wishList
  );

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getWishListItems());
  }, [dispatch]);

  const handleAddCart = (item) => {
    navigate(`/product/${item._id}`);
    toast.info("Add item to Cart from Product page!");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold bg-gradient-to-r from-yellow-500 to-red-500 bg-clip-text text-transparent mb-8 text-center">
        My Wishlist
      </h1>

      {loading ? (
        <WishlistSkeleton />
      ) : (
        <>
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 text-center mb-4"
        >
          {error}
        </motion.p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <AnimatePresence>
          {WishListItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full flex flex-col items-center justify-center py-16 px-4 text-center bg-white dark:bg-gray-800 rounded-xl shadow-lg"
            >
              <svg
                className="w-16 h-16 text-yellow-500 mb-4 animate-pulse"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                Your Wishlist is Empty
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-sm">
                Save items that you like here. They will stay in your wishlist so you can find them easily later!
              </p>
              <Link to="/products">
                <Button
                  variant="contained"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded-lg transition-all"
                >
                  Explore Collection
                </Button>
              </Link>
            </motion.div>
          ) : (
            WishListItems.map((item) => (
              <motion.div
                key={item.productId._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                layout
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex flex-col"
              >
                <Link to={`/product/${item.productId._id}`}>
                  <img
                    src={item.productId.images[0].url}
                    alt={item.productId.name}
                    className="w-full h-48 object-fit rounded-md mb-4"
                  />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {item.productId.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 flex-grow">
                    {item.productId.description}
                  </p>
                </Link>
                <button
                  onClick={() => handleAddCart(item.productId)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md mt-4"
                >
                  Add to Cart
                </button>
                <div className="mt-4">
                  <Button
                    variant="contained"
                    color="error"
                    size="medium"
                    fullWidth
                    startIcon={<DeleteIcon />}
                    onClick={() => dispatch(deleteWishListItem(item._id))}
                  >
                    Remove
                  </Button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
      </>
      )}
    </div>

  );
};

export default WishlistPage;
