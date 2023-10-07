import { InferSchemaType, Schema, model } from 'mongoose'

const JobSchema = new Schema(
  {
    position: {
      type: String,
      required: true
    },
    company: {
      type: String,
      required: true
    },
    technologies: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Technology',
        required: true
      }
    ],
    city: {
      type: Schema.Types.ObjectId,
      ref: 'City',
      required: true
    },
    link: {
      type: String,
      required: true
    },
    jobType: {
      type: String,
      required: true,
      enum: ['remote', 'office', 'hybrid']
    },
    workRegime: {
      type: String,
      required: true,
      enum: ['clt', 'pj']
    },
    companySize: {
      type: String,
      required: true,
      enum: ['small', 'mid-level', 'large']
    },
    salary: {
      type: Number,
      required: true
    },
    experienceLevel: {
      type: String,
      required: true,
      enum: ['junior', 'mid-level', 'senior']
    },
    description: {
      type: String,
      require: true
    }
  },
  { timestamps: true }
)

type TypeJob = InferSchemaType<typeof JobSchema>

const Job = model('Job', JobSchema)

export { Job, TypeJob }
