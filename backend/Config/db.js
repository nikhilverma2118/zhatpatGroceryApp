import mongoose from 'mongoose'

const dbConnect = async () => {

    const conn = await mongoose.connect(process.env.DB_URL);
    if (conn) {
        console.log("Database Connected Successful");
    }

}

export default dbConnect;
