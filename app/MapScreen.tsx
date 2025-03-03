import React, { useEffect, useState } from "react";
import { View, TextInput, StyleSheet, ActivityIndicator, Alert } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import * as Location from "expo-location";
import Shapes from "./Shapes"; // Import Shapes component

const MapScreen = () => {
  const [region, setRegion] = useState<Region | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "Allow location access to continue.");
        setLoading(false);
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

      setLoading(false);
    };

    getLocation();
  }, []);

  // Function to search location using OpenStreetMap
  const searchLocation = async () => {
    if (!searchText.trim()) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchText)}`
      );
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];
        setRegion({
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      } else {
        Alert.alert("Not Found", "No results found for this location.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch location.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a place"
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={searchLocation}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : (
        <MapView provider={PROVIDER_GOOGLE} style={styles.map} region={region}>
          {region && <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} title="Selected Location" />}

          <Shapes region={region} />
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInput: {
    position: "absolute",
    top: 50,
    left: 10,
    right: 10,
    backgroundColor: "#fff",
    height: 44,
    borderRadius: 5,
    paddingHorizontal: 30,
    fontSize: 16,
    borderColor: "#ddd",
    borderWidth: 1,
    zIndex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -20,
    marginTop: -20,
  },
});

export default MapScreen;
