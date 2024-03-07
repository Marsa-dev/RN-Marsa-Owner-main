import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import {
  SafeAreaView, StatusBar,
} from 'react-native';
import StackNavigator from './src/routes/StackNavigator/StackNavigator';
import FlashMessage from 'react-native-flash-message';
import { I18nextProvider } from 'react-i18next';
import i18n from './src/constants/languages/i18n';
function App() {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <SafeAreaView style={{ flex: 1 }}>
          <StackNavigator />
            <StatusBar barStyle={'light-content'} />
        </SafeAreaView>
      </I18nextProvider>
      <FlashMessage position={'top'} />
    </Provider>
  );
}


export default App;
