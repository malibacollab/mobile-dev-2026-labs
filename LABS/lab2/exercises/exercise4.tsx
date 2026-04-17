import { View, Text, Image, FlatList, Modal, Pressable, StyleSheet } from 'react-native';
import { useState } from 'react';
import { RECIPES } from './data/recipes';
import Tag from './exercise2';


function RecipeCard({ recipe }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: recipe.image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.time}>⏱️ {recipe.cookTime} min</Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>{recipe.difficulty}</Text>
        </View>

        <Text style={styles.rating}>⭐ {recipe.rating}</Text>

        <View style={styles.tags}>
          {recipe.tags.map(tag => (
            <Tag key={tag} text={tag} />
          ))}
        </View>
      </View>
    </View>
  );
}


export default function RecipeList() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  return (
    <View style={styles.container}>
      <FlatList
        data={RECIPES}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => setSelectedRecipe(item)}>
            <RecipeCard recipe={item} />
          </Pressable>
        )}
        showsVerticalScrollIndicator={false}
      />

      <Modal visible={!!selectedRecipe} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedRecipe && (
              <>
                <Text style={styles.modalTitle}>{selectedRecipe.title}</Text>
                <Text>⏱️ {selectedRecipe.cookTime} min</Text>
                <Text>Difficulty: {selectedRecipe.difficulty}</Text>
                <Text>⭐ {selectedRecipe.rating}</Text>

                <Pressable style={styles.closeButton} onPress={() => setSelectedRecipe(null)}>
                  <Text style={styles.closeText}>Close</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F5F5F5',
    flex: 1,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    elevation: 5,
    overflow: 'hidden',
  },
  image: {
    height: 200,
    width: '100%',
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  time: {
    marginTop: 4,
    color: '#555',
  },
  badge: {
    backgroundColor: '#EEE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  rating: {
    marginTop: 6,
    fontWeight: '600',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 8,
  },
  /* Modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    alignSelf: 'flex-end',
  },
  closeText: {
    color: '#2F6FED',
    fontWeight: '600',
  },
});
