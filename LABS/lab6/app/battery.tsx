
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Battery from 'expo-battery';

export default function BatteryScreen() {
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [batteryState, setBatteryState] = useState<Battery.BatteryState | null>(null);

  useEffect(() => {
    _subscribe();
    return () => {
      _unsubscribe();
    };
  }, []);

  const _subscribe = async () => {
    const level = await Battery.getBatteryLevelAsync();
    setBatteryLevel(level);

    const state = await Battery.getBatteryStateAsync();
    setBatteryState(state);

    Battery.addBatteryLevelListener(({ batteryLevel }) => {
      setBatteryLevel(batteryLevel);
    });

    Battery.addBatteryStateListener(({ batteryState }) => {
      setBatteryState(batteryState);
    });
  };

  const _unsubscribe = () => {
    // Battery.removeAllListeners(); - no longer needed
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Battery Information</Text>
      <Text style={styles.text}>
        Battery Level: {batteryLevel !== null ? `${Math.round(batteryLevel * 100)}%` : 'Loading...'}
      </Text>
      <Text style={styles.text}>
        Battery State: {batteryState !== null ? Battery.BatteryState[batteryState] : 'Loading...'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});
