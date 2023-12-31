import { Router } from "express"
import User from "../models/User.js"
import bcrypt from "bcrypt"
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
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
    }
    const user = await User.create(userData)

    res.redirect('/')

})

router.post('/login', async(req, res) => {
    const existUser = await User.findOne({ email: req.body.email })
    if (!existUser) {
        console.log('User not found');
        return
    }
    const isPasswordEqual = await bcrypt.compare(req.body.password, existUser.password)
    if (!isPasswordEqual) {
        console.log("Password is wrong");
        return
    }
    console.log(existUser);
    res.redirect('/')
})


export default router