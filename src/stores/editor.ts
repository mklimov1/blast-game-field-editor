import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref, watch } from 'vue';

import type { Level } from '@/types/types';

export const useEditorStore = defineStore('editor', () => {
  const level = ref(1);
  const uniqChip = ref(3);
  const rows = ref(6);
  const cols = ref(6);
  const grid = ref<number[][]>([]);
  const goal = ref(0);
  const steps = ref(0);

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
        uniqueChipsCount: uniqChip.value,
        goal: goal.value,
        steps: steps.value,
      },
      null,
      2,
    );
  }

  const importLevel = (data: Partial<Level>) => {
    level.value = data.level ?? level.value;
    uniqChip.value = data.uniqueChipsCount ?? uniqChip.value;
    rows.value = data.rows ?? rows.value;
    cols.value = data.cols ?? cols.value;
    grid.value = data.grid ?? grid.value;
    goal.value = data.goal ?? goal.value;
    steps.value = data.steps ?? steps.value;
  };

  return { level, uniqChip, rows, cols, grid, goal, steps, setCell, exportJSON, importLevel };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useEditorStore, import.meta.hot));
}
