<script setup>
import { onMounted, reactive, ref, computed } from "vue";
import ListPokemons from "../components/ListPokemons.vue"
import CardPokeonSelected from "../components/CardPokemonSelected.vue"

let urlBaseSvg = ref("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/")
let pokemons = reactive(ref());
let searchPokemonField = ref("")
let pokemonSelected = reactive(ref());
let loading = ref(false)
let currentPage = ref(1);
let totalPokemons = ref(0);
const pokemonsPerPage = 20; 

onMounted(() => {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0")
    .then(res => res.json())
    .then(res => {
      pokemons.value = res.results;
      totalPokemons.value = res.count; 
    });
});

const calculateOffset = () => {
  return (currentPage.value - 1) * pokemonsPerPage;
};

const nextPage = () => {
  if (currentPage.value * pokemonsPerPage < totalPokemons.value) {
    currentPage.value++;
    fetchPokemons();
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchPokemons();
  }
};

const fetchPokemons = () => {
  loading.value = true;
  fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonsPerPage}&offset=${calculateOffset()}`)
    .then(res => res.json())
    .then(res => pokemons.value = res.results)
    .catch(err => alert(err))
    .finally(() => loading.value = false);
};

const pokemonsFiltered = computed(()=>{
  if(pokemons.value && searchPokemonField.value){
    return pokemons.value.filter(pokemon=>
      pokemon.name.toLowerCase().includes(searchPokemonField.value.toLowerCase())
    )
  }
  return pokemons.value;
})

const selectPokemon = async (pokemon) => {
  loading.value = true;
  await fetch(pokemon.url)
  .then(res => res.json())
  .then(res => pokemonSelected.value = res)
  .catch(err => alert(err))
  .finally(()=> loading.value = false)

  console.log(pokemonSelected.value)
  
}

</script>

<template>
  <main>
    <div class="container text-body-secondary">
      
      <div class="row mt-4">
        <div class="col-sm-12 col-md-6">
          
          <CardPokeonSelected
          :name="pokemonSelected?.name"
          :xp="pokemonSelected?.base_experience"
          :height="pokemonSelected?.height"
          :weight="pokemonSelected?.weight"
          :id="pokemonSelected?.id"
          :img="pokemonSelected?.sprites.other.dream_world.front_default"
          :loading="loading"
          />

        </div>
  
        <div class="col-sm-12 col-md-6">
          <div class="card card-list">
            <div class="card-body row">
              
              <div class="mb-3">
                <label 
                hidden 
                for="searchPokemonField" 
                class="form-label">
                Pesquisar...
                </label>

                <input 
                v-model="searchPokemonField"
                type="text" 
                class="form-control" 
                id="searchPokemonField" 
                placeholder="Pesquisar...">
              </div>

              <ListPokemons 
              v-for="pokemon in pokemonsFiltered"
              :key="pokemon.name"
              :name="pokemon.name"
              :urlBaseSvg="urlBaseSvg + pokemon.url.split('/')[6] + '.svg'"
              @click="selectPokemon(pokemon)"
              />

              <div class="pagination">
                <button @click="previousPage" :disabled="currentPage === 1">Anterior</button>
                <span>Página {{ currentPage }}</span>
                <button @click="nextPage" :disabled="currentPage * pokemonsPerPage >= totalPokemons">Próxima</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </main>
</template>

<style scoped>
.card-list{
  max-height: 75vh;
  overflow-y: scroll;
  overflow-x: hidden;
}

@media (max-width: 768px) {
  .card-list{
    max-height: 48vh;
  }
}
.pagination{
  display: flex;
  justify-content: center;
}
</style>