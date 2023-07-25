import express from "express"
import { engine, create } from "express-handlebars"
import mongoose from "mongoose"
import flash from "connect-flash"
import session from "express-session"
import varMiddleware from "./middlewares/var.js"
import cookieParser from "cookie-parser"
import * as dotenv from "dotenv"


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
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

//show the error 
app.use(session({ secret: "tatu", resave: false, saveUninitialized: false }))
app.use(flash())
app.use(cookieParser())
app.use(varMiddleware)

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