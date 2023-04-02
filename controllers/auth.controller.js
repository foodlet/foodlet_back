const createHttpError = require('http-errors')
const User = require('../models/User.model')
const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')

module.exports.login = (req, res, next) => {
  const loginError = createHttpError(StatusCodes.UNAUTHORIZED, 'incorrect email or password')
  const { email, password } = req.body

  if(!email || !password) {
    return next(loginError)
  }

  User.findOne({email})
    .then(user => {
      if(!user) {
        return next(loginError)
      }
      
      return user.checkPassword(password)
        .then(match => {
          if(!match) {
            return next(loginError)
          }

          const token = jwt.sign(
            {id: user.id},
            process.env.JWT_SECRET || 'test',
            {
              expiresIn: '3h'
            }
          )

          res.json({ accessToken: token })
        })
    })
  .catch(next)
}