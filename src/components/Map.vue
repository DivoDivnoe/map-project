<template>
  <yandex-map
    :coords="initialCoords"
    zoom="10"
    style="width: 100%; height: 500px;"
    @map-was-initialized="initHandler"
  >
    <ymap-marker
      v-for="(point, index) in points"
      :key="index"
      :markerId="index"
      marker-type="placemark"
      :coords="[point.coords.x, point.coords.y]"
      :balloonTemplate="`<strong>${point.name}</strong>`"
      :properties="placemarkProps"
      :options="placemarkOptions"
      :callbacks="handlers"
    ></ymap-marker>
    <ymap-marker
      v-if="polylineCoords.length"
      marker-type="polyline"
      markerId="track"
      :coords="polylineCoords"
    ></ymap-marker>
  </yandex-map>
</template>

<script>
  import {yandexMap, ymapMarker} from 'vue-yandex-maps';

  export default {
    components: {yandexMap, ymapMarker},
    props: ['newPoint', 'points'],

    data() {
      return {
        initialCoords: [55.76, 37.64],
        myMap: null,
        draggedItem: null,
        draggedItemCoords: null,
        placemarkProps: {
          balloonOptions: {
            maxWidth: 70,
            hasCloseButton: false,
            mapAutoPan: 0
          }
        },
        placemarkOptions: {
          draggable: true,
          preset: 'islands#circleIcon',
          iconColor: '#0095b6'
        },
        handlers: {
          dragstart: this.dragstartHandler.bind(this),
          drag: this.dragHandler.bind(this)
        }
      }
    },
    methods: {
      initHandler(map) {
        if (!this.myMap) {
          this.myMap = map;
          console.log('init');
        }
      },
      dragstartHandler(evt) {
        this.draggedItem = evt.originalEvent.target;

        const draggedItemCoords = this.draggedItem.geometry.getCoordinates();

        this.draggedItemCoords = {
          x: draggedItemCoords[0],
          y: draggedItemCoords[1]
        };
      },
      dragHandler() {
        let currentCoords = this.draggedItem.geometry.getCoordinates();

        currentCoords = {
          x: currentCoords[0],
          y: currentCoords[1]
        };

        this.$emit('changePointCoords', {
          initialCoords: this.draggedItemCoords,
          currentCoords
        });

        console.log(currentCoords);

        this.draggedItemCoords = Object.assign({}, currentCoords);
      }
    },
    computed: {
      centerCoords() {
        return {
          x: this.myMap.getCenter()[0],
          y: this.myMap.getCenter()[1]
        }
      },
      polylineCoords() {
        return this.points.map((point) => {
          return [point.coords.x, point.coords.y];
        });
      },
      initialPoints() {
        return Object.assign({}, this.points);
      }
    },
    watch: {
      newPoint() {
        if (this.newPoint) {
          this.$emit('pointAdded', this.centerCoords);
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  #map {
    width: 100%;
    height: 500px;
  }
</style>
