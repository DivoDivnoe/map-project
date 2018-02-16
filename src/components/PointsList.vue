<template lang="pug">
  ul.list-group(
    dropzone="true"
    @drop.prevent="dropHandler"
  )
    points-list-item(
      v-for="point in points"
      :key="point.name"
      @dragstart.native="dragstartHandler"
      @dragover.native.prevent="dragoverHandler"
      @dragenter.native="dragenterHandler"
      @deleteItem="deleteItem($event)"
    ) {{point.name}}
</template>

<script>
  import PointsListItem from './PointsListItem.vue';
  export default {
    props: ['points'],
    components: {
      pointsListItem: PointsListItem
    },
    data() {
      return {
        draggedItem: null,
        dropOverItem: null
      }
    },

    methods: {
      dragstartHandler(evt) {
        const target = evt.target;

        if (target.tagName.toUpperCase() !== 'LI') return false;

        this.draggedItem = target;
        evt.dataTransfer.setData('text/plain', target.textContent);
      },
      dragoverHandler() {
        return false;
      },
      dragenterHandler(evt) {
        const target = evt.target;

        if (target.tagName.toUpperCase() !== 'LI') return false;

        this.dropOverItem = target;
      },
      dropHandler(evt) {
        const listItems = [...evt.currentTarget.children];
        const pastIndex = listItems.indexOf(this.draggedItem);
        const currentIndex = listItems.indexOf(this.dropOverItem);

        this.$emit('changePointsOrder', {pastIndex, currentIndex});

        this.draggedItem = null;
        this.dropOverItem = null;
      },
      deleteItem(name) {
        this.$emit('deleteItem', name);
      }
    }
  };
</script>

<style lang="scss" scoped>

</style>
