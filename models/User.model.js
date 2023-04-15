const mongoose = require('mongoose')
const { REQUIRED_FIELD, INVALID_LENGTH } = require('../config/modelErrors.config')
const ROUNDS = 10
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, REQUIRED_FIELD]
    },
    lastName: {
      type: String,
      required: [true, REQUIRED_FIELD]
    },
    username: {
      type: String,
      required: [true, REQUIRED_FIELD],
      unique: true
    },
    email: {
      type: String,
      required: [true, REQUIRED_FIELD],
      unique: true
    },
    password: {
      type: String,
      required: [true, REQUIRED_FIELD],
      minlength: [8, INVALID_LENGTH]
    },
    profilePic: {
      type: String,
      default: 'https://i.pinimg.com/550x/57/70/f0/5770f01a32c3c53e90ecda61483ccb08.jpg'
    },
    following: {
      type: Array
    },
    foodAlergies: {
      type: Array,
      required: [true, REQUIRED_FIELD]
    },
    vegan: {
      type: Boolean,
      required: [true, REQUIRED_FIELD]
    },
    vegetarian: {
      type: Boolean,
      required: [true, REQUIRED_FIELD]
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.__v;
        delete ret._id;
        delete ret.password
      }
    }
  }
)

// uncomment when model's made
// userSchema.virtual('shoppingList', {
//   ref: 'ShoppingList',
//   foreignField: 'user',
//   localField: '_id',
//   justOne: true
// })

UserSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    bcrypt.hash(this.password, ROUNDS)
      .then(hash => {
        this.password = hash
        next()
      })
      .catch(next)
  } else {
    next()
  }
})

UserSchema.virtual('saves', {
  ref: 'Save',
  foreignField: 'user',
  localField: '_id',
  justOne: false
})

UserSchema.methods.checkPassword = function(passwordToCompare) {
  console.log(this)
  console.log(passwordToCompare, this.password)
  return bcrypt.compare(passwordToCompare, this.password);
}

const User = mongoose.model('User', UserSchema);

module.exports = User;