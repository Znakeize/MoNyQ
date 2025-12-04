import React from 'react';
import { View, ViewProps, Platform, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { useTheme } from '../context/ThemeContext';

interface GlassCardProps extends ViewProps {
    children: React.ReactNode;
    intensity?: number;
    className?: string;
    variant?: 'default' | 'highlight';
}

const GlassCard: React.FC<GlassCardProps> = ({ children, intensity = 30, className, style, variant = 'default', ...props }) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const backgroundColor = isDark
        ? (variant === 'highlight' ? 'rgba(30, 41, 59, 0.6)' : 'rgba(15, 23, 42, 0.6)')
        : 'rgba(255, 255, 255, 0.7)';

    const borderColor = isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.4)';

    return (
        <View
            className={`overflow-hidden rounded-3xl border ${className}`}
            style={[
                {
                    backgroundColor,
                    borderColor,
                },
                style
            ]}
            {...props}
        >
            {Platform.OS !== 'android' ? (
                <BlurView intensity={intensity} tint={isDark ? 'dark' : 'light'} style={StyleSheet.absoluteFill} />
            ) : null}
            <View className="p-5">
                {children}
            </View>
        </View>
    );
};

export default GlassCard;
