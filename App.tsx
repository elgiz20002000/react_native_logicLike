import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchCourses } from '@shared/services/courses';
import { ICourseItem } from '@shared/interfaces';
import { GameCard } from '@shared/components/gameCard';
import { ListItemSeparator } from '@shared/components/listItemSeparator';
import colors from '@shared/constants/colors';
import CategoriesButton from '@shared/components/categoriesButton';
import { CatalogModal } from '@shared/components/modals/catalogModal';
import { TNullable } from '@shared/types';

function App() {
  const [courses, setCourses] = useState<ICourseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const categories = useMemo(
    () =>
      Array.from(
        new Set(['Все темы', ...courses.flatMap(course => course.tags)]),
      ),
    [courses],
  );

  const coursesFiltered = useMemo(() => {
    if (!selectedTag) {
      return courses;
    }
    return courses.filter(course => course.tags.includes(selectedTag));
  }, [courses, selectedTag]);

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSelectCategory = useCallback((category: TNullable<string>) => {
    setSelectedTag(category);
    setModalVisible(false);
  }, []);

  const handleOpenModal = useCallback(() => {
    setModalVisible(true);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await fetchCourses();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
        Alert.alert('Ошибка', 'Не удалось загрузить курсы. Попробуйте позже.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <CategoriesButton
          title={selectedTag || 'Выберите тему'}
          onPress={handleOpenModal}
          style={styles.categoriesButton}
        />
        {loading ? (
          <ActivityIndicator style={styles.activityIndicator} />
        ) : (
          <FlatList
            data={coursesFiltered}
            renderItem={({ item }) => <GameCard item={item} />}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.contentContainer}
            horizontal
            showsHorizontalScrollIndicator={false}
            initialNumToRender={4}
            ItemSeparatorComponent={ListItemSeparator}
          />
        )}
      </SafeAreaView>
      <CatalogModal
        selectedTag={selectedTag}
        visible={modalVisible}
        categories={categories}
        onClose={handleCloseModal}
        onSelect={handleSelectCategory}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.mainBg,
    flex: 1,
    alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center',
  },
  categoriesButton: {
    marginTop: 16,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
