import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch("https://inkora.vercel.app/api/user/verify-forgot-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        navigate("/reset-password");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }

    // setOtp("");
    // setEmail("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-lg p-10 max-w-md w-full">
        <h2 className="text-3xl font-bold text-pink-700 text-center mb-6">
          OTP Verification
        </h2>

        <form onSubmit={handleVerifyOtp} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Enter Your 6-digit OTP
            </label>
            <input
              type="number"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Enter OTP"
            />
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
            {loading ? "Please Wait..." : "Verify OTP"}
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

export default OtpVerification;
