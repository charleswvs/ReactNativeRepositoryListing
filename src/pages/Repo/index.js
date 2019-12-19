import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {WebView} from 'react-native-webview';

export default class Repo extends Component {
  state = {
    repository: [],
  };

  componentDidMount() {
    const {navigation} = this.props;

    const repository = navigation.getParam('repo');
    this.setState({
      repository,
    });
  }

  render() {
    const {repository} = this.state;

    return <WebView source={{uri: repository.html_url}} style={{flex: 1}} />;
  }
}

Repo.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};
