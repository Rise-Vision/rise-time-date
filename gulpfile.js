const concat = require("gulp-concat");
const gulp = require("gulp");

const bundle = "dist/rise-time-date.js";
const dependencies = [
  "node_modules/moment/min/moment.min.js",
  "node_modules/moment-timezone-with-data-2010-2020/index.js"
];

gulp.task( "default", () => {
  return gulp.src( dependencies.concat(bundle) )
    .pipe( concat( bundle ) )
    .pipe( gulp.dest( "." ) );
});
