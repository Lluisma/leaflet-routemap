# leaflet-routemap
Leaflet routemap with scroll-driven navigation for narrative, point markers and tracks from easy-to-learn template, with GeoJSON data files.

This is a fork from https://github.com/slead/leaflet-storymap and has been updated to show the information of the stage between two consecutive points. And also to use [VueJS] (https://vuejs.org/) and [Axios] (https://axios-http.com) instead of [jQuery](https://jquery.com/) and [Handlebars template](http://handlebarsjs.com/) to configure the individual story elements.

## Demo
http://slead.github.io/leaflet-storymap/index.html

### Features
- Scroll-driven navigation, using screen swipe, trackpad, or keyboard down-arrow. Initial map displays all point markers and the tracks between them.
- Viewers can pan and zoom the map independently of the narration, or click on any point to go directly to that stage.
- All you need to do is edit the points stored in the points.geojson file with all the information about them: name and description, point coordinates, zoom levels and an array of image links to include in each gallery.
- Images are stored in local subfolder.
- Works in modern browsers: Chrome, Firefox, Safari, Edge.
- Responsive design.

### HTML template
See the section titled `ITEM TEMPLATE` in index.html and adjust the HTML within this [VueJS template](http://vuejs.org/) as required. 

The variables within this template are injected at run-time via `leaflet-routemap.js`:

Add corresponding sections to the HTML template and the `points.geojson` file to add new elements.

## Requires open-source libraries
- [Leaflet.js] (https://leafletjs.com/)
- [leaflet.extra-markers] (https://github.com/coryasilva/Leaflet.ExtraMarkers)
- [VueJS] (https://vuejs.org/)
- [Axios] (https://axios-http.com)
- [Font Awesome] (https://fontawesome.com/v4/icons/)

## Credits
- Based on https://github.com/slead/leaflet-storymap
- Numeric icon markers thanks to https://github.com/coryasilva/Leaflet.ExtraMarkers 

## Code contributions welcome
- Submit GitHub pull requests to the dev branch
