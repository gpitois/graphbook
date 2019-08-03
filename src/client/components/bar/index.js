import React, { Component } from 'react';
import Logout from './logout';
import SearchBar from './search';
import UserBar from './user';
import { UserConsumer } from '../context/user';
import Home from './home';

export default class Bar extends Component {
  render() {
    return (
      <div className="topbar">
        <div className="inner">
          <UserConsumer>
            <UserBar />
          </UserConsumer>
          <SearchBar />
        </div>
        <div className="buttons">
          <Home />
          <Logout changeLoginState={this.props.changeLoginState} />
        </div>
      </div>
    );
  }
}
