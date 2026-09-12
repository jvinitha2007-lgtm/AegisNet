import mongoose from 'mongoose'

const reportSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ['Security', 'Threat', 'Network', 'Device', 'Monthly'],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Report', reportSchema)
