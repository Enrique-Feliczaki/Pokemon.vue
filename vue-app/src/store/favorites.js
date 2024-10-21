import { reactive } from 'vue';

export const favoriteStore = reactive({
  favorites: [],

  addFavorite(pokemon) {
    if (!this.favorites.some(fav => fav.name === pokemon.name)) {
      this.favorites.push(pokemon);
    }
  },

  removeFavorite(pokemon) {
    this.favorites = this.favorites.filter(fav => fav.name !== pokemon.name);
  },

  isFavorite(pokemon) {
    return this.favorites.some(fav => fav.name === pokemon.name);
  }
});
