<script setup>
import { favoriteStore } from '../store/favorites';  // Importar o store de favoritos

</script>

<template>
  <div class="container mt-4">
    <h2>Pokémon Favoritos</h2>
    <div v-if="favoriteStore.favorites.length === 0">
      <p class="P">Você ainda não adicionou nenhum Pokémon aos favoritos.</p>
    </div>
    <div v-else class="row">
      <div
        v-for="pokemon in favoriteStore.favorites"
        :key="pokemon.name"
        class="col-4 col-md-6 col-xl-3"
      >
        <div class="card p-2 mb-3 cardListPokemon">
          <p class="text-center">{{ pokemon.name }}</p>
          <img :src="pokemon.urlBaseSvg" class="card-img-top" alt="..." height="80" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cardListPokemon {
  cursor: pointer;
}
h2, p{
  color: rgb(48, 186, 211);
}
img{
  background-color:rgb(66, 212, 144) ;
}
</style>
