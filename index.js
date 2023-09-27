import express from "express";
const app = express()
const port = 8000;
import connectDB from "./database/Db.js";
connectDB()
import auth from './routes/auth.js'
import notes from './routes/notes.js'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();
// middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
   res.json("This is the notebook app")
})

//rourtes for the different root
app.use('/api/auth', auth);
app.use('/api/notes', notes);


app.listen(port, () => {
   console.log(`App is listing on the ${port}`)
})
