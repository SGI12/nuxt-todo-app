<template>
  <div id="app">
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: '%s - Notes App',
  htmlAttrs: {
    lang: 'ru'
  }
})
</script>

<style>
#app {
  min-height: 100vh;
}
</style>
