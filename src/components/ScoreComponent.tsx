import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { colors } from '@/theme/colors';

interface ScoreComponentProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
  label?: string;
}

const ScoreComponent: React.FC<ScoreComponentProps> = ({
  score,
  size = 60,
  strokeWidth = 5,
  label = 'User Score',
}) => {
  const normalizedScore = Math.min(Math.max(score * 10, 0), 100);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset =
    circumference - (normalizedScore / 100) * circumference;

  const getScoreColor = (scoreValue: number) => {
    if (scoreValue >= 70) return colors.greenLight;
    if (scoreValue >= 50) return colors.yellowLight;
    return colors.redLight;
  };

  const scoreColor = getScoreColor(normalizedScore);

  return (
    <View style={[styles.container]}>
      <View style={styles.scoreContainer}>
        <Svg width={size} height={size} style={styles.svg}>
          <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={colors.grayDark}
              strokeWidth={strokeWidth}
              fill="none"
            />
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={scoreColor}
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </G>
        </Svg>
        <View style={styles.scoreTextContainer}>
          <Text style={styles.scoreText}>
            {Math.round(normalizedScore)}
            <Text style={styles.percentText}>%</Text>
          </Text>
        </View>
      </View>
      {label && <Text style={styles.labelText}>{label}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.grayDark,
    padding: 5,
    borderRadius: 100,
  },
  svg: {},
  scoreTextContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  scoreText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.white,
    textAlign: 'center',
  },
  percentText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
  labelText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
    textAlign: 'center',
  },
});

export { ScoreComponent };
