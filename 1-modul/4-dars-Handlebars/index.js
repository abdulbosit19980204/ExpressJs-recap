import express from "express"
import { engine } from "express-handlebars"


const app = express()
app.engine('handlebars', engine());
app.set('view engine', 'handlebars')
app.set('views', './views')

app.get('/', (req, res) => {
    res.render('index')

})
app.get('/about', (req, res) => {
    res.render('about')
})


const PORT = process.env.PROT || 4100
app.listen(PORT, () => {
    console.log("Server is running on the PORT =>", PORT);
})