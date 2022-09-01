const {
    userSchema
} = require('../schemas/userSchema')
const bcrypt = require('bcrypt')

module.exports = {
    register: async (req, res) => {
        const user = req.body
        const newUser = new userSchema
        newUser.username = user.username
        newUser.password = await bcrypt.hash(user.password, 10)
        newUser.city = user.city
        newUser.gender = user.gender
        newUser.age = user.age
        try {
            newUser.save()
        } catch (e) {
            console.log(e)
        }
        res.send({
            error: false,
            message: 'user registered successfully'
        })
    },
    login: async (req, res) => {
        const inputs = req.body
        const user = await userSchema.findOne({
            username: inputs.username
        })
        if (!user) return res.send({
            error: true,
            message: 'no such user'
        })
        const passMatch = await bcrypt.compare(inputs.password, user.password)
        if (passMatch) {
            if (inputs.checkbox) req.session.user = user
            res.send({
                error: false,
                message: 'loged in successfully',
                user
            })
        } else res.send({
            error: true,
            message: 'wrong password'
        })
    },
    autoLogin: (req, res) => {
        if (req.session.user)
            return res.send({
                error: false,
                message: 'autologin successful',
                user: req.session.user
            })
        else res.send({
            error: true,
            message: 'no user'
        })
    },
    logout: (req, res) => {
        delete req.session.user
        res.send({
            error: false,
            message: 'you are logged out'
        })
    },
    upload: async (req, res) => {
        const {
            user,
            image
        } = req.body
        let newUser = await userSchema.findByIdAndUpdate(user._id, {
            $push: {
                images: image
            }
        }, {
            new: true
        })
        const stockImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRerBR3bfynBVdF2gjoii3i_8yI4KOdK5_cxw&usqp=CAU'
        if (newUser.images[0] === stockImg) {
            newUser.images.shift()
            await userSchema.findByIdAndUpdate(user._id, {
                images: newUser.images
            })
        }
        res.send({
            error: false,
            message: 'Image uploaded successfully',
            user: newUser
        })
    },
    users: async (req, res) => {
        const users = await userSchema.find({
            _id: {
                $ne: req.body._id
            }
        })
        res.send({
            error: false,
            message: 'all users retrieved successfully',
            users
        })
    },
    filter: async (req, res) => {
        const user = await userSchema.findByIdAndUpdate(req.body.user._id, {
            filterCity: req.body.city,
            filterGender: req.body.gender,
            filterAgeMax: req.body.ageMax
        }, {
            new: true
        })
        res.send({
            error: false,
            message: 'filter uploaded successfully',
            user
        })
    },
    like: async (req, res) => {
        const {
            loggedInUser,
            currentUser
        } = req.body
        let user = {}
        if (!loggedInUser.likesGiven.includes(currentUser._id))
            user = await userSchema.findByIdAndUpdate(loggedInUser._id, {
                $push: {
                    likesGiven: currentUser._id
                }
            }, {
                new: true
            })
        if (!currentUser.likesGot.includes(loggedInUser._id))
            await userSchema.findByIdAndUpdate(currentUser._id, {
                $push: {
                    likesGot: loggedInUser._id
                }
            })
        res.send({
            error: false,
            message: 'user liked successfully',
            user
        })
    },
    history: async (req, res) => {
        const users = await userSchema.find({
            _id: req.body.list
        })
        res.send({
            error: false,
            message: 'users found',
            users
        })
    }
}