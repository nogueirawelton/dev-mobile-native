import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from '../screens/Auth/Login';
import { Register } from '../screens/Auth/Register';
import { useAuth } from '../contexts/AuthContext';
import { Home } from '../screens/Home';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  const { userData } = useAuth();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}>
      {userData ? (
        <>
          <Screen
            name="home"
            component={Home}
          />
        </>
      ) : (
        <>
          <Screen
            name="login"
            component={Login}
          />
          <Screen
            name="register"
            component={Register}
          />
        </>
      )}
    </Navigator>
  );
}
