import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '@/theme/colors';
import { Cast } from '@/types';
import Keys from 'react-native-keys';

interface CastCardProps {
  cast: Cast;
}

const CastCard: React.FC<CastCardProps> = ({ cast }) => {
  const profileImage = cast.profile_path
    ? { uri: `${Keys.IMAGE_URL}${cast.profile_path}` }
    : null;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {profileImage ? (
          <Image source={profileImage} style={styles.profileImage} />
        ) : (
          <View style={styles.profileImage} />
        )}
      </View>
      <Text style={styles.actorName} numberOfLines={2}>
        {cast.name}
      </Text>
      <Text style={styles.characterName} numberOfLines={2}>
        {cast.character}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 140,
    marginRight: 16,
    alignItems: 'flex-start',
  },
  imageContainer: {
    width: 140,
    height: 175,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
    backgroundColor: colors.gray,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  actorName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
    textAlign: 'left',
    marginBottom: 4,
    width: '100%',
  },
  characterName: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.grayDark,
    textAlign: 'left',
    width: '100%',
  },
});

export { CastCard };
