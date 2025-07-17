import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FC, memo } from 'react';
import { ICourseItem } from '@shared/interfaces';
import colors from '@shared/constants/colors';

interface IGameCard {
  item: ICourseItem;
}

export const GameCard: FC<IGameCard> = memo(({ item }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={{ ...styles.imageContainer, backgroundColor: item.bgColor }}>
        <Image
          source={{
            uri: item.image,
          }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    width: 210,
    height: 198,
    borderRadius: 24,
    overflow: 'hidden',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '20%',
  },
  title: {
    fontSize: 13,
    lineHeight: 12,
    fontWeight: '800',
    color: colors.text,
  },
  image: {
    width: 144,
    height: 144,
  },
});
