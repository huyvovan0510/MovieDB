import React, { memo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeftIcon } from 'react-native-heroicons/solid';
import { getProfile } from '@/services/profile.service';
import { Profile } from '@/types';
import { colors } from '@/theme/colors';
import { goBack } from '@/navigation/navigation.services';
import Keys from 'react-native-keys';
const ProfileSection = memo(() => {
  const {
    data: profile,
    isLoading,
    error,
  } = useQuery<Profile>({
    queryKey: ['profile'],
    queryFn: () => getProfile(Keys.secureFor('ACCOUNT_ID')),
  });

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatMemberSince = (date: string) => {
    const memberDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
    };
    return `Member since ${memberDate.toLocaleDateString('en-US', options)}`;
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    );
  }

  if (error || !profile) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load profile</Text>
      </View>
    );
  }

  return (
    <View style={styles.profileContainer}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <ChevronLeftIcon size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{getInitials(profile.username)}</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{profile.username}</Text>
          <Text style={styles.memberSince}>
            {formatMemberSince('2023-08-01')}
          </Text>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  profileContainer: {
    backgroundColor: colors.darkBlue,
    paddingBottom: 20,
  },
  loadingContainer: {
    backgroundColor: colors.darkBlue,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  errorContainer: {
    backgroundColor: colors.darkBlue,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  errorText: {
    color: colors.white,
    fontSize: 16,
  },
  header: {
    marginBottom: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileSection: {
    backgroundColor: colors.darkBlue,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 50,
    backgroundColor: '#8A2BE2', // Purple color matching the design
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: colors.white,
    fontSize: 30,
    fontWeight: 'bold',
  },
  profileInfo: {
    marginLeft: 16,
  },
  profileName: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '700',
  },
  memberSince: {
    color: colors.white70,
    fontSize: 16,
  },
});

export { ProfileSection };
