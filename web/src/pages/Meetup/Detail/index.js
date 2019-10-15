import React from 'react';
import Proptypes from 'prop-types';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import {
  Container,
  ButtonEdit,
  ButtonCancel,
  MeetupDetail,
  MeetupFooter,
} from './styles';

export default function Detail({ meetup }) {
  function handleEdit() {
    history.push('/meetup/edit', { meetup, edit: true });
  }

  async function handleCancel() {
    try {
      await api.delete(`/meetups/${meetup.id}`);
      toast.success('Meetup successfully canceled.');

      history.push('/dashboard');
    } catch (err) {
      toast.error('There was an error canceling, please try again later.');
    }
  }

  return (
    <Container>
      <header>
        <h1>{meetup.title}</h1>
        <aside>
          <ButtonEdit
            disabled={meetup.past}
            type="button"
            onClick={() => handleEdit()}
          >
            Edit
          </ButtonEdit>
          <ButtonCancel
            disabled={meetup.past}
            type="button"
            onClick={() => handleCancel()}
          >
            Cancel
          </ButtonCancel>
        </aside>
      </header>
      <MeetupDetail>
        <img src={meetup.banner.url} alt="Banner Meetup" />
        <p>{meetup.description}</p>
      </MeetupDetail>
      <MeetupFooter>
        <span>{meetup.dateFormatted}</span>
        <span>{meetup.localization}</span>
      </MeetupFooter>
    </Container>
  );
}

Detail.propTypes = {
  meetup: Proptypes.objectOf(Proptypes.object).isRequired,
};
