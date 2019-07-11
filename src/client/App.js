import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import '../../assets/css/style.css';
import './components/fontawesome';
import LoginRegisterForm from './components/loginregister';
import CurrentUserQuery from './components/queries/currentUser';
import Feed from './Feed';
import Chats from './Chats';
import Bar from './components/bar';

class App extends Component {
  state = {
    loggedIn: false
  };

  componentWillMount() {
    const token = localStorage.getItem('jwt');
    if (token) {
      this.setState({loggedIn: true});
    }
  }

  changeLoginState = (loggedIn) => {
    this.setState({ loggedIn });
  };

  render () {
    return (
      <div className="container">
        <Helmet>
          <title>Graphbook - Feed</title>
          <meta name="description" content="Newsfeed of all your friends on Graphbook"/>
        </Helmet>
        {this.state.loggedIn ?
          <CurrentUserQuery>
            <Bar />
            <Feed />
            <Chats />
          </CurrentUserQuery>
          : <LoginRegisterForm changeLoginState={this.changeLoginState} />
        }
      </div>
    );
  }
};

export default App;
