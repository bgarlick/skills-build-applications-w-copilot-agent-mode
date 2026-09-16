import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		avatar: { type: String, default: '' },
		goal: { type: String, required: true }
	},
	{ timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', userSchema);