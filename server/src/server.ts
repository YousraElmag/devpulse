import express, {Request,Response} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose  from 'mongoose';
import router from './routers/authRoutes';

dotenv.config();
const app=express();
const PORT=process.env.PORT;
app.use(cors());
app.use(express.json());
mongoose
.connect(process.env.MONGO_DB as string)
.then(()=>console.log('mongoo connect'))
.catch((err)=>console.error(err))

app.get('/',(req:Request,res:Response)=>{
    res.send('server is running with typescript')
})
app.post('/register',router)
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})