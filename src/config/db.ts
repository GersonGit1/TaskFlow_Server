import mongoose from 'mongoose'
import colors from 'colors'
import { exit } from 'node:process';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {dbName: 'TaskFLow'});
        console.log(colors.magenta.bold(`MongoDB Conectado`))
    } catch (error) {
        console.log(error)
        console.log( colors.red.bold('Error al conectar a MongoDB') )
        exit(1)
    }
}