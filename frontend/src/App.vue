<template>
  <div class="wrapper">
    <Header />
    <BContainer class="content">
      <RouterView />
    </BContainer>
    <Footer />
  </div>
</template>

<script setup>
import { BContainer } from 'bootstrap-vue-next';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import { RouterView } from 'vue-router';
</script>

<style scoped>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
  padding: 20px;
}
</style>
