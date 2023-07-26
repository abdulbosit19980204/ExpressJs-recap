import { Router } from "express";
import Products from "../models/Product.js";
const router = Router()


router.get('/', (req, res) => {
    res.render('index', {
        title: "APP | Home",
        isHome: true,
    })
})

router.get('/products', (req, res) => {
    res.render('products', {
        title: "APP | Products",
        isProducts: true,
    })
})
router.get('/add', (req, res) => {
    res.render('add', {
        title: "APP | Add",
        isAdd: true,
    })
})

// Posts
// Posts

router.post('/add-products', async(req, res) => {
    const { title, description, image, price } = req.body
    const products = await Products.create(req.body)
    console.log(products);
    res.redirect('/')
})



export default router