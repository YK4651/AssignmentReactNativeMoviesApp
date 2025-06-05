import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  FlatList, 
  StyleSheet, 
  Alert,
  TouchableOpacity 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API } from '../services/api';
import MediaItem from '../components/MediaItem';
import Dropdown from '../components/DropDown';

const SEARCH_TYPES = [
  { label: 'Movie', value: 'movie' },
  { label: 'Multi', value: 'multi' },
  { label: 'TV', value: 'tv' },
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSearchType, setSelectedSearchType] = useState('movie');
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const navigation = useNavigation();

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      Alert.alert('Error', 'Please enter a search term');
      return;
    }

    setLoading(true);
    setHasSearched(true);
    try {
      const response = await API.search(selectedSearchType, searchQuery);
      setSearchResults(response.results || []);
    } catch (error) {
      Alert.alert('Error', 'Failed to search');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleItemPress = (item) => {
    const mediaType = item.media_type || selectedSearchType;
    const title = item.title || item.name;
    
    navigation.navigate('Details', { 
      id: item.id, 
      mediaType: mediaType === 'multi' ? (item.title ? 'movie' : 'tv') : mediaType,
      title: title 
    });
  };

  const renderSearchItem = ({ item }) => (
    <MediaItem 
      item={item} 
      onPress={() => handleItemPress(item)}
      mediaType={item.media_type || selectedSearchType}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        {hasSearched ? 'No results found' : 'Enter a search query to find movies and TV shows'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for movies or TV shows..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      
      <Dropdown
        label="Search Type"
        style={styles.dropdownWrapper}
        selectedValue={selectedSearchType}
        onValueChange={setSelectedSearchType}
        options={SEARCH_TYPES}
      />

      <FlatList
        data={searchResults}
        renderItem={renderSearchItem}
        keyExtractor={(item) => `${item.id}-${item.media_type || selectedSearchType}`}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 10,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
  },
  searchButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4,
    justifyContent: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  dropdownWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    alignItems: 'center', // 中央寄せ
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});