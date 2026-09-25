import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { PokemonCardData } from '../types/pokemon';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.42;

interface Props {
  card: PokemonCardData;
}

export const PokemonCardItem: React.FC<Props> = ({ card }) => {
  return (
    <View style={styles.cardContainer}>
      <Image
        source={{ uri: card.images.small }}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.39, 
    margin: 8,
    borderRadius: 10,
    elevation: 4, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});