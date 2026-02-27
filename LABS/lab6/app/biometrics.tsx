
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

export default function BiometricsScreen() {
  const [authResult, setAuthResult] = useState<string | null>(null);

  const handleBiometricAuth = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) {
      setAuthResult('Biometric authentication is not available on this device.');
      return;
    }

    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isEnrolled) {
      setAuthResult('No biometrics are enrolled on this device.');
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Scan your fingerprint or face',
    });

    if (result.success) {
      setAuthResult('Authentication successful!');
    } else {
      setAuthResult(`Authentication failed: ${result.error}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Biometric Authentication</Text>
      <Button title="Scan Fingerprint or Face" onPress={handleBiometricAuth} />
      {authResult && <Text style={styles.result}>{authResult}</Text>}
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
  result: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
  },
});
