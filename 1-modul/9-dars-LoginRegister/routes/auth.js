import { Router } from "express"

const router = Router()

router.get('/login', (req, res) => {
    res.render('login', {
        title: "APP | Login",
        isLogin: true,

    })
})

router.get('/register', (req, res) => {
    res.render('register', {
        title: "APP | Register",
        isRegister: true,
    })
})

// Posts
router.post('/register', (req, res) => {
    console.log(req.body);
    res.redirect('/')
})

router.post('/login', (req, res) => {
    console.log(req.body);
    res.redirect('/')
})


export default router