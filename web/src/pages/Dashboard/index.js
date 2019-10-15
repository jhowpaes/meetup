import React, { useEffect, useState } from 'react';
import { format, parseISO, toDate } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Empty, MeetupButton } from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function loadMeetup() {
      const response = await api.get('/organizing');

      const data = response.data.map(meetup => ({
        ...meetup,
        dateFormatted: format(
          parseISO(meetup.date),
          "dd 'de' MMMM', às' HH'h' ",
          {
            locale: pt,
          }
        ),
        date: toDate(parseISO(meetup.date)),
      }));

      setMeetups(data);
    }

    loadMeetup();
  }, []);

  function handleDetails(meetup) {
    history.push('/meetup/detail', { meetup });
  }

  function handleNew() {
    history.push('/meetup/new', { meetup: null });
  }

  return (
    <Container>
      <header>
        <h1>My meetups</h1>
        <button type="button" onClick={() => handleNew()}>
          New meetup
        </button>
      </header>

      <ul>
        {Object.keys(meetups).length > 0 ? (
          meetups.map(meetup => (
            <MeetupButton
              type="button"
              key={meetup.id}
              past={meetup.past}
              onClick={() => handleDetails(meetup)}
            >
              <li>
                <h3>{meetup.title}</h3>
                <span>{meetup.dateFormatted}</span>
              </li>
            </MeetupButton>
          ))
        ) : (
          <Empty>No registered Meetups</Empty>
        )}
      </ul>
    </Container>
  );
}
