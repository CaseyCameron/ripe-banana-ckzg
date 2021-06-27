import db from '../lib/utils/db.js';
// import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Reviewer from '../lib/models/Reviewer.js';

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
});
