import { InferSchemaType, Schema, model } from 'mongoose'

const CitySearchSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2
    }
  },
  { timestamps: true }
)

type TypeCitySearch = InferSchemaType<typeof CitySearchSchema>

const CitySearch = model('CitySearch', CitySearchSchema)

export { CitySearch, TypeCitySearch }
