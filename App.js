import "react-native-gesture-handler";
import { StyleSheet } from 'react-native';
import { DrawerActions, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from 'react-redux';

import store from './redux/store';

// Import pages 
import Home from './pages/Home';
import Search from './pages/Search';
import MyLibrary from './pages/MyLibrary';
import CreateReport from './pages/CreateReport';


export default function App() {
  const Stack = createStackNavigator();

  return (
    <Provider store={ store }>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={ Home } />
          </Stack.Group>
          <Stack.Group screenOptions={{ headerBackTitleVisible: false }}>
            <Stack.Screen name="Search" component={ Search } options={{ title: '' }} />
          </Stack.Group>
          <Stack.Group>
            <Stack.Screen name="MyLibrary" component={ MyLibrary } options={{ title: '내 서재' }} />
            <Stack.Screen name="CreateReport" component={ CreateReport } options={{ title: '',  headerShadowVisible: false, }}/>  
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
