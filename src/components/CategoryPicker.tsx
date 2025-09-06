import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useCategoryStore } from '@/stores';
import { CATEGORIES } from '@/constants';
import { MovieCategory } from '@/stores/categories/categories.inteface';

interface CategoryPickerProps {
  onCategorySelect?: (category: MovieCategory) => void;
}

const CategoryPicker: React.FC<CategoryPickerProps> = ({
  onCategorySelect,
}) => {
  const { categories, selectedCategory, setSelectedCategory, initializeStore } =
    useCategoryStore();

  useEffect(() => {
    initializeStore();
  }, []);

  const handleCategoryPress = (category: MovieCategory) => {
    setSelectedCategory(category);
    onCategorySelect?.(category);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Category</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {categories.map(category => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory?.id === category.id && styles.selectedButton,
            ]}
            onPress={() => handleCategoryPress(category)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory?.id === category.id && styles.selectedText,
              ]}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {selectedCategory && (
        <View style={styles.selectedInfo}>
          <Text style={styles.selectedInfoText}>
            Selected: {selectedCategory.label} ({selectedCategory.value})
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  scrollContainer: {
    gap: 12,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    minWidth: 100,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  selectedText: {
    color: '#fff',
  },
  selectedInfo: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  selectedInfoText: {
    fontSize: 14,
    color: '#1e40af',
    textAlign: 'center',
  },
});

export default CategoryPicker;
