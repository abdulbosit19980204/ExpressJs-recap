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


export default router