import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Background from '~/components/Background';
import {
  Container,
  Card,
  Banner,
  Details,
  Title,
  TextDetails,
  Text,
  SubmitButton,
} from './styles';

export default function Meetup({ data, loading, isDashboard, onSubmit }) {
  const dateFormatted = format(parseISO(data.date), "d 'de' MMMM', às' HH'h'", {
    locale: pt,
  });

  return (
    <Background>
      <Container>
        <Card>
          <Banner
            source={{
              uri: data.banner
                ? data.banner.url
                : `https://api.adorable.io/avatar/50/${data.date}.png`,
            }}
          />
          <Details>
            <Title>{data.title}</Title>
            <TextDetails>
              <Icon name="event" size={14} color="#999" />
              <Text>{dateFormatted}</Text>
            </TextDetails>
            <TextDetails>
              <Icon name="place" size={14} color="#999" />
              <Text>{data.localization}</Text>
            </TextDetails>
            <TextDetails>
              <Icon name="person" size={14} color="#999" />
              <Text>Organizer: {data.user.name}</Text>
            </TextDetails>

            <SubmitButton past={data.past} loading={loading} onPress={onSubmit}>
              {isDashboard ? 'Register' : 'Unsubscribe'}
            </SubmitButton>
          </Details>
        </Card>
      </Container>
    </Background>
  );
}

Meetup.propTypes = {
  data: PropTypes.shape({
    date: PropTypes.string.isRequired,
    banner: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
    title: PropTypes.string.isRequired,
    localization: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    past: PropTypes.bool,
  }).isRequired,
  isDashboard: PropTypes.bool,
  loading: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
};

Meetup.defaultProps = {
  isDashboard: false,
  loading: false,
};
