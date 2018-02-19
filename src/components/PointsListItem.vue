<template lang="pug">
    li.list-group-item(draggable="true")
      button.close(
        type="button"
        aria-label="Close"
        @click="deleteItem"
      )
        span(aria-hidden="true") &times;
      span.title
        slot
</template>

<script>
  export default {
    methods: {
      deleteItem(evt) {
        this.$emit('deleteItem', evt.currentTarget.nextElementSibling.textContent);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .list-group-item {
    position: relative;
    cursor: pointer;
  }

  .close {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 20px;
    margin: auto;
  }
</style>
