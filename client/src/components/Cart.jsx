import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../store/cartSlice';
import { toast } from 'react-toastify';
const Cart = () => {
  const cartItems = useSelector((state) => state.cart);
//   console.log(cartItems); 
  const dispatch = useDispatch();
  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);
  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    toast.success('Book removed from cart');
  };

  const handlePayAmount = () =>{
    toast.success("Amount paid successfully")
    dispatch(clearCart())
  }

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success('Cart cleared successfully');
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center text-6xl font-extrabold mt-20 text-rose-900">
        Cart is empty
      </div>
    );
  }

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-rose-900">Your Cart</h2>
      <div className="grid grid-cols-4 gap-6">
        {cartItems.map((item) => (
          <div key={item._id} className="bg-white rounded shadow-md p-4 flex flex-col justify-between min-h-[400px]">
            <img src={item.image} alt={item.bookname} className="w-full h-48 object-contain mb-4" />
            <h3 className="text-xl font-semibold text-rose-800 mb-2">{item.bookname}</h3>
            <p className="text-gray-800 mb-2">Price: ₹{item.price}</p>
            <button
              onClick={() => handleRemove(item._id)}
              className="bg-red-700 text-white py-2 rounded hover:bg-red-600 cursor-pointer font-semibold"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className='flex flex-col items-center justify-center mt-10'>
      <button
        onClick={handlePayAmount}
        className="mt-8 bg-green-700 text-white py-3 w-1/2 rounded hover:bg-green-600 cursor-pointer font-semibold"
      >
        Total Amount to pay: ₹{totalAmount}
      </button>
      <button
        onClick={handleClearCart}
        className="mt-8 bg-rose-900 text-white py-3 w-1/2 rounded hover:bg-rose-800 cursor-pointer font-semibold"
      >
        Clear Cart
      </button>
        </div>
      </div>
  );
};

export default Cart;
