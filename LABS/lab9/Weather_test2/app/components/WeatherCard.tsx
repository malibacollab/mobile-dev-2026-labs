import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { WeatherData, getWeatherInfo } from "../../services/weather";

interface Props {
  weather: WeatherData | null;
  loading: boolean;
  locationName: string;
}

function getDayLabel(dateStr: string, index: number) {
  if (index === 0) return "Today";
  if (index === 1) return "Tomorrow";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { weekday: "short" });
}

export default function WeatherCard({ weather, loading, locationName }: Props) {
  const { colors } = useTheme();

  const s = StyleSheet.create({
    container: {
      backgroundColor: colors.surface,
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      paddingTop: 12,
      paddingBottom: 32,
      shadowColor: colors.cardShadow,
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 1,
      shadowRadius: 16,
      elevation: 12,
    },
    handle: {
      width: 36,
      height: 4,
      backgroundColor: colors.border,
      borderRadius: 2,
      alignSelf: "center",
      marginBottom: 16,
    },
    locationRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 20,
      marginBottom: 4,
    },
    pin: {
      fontSize: 14,
      marginRight: 6,
    },
    locationName: {
      fontSize: 13,
      color: colors.textSecondary,
      letterSpacing: 0.5,
      fontFamily: "monospace",
      textTransform: "uppercase",
    },
    currentRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingVertical: 8,
    },
    tempBlock: {
      flexDirection: "column",
    },
    temp: {
      fontSize: 64,
      fontWeight: "200",
      color: colors.text,
      lineHeight: 68,
      letterSpacing: -2,
    },
    conditionLabel: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 2,
    },
    weatherIcon: {
      fontSize: 56,
    },
    detailsRow: {
      flexDirection: "row",
      paddingHorizontal: 20,
      gap: 12,
      marginBottom: 16,
    },
    detailChip: {
      backgroundColor: colors.surfaceAlt,
      borderRadius: 10,
      paddingVertical: 8,
      paddingHorizontal: 14,
      flex: 1,
      alignItems: "center",
    },
    detailLabel: {
      fontSize: 10,
      color: colors.textSecondary,
      letterSpacing: 1,
      textTransform: "uppercase",
      fontFamily: "monospace",
    },
    detailValue: {
      fontSize: 16,
      color: colors.text,
      fontWeight: "600",
      marginTop: 2,
    },
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginHorizontal: 20,
      marginBottom: 12,
    },
    forecastTitle: {
      fontSize: 11,
      color: colors.textSecondary,
      letterSpacing: 1.5,
      textTransform: "uppercase",
      fontFamily: "monospace",
      paddingHorizontal: 20,
      marginBottom: 10,
    },
    forecastScroll: {
      paddingHorizontal: 16,
    },
    forecastItem: {
      alignItems: "center",
      backgroundColor: colors.surfaceAlt,
      borderRadius: 14,
      paddingVertical: 12,
      paddingHorizontal: 14,
      marginHorizontal: 4,
      minWidth: 70,
    },
    forecastDay: {
      fontSize: 11,
      color: colors.textSecondary,
      fontFamily: "monospace",
      letterSpacing: 0.5,
      marginBottom: 6,
    },
    forecastIcon: {
      fontSize: 24,
      marginBottom: 6,
    },
    forecastMax: {
      fontSize: 15,
      fontWeight: "700",
      color: colors.text,
    },
    forecastMin: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 1,
    },
    forecastRain: {
      fontSize: 10,
      color: colors.accent,
      marginTop: 4,
    },
    centered: {
      padding: 32,
      alignItems: "center",
    },
    loadingText: {
      color: colors.textSecondary,
      marginTop: 10,
      fontFamily: "monospace",
      fontSize: 12,
    },
  });

  return (
    <View style={s.container}>
      <View style={s.handle} />
      <View style={s.locationRow}>
        <Text style={s.pin}>📍</Text>
        <Text style={s.locationName} numberOfLines={1}>
          {locationName || "Loading location…"}
        </Text>
      </View>

      {loading || !weather ? (
        <View style={s.centered}>
          <ActivityIndicator color={colors.accent} size="large" />
          <Text style={s.loadingText}>Fetching weather…</Text>
        </View>
      ) : (
        <>
          <View style={s.currentRow}>
            <View style={s.tempBlock}>
              <Text style={s.temp}>{weather.current.temperature}°</Text>
              <Text style={s.conditionLabel}>
                {getWeatherInfo(weather.current.weatherCode).label}
              </Text>
            </View>
            <Text style={s.weatherIcon}>
              {getWeatherInfo(weather.current.weatherCode).icon}
            </Text>
          </View>

          <View style={s.detailsRow}>
            <View style={s.detailChip}>
              <Text style={s.detailLabel}>Feels</Text>
              <Text style={s.detailValue}>{weather.current.feelsLike}°</Text>
            </View>
            <View style={s.detailChip}>
              <Text style={s.detailLabel}>Wind</Text>
              <Text style={s.detailValue}>{weather.current.windSpeed}</Text>
            </View>
            <View style={s.detailChip}>
              <Text style={s.detailLabel}>Humid</Text>
              <Text style={s.detailValue}>{weather.current.humidity}%</Text>
            </View>
          </View>

          <View style={s.divider} />
          <Text style={s.forecastTitle}>7-Day Forecast</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={s.forecastScroll}
          >
            {weather.daily.map((day, i) => (
              <View key={day.date} style={s.forecastItem}>
                <Text style={s.forecastDay}>{getDayLabel(day.date, i)}</Text>
                <Text style={s.forecastIcon}>
                  {getWeatherInfo(day.weatherCode).icon}
                </Text>
                <Text style={s.forecastMax}>{day.maxTemp}°</Text>
                <Text style={s.forecastMin}>{day.minTemp}°</Text>
                {day.precipitation > 0 && (
                  <Text style={s.forecastRain}>
                    💧{day.precipitation.toFixed(1)}
                  </Text>
                )}
              </View>
            ))}
          </ScrollView>
        </>
      )}
    </View>
  );
}