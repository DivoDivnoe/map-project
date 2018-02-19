<template lang="pug">
  #map
</template>

<script>
  export default {
    props: ['newPoint', 'points', 'listHoverItemIndex'],

    data() {
      return {
        myMap: null,
        myPolyline: null,
        initialCoords: {
          x: 55.76,
          y: 37.64
        },
        initialIconColor: '#0095b6',
        hoverIconColor: '#0052ff'
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
          center: [this.initialCoords.x, this.initialCoords.y],
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
          iconColor: this.initialIconColor
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
            evt.get('target').options.set('iconColor', this.hoverIconColor);
            this.$emit('hoverStart', point.name);
          })
          .add('mouseleave', (evt) => {
            evt.get('target').options.set('iconColor', this.initialIconColor);
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
      listHoverItemIndex() {
        if (this.listHoverItemIndex !== null) {
          if (this.hoveredItem) {
            this.hoveredItem.options.set('iconColor', this.initialIconColor);
          }

          this.hoveredItem = this.myMap.geoObjects.get(this.listHoverItemIndex);
          this.hoveredItem.options.set('iconColor', this.hoverIconColor);
        } else {
          this.hoveredItem.options.set('iconColor', this.initialIconColor);
          this.hoveredItem = null;
        }
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
