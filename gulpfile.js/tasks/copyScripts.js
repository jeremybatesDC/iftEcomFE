var config = require('../config');
var gulp = require('gulp');

var paths = {
	src: config.root.src,
	dest: config.root.dest
}

var copyScriptsFunction = function(){
	gulp.src(paths.src + '/javascripts/data/**/*')
	.pipe(gulp.dest(paths.dest +'/javascripts/data'));
	gulp.src(paths.src + '/javascripts/vendor/**/*').pipe(gulp.dest(paths.dest +'/javascripts/vendor'));
	gulp.src(paths.src + '/javascripts/forBackendDeveloperPreLaunch/*').pipe(gulp.dest(paths.dest +'/javascripts'));
}

gulp.task('copyScripts', copyScriptsFunction);

module.exports = copyScriptsFunction