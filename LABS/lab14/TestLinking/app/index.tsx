import * as Linking from "expo-linking";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

const TARGET_URL = "testlinking2://settings";

export default function HomeScreen() {
  async function openTestLinking2Settings() {
    try {
      await Linking.openURL(TARGET_URL);
    } catch {
      Alert.alert(
        "App Not Found",
        "TestLinking2 is not installed on this device. Please install it first.",
        [{ text: "OK" }]
      );
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>App 1: Home</Text>
      <Text style={styles.subtitle}>TestLinking — The Sender</Text>

      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={openTestLinking2Settings}
      >
        <Text style={styles.buttonText}>To Settings TestLinking2</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAF4FF",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1A1A2E",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 48,
  },
  button: {
    backgroundColor: "#4A90D9",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.97 }],
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    textAlign: "center",
  },
});
