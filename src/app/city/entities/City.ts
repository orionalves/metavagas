import { InferSchemaType, Schema, model } from 'mongoose'

const CitySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2
    }
  },
  { timestamps: true }
)

type TypeCity = InferSchemaType<typeof CitySchema>

const City = model('City', CitySchema)

export { City, TypeCity }
