import React, { useState, useMemo, useEffect } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import { format, addDays, subDays } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';
import Background from '~/components/Background';
import Meetup from '~/components/Meetup';
import HeaderDefault from '~/components/HeaderDefault';

import {
  Container,
  Header,
  HButton,
  HDate,
  MeetupList,
  EmptyItem,
  EmptyText,
} from './styles';

const perPage = 10;

function Dashboard({ isFocused }) {
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM", { locale: pt }),
    [date]
  );

  async function handleSubmit(id) {
    try {
      setMeetups(
        meetups.map(meetup => ({
          ...meetup,
          loading: meetup.id === id,
        }))
      );
      await api.post(`meetups/${id}/subscriptions`);

      Alert.alert('Success', 'Registration done');
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

  async function loadMeetups() {
    if (total && page > total) return;
    try {
      setLoading(true);
      const response = await api.get('meetups', {
        params: { page, date: format(date, 'yyyy-MM-dd') },
      });

      const { data } = response;

      const totalMeetups = await response.data.lenght;

      setTotal(Math.ceil(totalMeetups / perPage));
      setMeetups(page >= 2 ? [...meetups, ...data] : data);
      setPage(page + 1);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        Alert.alert('Error', err.response.data.error);
      } else {
        Alert.alert('Error', 'Unknown error, please try again later.');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  function refreshList() {
    setTotal(0);
    setLoading(true);
    setRefreshing(true);
    loadMeetups();
  }

  useEffect(() => {
    if (isFocused) {
      loadMeetups();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, isFocused]);

  function handleNext() {
    setMeetups([]);
    setPage(1);
    setTotal(0);
    setLoading(true);
    setDate(addDays(date, 1));
  }

  function handlePrevius() {
    setMeetups([]);
    setPage(1);
    setTotal(0);
    setLoading(true);
    setDate(subDays(date, 1));
  }

  return (
    <Background>
      <HeaderDefault />
      <Container>
        <Header>
          <HButton onPress={handlePrevius}>
            <Icon name="chevron-left" size={26} color="#fff" />
          </HButton>
          <HDate>{dateFormatted}</HDate>
          <HButton onPress={handleNext}>
            <Icon name="chevron-right" size={26} color="#fff" />
          </HButton>
        </Header>
        <MeetupList
          data={meetups}
          keyExtractor={item => String(item.id)}
          onEndReachedThreshold={0.2}
          onEndReached={() => loadMeetups()}
          refreshing={refreshing}
          onRefresh={() => refreshList()}
          ListLoadingComponent={
            loading && <ActivityIndicator size="large" color="#fff" />
          }
          renderItem={({ item }) => (
            <Meetup
              isDashboard
              loading={loading}
              onSubmit={() => handleSubmit(item.id)}
              data={item}
            />
          )}
          ListEmptyComponent={() =>
            !loading && (
              <EmptyItem>
                <Icon name="mood-bad" size={56} color="#FFF" />
                <EmptyText>
                  There are no registered meetup for this day
                </EmptyText>
              </EmptyItem>
            )
          }
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};

Dashboard.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Dashboard);
