import { InferSchemaType, Schema, model } from 'mongoose'

const TechnologySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2
    }
  },
  { timestamps: true }
)

type TypeTechnology = InferSchemaType<typeof TechnologySchema>

const Technology = model('Technology', TechnologySchema)

export { Technology, TypeTechnology }
