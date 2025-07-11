import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/book/get-book");
        const data = await response.json();
        setBooks(data.books || []);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleAddToCart = (book) => {
    const alreadyAdded = cartItems.find((item) => item._id === book._id);
    if (alreadyAdded) {
      toast.info("Book is already in cart");
    } else {
      dispatch(addToCart(book));
      toast.success("Book added to cart");
    }
  };

  const handleDelete = async (bookId) => {
    try {
      const base_url = import.meta.env.VITE_SERVER_SIDE;
      const response = await fetch(
        `${base_url}api/book/delete-book/${bookId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        setBooks(books.filter((book) => book._id !== bookId));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to delete book");
    }
  };

  const handleUpdate = (bookId) => {
    navigate(`/update-book/${bookId}`);
  };

  if (loading)
    return (
      <div className="text-center mt-30 text-4xl font-bold text-rose-900">
        Loading Books...
      </div>
    );

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-rose-900">All Books</h2>
      <div className="grid grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white rounded shadow-md p-4 flex flex-col justify-between min-h-[400px]"
          >
            <div>
              <img
                src={book.image}
                alt={book.bookname}
                className="w-full h-48 object-contain rounded mb-4"
              />
              <h3 className="text-xl font-semibold text-rose-800 mb-2">
                {book.bookname}
              </h3>
              <p className="text-gray-800 mb-1">Author: {book.author}</p>
              <p className="text-gray-800 mb-1">Price: ₹{book.price}</p>
              <p className="text-gray-500">{book.desc}</p>
            </div>
            {user.role === "USER" && (
              <button
                onClick={() => handleAddToCart(book)}
                className="mt-4 bg-rose-900 text-white py-2 rounded hover:bg-rose-800 cursor-pointer font-semibold"
              >
                Add to cart
              </button>
            )}
            {user.isLoggedIn && user.role === "ADMIN" && (
              <div className="flex justify-between mt-10">
                <button
                  onClick={() => handleUpdate(book._id)}
                  className="bg-green-800 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-700 font-semibold"
                >
                  Update
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  onClick={() => handleDelete(book._id)}
                  className={`bg-red-700 text-white px-4 py-2 rounded font-semibold transition ${
                    loading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-red-600 cursor-pointer"
                  }`}
                >
                  {loading ? "Wait..." : "Delete"}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
