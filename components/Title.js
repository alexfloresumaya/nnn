import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Title = () => {
  return (
    <View >
        <Text style={styles.title}>No Nut November</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    marginBottom: 10,
    color: "white",
    fontWeight: "bold",
    paddingRight: 5,
  }
});

export default Title;
