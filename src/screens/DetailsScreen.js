import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  StyleSheet, 
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { API } from '../services/api';

export default function DetailsScreen({ route }) {
  const { id, mediaType, title } = route.params;
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      let response;
      if (mediaType === 'movie') {
        response = await API.getMovieDetails(id);
      } else {
        response = await API.getTVDetails(id);
      }
      setDetails(response);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch details');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Loading details...</Text>
      </View>
    );
  }

  if (!details) {
    return (
      <View style={styles.errorContainer}>
        <Text>Failed to load details</Text>
      </View>
    );
  }

  const displayTitle = details.title || details.name;
  const releaseDate = details.release_date || details.first_air_date;
  const imageUrl = API.getImageURL(details.poster_path);

  return (

    <ScrollView style={styles.container}>
          <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
          <Text style={styles.title}>{displayTitle}</Text>
        <View style={styles.headerInfo}>
          <Image 
          source={{ uri: imageUrl }} 
          style={[styles.poster, {resizeMode: 'center'}]}
        />
        </View>
      </View>
      
      <View style={styles.section}>
        {/* <Text style={styles.sectionTitle}>Overview</Text> */}
        <Text style={styles.overview}>{details.overview}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.overview}>Popularity: {details.popularity} | Release Date: {releaseDate}</Text>
      </View>
          </SafeAreaView>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  headerInfo: {
    flex: 1,
    marginLeft: 20,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  rating: {
    fontSize: 16,
    color: '#f39c12',
    marginBottom: 5,
  },
  runtime: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  overview: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
  genres: {
    fontSize: 14,
    color: '#666',
  },
  info: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  safeArea: {
    flex: 1,
  },
});