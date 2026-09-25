import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { searchCardsByName } from '../api/pokemontcg';
import { PokemonCardItem } from '../components/PokemonCard';
import { PokemonCardData } from '../types/pokemon';

export const HomeScreen = () => {
  const [query, setQuery] = useState('');
  const [cards, setCards] = useState<PokemonCardData[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);

    try {
      const results = await searchCardsByName(query);
      setCards(results);
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu uma falha na API do Pokémon TCG. Tente novamente em instantes.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Coleção Pokémon TCG</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome (ex: Charizard)..."
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#e3350d" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={cards}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PokemonCardItem card={item} />}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhuma carta encontrada. Digite um nome para buscar!</Text>
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    marginTop: 20, // Espaço forçado para afastar da barra de status superior
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 8,
  },
  button: {
    backgroundColor: '#e3350d',
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  listContainer: {
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#888',
  },
});