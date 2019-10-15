import React from 'react';
import Proptypes from 'prop-types';
import { toast } from 'react-toastify';
import { MdEdit, MdDeleteForever, MdEvent, MdPlace } from 'react-icons/md';

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
            <MdEdit size={20} color="#FFF" />
            Edit
          </ButtonEdit>
          <ButtonCancel
            disabled={meetup.past}
            type="button"
            onClick={() => handleCancel()}
          >
            <MdDeleteForever size={20} color="#FFF" />
            Cancel
          </ButtonCancel>
        </aside>
      </header>
      <MeetupDetail>
        <img src={meetup.banner.url} alt="Banner Meetup" />
        <p>{meetup.description}</p>
      </MeetupDetail>
      <MeetupFooter>
        <span>
          <MdEvent size={20} color="#999" />
          {meetup.dateFormatted}
        </span>
        <span>
          <MdPlace size={20} color="#999" />
          {meetup.localization}
        </span>
      </MeetupFooter>
    </Container>
  );
}

Detail.propTypes = {
  meetup: Proptypes.objectOf(Proptypes.object).isRequired,
};
