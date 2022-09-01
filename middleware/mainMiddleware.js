const {
    userSchema
} = require('../schemas/userSchema')
module.exports = {
    registerValidate: async (req, res, next) => {
        const user = req.body
        const check = await userSchema.find({
            username: user.username
        })
        if (check.length === 1) return res.send({
            error: true,
            message: 'username taken'
        })
        if (check.length > 1) console.log('douplicate usernames in db')
        if (user.username.length < 5) return res.send({
            error: true,
            message: 'username too short'
        })
        if (!RegExp('^(?=.*?[A-Z])').test(user.username)) return res.send({
            error: true,
            message: `username must include a Capital letter`
        })
        if (!(user.password.length <= 30)) return res.send({
            error: true,
            message: 'password too long'
        })
        if (!(user.password.length > 5)) return res.send({
            error: true,
            message: 'password too short'
        })
        if (!(['Vilnius', 'Kaunas', 'Klaipėda', 'Šiauliai', 'Panevėžys', 'Utena', 'Marijampolė', 'Telšiai', 'Alytus', 'Tauragė'].includes(user.city))) return res.send({
            error: true,
            message: 'wrong city'
        })
        if (!(['male', 'female'].includes(user.gender))) return res.send({
            error: true,
            message: 'wrong gender'
        })
        if (!(18 <= user.age && user.age <= 50)) return res.send({
            error: true,
            message: 'wrong age'
        })
        next()
    },
    uploadValidate: async (req, res, next) => {
        let {
            user,
            image
        } = req.body
        if (!user) return res.send({
            error: true,
            message: 'please login'
        })
        if (!(image.length > 0)) return res.send({
            error: true,
            message: 'no image url'
        })
        if (user.images.includes(image)) return res.send({
            error: true,
            message: 'image already uploaded'
        })
        next()
    }
}