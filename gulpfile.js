var gulp = require('gulp')

var rename = require('gulp-rename')
var less = require('gulp-less')
var rest = require('connect-rest')
var del = require("del")
var path = require('path')

var livereload = require('gulp-livereload')
var connect = require('gulp-connect')

var browserify = require('browserify')
var babelify = require('babelify')
var sourcemaps = require("gulp-sourcemaps")
var source = require('vinyl-source-stream')

/**
 * [src soure code path configuration]
 * @type {Object}
 */
var src = {
	html: "demo/*.html",
	cssIndex: "src/less/*.less",
	css: "src/less/**/*.less",
	vendor: "vendor"
}

/**
 * [build build target path configuration]
 * @type {Object}
 */
var build = {
	root: "build",
	html: "build/"
}


/**
 * default task
 */
gulp.task("default", [
  "clean",
  "copy",
  "html",
  "styles",
  "scripts",
  "connect",
  "watch"
])

/**
 * [clean ]
 * @param  {[type]} ) {             del.sync(bin.root)} [description]
 * @return {[type]}   [description]
 */
gulp.task("clean", function() {
  del.sync(build.root)
})

/**
 * [copy ]
 * @param  {[type]} ) {             gulp.src(["vendor*"])    .pipe(gulp.dest(build.root + "/lib"))  gulp.src(["assets*"])    .pipe(gulp.dest(build.root + "/assets"))} [description]
 * @return {[type]}   [description]
 */
gulp.task("copy", function() {
  gulp.src(["vendor/**/*"])
    .pipe(gulp.dest(build.root + "/lib"))
  gulp.src(["assets/**/*"])
    .pipe(gulp.dest(build.root + "/assets"))
})

/**
 * [description]
 * @param  {[type]} ) {             gulp.src(src.html)    .pipe(gulp.dest(build.html))    .on("end", reload)} [description]
 * @return {[type]}   [description]
 */
gulp.task("html", function() {
  gulp.src(src.html)
    .pipe(gulp.dest(build.html))
    .on("end", reload)
})

/**
 * [gulp less description]
 * @param  {[type]} ) {               return gulp.src(['./src*.less'])      .pipe(less())      .on('error', function(err){       	console.log(err.message);       })      .pipe(rename(function(path){      	path.dirname [description]
 * @return {[type]}   [description]
 */
gulp.task('styles', function() {
    return gulp.src(src.cssIndex)
      .pipe(less())
      .on('error', function(err){ 
      	console.log(err.message); 
      })
      .pipe(rename(function(path){
      	path.dirname = path.dirname.replace('/less', '/css');
      }))
      .pipe(gulp.dest('./build/'))
      .on('end', reload);
});

/**
 * [description]
 * @param  {[type]} ) {                   var stream [description]
 * @return {[type]}   [description]
 */
gulp.task('scripts', function() {
    var stream = browserify({
      entries: './src/app.js',
      debug: true
    })
    .on('error', function(err) {
      console.log(err)
    })
    .transform(babelify.configure({
      sourceMapRelative: path.resolve(__dirname, 'src')
    }))
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(rename('app.js'))
    .pipe(gulp.dest('./build/scripts/'))
    .on("end", reload)
    return 
})

/**
 * [description live reload connect]
 * @param  {[type]} ) {             connect.server({    root: build.root,    livereload: true,    middleware: function(connect, opt) {      return [rest.rester({        context: "/"      })]    }  })} [description]
 * @return {[type]}   [description]
 */
gulp.task("connect", function() {
  connect.server({
    root: build.root,
    livereload: true
  })
})

/**
 * [gulp watch and reloaddescription]
 * @param  {[type]} ) {	livereload.listen()	gulp.watch(src.html, ['html'])	gulp.watch("src*.js", [""])} [description]
 * @return {[type]}   [description]
 */
gulp.task("watch", function() {
	livereload.listen()
	gulp.watch(src.html, ['html'])
	gulp.watch("src/**/*.js", ["scripts"])
	gulp.watch("src/**/*.less", ["styles"])
})

function reload() {
  livereload.reload()
}
