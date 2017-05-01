var config       = require('../config')
var gulp         = require('gulp')
var gulpSequence = require('gulp-sequence')
var getEnabledTasks = require('../lib/getEnabledTasks')

var productionTask = function(cb) {
  var tasks = getEnabledTasks('production')
  gulpSequence('clean', 'copyScripts', tasks.assetTasks, tasks.codeTasks, tasks.cssProduction, cb)
}

gulp.task('production', productionTask)
module.exports = productionTask
