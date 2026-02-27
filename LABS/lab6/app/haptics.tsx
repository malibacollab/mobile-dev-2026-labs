
import { Button, StyleSheet, View } from 'react-native';
import * as Haptics from 'expo-haptics';

export default function HapticsScreen() {
  return (
    <View style={styles.container}>
      <Button
        title="Trigger Light Feedback"
        onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
      />
      <View style={styles.separator} />
      <Button
        title="Trigger Medium Feedback"
        onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
      />
      <View style={styles.separator} />
      <Button
        title="Trigger Heavy Feedback"
        onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)}
      />
       <View style={styles.separator} />
      <Button
        title="Trigger Success"
        onPress={() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)}
      />
       <View style={styles.separator} />
      <Button
        title="Trigger Warning"
        onPress={() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)}
      />
       <View style={styles.separator} />
      <Button
        title="Trigger Error"
        onPress={() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)}
      />
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
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
