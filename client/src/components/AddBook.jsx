import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddBook = () => {
  const [bookname, setBookname] = useState("");
  const [desc, setDesc] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/api/book/add-book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookname, desc, author, image, price }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        setBookname("");
        setDesc("");
        setAuthor("");
        setImage("");
        setPrice("");

        navigate("/all-books");
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
    <div className="mt-12 p-8 bg-white rounded mb-10 shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-rose-900">Add New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        <input
          type="text"
          name="bookname"
          value={bookname}
          onChange={(e) => setBookname(e.target.value)}
          placeholder="Book Name"
          className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <textarea
          name="desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Description"
          className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <input
          type="text"
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
          className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <input
          type="text"
          name="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image URL"
          className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <input
          type="number"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-rose-900 text-white py-2 rounded font-semibold transition ${
            loading
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-rose-800 cursor-pointer"
          }`}
        >
          {loading ? "Please Wait..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
