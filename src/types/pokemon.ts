export interface PokemonCardData {
  id: string;
  name: string;
  supertype: string;
  types?: string[];
  hp?: string;
  images: {
    small: string;
    large: string;
  };
  set: {
    name: string;
  };
}