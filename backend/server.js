const express=require('express')
const cors=require('cors')
const dotenv=require('dotenv')
const connectDb=require('./config/db')
const userRoute=require('./routes/userRoutes')

const app=express()

dotenv.config()
connectDb()

app.use(express.json())

app.use(cors({
    origin:'http://localhost:5173',
    methods:'GET,POST',
    credentials:true
}))

app.use('/api/users',userRoute)
// app.use('/api',userRoute)
// app.use('/api',userRoute)

const port=7000
app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})