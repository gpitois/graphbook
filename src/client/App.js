import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import { Helmet } from 'react-helmet';
import 'react-toastify/dist/ReactToastify.css';
import Router from './router';
import '@synapsestudios/react-drop-n-crop/lib/react-drop-n-crop.min.css';
import '../../assets/css/style.css';
import './components/fontawesome';

class App extends Component {
  state = {
    loggedIn: (typeof window.__APOLLO_STATE__ !== typeof undefined &&
      typeof window.__APOLLO_STATE__.ROOT_QUERY !== typeof undefined &&
      typeof window.__APOLLO_STATE__.ROOT_QUERY.currentUser !== typeof undefined)
  };

  constructor(props) {
    super(props);
    this.unsubscribe = props.client.onResetStore(() => this.changeLoginState(false));
  }

  componentWillUnmount() {
    this.unsubscribe();
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
        <Router
          loggedIn={this.state.loggedIn}
          changeLoginState={this.changeLoginState}
        />
      </div>
    );
  }
};

export default withApollo(App);
