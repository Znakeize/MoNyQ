import React from 'react';
import { ThemeProvider } from './src/context/ThemeContext';
import { BudgetProvider } from './src/context/BudgetContext';
import AppNavigator from './src/navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <BudgetProvider>
          <AppNavigator />
        </BudgetProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
