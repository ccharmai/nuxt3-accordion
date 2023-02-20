<template>
  <div class="slide-up-down">
    <div @click="$emit('update:modelValue', !modelValue)">
      <slot name="spoiler" />
    </div>
    <div
      v-show="realValue"
      ref="spoilerRef"
    >
      <slot name="content" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue'

  const props = defineProps({
    modelValue: {
      type: Boolean,
      required: true,
    },
    duration: {
      type: Number,
      default: 300,
    },
  })

  defineEmits(['update:modelValue'])

  const spoilerRef = ref<HTMLDivElement | null>(null)
  const realValue = ref(props.modelValue)

  const slideUp = (target: HTMLDivElement) => {
    target.style.transitionProperty = 'height, margin, padding'
    target.style.transitionDuration = props.duration + 'ms'
    target.style.boxSizing = 'border-box'
    target.style.height = target.offsetHeight + 'px'
    target.offsetHeight
    target.style.overflow = 'hidden'
    target.style.height = '0'
    target.style.paddingTop = '0'
    target.style.paddingBottom = '0'
    target.style.marginTop = '0'
    target.style.marginBottom = '0'

    window.setTimeout(() => {
      target.style.display = 'none'
      target.style.removeProperty('height')
      target.style.removeProperty('padding-top')
      target.style.removeProperty('padding-bottom')
      target.style.removeProperty('margin-top')
      target.style.removeProperty('margin-bottom')
      target.style.removeProperty('overflow')
      target.style.removeProperty('transition-duration')
      target.style.removeProperty('transition-property')
      realValue.value = false
    }, props.duration)
  }

  const slideDown = (target: HTMLDivElement) => {
    target.style.removeProperty('display')
    let display = window.getComputedStyle(target).display
    if (display === 'none') display = 'block'

    target.style.display = display
    const height = target.offsetHeight
    target.style.overflow = 'hidden'
    target.style.height = '0'
    target.style.paddingTop = '0'
    target.style.paddingBottom = '0'
    target.style.marginTop = '0'
    target.style.marginBottom = '0'
    target.offsetHeight
    target.style.boxSizing = 'border-box'
    target.style.transitionProperty = "height, margin, padding"
    target.style.transitionDuration = props.duration + 'ms'
    target.style.height = height + 'px'
    target.style.removeProperty('padding-top')
    target.style.removeProperty('padding-bottom')
    target.style.removeProperty('margin-top')
    target.style.removeProperty('margin-bottom')

    window.setTimeout( () => {
      target.style.removeProperty('height')
      target.style.removeProperty('overflow')
      target.style.removeProperty('transition-duration')
      target.style.removeProperty('transition-property')
      realValue.value = true
    }, props.duration)
  }

  watch(
    () => props.modelValue,
    () => {
      const target = spoilerRef.value

      if (!target) return

      if (props.modelValue) slideDown(target)
      else slideUp(target)
    },
  )
</script>
