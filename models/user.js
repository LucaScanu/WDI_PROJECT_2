const mongoose     = require('mongoose');
const bcrypt       = require('bcrypt');
const validator    = require('validator');

const userSchema      = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true }
});

//*****The virtual method in the userSchema allow us to store a clear
//***** password during registration even if it isn't accept by the model
userSchema
.virtual('password')
//**we are calling the function that will change our clear password into
//** passwordHash
.set(setPassword);

userSchema
  .virtual('passwordConfirmation')
  .set(setPasswordConfirmation);

userSchema
  .path('passwordHash')
  .validate(validatePasswordHash);

userSchema
  .path('email')
  .validate(validateEmail);

userSchema.methods.validatePassword = validatePassword;

userSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.passwordHash;
    delete ret._id;
    delete ret.updatedAt;
    delete ret.createdAt;
    delete ret.email;
    delete ret.__v;
    return ret;
  }
});

function setPassword(value) {
  this._password    = value;
  //**the hash and salt are both required to encrypt a password**//
  this.passwordHash = bcrypt.hashSync(value, bcrypt.genSaltSync(8));
}

function setPasswordConfirmation(passwordConfirmation) {
  this._passwordConfirmation = passwordConfirmation;
}

//validatePasswordHash will check against stored passwords and
//validate the correct one during login
function validatePasswordHash() {
  if (this.isNew) {
    if (!this._password) {
      return this.invalidate('password', 'A password is required.');
    }
    if (this._password.length < 6) {
      this.invalidate('password', 'must be at least 6 characters.');
    }

    if (this._password !== this._passwordConfirmation) {
      return this.invalidate('passwordConfirmation', 'Passwords do not match.');
    }
  }
}

function validateEmail(email) {
  if (!validator.isEmail(email)) {
    return this.invalidate('email', 'email is not recognized');
  }
}

function validatePassword(password){
  return bcrypt.compareSync(password, this.passwordHash);
}

module.exports     = mongoose.model('User', userSchema);
