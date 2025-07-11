import React from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div className='flex justify-center items-center mt-30 gap-30'>
      <div>
        <h1 className='text-pink-800 text-[57px] font-semibold mb-10'>Welcome to <span className='italic font-bold font-serif'>INKORA</span></h1>
        <p className='text-rose-700 text-3xl font-heading'>Lose Yourself in a World of Stories at Inkora</p>
        <p className='text-rose-700 text-2xl italic'>Find Your Next Favourite Book Today !!</p>
        <Link to={'/all-books'}>
        <button className='rounded bg-rose-900 text-white font-semibold text-2xl p-4 mt-30 cursor-pointer hover:bg-rose-800 transition duration-300'>Discover Books</button>
        </Link>
      </div>
      <div>
        <img src="https://t3.ftcdn.net/jpg/08/81/50/54/360_F_881505458_faU56PQCxfBg0cm0i54ZFFZQgx5Oqtp8.jpg" className='w-[600px] rounded-b-4xl rounded-t-4xl picture-glow' />
      </div>
    </div>
  )
}

export default Home