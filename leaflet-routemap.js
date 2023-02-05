

const imageContainerMargin = 20;  // Margin + padding
const rollbackOffset = 200;

var map;

function initMap() {

  // Leaflet map
  map = L.map('map', {
    center: [0, 0],
    zoom: 5,
    scrollWheelZoom: false
  });

  // Base layer map (other options available)
  var lightAll = new L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://cartodb.com/attributions">CartoDB</a>'
  }).addTo(map);

  map.attributionControl
    .setPrefix('View <a href="https://github.com/Lluisma/leaflet-routemap" target="_blank">code on GitHub</a>, created with <a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>');

  // Loads the tracks layer (GeoJSON)
  axios.get('geojson/tracks.geojson').then(response=> {
    var tracksLayer = L.geoJSON(response.data).addTo(map)
  });

  // Loads the points layer (GeoJSON)
  axios.get('geojson/points.geojson').then(response=> {

    var geojson = L.geoJson(response.data, {
      onEachFeature: function (feature, layer) {
        (function(layer, properties) {

          // Numerical icons
          var numericMarker = L.ExtraMarkers.icon({
            icon: 'fa-number',
            number: feature.properties['id'],
            markerColor: 'blue'
          });
          layer.setIcon(numericMarker);      

          // Make markers clickable
          layer.on('click', function() {
            let containerIndex  = this.feature.properties.id 
            let contentsTop = document.getElementById('contents').scrollTop
            let containerTop = document.getElementById('container' + containerIndex).getBoundingClientRect().top - 100
            document.getElementById('contents').scrollTo({top: (contentsTop+containerTop), behavior: 'smooth'});
          });

          document.getElementById("modal-close").onclick = function() {
            document.getElementById("modal-container").style.display = "none"
          }

        })(layer, feature.properties);
      }
    });

    map.fitBounds(geojson.getBounds());
    geojson.addTo(map);
  });
}


const { createApp } = Vue

var storymapApp = createApp({
  data() {
    return {
      stages:   {},
      active:   0,
      flyed:    false,
      areaTops: [-100]
    }
  },
  methods: {
    showImg: function (event) {
      let parent = event.target.dataset.parent
      document.getElementById(parent).src = event.target.src
    },
    modalImg: function (event) {
      document.getElementById("modal-container").style.display = "block"
      document.getElementById("modal-image").src = event.target.src
      document.getElementById("modal-caption").innerHTML = event.target.alt
    },
    scrollCont: function(event) {
      let idCurrent  = this.active
      let areaTop    = this.areaTops[ idCurrent ]
      let areaBottom = this.areaTops[ idCurrent + 1 ]
      let scrolltop  = document.getElementById('contents').scrollTop

      if (!this.flyed) {
        idCurrent = -1;
        this.flyed = true;
      } else if(scrolltop > areaBottom) {
        this.active = idCurrent + 1
      } else if (scrolltop < (areaTop - rollbackOffset)) {
        this.active = idCurrent - 1
      }

      if (this.active != idCurrent) {
        feature = this.stages[ this.active ]
        map.flyTo([feature.geometry.coordinates[1], feature.geometry.coordinates[0] ], feature.properties['zoom'])
      }
    }
  },
  created: async function() {
    axios.get('geojson/points.geojson')
          .then(response => (this.stages = response.data.features))
  },
  mounted () {
    let obj = this
    setTimeout(function() {
      let areaTop = -100
      for (i = 0; i < obj.stages.length; i++) {
        offset  = (i==0) ? 0 : obj.areaTops[i]
        areaTop = offset + document.getElementById('container' + (i+1)).offsetHeight + imageContainerMargin
        obj.areaTops.push( areaTop )
      }
    }, 1000)

    initMap()

  }
}).mount('#narration')
