<template lang="pug">
  #map
</template>

<script>
  const INITIAL_COORDS = {
    x: 55.76,
    y: 37.64
  };

  export default {
    props: ['newPoint', 'points'],

    data() {
      return {
        myMap: null
      }
    },
    created() {
      new Promise((resolve) => {
        ymaps.ready(resolve)
          .then(() => this.init())
          .then(() => this.setPoints());
      });
    },
    methods: {
      init() {
        this.myMap = new ymaps.Map('map', {
          center: [INITIAL_COORDS.x, INITIAL_COORDS.y],
          zoom: 10
        }, {
          searchControlProvider: 'yandex#search'
        });
      },
      setPoint(coords) {
        this.myMap.geoObjects.add(new ymaps.Placemark([coords.x, coords.y], {
          draggable: true,
          balloonContent: 'цвет <strong>воды пляжа бонди</strong>',
          balloonOptions: {
              maxWidth: 70,
              hasCloseButton: false,
              mapAutoPan: 0
          }
        }, {
          preset: 'islands#circleIcon',
          iconColor: '#0095b6'
        }));
      },
      setPoints() {
        this.points.forEach((point) => {
          this.setPoint(point.coords);
        });
      }
    },
    computed: {
      centerCoords() {
        return {
          x: this.myMap.getCenter()[0],
          y: this.myMap.getCenter()[1]
        }
      }
    },
    watch: {
      newPoint() {
        if (this.newPoint) {
          this.$emit('pointAdded', this.centerCoords);
        }
      },
      points() {
        this.myMap.geoObjects.removeAll();
        this.setPoints();
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
