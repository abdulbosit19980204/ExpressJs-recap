import express from "express"
import { engine, create } from "express-handlebars"

// Routers middlewares
import authMiddleware from "./routes/auth.js"
import productMiddleware from "./routes/product.js"

const app = express()
const hbs = create({ defaultLayout: 'main', extname: 'hbs' })
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs')
app.set('views', './views')

// Middlewares
app.use(authMiddleware)
app.use(productMiddleware)



const PORT = process.env.PROT || 4100
app.listen(PORT, () => {
    console.log("Server is running on the PORT =>", PORT);
})