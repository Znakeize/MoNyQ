import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';

interface ScreenWrapperProps {
    children: React.ReactNode;
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ children }) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const gradientColors: readonly [string, string, ...string[]] = isDark
        ? ['#020617', '#0f172a', '#1e1b4b'] // Slate-950 -> Slate-900 -> Indigo-950
        : ['#f8fafc', '#e0e7ff', '#c7d2fe']; // Slate-50 -> Indigo-100 -> Indigo-200

    return (
        <View className="flex-1">
            <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
            <LinearGradient
                colors={gradientColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFillObject}
            />
            <SafeAreaView className="flex-1">
                {children}
            </SafeAreaView>
        </View>
    );
};

export default ScreenWrapper;
