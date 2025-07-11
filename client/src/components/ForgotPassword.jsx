import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const base_url = import.meta.env.VITE_SERVER_SIDE;
      const response = await fetch(
        `${base_url}api/user/forgot-password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        navigate("/verify-forgot-password");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }

    // setEmail("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-lg p-10 max-w-md w-full">
        <h2 className="text-3xl font-bold text-pink-700 text-center mb-6">
          Forgot Password
        </h2>

        <form onSubmit={handleSendOTP} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <div className="flex gap-4">
              <MdEmail size={20} className="text-gray-600 mt-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-2 rounded font-semibold transition ${
              loading
                ? "bg-rose-900 opacity-50 cursor-not-allowed"
                : "bg-rose-900 hover:bg-rose-800 cursor-pointer"
            }`}
          >
            {loading ? "Please Wait..." : "Send OTP"}
          </button>

          <div>
            <p className="mt-4 text-center text-gray-600">
              Already have an account?
              <Link
                to={"/login"}
                className="text-rose-800 cursor-pointer hover:underline ml-2 font-semibold"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
