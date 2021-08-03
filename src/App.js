import logo from './logo.svg';
import {Auth, API, graphqlOperation} from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import awsconfig from './aws-exports';

import * as queries from './graphql/queries'

import './App.css';
import '@aws-amplify/ui/dist/style.css';
Auth.configure(awsconfig)
API.configure(awsconfig)


function App() {

  const allMaps = API.graphql(graphqlOperation(queries.listMaps))
  console.log(allMaps)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default withAuthenticator(App, {includeGreetings: true})

