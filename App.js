import 'react-native-gesture-handler'
import React from 'react';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import rootReducer from './store/reducers/rootReducer'
import PlacesNavigator from './navigation/PlacesNavigator'

import {init} from './helpers/db'

init().then(()=>{
  console.log('Inititalized database')
}).catch((err) =>{
  console.log('Initializing db failed')
  console.log(err)
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}


