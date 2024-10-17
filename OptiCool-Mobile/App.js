import 'react-native-gesture-handler';
import "react-native-safe-area-context";

import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from "./states/store";

import Main from './Main';

export default function App() {

  return (

    <Provider store={store}>

      <PersistGate loading={null} persistor={persistor}>

        <Main />

      </PersistGate>

    </Provider>

  );

}