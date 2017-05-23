// var map = d3.geomap.choropleth()
//     .geofile('https://d3-geomap.github.io/d3-geomap/topojson/countries/USA.json')
//     .projection(d3.geo.albersUsa)
//     .column('StateAbbr')
//     .unitId('fips')
//     .scale(600)
//     .zoomFactor(1)
//     .legend(false);

// 	d3.csv('https://d3-geomap.github.io/data/venture-capital.csv', 
// 		function(error, data) {
// 	    	d3.select('#iftMap')
// 	        	.datum(data)
// 	        	.call(map.draw, map);
// 		})
// 	;
// ;