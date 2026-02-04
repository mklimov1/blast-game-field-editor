<script setup lang="ts">
  import { computed } from 'vue';
  import Button from './ui/Button.vue';
  import Input from './ui/Input.vue';
  import Title from './ui/Title.vue';
  import { useEditorStore } from '@/stores/editor';
  import { downloadFile } from '@/utils/downloadFile';

  const store = useEditorStore();

  const isButtonDisabled = computed(
    () => store.grid.flat().some((value) => value === 0) || store.goal === 0 || store.steps === 0,
  );

  const buttonClickHandle = () => {
    downloadFile(store.exportJSON(), `level-${store.level}.json`);
  };
</script>

<template>

  <div>

    <Title>Editor</Title>

    <div :class="$style.content">

      <Input label="Level" type="number" v-model="store.level" />

      <Input label="Uniq chip count" type="number" v-model="store.uniqChip" :min="2" :max="6" />

      <Input label="Rows" type="number" v-model="store.rows" :min="6" :max="20" />

      <Input label="Cols" type="number" v-model="store.cols" :min="6" :max="20" />

      <Input label="Goal" type="number" v-model="store.goal" />

      <Input label="Steps" type="number" v-model="store.steps" />

    </div>

    <Button :disabled="isButtonDisabled" @click="buttonClickHandle">Download</Button>

  </div>

</template>

<style module>
  .content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 20px;
  }
</style>
