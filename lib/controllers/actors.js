import { Router } from 'express';
import Actor from '../models/Actor';
import Film from '../models/Film';

export default Router()
  .post('/', async (req, res, next) => {
    Actor.create(req.body)
      .then(actor => res.send(actor))
      .catch(next);
  })
  .get('/', async (req, res, next) => {
    Actor.findAll({
      attributes: ['id', 'name']
    })
      .then(actors => res.send(actors))
      .catch(next);

  })
  .get('/:id', async (req, res, next) => {
    Actor.findByPk(req.params.id, {
      // attributes: {
      //   exclude: ['createdAt', 'updatedAt']
      // },
      include: {
        model: Film, //alias for film
        attributes: ['id', 'title', 'released']
      }
    })
      .then(actor => res.send(actor))
      .catch(next);
  });

