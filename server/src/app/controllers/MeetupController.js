import * as Yup from 'yup';

import Meetup from '../models/Meetup';
import File from '../models/File';
import User from '../models/User';

class MeetupController {
  async index(req, res) {
    const meetups = await Meetup.findAll({
      attributes: ['title', 'description', 'localization', 'date'],
      include: [
        { model: File, as: 'banner', attributes: ['name', 'path', 'url'] },
        { model: User, as: 'user', attributes: ['name', 'email'] },
      ],
    });

    return res.json(meetups);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      localization: Yup.string().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: 'Validation fails.' });
    }

    const { title, description, localization, date, banner_id } = req.body;

    const meetup = await Meetup.create({
      user_id: req.userId,
      title,
      description,
      localization,
      date,
      banner_id,
    });

    return res.json(meetup);
  }
}

export default new MeetupController();
