import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';

import api from '~/services/api';

import Background from '~/components/Background';
import HeaderDefault from '~/components/HeaderDefault';
import Meetup from '~/components/Meetup';
import { Container, MeetupList, EmptyList, EmptyText } from './styles';

function Subscription({ isFocused }) {
  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadSubscriptions() {
    try {
      setLoading(true);
      const response = await api.get('subscriptions');

      setMeetups(response.data);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        Alert.alert('Error', err.response.data.error);
      } else {
        Alert.alert('Error', 'Unknown error, please try again later.');
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleUnsubscribe(id) {
    try {
      setLoading(true);
      await api.delete(`subscriptions/${id}`);

      Alert.alert('Sucess', 'Subscription canceled.');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        Alert.alert('Erro', err.response.data.error);
      } else {
        Alert.alert('Erro', 'Unknown error, please try again later.');
      }
    } finally {
      setLoading(false);
      loadSubscriptions();
    }
  }

  useEffect(() => {
    if (isFocused) {
      loadSubscriptions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <Background>
      <Container>
        <HeaderDefault />
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <MeetupList
            data={meetups}
            keyExtractor={item => String(item.id)}
            refreshing={loading}
            onRefresh={loadSubscriptions}
            renderItem={({ item }) => (
              <Meetup
                loading={loading}
                onSubmit={() => handleUnsubscribe(item.id)}
                data={item.Meetup}
              />
            )}
            ListEmptyComponent={() => (
              <EmptyList>
                <Icon name="mood-bad" size={56} color="#FFF" />
                <EmptyText>
                  There are no registered meetup for this day
                </EmptyText>
              </EmptyList>
            )}
          />
        )}
      </Container>
    </Background>
  );
}

Subscription.navigationOptions = {
  tabBarLabel: 'Subscriptions',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={22} color={tintColor} />
  ),
};

export default withNavigationFocus(Subscription);
