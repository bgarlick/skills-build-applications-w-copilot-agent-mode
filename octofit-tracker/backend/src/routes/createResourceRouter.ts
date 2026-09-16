import { Router } from 'express';
import { Model } from 'mongoose';

export const createResourceRouter = (model: Model<unknown>): Router => {
  const router = Router();

  router.get('/', async (_request, response) => {
    try {
      response.json(await model.find().lean());
    } catch (error) {
      response.status(500).json({ error: 'Unable to load resources', details: error });
    }
  });

  router.post('/', async (request, response) => {
    try {
      const resource = await model.create(request.body);
      response.status(201).json(resource);
    } catch (error) {
      response.status(400).json({ error: 'Unable to create resource', details: error });
    }
  });

  return router;
};