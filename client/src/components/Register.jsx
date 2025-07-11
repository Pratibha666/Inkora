import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false); 

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true); 
      const base_url = import.meta.env.VITE_SERVER_SIDE;
      const response = await fetch(`${base_url}api/user/register`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const dataResponse = await response.json();

      if (dataResponse.success) {
        toast.success(dataResponse.message);
        navigate("/login");
      } else {
        toast.error(dataResponse.message);
      }

    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }

    // setEmail("");
    // setName("");
    // setPassword("");
    // setConfirmPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-lg p-10 max-w-md w-full">
        <h2 className="text-3xl font-bold text-pink-700 text-center mb-6">
          Create Your Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Full Name
              </label>
              <div className="flex gap-4">
                <FaUser size={20} className="text-gray-600 mt-3" />
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  placeholder="Your name"
                />
              </div>
            </div>

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
                  placeholder="At least 6 characters"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Confirm Password
              </label>
              <div className="flex gap-4">
                <FaLock size={20} className="text-gray-600 mt-3" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  placeholder="Confirm password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-rose-900 text-white py-2 rounded font-semibold transition ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-rose-800 cursor-pointer"
              }`}
            >
              {loading ? "Please Wait..." : "Register"}
            </button>

            <div>
              <p className="mt-4 text-center text-gray-600">
                Already have an account ?
                <Link
                  to={"/login"}
                  className="text-rose-800 cursor-pointer hover:underline ml-2 font-semibold"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
