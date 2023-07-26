import { Router } from "express";
import Products from "../models/Product.js";
import authMiddleware from "../middlewares/auth.js"
import userMiddleware from "../middlewares/user.js"
const router = Router()


router.get('/', async(req, res) => {
    const products = await Products.find().lean()
    console.log(products);
    res.render('index', {
        products: products,
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
router.get('/add', authMiddleware, (req, res) => {

    res.render('add', {
        title: "APP | Add",
        isAdd: true,
        addProductError: req.flash('addProductError')
    })
})

// Posts

router.post('/add-products', userMiddleware, async(req, res) => {
    const { title, description, image, price } = req.body
    if (!title || !description || !image || !price) {
        req.flash('addProductError', "All fields are required")
        res.redirect('/add')
        return
    }
    const products = await Products.create({...req.body, user: req.userId })

    res.redirect('/')
})



export default router