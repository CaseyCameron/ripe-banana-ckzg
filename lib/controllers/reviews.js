import { Router } from 'express';
import Film from '../models/Film';
import Review from '../models/Review';

export default Router()
  .get('/', async (req, res, next) => {
    Review.findAll({
      include: {
        model: Film, as: 'FilmRef',
        attributes: ['id', 'title']
      }
    })
      .then(review => res.send(review))
      .catch(next);
  });
