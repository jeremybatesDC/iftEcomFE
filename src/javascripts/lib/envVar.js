// Jquery adds inline styles and these need to be overwritten. 
// HeadStyle writes styles to the head tag and destorys them as well
// Usage:
// var dev_var = envVar({
// 	production:'myProductionURL',
// 	development: 'myDevelopmentURL'
// });
var envVar = function(obj) {
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop) && process.env.NODE_ENV === prop){
			return obj[prop];	
		}
	}
}
module.exports = envVar;