import { Router } from "express"
import User from "../models/User.js"
import bcrypt from "bcrypt"
import flash from "connect-flash"
import { generateJWTToken } from "../services/token.js"

const router = Router()

router.get('/login', (req, res) => {
    if (req.cookies.token) {
        res.redirect('/')
    }
    res.render('login', {
        title: "APP | Login",
        isLogin: true,
        loginError: req.flash("loginError"),

    })
})

router.get('/register', (req, res) => {
    if (req.cookies.token) {
        res.redirect('/')
    }
    res.render('register', {
        title: "APP | Register",
        isRegister: true,
        registerError: req.flash('registerError')
    })
})

router.get('/logout', (req, res) => {
        res.clearCookie('token')
        res.redirect('/')
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
    const user = await User.create(userData)
    const token = generateJWTToken(user._id);
    res.cookie("token", token, { httpOnly: true, secure: true })
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
    const token = generateJWTToken(existUser._id);
    res.cookie("token", token, { httpOnly: true, secure: true })
    res.redirect('/')
})


export default router