import "dotenv/config"
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import User from '../models/user.js'
import { verifyEmail } from '../utils/mail.js'
// import { Op } from "sequelize"
// import { User } from '../models/user.js'

export const registerUser = async (req, res) => {
  const { username, email } = req.body
  const pass = req.body.password

  // hash password
  const salt = await bcrypt.genSalt(10)
  const password = await bcrypt.hash(pass, salt)

  // get first char for picture name
  let usr
  const at = username.charAt(0).toLowerCase()
  if (at == 'a' || at == 'b' || at == 'c' || at == 'd' || at == 'e' || at == 'f' || at == 'g' || at == 'h' || at == 'i' || at == 'j' || at == 'k' || at == 'l' || at == 'm' || at == 'n' || at == 'o' || at == 'p' || at == 'q' || at == 'r' || at == 's' || at == 't' || at == 'u' || at == 'v' || at == 'w' || at == 'x' || at == 'y' || at == 'z') {
    usr = at + '.png'
  } else {
    usr = 'random.png'
  }

  const user = {
    username, email, password, token: Date.now() + Math.ceil(Math.random() * 99999) + 1, picture: usr
  }

  // hash user data
  const token = jsonwebtoken.sign(user, process.env.SECRET_KEY)

  // data email
  const mailOpt = {
    from: 'Arief Saifuddien',
    to: email,
    subject: "Email Verification",
    html: `<h2>Verify your email below!</h2><br><br><a href="${process.env.MAIN_URL}/user/verify/${token}"><h2>CLick here to verify</h2></a>`,
  }

  // check if user has exits
  // return await User.findAll({ where: { [Op.or]: [{ email }, { username }] } }).then(async result => {})
  return await User.find({ email, username }).then(async result => {

    if (result[0]) {
      return res.status(400).json({
        code: 400,
        message: 'User is exist!, change your email/username',
      })
    } else if (!result[0]) {

      // verify email
      await verifyEmail(mailOpt).then(async (data, err) => {
        if (err) {
          return res.status(400).json({
            code: 400,
            message: data.envelope.to[0] + ' not valid!',
          })
        }
      })

      // save user
      return await User.create(user).then(results => {
        res.status(201).json({
          code: 201,
          message: 'Registering success!. Please verify your email'
        })
      }).catch(err => {
        res.status(402).json({
          code: 402,
          message: err
        })
      })
    }
  })
}

export const verifyUser = async (req, res) => {
  const { token } = req.params

  // verify user
  const user = jsonwebtoken.verify(token, process.env.SECRET_KEY)

  // update user
  return await User.updateOne({
    username: user.username,
    password: user.password,
    email: user.email
  }, {
    verify: true
  }).then(result => {

    // check if user verify
    if (result) {
      res.status(200).json({
        code: 200,
        message: `Your email (${user.email}) has verified!. Thank you, and now you can login`
      })
    } else {
      res.status(400).json({
        code: 400,
        message: `Something went wrong!`
      })
    }
  })
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body

  // check user
  // const user = await User.findOne({ where: { email } })
  const user = await User.findOne({ email })
  if (user) {

    // is verified
    if (user.verify == true) {

      // unhash password
      const login = bcrypt.compare(password, user.password)

      if (login) {

        // login
        // return await User.findOne({ where: { email: user.email } }).then(result => {})
        return await User.findOne({ email: user.email }).then(result => {
          res.status(200).json({
            message: 'Login success as' + user.email + '!',
            code: 200,
            data: result
          })
        }).catch(err => res.json({
          message: 'Login failed',
          error: err.message
        }))
      } else {
        return res.status(404).json({
          status: 'Login failed!',
          code: 404,
          message: 'Email/Password not found'
        })
      }
    } else {
      return res.status(400).json({
        status: 'Login failed!',
        code: 400,
        message: 'Email not verified. please verify your email!'
      })
    }
  } else {
    return res.status(404).json({
      status: 'Login failed!',
      code: 404,
      message: 'Email/Password not found!'
    })
  }
}