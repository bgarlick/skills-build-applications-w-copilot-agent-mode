import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
		durationMinutes: { type: Number, required: true, min: 1 },
		exercises: [
			{
				name: { type: String, required: true },
				sets: { type: Number, required: true, min: 1 },
				reps: { type: Number, required: true, min: 1 }
			}
		]
	},
	{ timestamps: true }
);

export default mongoose.models.Workout || mongoose.model('Workout', workoutSchema);