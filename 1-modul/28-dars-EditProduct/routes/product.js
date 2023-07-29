import { Router } from "express";
import Products from "../models/Product.js";
import authMiddleware from "../middlewares/auth.js"
const router = Router()


router.get('/', async(req, res) => {
    const products = await Products.find().lean()
    res.render('index', {
        products: products.reverse(),
        userId: req.userId ? req.userId.toString() : null,
        title: "APP | Home",
        isHome: true,
    })
})

router.get('/products', async(req, res) => {
    const user = req.userId ? req.userId.toString() : null
    const myProducts = await Products.find({ user }).populate('user').lean()
    res.render('products', {
        myProducts: myProducts,
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

router.get('/product/:id', async(req, res) => {
        const id = req.params.id
        const product = await Products.findById(id).populate('user').lean()
        res.render('product', {
            product: product
        })
    })
    // Posts

router.post('/add-products', async(req, res) => {
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