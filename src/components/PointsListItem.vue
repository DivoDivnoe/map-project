<template lang="pug">
    li.list-group-item(draggable="true")
      slot
</template>

<script>
  export default {
  };
</script>

<style lang="scss" scoped>
  .list-group-item {
    cursor: pointer;
  }
</style>
