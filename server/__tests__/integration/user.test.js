import request from 'supertest';

import app from '../../src/app';
import truncate from '../utils/truncate';
import factory from '../factories';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to register', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'jhow paes',
        email: 'jhow@gmail.com',
        password: '1234567',
      });

    expect(response.body).toHaveProperty('id');
  });

  it('should not register case not inform the data', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'test',
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to register with duplicated email', async () => {
    await factory.create('User', {
      email: 'email@test.com',
    });

    const response = await request(app)
      .post('/users')
      .send({
        name: 'test',
        email: 'email@test.com',
        password: '1234567',
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to login without jwt token', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .put('/users')
      .send({
        name: user.name,
      });

    expect(response.status).toBe(401);
  });

  it('should be able to access private routes when authenticated', async () => {
    const user = await factory.create('User');

    const authUser = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: user.password,
      });

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${authUser.body.token}`)
      .send({
        name: user.name,
        email: user.email,
      });

    expect(response.status).toBe(200);
  });

  it('should user update password informing old password correct', async () => {
    const user = await factory.create('User', {
      password: '1234567',
    });

    const authUser = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: user.password,
      });

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${authUser.body.token}`)
      .send({
        oldPassword: '1234567',
        password: '19919191',
        confirmPassword: '19919191',
      });

    expect(response.status).toBe(200);
  });

  it('should dont user update password if inform old password incorrectly', async () => {
    const user = await factory.create('User', {
      password: '1234567',
    });

    const authUser = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: user.password,
      });

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${authUser.body.token}`)
      .send({
        oldPassword: '12341234',
        password: '19919191',
        confirmPassword: '19919191',
      });

    expect(response.status).toBe(401);
  });

  it('should dont user update email if email  is registered', async () => {
    await factory.create('User', {
      email: 'exists@test.com',
    });
    const user = await factory.create('User');

    const authUser = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: user.password,
      });

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${authUser.body.token}`)
      .send({
        name: user.name,
        email: 'exists@test.com',
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to access private routes when invalid is token', async () => {
    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer 12a123`);

    expect(response.status).toBe(401);
  });
});
