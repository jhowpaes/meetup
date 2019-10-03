import request from 'supertest';

import app from '../../src/app';
import truncate from '../utils/truncate';
import factory from '../factories';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to create meetup', async () => {
    const user = await factory.create('User');

    const authUser = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: user.password,
      });

    const response = await request(app)
      .post('/meetups')
      .set('Authorization', `Bearer ${authUser.body.token}`)
      .send({
        title: 'test title',
        description: 'description test',
        localization: 'localization test',
        date: new Date(),
      });

    expect(response.status).toBe(200);
  });
});
