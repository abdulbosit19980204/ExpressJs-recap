import { Router } from "express";

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

router.post('/add-products', (req, res) => {
    res.send(req.body)
    res.redirect('/')
})


export default router