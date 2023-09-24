import { InferSchemaType, Schema, model } from 'mongoose'

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2
    },
    email: {
      type: String,
      unique: true,
      required: true,
      minLength: 6
    },
    password: {
      type: String,
      required: true,
      minLength: 8
    }
  },
  { timestamps: true }
)

type TypeUser = InferSchemaType<typeof UserSchema>

const User = model('User', UserSchema)

export { User, TypeUser }
