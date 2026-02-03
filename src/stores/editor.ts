import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useEditorStore = defineStore('editor', () => {
  const level = ref(1);
  const uniqChip = ref(3);
  const rows = ref(3);
  const cols = ref(3);
  const grid = ref<number[][]>([]);

  watch(
    [rows, cols],
    () => {
      const oldGrid = grid.value;

      grid.value = Array.from({ length: rows.value }, (_, rowIdx) =>
        Array.from({ length: cols.value }, (_, colIdx) => oldGrid[rowIdx]?.[colIdx] ?? 0),
      );
    },
    { immediate: true },
  );

  function setCell(row: number, col: number, value: number) {
    grid.value[row][col] = value;
  }

  function exportJSON() {
    return JSON.stringify(
      {
        level: level.value,
        rows: rows.value,
        cols: cols.value,
        grid: grid.value,
      },
      null,
      2,
    );
  }

  return { level, uniqChip, rows, cols, grid, setCell, exportJSON };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useEditorStore, import.meta.hot));
}
