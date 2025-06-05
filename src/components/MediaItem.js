import React from "react";
import {View, Text, Image, TouchableOpacity, StyleSheet} from "react-native";
import { API } from "../services/api";

export default function MediaItem({item, onPress, mediaType}) {
    const title = item.title || item.name;
    const releaseDate = item.release_date || item.first_air_date;
    const popularity = item.popularity ? item.popularity.toFixed(1) : 'N/A';
    const imageUrl = API.getImageURL(item.poster_path || item.backdrop_path);

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Image 
                source={{uri: imageUrl}} 
                style={styles.poster} 
            />
            <View style={styles.info}>
                <Text style={styles.title} numberOfLines={2}>{title}</Text>
                <Text style={styles.date}>Popularity: {popularity}</Text>
                <Text style={styles.date}>Release Date: {releaseDate}</Text>
                <TouchableOpacity style={styles.detailsButton} onPress={onPress}>
                    <Text style={styles.detailsButtonText}>More Details</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  poster: {
    width: 80,
    height: 80,
    borderRadius: 4,
    alignSelf: 'center',
    backgroundColor: '#f0f0f0',
  },
  info: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  rating: {
    fontSize: 14,
    color: '#f39c12',
    marginBottom: 10,
  },
  detailsButton: {
    backgroundColor: '#00d9ed',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  detailsButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});