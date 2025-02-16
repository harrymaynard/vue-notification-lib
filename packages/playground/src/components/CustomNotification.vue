<script lang="ts" setup>
const props = defineProps({
  text: {
    type: String,
    required: true,
  }
})
</script>

<template>
  <div class="custom-notification">
    {{ props.text }}
  </div>
</template>

<style lang="scss" scoped>
.custom-notification {
  background: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border: 1px solid #721c24;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
}
</style>