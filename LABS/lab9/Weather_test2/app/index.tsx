import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import * as Location from "expo-location";
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";
import WeatherCard from "./components/WeatherCard";
import { fetchWeather, geocodeSearch, WeatherData } from "../services/weather";

const DARK_MAP_STYLE = [
  { elementType: "geometry", stylers: [{ color: "#1a1a2e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#1a1a2e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#2d3561" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#c0873f" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#0d1b2a" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263c3f" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }],
  },
];

interface Coord {
  latitude: number;
  longitude: number;
}

export default function MapScreen() {
  const { theme, colors } = useTheme();
  const navigation = useNavigation();
  const mapRef = useRef<MapView>(null);
  const [userLocation, setUserLocation] = useState<Coord | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Coord | null>(null);
  const [locationName, setLocationName] = useState("Your Location");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  const loadWeather = useCallback(async (lat: number, lng: number) => {
    setWeatherLoading(true);
    setWeather(null);
    try {
      const data = await fetchWeather(lat, lng);
      setWeather(data);
    } catch (e) {
      console.warn("Weather fetch failed", e);
    } finally {
      setWeatherLoading(false);
    }
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      const coord: Coord = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      };
      setUserLocation(coord);
      setSelectedLocation(coord);

      try {
        const geo = await Location.reverseGeocodeAsync(coord);
        if (geo[0]) {
          const g = geo[0];
          setLocationName(
            [g.city, g.region, g.country].filter(Boolean).join(", ")
          );
        }
      } catch {}

      loadWeather(coord.latitude, coord.longitude);

      mapRef.current?.animateToRegion({
        ...coord,
        latitudeDelta: 0.08,
        longitudeDelta: 0.08,
      });
    })();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    Keyboard.dismiss();
    setSearchLoading(true);
    setSearchError("");
    try {
      const result = await geocodeSearch(searchQuery.trim());
      if (!result) {
        setSearchError("Location not found");
        return;
      }
      const coord: Coord = {
        latitude: result.latitude,
        longitude: result.longitude,
      };
      setSelectedLocation(coord);
      setLocationName(`${result.name}, ${result.country}`);
      loadWeather(result.latitude, result.longitude);
      mapRef.current?.animateToRegion({
        ...coord,
        latitudeDelta: 0.08,
        longitudeDelta: 0.08,
      });
      setSearchQuery("");
    } catch {
      setSearchError("Search failed");
    } finally {
      setSearchLoading(false);
    }
  };

  const goToMyLocation = () => {
    if (!userLocation) return;
    setSelectedLocation(userLocation);
    setLocationName("Your Location");
    loadWeather(userLocation.latitude, userLocation.longitude);
    mapRef.current?.animateToRegion({
      ...userLocation,
      latitudeDelta: 0.08,
      longitudeDelta: 0.08,
    });
  };

  const s = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    map: { flex: 1 },
    topBar: {
      position: "absolute",
      top: Platform.OS === "ios" ? 56 : (StatusBar.currentHeight ?? 0) + 12,
      left: 16,
      right: 16,
      flexDirection: "row",
      gap: 10,
      zIndex: 10,
    },
    menuBtn: {
      width: 48,
      height: 48,
      borderRadius: 14,
      backgroundColor: colors.surface,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
      elevation: 5,
    },
    searchBox: {
      flex: 1,
      height: 48,
      borderRadius: 14,
      backgroundColor: colors.surface,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 14,
      gap: 8,
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
      elevation: 5,
    },
    searchInput: {
      flex: 1,
      color: colors.text,
      fontSize: 15,
      height: "100%",
    },
    searchBtn: {
      width: 48,
      height: 48,
      borderRadius: 14,
      backgroundColor: colors.accent,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: colors.accent,
      shadowOpacity: 0.4,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
      elevation: 5,
    },
    errorBubble: {
      position: "absolute",
      top: Platform.OS === "ios" ? 116 : (StatusBar.currentHeight ?? 0) + 72,
      left: 16,
      right: 16,
      backgroundColor: "#FF3B30",
      borderRadius: 10,
      padding: 10,
      zIndex: 10,
      alignItems: "center",
    },
    errorText: { color: "#fff", fontSize: 13, fontFamily: "monospace" },
    myLocationBtn: {
      position: "absolute",
      right: 16,
      bottom: 300,
      width: 46,
      height: 46,
      borderRadius: 23,
      backgroundColor: colors.surface,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
      elevation: 5,
      zIndex: 10,
    },
    markerDot: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: colors.accent,
      borderWidth: 3,
      borderColor: colors.surface,
    },
  });

  return (
    <View style={s.container}>
      <StatusBar barStyle={colors.statusBar} />

      <MapView
        ref={mapRef}
        style={s.map}
        provider={PROVIDER_DEFAULT}
        customMapStyle={theme === "dark" ? DARK_MAP_STYLE : []}
        showsUserLocation
        showsMyLocationButton={false}
        showsCompass={false}
        initialRegion={{
          latitude: 48.8566,
          longitude: 2.3522,
          latitudeDelta: 5,
          longitudeDelta: 5,
        }}
      >
        {selectedLocation && (
          <Marker coordinate={selectedLocation} title={locationName}>
            <View style={s.markerDot} />
          </Marker>
        )}
      </MapView>

      {/* Search bar + menu button */}
      <View style={s.topBar}>
        <TouchableOpacity
          style={s.menuBtn}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Text style={{ fontSize: 20 }}>☰</Text>
        </TouchableOpacity>

        <View style={s.searchBox}>
          <Text>🔍</Text>
          <TextInput
            style={s.searchInput}
            placeholder="Search city or place…"
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          {searchLoading && (
            <ActivityIndicator size="small" color={colors.accent} />
          )}
        </View>

        <TouchableOpacity style={s.searchBtn} onPress={handleSearch}>
          <Text style={{ fontSize: 18, color: "#fff" }}>→</Text>
        </TouchableOpacity>
      </View>

      {searchError ? (
        <View style={s.errorBubble}>
          <Text style={s.errorText}>{searchError}</Text>
        </View>
      ) : null}

      <TouchableOpacity style={s.myLocationBtn} onPress={goToMyLocation}>
        <Text style={{ fontSize: 20 }}>📍</Text>
      </TouchableOpacity>

      <WeatherCard
        weather={weather}
        loading={weatherLoading}
        locationName={locationName}
      />
    </View>
  );
}