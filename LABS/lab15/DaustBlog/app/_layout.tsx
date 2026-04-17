import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, Text } from "react-native";

function RootNavigator() {
  const { theme, toggleTheme, colors } = useTheme();

  return (
    <>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.header },
          headerTintColor: colors.headerText,
          headerTitleStyle: { fontWeight: "bold" },
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "DaustBlog",
            headerRight: () => (
              <Pressable
                onPress={toggleTheme}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.6 : 1,
                  backgroundColor: theme === "dark" ? "#FFFFFF" : "#000000",
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 8,
                  marginRight: 4,
                })}
              >
                <Text
                  style={{
                    color: theme === "dark" ? "#000000" : "#FFFFFF",
                    fontWeight: "700",
                    fontSize: 13,
                  }}
                >
                  {theme === "dark" ? "☀ Light" : "● Dark"}
                </Text>
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name="details/[id]"
          options={{ title: "Post Details" }}
        />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootNavigator />
    </ThemeProvider>
  );
}
