import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import React, { useState } from 'react';
import { colors } from '@/theme/colors';
import { Button } from './Button';
import { XCircleIcon } from 'react-native-heroicons/solid';

const SearchComponent = ({
  onSearch,
}: {
  onSearch: (search: string) => void;
}) => {
  const [search, setSearch] = useState('');
  const onClear = () => {
    setSearch('');
    onSearch('');
  };
  return (
    <View>
      <View style={styles.searchInput}>
        <TextInput
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInputText}
        />
        {search && (
          <Pressable onPress={onClear}>
            <XCircleIcon size={24} color={colors.textSecondary} />
          </Pressable>
        )}
      </View>

      <Button
        title="Search"
        onPress={() => {
          onSearch(search);
        }}
        style={styles.searchButton}
        disabled={!search}
      />
    </View>
  );
};

export { SearchComponent };

const styles = StyleSheet.create({
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.white,

    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    borderTopWidth: 1,
    marginBottom: 15,
  },
  searchButton: {
    marginBottom: 15,
  },
  searchInputText: {
    flex: 1,
  },
});
