import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './database/db.js'
import router from './routes/userRoute.js'
import bookRoute from './routes/bookRoute.js'
const app = express()
app.use(express.json())
const allowedOrigins = [
  "http://localhost:5173",         // Local dev
  "https://inkora-w8vd.vercel.app" // Vercel frontend
]

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}))

dotenv.config()
app.use('/api/user',router)
app.use('/api/book',bookRoute)
const PORT = process.env.PORT
connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server listening on port ${PORT}`)
    })
})