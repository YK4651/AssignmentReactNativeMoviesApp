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
  const [hasSearched, setHasSearched] = useState(false);
  const navigation = useNavigation();

  const handleSearch = async () => {
    setHasSearched(true);
    try {
      const response = await API.search(selectedSearchType, searchQuery);
      setSearchResults(response.results || []);
    } catch (error) {
      Alert.alert('Error', 'Failed to search');
      console.error(error);
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
        {hasSearched ? 'No results found' : 'Please Initiate a search'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.searchTitle}>Search Movie/ TV Show Name*</Text>
      <View style={styles.searchContainer}>

        <TextInput
          style={styles.searchInput}
          placeholder="i.e. James Bond"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.searchTitle}>Choose Search Type*</Text>
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
  searchTitle: {
    fontSize: 15,
    marginTop: 10,
    paddingHorizontal: 16,
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
    fontWeight: 'bold',
    color: '#666',
    textAlign: 'center',
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