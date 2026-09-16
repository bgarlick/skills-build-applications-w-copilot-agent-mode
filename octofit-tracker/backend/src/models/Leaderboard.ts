import mongoose from 'mongoose';

const leaderboardSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
		team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
		points: { type: Number, required: true, min: 0 },
		rank: { type: Number, required: true, min: 1 },
		period: { type: String, required: true }
	},
	{ timestamps: true }
);

export default mongoose.models.Leaderboard || mongoose.model('Leaderboard', leaderboardSchema);