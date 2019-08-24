<template>
  <div class="loading"></div>
</template>

<script>
export default {
  name: 'loading'
}
</script>

<style lang="scss">
.loading {
  // ajax-loader.gif
  display: block;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: rgba(#e1e1e1, 0.8);
  background-image: url('../assets/ajax-loader.gif');
  background-repeat: no-repeat;
  background-position: 50% 50%;
}
</style>