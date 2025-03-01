<template>
  <div class="card">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.card {
  border: 1px solid var(--border-color-card);
  padding: 20px;
  min-width: 200px;
}
</style>
