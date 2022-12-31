import mongoose from 'mongoose'

const { Schema } = mongoose;
const UserSchema = Schema({
  email: String,
  password: { type: String, select: false },
  name: String,
  cargo: String,
  estado: Boolean,
},
  {
    collection: 'users'
  }
);

export const User = mongoose.model('User', UserSchema)
