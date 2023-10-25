import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import AchievementsScreen from "./screens/AchievementsScreen";
import HistoryScreen from "./screens/HistoryScreen";
import { auth } from './firebase/firebaseConfig';

const Stack = createStackNavigator();

function LoginScreenWrapper(props) {
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return <LoginScreen {...props} onLoginSuccess={handleLoginSuccess} />;
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
