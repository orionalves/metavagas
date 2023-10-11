import { InferSchemaType, Schema, model } from 'mongoose'

const TechSearchSchema = new Schema(
  {
    technology: {
      type: String,
      required: true
    },
    cities: [
      {
        type: String,
        default: undefined
      }
    ]
  },
  { timestamps: true }
)

type TypeTechSearch = InferSchemaType<typeof TechSearchSchema>

const TechSearch = model('TechSearch', TechSearchSchema)

export { TechSearch, TypeTechSearch }
