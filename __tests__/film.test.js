
import db from '../lib/utils/db.js';
// import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Studio from '../lib/models/Studio.js';

describe('demo routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  it('POSTS a film', async () => {
    const studio = await Studio.create({
      name: 'MGM',
      city: 'Los Angeles',
      state: 'California',
      country: 'USA'
    });
    const res = await request(app)
      .post('/api/v1/films')
      .send({
        title: 'Fast & Furious',
        StudioId: studio.id,
        released: 2017,
      });

    expect(res.body).toEqual({
      id: 1,
      title: 'Fast & Furious',
      //change StudioId: back to studio:
      StudioId: 1,
      released: 2017,
      updatedAt: expect.any(String),
      createdAt: expect.any(String)
    });
  });
});

// {
//   title: <title of film RS>,
//   studio: <studio id RI>,
//   released: <4-digit year RN>
// }
