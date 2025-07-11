import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './database/db.js'
import router from './routes/userRoute.js'
import bookRoute from './routes/bookRoute.js'
const app = express()
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
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