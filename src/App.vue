<template>

  <div :class="$style.root">

    <Grid />

    <Settings />

  </div>

</template>

<script setup lang="ts">
  import Grid from '@/components/Grid.vue';
  import Settings from './components/Settings.vue';
</script>

<style module>
  .root {
    display: grid;
    gap: 10px;
    grid-template-columns: auto 400px;
    max-width: 1100px;
    margin: 0 auto;
  }
</style>
