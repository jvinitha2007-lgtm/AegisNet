import mongoose from 'mongoose'

const deviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide device name'],
      trim: true,
    },
    type: {
      type: String,
      enum: ['Laptop', 'Mobile', 'Desktop', 'Server', 'Router', 'IoT Device'],
      required: true,
    },
    ipAddress: {
      type: String,
      required: [true, 'Please provide IP address'],
      match: [/^(\d{1,3}\.){3}\d{1,3}$/, 'Please provide a valid IP address'],
    },
    operatingSystem: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Online', 'Offline', 'Idle'],
      default: 'Online',
    },
    lastActive: {
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

export default mongoose.model('Device', deviceSchema)
