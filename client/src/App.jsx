import './App.css'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'
import Login from './components/Login'
import ResetPassword from './components/ResetPassword'
import Register from './components/Register'
import ForgotPassword from './components/ForgotPassword'
import OtpVerification from './components/OtpVerification'
import AboutUs from './components/AboutUs'
import AllBooks from './components/AllBooks'
import AddBook from './components/AddBook'
import UpdateBook from './components/UpdateBook'
import Cart from './components/Cart'
function App() {

  return (
    <>
    <ToastContainer />
    <div className='bg-rose-50'>
      <Routes>
        <Route path='/' element={<Header />} >
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/verify-forgot-password' element={<OtpVerification />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/all-books' element={<AllBooks />} />
          <Route path='/add-book' element={<AddBook />} />
          <Route path='/update-book/:id' element={<UpdateBook />} />
          <Route path='/cart' element={<Cart />} />
        </Route>
      </Routes>
      <Footer />
    </div>
    </>
  )
}

export default App
