var map = d3.geomap.choropleth()
    .geofile('https://d3-geomap.github.io/d3-geomap/topojson/countries/USA.json')
    .projection(d3.geo.albersUsa)
    .column('State')
    //cannot seem to manipulate ID correctly
    .unitId('fips')
    .scale(700)
    .zoomFactor(1)
    .legend(false);

	d3.csv('https://d3-geomap.github.io/data/venture-capital.csv', 
		function(error, data) {
	    	d3.select('#map')
	        	.datum(data)
	        	.call(map.draw, map);
		})
	;
;