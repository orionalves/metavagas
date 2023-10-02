import { InferSchemaType, Schema, model } from 'mongoose'

const TechSearchSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2
    }
  },
  { timestamps: true }
)

type TypeTechSearch = InferSchemaType<typeof TechSearchSchema>

const TechSearch = model('TechSearch', TechSearchSchema)

export { TechSearch, TypeTechSearch }
