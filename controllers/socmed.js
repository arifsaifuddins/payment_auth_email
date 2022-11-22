import { Socmed } from "../models/socmed.js";

export const googleAuth = async (req, res) => {

  if (req.user) {
    return await Socmed.findOrCreate({
      where: { id: req.user.id },
      defaults: {
        id: req.user.id,
        username: req.user.displayName,
        email: req.user.emails[0].value,
        provider: req.user.provider
      }
    }).then(result => {
      res.status(201).json({
        message: 'Login success with your google',
        code: 201,
        data: result
      })

    })
  }
  res.status(400).json({
    message: 'Something was wrong!',
    code: 400
  })
}

export const facebookAuth = async (req, res) => {
  if (req.user) {
    return await Socmed.findOrCreate({
      where: { id: req.user.id },
      defaults: {
        id: req.user.id,
        username: req.user.displayName,
        email: req.user.emails[0].value,
        provider: req.user.provider
      }
    }).then(result => {
      res.status(201).json({
        message: 'Login success with your facebook',
        code: 201,
        data: result
      })

    })
  }
  res.status(400).json({
    message: 'Something was wrong!',
    code: 400
  })
}