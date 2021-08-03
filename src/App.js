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
   
    </div>
  );
}

export default withAuthenticator(App, {includeGreetings: true})

