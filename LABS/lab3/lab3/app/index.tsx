import { Text, View } from "react-native";

export default function Index() {
  return (
  <View style={styles.card}>
    <Text style={styles.city}>City Name</Text>
    <Text style={styles.temp}>72°</Text>
    <View style={styles.conditionRow}>
      {/* <Image source={...} style={styles.icon} /> */}
      <Text style={styles.description}>Sunny</Text>
    </View>
    <View style={styles.highLowRow}>
      <Text style={styles.high}>H: 78°</Text>
      <Text style={styles.low}>L: 65°</Text>
    </View>
  </View>
  );
}
