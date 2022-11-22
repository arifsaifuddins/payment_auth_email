import "dotenv/config"
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import { User } from '../models/user.js'
import { verifyEmail } from '../utils/mail.js'
import { Op } from "sequelize"

export const registerUser = async (req, res) => {
  const { username, email } = req.body
  const pass = req.body.password

  // hash password
  const salt = await bcrypt.genSalt(10)
  const password = await bcrypt.hash(pass, salt)

  const user = {
    username, email, password
  }

  // hash user data
  const token = jsonwebtoken.sign(user, process.env.SECRET_KEY)

  // data email
  const mailOpt = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Email Verification",
    html: `<h2>Verify your email below!</h2><br><br><a href="http://localhost:5300/user/verify/${token}"><h2>CLick here to verify</h2></a>`,
  };

  // check if user has exits
  return await User.findAll({ where: { [Op.or]: [{ email }, { username }] } }).then(async result => {

    if (result[0]) {
      return res.status(400).json({
        code: 400,
        message: 'User is Exist!',
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
          message: 'Registering Success!. Please verify your email'
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
  return await User.update({
    verify: true
  }, {
    where: {
      username: user.username,
      password: user.password,
      email: user.email
    }
  }).then(result => {

    // check if user verify
    if (result[0] == 1) {
      res.status(200).json({
        code: 200,
        message: `Your email (${user.email}) has verified!. Thank You, and now you can login`
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
  const user = await User.findOne({ where: { email } })
  if (user) {

    // is verified
    if (user.verify == true) {

      // unhash password
      const login = await bcrypt.compare(password, user.password)

      if (login) {

        // login
        return await User.findOne({ where: { email: user.email } }).then(result => {
          res.status(200).json({
            message: 'Login Success!',
            code: 200,
            data: result
          })
        }).catch(err => res.json({
          message: 'Login Failed',
          error: err.message
        }))
      } else {
        return res.status(404).json({
          status: 'Login Failed!',
          code: 404,
          message: 'Email/Password not found'
        })
      }
    } else {
      return res.status(400).json({
        status: 'Login Failed!',
        code: 400,
        message: 'Email/Password not verified. please verify your email!'
      })
    }
  } else {
    return res.status(404).json({
      status: 'Login Failed!',
      code: 404,
      message: 'Email/Password not found!'
    })
  }
}