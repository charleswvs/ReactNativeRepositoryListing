import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Keyboard, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';

import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
} from './styles';

export default class Main extends Component {
  state = {
    newUser: '',
    users: [],
    loading: false,
  };

  async componentDidMount() {
    const users = await AsyncStorage.getItem('users');

    if (users) {
      this.setState({users: JSON.parse(users)});
    }
  }

  componentDidUpdate(_, prevState) {
    const {users} = this.state;
    if (prevState.users !== users) {
      AsyncStorage.setItem('users', JSON.stringify(users));
    }
  }

  handleAddUser = async () => {
    const {users, newUser} = this.state;

    this.setState({loading: true});

    // TODO Try catch here
    const response = await api.get(`/users/${newUser}`);

    const data = {
      name: response.data.name,
      login: response.data.login,
      avatar: response.data.avatar_url,
      bio: response.data.bio,
    };

    this.setState({
      users: [...users, data],
      newUser: '',
      loading: false,
    });

    Keyboard.dismiss();
  };

  handleNavigation = user => {
    const {navigation} = this.props;

    navigation.navigate('User', {user});
  };

  static navigationOptions = {
    title: `Users`,
  };

  render() {
    const {users, newUser, loading} = this.state;
    return (
      <>
        <Container>
          <Form>
            <Input
              autoCorrect={false}
              autoCaptalize="none"
              placeholder="Add user name"
              value={newUser}
              onChangeText={text => this.setState({newUser: text})}
              returnKeyType="send"
              onSubmitEditing={this.handleAddUser}
            />
            {/** on react native there is no "submit" event, so you can use a
    "onPress" (not "onClick") event to do it
    TODO: Prevent button from being clicked twice
    TODO: Don't seach the api if the text is empty
  */}
            <SubmitButton loading={loading} onPress={this.handleAddUser}>
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Icon name="add" size={20} color="#FFF" />
              )}
            </SubmitButton>
          </Form>
          <List
            data={users}
            keyExtractor={user => user.login}
            renderItem={({item}) => (
              <User>
                <Avatar source={{uri: item.avatar}} />
                <Name>{item.name}</Name>
                <Bio>{item.bio}</Bio>

                <ProfileButton onPress={() => this.handleNavigation(item)}>
                  <ProfileButtonText>See Profile</ProfileButtonText>
                </ProfileButton>
              </User>
            )}
          />
        </Container>
      </>
    );
  }
}

// propTypes validation, so you know you have the right info
Main.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
