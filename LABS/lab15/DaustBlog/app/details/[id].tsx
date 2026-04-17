import { useTheme } from "@/context/ThemeContext";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export default function BlogDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Post not found");
        return res.json();
      })
      .then((data: Post) => {
        setPost(data);
        navigation.setOptions({ title: `Post #${data.id}` });
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load post.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={[styles.loadingText, { color: colors.subtext }]}>
          Loading post...
        </Text>
      </View>
    );
  }

  if (error || !post) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.text }]}>
          {error ?? "Post not found."}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.container}
    >
      <View style={[styles.badge, { backgroundColor: colors.accent + "20" }]}>
        <Text style={[styles.badgeText, { color: colors.accent }]}>
          Post #{post.id} · User {post.userId}
        </Text>
      </View>

      <Text style={[styles.title, { color: colors.text }]}>{post.title}</Text>

      <View style={[styles.divider, { backgroundColor: colors.border }]} />

      <Text style={[styles.body, { color: colors.subtext }]}>{post.body}</Text>

      <View
        style={[styles.deepLinkInfo, { backgroundColor: colors.card, borderColor: colors.border }]}
      >
        <Text style={[styles.deepLinkLabel, { color: colors.subtext }]}>
          Deep link to this post:
        </Text>
        <Text style={[styles.deepLinkUrl, { color: colors.accent }]}>
          daustblog://details/{post.id}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 24,
  },
  container: {
    padding: 20,
    gap: 16,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    lineHeight: 30,
  },
  divider: {
    height: 1,
  },
  body: {
    fontSize: 16,
    lineHeight: 26,
  },
  deepLinkInfo: {
    marginTop: 8,
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    gap: 4,
  },
  deepLinkLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
  deepLinkUrl: {
    fontSize: 13,
    fontWeight: "700",
    fontFamily: "monospace",
  },
});
