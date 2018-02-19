<template lang="pug">
  #app
    .container-fluid
      app-map.mb-4(
        :points="points"
        :newPoint="newPoint"
        :listHoverItem="listHoverItem"
        @pointAdded="pointAdded"
        @changePointCoords="changePointCoords"
        @hoverStart="hoverStart"
        @hoverEnd="hoverEnd"
      )
      .row
        .col-8.col-sm-6.col-lg-4.mx-auto
          app-input(@addNewPoint="addNewPoint")
          points-list(
            :points="points"
            :hoverItem="hoverItem"
            @changePointsOrder="changePointsOrder"
            @deleteItem="deleteItem"
            @listHoverStart="listHoverStart"
            @listHoverEnd="listHoverEnd"
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
        points: [],
        currentPointName: '',
        newPoint: false,
        hoverItem: null,
        listHoverItem: null
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
      },
      hoverStart(name) {
        this.hoverItem = name;
      },
      hoverEnd() {
        this.hoverItem = null;
      },
      listHoverStart(name) {
        this.listHoverItem = name;
      },
      listHoverEnd() {
        this.listHoverItem = null;
      }
    }
  };
</script>

<style lang="scss" scoped>
  #app {
    height: 100%;
  }
  .container-fluid {
    height: 100%;
  }
</style>
