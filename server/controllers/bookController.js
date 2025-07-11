import bookModel from "../models/bookModel.js";

// add books
export const addBook = async (req, res) => {
  try {
    const { bookname, desc, author, image, price } = req.body;
    if (!bookname || !desc || !author || !image || !price) {
      return res.status(400).json({
        message: "Provide all the fields",
        error: true,
        success: false,
      });
    }
    const book = new bookModel({
      bookname,
      desc,
      author,
      image,
      price,
    });
    const newbook = await book.save();
    if (newbook) {
      return res.status(200).json({
        message: "Book added successfully",
        error: false,
        success: true,
      });
    } else {
      return res.status(400).json({
        message: "Couldn't add the book. Try again later",
        error: true,
        success: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error. Please try again later",
      error: error.message,
      success: false,
    });
  }
};

// get books
export const getBook = async (req, res) => {
  try {
    const books = await bookModel.find();
    if (books) {
      return res.status(200).json({
        message: "Collection of all the books",
        books,
      });
    } else {
      return res.status(400).json({
        message: "Couldn't fetch all the books. Try again later",
        error: true,
        success: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error. Please try again later",
      error: error.message,
      success: false,
    });
  }
};

// get book by id
export const getBookById = async (req, res) => {
  try {
    const bookId = req.params._id;
    const book = await bookModel.findById(bookId);
    if (book) {
      return res.status(200).json({
        message: "Fetched book successfully",
        book,
      });
    } else {
      return res.status(400).json({
        message: "Couldn't fetch the book. Try again later",
        error: true,
        success: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error. Please try again later",
      error: error.message,
      success: false,
    });
  }
};

// update book
export const updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const updates = {};

    const allowedFields = ["bookname", "desc", "author", "image", "price"];
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined && req.body[field] !== "") {
        updates[field] = req.body[field];
      }
    })

    const book = await bookModel.findByIdAndUpdate(
      bookId,
      updates,
      { new: true }
    );
    if (book) {
      return res.status(200).json({
        message: "Book updated successfully",
        success: true,
        error: false,
      });
    } else {
      return res.status(400).json({
        message: "Couldn't update the book. Try again later",
        error: true,
        success: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error. Please try again later",
      error: error.message,
      success: false,
    });
  }
};

// delete book
export const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await bookModel.findByIdAndDelete(bookId);
    if (book) {
      return res.status(200).json({
        message: "Book deleted successfully",
        success:true,
        error:false,
      });
    } else {
      return res.status(400).json({
        message: "Couldn't delete the book. Try again later",
        error: true,
        success: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error. Please try again later",
      error: error.message,
      success: false,
    });
  }
};
