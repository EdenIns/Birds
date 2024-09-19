<template>
  <BContainer>
    <Header />
    <RouterView />
    <Footer />

  </BContainer>
</template>

<script setup>
import { BContainer, BRow, BCol } from 'bootstrap-vue-next';
import Header from './components/Header.vue';
import { RouterView } from 'vue-router';

</script>