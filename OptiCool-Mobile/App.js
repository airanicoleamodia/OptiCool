import 'react-native-gesture-handler';
import "react-native-safe-area-context";

import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
// import DrawerNavigator from './navigators/DrawerNavigator';
import 'react-native-gesture-handler';

import { persistor, store } from "./states/store";

import Main from './Main';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {

  return (

    <GestureHandlerRootView style={{ flex: 1 }}>

      <Provider store={store}>

        <PersistGate loading={null} persistor={persistor}>

          <Main />

        </PersistGate>

      </Provider>

    </GestureHandlerRootView>
  );
}