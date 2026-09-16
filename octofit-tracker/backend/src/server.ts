import cors from 'cors';
import express from 'express';
import { apiBaseUrl, port } from './config/app';
import { connectDatabase } from './config/database';
import Activity from './models/Activity';
import Leaderboard from './models/Leaderboard';
import Team from './models/Team';
import User from './models/User';
import Workout from './models/Workout';
import { createResourceRouter } from './routes/createResourceRouter';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_request, response) => {
  response.json({ name: 'Octofit Tracker API', apiBaseUrl });
});

app.get('/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.use('/api/users', createResourceRouter(User));
app.use('/api/teams', createResourceRouter(Team));
app.use('/api/activities', createResourceRouter(Activity));
app.use('/api/leaderboard', createResourceRouter(Leaderboard));
app.use('/api/workouts', createResourceRouter(Workout));

app.listen(port, () => {
  console.log(`Octofit Tracker API listening at ${apiBaseUrl}`);
  void connectDatabase();
});

export default app;