import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/userSlice";
import { FaUser } from "react-icons/fa";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [role, setRole] = useState("USER");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const base_url = import.meta.env.VITE_SERVER_SIDE;
      const response = await fetch(`${base_url}api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();

      if (data.success) {
        if (data.role === "ADMIN") {
          toast.success("Logged in as Admin");
          dispatch(loginUser(data));
          navigate("/");
        } else {
          toast.success("Logged in successfully");
          dispatch(loginUser(data));
          navigate("/");
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-lg p-10 max-w-md w-full">
        <h2 className="text-3xl font-bold text-pink-700 text-center mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <div className="flex gap-4">
              <MdEmail size={20} className="text-gray-600 mt-3" />
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <div className="flex gap-4">
              <FaLock size={20} className="text-gray-600 mt-3" />
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="Your password"
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 font-medium mb-1">
                Select Role
              </label>
              <div className="flex gap-5">
              <FaUser size={20} className="text-gray-600 mt-3" />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
              </div>
            </div>

            {role === "USER" && (
              <Link to={"/forgot-password"}>
                <p className="flex justify-end mt-3 text-gray-600 cursor-pointer hover:text-rose-800 font-semibold">
                  Forgot password?
                </p>
              </Link>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-rose-900 text-white py-2 rounded font-semibold transition ${
              loading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-rose-800 cursor-pointer"
            }`}
          >
            {loading ? "Please Wait..." : "Login"}
          </button>

          <div>
            <p className="mt-4 text-center text-gray-600">
              Don't have an account?
              <Link
                to={"/register"}
                className="text-rose-800 cursor-pointer hover:underline ml-2 font-semibold"
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
