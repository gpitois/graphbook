import React from 'react';
import { Helmet } from 'react-helmet';
import '../../assets/css/style.css';
import Feed from './Feed';
import Chats from './Chats';
import Bar from './components/bar';
import { ContextProvider } from './components/utils/Context';
import './components/fontawesome';
import { UserProvider } from './components/context/user';

const App = () => {
  const initialState = {
    openChats: [],
  };
  const [state, setState] = React.useState(initialState);

  return (
    <div className="container">
      <Helmet>
        <title>Graphbook - Feed</title>
        <meta name="description" content="Newsfeed of all your friends on Graphbook" />
      </Helmet>
      <UserProvider>
        <Bar />
        <ContextProvider state={state} setState={setState}>
          <Feed />
          <Chats />
        </ContextProvider>
      </UserProvider>
    </div>
  );
};

export default App;
