import { InferSchemaType, Schema, model } from 'mongoose'

const TechSearchSchema = new Schema(
  {
    technology: {
      type: Schema.Types.ObjectId,
      ref: 'Technology',
      required: true
    },
    count: {
      type: Number,
      default: 0
    },
    cities: [
      {
        city: { type: Schema.Types.ObjectId, ref: 'City' },
        count: {
          type: Number,
          default: 0
        }
      }
    ]
  },
  { timestamps: true }
)

type TypeTechSearch = InferSchemaType<typeof TechSearchSchema>

const TechSearch = model('TechSearch', TechSearchSchema)

export { TechSearch, TypeTechSearch }
