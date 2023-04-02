const createHttpError = require('http-errors')
const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes')

module.exports.isAuthenticated = (req, res, next) => {
  const authorization = req.header('Authorization')
  if (!authorization) {
    return next(createHttpError(StatusCodes.UNAUTHORIZED, 'Authorization header was not provided'))
  }

  const [schema, token] = authorization.split(' ')
  if (schema !== 'Bearer') {
    return next(createHttpError(StatusCodes.UNAUTHORIZED, 'Authorization schema is not supported'))
  }
  if (!token) {
    return next(createHttpError(StatusCodes.UNAUTHORIZED, 'A token must be provided'))
  }

  const secret = process.env.JWT_SECRET || 'test'
  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      return next(err)
    }
    req.currentUser = decodedToken.id
    next()
  })
}