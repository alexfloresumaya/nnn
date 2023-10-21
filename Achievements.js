// Achievements.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const achievementsList = [
  { days: 1, title: 'Primer día' },
  { days: 7, title: 'Una semana' },
  { days: 30, title: 'Un mes' },
  // ... puedes agregar más logros según lo desees
];

const Achievements = ({ elapsedDays }) => {
  return (
    <View style={styles.container}>
      {achievementsList.map((achievement) => (
        <Text 
          key={achievement.days}
          style={elapsedDays >= achievement.days ? styles.unlocked : styles.locked}
        >
          {achievement.title}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  unlocked: {
    fontSize: 18,
    color: 'green',
    marginVertical: 5,
  },
  locked: {
    fontSize: 18,
    color: 'gray',
    marginVertical: 5,
  },
});

export default Achievements;
