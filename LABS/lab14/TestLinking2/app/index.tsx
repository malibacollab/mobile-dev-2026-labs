import * as Linking from "expo-linking";
import { Pressable, StyleSheet, Text, View } from "react-native";

const BACK_URL = "testlinking://profile";

export default function HomeScreen() {
  async function goToTestLinkingProfile() {
    await Linking.openURL(BACK_URL);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to TestLinking2 Home</Text>
      <Text style={styles.subtitle}>TestLinking2 — The Receiver</Text>

      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={goToTestLinkingProfile}
      >
        <Text style={styles.buttonText}>Back to TestLinking Profile</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAFAF1",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1A1A2E",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 48,
  },
  button: {
    backgroundColor: "#2ECC71",
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
