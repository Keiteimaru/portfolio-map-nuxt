<template>
  <div
    :class="[
      'loader',
      `loader--${variant}`,
      `loader--${size}`
    ]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">

interface Props {
  variant?: string;
  size?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
});

</script>

<style scoped lang="scss">

@use "~/assets/styles/variable";
@use "~/assets/styles/mixin";

.loader {
  display: block;
  border: solid 4px var(--color-primary);
  border-bottom-color: transparent;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: rotation 1s linear infinite;
}

 @keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>