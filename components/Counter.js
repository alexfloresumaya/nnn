// Counter.js
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'; 

const Counter = ({ elapsedTime,setElapsedTime, resetCounter }) => {
  const [lastReset, setLastReset] = useState(new Date());

  useEffect(() => {
    const updateElapsedTime = () => {
      const currentDate = new Date();
      let diffInSeconds = Math.floor((currentDate - lastReset) / 1000);
  
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
  }, [lastReset]);
  

  return (
    <View style={styles.counterContainer}>
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
  );
};

const styles = StyleSheet.create({
  counterContainer: {
    // Estilos para el contador
    width: 300, // Ajusta según tus preferencias
    height: 300, // Ajusta según tus preferencias
    borderRadius: 150, // La mitad de width/height para hacerlo circular
    backgroundColor: "rgba(255, 255, 255, 0.3)", // Blanco con 50% de opacidad
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20, // Espacio entre el círculo y el botón
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
  daysText: {
    fontSize: 48,
    marginBottom: 10,
    color: "white",
    fontWeight: "bold",
    paddingRight: 5,
  },
  dayText: {
    fontSize: 28,
    color: "white",
    marginBottom: 16,
    textAlignVertical: "bottom",
  },
  timeText: {
    fontSize: 24,
    marginBottom: 5,
    color: "white",
    textAlign: "center",
    fontWeight: "600",
  },
  secondText: {
    fontSize: 10,
    color: "#efefef",
  },
  iconButton: {
    position: "absolute",
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
    bottom: 25,
    right: 10,
  },
});

export default Counter;
