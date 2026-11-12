import express, { json } from 'express'
import { configDotenv } from 'dotenv'
import router from './router/authRouter.js';
import dbConnect from './Config/db.js';
import cors from 'cors'
import expressFileupload from 'express-fileupload'
configDotenv();
const app = express()
app.use(express.json())
app.use(cors())
app.use(expressFileupload())
dbConnect()

app.use('/api', router)
app.use('/uploads', express.static('uploads'))

const PORT = process.env.PORT || 9000


app.listen(PORT, () => {
    console.log("server is runing..");
})
