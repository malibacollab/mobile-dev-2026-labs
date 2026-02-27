import React from "react";
import {
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useTheme } from "../../context/ThemeContext";

export default function CustomDrawer(props: any) {
  const { theme, toggleTheme, colors } = useTheme();

  const s = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.drawerBg,
    },
    header: {
      paddingTop: 60,
      paddingBottom: 28,
      paddingHorizontal: 24,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    logo: {
      fontSize: 28,
      marginBottom: 6,
    },
    appName: {
      fontSize: 22,
      fontWeight: "700",
      color: colors.text,
      letterSpacing: -0.5,
    },
    appSub: {
      fontSize: 12,
      color: colors.textSecondary,
      letterSpacing: 1,
      textTransform: "uppercase",
      fontFamily: "monospace",
      marginTop: 2,
    },
    section: {
      paddingHorizontal: 24,
      paddingTop: 28,
    },
    sectionTitle: {
      fontSize: 10,
      color: colors.textSecondary,
      letterSpacing: 2,
      textTransform: "uppercase",
      fontFamily: "monospace",
      marginBottom: 16,
    },
    settingRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: colors.surface,
      borderRadius: 14,
      padding: 16,
      marginBottom: 10,
    },
    settingLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    settingIcon: {
      fontSize: 20,
    },
    settingLabel: {
      fontSize: 15,
      color: colors.text,
      fontWeight: "500",
    },
    settingValue: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 1,
    },
    menuItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      paddingVertical: 14,
      paddingHorizontal: 16,
      borderRadius: 12,
      marginBottom: 4,
    },
    menuIcon: {
      fontSize: 18,
    },
    menuLabel: {
      fontSize: 15,
      color: colors.text,
      fontWeight: "500",
    },
    footer: {
      padding: 24,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      marginTop: "auto",
    },
    footerText: {
      fontSize: 11,
      color: colors.textSecondary,
      fontFamily: "monospace",
      textAlign: "center",
    },
  });

  return (
    <DrawerContentScrollView
      {...props}
      style={{ backgroundColor: colors.drawerBg }}
      contentContainerStyle={{ flex: 1 }}
    >
      <View style={s.container}>
        {/* Header */}
        <View style={s.header}>
          <Text style={s.logo}>🌍</Text>
          <Text style={s.appName}>WeatherMap</Text>
          <Text style={s.appSub}>Live Weather & Navigation</Text>
        </View>

        {/* Navigation */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Navigation</Text>
          <TouchableOpacity
            style={[s.menuItem, { backgroundColor: colors.accentSoft }]}
            onPress={() => props.navigation.navigate("Map")}
          >
            <Text style={s.menuIcon}>🗺️</Text>
            <Text style={[s.menuLabel, { color: colors.accent }]}>Map & Weather</Text>
          </TouchableOpacity>
        </View>

        {/* Settings */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Settings</Text>

          {/* Theme Toggle */}
          <View style={s.settingRow}>
            <View style={s.settingLeft}>
              <Text style={s.settingIcon}>
                {theme === "dark" ? "🌙" : "☀️"}
              </Text>
              <View>
                <Text style={s.settingLabel}>
                  {theme === "dark" ? "Dark Mode" : "Light Mode"}
                </Text>
                <Text style={s.settingValue}>
                  {theme === "dark" ? "Tap to switch to light" : "Tap to switch to dark"}
                </Text>
              </View>
            </View>
            <Switch
              value={theme === "dark"}
              onValueChange={toggleTheme}
              trackColor={{ false: "#d1d1d1", true: colors.accent }}
              thumbColor="#fff"
            />
          </View>
        </View>

        {/* Footer */}
        <View style={s.footer}>
          <Text style={s.footerText}>Powered by Open-Meteo & OpenStreetMap</Text>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}