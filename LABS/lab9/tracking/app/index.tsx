import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker, Polyline } from "react-native-maps";

interface Coordinate {
  latitude: number;
  longitude: number;
}

export default function Index() {
  const [location, setLocation] = useState<Coordinate | null>(null);
  const [breadcrumbs, setBreadcrumbs] = useState<Coordinate[]>([]);
  const [isTracking, setIsTracking] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [speed, setSpeed] = useState<number | null>(null);
  const [altitude, setAltitude] = useState<number | null>(null);
  const subscriptionRef = useRef<Location.LocationSubscription | null>(null);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied.");
        return;
      }

      // Get initial location
      const initial = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      const coord = {
        latitude: initial.coords.latitude,
        longitude: initial.coords.longitude,
      };
      setLocation(coord);
    })();
  }, []);

  const startTracking = async () => {
    setIsTracking(true);
    setBreadcrumbs([]);

    subscriptionRef.current = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 2000,
        distanceInterval: 5,
      },
      (loc) => {
        const coord: Coordinate = {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        };
        setLocation(coord);
        setSpeed(loc.coords.speed);
        setAltitude(loc.coords.altitude);
        setBreadcrumbs((prev) => [...prev, coord]);

        mapRef.current?.animateToRegion({
          ...coord,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
      }
    );
  };

  const stopTracking = () => {
    subscriptionRef.current?.remove();
    subscriptionRef.current = null;
    setIsTracking(false);
  };

  const clearTrail = () => {
    setBreadcrumbs([]);
  };

  useEffect(() => {
    return () => {
      subscriptionRef.current?.remove();
    };
  }, []);

  if (errorMsg) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{errorMsg}</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.centered}>
        <Text style={styles.loadingText}>Acquiring GPS signal…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          ...location,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        showsUserLocation
        showsCompass
        showsScale
      >
        {/* Breadcrumb trail polyline */}
        {breadcrumbs.length > 1 && (
          <Polyline
            coordinates={breadcrumbs}
            strokeColor="#FF3B30"
            strokeWidth={3}
            lineDashPattern={[0]}
          />
        )}

        {/* Breadcrumb dots */}
        {breadcrumbs.map((crumb, index) => (
          <Marker
            key={index}
            coordinate={crumb}
            anchor={{ x: 0.5, y: 0.5 }}
            tracksViewChanges={false}
          >
            <View style={styles.crumbDot} />
          </Marker>
        ))}
      </MapView>

      {/* HUD overlay */}
      <View style={styles.hud}>
        <View style={styles.hudRow}>
          <View style={styles.hudItem}>
            <Text style={styles.hudLabel}>LAT</Text>
            <Text style={styles.hudValue}>{location.latitude.toFixed(5)}</Text>
          </View>
          <View style={styles.hudItem}>
            <Text style={styles.hudLabel}>LNG</Text>
            <Text style={styles.hudValue}>{location.longitude.toFixed(5)}</Text>
          </View>
          <View style={styles.hudItem}>
            <Text style={styles.hudLabel}>POINTS</Text>
            <Text style={styles.hudValue}>{breadcrumbs.length}</Text>
          </View>
        </View>
        {(speed !== null || altitude !== null) && (
          <View style={styles.hudRow}>
            {speed !== null && (
              <View style={styles.hudItem}>
                <Text style={styles.hudLabel}>SPEED</Text>
                <Text style={styles.hudValue}>
                  {Math.max(0, speed * 3.6).toFixed(1)} km/h
                </Text>
              </View>
            )}
            {altitude !== null && (
              <View style={styles.hudItem}>
                <Text style={styles.hudLabel}>ALT</Text>
                <Text style={styles.hudValue}>{altitude.toFixed(1)} m</Text>
              </View>
            )}
          </View>
        )}
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        {!isTracking ? (
          <TouchableOpacity style={styles.startBtn} onPress={startTracking}>
            <Text style={styles.btnText}>▶ START TRACKING</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.stopBtn} onPress={stopTracking}>
            <Text style={styles.btnText}>⏹ STOP TRACKING</Text>
          </TouchableOpacity>
        )}
        {breadcrumbs.length > 0 && !isTracking && (
          <TouchableOpacity style={styles.clearBtn} onPress={clearTrail}>
            <Text style={styles.clearBtnText}>Clear Trail</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0a0a0a",
  },
  loadingText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "monospace",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 16,
    textAlign: "center",
    padding: 24,
  },
  crumbDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF3B30",
    borderWidth: 1.5,
    borderColor: "#fff",
  },
  hud: {
    position: "absolute",
    top: 56,
    left: 16,
    right: 16,
    backgroundColor: "rgba(0,0,0,0.75)",
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  hudRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  hudItem: {
    alignItems: "center",
  },
  hudLabel: {
    color: "#8E8E93",
    fontSize: 10,
    fontFamily: "monospace",
    letterSpacing: 1,
  },
  hudValue: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "monospace",
    fontWeight: "600",
  },
  controls: {
    position: "absolute",
    bottom: 48,
    left: 24,
    right: 24,
    gap: 10,
    alignItems: "center",
  },
  startBtn: {
    backgroundColor: "#34C759",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 14,
    width: "100%",
    alignItems: "center",
    shadowColor: "#34C759",
    shadowOpacity: 0.5,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  stopBtn: {
    backgroundColor: "#FF3B30",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 14,
    width: "100%",
    alignItems: "center",
    shadowColor: "#FF3B30",
    shadowOpacity: 0.5,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  btnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    fontFamily: "monospace",
    letterSpacing: 1,
  },
  clearBtn: {
    paddingVertical: 10,
  },
  clearBtnText: {
    color: "#8E8E93",
    fontSize: 14,
  },
});