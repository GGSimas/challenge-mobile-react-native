import 'react-native-gesture-handler';
import React from 'react';
import Toast from 'react-native-toast-message';
import AppRoutes from './routes';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './redux/store';
import {StatusBar} from 'react-native';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar backgroundColor="#EB2227" />
        <AppRoutes />
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </PersistGate>
    </Provider>
  );
};

export default App;
