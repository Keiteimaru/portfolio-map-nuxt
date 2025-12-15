<template>
  <article class="content" key="content" role="article" aria-label="スポット詳細">
    <div class="content__container">
      <!-- <AppCluster v-if="appCluster" :data="appCluster" :article="appArticle" @show-article="showArticle($event)" /> -->
      <AppArticle :data="selectedLocation" />
    </div>
    <div class="content__container2">
      <button class="content__close" @click="" aria-label="詳細を閉じる" type="button"><span class="material-symbols-rounded" aria-hidden="true">close</span></button>
    </div>
  </article>
</template>

<script setup lang="ts">
const route = useRoute()
const { fetchInitialData, selectSpot, selectedLocation } = useMapStore()
definePageMeta({
  layout: 'map',
  middleware: 'test'
})

watchEffect(() => {
  const id = route.params.id
  if (typeof id === 'number') {
    selectSpot(id)
  }
})

</script>

<style scoped lang="scss">

@use "~/assets/styles/variable";
@use "~/assets/styles/mixin";

.content{
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: auto;
  height: 50dvh;
  &__container{
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: 20px 0;
  }
  &__container2{
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    position: sticky;
    bottom: 0;
    padding: 12px 0;
  }
  &__close{
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    background-color: var(--color-secondary);
    color: var(--color-on-secondary);
    transition: opacity .2s;
    &:hover{
      opacity: .8;
    }
  }
  @include mixin.mq(md){
    width: var(--size-sidebar-width);
    height: 100%;
    &__container2{
      padding: 20px 0 0;
    }
    &__close{
      width: 48px;
      height: 48px;
    }
  }
}

</style>