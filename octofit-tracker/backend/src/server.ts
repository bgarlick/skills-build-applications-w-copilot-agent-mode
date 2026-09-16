import express from 'express';
import { connectDatabase } from './config/database.js';
import { Activity } from './models/activity.js';
import { Leaderboard } from './models/leaderboard.js';
import { Team } from './models/team.js';
import { User } from './models/user.js';
import { Workout } from './models/workout.js';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.get('/api/users/', async (_request, response) => {
  response.json(await User.find().sort({ displayName: 1 }));
});

app.get('/api/teams/', async (_request, response) => {
  response.json(await Team.find().populate('members', 'username displayName'));
});

app.get('/api/activities/', async (_request, response) => {
  response.json(await Activity.find().populate('user', 'username displayName').sort({ completedAt: -1 }));
});

app.get('/api/leaderboard/', async (_request, response) => {
  response.json(await Leaderboard.find().populate('user', 'username displayName').sort({ rank: 1 }));
});

app.get('/api/workouts/', async (_request, response) => {
  response.json(await Workout.find().sort({ difficulty: 1, title: 1 }));
});

async function startServer() {
  try {
    await connectDatabase();
    app.listen(port, () => {
      console.log(`OctoFit Tracker API listening at ${apiBaseUrl}`);
    });
  } catch (error) {
    console.error('Error connecting to octofit_db:', error);
    process.exit(1);
  }
}

startServer();