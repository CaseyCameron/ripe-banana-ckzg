import db from '../lib/utils/db.js';
// import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Actor from '../lib/models/Actor.js';

describe('demo routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  it('POSTS an actor', async () => {
    const res = await request(app)
      .post('/api/v1/actors')
      .send({
        name: 'Brad Pitt',
        dob: new Date(1963, 12, 18),
        pob: 'Shawnee, Oklahoma'
      });
      
    expect(res.body).toEqual({
      id: 1,
      name: 'Brad Pitt',
      dob: new Date(1963, 12, 18).toISOString(),
      pob: 'Shawnee, Oklahoma',
      updatedAt: expect.any(String),
      createdAt: expect.any(String),
    });
  });

  it('GET all actors', async () => {
    const actor1 = await Actor.create({
      name: 'Brad Pitt',
      dob: new Date(1963, 12, 18),
      pob: 'Shawnee, Oklahoma'
    });

    const actor2 = await Actor.create({
      name: 'Angelina Jolie',
      dob: new Date(1975, 6, 4),
      pob: 'Los Angeles, California'
    });

    const res = await request(app)
      .get('/api/v1/actors');

    expect(res.body).toEqual([{
      id: 1, 
      name: 'Brad Pitt' 
    },
    {
      id: 2,
      name: 'Angelina Jolie'
    }]);
    
  });
});
