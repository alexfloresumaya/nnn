import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import { StyleSheet, View, Text } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import AchievementsScreen from "./screens/AchievementsScreen";
import HistoryScreen from "./screens/HistoryScreen";
import { auth } from "./firebase/firebaseConfig";
import * as Font from "expo-font";
import MenuButton from "./components/MenuButton";

const Stack = createStackNavigator();

const loadFonts = async () => {
  await Font.loadAsync({
    coluna: require("./assets/fonts/coluna.ttf"),
  });
};

function LoginScreenWrapper(props) {
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return <LoginScreen {...props} onLoginSuccess={handleLoginSuccess} />;
}

const HomeHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>No Nut November</Text>
      <MenuButton handleLogout={() => console.log("hola")} userEmail={""} />
    </View>
  );
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    loadFonts();
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
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                header: () => <HomeHeader />, // Componente personalizado en el header
                headerStyle: {
                  backgroundColor: "black",
                },
                headerTintColor: "white",
              }}
            />
            <Stack.Screen
              name="AchievementsScreen"
              options={{ headerShown: false }}
              component={AchievementsScreen}
            />
            <Stack.Screen
              name="History"
              options={{ headerShown: false }}
              component={HistoryScreen}
            />
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

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor:'black',
    padding: 36,
  },
  title: {
    color: "white",
    fontSize: 24,
  },
});
