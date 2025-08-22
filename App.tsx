
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import AppNavigator from './src/routes/AppNavigator';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { PaperProvider } from 'react-native-paper';

function App() {

  return (
    <Provider store={store}>
      <PaperProvider>

      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
      </PaperProvider>
    </Provider>
  );
}



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

export default App;
