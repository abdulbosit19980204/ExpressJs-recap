import express from "express"
import path, { dirname } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(
    import.meta.url)
const __dirname = dirname(__filename)

const app = express()

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"))
    res.sendStatus(200)

})
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, "views", "about.html"))
})
app.get('/statusCode', (req, res) => {
    res.sendStatus(200)
})

const PORT = process.env.PROT || 4100
app.listen(PORT, () => {
    console.log("Server is running on the PORT =>", PORT);
})