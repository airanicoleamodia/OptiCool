import React from 'react';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './states/store';
// import Auth from
import Main from './Main';
import TestNavigator from './navigators/testNavigator';
import DrawerNavigation from './navigators/DrawerNavigation';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Main />
          {/* <TestNavigator/> */}
          {/* <DrawerNavigation/> */}
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}
