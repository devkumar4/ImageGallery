import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './src/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { COLORS } from './src/theme/Theme';

const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator screenOptions={
        {
          // drawerActiveBackgroundColor: COLORS.Black,
          drawerActiveTintColor: COLORS.Black,
          drawerStatusBarAnimation: 'slide',
          // headerShown: false,

        }
      }>
        <Drawer.Screen name="Home Screen" component={HomeScreen}
          options={{
            headerLeftLabelVisible: false
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App