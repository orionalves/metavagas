import { InferSchemaType, Schema, model } from 'mongoose'

const JobSchema = new Schema(
  {
    jobTitle: {
      type: String,
      required: true
    },
    technologies: [
      {
        type: String
      }
    ],
    location: {
      type: String,
      required: true
    },
    jobType: {
      type: String
    },
    workRegime: {
      type: String
    },
    companySize: {
      type: String
    },
    salary: {
      type: Number
    },
    experienceLevel: {
      type: String
    }
  },
  { timestamps: true }
)

type TypeJob = InferSchemaType<typeof JobSchema>

const Job = model('Job', JobSchema)

export { Job, TypeJob }
