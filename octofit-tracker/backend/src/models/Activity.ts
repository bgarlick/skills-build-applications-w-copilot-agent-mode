import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
		team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
		type: { type: String, required: true },
		durationMinutes: { type: Number, required: true, min: 1 },
		calories: { type: Number, required: true, min: 0 },
		completedAt: { type: Date, required: true }
	},
	{ timestamps: true }
);

export default mongoose.models.Activity || mongoose.model('Activity', activitySchema);