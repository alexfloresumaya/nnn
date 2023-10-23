import React, { useState, useEffect } from "react";
import { View, Text, ImageBackground, TouchableOpacity, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { Menu, Provider, IconButton, Divider } from 'react-native-paper'; // Importa componentes de React Native Paper
import { auth } from './firebaseConfig';
import { firebase } from './firebaseConfig';

const HomeScreen = ({ navigation }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [elapsedTime, setElapsedTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [menuVisible, setMenuVisible] = useState(false);
  const [userEmail, setUserEmail] = useState(""); // Estado para almacenar el correo electrónico del usuario

  const handleOpenMenu = () => setMenuVisible(true);
  const handleCloseMenu = () => setMenuVisible(false);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      handleCloseMenu(); // Cierra el menú después de cerrar sesión
      // También puedes agregar lógica adicional aquí, como redirigir al usuario a la pantalla de inicio de sesión.
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const [users, setUsers] = useState();
  const todoRef = firebase.firestore().collection('todos');

  useEffect(()=>{
      todoRef
      .onSnapshot(
        querySnapshot => {
          const users = []
           querySnapshot.forEach( (doc) => {
            const h= doc.get('heading')
            const t= doc.get('text')
            users.push({
              id: doc.id,
              h,
              t,
            })
            setUsers(users);
          })
        }
      )
      console.log(users);
  }, [])

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserEmail(currentUser.email);
    }

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
      elapsedTime: formatElapsedTime(startDate, currentDate), // Nueva función para formatear el tiempo transcurrido
    };

    await saveResetHistory(elapsedTimeObj); // Nueva función para guardar el historial

    setStartDate(currentDate);
  };

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
        source={require("./assets/bgro.jpg")}
        style={styles.background}
      >
        <View style={styles.container}>
          <View style={styles.circleContainer}>
            <View style={styles.row}>
              <Text style={styles.daysText}>{elapsedTime.days}</Text>
              <Text style={styles.dayText}>days</Text>
            </View>
            <View style={styles.rowBottom}>
              <View>
                <Text style={styles.timeText}>{elapsedTime.hours}</Text>
                <Text style={styles.secondText}>hours</Text>
              </View>
              <View>
                <Text style={styles.timeText}>{elapsedTime.minutes}</Text>
                <Text style={styles.secondText}>minutes</Text>
              </View>
              <View>
                <Text style={styles.timeText}>{elapsedTime.seconds}</Text>
                <Text style={styles.secondText}>seconds</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.iconButton} onPress={resetCounter}>
              <Icon name="repeat" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonsContainer}>
            <Button title="See Achievements" onPress={goToAchievements} />
            <View style={styles.buttonSpacing}></View>
            <Button
              title="View History"
              onPress={() => navigation.navigate("History")}
            />
            {userEmail && <Text>{userEmail}</Text>}
          </View>
          <Menu
            visible={menuVisible}
            onDismiss={handleCloseMenu}
            anchor={
              <IconButton
                icon="account"
                size={28}
                color="white"
                onPress={handleOpenMenu}
              />
            }
          >
            <Menu.Item onPress={handleLogout} title="Cerrar Sesión" />
            <Divider />
            <Menu.Item title={userEmail} />
          </Menu>
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
