<template lang="pug">
  #app
    .container-fluid
      .row
        .col-12.mb-4
          app-map(
            :points="points"
            :newPoint="newPoint"
            @pointAdded="pointAdded"
            @changePointCoords="changePointCoords"
          )
        .col-6.col-lg-4.mx-auto
          app-input(@addNewPoint="addNewPoint")
          points-list(
            :points="points"
            @changePointsOrder="changePointsOrder"
            @deleteItem="deleteItem"
          )
</template>

<script>
  import Map from './components/Map.vue';
  import NewPoint from './components/NewPoint.vue';
  import PointsList from './components/PointsList.vue';

  export default {
    components: {
      appMap: Map,
      appInput: NewPoint,
      pointsList: PointsList
    },
    data() {
      return {
        points: [{
          name: 'point1',
          coords: {
            x: 55.76,
            y: 37.64
          }
        }],
        currentPointName: '',
        newPoint: false
      }
    },
    methods: {
      addNewPoint(name) {
        this.currentPointName = name;
        this.newPoint = true;
      },
      changePointsOrder(indexes) {
        const movedPoint = this.points.splice(indexes.pastIndex, 1)[0];

        this.points.splice(indexes.currentIndex, 0, movedPoint);
      },
      pointAdded(coords) {
        this.points.push({
          name: this.currentPointName,
          coords: Object.assign({}, coords)
        });
        this.newPoint = false;
      },
      changePointCoords(coords) {
        const point = this.points.find((item) => item.coords.x === coords.initialCoords.x && item.coords.y === coords.initialCoords.y);

        point.coords = Object.assign({}, Object.assign({}, coords.currentCoords));
      },
      deleteItem(name) {
        const index = this.points.findIndex((point) => point.name === name);

        this.points.splice(index, 1);
      }
    }
  };
</script>

<style lang="scss" scoped>

</style>
