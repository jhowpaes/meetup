import request from 'supertest';

import app from '../../src/app';
import truncate from '../utils/truncate';
import factory from '../factories';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  // TODO: delete file after test
  it('should be able to create file', async () => {
    const user = await factory.create('User');

    const authUser = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: user.password,
      });

    const filePath = `${__dirname}/fixture/test-img.jpg`;

    const response = await request(app)
      .post('/files')
      .set('Authorization', `Bearer ${authUser.body.token}`)
      .attach('file', filePath);

    expect(response.status).toBe(200);

    // fs.unlinkSync(`/uploads/${response.body.path}`);
  });
});
