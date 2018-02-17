<template lang="pug">
  .input-group.mb-3
    label.sr-only(for="newPoint") Новая точка маршрута
    input.form-control(
      type="text"
      id="newPoint"
      placeholder="Новая точка маршрута"
      aria-label="Username"
      aria-describedby="basic-addon1"
      v-model="pointName"
      @keydown.enter="addNewPoint"
    )
</template>

<script>
  export default {
    data() {
      return {
        pointName: ''
      }
    },
    methods: {
      addNewPoint(evt) {
        if (!this.pointName.length) return false;

        this.$emit('addNewPoint', this.pointName);

        this.pointName = '';
      }
    }
  };
</script>

<style lang="scss" scoped>

</style>
