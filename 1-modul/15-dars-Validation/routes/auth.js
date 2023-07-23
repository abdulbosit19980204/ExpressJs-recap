import { Router } from "express"
import User from "../models/User.js"
import bcrypt from "bcrypt"
import flash from "connect-flash"

const router = Router()

router.get('/login', (req, res) => {
    res.render('login', {
        title: "APP | Login",
        isLogin: true,
        loginError: req.flash("loginError"),

    })
})

router.get('/register', (req, res) => {
    res.render('register', {
        title: "APP | Register",
        isRegister: true,
        registerError: req.flash('registerError')
    })
})

// Posts
router.post('/register', async(req, res) => {
    const { firstName, lastName, email, password } = req.body
    if (!firstName || !lastName || !email || !password) {
        req.flash('registerError', "All fields are required")
        res.redirect('/register')
        return
    }

    const isUserExist = await User.findOne({ email })
    if (isUserExist) {
        req.flash('registerError', "User already registered")
        res.redirect('/register')
        return
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const userData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
    }
    await User.create(userData)

    res.redirect('/')

})

router.post('/login', async(req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        req.flash('loginError', "All fields are required")
        res.redirect('/login')
        return
    }
    const existUser = await User.findOne({ email })
    if (!existUser) {
        req.flash('loginError', "User not found")
        res.redirect('/login')
        return

    }
    const isPasswordEqual = await bcrypt.compare(password, existUser.password)
    if (!isPasswordEqual) {
        console.log("Password is wrong");
        req.flash('loginError', "Password is wrong")
        res.redirect('/login')
        return
    }
    console.log(existUser);
    res.redirect('/')
})


export default router