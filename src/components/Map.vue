<template lang="pug">
  #map
</template>

<script>
  const INITIAL_COORDS = {
    x: 55.76,
    y: 37.64
  };

  export default {
    props: ['newPoint', 'points', 'listHoverItem'],

    data() {
      return {
        myMap: null,
        myPolyline: null
      }
    },
    created() {
      new Promise((resolve) => {
        ymaps.ready(resolve)
          .then(() => this.init())
          .then(() => this.setPoints())
          .then(() => this.createTrack());
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
      setPoint(point) {
        const placeMark = new ymaps.Placemark([point.coords.x, point.coords.y], {
          balloonContent: `<strong>${point.name}</strong>`,
          balloonOptions: {
              maxWidth: 70,
              hasCloseButton: false,
              mapAutoPan: 0
          }
        }, {
          draggable: true,
          preset: 'islands#circleIcon',
          iconColor: '#0095b6'
        });

        let initialCoords;

        placeMark.events
          .add('dragstart', (evt) => {
            initialCoords = placeMark.geometry.getCoordinates();
            initialCoords = {
              x: initialCoords[0],
              y: initialCoords[1]
            };
          })
          .add('drag', (evt) => {
            let currentCoords = placeMark.geometry.getCoordinates();
            currentCoords = {
              x: currentCoords[0],
              y: currentCoords[1]
            };
            this.myMap.geoObjects.remove(this.myPolyline);
            this.createTrack();

            this.$emit('changePointCoords', {initialCoords, currentCoords});

            initialCoords = Object.assign({}, currentCoords);
          })
          .add('dragend', (evt) => {
            let currentCoords = evt.get('target').geometry.getCoordinates();
            currentCoords = {
              x: currentCoords[0],
              y: currentCoords[1]
            };

            this.$emit('changePointCoords', {initialCoords, currentCoords});
          })
          .add('mouseenter', (evt) =>{
            evt.get('target').options.set('iconColor', '#0052ff');
            this.$emit('hoverStart', point.name);
          })
          .add('mouseleave', (evt) => {
            evt.get('target').options.set('iconColor', '#0095b6');
            this.$emit('hoverEnd');
          })
        this.myMap.geoObjects.add(placeMark);
      },
      setPoints() {
        this.points.forEach(this.setPoint);
      },
      createTrack() {
        this.myPolyline = new ymaps.Polyline(this.polylineCoords, {}, {
          strokeColor: "#00000088",
          strokeWidth: 4
        });
        this.myMap.geoObjects.add(this.myPolyline);
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
        this.createTrack();
      },
      listHoverItem() {
        console.log(this.listHoverItem);
      }
    }
  };
</script>

<style lang="scss" scoped>
  #map {
    width: 100%;
    min-height: 50%;
  }
</style>
