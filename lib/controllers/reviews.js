import { Router } from 'express';
import Film from '../models/Film';
import Review from '../models/Review';

export default Router()
  .get('/', async (req, res, next) => {
    Review.findAll({
      attributes: ['id', 'rating', 'review'],
      include: [{
        model: Film,
        attributes: ['id', 'title']
      }]
    })
      .then(reviews => res.send(reviews))
      .catch(next);
  });
