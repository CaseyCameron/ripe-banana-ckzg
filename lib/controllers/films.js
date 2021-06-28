import { Router } from 'express';
import Actor from '../models/Actor';
import Film from '../models/Film';
import Review from '../models/Review';
import Reviewer from '../models/Reviewer';
import Studio from '../models/Studio';

export default Router()
  .post('/', async (req, res, next) => {
    Film.create(req.body)
      .then(film => res.send(film))
      .catch(next);
  })
  .get('/:id', async (req, res, next) => {
    Film.findByPk(req.params.id, {
      attributes: ['title', 'released'],
      include: [
        {
          model: Studio,
          attributes: ['id', 'name']
        },
        {
          model:Actor,
          attributes: ['id', 'name'],
          through: { attributes: [] }
        },
        {
          model: Review,
          attributes: { 
            exclude: ['ReviewerId', 'FilmId'],
          },
          
          include: { 
            model: Reviewer,
            attributes: ['id', 'name'] 
          }
        }
      ]
      
    })
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

