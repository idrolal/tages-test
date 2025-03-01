<template>
  <div class="select">
    <label>
      {{ label }}
    </label>

    <div class="select-wrapper">
      <p class="select-placeholder" v-if="!model">{{ props.placeholder }}</p>

      <select v-model="model">
        <option
          v-for="(item, idx) in props.items"
          :key="idx"
          :value="item[props.optionsKey]"
        >
          {{ item[props.optionsLabel] }}
        </option>
      </select>
      <p class="select-close" v-if="props.clearble" @click="clear">×</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props<T extends object> {
  items: T[];
  optionsKey: keyof T;
  optionsLabel: keyof T;
  label?: string;
  placeholder: string;
  clearble?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  optionsKey: 'id',
  clearble: true,
});

const model = defineModel();

const clear = () => {
  if (props.clearble) {
    model.value = null;
  }
};
</script>

<style lang="scss" scoped>
.select {
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 12px;
    line-height: 1.2;
    letter-spacing: 0.03em;
    color: var(--input-label-color);
    padding-inline: 16px;
  }
}

.select-wrapper {
  position: relative;
  display: inline-block;
  width: auto;

  .select-placeholder {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    pointer-events: none;
    color: var(--input-label-color);
  }

  .select-close {
    position: absolute;
    top: 50%;
    right: 4px;
    transform: translateY(-50%);
    display: inline-block;
    cursor: pointer;
  }

  select {
    min-width: 200px;
    width: 100%;
    padding: 10px 32px 10px 16px;
    background-color: var(--input-bg-color);
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    border: none;
    outline: none;
    color: var(--input-color);
    font-size: 14px;

    &:focus-visible {
      border: none;
    }
  }

  &::after {
    content: '';
    width: 16px;
    height: 16px;
    position: absolute;
    top: 50%;
    right: 16px;
    background-image: url('/images/svg/select.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    transform: translateY(-50%);
    pointer-events: none;
  }
}
</style>
