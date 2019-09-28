import bcrypt from 'bcryptjs';

import factory from '../factories';
import truncate from '../utils/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should encrypt user password when new user created', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const compareHash = await bcrypt.compare('123456', user.password_hash);

    expect(compareHash).toBe(true);
  });

  it('should user password does not match', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const comparePassword = await user.checkPassword(user.password);

    expect(comparePassword).toBe(true);
  });
});
