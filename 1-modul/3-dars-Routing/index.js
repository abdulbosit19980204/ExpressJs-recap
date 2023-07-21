import express from "express"

const app = express()

app.get('/', (req, res) => {
    res.send("Hello I am running")
})

const PORT = process.env.PROT || 4100
app.listen(PORT, () => {
    console.log("Server is running on the PORT =>", PORT);
})