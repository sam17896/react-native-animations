// @flow
/* eslint-disable global-require */
import React from 'react';
import { Home, PlayerProvider, videos } from './components';

export default class App extends React.PureComponent {
  
  render() {
    return (
      <PlayerProvider>
        <Home />
      </PlayerProvider>
    );
  }
}
