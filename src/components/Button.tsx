import { Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { colors } from '@/theme/colors';

const Button = ({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
  type?: 'primary' | 'secondary';
}) => {
  return (
    <Pressable onPress={onPress} style={styles.primary}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

export { Button };

const styles = StyleSheet.create({
  primary: {
    backgroundColor: colors.blueLight,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondary: {
    backgroundColor: colors.grayLight,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  textSecondary: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
