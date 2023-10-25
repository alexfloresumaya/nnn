import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'; 

const EmpiezaEn = ({ currentDate, resetCounter }) => {
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  return (
    <View style={styles.counterContainer}>
      <Text style={styles.daysText}>{currentDate.getDate()}</Text>
      <Text style={styles.dayText}>
        <Text style={styles.slash}>/</Text> {lastDayOfMonth.getDate()}
      </Text>      
      <TouchableOpacity style={styles.iconButton} onPress={resetCounter}>
        <Icon name="repeat" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  counterContainer: {
    // Estilos para el contador
    width: 550, // Ajusta según tus preferencias
    height: 200, // Ajusta según tus preferencias
    backgroundColor: "rgba(105, 100, 105, 0.05)", // Blanco con 50% de opacidad
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20, // Espacio entre el círculo y el botón
  },
  daysText: {
    fontSize: 78,
    marginBottom: -10,
    color: "white",
    fontWeight: "bold",
    fontFamily:'coluna'
  },
  slash: {
    fontSize: 30,
    color: "white",
    transform: [{rotate: '90deg'}],
  },
  dayText: {
    fontSize: 20,
    color: "white",
    marginBottom: 16,
    marginLeft: 200,
    textAlignVertical: "bottom",
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

export default EmpiezaEn;
