import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HistoryScreen = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const savedHistory = await AsyncStorage.getItem("RESET_HISTORY");

      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error("Error fetching reset history:", error);
    }
  };

  const renderItem = ({ item }) => {
    const startDate = new Date(item.startTime);
    const endDate = new Date(item.endTime);
    const options = { year: "numeric", month: "long", day: "numeric" };

    return (
      <View style={styles.itemContainer}>
        <Text>{item.elapsedTime}</Text>
        <Text>Started: {startDate.toLocaleDateString(undefined, options)}</Text>
        <Text>Ended: {endDate.toLocaleDateString(undefined, options)}</Text>
      </View>
    );
  };

  return (
    
      <View style={styles.container}>
        <FlatList
          data={history}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  itemContainer: {
    padding: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});

export default HistoryScreen;
