import { Router } from "express"
import User from "../models/User.js"
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
router.post('/register', async(req, res) => {
    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    }
    const user = await User.create(userData)
    console.log(user);
    res.redirect('/')

})

router.post('/login', (req, res) => {
    console.log(req.body);
    res.redirect('/')
})


export default router