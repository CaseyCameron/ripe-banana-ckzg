import db from '../lib/utils/db.js';
import request from 'supertest';
import app from '../lib/app.js';
import Film from '../lib/models/Film.js';
import Review from '../lib/models/Review.js';
import Reviewer from '../lib/models/Reviewer.js';
import Studio from '../lib/models/Studio.js';
import reviews from '../lib/controllers/reviews.js';

describe('demo routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  
  it('POST a review', async () => {
    const studio = await Studio.create({
      name: 'MGM',
      city: 'Los Angeles',
      state: 'California',
      country: 'USA'
    });

    const film = await Film.create({
      title: 'Terminator',
      StudioId: studio.id,
      released: 1993,
    });
    const reviewer = await Reviewer.create({
      name: 'Kara Pedersen',
      company: 'Pedersens reviews',

    });
    const res = await request(app)
      .post('/api/v1/reviews')
      .send({
        rating: 3,
        ReviewerId: reviewer.id,
        review: 'It was ok for the time period, but I like Arnold',
        FilmId: film.id
      });
    
    expect(res.body).toEqual({
      id: 1,
      rating: 3,
      ReviewerId: reviewer.id,
      review: 'It was ok for the time period, but I like Arnold',
      FilmId: film.id
    });
  });
  
  it('GET all reviews', async() => {
    const studio = await Studio.create({
      name: 'MGM',
      city: 'Los Angeles',
      state: 'California',
      country: 'USA'
    });

    const film = await Film.create({
      title: 'Terminator',
      StudioId: studio.id,
      released: 1993,
    });

    // const reviewer = await Reviewer.create({
    //   name: 'Roger Ebert',
    //   company: 'Siskel & Ebert'
    // });
    
    const review = await Review.create({
      rating: 4,
      FilmId: film.id,
      //reviewer: reviewer.name,
      review: 'Terminator is good!',
    });

    // await review.addFilm(film);
    
    const res = await request(app)
      .get('/api/v1/reviews');

    expect(res.body).toEqual([{
      id: 1, rating: 4, review: 'Terminator is good!',
      Film: { id: 1, title: 'Terminator' }
    }]);
  });
});
