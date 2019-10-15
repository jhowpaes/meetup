import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';
import * as Yup from 'yup';

import api from '~/services/api';
import history from '~/services/history';

import BannerInput from './BannerInput';
import DatePicker from './DatePicker';
import { Container, FormButton } from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  date: Yup.date()
    .min(new Date(), 'Past date and time are not allowed')
    .required('Date is required'),
  localization: Yup.string().required('Location is required'),
  banner_id: Yup.number('Banner is required'),
});

export default function MeetupForm({ meetup, edit }) {
  async function handleSubmit(formData) {
    try {
      if (edit) {
        await api.put(`/meetups/${meetup.id}`, { ...formData });
        toast.success('Successfully changed Meetup.');
      } else {
        await api.post('/meetups', { ...formData });
        toast.success('Successfully create Meetup.');
      }
      history.push('/dashboard');
    } catch (err) {
      toast.error('An error occurred while saving, please check the data.');
    }
  }

  return (
    <Container>
      <header>
        <h1>New Meetup</h1>
      </header>
      <Form
        initialData={meetup}
        schema={schema}
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <BannerInput name="banner_id" />
        <Input name="title" placeholder="Meetup Title" />
        <Input
          multiline
          name="description"
          rows={10}
          placeholder="Meetup Description"
        />
        <DatePicker name="date" />
        <Input name="localization" placeholder="Meetup Localization" />
        <FormButton type="submit">
          <MdAddCircleOutline size={20} color="#fff" />
          Save Meetup
        </FormButton>
      </Form>
    </Container>
  );
}

MeetupForm.propTypes = {
  meetup: PropTypes.objectOf(PropTypes.object),
  edit: PropTypes.bool,
};

MeetupForm.defaultProps = {
  meetup: {},
  edit: false,
};
