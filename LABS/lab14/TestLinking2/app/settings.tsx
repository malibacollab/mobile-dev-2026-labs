import * as Linking from "expo-linking";
import { Pressable, StyleSheet, Text, View } from "react-native";

const BACK_URL = "testlinking://profile";

export default function SettingsScreen() {
  async function goToTestLinkingProfile() {
    await Linking.openURL(BACK_URL);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the SETTINGS Page</Text>
      <Text style={styles.subtitle}>Opened via deep link: testlinking2://settings</Text>

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
    backgroundColor: "#1A1A2E",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFD700",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#AAA",
    marginBottom: 48,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#FFD700",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.97 }],
  },
  buttonText: {
    color: "#1A1A2E",
    fontSize: 17,
    fontWeight: "700",
    textAlign: "center",
  },
});
