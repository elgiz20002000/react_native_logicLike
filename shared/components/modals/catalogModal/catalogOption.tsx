import colors from '@shared/constants/colors';
import { FC, memo } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ICatalogOption {
  item: string;
  isFirstOption: boolean;
  isActive: boolean;
  onSelect: (category: string | null) => void;
}

export const CatalogOption: FC<ICatalogOption> = memo(
  ({ item, isFirstOption, isActive, onSelect }) => {
    return (
      <TouchableOpacity
        style={[styles.option, isActive && styles.active]}
        onPress={() => onSelect(isFirstOption ? null : item)}
      >
        <Text style={[styles.optionText, isActive && styles.activeText]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  option: {
    padding: 15,
    borderWidth: 2,
    borderColor: colors.categoryOptionBorder,
    borderRadius: 12,
    marginVertical: 4,
  },
  optionText: {
    color: colors.categoryOptionText,
    fontWeight: '800',
    fontSize: 18,
  },
  active: {
    backgroundColor: colors.activeCategoryBg,
    borderColor: 'transparent',
  },
  activeText: {
    color: colors.white,
    fontWeight: '800',
  },
});
