import React from 'react';
import { View } from 'react-native';

interface ProgressBarProps {
    progress: number; // 0 to 1
    color: string;
    height?: number;
    trackColor?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, color, height = 6, trackColor = 'rgba(255,255,255,0.1)' }) => {
    const clampedProgress = Math.min(Math.max(progress, 0), 1);

    return (
        <View style={{ height, backgroundColor: trackColor, borderRadius: height / 2, overflow: 'hidden' }}>
            <View
                style={{
                    width: `${clampedProgress * 100}%`,
                    height: '100%',
                    backgroundColor: color,
                    borderRadius: height / 2
                }}
            />
        </View>
    );
};

export default ProgressBar;
