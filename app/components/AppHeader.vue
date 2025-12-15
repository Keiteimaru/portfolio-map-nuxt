<template>
  <header class="header">
    <h1 class="header-logo"><img src="~/assets/images/logo.svg" alt="川西案内センター（仮）"></h1>
    <AppButton class="header-access" variant="secondary" size="sm">サイトのご案内</AppButton>
  </header>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">

@use "~/assets/styles/variable";
@use "~/assets/styles/mixin";



.header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--size-header-height);
}

.header-logo{
  height: 28px;
  > img{
    width: auto;
    height: inherit;
  }
  @include mixin.mq(md){
    height: 44px;
  }
}

</style>
