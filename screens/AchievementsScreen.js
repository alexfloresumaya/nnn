import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import Achievements from '../components/Achievements';
import { getData } from '../storageFunctions'; // Suponiendo que las funciones de almacenamiento estén en 'storageFunctions.js'

export default function AchievementsScreen() {
  const [elapsedDays, setElapsedDays] = useState(0);

  useEffect(() => {
    const fetchDays = async () => {
      const days = await getData();
      setElapsedDays(days);
    }

    fetchDays();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Achievements elapsedDays={elapsedDays} />
    </View>
  );
}
