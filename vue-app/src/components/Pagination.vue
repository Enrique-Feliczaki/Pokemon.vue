<template>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Anterior</button>
      <span>Página {{ currentPage }} de {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Próxima</button>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  const props = defineProps({
    totalPokemons: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    onPageChange: {
      type: Function,
      required: true,
    },
  });
  
  const pokemonsPerPage = 20;
  const totalPages = computed(() => Math.ceil(props.totalPokemons / pokemonsPerPage));
  
  const prevPage = () => {
    if (props.currentPage > 1) {
      props.onPageChange(props.currentPage - 1);
    }
  };
  
  const nextPage = () => {
    if (props.currentPage < totalPages.value) {
      props.onPageChange(props.currentPage + 1);
    }
  };
  </script>
  
  <style scoped>
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .pagination button {
    margin: 0 10px;
  }
  </style>

  <template>
    
  </template>
  <script></script>