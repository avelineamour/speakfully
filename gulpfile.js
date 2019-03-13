const sass = require('gulp-sass')
const cleanCSS = require('gulp-clean-css')
const browserSync = require('browser-sync').create()
const concat = require('gulp-concat');
const babel = require('gulp-babel');

sass.compiler = require('node-sass')

const jsWatch = './src/**/*.js'
const styleWatch = './src/**/*.scss'
const htmlWatch = './src/**/*.html'

// Gulp Methods Used

const {
  src,
  dest,
  task,
  watch,
  series,
  parallel
} = require('gulp')


// Sass

function scss() {
  return src("src/style.scss")
    .pipe(sass().on('error', showError))
    .pipe(cleanCSS())
    .pipe(dest("dist"))
    .pipe(browserSync.stream())
}

function showError(error) {
  console.log(error.toString());
  this.emit('end');
}

// JavaScript

function javascript() {
  return src('src/*.js')
    .pipe(concat('main.js'))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.reload({
      stream: true
    }))
};

// HTML

function html() {
  return src("src/*.html")
    .pipe(dest("dist"))
}

// Browser Sync

function browser_sync(done) {

  browserSync.init({
    server: {
      baseDir: 'dist',
    }
  })
  done()
}

// Browser Sync Reload (Only Works When Formatted As Function)

function reload(done) {
  browserSync.reload()
  done()
}


// Watch

function watchFiles(done) {
  watch(styleWatch, series(scss))
  watch(jsWatch, series(javascript, reload))
  watch(htmlWatch, series(html, reload))
  done()
}


// Gulp Commands

task("javascript", javascript)
task("html", html)
task("scss", scss)
task("default", parallel(html, scss, javascript))
task("watch", series(watchFiles, browser_sync))