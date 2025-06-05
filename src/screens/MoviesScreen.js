import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API } from '../services/api';
import MediaItem from '../components/MediaItem';
import Dropdown from '../components/DropDown';

const MOVIE_TYPES = [
  { label: 'Now Playing', value: 'now_playing' },
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];

export default function MoviesScreen() {
  const [movies, setMovies] = useState([]);
  const [selectedType, setSelectedType] = useState('now_playing');
  const navigation = useNavigation();

  useEffect(() => {
    fetchMovies(selectedType);
  }, [selectedType]);

  const fetchMovies = async (type) => {
    try {
      const response = await API.getMovies(type);
      setMovies(response.results || []);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch movies');
      console.error(error);
    }
  };

  const handleMoviePress = (movie) => {
    navigation.navigate('Details', { 
      id: movie.id, 
      mediaType: 'movie',
      title: movie.title 
    });
  };

  const renderMovieItem = ({ item }) => (
    <MediaItem 
      item={item} 
      onPress={() => handleMoviePress(item)}
      mediaType="movie"
    />
  );

  return (
    <View style={styles.container}>
      <Dropdown
        style={styles.dropdownWrapper}
        label="Movie Category"
        selectedValue={selectedType}
        onValueChange={setSelectedType}
        options={MOVIE_TYPES}
      />
      <FlatList
        data={movies}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  dropdownWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});