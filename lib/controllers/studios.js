import { Router } from 'express';
import Studio from '../models/Studio';

export default Router()
  .post('/', async (req, res, next) => {
    Studio.create(req.body)
      .then(studio => res.send(studio))
      .catch(next);
  })

  .get('/', async (req, res, next) => {
    Studio.findAll()
      .then(studios => res.send(studios))
      .catch(next);
  });
