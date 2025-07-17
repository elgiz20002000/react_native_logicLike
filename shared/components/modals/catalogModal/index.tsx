import colors from '@shared/constants/colors';
import { TNullable, TVoidFunction } from '@shared/types';
import { FC } from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Image,
} from 'react-native';
import { CatalogOption } from './catalogOption';

interface ICatalogModal {
  visible: boolean;
  onClose: TVoidFunction;
  onSelect: (category: TNullable<string>) => void;
  categories: string[];
  selectedTag?: TNullable<string>;
}

export const CatalogModal: FC<ICatalogModal> = ({
  categories,
  onClose,
  onSelect,
  visible,
  selectedTag,
}) => {
  return (
    <Modal
      supportedOrientations={['landscape']}
      visible={visible}
      animationType="slide"
      transparent={false}
    >
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Image
            source={require('../../../../assets/icons/close.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <Text style={styles.title}>Выбор темы</Text>

        <View style={styles.optionList}>
          <FlatList
            data={categories}
            keyExtractor={(_, index) => index.toString()}
            initialNumToRender={5}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              const isFirstOption = index === 0;
              const isActive = isFirstOption
                ? !selectedTag
                : selectedTag === item;

              return (
                <CatalogOption
                  item={item}
                  isFirstOption={isFirstOption}
                  isActive={isActive}
                  onSelect={onSelect}
                />
              );
            }}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
    zIndex: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    textAlign: 'center',
    marginVertical: 24,
    color: colors.categoryText,
  },
  optionList: {
    width: 336,
    paddingBottom: 60,
  },
});
