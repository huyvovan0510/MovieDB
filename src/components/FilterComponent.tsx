import { View, Text, Pressable, StyleSheet } from 'react-native';
import React, { useRef } from 'react';
import Accordion, { AccordionRef } from './Accordion';
import { colors } from '@/theme/colors';

interface FilterData {
  id: number;
  label: string;
  value: string;
}
interface FilterComponentProps {
  data: FilterData[];
  onSelect: (data: any) => void;
  selectedValue?: string;
  label?: string;
}

const FilterComponent = ({
  data,
  onSelect,
  selectedValue,
  label,
}: FilterComponentProps) => {
  const ref = useRef<AccordionRef>(null);
  if (!data?.length) return null;

  const renderItem = (item: FilterData) => {
    const isSelected = item.value === selectedValue;
    return (
      <Pressable
        key={item.id}
        style={[styles.itemsContainer, isSelected && styles.selectedItem]}
        onPress={() => {
          onSelect(item);
          ref.current?.handleToggle();
        }}
      >
        <Text style={[styles.itemText, isSelected && styles.selectedItemText]}>
          {item.label}
        </Text>
      </Pressable>
    );
  };
  return (
    <Accordion title={label || ''} containerStyle={styles.container} ref={ref}>
      <View>{data?.map(renderItem)}</View>
    </Accordion>
  );
};

export { FilterComponent };
const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  itemsContainer: {
    backgroundColor: colors.grayLight,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginBottom: 8,
    borderRadius: 3,
  },
  selectedItem: {
    backgroundColor: colors.blueLight,
  },
  itemText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.black,
  },
  selectedItemText: {
    color: colors.white,
  },
});
