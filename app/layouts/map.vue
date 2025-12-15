<template>
  <div class="map">
    <div class="map__container">
      <AppHeader />
    </div>
    <div class="map__container2">
      <div class="canvas">
        <div id="canvas" class="canvas__body" ref="container"></div>
        <Transition name="fade-list" mode="out-in">
          <div class="canvas__loading" v-if="false">
            <AppLoader />
          </div>
        </Transition>
      </div>
    </div>
    <div class="map__container3">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const container = ref<HTMLElement | null>(null)
const { initMap } = useMapbox();
const { fetchInitialData } = useMapStore()

onMounted(() => {
  if (!container.value) return;
  initMap(container.value);
  fetchInitialData();
})
</script>

<style scoped lang="scss">

@use "~/assets/styles/variable";
@use "~/assets/styles/mixin";

.map{
  display: grid;
  grid-template-rows: 56px 1fr auto;
  gap: 12px 0;
  overflow: hidden;
  position: fixed;
  inset: 0;
  padding: 0 12px;
  &__container,
  &__container2,
  &__container3{
    min-width: 0;
  }
  @include mixin.mq(md){
    grid-template-columns: 1fr auto;
    grid-template-rows: auto 1fr;
    gap: 12px 24px;
    padding: 0 32px 24px;
    &__container{
      grid-area: 1 / 1 / 2 / 3;
    }
    &__container2{
      grid-area: 2 / 1 / 3 / 2;
      min-height: 0;
    }
    &__container3{
      grid-area: 2 / 2 / 3 / 3;
      padding: 0;
      min-height: 0;
    }
  }
}

.canvas{
  overflow: hidden;
  position: relative;
  border: solid 4px var(--color-primary);
  border-radius: 12px;
  width: 100%;
  height: 100%;
  background-color: var(--color-surface-container);
  &__body{
    width: 100%;
    height: 100%;
  }
  &__loading{
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    position: absolute;
    inset: 0;
    border-radius: 12px;
    background-color: var(--color-surface-container);
    font-size: 13px;
    color: var(--color-on-primary-container);
  }
  @include mixin.mq(md){
    border-radius: 20px;
  }
}

</style>