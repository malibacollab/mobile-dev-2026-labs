import { View, Text, StyleSheet } from 'react-native';

interface StatCardProps {
  value: string | number;
  label: string;
  icon?: string;
  change?: number;
}

function StatCard({ value, label, icon, change }: StatCardProps) {
  const isPositive = change && change > 0;
  const changeColor = isPositive ? '#34C759' : '#FF3B30';
  const changeSymbol = isPositive ? '+' : '';

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 20,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
      alignItems: 'center',
    },
    icon: {
      fontSize: 32,
      marginBottom: 12,
    },
    value: {
      fontSize: 32,
      fontWeight: '700',
      color: '#000',
      marginBottom: 4,
    },
    label: {
      fontSize: 14,
      color: '#666',
      fontWeight: '500',
      marginBottom: change ? 8 : 0,
    },
    changeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
      paddingHorizontal: 8,
      paddingVertical: 4,
      backgroundColor: changeColor + '15',
      borderRadius: 6,
    },
    change: {
      fontSize: 12,
      fontWeight: '600',
      color: changeColor,
    },
  });

  return (
    <View style={styles.container}>
      {icon && <Text style={styles.icon}>{icon}</Text>}
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
      {change !== undefined && (
        <View style={styles.changeContainer}>
          <Text style={styles.change}>
            {changeSymbol}{Math.abs(change)}%
          </Text>
        </View>
      )}
    </View>
  );
}

export default StatCard;
