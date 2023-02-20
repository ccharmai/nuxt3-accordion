<template>
  <div>
    <SlideUpDown v-model="isOpen">
      <template #spoiler>
        Spoiler
      </template>
      <template #content>
        <div>
          <div>Content 1</div>
          <div>Content 2</div>
          <div>Content 3</div>
          <div>Content 4</div>
          <div>Content 5</div>
          <div>Content 6</div>
          <div>Content 7</div>
          <div>Content 8</div>
          <div>Content 9</div>
        </div>
      </template>
    </SlideUpDown>
  </div>
</template>

<script lang="ts" setup>
  const isOpen = ref(false)
</script>
