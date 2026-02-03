<template>

  <div :class="$style.root">

    <label :class="$style.label">{{ label }}</label>

    <input
      :class="$style.input"
      :type="type"
      :value="modelValue"
      @input="handleInput"
      :min="min"
      :max="max"
    />

  </div>

</template>

<script setup lang="ts">
  const props = defineProps<{
    label: string;
    modelValue: string | number;
    type?: string;
    min?: number;
    max?: number;
  }>();

  const emit = defineEmits<{
    'update:modelValue': [value: string | number];
  }>();

  const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

  const handleInput = (e: Event) => {
    const val = (e.target as HTMLInputElement).value;

    if (props.type === 'number') {
      const num = val === '' ? 0 : Number(val);
      emit('update:modelValue', clamp(num, props.min ?? -Infinity, props.max ?? Infinity));
    } else {
      emit('update:modelValue', val);
    }
  };
</script>

<style module>
  .root {
    display: flex;
    flex-direction: column;
    row-gap: 2px;
  }

  .input {
    border-radius: 4px;
    border: 1px solid #000000;
    padding: 6px;
    box-sizing: border-box;
  }
</style>
