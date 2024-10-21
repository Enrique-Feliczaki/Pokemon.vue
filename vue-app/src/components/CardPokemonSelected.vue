<script setup>
import { ref, watch, onMounted } from 'vue';
import axios from 'axios';

const props = defineProps(["name"]);

const pokemonId = ref(null);
const pokemonWeight = ref(null);
const pokemonXp = ref(null);
const pokemonHeight = ref(null);
const pokemonImg = ref(null);
const loading = ref(true);

const fetchPokemonDetails = async () => {
  try {
    loading.value = true;
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${props.name}`);
    
    pokemonId.value=response.data.id;
    pokemonWeight.value = response.data.weight;
    pokemonXp.value = response.data.base_experience;
    pokemonHeight.value = response.data.height;
    pokemonImg.value = response.data.sprites.other['dream_world']['front_default'];
  } catch (error) {
    console.error("Erro ao buscar dados do Pokémon:", error);
  } finally {
    loading.value = false;
  }
}

watch(() => props.name, (newName) => {
  if (newName) fetchPokemonDetails();
});

onMounted(() => {
  if (props.name) fetchPokemonDetails();
});
</script>

<template>
    <div 
    class="card CardPokemonSelected"
    :class="loading ? '' : 'animate__animated animate__flipInY'"
    >
        <img 
        v-if="pokemonImg"
        :src="pokemonImg" 
        class="card-img-top pt-2"
        :alt="props.name"
        >
        <img 
        v-else
        src="../assets/egg_pokemon.svg"
        class="card-img-top pt-2"
        alt="???"
        >

        <div class="card-body">
            <h5 class="card-title text-center">{{ props.name || '???' }}</h5>
            <hr>
            <div class="row text-center">
                <section class="col">
                    <strong>XP:</strong>
                    <span>{{ pokemonXp }}</span>
                </section>
                <section class="col">
                    <strong>Altura:</strong>
                    <span>{{ pokemonHeight }}</span>
                </section>
            </div>

            <div class="d-none d-md-block">
                <div class="row text-center mt-3">
                    <section class="col">
                        <strong>Peso:</strong>
                        <span>{{ pokemonWeight }}</span>
                    </section>
                    <section class="col">
                        <strong>Id:</strong>
                        <span>{{ pokemonId }}</span>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.CardPokemonSelected{
    height: 75vh;
    background: rgb(22, 17, 107);
    background: radial-gradient(circle, rgba(220, 194, 106, 0.8) 0%, rgba(121, 1, 1, 0.8) 100%);
}
.CardPokemonSelected img{
    height: 250px;
}

@media (max-width: 768px) {
    .CardPokemonSelected{
        height: 30vh;
        width: 40%;
        margin: 0 auto 10px auto;
    }
    .CardPokemonSelected img{
        height: 100px;
    }
}
</style>
