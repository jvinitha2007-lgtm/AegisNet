import mongoose from 'mongoose'

const alertSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide alert title'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Please provide alert message'],
    },
    severity: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      required: true,
    },
    status: {
      type: String,
      enum: ['Unread', 'Read', 'Resolved'],
      default: 'Unread',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Alert', alertSchema)
