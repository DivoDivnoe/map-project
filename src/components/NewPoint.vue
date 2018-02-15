<template lang="pug">
  .input-group.mb-3
    label.sr-only(for="newPoint") Новая точка маршрута
    input.form-control(
      type="text"
      id="newPoint"
      placeholder="Новая точка маршрута"
      aria-label="Username"
      aria-describedby="basic-addon1"
      @keydown.enter="addNewPoint"
    )
</template>

<script>
  export default {
    methods: {
      addNewPoint(evt) {
        const target = evt.target;

        this.$emit('addNewPoint', target.value);

        target.value = '';
      }
    }
  };
</script>

<style lang="scss" scoped>

</style>
