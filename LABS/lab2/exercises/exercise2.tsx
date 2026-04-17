import { View, Text, TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native';

const colors = {
  default: { bg: '#e0e0e0', text: '#666' },
  primary: { bg: '#007AFF', text: '#fff' },
  success: { bg: '#34C759', text: '#fff' },
  warning: { bg: '#FF9500', text: '#fff' },
  danger:  { bg: '#FF3B30', text: '#fff' },
};


type TagVariant = keyof typeof colors;

interface TagProps {
  text: string;
  variant?: TagVariant;
  onPress?: (event: GestureResponderEvent) => void;
}

function Tag({ text, variant = 'default', onPress }: TagProps) {
  const colorScheme = colors[variant as TagVariant];

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      backgroundColor: colorScheme.bg,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      alignSelf: 'flex-start',
    },
    text: {
      color: colorScheme.text,
      fontSize: 12,
      fontWeight: '500',
    },
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      disabled={!onPress}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

export default Tag;
