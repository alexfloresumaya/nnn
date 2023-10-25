import * as React from 'react';
import { ProgressBar, MD3Colors } from 'react-native-paper';

const MonthProgress = () => {
  // Obtenemos la fecha actual
  const currentDate = new Date();
  // Obtenemos el último día del mes
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  
  // Calculamos el progreso en función de la fecha actual y el último día del mes
  const progress = currentDate.getDate() / lastDayOfMonth.getDate();

  return (
    <ProgressBar style={{ width: 200, height: 5 }} progress={progress} color={MD3Colors.error50} />
  );
};

export default MonthProgress;
