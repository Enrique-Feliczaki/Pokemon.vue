<script setup>
import { favoriteStore } from '../store/favorites';  

const props = defineProps(["name", "urlBaseSvg"]);

const toggleFavorite = () => {
  const pokemon = { name: props.name, urlBaseSvg: props.urlBaseSvg };
  if (favoriteStore.isFavorite(pokemon)) {
    favoriteStore.removeFavorite(pokemon);
  } else {
    favoriteStore.addFavorite(pokemon);
  }
};

const isFavorite = () => {
  return favoriteStore.isFavorite({ name: props.name });
};
</script>

<template>
  <div class="col-5 col-md-6 col-xl-3">
    <div class="card p-15 mb-3 cardListPokemon">
      <p class="text-center">{{ name }}</p>
      <img :src="urlBaseSvg" class="card-img-top" alt="..." height="80" />

      <button class="btn btn-outline-warning" @click="toggleFavorite">
        {{ isFavorite() ? 'Disfav' : 'Favorite' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.cardListPokemon {
  background: rgb(16, 14, 63);
  background: linear-gradient(circle, 90deg, rgba(2,0,36,1) 0%, rgba(75,9,121,0.6446953781512605) 28%, rgba(60,7,104,1) 28%, rgba(0,212,255,1) 100%);
  cursor: pointer;
}
p{
  color: white;
}
</style>
