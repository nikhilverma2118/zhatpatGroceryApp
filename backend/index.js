import express, { json } from 'express'
import { configDotenv } from 'dotenv'
import router from './router/authRouter.js';
import dbConnect from './Config/db.js';
configDotenv();
const app = express()
app.use(express.json())
dbConnect()

app.use('/api', router)
const PORT = process.env.PORT || 9000


app.listen(PORT, () => {
    console.log("server is runing..");
})
