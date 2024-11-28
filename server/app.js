import express from 'express' ; 
import cors from 'cors' ; 
import cookieParser from 'cookie-parser'; 
import {config} from 'dotenv' ; 
import morgan from 'morgan';
import userRoutes from './routes/user.route.js'
import courseRoutes from './routes/course.route.js'
import paymentRoutes from './routes/payment.route.js'
import errorMiddleware from './middlewares/error.middleware.js';
config() ; 
const app = express() ; 

app.use(express.json())  ; 

app.use(express.urlencoded({extended : true}))
app.use(cors({
    origin : [process.env.FRONTEND_URL] , 
    credentials : true 
})) ; 


app.use(cookieParser()) ; 
app.use(morgan('dev'))  ; 

app.use('/ping' , (req , res) => {
    res.send('Pong')
})

app.use('/api/v1/user' , userRoutes) ; 
app.use('/api/v1/courses' , courseRoutes) ;
app.use('/api/v1/payments' , paymentRoutes)

app.all('*' , (req , res ) => {
    res.send('404 not found ')
})

app.use(errorMiddleware) ; 

export default app ; 