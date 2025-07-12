import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from "../store/userSlice";
import { toast } from "react-toastify";
import { useEffect} from "react";
import { FaShoppingCart } from "react-icons/fa";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  // console.log("user from store", user);
  const cartItems = useSelector((state) => state.cart);

  useEffect(() => {
    const checkTokenExpiry = async () => {
      if (!user.isLoggedIn || !user.token) return;

      try {
        const base_url = import.meta.env.VITE_SERVER_SIDE;
        const response = await fetch(`${base_url}api/user/user-details`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await response.json();

        if (response.status === 401 && data.message === "Token expired. Please login again") {
          toast.error(data.message);
          dispatch(logoutUser());
          navigate("/login");
        }
      } catch (err) {
        console.log(err)
      }
    };

    checkTokenExpiry();
  }, [dispatch, navigate, user]);

  const handleLogout = async () => {
    try {
      const response = await fetch("https://inkora.vercel.app/api/user/logout", {
        method: "GET",
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        dispatch(logoutUser());
        navigate("/login");
      } else {
        toast.error("Logout failed. Try again later");
      }
    } catch (error) {
      toast.error("Something went wrong during logout.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/70 shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to={"/"}>
            <div className="text-4xl font-extrabold text-rose-900">Inkora</div>
          </Link>
          <div className="flex gap-18">
            <Link to={'/'}>
              <div className="text-rose-900 font-semibold text-xl hover:underline cursor-pointer">Home</div>
            </Link>
            <Link to={'/about-us'}>
              <div className="text-rose-900 font-semibold text-xl hover:underline cursor-pointer">About Us</div>
            </Link>
            <Link to={'/all-books'}>
            <div className="text-rose-900 hover:underline cursor-pointer font-semibold text-xl">All Books</div>
            </Link>
          </div>

          <div className="flex gap-6">
            {user.isLoggedIn ? (
              user.role === "ADMIN" ? (
                <>
                <div className="flex gap-2">
                  <Link to={'/add-book'} className="rounded  flex items-center bg-rose-900 px-2 text-white font-semibold cursor-pointer hover:bg-rose-800">
                    Add Book
                  </Link>
                  
                </div>
                  <button
                    onClick={handleLogout}
                    className="rounded bg-rose-900 px-3 py-2 text-white font-semibold cursor-pointer text-xl hover:bg-rose-800"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                <div className="flex gap-2">
                  <Link to={'/cart'} className="rounded gap-2.5 bg-rose-900 px-3 flex items-center text-white font-semibold cursor-pointer hover:bg-rose-800">
                   <FaShoppingCart size={20} className="animate-bounce" />
                    Cart {cartItems.length}
                  </Link>
                </div>
                  <button
                    onClick={handleLogout}
                    className="rounded bg-rose-900 px-3 py-2 text-white font-semibold cursor-pointer text-xl hover:bg-rose-800"
                  >
                    Logout
                  </button>
                </>
              )
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="rounded bg-rose-900 px-3 py-2 text-white font-semibold cursor-pointer text-xl hover:bg-rose-800"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>

      <main className="pt-22 pl-26 pr-26 pb-10">
        <Outlet />
      </main>
    </div>
  );
};

export default Header;
