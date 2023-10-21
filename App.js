import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";
import AchievementsScreen from "./AchievementsScreen";
import HistoryScreen from "./HistoryScreen";
import { auth } from './firebaseConfig';

const Stack = createStackNavigator();

function LoginScreenWrapper(props) {
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return <LoginScreen {...props} onLoginSuccess={handleLoginSuccess} />;
}
if (__DEV__) {
  console.log('eeeeeeeeeee')
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe(); // Desuscribirse en el cleanup
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          // Screens for logged in users
          <Stack.Group>
            <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
            <Stack.Screen name="AchievementsScreen" options={{ headerShown: false }} component={AchievementsScreen} />
            <Stack.Screen name="History" options={{ headerShown: false }} component={HistoryScreen} />
          </Stack.Group>
        ) : (
          // Auth screens
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen 
              name="Login"
              component={LoginScreenWrapper} 
              options={{ headerShown: false }}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
