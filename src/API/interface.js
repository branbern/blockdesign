import {Auth, API, graphqlOperation} from 'aws-amplify';
import * as queries from '../graphql/queries'
import * as mutations from '../graphql/mutations'
import awsconfig from '../aws-exports';

 function getAllMaps() {
     const t = API.graphql(graphqlOperation(queries.listMaps))
   return t
 }

 function saveMap(cells, mapName) {
    createMap(cells, mapName)
 }
     
 const createMap = (cells, mapName) => {
    Auth.currentAuthenticatedUser({
        bypassCache: false,
    }).then(function(user) {
        const map = {name: mapName, createdBy: user['username'],  seed: cells}
        API.graphql(graphqlOperation(mutations.createMap, {input: map})) 
    }).catch(err => console.log(err))
}

export {saveMap, getAllMaps} 