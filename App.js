import React, {useEffect} from 'react';
import Routes from './src/routes/Index';
import store, {persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import ToastMessage from './src/components/ToastMessage';
import {LogBox, Platform} from 'react-native';
import {requestLocationPermission} from './src/utils';

function App() {
  useEffect(() => {
    LogBox.ignoreAllLogs();
    locationAccess();
  }, []);
  const locationAccess = () => {
    if (Platform.OS == 'android') {
      requestLocationPermission();
    }
  };

  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Routes />
        </PersistGate>
      </Provider>
      <ToastMessage position={'top'} />
    </>
  );
}

export default App;
