import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

class Database {
    constructor() {
        this.connect();
    }

    async connect() {
        try {
            const conn = await mongoose.connect(process.env.DB_URL as string, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
            });

            console.log(`DB connected: ${conn.connection.host}`);
        } catch (error) {
            console.log(`ERROR: ${error.message}`);

            process.exit(1);
        }
    }
}

const connectToDB = new Database();

export default connectToDB;