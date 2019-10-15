/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';

import Form from './MeetupForm';
import Detail from './Detail';

import { Container } from './styles';

export default function Meetup({ history }) {
  const { meetup, edit } = history.location.state;

  return (
    <Container>
      {edit ? (
        <Form meetup={meetup} edit={edit} />
      ) : meetup ? (
        <Detail meetup={meetup} />
      ) : (
        <Form />
      )}
    </Container>
  );
}

Meetup.propTypes = {
  meetup: PropTypes.objectOf(PropTypes.object),
  edit: PropTypes.bool,
  history: PropTypes.objectOf(PropTypes.object),
  location: PropTypes.objectOf(PropTypes.object),
  state: PropTypes.objectOf(PropTypes.object),
};

Meetup.defaultProps = {
  meetup: {},
  edit: false,
  history: {},
  location: {},
  state: {},
};
