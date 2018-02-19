<template lang="pug">
    li.list-group-item(
      draggable="true"
      @mouseenter="mouseenter"
      @mouseleave="mouseleave"
    )
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
      },
      mouseenter(evt) {
        const target = evt.target;

        target.classList.add('list-group-item--active');
        this.$emit('listHoverStart', target.querySelector('.title').textContent);
      },
      mouseleave(evt) {
        const target = evt.target;

        target.classList.remove('list-group-item--active');
        this.$emit('listHoverEnd');
      }
    }
  };
</script>

<style lang="scss" scoped>
  .list-group-item {
    position: relative;
    cursor: pointer;
    transition: background-color 0.2s;

    &--active {
      background-color: #dddddd;
    }
  }

  .close {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 20px;
    margin: auto;
  }
</style>
