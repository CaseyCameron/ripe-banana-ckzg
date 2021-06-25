
import db from '../lib/utils/db.js';
// import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Studio from '../lib/models/Studio.js';
import Film from '../lib/models/Film.js';

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

  it('GETs all films with studio, studio id & studio name', async () => {
    const studio1 = await Studio.create({
      name: 'MGM',
      city: 'Los Angeles',
      state: 'California',
      country: 'USA'
    });

    const studio2 = await Studio.create({
      name: 'MGV',
      city: 'Lost',
      state: 'Oregon',
      country: 'USA'
    });

    await Film.create({
      title: 'Fast & Furious',
      StudioId: studio1.id,
      released: 2017,
    });

    await Film.create({
      title: 'Slow & Furious',
      StudioId: studio2.id,
      released: 2017,
    });

    const res = await request(app).get('/api/v1/films/');

    expect(res.body).toEqual([
      {
        id: 1, title: 'Fast & Furious',
        released: 2017,
        Studio: { id: studio1.id, name: studio1.name },
        StudioId: 1,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
      {
        id: 2, title: 'Slow & Furious',
        released: 2017,
        Studio: { id: studio2.id, name: studio2.name },
        StudioId: 2,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }
    ],
    );
  });
});

