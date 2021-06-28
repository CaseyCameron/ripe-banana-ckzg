import db from '../lib/utils/db.js';
// import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Reviewer from '../lib/models/Reviewer.js';
import Studio from '../lib/models/Studio.js';
import Film from '../lib/models/Film.js';
import Review from '../lib/models/Review.js';

describe.skip('demo routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  it('POSTS an reviewer', async () => {
    const res = await request(app)
      .post('/api/v1/reviewers')
      .send({
        name: 'Roger Ebert',
        company: 'Siskel & Ebert'
      });
      
    expect(res.body).toEqual({
      id: 1,
      name: 'Roger Ebert',
      company: 'Siskel & Ebert',
      updatedAt: expect.any(String),
      createdAt: expect.any(String),
    });
  });

  it('GET all reviewers', async() => {
    await Reviewer.create({
      name: 'Roger Ebert',
      company: 'Siskel & Ebert'
    });

    await Reviewer.create({
      name: 'Gene Siskel',
      company: 'Siskel & Ebert'
    });
        
    const res = await request(app)
      .get('/api/v1/reviewers');

    expect(res.body).toEqual([{
      id: 1,
      name: 'Roger Ebert',
      company: 'Siskel & Ebert'
    },
    {
      id: 2,
      name: 'Gene Siskel',
      company: 'Siskel & Ebert'
    }]);
  });

  it('GETS a reviewer by id', async () => {
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
    
    const review = await Review.create({
      rating: 1,
      FilmId: film.id,
      ReviewerId: reviewer.id,
      review: 'Terminator sucks!',
    });

    const res = await request(app).get(`/api/v1/reviewers/${reviewer.id}`);

    expect(res.body).toEqual({
      id: 1, name: 'Kara Pedersen', company: 'Pedersens reviews',
      Reviews: [{
        id: 1, rating: 1, review: review.review,
        Film: { id: film.id, title: film.title }
      }]
    });   
  });

});
