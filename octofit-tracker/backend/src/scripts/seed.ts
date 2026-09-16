import mongoose from 'mongoose';
import { Activity } from '../models/activity.js';
import { Leaderboard } from '../models/leaderboard.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { username: 'alex.chen', email: 'alex.chen@example.com', displayName: 'Alex Chen' },
      { username: 'jordan.rivera', email: 'jordan.rivera@example.com', displayName: 'Jordan Rivera' },
      { username: 'samira.patel', email: 'samira.patel@example.com', displayName: 'Samira Patel' },
    ]);

    await Team.create([
      {
        name: 'Summit Striders',
        description: 'A consistent crew training for stronger climbs and longer runs.',
        members: [users[0]._id, users[1]._id],
        totalPoints: 1840,
      },
      {
        name: 'Early Birds',
        description: 'Morning movement, shared accountability, and steady progress.',
        members: [users[2]._id],
        totalPoints: 1260,
      },
    ]);

    await Activity.create([
      { user: users[0]._id, type: 'run', durationMinutes: 42, distanceKm: 6.4, calories: 490, completedAt: new Date('2026-09-15T07:15:00Z') },
      { user: users[1]._id, type: 'strength', durationMinutes: 35, calories: 280, completedAt: new Date('2026-09-15T17:30:00Z') },
      { user: users[2]._id, type: 'ride', durationMinutes: 58, distanceKm: 18.2, calories: 610, completedAt: new Date('2026-09-14T06:45:00Z') },
    ]);

    await Leaderboard.create([
      { user: users[0]._id, points: 980, weeklyActivities: 5, rank: 1 },
      { user: users[1]._id, points: 860, weeklyActivities: 4, rank: 2 },
      { user: users[2]._id, points: 720, weeklyActivities: 4, rank: 3 },
    ]);

    await Workout.create([
      {
        title: 'Foundation Strength',
        description: 'A full-body session focused on controlled compound movements.',
        category: 'strength',
        difficulty: 'beginner',
        durationMinutes: 30,
        exercises: ['Bodyweight squats', 'Incline push-ups', 'Glute bridges', 'Dead bugs'],
      },
      {
        title: 'Tempo Run Builder',
        description: 'Build aerobic power with a warm-up, tempo block, and cooldown.',
        category: 'cardio',
        difficulty: 'intermediate',
        durationMinutes: 45,
        exercises: ['Easy warm-up', 'Tempo intervals', 'Walking cooldown'],
      },
      {
        title: 'Desk Reset Mobility',
        description: 'Release hips, shoulders, and spine after a long day of sitting.',
        category: 'mobility',
        difficulty: 'beginner',
        durationMinutes: 15,
        exercises: ['Cat-cow', '90/90 switches', 'Thread the needle', 'Couch stretch'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
