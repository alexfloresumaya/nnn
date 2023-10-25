import React, { useState, useEffect } from "react";
import { View, Text, ImageBackground, TouchableOpacity, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider } from 'react-native-paper'; // Importa componentes de React Native Paper
import { auth } from '../firebase/firebaseConfig';
import Counter from "../components/Counter"; // Importa el componente Counter
import MenuButton from "../components/MenuButton";

import { fetchLastReset } from "../firebase/firebaseFunctions";

const HomeScreen = ({ navigation }) => {
  const [lastReset, setLastReset] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [elapsedTime, setElapsedTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [userEmail, setUserEmail] = useState(""); // Estado para almacenar el correo electrónico del usuario

  const handleCloseMenu = () => setMenuVisible(false);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      handleCloseMenu();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };


  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserEmail(currentUser.email);
    }

    fetchLastReset(auth);

    const updateElapsedTime = () => {
      const currentDate = new Date();
      let diffInSeconds = Math.floor((currentDate - startDate) / 1000);

      const days = Math.floor(diffInSeconds / (3600 * 24));
      diffInSeconds -= days * 3600 * 24;

      const hours = Math.floor(diffInSeconds / 3600);
      diffInSeconds -= hours * 3600;

      const minutes = Math.floor(diffInSeconds / 60);
      diffInSeconds -= minutes * 60;

      const seconds = diffInSeconds;

      setElapsedTime({ days, hours, minutes, seconds });
    };
    const interval = setInterval(updateElapsedTime, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  const resetCounter = async () => {
    const currentDate = new Date();
  
    const elapsedTimeObj = {
      startTime: startDate.toISOString(),
      endTime: currentDate.toISOString(),
      elapsedTime: formatElapsedTime(startDate, currentDate),
    };
  
    await saveResetHistory(elapsedTimeObj);
  
    setStartDate(currentDate);
  };
 /*  const resetCounter = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const currentDate = new Date();
        const elapsedTimeObj = {
          startTime: lastReset || currentDate,
          endTime: currentDate,
        };

        // Actualiza el último reseteo en Firestore
        await firestore.collection("resetHistory").doc(user.uid).set({
          lastReset: currentDate,
        });

        setLastReset(currentDate);
        setElapsedTime(calculateElapsedTime(elapsedTimeObj));
      }
    } catch (error) {
      console.error("Error resetting counter:", error);
    }
  }; */

  const formatElapsedTime = (startDate, endDate) => {
    let diffInSeconds = Math.floor((endDate - startDate) / 1000);

    const days = Math.floor(diffInSeconds / (3600 * 24));
    diffInSeconds -= days * 3600 * 24;

    const hours = Math.floor(diffInSeconds / 3600);
    diffInSeconds -= hours * 3600;

    const minutes = Math.floor(diffInSeconds / 60);
    diffInSeconds -= minutes * 60;

    const seconds = diffInSeconds;

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const saveResetHistory = async (elapsedTimeObj) => {
    try {
      let history = await AsyncStorage.getItem("RESET_HISTORY");

      if (!history) {
        history = [];
      } else {
        history = JSON.parse(history);
      }

      history.push(elapsedTimeObj);

      await AsyncStorage.setItem("RESET_HISTORY", JSON.stringify(history));
    } catch (error) {
      console.error("Error saving reset history:", error);
    }
  };

  const goToAchievements = () => {
    navigation.navigate("AchievementsScreen");
  };

  return (
    <Provider>
      <ImageBackground
        source={require("../assets/bgro.jpg")}
        style={styles.background}
      >
        <View style={styles.container}>
          <Counter elapsedTime={elapsedTime} setElapsedTime={setElapsedTime} resetCounter={resetCounter} />

          <View style={styles.buttonsContainer}>
            <Button title="See Achievements" onPress={goToAchievements} />
            <View style={styles.buttonSpacing}></View>
            <Button
              title="View History"
              onPress={() => navigation.navigate("History")}
            />
            {userEmail && <Text>{userEmail}</Text>}
          </View>
          <MenuButton handleLogout={handleLogout} userEmail={userEmail} />
        </View>
      </ImageBackground>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  row: {
    flexDirection: "row",
  },
  rowBottom: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 10,
  },
  circleContainer: {
    width: 300, // Ajusta según tus preferencias
    height: 300, // Ajusta según tus preferencias
    borderRadius: 150, // La mitad de width/height para hacerlo circular
    backgroundColor: "rgba(255, 255, 255, 0.3)", // Blanco con 50% de opacidad
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20, // Espacio entre el círculo y el botón
  },
  profileButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  background: {
    flex: 1,
    resizeMode: "cover", // O "contain" dependiendo de tus necesidades
    justifyContent: "center",
  },
  daysText: {
    fontSize: 48,
    marginBottom: 10,
    color: "white",
    fontWeight: 'bold',
    paddingRight: 5,
  },
  dayText: {
    fontSize: 28,
    color: "white",
    marginBottom: 16,
    textAlignVertical: 'bottom',
  },
  timeText: {
    fontSize: 24,
    marginBottom: 5,
    color: "white",
    textAlign: "center",
    fontWeight: '600',
  },
  secondText: {
    fontSize: 10,
    color: '#efefef',
  },
  buttonsContainer: {
    width: "100%",
  },
  buttonSpacing: {
    marginVertical: 10,
  },
  iconButton: {
    position: 'absolute',  // Posiciona el botón de forma absoluta dentro del circleContainer
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    bottom: 25,  // Ajusta según tus preferencias
    right: 10,  // Ajusta según tus preferencias
},
iconButton2: {
  position: 'absolute',  // Posiciona el botón de forma absoluta dentro del circleContainer
  backgroundColor: 'red',
  justifyContent: 'center',
  alignItems: 'center',
  width: 50,
  height: 50,
  borderRadius: 25,
  bottom: 45,  // Ajusta según tus preferencias
  right: 40,  // Ajusta según tus preferencias
},
logoutButton: {
  backgroundColor: 'red',
  paddingHorizontal: 20,
  paddingVertical: 10,
  borderRadius: 5,
  marginTop: 20,
},
logoutButtonText: {
  color: 'white',
  fontSize: 16,
  textAlign: 'center',
}

});

export default HomeScreen;
