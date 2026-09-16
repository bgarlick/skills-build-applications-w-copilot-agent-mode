import mongoose from 'mongoose';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Team from '../models/Team';
import User from '../models/User';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({})
    ]);

    const users = await User.create([
      { name: 'Maya Chen', email: 'maya.chen@example.com', goal: 'Run a half marathon' },
      { name: 'Jordan Brooks', email: 'jordan.brooks@example.com', goal: 'Build full-body strength' },
      { name: 'Priya Shah', email: 'priya.shah@example.com', goal: 'Improve mobility and balance' }
    ]);

    const teams = await Team.create([
      { name: 'Dawn Patrol', motto: 'Small steps, strong starts', members: [users[0]._id, users[1]._id], totalPoints: 420 },
      { name: 'Trail Blazers', motto: 'Find your next mile', members: [users[2]._id], totalPoints: 265 }
    ]);

    await Activity.create([
      { user: users[0]._id, team: teams[0]._id, type: 'Running', durationMinutes: 38, calories: 410, completedAt: new Date('2026-09-14T06:30:00Z') },
      { user: users[1]._id, team: teams[0]._id, type: 'Strength training', durationMinutes: 45, calories: 320, completedAt: new Date('2026-09-14T17:45:00Z') },
      { user: users[2]._id, team: teams[1]._id, type: 'Yoga', durationMinutes: 30, calories: 150, completedAt: new Date('2026-09-15T07:15:00Z') }
    ]);

    await Leaderboard.create([
      { user: users[0]._id, team: teams[0]._id, points: 240, rank: 1, period: 'September 2026' },
      { user: users[1]._id, team: teams[0]._id, points: 180, rank: 2, period: 'September 2026' },
      { user: users[2]._id, team: teams[1]._id, points: 165, rank: 3, period: 'September 2026' }
    ]);

    await Workout.create([
      {
        title: 'Starter Strength Circuit',
        description: 'A balanced circuit for building a consistent strength habit.',
        difficulty: 'Beginner',
        durationMinutes: 25,
        exercises: [
          { name: 'Bodyweight squat', sets: 3, reps: 12 },
          { name: 'Incline push-up', sets: 3, reps: 10 },
          { name: 'Dead bug', sets: 3, reps: 8 }
        ]
      },
      {
        title: 'Tempo Run Builder',
        description: 'Intervals that develop control and comfortable speed.',
        difficulty: 'Intermediate',
        durationMinutes: 35,
        exercises: [
          { name: 'Easy warm-up', sets: 1, reps: 8 },
          { name: 'Tempo interval', sets: 4, reps: 4 },
          { name: 'Cool-down walk', sets: 1, reps: 6 }
        ]
      }
    ]);

    console.log('Database seeding complete: users, teams, activities, leaderboard, and workouts populated');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
