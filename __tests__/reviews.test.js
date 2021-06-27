import db from '../lib/utils/db.js';
import request from 'supertest';
import app from '../lib/app.js';
import Film from '../lib/models/Film.js';
import Review from '../lib/models/Review.js';
import Reviewer from '../lib/models/Reviewer.js';
import Studio from '../lib/models/Studio.js';

describe('demo routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
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
