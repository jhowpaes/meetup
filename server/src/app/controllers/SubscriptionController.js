import { Op } from 'sequelize';

import Subscription from '../models/Subscription';
import User from '../models/User';
import File from '../models/File';
import Meetup from '../models/Meetup';

import SubscriptionMail from '../jobs/SubscriptionMail';
import Queue from '../../lib/Queue';

class SubscriptionController {
  async index(req, res) {
    const subscriptions = await Subscription.findAll({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: Meetup,
          attributes: [
            'id',
            'past',
            'title',
            'description',
            'localization',
            'date',
          ],
          include: [
            { model: File, as: 'banner', attributes: ['id', 'path', 'url'] },
            { model: User, as: 'user', attributes: ['name', 'email'] },
          ],
          where: {
            date: {
              [Op.gt]: new Date(),
            },
          },
          required: true,
        },
      ],
      order: [[Meetup, 'date']],
    });

    if (!subscriptions) {
      return res.status(400).json({ error: 'Not subscribed to any meetup' });
    }

    return res.json(subscriptions);
  }

  async store(req, res) {
    const user = await User.findByPk(req.userId);
    const meetup = await Meetup.findByPk(req.params.meetupId, {
      include: [{ model: User, as: 'user' }],
    });

    if (!meetup) {
      return res.status(404).json({ error: 'Meetup Not found' });
    }

    if (meetup.user_id === req.userId) {
      return res
        .status(400)
        .json({ error: 'Unable to sign up for your own meetings' });
    }

    if (meetup.past) {
      return res
        .status(400)
        .json({ error: 'Unable to sign up for past meetings' });
    }

    const checkDate = await Subscription.findOne({
      where: {
        user_id: user.id,
      },
      include: [
        {
          model: Meetup,
          required: true,
          where: {
            date: meetup.date,
          },
        },
      ],
    });

    if (checkDate) {
      return res.status(400).json({
        error: 'You cannot sign up for two meetings at the same time.',
      });
    }

    const subscription = await Subscription.create({
      user_id: user.id,
      meetup_id: meetup.id,
    });

    await Queue.add(SubscriptionMail.key, {
      meetup,
      user,
    });

    return res.json(subscription);
  }

  async destroy(req, res) {
    const { meetupId } = req.params;

    const subscription = await Subscription.findOne({
      where: {
        user_id: req.userId,
        meetup_id: meetupId,
      },
    });

    if (!subscription) {
      return res
        .status(401)
        .json({ error: 'You are not subscribed to this meetup.' });
    }

    await subscription.destroy();

    return res.send();
  }
}

export default new SubscriptionController();
