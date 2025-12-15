<template>
  <nav class="navigation" key="navigation" role="navigation" aria-label="スポット一覧">
    <div class="navigation__container">
      <AppCategory :categories="categories" :selected-category="currentCategoryId" @change-category="" />
    </div>
    <div class="navigation__container2">
      <ul class="content-list" role="list" v-if="filteredLocations && filteredLocations.length > 0">
        <li class="content-list__item" role="listitem" v-for="item in filteredLocations" :key="item.id">
          <AppCard :data="item" @click="onSelect(item.id)" />
        </li>
      </ul>
      <!-- <div v-else-if="!appMapLoading" class="content-list-empty">
        ごめんなさい！<br>
        絶賛、情報収集中です。
      </div> -->
    </div>
  </nav>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'map',
  middleware: 'test'
})

const router = useRouter()
const { locations, filteredLocations, categories, currentCategoryId, selectSpot } = useMapStore()

const onSelect = (id: number) => {
  selectSpot(id)
  router.push(`/location/${id}`)
}

</script>

<style scoped lang="scss">
@use "~/assets/styles/variable";
@use "~/assets/styles/mixin";

.navigation{
  display: flex;
  flex-direction: column;
  gap: 12px 0;
  height: max(30dvh, 280px);
  &__container{
    flex: 0 0 auto;
    min-height: 0;
  }
  &__container2{
    flex: 1 1 auto;
    min-height: 0;
  }
  @include mixin.mq(md){
    gap: 20px 0;
    width: var(--size-sidebar-width);
    height: 100%;
  }
}

.content-list{
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  gap: 8px 0;
  padding: 0 0 12px;
  height: 100%;
  // scrollbar-color: var(--color-primary) var(--color-surface);
  @include mixin.mq(md){
    gap: 12px 0;
    padding: 0;
  }
  &.fade-list-enter-active,
  &.fade-list-leave-active {
    overflow-y: hidden;
  }
}

.content-list-empty{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  font-size: 14px;
  color: var(--color-on-surface-variant);
  @include mixin.mq(md){
    font-size: 16px;
  }
}
</style>