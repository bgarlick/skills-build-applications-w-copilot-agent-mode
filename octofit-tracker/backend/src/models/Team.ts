import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		motto: { type: String, required: true },
		members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
		totalPoints: { type: Number, default: 0 }
	},
	{ timestamps: true }
);

export default mongoose.models.Team || mongoose.model('Team', teamSchema);