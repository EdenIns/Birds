<template>
  <Header />
  <BContainer>
    <RouterView />
  </BContainer>
  <Footer />
</template>

<script setup>
import { BContainer } from 'bootstrap-vue-next';
import Header from './components/Header.vue';
import { RouterView } from 'vue-router';

</script>