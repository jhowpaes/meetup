import request from 'supertest';

import app from '../../src/app';
import truncate from '../utils/truncate';
import factory from '../factories';

describe('Authentication', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should authenticate with valid credentials', async () => {
    await factory.create('User', {
      email: 'ok@test.com',
      password: '1234567',
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'ok@test.com',
        password: '1234567',
      });

    expect(response.status).toBe(200);
  });

  it('should user not found', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'test3@test.com',
        password: user.password,
      });

    expect(response.status).toBe(401);
  });

  it('should user typed password not equals registered', async () => {
    const user = await factory.create('User', {
      password: '1234567',
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '1231233',
      });

    expect(response.status).toBe(401);
  });

  it('should authenticate with invalid credentials', async () => {
    const user = await factory.create('User', {
      password: '1231233',
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456778',
      });

    expect(response.status).toBe(401);
  });

  it('should to log in with jwt token', async () => {
    const user = await factory.create('User', {
      password: '1234567',
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '1234567',
      });

    expect(response.body).toHaveProperty('token');
  });
});
