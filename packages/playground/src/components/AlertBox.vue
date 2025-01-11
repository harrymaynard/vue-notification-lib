<template>
  <div class="alert-box">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.alert-box {
  background-color: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border: 1px solid #f5c6cb;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
}
</style>