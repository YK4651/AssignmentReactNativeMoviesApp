import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API } from '../services/api';
import MediaItem from '../components/MediaItem';
import Dropdown from '../components/DropDown';

const TV_TYPES = [
  { label: 'Airing Today', value: 'airing_today' },
  { label: 'On The Air', value: 'on_the_air' },
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
];

export default function TVScreen() {
  const [tvShows, setTvShows] = useState([]);
  const [selectedType, setSelectedType] = useState('airing_today');
  const navigation = useNavigation();

  useEffect(() => {
    fetchTVShows(selectedType);
  }, [selectedType]);

  const fetchTVShows = async (type) => {
    try {
      const response = await API.getTV(type);
      setTvShows(response.results || []);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch TV shows');
      console.error(error);
    }
  };

  const handleTVPress = (tvShow) => {
    navigation.navigate('Details', { 
      id: tvShow.id, 
      mediaType: 'tv',
      title: tvShow.name 
    });
  };

  const renderTVItem = ({ item }) => (
    <MediaItem 
      item={item} 
      onPress={() => handleTVPress(item)}
      mediaType="tv"
    />
  );

  return (
    <View style={styles.container}>
      <Dropdown
        label="TV Category"
        selectedValue={selectedType}
        onValueChange={setSelectedType}
        options={TV_TYPES}
      />
      <FlatList
        data={tvShows}
        renderItem={renderTVItem}
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
});