<template>

  <button :class="[$style.root, disabled && $style.disabled]" @click="onClick" :disabled="disabled">
    <slot />
  </button>

</template>

<script setup lang="ts">
  const props = defineProps<{
    onClick: () => void;
    disabled?: boolean;
  }>();
</script>

<style module>
  .root {
    width: 100%;
    padding: 10px 0;
    border-radius: 4px;
    border: 1px solid #000;
    cursor: pointer;
  }

  .disabled {
    cursor: default;
    opacity: 0.5;
    pointer-events: none;
  }
</style>
