import { Router } from 'express';
import Actor from '../models/Actor';

export default Router()
  .post('/', async (req, res, next) => {
    Actor.create(req.body)
      .then(actor => res.send(actor))
      .catch(next);
  });
//this is a comment
