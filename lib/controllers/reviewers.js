import { Router } from 'express';
import Reviewer from '../models/Reviewer';

export default Router()
  .post('/', async (req, res, next) => {
    Reviewer.create(req.body)
      .then(reviewer => res.send(reviewer))
      .catch(next);
  });
