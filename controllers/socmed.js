import "dotenv/config"
import User from "../models/user.js"
import bcrypt from 'bcrypt'

// import { User } from "../models/user.js"

export const socmedsAuth = async (req, res) => {

  if (req.user) {

    let med

    if (req.user.provider == "facebook") {
      med = '_fb'
    } else {
      med = '_go'
    }

    // sequelize
    // return await User.findOrCreate({
    //   where: { token: req.user.id },
    //   defaults: {
    //     token: req.user.id,
    //     username: req.user.displayName.toLowerCase().replace(' ', '_') + med,
    //     email: req.user.emails[0].value,
    //     password: Date.now() + Math.ceil(Math.random() * 99999) + 1 + req.user.id,
    //     picture: req.user.photos[0].value,
    //     verify: true
    //   }
    // })

    return await User.find({ token: req.user.id }).then(async result => {

      // hash password
      const salt = await bcrypt.genSalt(10)
      const password = await bcrypt.hash(Date.now() + Math.ceil(Math.random() * 99999) + 1 + req.user.id, salt)

      if (!result[0]) {
        User.create({
          token: req.user.id,
          username: req.user.displayName.toLowerCase().replace(' ', '_') + med,
          email: req.user.emails[0].value,
          password,
          picture: req.user.photos[0].value,
          verify: true
        }).then(_ => {
          res.redirect(process.env.MAIN_URL)
        })
      } else {
        res.status(400).json({
          message: 'Something was wrong, user exits!',
          code: 400
        })
      }

    }).catch(() => {
      res.status(400).json({
        message: 'Something was wrong!',
        code: 400
      })
    })
  }
  res.status(400).json({
    message: 'Something was wrong!',
    code: 400
  })
}