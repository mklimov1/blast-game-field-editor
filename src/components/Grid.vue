<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';
  import { useEditorStore } from '@/stores/editor';
  import Title from './ui/Title.vue';

  const store = useEditorStore();

  const colors = ['#fff', '#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#9b59b6'];

  const selectedCell = ref<{ row: number; col: number } | null>(null);
  const gridRef = ref<HTMLElement | null>(null);

  function handleKeydown(e: KeyboardEvent) {
    if (!selectedCell.value) return;

    const num = parseInt(e.key);
    if (isNaN(num) || num < 0 || num > store.uniqChip) return;

    store.setCell(selectedCell.value.row, selectedCell.value.col, num);
  }

  function handleClickOutside(e: MouseEvent) {
    if (gridRef.value && !gridRef.value.contains(e.target as Node)) {
      selectedCell.value = null;
    }
  }

  function isSelected(idx: number) {
    if (!selectedCell.value) return false;
    return (
      selectedCell.value.row === Math.floor(idx / store.cols) &&
      selectedCell.value.col === idx % store.cols
    );
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeydown);
    document.addEventListener('click', handleClickOutside);
  });

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
    document.removeEventListener('click', handleClickOutside);
  });
</script>

<template>

  <div>

    <Title>Grid</Title>

    <div
      ref="gridRef"
      :class="$style.grid"
      :style="{
        gridTemplateColumns: `repeat(${store.cols}, 1fr)`,
        aspectRatio: `${store.cols} / ${store.rows}`,
      }"
    >

      <div
        v-for="(cell, idx) in store.grid.flat()"
        :key="idx"
        :class="[$style.cell, isSelected(idx) && $style.selected]"
        :style="{ background: colors[cell] }"
        @click="selectedCell = { row: Math.floor(idx / store.cols), col: idx % store.cols }"
      >
         {{ cell }}
      </div>

    </div>

  </div>

</template>

<style module>
  .grid {
    display: grid;
    gap: 1px;
    max-width: 700px;
    max-height: 700px;
  }

  .cell {
    aspect-ratio: 1;
    border: 1px solid #909090;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .cell.selected {
    opacity: 0.6;
    border-color: #000;
    border-width: 5px;
  }
</style>
