import colors from '@shared/constants/colors';
import { TVoidFunction } from '@shared/types';
import { FC, memo } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  View,
  Image,
} from 'react-native';

interface ICategoriesButton {
  title: string;
  onPress: TVoidFunction;
  style?: ViewStyle;
}

const CategoriesButton: FC<ICategoriesButton> = memo(
  ({ title, onPress, style }) => {
    return (
      <TouchableOpacity
        style={[styles.button, style]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Text style={styles.text}>{title}</Text>
        <View style={styles.arrowContainer}>
          <Image
            source={require('../../../assets/icons/arrowDown.png')}
            style={styles.icon}
          />
        </View>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.blackTransparent,
    paddingVertical: 10,
    paddingLeft: 10,
    paddingRight: 5,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    height: 35,
  },
  text: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  icon: {
    width: 10,
    height: 8,
  },
  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blackTransparent,
    width: 24,
    height: 24,
    borderRadius: 12,
  },
});

export default CategoriesButton;
