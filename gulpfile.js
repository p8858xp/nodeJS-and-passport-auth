const gulp = require("gulp");
const nodemon = require("gulp-nodemon");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();

// compile scss into css
function style() {
  // 1. where is my scss file
  return (
    gulp
      .src("./public/scss/**/*.scss")
      // 2. pass that file through the sass compiler
      .pipe(sass().on("error", sass.logError))
      // 3. where do I save the compiled CSS?
      .pipe(gulp.dest("./public/css"))
      // 4 stream changes to all browser
      .pipe(browserSync.stream())
  );
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
  gulp.watch("./public/scss/**/*.scss", style);
  gulp.watch("./public/js/**/*.js").on("change", browserSync.reload);
}

function serve() {
  nodemon({
    script: "app.js",
    ext: "js",
    env: {
      NODE_ENV: "dev",
      PORT: 5000,
    },
    ignore: ["./node_modules/**"],
  });
  watch();
}
// gulp.task("serve", function () {
//   nodemon({
//     script: "app.js",
//     ext: "js",
//     env: {
//       NODE_ENV: "dev",
//       PORT: 5000,
//     },
//     ignore: ["./node_modules/**"],
//   });
//   watch();
// });

exports.style = style;
exports.watch = watch;
exports.serve = serve;
