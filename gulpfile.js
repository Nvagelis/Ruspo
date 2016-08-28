/* requires */
/*
 * 
 * first run gulp build 
 *      download bower components
 *      add bootastrap assets to source
 *      
 * after that run gulp
 * 
 * */
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    sass = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    bower = require('gulp-bower');

var config = {
     sourceDir: 'source',
    publicDir: 'public_html',
     bowerDir: 'public_html/bower_components' ,
    maps: 'maps'
};

/********** bower ***********/
/* install bower components */
/****************************/
gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest(config.bowerDir));  /* or .bowerrc */
});
/************** copy ***************/
/* copy bootstrap assets to source */
/***********************************/
gulp.task('copy:scss',['bower'], function() {
    var stream = gulp.src(config.bowerDir + '/bootstrap-sass/assets/stylesheets/**/*.scss')
		.pipe(gulp.dest(config.sourceDir + '/scss'));
	return stream;
});
gulp.task('copy:fonts',['bower'], function() {
    var stream = gulp.src(config.bowerDir + '/bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.*')
		.pipe(gulp.dest(config.publicDir + '/fonts'));     /******** fix paths ***********/
	return stream;
});

/*********** scripts *********/
/* copy, minify, map, min js */
/*****************************/
gulp.task('scripts', function () {
    return gulp.src(config.sourceDir + '/js/**/*.js')
        .pipe(plumber())
        //.pipe(sourcemaps.init())
        .pipe(rename({suffix:'.min'}))
        .pipe(uglify())
        //.pipe(sourcemaps.write(config.maps))
        .pipe(gulp.dest(config.publicDir + '/js'));
});
/********** styles ************/
/* scss to css, map, prefixer */
/******************************/
gulp.task('styles', function (){
    return sass(config.sourceDir + '/scss/style.scss', {style: 'expanded',sourcemap: true})  /* or style: 'compressed' */
        .pipe(plumber())
        .pipe(sourcemaps.init())
        //.on('error', sass.logError)
        .pipe(autoprefixer('last 2 versions'))              /*autoprefixer always before source maps*/
        .pipe(sourcemaps.write(config.maps))
        .pipe(gulp.dest(config.publicDir + '/css')); 
});
/****************/
/**** watch *****/
/****************/
gulp.task('watch', function (){
   gulp.watch(config.sourceDir + '/js/**/*.js', ['scripts']);
   gulp.watch(config.sourceDir + '/scss/**/*.scss', ['styles']);
});

/* copy files build*/
gulp.task('build', ['copy:scss','copy:fonts']);

/*****************/
/**** default ****/
/*****************/
gulp.task('default',['scripts','styles','watch']);