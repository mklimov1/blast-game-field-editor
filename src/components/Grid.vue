<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';
  import { useEditorStore } from '@/stores/editor';
  import Title from './ui/Title.vue';

  const store = useEditorStore();

  const colors = ['#fff', '#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#9b59b6'];

  const hoveredCell = ref<{ row: number; col: number } | null>(null);

  function handleKeydown(e: KeyboardEvent) {
    if (!hoveredCell.value) return;

    const num = parseInt(e.key);
    if (isNaN(num) || num < 0 || num > store.uniqChip) return;

    store.setCell(hoveredCell.value.row, hoveredCell.value.col, num);
  }

  function handleGridEnter() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }

  function getRowCol(idx: number) {
    return {
      row: Math.floor(idx / store.cols),
      col: idx % store.cols,
    };
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeydown);
  });

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
  });
</script>

<template>

  <div>

    <Title>Grid</Title>

    <div
      :class="$style.grid"
      :style="{
        gridTemplateColumns: `repeat(${store.cols}, 1fr)`,
        aspectRatio: `${store.cols} / ${store.rows}`,
      }"
      @mouseenter="handleGridEnter"
      @mouseleave="hoveredCell = null"
    >

      <div
        v-for="(cell, idx) in store.grid.flat()"
        :key="idx"
        :class="[
          $style.cell,
          hoveredCell?.row === getRowCol(idx).row &&
            hoveredCell?.col === getRowCol(idx).col &&
            $style.hovered,
        ]"
        :style="{ background: colors[cell] }"
        @mouseenter="hoveredCell = getRowCol(idx)"
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
    cursor: crosshair;
  }

  .cell.hovered {
    outline: 2px solid #000;
    outline-offset: -2px;
  }
</style>
