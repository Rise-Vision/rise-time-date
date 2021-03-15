const concat = require("gulp-concat");
const gulp = require("gulp");

const bundles = [ 
	"dist/rise-time-date.js",
	"dist/rise-time-date-bundle.min.js"
];
const dependencies = [
  "node_modules/moment/min/moment.min.js",
  "node_modules/moment-timezone-with-data-2010-2020/index.js"
];

gulp.task( "default", (done) => {
  bundles.map(function(file) {
    return gulp.src( dependencies.concat( file ) )
      .pipe( concat( file ) )
      .pipe( gulp.dest( "." ) );
  });
  done();
});
