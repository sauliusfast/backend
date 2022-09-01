const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const session = require('express-session')
const router = require('./router/mainRouter')
app.listen(4000)
console.log('server started on port 4000')
mongoose.connect('mongodb+srv://LastWork:CsKmx9SF5uWgy4B@cluster0.kn8ukih.mongodb.net/?retryWrites=true&w=majority')
    .then(res => console.log('DataBase connected'))
    .catch(e => console.log(e));
app.use(cors({
    origin: true,
    credentials: true,
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE"
}))
app.use(express.json())
app.use(session({
    secret: '@pENu6dwu1usg?=BFEgdiyp-KtR*)y',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
}))
app.use('/', router)