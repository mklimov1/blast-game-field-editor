<script setup lang="ts">
  import { useEditorStore } from '@/stores/editor';

  const store = useEditorStore();

  const handleImport = (e: Event) => {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string);
        store.importLevel(data);
      } catch {
        alert('Invalid JSON');
      }
    };
    reader.readAsText(file);

    input.value = '';
  };
</script>

<template>

  <label :class="$style.root">
     Import level
    <input type="file" accept=".json" hidden @change="handleImport" />

  </label>

</template>

<style module>
  .root {
    text-align: center;
    background: #fff;
    border: 1px solid #000;
    cursor: pointer;
    border-radius: 4px;
    padding: 5px 0;
    height: fit-content;
    margin: 30px 0;
  }
</style>
