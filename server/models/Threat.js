import mongoose from 'mongoose'

const threatSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide threat title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide threat description'],
    },
    severity: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      required: true,
    },
    device: {
      type: String,
      required: true,
    },
    ipAddress: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Investigating', 'Resolved', 'Blocked'],
      default: 'Pending',
    },
    detectedAt: {
      type: Date,
      default: Date.now,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Threat', threatSchema)
