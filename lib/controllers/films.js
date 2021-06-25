import { Router } from 'express';
import Film from '../models/Film';
import Studio from '../models/Studio';

export default Router()
  .post('/', async (req, res, next) => {
    Film.create(req.body)
      .then(film => res.send(film))
      .catch(next);
  })

  .get('/', async (req, res, next) => {
    Film.findAll({
      include: {
        model: Studio,
        attributes: ['id', 'name']
      }
    })
      .then(film => res.send(film))
      .catch(next);
  });

