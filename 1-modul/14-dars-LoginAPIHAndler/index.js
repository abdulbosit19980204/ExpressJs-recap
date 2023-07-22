import express from "express"
import { engine, create } from "express-handlebars"
import * as dotenv from "dotenv"
import mongoose from "mongoose"

// Routers 
import authRoutes from "./routes/auth.js"
import productRoutes from "./routes/product.js"

dotenv.config()

const app = express()
const hbs = create({ defaultLayout: 'main', extname: 'hbs' })
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs')
app.set('views', './views')

// Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(express.json())
app.use(authRoutes)
app.use(productRoutes)

const startApp = () => {
    try {

        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const PORT = process.env.PROT || 4100
        app.listen(PORT, () => {
            console.log("Server is running on the PORT =>", PORT);
        })
    } catch (error) {
        console.log(error);
    }
}

startApp()